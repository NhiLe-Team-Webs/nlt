export interface PartnerProject {
    id: string | number;
    slug: string;
    name: string;
    partner?: string | null;
    subtitle?: string | null;
    description?: string | null;
    image_url?: string | null;
    background_color?: string | null; // ex: "#F5F5F7"
    display_order?: number | null;
    is_published: boolean;
    published_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}
