import { supabase } from "@/lib/supabaseClient";

export async function updateApplicantStatus(applicantId: string, newStatus: string, userId: string) {
  // Lấy status cũ
  const { data: old } = await supabase
    .from("applicants")
    .select("status")
    .eq("id", applicantId)
    .single();

  // Cập nhật applicants
  const { error: updateError } = await supabase
    .from("applicants")
    .update({ status: newStatus })
    .eq("id", applicantId);

  // Ghi lại history
  if (!updateError) {
    await supabase.from("applicant_status_history").insert({
      applicant_id: applicantId,
      old_status: old?.status,
      new_status: newStatus,
      changed_by: userId,
    });
  }

  return { success: !updateError, error: updateError?.message };
}

export async function addApplicantNote(applicantId: string, note: string, userId: string) {
  const { error } = await supabase.from("applicant_notes").insert({
    applicant_id: applicantId,
    note,
    created_by: userId,
  });
  return { success: !error, error: error?.message };
}
