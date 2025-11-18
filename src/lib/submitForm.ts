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

    // Log toàn bộ response từ App Script để debug
    console.log('🔍 App Script Response:', JSON.stringify(data, null, 2));
    console.log('🔍 Kiểu dữ liệu của data.row_number:', typeof data.row_number, 'giá trị:', data.row_number);
    console.log('🔍 Kiểu dữ liệu của data.rowNumber:', typeof data.rowNumber, 'giá trị:', data.rowNumber);
    console.log('🔍 Kiểu dữ liệu của data.row:', typeof data.row, 'giá trị:', data.row);

    if (data.result === 'success') {
      console.log('✅ Form đã được gửi thành công đến App Script');
      
      // Lấy row number từ response của App Script (nếu có)
      // Đảm bảo row number là một con số, không phải mảng
      let rowNumber: number | null = null;
      
      // Ưu tiên row_number (từ App Script)
      if (data.row_number !== undefined && data.row_number !== null) {
        // Nếu là mảng, lấy phần tử đầu tiên
        if (Array.isArray(data.row_number)) {
          rowNumber = typeof data.row_number[0] === 'number' ? data.row_number[0] : null;
          console.log('🔍 data.row_number là mảng, phần tử đầu tiên:', data.row_number[0]);
        } else if (typeof data.row_number === 'number') {
          rowNumber = data.row_number;
          console.log('🔍 data.row_number là số:', data.row_number);
        } else if (typeof data.row_number === 'string') {
          // Chuyển đổi string sang number nếu có thể
          const parsed = parseInt(data.row_number, 10);
          rowNumber = isNaN(parsed) ? null : parsed;
          console.log('🔍 data.row_number là string, sau khi parse:', parsed);
        }
      } else if (data.rowNumber !== undefined && data.rowNumber !== null) {
        // Fallback cho rowNumber (camelCase)
        if (Array.isArray(data.rowNumber)) {
          rowNumber = typeof data.rowNumber[0] === 'number' ? data.rowNumber[0] : null;
          console.log('🔍 data.rowNumber là mảng, phần tử đầu tiên:', data.rowNumber[0]);
        } else if (typeof data.rowNumber === 'number') {
          rowNumber = data.rowNumber;
          console.log('🔍 data.rowNumber là số:', data.rowNumber);
        } else if (typeof data.rowNumber === 'string') {
          const parsed = parseInt(data.rowNumber, 10);
          rowNumber = isNaN(parsed) ? null : parsed;
          console.log('🔍 data.rowNumber là string, sau khi parse:', parsed);
        }
      } else if (data.row !== undefined && data.row !== null) {
        // Fallback cho row
        if (Array.isArray(data.row)) {
          rowNumber = typeof data.row[0] === 'number' ? data.row[0] : null;
          console.log('🔍 data.row là mảng, phần tử đầu tiên:', data.row[0]);
        } else if (typeof data.row === 'number') {
          rowNumber = data.row;
          console.log('🔍 data.row là số:', data.row);
        } else if (typeof data.row === 'string') {
          const parsed = parseInt(data.row, 10);
          rowNumber = isNaN(parsed) ? null : parsed;
          console.log('🔍 data.row là string, sau khi parse:', parsed);
        }
      }
      
      if (rowNumber) {
        console.log(`📊 Dữ liệu được lưu tại dòng: ${rowNumber}`);
      } else {
        console.log('⚠️ Không thể xác định row number từ App Script response');
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