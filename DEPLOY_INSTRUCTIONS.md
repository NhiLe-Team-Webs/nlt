# Hướng dẫn Deploy lại App Script

## Vấn đề hiện tại
App Script đang trả về:
```json
{
  "result": "success",
  "row": {name: '...', email: '...', ...}
}
```

Thay vì:
```json
{
  "result": "success", 
  "row_number": 15
}
```

## Các bước để sửa

### 1. Mở Google Apps Script Editor
1. Vào [Google Apps Script](https://script.google.com)
2. Mở project của bạn

### 2. Cập nhật code
1. Xóa toàn bộ code hiện tại
2. Copy và paste code từ file `APPS_SCRIPT_UPDATED.js`
3. Lưu lại (Ctrl+S hoặc icon Save)

### 3. Deploy lại
1. Vào menu **Deploy** > **New Deployment**
2. Chọn:
   - **Type**: Web app
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
3. Click **Deploy**
4. **Copy URL mới** được cung cấp
5. **Cập nhật URL** vào file `.env`:
   ```
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/NEW_SCRIPT_ID/exec
   ```

### 4. Kiểm tra
1. Mở website và điền form
2. Mở Console (F12)
3. Kiểm tra log:
   ```
   🔍 App Script Response: {"result": "success", "row_number": 15}
   🔍 data.row_number là số: 15
   📊 Dữ liệu được lưu tại dòng: 15
   ```

### 5. Kiểm tra logs trong Apps Script
1. Trong Apps Script Editor, vào **Executions**
2. Click vào execution gần nhất
3. Xem logs để debug:
   ```
   === DEBUG INFO ===
   All parameters received: {...}
   Headers found: [...]
   Row data to be added: [...]
   === RESULT ===
   New row added at: 15
   Final response will be: {"result": "success", "row_number": 15}
   ```

## Lưu ý quan trọng
- **Phải deploy lại** sau khi cập nhật code
- **URL mới** sẽ có script ID khác
- **Cập nhật .env** với URL mới
- **Test lại** form để xác định hoạt động

Nếu vẫn không hoạt động, kiểm tra:
1. Có error trong Apps Script executions không?
2. URL trong .env có đúng không?
3. Webhook URL có được cấu hình đúng không?