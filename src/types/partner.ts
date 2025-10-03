export interface PartnerProject {
    id: string | number;
    name: string;
    description?: string | null;
    image_url?: string | null;
    background_color?: string | null; // ex: "#F5F5F7"
    display_order?: number | null;
    is_published: boolean;
}
