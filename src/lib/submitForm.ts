// src/lib/submitForm.ts

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

// Get the API URL from the environment variable
const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

// Hàm gửi dữ liệu đến webhook
const sendToWebhook = async (formData: FormData, rowNumber?: number | null) => {
  if (!WEBHOOK_URL) {
    console.log('⚠️ Webhook URL không được cấu hình, bỏ qua gửi webhook');
    return { success: true };
  }

  console.log('🚀 Bắt đầu gửi dữ liệu đến webhook...');
  // Ẩn URL để bảo mật, chỉ hiển thị domain
  const webhookDomain = WEBHOOK_URL ? new URL(WEBHOOK_URL).hostname : 'unknown';
  console.log(`📤 Webhook Domain: ${webhookDomain}`);
  console.log('📋 Dữ liệu gửi đi:', {
    event: 'form_submission',
    data: {
      name: formData.name,
      email: formData.email,
      telegram: formData.telegram,
      source: formData.source
    },
    rowNumber: rowNumber,
    timestamp: new Date().toISOString()
  });

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'form_submission',
        data: formData,
        rowNumber: rowNumber,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`❌ Webhook response status: ${response.status}`);
      throw new Error(`Webhook response status: ${response.status}`);
    }

    // Xử lý response - có thể không phải là JSON
    let responseData;
    const contentType = response.headers.get('content-type');
    
    try {
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        // Nếu không phải JSON, lấy text response
        const responseText = await response.text();
        console.log('📄 Response text:', responseText);
        responseData = { message: responseText };
      }
    } catch (parseError) {
      console.warn('⚠️ Không thể parse response:', parseError);
      responseData = { message: 'Response received but could not be parsed' };
    }
    
    console.log('✅ Webhook gửi thành công!');
    console.log('📥 Phản hồi từ webhook:', responseData);

    return { success: true };
  } catch (error) {
    console.error('❌ Lỗi khi gửi đến webhook:', error);
    return { success: false, error: 'Webhook failed' };
  }
};

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
      console.log('✅ Form đã được gửi thành công đến App Script');
      
      // Lấy row number từ response của App Script (nếu có)
      const rowNumber = data.rowNumber || data.row || null;
      if (rowNumber) {
        console.log(`📊 Dữ liệu được lưu tại dòng: ${rowNumber}`);
      }
      
      // Gửi đến webhook sau khi App Script thành công
      const webhookResult = await sendToWebhook(formData, rowNumber);
      
      if (!webhookResult.success) {
        console.error('⚠️ Webhook failed but form was submitted to App Script:', webhookResult.error);
        // Vẫn trả về success vì form đã được gửi đến App Script thành công
      } else {
        console.log('🎉 Toàn bộ quy trình hoàn tất: App Script + Webhook');
      }
      
      return { success: true };
    } else {
      console.error('❌ Submission failed:', data.error);
      return { success: false, error: 'Submission failed' };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: 'Network error' };
  }
};