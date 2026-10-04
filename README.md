```markdown
# Thesis SOA Demo - Express.js Microservices Architecture

Hệ thống demo kiến trúc Hướng dịch vụ (SOA / Microservices) được xây dựng bằng **Node.js** và **Express.js**. Dự án áp dụng mô hình kiến trúc 3 lớp (Model - Service - Controller), tích hợp **API Gateway** làm điểm truy cập tập trung và lưu trữ dữ liệu bằng **SQLite**.

---

## 🏗 Cấu trúc Kiến trúc & Định tuyến

Tất cả các truy vấn từ ứng dụng client (Frontend / Mobile / Postman / Browser) gửi đến **API Gateway (Cổng 3000)** sẽ tự động được chuyển tiếp (Proxy) đến các dịch vụ tương ứng ở mạng nội bộ:

```text
[ Client / Postman / Browser ] 
              │
              ▼ (Port 3000)
┌────────────────────────────────────────────────────────┐
│                    API GATEWAY                         │
└───────┬───────────────────┬────────────────────┬───────┘
        │ /api/students     │ /api/topics        │ /api/registrations
        ▼                   ▼                    ▼
┌───────────────┐   ┌───────────────┐    ┌─────────────────────┐
│ Student Svc   │   │  Topic Svc    │    │  Registration Svc   │
│ (Internal)    │   │  (Internal)   │    │  (Internal)         │
└───────────────┘   └───────────────┘    └─────────────────────┘

```

> **Lưu ý về Bảo mật:** Các cổng của Service con (3001, 3002, 3003) được ẩn hoàn toàn khỏi Client. Mọi tương tác bắt buộc phải thông qua API Gateway tại cổng 3000.

---

## 🛠 Danh sách Dịch vụ & Thư viện Phụ thuộc (Dependencies)

### 1. Yêu cầu môi trường hệ thống

* **Node.js**: `v18.0.0` trở lên
* **npm**: `v9.0.0` trở lên
* **SQLite3**: Driver cơ sở dữ liệu nhúng (không cần cài đặt phần mềm bên ngoài)

### 2. Danh sách thư viện Node.js cần dùng

| Thư viện | Phiên bản khuyến nghị | Phạm vi sử dụng | Mục đích |
| --- | --- | --- | --- |
| `express` | `^4.18.0` | Tất cả 4 Services | Web framework xây dựng RESTful API |
| `cors` | `^2.8.5` | Tất cả 4 Services | Cho phép truy cập Cross-Origin Resource Sharing |
| `express-http-proxy` | `^2.0.0` | `api-gateway` | Middleware chuyển tiếp (Proxy) request từ Gateway sang Service con |
| `sqlite3` | `^5.1.0` | Các Service con | Driver kết nối và thao tác với CSDL SQLite |
| `concurrently` | `^8.0.0` | Root Project | Chạy đồng thời cả 4 dịch vụ bằng 1 lệnh duy nhất |

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### 1. Clone Repository

```bash
git clone [https://github.com/](https://github.com/)<your-username>/thesis-soa-demo.git
cd thesis-soa-demo

```

### 2. Cài đặt Thư viện (Dependencies)

* **Trường hợp 1: Cài đặt tập trung tại thư mục gốc**
```bash
npm install express cors sqlite3 express-http-proxy concurrently

```


* **Trường hợp 2: Quản lý riêng cho từng Service**
```bash
# Tại thư mục gốc (Cài đặt tool chạy đồng thời)
npm install concurrently --save-dev

# Cài đặt cho API Gateway
cd api-gateway && npm install express cors express-http-proxy && cd ..

# Cài đặt cho Student Service
cd student-service && npm install express cors sqlite3 && cd ..

# Cài đặt cho Topic Service
cd topic-service && npm install express cors sqlite3 && cd ..

# Cài đặt cho Registration Service
cd registration-service && npm install express cors sqlite3 && cd ..

```



### 3. Khởi tạo Cơ sở dữ liệu (Database Setup)

Các file CSDL `*.db` được cấu hình bỏ qua trong `.gitignore`. Cơ sở dữ liệu sẽ tự động được khởi tạo theo cơ chế:

* **Tự động tạo bảng (`Auto Schema Init`):** Khi từng dịch vụ con khởi chạy lần đầu, mã nguồn trong lớp `Model` sẽ tự tạo file `.db` và thực thi câu lệnh `CREATE TABLE IF NOT EXISTS`.

### 4. Khởi chạy Toàn bộ Hệ thống

Chạy lệnh duy nhất sau tại thư mục gốc để kích hoạt đồng thời 4 dịch vụ:

```bash
npm run dev

```

Màn hình Terminal thông báo hệ thống đã sẵn sàng:

```text
[3] API Gateway running on port 3000
[0] Student Service running on port 3001
[1] Topic Service running on port 3002
[2] Registration Service running on port 3003

```

---

## 📌 Danh sách API Endpoints (Thông qua Gateway Port 3000)

### 1. Hệ thống Gateway

| Phương thức | Endpoint Gateway | Mô tả |
| --- | --- | --- |
| `GET` | `/` | Trả về Service Catalog & trạng thái trực tuyến của các dịch vụ |

### 2. Quản lý Sinh viên (`/api/students`)

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| `GET` | `/api/students` | Lấy danh sách tất cả sinh viên |
| `GET` | `/api/students/:mssv` | Lấy thông tin chi tiết sinh viên theo MSSV |
| `POST` | `/api/students` | Tạo mới sinh viên |
| `PUT` | `/api/students/:mssv` | Cập nhật thông tin sinh viên |
| `DELETE` | `/api/students/:mssv` | Xóa sinh viên |

### 3. Quản lý Đề tài (`/api/topics`)

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| `GET` | `/api/topics` | Lấy danh sách tất cả đề tài |
| `GET` | `/api/topics/:maDeTai` | Lấy thông tin chi tiết đề tài theo mã |
| `POST` | `/api/topics` | Tạo mới đề tài |
| `PUT` | `/api/topics/:maDeTai` | Cập nhật thông tin đề tài |
| `PATCH` | `/api/topics/:maDeTai/status` | Cập nhật trạng thái đề tài |
| `DELETE` | `/api/topics/:maDeTai` | Xóa đề tài |

### 4. Quản lý Đăng ký (`/api/registrations`)

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| `GET` | `/api/registrations` | Lấy danh sách tất cả phiếu đăng ký |
| `GET` | `/api/registrations/:id` | Lấy chi tiết phiếu đăng ký theo ID |
| `POST` | `/api/registrations` | Tạo mới phiếu đăng ký đề tài |
| `DELETE` | `/api/registrations/:id` | Hủy/Xóa phiếu đăng ký |

---

## 🧪 Hướng dẫn Kiểm tra API (Testing)

1. **Trình duyệt Web (Chỉ hỗ trợ phương thức GET):**
* Lấy danh mục dịch vụ: `http://localhost:3000/`
* Lấy danh sách sinh viên: `http://localhost:3000/api/students`
* Lấy danh sách đề tài: `http://localhost:3000/api/topics`
* Lấy danh sách đăng ký: `http://localhost:3000/api/registrations`


2. **Thunder Client / Postman (Phương thức POST / PUT / DELETE):**
* **Thêm mới sinh viên:** `POST http://localhost:3000/api/students`
* **Headers:** `Content-Type: application/json`
* **Body (JSON):**
```json
{
  "mssv": "SV001",
  "hoTen": "Nguyen Van A",
  "email": "nva@example.com",
  "soDienThoai": "0901234567"
}

```





---

## 📁 Cấu trúc Dự án

```text
thesis-soa-demo/
├── api-gateway/            # API Gateway (Điểm truy cập tập trung Cổng 3000)
│   ├── config/             # Registry lưu danh mục các dịch vụ nội bộ
│   ├── routes/             # Cấu hình proxy và định tuyến URL
│   └── server.js           # Khởi chạy ứng dụng Gateway
├── student-service/        # Dịch vụ Quản lý Sinh viên (Port 3001)
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/             # Kết nối & Thao tác SQLite
│   └── server.js
├── topic-service/          # Dịch vụ Quản lý Đề tài (Port 3002)
│   └── ...
├── registration-service/   # Dịch vụ Đăng ký Đề tài (Port 3003)
│   └── ...
├── .gitignore              # Loại bỏ node_modules và các file *.db
├── package.json            # Cấu hình scripts và dependencies dùng chung
└── README.md               # Tài liệu hướng dẫn dự án

```

```

```