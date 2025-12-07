# Hướng dẫn khởi động Server

## Bước 1: Kiểm tra file .env

Đảm bảo file `.env` trong thư mục `Server` có nội dung:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=tinvietvp
DB_PORT=3306
SERVER_PORT=6969
```

## Bước 2: Tạo database

Chạy file SQL để tạo database:

```bash
mysql -u root -p < Server/database.sql
```

Hoặc mở MySQL và chạy nội dung file `Server/database.sql`

## Bước 3: Cài đặt dependencies (nếu chưa có)

```bash
cd Server
npm install
```

## Bước 4: Khởi động server

**Cách 1: Sử dụng script**
```bash
cd Server
start-server.bat
```

**Cách 2: Sử dụng npm**
```bash
cd Server
npm start
```

**Cách 3: Sử dụng nodemon trực tiếp**
```bash
cd Server
npx nodemon index.js
```

## Kiểm tra

Sau khi khởi động, bạn sẽ thấy:
- ✅ Connected to MySQL database
- 🚀 Server running at http://localhost:6969

Nếu có lỗi, kiểm tra:
1. MySQL đã chạy chưa?
2. Database `tinvietvp` đã được tạo chưa?
3. Thông tin trong file `.env` có đúng không?

