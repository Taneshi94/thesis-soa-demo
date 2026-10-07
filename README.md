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

> **Lưu ý về Bảo mật:** 
> - Các cổng của Service con (3001, 3002, 3003) được ẩn hoàn toàn khỏi Client và quản lý thông qua biến môi trường (`STUDENT_SERVICE_URL`, `TOPIC_SERVICE_URL`, `REGISTRATION_SERVICE_URL`).
> - Mọi tương tác của Client bắt buộc phải thông qua API Gateway tại cổng 3000.

---

## 🛠 Danh sách Dịch vụ & Thư viện Phụ thuộc (Dependencies)

### 1. Yêu cầu môi trường hệ thống

* **Node.js**: `v18.0.0` trở lên
* **npm**: `v9.0.0` trở lên
* **SQLite3**: Cơ sở dữ liệu nhúng (sử dụng driver `better-sqlite3`, không cần cài đặt phần mềm quản trị CSDL bên ngoài)

### 2. Danh sách thư viện Node.js cần dùng

| Thư viện | Phiên bản khuyến nghị | Phạm vi sử dụng | Mục đích |
| --- | --- | --- | --- |
| `express` | `^5.2.1` | Tất cả Services và Root Project | Web framework xây dựng RESTful API |
| `cors` | `^2.8.6` | Tất cả Services và Root Project | Cho phép truy cập Cross-Origin Resource Sharing |
| `better-sqlite3` | `^13.0.3` | Các Service con | Driver kết nối và thao tác CSDL SQLite hiệu năng cao |
| `express-http-proxy` | `^2.1.1` | API Gateway | Chuyển tiếp truy vấn từ Gateway tới các Microservices |
| `http-proxy-middleware` | `^4.2.0` | API Gateway | Middleware hỗ trợ định tuyến và cấu hình proxy nâng cao |
| `dotenv` | `^18.0.5` | Tất cả Services và Root Project | Tải cấu hình biến môi trường từ file `.env` vào `process.env` |
| `concurrently` | `^10.0.5` | Root Project | Chạy đồng thời cả 4 dịch vụ bằng 1 lệnh lệnh duy nhất |
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
npm install express cors better-sqlite3 express-http-proxy http-proxy-middleware dotenv concurrently
```

* **Trường hợp 2: Quản lý riêng cho từng Service**
```bash
# Tại thư mục gốc (Cài đặt công cụ chạy đồng thời và quản lý môi trường)
npm install concurrently dotenv --save-dev

# Cài đặt cho API Gateway
cd api-gateway && npm install express cors express-http-proxy http-proxy-middleware dotenv && cd ..

# Cài đặt cho Student Service
cd student-service && npm install express cors better-sqlite3 dotenv && cd ..

# Cài đặt cho Topic Service
cd topic-service && npm install express cors better-sqlite3 dotenv && cd ..

# Cài đặt cho Registration Service
cd registration-service && npm install express cors better-sqlite3 dotenv && cd ..
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
| `GET` | `/` | Trả về Service Catalog & trạng thái trực tuyến của các dịch vụ (chỉ lộ cổng Gateway) |

### 2. Quản lý Sinh viên (`/api/students`)

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| `GET` | `/api/students` | Lấy danh sách tất cả sinh viên |
| `GET` | `/api/students/:mssv` | Lấy thông tin sinh viên theo MSSV |
| `POST` | `/api/students` | Tạo mới sinh viên |
| `PUT` | `/api/students/:mssv` | Cập nhật thông tin sinh viên |
| `DELETE` | `/api/students/:mssv` | Xóa sinh viên |

### 3. Quản lý Đề tài (`/api/topics`)

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| `GET` | `/api/topics` | Lấy danh sách tất cả đề tài |
| `GET` | `/api/topics/:maDeTai` | Lấy chi tiết đề tài theo mã |
| `POST` | `/api/topics` | Tạo mới đề tài |
| `PUT` | `/api/topics/:maDeTai` | Cập nhật thông tin đề tài |
| `PATCH` | `/api/topics/:maDeTai/status` | Cập nhật riêng trạng thái đề tài |
| `DELETE` | `/api/topics/:maDeTai` | Xóa đề tài |

### 4. Quản lý Đăng ký & Đồng bộ (`/api/registrations`)

| Phương thức | Endpoint | Mô tả |
| --- | --- | --- |
| `GET` | `/api/registrations` | Lấy danh sách tất cả phiếu đăng ký |
| `GET` | `/api/registrations/:maDangKy` | Lấy chi tiết phiếu đăng ký theo mã |
| `POST` | `/api/registrations` | Tạo mới phiếu đăng ký đề tài |
| `PUT` | `/api/registrations/:maDangKy` | Cập nhật phiếu đăng ký |
| `DELETE` | `/api/registrations/:maDangKy` | Hủy/Xóa phiếu đăng ký theo mã |
| `PATCH` | `/api/registrations/sync-student/:mssv` | *(Nội bộ)* Đồng bộ thông tin tên sinh viên từ Student Service |
| `PATCH` | `/api/registrations/sync-topic/:maDeTai` | *(Nội bộ)* Đồng bộ thông tin tên đề tài từ Topic Service |
| `DELETE` | `/api/registrations/by-student/:mssv` | *(Nội bộ)* Tự động xóa tất cả phiếu đăng ký khi sinh viên bị xóa |
| `DELETE` | `/api/registrations/by-topic/:maDeTai` | *(Nội bộ)* Tự động xóa tất cả phiếu đăng ký khi đề tài bị xóa |

---

## 🧪 Hướng dẫn Kiểm tra API (Testing)

### 1. Kiểm tra trạng thái hoạt động của các Service (Service Catalog & Health Check)

Tất cả các truy vấn đều thực hiện qua **API Gateway (Port 3000)**. Bạn có thể mở trình duyệt web hoặc dùng cURL/Postman để kiểm tra danh mục và trạng thái trực tuyến của toàn bộ Microservices:

* **Xem Service Catalog & Trạng thái hoạt động:** `GET http://localhost:3000/`
  > *Trả về thông tin hệ thống, danh sách các endpoint khả dụng và trạng thái `ONLINE` / `OFFLINE` của từng dịch vụ con.*

* **Kiểm tra danh sách dữ liệu các dịch vụ:**
  * **Sinh viên:** `GET http://localhost:3000/api/students`
  * **Đề tài:** `GET http://localhost:3000/api/topics`
  * **Đăng ký:** `GET http://localhost:3000/api/registrations`

---

### 2. Kiểm tra tự động bằng Postman (Automated Test Suite)

Dự án đi kèm bộ kịch bản kiểm thử tự động gồm **21 bước liên hoàn** (`Thesis_SOA_Postman_3.json`) giúp khởi tạo dữ liệu ngẫu nhiên, tự động lưu biến (`current_mssv`, `current_maDeTai`, `current_maDangKy`), kiểm tra tính toàn vẹn và đối soát dữ liệu cuối cùng[cite: 16].

#### Các bước thực hiện:

1. **Import File Collection vào Postman:**
   * Mở ứng dụng **Postman** -> Chọn **Import** (ở góc trên bên trái).
   * Kéo thả file `Thesis_SOA_Postman_3.json` hoặc dán mã JSON của bộ Test Suite[cite: 16].

2. **Khởi chạy Collection Runner:**
   * Nhấp chuột phải vào Collection **`Thesis SOA Automated Test Suite (21 Steps)`** vừa import[cite: 16].
   * Chọn **Run collection**[cite: 16].

3. **Cấu hình tham số chạy:**
   * **Iterations:** `1`
   * **Delay:** `500 ms` hoặc `1000 ms` (giúp quan sát tiến trình rõ hơn)
   * **Môi trường / Biến:** Đảm bảo `base_url` được đặt giá trị `http://localhost:3000`[cite: 16].
   * **Tùy chọn lưu trữ (Trải nghiệm xem kết quả):** Tích chọn ô **`Persist responses for a session`** để xem lại dữ liệu JSON trả về của từng request sau khi chạy xong.

4. **Thực thi Kịch bản:**
   * Nhấn nút cam **Run Thesis SOA Automated Test Suite**[cite: 16].
   * Màn hình sẽ tự động thực thi tuần tự từ **Bước 01 đến Bước 21** (Tạo sinh viên/đề tài -> Cập nhật thông tin -> Tạo phiếu đăng ký -> Xóa cascade & kiểm tra đối soát CSDL)[cite: 16].
```

---

## 📁 Cấu trúc Dự án

thesis-soa-demo/
├── api-gateway/            # API Gateway (Điểm truy cập tập trung Cổng 3000)
│   ├── config/             # Registry lưu danh mục dịch vụ (serviceRegistry.js)
│   ├── routes/             # Dynamic Route Proxy & Service Catalog
│   ├── errorHandler.js     # Middleware xử lý lỗi Gateway
│   └── server.js           # Khởi chạy Gateway & Health Check
├── student-service/        # Dịch vụ Quản lý Sinh viên (Port 3001)
│   ├── config/             # Cấu hình kết nối CSDL SQLite
│   ├── controllers/        # Xử lý Request/Response cho Sinh viên
│   ├── interfaces/         # Khai báo cấu trúc dữ liệu / DTO Sinh viên
│   ├── models/             # Thao tác CSDL Sinh viên (better-sqlite3)
│   ├── routes/             # Định tuyến API Sinh viên
│   ├── services/           # Logic nghiệp vụ Quản lý Sinh viên
│   ├── types/              # Định nghĩa Type / Enum Sinh viên
│   ├── errorHandler.js     # Middleware xử lý lỗi Student Service
│   └── server.js           # Khởi chạy Student Service
├── topic-service/          # Dịch vụ Quản lý Đề tài (Port 3002)
│   ├── config/             # Cấu hình CSDL
│   ├── controllers/        # Controller Quản lý Đề tài
│   ├── interfaces/         # Khai báo cấu trúc dữ liệu / DTO Đề tài
│   ├── models/             # Thao tác CSDL Đề tài
│   ├── routes/             # Định tuyến API Đề tài
│   ├── services/           # Logic nghiệp vụ Đề tài
│   ├── types/              # Định nghĩa Type / Enum Đề tài
│   ├── errorHandler.js     # Middleware xử lý lỗi Topic Service
│   └── server.js           # Khởi chạy Topic Service
├── registration-service/   # Dịch vụ Quản lý Đăng ký & Đồng bộ (Port 3003)
│   ├── config/             # Cấu hình CSDL & Client gọi API ngoài
│   ├── controllers/        # Controller Đăng ký & Đồng bộ
│   ├── interfaces/         # Khai báo cấu trúc dữ liệu / DTO Đăng ký
│   ├── models/             # Thao tác CSDL Đăng ký
│   ├── routes/             # Route Đăng ký, Sync Data & Cascade Delete
│   ├── services/           # Logic nghiệp vụ Đăng ký & Call API liên dịch vụ
│   ├── types/              # Định nghĩa Type / Enum Đăng ký
│   ├── errorHandler.js     # Middleware xử lý lỗi Registration Service
│   └── server.js           # Khởi chạy Registration Service
├── .gitignore              # Loại bỏ node_modules và các file CSDL *.db
├── package.json            # Cấu hình scripts (concurrently) và dependencies dùng chung
├── README.md               # Tài liệu hướng dẫn dự án
├── testsuit postman.txt    # File văn bản mô tả 21 bước Test Suite
└── Thesis_SOA_Postman.json # Collection Postman tự động kiểm thử 21 bước
```