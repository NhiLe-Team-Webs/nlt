// src/lib/submitForm.ts
import { supabase } from './supabaseClient';
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
  source_detail?: string;
}

// Get the API URL from the environment variable
const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export const submitForm = async (formData: FormData) => {
  try {
    // Chuyển đổi formData thành một đối tượng có thể sử dụng với URLSearchParams
    const formDataEntries = Object.entries(formData).map(([key, value]) => [key, String(value)]);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: new URLSearchParams(formDataEntries),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();

    if (data.result === 'success') {
      return { success: true };
    } else {
      console.error('Submission failed:', data.error);
      return { success: false, error: 'Submission failed' };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: 'Network error' };
  }
};