import { supabase } from "@/lib/supabaseClient";
import type { PartnerProject } from "@/types/partner";

const TABLE_NAME = "partner_projects";
const STORAGE_BUCKET = "partner-projects";
const COLOR_FALLBACK = "#F5F5F7";

type Nullable<T> = T | null | undefined;

export type PartnerProjectRecord = PartnerProject;

type PartnerProjectsTableRow = {
  id: number;
  slug: string | null;
  name: string | null;
  partner: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  background_color: string | null;
  display_order: number | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export interface CreatePartnerProjectInput {
  slug: string;
  name: string;
  partner?: Nullable<string>;
  subtitle?: Nullable<string>;
  description?: Nullable<string>;
  background_color?: Nullable<string>;
  is_published: boolean;
  published_at?: Nullable<string>;
  imageFile?: File | null;
}

export interface UpdatePartnerProjectInput
  extends Partial<CreatePartnerProjectInput> {
  id: string | number;
  removeImage?: boolean;
}

export interface TogglePartnerProjectPublishInput {
  id: string | number;
  is_published: boolean;
}

function sanitizeString(value: Nullable<string>) {
  return typeof value === "string" ? value.trim() : value ?? "";
}

function sanitizeOptional(value: Nullable<string>) {
  const next = typeof value === "string" ? value.trim() : value;
  return next === "" || next === undefined ? null : next ?? null;
}

function normalizeColor(input?: Nullable<string>) {
  if (!input) return COLOR_FALLBACK;
  const hex = input.trim();
  return /^#([0-9a-fA-F]{3}){1,2}$/i.test(hex) ? hex : COLOR_FALLBACK;
}

async function uploadProjectImage(file: File) {
  const fileName = `projects/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

function mapRecord(record: PartnerProjectsTableRow): PartnerProjectRecord {
  return {
    id: record.id,
    slug: sanitizeString(record.slug),
    name: sanitizeString(record.name),
    partner: sanitizeOptional(record.partner),
    subtitle: sanitizeOptional(record.subtitle),
    description: sanitizeOptional(record.description),
    image_url:
      typeof record.image_url === "string"
        ? record.image_url.trim()
        : record.image_url ?? null,
    background_color: normalizeColor(record.background_color),
    display_order: record.display_order ?? null,
    is_published: Boolean(record.is_published),
    published_at: record.published_at ?? null,
    created_at: record.created_at ?? null,
    updated_at: record.updated_at ?? null,
  };
}

export async function listPartnerProjects(): Promise<PartnerProjectRecord[]> {
  const { data, error } = await supabase
    .from<PartnerProjectsTableRow>(TABLE_NAME)
    .select(
      "id, slug, name, partner, subtitle, description, image_url, background_color, display_order, is_published, published_at, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapRecord);
}

export async function createPartnerProject(
  payload: CreatePartnerProjectInput
): Promise<PartnerProjectRecord> {
  const imageUrl = payload.imageFile
    ? await uploadProjectImage(payload.imageFile)
    : null;

  const record = {
    slug: sanitizeString(payload.slug),
    name: sanitizeString(payload.name),
    partner: sanitizeOptional(payload.partner),
    subtitle: sanitizeOptional(payload.subtitle),
    description: sanitizeOptional(payload.description),
    background_color: normalizeColor(payload.background_color),
    image_url: imageUrl,
    is_published: payload.is_published,
    published_at: payload.is_published
      ? payload.published_at ?? new Date().toISOString()
      : null,
  };

  const { data, error } = await supabase
    .from<PartnerProjectsTableRow>(TABLE_NAME)
    .insert(record)
    .select()
    .single();

  if (error) throw error;

  return mapRecord(data);
}

export async function updatePartnerProject(
  payload: UpdatePartnerProjectInput
): Promise<PartnerProjectRecord> {
  const updates: Record<string, unknown> = {};

  if (payload.slug !== undefined)
    updates.slug = sanitizeString(payload.slug);
  if (payload.name !== undefined)
    updates.name = sanitizeString(payload.name);
  if (payload.partner !== undefined)
    updates.partner = sanitizeOptional(payload.partner);
  if (payload.subtitle !== undefined)
    updates.subtitle = sanitizeOptional(payload.subtitle);
  if (payload.description !== undefined)
    updates.description = sanitizeOptional(payload.description);
  if (payload.background_color !== undefined)
    updates.background_color = normalizeColor(payload.background_color);
  if (payload.is_published !== undefined)
    updates.is_published = payload.is_published;
  if (payload.published_at !== undefined)
    updates.published_at = payload.published_at;

  if (payload.imageFile) {
    const imageUrl = await uploadProjectImage(payload.imageFile);
    updates.image_url = imageUrl;
  } else if (payload.removeImage) {
    updates.image_url = null;
  }

  if (Object.keys(updates).length === 0) {
    const { data, error } = await supabase
      .from<PartnerProjectsTableRow>(TABLE_NAME)
      .select()
      .eq("id", payload.id)
      .single();

    if (error) throw error;

    return mapRecord(data);
  }

  const { data, error } = await supabase
    .from<PartnerProjectsTableRow>(TABLE_NAME)
    .update(updates)
    .eq("id", payload.id)
    .select()
    .single();

  if (error) throw error;

  return mapRecord(data);
}

export async function togglePartnerProjectPublish(
  payload: TogglePartnerProjectPublishInput
): Promise<PartnerProjectRecord> {
  const { data, error } = await supabase
    .from<PartnerProjectsTableRow>(TABLE_NAME)
    .update({
      is_published: payload.is_published,
      published_at: payload.is_published ? new Date().toISOString() : null,
    })
    .eq("id", payload.id)
    .select()
    .single();

  if (error) throw error;

  return mapRecord(data);
}

export async function deletePartnerProject(id: string | number) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) throw error;
}
