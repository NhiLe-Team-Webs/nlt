// src/lib/partnerProjects.ts
import type { PartnerProject } from "@/types/partner";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type PartnerProjectsRestRow = {
    id: number;
    slug?: string | null;
    name?: string | null;
    partner?: string | null;
    subtitle?: string | null;
    description?: string | null;
    image_url?: string | null;
    background_color?: string | null;
    display_order?: number | null;
    is_published?: boolean;
    published_at?: string | null;
    [key: string]: unknown;
};

// Chuẩn hóa màu để fallback an toàn
function normalizeColor(input?: string | null, fallback = "#F5F5F7") {
    if (!input) return fallback;
    const hex = input.trim();
    return /^#([0-9a-fA-F]{3}){1,2}$/i.test(hex) ? hex : fallback;
}

function buildUrl({
    withPublished = true,
    withOrder = true,
}: { withPublished?: boolean; withOrder?: boolean }) {
    const table = "partner_projects"; // ĐÚNG tên bảng trong ảnh bạn gửi
    const params = new URLSearchParams();
    params.set("select", "*");
    if (withPublished) params.set("is_published", "eq.true");

    // Cú pháp đúng của Supabase REST: order=column.asc.nullsfirst
    if (withOrder) params.append("order", "display_order.asc.nullsfirst");

    return `${SUPABASE_URL}/rest/v1/${table}?${params.toString()}`;
}

/**
 * Gọi Supabase REST để lấy danh sách partner projects
 * Thứ tự thử:
 *  1) Có filter is_published + order display_order
 *  2) Bỏ order nếu cột display_order chưa tồn tại
 *  3) Bỏ cả filter is_published nếu cột này chưa tồn tại
 */
export async function fetchPartnerProjects(): Promise<PartnerProject[]> {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
    }

    // Thử 1: full query
    let res = await fetch(buildUrl({ withPublished: true, withOrder: true }), {
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Accept: "application/json",
            Prefer: "return=representation",
        },
        cache: "no-store",
    });

    // Nếu lỗi vì order (ví dụ display_order không tồn tại) → thử bỏ order
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        const msg = text.toLowerCase();
        const orderBad =
            msg.includes("display_order") ||
            msg.includes("nullsfirst") ||
            msg.includes("order by");

        if (orderBad) {
            res = await fetch(buildUrl({ withPublished: true, withOrder: false }), {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                    Accept: "application/json",
                    Prefer: "return=representation",
                },
                cache: "no-store",
            });
        }

        // Nếu vẫn lỗi và có vẻ do is_published không tồn tại → bỏ filter publish
        if (!res.ok) {
            const againText = await res.text().catch(() => "");
            const publishBad =
                againText.toLowerCase().includes("is_published") ||
                againText.toLowerCase().includes("column") && againText.toLowerCase().includes("does not exist");

            if (publishBad) {
                res = await fetch(buildUrl({ withPublished: false, withOrder: false }), {
                    headers: {
                        apikey: SUPABASE_KEY,
                        Authorization: `Bearer ${SUPABASE_KEY}`,
                        Accept: "application/json",
                        Prefer: "return=representation",
                    },
                    cache: "no-store",
                });
            }

            if (!res.ok) {
                throw new Error(`Supabase fetch failed: ${res.status} ${againText || ""}`);
            }
        }
    }

    const raw = (await res.json()) as PartnerProjectsRestRow[];

    return raw.map((p) => ({
        ...p,
        slug: typeof p?.slug === "string" ? p.slug.trim() : p?.slug,
        name: typeof p?.name === "string" ? p.name.trim() : p?.name,
        partner: typeof p?.partner === "string" ? p.partner.trim() : p?.partner,
        subtitle: typeof p?.subtitle === "string" ? p.subtitle.trim() : p?.subtitle,
        description:
            typeof p?.description === "string" ? p.description.trim() : p?.description,
        background_color: normalizeColor(p?.background_color),
        image_url: p?.image_url?.trim() || null,
    })) as PartnerProject[];
}
