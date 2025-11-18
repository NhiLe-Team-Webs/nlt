# Hướng dẫn thiết lập Webhook cho Form đăng ký

## Tổng quan

Chức năng webhook đã được thêm vào để gửi dữ liệu form đăng ký đến một endpoint tùy chỉnh sau khi đã gửi thành công đến Google Apps Script. Điều này cho phép bạn tích hợp với các hệ thống khác như CRM, email marketing, hoặc các dịch vụ thông báo.

## Cách hoạt động

1. Người dùng điền form và nhấn "Gửi Đơn Đăng Ký"
2. Dữ liệu được gửi đến Google Apps Script URL
3. Nếu gửi thành công, dữ liệu sẽ được gửi tiếp đến webhook URL
4. Kết quả trả về cho người dùng dựa trên việc gửi đến App Script (không phụ thuộc vào webhook)

## Cấu hình

### 1. Thiết lập biến môi trường

Thêm các biến sau vào file `.env` của bạn:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_WEBHOOK_URL=https://your-webhook-endpoint.com/api/form-submission
```

- `VITE_APPS_SCRIPT_URL`: URL của Google Apps Script để xử lý form
- `VITE_WEBHOOK_URL`: URL của webhook để nhận dữ liệu form (tùy chọn)

### 2. Định dạng dữ liệu gửi đến webhook

Webhook sẽ nhận dữ liệu với định dạng JSON:

```json
{
  "event": "form_submission",
  "data": {
    "name": "Nguyễn Văn A",
    "email": "email@example.com",
    "telegram": "@username",
    "motivation": "Lý do tham gia...",
    "goals": "Mục tiêu của tôi...",
    "source": "youtube",
    "time_commitment": "3",
    "values_commitment": true,
    "privacy_commitment": true
  },
  "rowNumber": 15,
  "timestamp": "2023-11-18T08:45:00.000Z"
}
```

**Lưu ý về rowNumber:**
- `rowNumber` là số dòng mà App Script đã lưu dữ liệu vào Google Sheets
- Giá trị này giúp bạn xác định chính xác vị trí của dữ liệu trong spreadsheet
- Nếu App Script không trả về row number, giá trị này sẽ là `null`

## Ví dụ triển khai webhook

### Ví dụ với Node.js/Express

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/form-submission', (req, res) => {
  const { event, data, timestamp } = req.body;
  
  if (event === 'form_submission') {
    // Xử lý dữ liệu form
    console.log('Người dùng mới đăng ký:', data.name);
    console.log('Email:', data.email);
    
    // Lưu vào database
    // Gửi email thông báo
    // Thêm vào CRM
    // ...
    
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid event type' });
  }
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### Ví dụ với Python/Flask

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/form-submission', methods=['POST'])
def handle_form_submission():
    data = request.json
    
    if data.get('event') == 'form_submission':
        form_data = data.get('data')
        timestamp = data.get('timestamp')
        
        # Xử lý dữ liệu form
        print(f"Người dùng mới đăng ký: {form_data['name']}")
        print(f"Email: {form_data['email']}")
        
        # Lưu vào database
        # Gửi email thông báo
        # Thêm vào CRM
        # ...
        
        return jsonify({"success": True})
    else:
        return jsonify({"error": "Invalid event type"}), 400

if __name__ == '__main__':
    app.run(port=3000)
```

### Ví dụ với Make/Zapier

Nếu bạn sử dụng các dịch vụ tự động hóa như Make hoặc Zapier:

1. Tạo một "Webhook" trigger
2. Sử dụng URL được cung cấp làm `VITE_WEBHOOK_URL`
3. Cấu hình các bước tiếp theo (lưu vào Google Sheets, gửi email, thêm vào CRM, v.v.)

## Xử lý lỗi

- Nếu webhook không được cấu hình (không có `VITE_WEBHOOK_URL`), hệ thống sẽ bỏ qua bước gửi webhook
- Nếu webhook trả về lỗi, hệ thống sẽ ghi log lỗi nhưng vẫn trả về thành công cho người dùng (vì form đã được gửi đến App Script)
- Tất cả lỗi webhook sẽ được ghi trong console của trình duyệt

## Bảo mật

- Đảm bảo webhook URL của bạn sử dụng HTTPS
- Xác thực request đến webhook (nếu cần) bằng cách kiểm tra header, token, hoặc IP
- Không bao giờ lưu trữ các biến môi trường chứa thông tin nhạy cảm trong code

## Kiểm tra

Để kiểm tra webhook, bạn có thể sử dụng các công dụng cụ như:

- [webhook.site](https://webhook.site) - Tạo webhook URL tạm thời để kiểm tra
- [ngrok](https://ngrok.com) - Forward local server đến internet để kiểm tra
- Postman hoặc curl để gửi request test

## Cập nhật

Nếu bạn cần thay đổi định dạng dữ liệu hoặc thêm thông tin gửi đến webhook, hãy chỉnh sửa hàm `sendToWebhook` trong file [`src/lib/submitForm.ts`](src/lib/submitForm.ts).