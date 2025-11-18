function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait 10 seconds for other processes to finish.
  
  // Biến để lưu số hàng mới được chèn
  var newRowNumber = -1;

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Sheet1"); // Đảm bảo tên trang tính là "Sheet1"

    if (!sheet) {
      throw new Error("Sheet with name 'Sheet1' not found.");
    }

    // Lấy tên các cột từ hàng đầu tiên
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var formData = e.parameter;
    
    // DEBUG: Log toàn bộ parameter nhận được
    Logger.log("=== DEBUG INFO ===");
    Logger.log("All parameters received: " + JSON.stringify(e.parameter));
    Logger.log("Headers found: " + JSON.stringify(headers));
    
    // Tạo một hàng dữ liệu mới
    var rowData = headers.map(function(header) {
      var key = header.trim();
      if (key === 'Timestamp') {
        return new Date(); // Thêm timestamp vào cột này
      } else {
        return formData[key] || ''; // Lấy dữ liệu từ form, hoặc để trống nếu không có
      }
    });

    // DEBUG: Log dữ liệu hàng sẽ thêm
    Logger.log("Row data to be added: " + JSON.stringify(rowData));

    // Thêm hàng mới vào bảng tính
    sheet.appendRow(rowData);
    
    // Lấy số hàng cuối cùng (chính là hàng vừa được chèn)
    newRowNumber = sheet.getLastRow();

    // DEBUG: Log kết quả
    Logger.log("=== RESULT ===");
    Logger.log("New row added at: " + newRowNumber);
    Logger.log("Final response will be: " + JSON.stringify({
        "result": "success",
        "row_number": newRowNumber
    }));

    // Trả về JSON chứa kết quả và số hàng mới
    return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "row_number": newRowNumber // Sử dụng key đúng như frontend mong đợi
    }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log lỗi để debug
    Logger.log("=== ERROR ===");
    Logger.log("Error occurred: " + error.toString());
    Logger.log("Error stack: " + error.stack);
    
    // Trả về JSON chứa lỗi
    return ContentService.createTextOutput(JSON.stringify({
        "result": "error",
        "error": error.toString()
    }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Luôn luôn giải phóng khóa
    lock.releaseLock();
  }
}

// Hàm test để kiểm tra
function testGetRowNumber() {
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Sheet1");
    
    if (!sheet) {
      return "Sheet not found";
    }
    
    var currentRow = sheet.getLastRow();
    
    return ContentService.createTextOutput(JSON.stringify({ 
        "result": "test",
        "current_last_row": currentRow
    }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
        "result": "error", 
        "error": error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}