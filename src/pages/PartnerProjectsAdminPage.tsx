import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  usePartnerProjectsAdmin,
  type PartnerProjectRecord,
} from "@/hooks/use-partner-projects-admin";
import {
  PartnerProjectFormModal,
  type PartnerProjectFormValues,
} from "@/components/partner-projects/PartnerProjectFormModal";
import {
  Edit,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  ImageOff,
} from "lucide-react";

const formatDate = (value?: string | null) => {
  if (!value) return "--";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: false,
    }).format(new Date(value));
  } catch (error) {
    console.warn("Cannot format published_at", error);
    return value;
  }
};

const toNullable = (value: string) => {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

const FALLBACK_COLOR = "#F5F5F7";

const createColorStyle = (color?: string | null) => ({
  backgroundColor: color || FALLBACK_COLOR,
});

const backgroundPreviewClass = "h-10 w-10 rounded-full border";

const shouldDisableRow = (
  projectId: string | number,
  pendingId: string | number | null,
  globalPending: boolean
) => globalPending || (pendingId !== null && pendingId === projectId);

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Đã có lỗi xảy ra.";

const PartnerProjectsAdminPage = () => {
  const {
    projects,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    createProject,
    updateProject,
    togglePublish,
    deleteProject,
  } = usePartnerProjectsAdmin();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<PartnerProjectRecord | null>(
    null
  );
  const [pendingToggleId, setPendingToggleId] = useState<string | number | null>(
    null
  );
  const [pendingDeleteId, setPendingDeleteId] = useState<string | number | null>(
    null
  );

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      if (!modalLoading) {
        setModalOpen(false);
        setEditingProject(null);
      }
      return;
    }
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleEditClick = (project: PartnerProjectRecord) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleModalSubmit = async (values: PartnerProjectFormValues) => {
    setModalLoading(true);
    try {
      if (editingProject) {
        const publishedAt = values.is_published
          ? editingProject.is_published
            ? editingProject.published_at ?? new Date().toISOString()
            : new Date().toISOString()
          : null;

        await updateProject({
          id: editingProject.id,
          slug: values.slug,
          name: values.name,
          partner: toNullable(values.partner),
          subtitle: toNullable(values.subtitle),
          description: toNullable(values.description),
          background_color: values.background_color,
          is_published: values.is_published,
          published_at: publishedAt,
          imageFile: values.imageFile ?? undefined,
          removeImage: values.removeImage,
        });
        toast({ title: "Đã cập nhật dự án" });
      } else {
        await createProject({
          slug: values.slug,
          name: values.name,
          partner: toNullable(values.partner),
          subtitle: toNullable(values.subtitle),
          description: toNullable(values.description),
          background_color: values.background_color,
          is_published: values.is_published,
          published_at: values.is_published ? new Date().toISOString() : null,
          imageFile: values.imageFile ?? undefined,
        });
        toast({ title: "Đã tạo dự án mới" });
      }
      setModalOpen(false);
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Không thể lưu dự án",
        description: getErrorMessage(error),
      });
    } finally {
      setModalLoading(false);
    }
  };

  const handleTogglePublish = async (
    project: PartnerProjectRecord,
    next: boolean
  ) => {
    setPendingToggleId(project.id);
    try {
      await togglePublish({ id: project.id, is_published: next });
      toast({
        title: next ? "Đã xuất bản dự án" : "Đã ẩn dự án",
        description: project.name,
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Không thể cập nhật trạng thái",
        description: getErrorMessage(error),
      });
    } finally {
      setPendingToggleId(null);
    }
  };

  const handleDelete = async (project: PartnerProjectRecord) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xoá dự án "${project.name}"?`
    );
    if (!confirmDelete) return;

    setPendingDeleteId(project.id);
    try {
      await deleteProject(project.id);
      toast({ title: "Đã xoá dự án", description: project.name });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Không thể xoá dự án",
        description: getErrorMessage(error),
      });
    } finally {
      setPendingDeleteId(null);
    }
  };

  const loadingSkeleton = useMemo(
    () => (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg bg-slate-200/70"
          />
        ))}
      </div>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">
              Quản lý dự án đối tác
            </h1>
            <p className="text-sm text-slate-600">
              Tạo mới, chỉnh sửa và điều chỉnh trạng thái xuất bản của các dự án
              hợp tác.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Làm mới
            </Button>
            <Button type="button" onClick={handleCreateClick}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm dự án
            </Button>
          </div>
        </header>

        {isLoading ? (
          loadingSkeleton
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">Không tải được danh sách dự án.</p>
            <p className="mt-1 text-sm text-red-600">
              {error instanceof Error ? error.message : "Đã có lỗi xảy ra."}
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => refetch()}
            >
              Thử lại
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-white p-12 text-center">
            <ImageOff className="h-10 w-10 text-slate-400" />
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-800">
                Chưa có dự án nào
              </h2>
              <p className="text-sm text-slate-500">
                Hãy thêm dự án đầu tiên để hiển thị với cộng đồng đối tác.
              </p>
            </div>
            <Button type="button" onClick={handleCreateClick}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm dự án
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[160px]">Tên dự án</TableHead>
                  <TableHead>Đối tác</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Phụ đề</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Xuất bản</TableHead>
                  <TableHead className="text-center">Màu nền</TableHead>
                  <TableHead>Ngày xuất bản</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const rowDisabled = shouldDisableRow(
                    project.id,
                    pendingDeleteId,
                    modalLoading
                  );
                  const toggleDisabled = shouldDisableRow(
                    project.id,
                    pendingToggleId,
                    modalLoading
                  );
                  return (
                    <TableRow key={project.id} className={rowDisabled ? "opacity-60" : ""}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.partner ?? "--"}</TableCell>
                      <TableCell>
                        <code className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                          {project.slug}
                        </code>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {project.subtitle ?? "--"}
                      </TableCell>
                      <TableCell>
                        {project.is_published ? (
                          <Badge className="bg-emerald-500 hover:bg-emerald-500">
                            Đang hiển thị
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Ẩn</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={project.is_published}
                          onCheckedChange={(checked) =>
                            handleTogglePublish(project, checked)
                          }
                          disabled={
                            toggleDisabled || pendingDeleteId === project.id
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <div
                          className={backgroundPreviewClass}
                          style={createColorStyle(project.background_color)}
                          title={project.background_color ?? FALLBACK_COLOR}
                        />
                      </TableCell>
                      <TableCell>{formatDate(project.published_at)}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(project)}
                          disabled={modalLoading}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Sửa
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(project)}
                          disabled={pendingDeleteId === project.id}
                        >
                          {pendingDeleteId === project.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Xoá
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <PartnerProjectFormModal
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        project={editingProject}
        loading={modalLoading}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default PartnerProjectsAdminPage;
