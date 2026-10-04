# Thesis SOA Demo - Express.js Microservices Architecture

Hệ thống demo kiến trúc Hướng dịch vụ (SOA / Microservices) được xây dựng bằng **Node.js** và **Express.js**. Dự án áp dụng mô hình kiến trúc 3 lớp (Model - Service - Controller), tích hợp **API Gateway** làm điểm truy cập tập trung và lưu trữ dữ liệu bằng **SQLite**.

---

## 🏗 Cấu trúc Kiến trúc & Cổng (Ports)

Tất cả các truy vấn từ ứng dụng client (Frontend/Mobile/Postman) gửi đến **API Gateway (Cổng 3000)** sẽ tự động được chuyển tiếp (Proxy) đến các dịch vụ tương ứng:

```text
[ Client / Postman / Browser ] 
              │
              ▼ (Port 3000)
┌────────────────────────────────────────────────────────┐
│                      API GATEWAY                       │
└───────┬───────────────────┬────────────────────┬───────┘
        │ /students         │ /topics            │ /registrations
        ▼                   ▼                    ▼
┌───────────────┐   ┌───────────────┐    ┌─────────────────────┐
│ Student Svc   │   │  Topic Svc    │    │  Registration Svc   │
│ (Port 3001)   │   │  (Port 3002)  │    │  (Port 3003)        │
└───────────────┘   └───────────────┘    └─────────────────────┘
```

---

## 🛠 Danh sách Dịch vụ & Thư viện Phụ thuộc (Dependencies)

### 1. Yêu cầu môi trường hệ thống
* **Node.js**: `v18.0.0` trở lên
* **npm**: `v9.0.0` trở lên
* **SQLite3**: Driver cơ sở dữ liệu nhúng (không cần cài đặt phần mềm bên ngoài)

### 2. Danh sách thư viện Node.js cần dùng

| Thư viện | Phiên bản khuyến nghị | Phạm vi sử dụng | Mục đích |
| :--- | :--- | :--- | :--- |
| `express` | `^4.18.0` | Tất cả 4 Services | Web framework để xây dựng RESTful API |
| `cors` | `^2.8.5` | Tất cả 4 Services | Cho phép truy cập Cross-Origin Resource Sharing |
| `http-proxy-middleware` | `^2.8.1` | `api-gateway` | Điều hướng request từ Gateway sang các service con |
| `sqlite3` | `^5.1.0` | các Service con | Driver kết nối và thao tác với CSDL SQLite |
| `concurrently` | `^8.0.0` | Root Project | Chạy đồng thời cả 4 dịch vụ bằng 1 lệnh duy nhất |

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### 1. Clone Repository
```bash
git clone [https://github.com/](https://github.com/)<your-username>/thesis-soa-demo.git
cd thesis-soa-demo
```

### 2. Cài đặt Thư viện (Dependencies)

* **Trường hợp 1: Dùng chung package.json tại thư mục gốc**
  ```bash
  npm install express cors sqlite3 http-proxy-middleware@^2.8.1 concurrently
  ```

* **Trường hợp 2: Quản lý package.json riêng cho từng Service**
  ```bash
  # Tại thư mục gốc (Cài đặt tool chạy đồng thời)
  npm install concurrently --save-dev

  # Cài đặt cho API Gateway
  cd api-gateway && npm install express cors http-proxy-middleware@^2.8.1 && cd ..

  # Cài đặt cho Student Service
  cd student-service && npm install express cors sqlite3 && cd ..

  # Cài đặt cho Topic Service
  cd topic-service && npm install express cors sqlite3 && cd ..

  # Cài đặt cho Registration Service
  cd registration-service && npm install express cors sqlite3 && cd ..
  ```

### 3. Khởi tạo Cơ sở dữ liệu (Database Setup)
Các file CSDL `*.db` được cấu hình bỏ qua trong `.gitignore`. Cơ sở dữ liệu sẽ tự động được khởi tạo theo cơ chế:
* **Tự động tạo bảng (`Auto Schema Init`):** Khi mỗi dịch vụ con khởi chạy lần đầu, mã nguồn trong lớp `Model` sẽ tự tạo file `.db` và thực thi câu lệnh `CREATE TABLE IF NOT EXISTS`.

### 4. Khởi chạy Toàn bộ Hệ thống
Chạy lệnh duy nhất sau tại thư mục gốc để kích hoạt đồng thời 4 dịch vụ:

```bash
npm run dev
```

Màn hình Terminal thông báo các cổng chạy thành công:
```text
[3] API Gateway running on port 3000
[0] Student Service running on port 3001
[1] Topic Service running on port 3002
[2] Registration Service running on port 3003
```

---

## 📌 Danh sách API Endpoints

### 1. API Gateway (`http://localhost:3000`)

| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/` | Kiểm tra trạng thái hoạt động của API Gateway (Health Check) |
| `POST` | `/auth/login` | Xử lý đăng nhập hệ thống |
| `POST` | `/auth/register` | Xử lý đăng ký tài khoản mới |

### 2. Chuyển tiếp Dịch vụ (Routed via Gateway)

| Dịch vụ | Phương thức | URL truy cập qua Gateway (Port 3000) | URL trực tiếp Service con |
| :--- | :--- | :--- | :--- |
| **Student Service** | `GET` / `POST` / `PUT` / `DELETE` | `http://localhost:3000/students` | `http://localhost:3001/` |
| **Topic Service** | `GET` / `POST` / `PUT` / `DELETE` | `http://localhost:3000/topics` | `http://localhost:3002/` |
| **Registration Service** | `GET` / `POST` / `PUT` / `DELETE` | `http://localhost:3000/registrations` | `http://localhost:3003/` |

---

## 🧪 Hướng dẫn Kiểm tra API (Testing)

1. **Trình duyệt Web (Chỉ hỗ trợ phương thức GET):**
   * Kiểm tra Gateway: `http://localhost:3000/`
   * Lấy danh sách sinh viên: `http://localhost:3000/students`
   * Lấy danh sách đề tài: `http://localhost:3000/topics`
   * Lấy danh sách đăng ký: `http://localhost:3000/registrations`

2. **Thunder Client / Postman (Phương thức POST / PUT / DELETE):**
   * **Đăng nhập:** `POST http://localhost:3000/auth/login`
   * **Thêm mới sinh viên:** `POST http://localhost:3000/students`
   * **Headers:** `Content-Type: application/json`
   * **Body (JSON):**
     ```json
     {
       "studentCode": "SV001",
       "fullName": "Nguyen Van A",
       "email": "nva@example.com"
     }
     ```

---

## 📁 Cấu trúc Dự án

```text
thesis-soa-demo/
├── api-gateway/            # Điều hướng Proxy & Xác thực tập trung
│   ├── routes/             # Định tuyến Auth Routes
│   ├── controllers/        # Xử lý logic Auth
│   ├── errorHandler.js     # Middleware bắt lỗi tập trung
│   └── server.js           # Cấu hình Express Gateway & Proxy (Port 3000)
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