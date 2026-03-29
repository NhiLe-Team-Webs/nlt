import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { PartnerProjectRecord } from "@/hooks/use-partner-projects-admin";
import { Loader2, Upload, X } from "lucide-react";

export interface PartnerProjectFormValues {
  slug: string;
  name: string;
  partner: string;
  subtitle: string;
  description: string;
  background_color: string;
  is_published: boolean;
  imageFile: File | null;
  removeImage: boolean;
}

interface PartnerProjectFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: PartnerProjectRecord | null;
  loading?: boolean;
  onSubmit: (values: PartnerProjectFormValues) => Promise<void>;
}

const COLOR_FALLBACK = "#F5F5F7";

export function PartnerProjectFormModal({
  open,
  onOpenChange,
  project,
  loading = false,
  onSubmit,
}: PartnerProjectFormModalProps) {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(COLOR_FALLBACK);
  const [isPublished, setIsPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setSlug(project?.slug ?? "");
    setName(project?.name ?? "");
    setPartner(project?.partner ?? "");
    setSubtitle(project?.subtitle ?? "");
    setDescription(project?.description ?? "");
    setBackgroundColor(project?.background_color ?? COLOR_FALLBACK);
    setIsPublished(Boolean(project?.is_published));
    setImageFile(null);
    setRemoveImage(false);
    setPreviewUrl(null);
  }, [open, project]);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const currentPreview = useMemo(() => {
    if (previewUrl) return previewUrl;
    if (removeImage) return null;
    return project?.image_url ?? null;
  }, [previewUrl, project, removeImage]);

  const handleClose = (next: boolean) => {
    if (!loading) {
      onOpenChange(next);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    await onSubmit({
      slug: slug.trim(),
      name: name.trim(),
      partner: partner.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      background_color: backgroundColor,
      is_published: isPublished,
      imageFile,
      removeImage,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setRemoveImage(false);
      event.target.value = "";
    }
  };

  const isEditMode = Boolean(project);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Cập nhật dự án đối tác" : "Thêm dự án đối tác"}
            </DialogTitle>
            <DialogDescription>
              Điền thông tin cơ bản của dự án. Bạn có thể cập nhật trạng thái
              xuất bản ngay tại đây.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="project-slug">Slug</Label>
              <Input
                id="project-slug"
                placeholder="vd: cong-nghe-giao-duc"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-name">Tên dự án</Label>
              <Input
                id="project-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-partner">Đối tác</Label>
              <Input
                id="project-partner"
                value={partner}
                onChange={(event) => setPartner(event.target.value)}
                placeholder="Tên đơn vị đồng hành"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-subtitle">Phụ đề / tagline</Label>
              <Input
                id="project-subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                placeholder="Một câu mô tả ngắn"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-description">Mô tả</Label>
              <Textarea
                id="project-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Mô tả chi tiết về dự án"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-bg-color">Màu nền</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="project-bg-color"
                  value={backgroundColor}
                  onChange={(event) => setBackgroundColor(event.target.value)}
                  disabled={loading}
                />
                <input
                  type="color"
                  aria-label="Chọn màu nền"
                  value={backgroundColor || COLOR_FALLBACK}
                  onChange={(event) => setBackgroundColor(event.target.value)}
                  disabled={loading}
                  className="h-10 w-12 cursor-pointer rounded border"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Ảnh đại diện</Label>
              {currentPreview ? (
                <div className="relative">
                  <img
                    src={currentPreview}
                    alt="Xem trước ảnh dự án"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      setImageFile(null);
                      setRemoveImage(true);
                    }}
                    disabled={loading}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Gỡ ảnh
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Chưa có ảnh. Tải ảnh mới để hiển thị trên trang.
                </p>
              )}
              <div
                className={cn(
                  "flex flex-wrap items-center gap-3 rounded-lg border border-dashed p-3",
                  loading && "opacity-50"
                )}
              >
                <Input
                  id="project-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Hỗ trợ định dạng PNG, JPG, tối ưu ở tỷ lệ 4:3.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
              <div>
                <Label htmlFor="project-published" className="text-base">
                  Xuất bản
                </Label>
                <p className="text-sm text-muted-foreground">
                  Khi bật, dự án sẽ hiển thị trong danh sách đối tác.
                </p>
              </div>
              <Switch
                id="project-published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? "Lưu thay đổi" : "Tạo dự án"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
