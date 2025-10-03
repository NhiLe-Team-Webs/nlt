// src/lib/submitForm.ts

import { supabase } from "./supabaseClient";

// Định nghĩa một kiểu dữ liệu cụ thể cho form
interface FormData {
  name: string;
  email: string;
  telegram: string;
  motivation: string;
  goals: string;
  source: string;
  time_commitment: string;
  values_commitment: boolean;
  privacy_commitment: boolean;
}

export const submitForm = async (formData: FormData) => {
  try {
    const payload = {
      full_name: formData.name.trim(),
      email: formData.email.trim(),
      telegram: formData.telegram.trim() || null,
      motivation: formData.motivation.trim(),
      goals: formData.goals.trim(),
      source: formData.source,
      time_commitment: formData.time_commitment || null,
      values_commitment: formData.values_commitment,
      privacy_commitment: formData.privacy_commitment,
    }

    const { error } = await supabase
      .from('applicants')
      .insert(payload)
      .select('id')
      .single()

    if (error) {
      console.error('Submission failed:', error)
      return { success: false, error: 'Submission failed' }
    }

    return { success: true }
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: 'Network error' };
  }
};