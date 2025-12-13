# Demo Credentials

Website đang chạy ở chế độ DEMO với mock authentication. Sử dụng các tài khoản sau để test:

## Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin
- **Quyền:** Full access, có thể truy cập Admin Dashboard

## Manager Account
- **Username:** `manager`
- **Password:** `manager123`
- **Role:** Quản Lý Gia Tộc
- **Quyền:** Quản lý gia tộc

## Member Account
- **Username:** `member`
- **Password:** `member123`
- **Role:** Việt Pride
- **Quyền:** Thành viên chính thức

## Guest Account
- **Username:** `guest`
- **Password:** `guest123`
- **Role:** Khách
- **Quyền:** Quyền hạn giới hạn, không hiển thị trong Members page

---

## Hướng Dẫn Test

### 1. Test Admin Dashboard
1. Đăng nhập với tài khoản `admin` / `admin123`
2. Link "Admin" sẽ xuất hiện trong Navigation
3. Click vào "Admin" để truy cập Dashboard
4. Test các chức năng:
   - Xem stats cards
   - Search users
   - Filter by status
   - Assign roles
   - Delete users (mock only)

### 2. Test Role-Based Access
1. Đăng nhập với các tài khoản khác nhau
2. Kiểm tra quyền truy cập:
   - Admin: Có link "Admin" trong nav
   - Non-admin: Không có link "Admin"
   - Guest: Không hiển thị trong Members page

### 3. Test Authentication Flow
1. Đăng xuất (nếu đã đăng nhập)
2. Vào trang Login
3. Đăng nhập với credentials trên
4. Kiểm tra user menu trong Navigation
5. Test logout

---

## Chuyển Sang Strapi Backend

Khi sẵn sàng kết nối với Strapi:

1. Mở file `client/src/contexts/AuthContext.tsx`
2. Tìm dòng: `const USE_MOCK_AUTH = true;`
3. Đổi thành: `const USE_MOCK_AUTH = false;`
4. Đảm bảo Strapi backend đã được setup theo `STRAPI_SETUP.md`
5. Cấu hình environment variables trong `.env.local`

---

## Lưu Ý

- Mock auth chỉ dùng cho testing, không dùng cho production
- Dữ liệu được lưu trong localStorage của browser
- Clear localStorage để reset authentication state
- Mock users được định nghĩa trong `AuthContext.tsx`
