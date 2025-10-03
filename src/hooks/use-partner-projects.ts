import { useEffect, useRef, useState } from "react";
import { fetchPartnerProjects } from "@/lib/partnerProjects";
import type { PartnerProject } from "@/types/partner";

type Status = "idle" | "loading" | "success" | "error";

export function usePartnerProjects() {
    const [data, setData] = useState<PartnerProject[]>([]);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);

    // Giúp hủy request trước đó (tránh race condition khi refetch nhanh)
    const abortRef = useRef<AbortController | null>(null);

    const load = async () => {
        setStatus("loading");
        setError(null);

        // Hủy request cũ (nếu có)
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const result = await fetchPartnerProjects();
            if (!controller.signal.aborted) {
                setData(result);
                setStatus("success");
            }
        } catch (e: any) {
            if (!controller.signal.aborted) {
                setError(e?.message || "Unknown error");
                setStatus("error");
            }
        }
    };

    useEffect(() => {
        load();
        return () => abortRef.current?.abort();
    }, []);

    return {
        data,                          // danh sách project đã lọc & sort
        isLoading: status === "loading",
        isError: status === "error",
        error,
        refetch: load,                 // gọi lại khi cần
    };
}
