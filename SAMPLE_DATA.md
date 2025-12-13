# Dữ Liệu Mẫu Cho Strapi

Hướng dẫn thêm dữ liệu mẫu vào Strapi để test website.

## 1. Member Tiers (Cấp Bậc Thành Viên)

Vào **Content Manager → Member Tier → Create new entry**

### Tier 1: Admin
- **name:** `Admin`
- **slug:** `admin` (tự động)
- **description:** `Quản trị viên cao nhất của bang hội`
- **color:** `#FFD700` (Gold)
- **order:** `1`
- **isActive:** `true`

### Tier 2: Quản Lý Gia Tộc
- **name:** `Quản Lý Gia Tộc`
- **slug:** `quan-ly-gia-toc`
- **description:** `Quản lý các hoạt động gia tộc`
- **color:** `#FF6B35` (Orange)
- **order:** `2`
- **isActive:** `true`

### Tier 3: Quản Lý Doanh Nghiệp
- **name:** `Quản Lý Doanh Nghiệp`
- **slug:** `quan-ly-doanh-nghiep`
- **description:** `Quản lý các doanh nghiệp của bang`
- **color:** `#00F0FF` (Electric Blue)
- **order:** `3`
- **isActive:** `true`

### Tier 4: VP Team
- **name:** `VP Team`
- **slug:** `vp-team`
- **description:** `Thành viên chính thức của đội ngũ`
- **color:** `#DC143C` (Crimson Red)
- **order:** `4`
- **isActive:** `true`

### Tier 5: Việt Pride
- **name:** `Việt Pride`
- **slug:** `viet-pride`
- **description:** `Thành viên cơ bản`
- **color:** `#FFFFFF` (White)
- **order:** `5`
- **isActive:** `true`

---

## 2. Servers (Máy Chủ)

Vào **Content Manager → Server → Create new entry**

### Server 1: VietNam RolePlay
- **name:** `VietNam RolePlay`
- **slug:** `vietnam-roleplay`
- **description:** `Máy chủ roleplay chính của Việt Pride`
- **serverStatus:** `Active`
- **joinedDate:** `2020-01-15`
- **memberCount:** `45`
- **achievements:** `🏆 Top 1 Gang War 2022\n🎖️ 500+ Heists Completed\n⭐ Community Leader Award`
- **order:** `1`

### Server 2: Los Santos Life
- **name:** `Los Santos Life`
- **slug:** `los-santos-life`
- **description:** `Máy chủ roleplay phụ`
- **serverStatus:** `Active`
- **joinedDate:** `2021-06-20`
- **memberCount:** `32`
- **achievements:** `🏁 15 Racing Championships\n💰 $100M+ Earned`
- **order:** `2`

### Server 3: GTA V Online Vietnam
- **name:** `GTA V Online Vietnam`
- **slug:** `gta-v-online-vietnam`
- **description:** `Máy chủ cộng đồng Việt Nam`
- **serverStatus:** `Active`
- **joinedDate:** `2022-03-10`
- **memberCount:** `28`
- **achievements:** `🎯 50+ Events Organized\n👥 Growing Community`
- **order:** `3`

---

## 3. Categories (Danh Mục Bài Viết)

Vào **Content Manager → Category → Create new entry**

### Category 1: Tin Tức
- **name:** `Tin Tức`
- **slug:** `tin-tuc`
- **description:** `Tin tức và thông báo mới nhất`
- **icon:** `📰`
- **color:** `#DC143C`
- **order:** `1`

### Category 2: Hướng Dẫn
- **name:** `Hướng Dẫn`
- **slug:** `huong-dan`
- **description:** `Hướng dẫn chơi game và hoạt động`
- **icon:** `📚`
- **color:** `#00F0FF`
- **order:** `2`

### Category 3: Sự Kiện
- **name:** `Sự Kiện`
- **slug:** `su-kien`
- **description:** `Thông tin về các sự kiện`
- **icon:** `🎉`
- **color:** `#FFD700`
- **order:** `3`

### Category 4: Thành Tích
- **name:** `Thành Tích`
- **slug:** `thanh-tich`
- **description:** `Các thành tích của bang hội`
- **icon:** `🏆`
- **color:** `#FF6B35`
- **order:** `4`

---

## 4. Users (Thành Viên)

Vào **Content Manager → User (from: users-permissions) → Create new entry**

### User 1: Admin
- **username:** `vietpride_admin`
- **email:** `admin@vietpride.com`
- **password:** `Admin123!@#` (set khi tạo)
- **confirmed:** `true`
- **blocked:** `false`
- **displayName:** `Viet Pride Boss`
- **tier:** Chọn `Admin` (từ Member Tier)
- **joinDate:** `2020-01-15`
- **memberStatus:** `Active`
- **bio:** `Gang leader and founder of Viet Pride`
- **contributions:** `1000`
- **isVerified:** `true`

### User 2: Manager
- **username:** `vp_manager`
- **email:** `manager@vietpride.com`
- **password:** `Manager123!@#`
- **confirmed:** `true`
- **blocked:** `false`
- **displayName:** `VP Manager`
- **tier:** Chọn `Quản Lý Gia Tộc`
- **joinDate:** `2020-03-20`
- **memberStatus:** `Active`
- **bio:** `Family operations manager`
- **contributions:** `750`
- **isVerified:** `true`

### User 3: Member
- **username:** `vp_member`
- **email:** `member@vietpride.com`
- **password:** `Member123!@#`
- **confirmed:** `true`
- **blocked:** `false`
- **displayName:** `VP Member`
- **tier:** Chọn `Việt Pride`
- **joinDate:** `2021-06-15`
- **memberStatus:** `Active`
- **bio:** `Active gang member`
- **contributions:** `250`
- **isVerified:** `true`

---

## 5. Posts (Bài Viết)

Vào **Content Manager → Post → Create new entry**

### Post 1: Chào Mừng
- **title:** `Chào Mừng Đến Với Viet Pride`
- **slug:** `chao-mung-den-voi-viet-pride`
- **content:** 
```
# Chào Mừng Đến Với Viet Pride

Viet Pride là một trong những bang hội mạnh nhất trong cộng đồng GTA V Online Việt Nam. Chúng tôi tự hào với:

- 🏆 Hơn 4 năm hoạt động liên tục
- 👥 100+ thành viên trên 10+ servers
- 💰 $500M+ kiếm được từ heists
- 🎯 500+ sự kiện đã tổ chức

Hãy tham gia cùng chúng tôi!
```
- **excerpt:** `Giới thiệu về bang hội Viet Pride - một trong những bang hội mạnh nhất GTA V Online VN`
- **author:** Chọn `vietpride_admin`
- **category:** Chọn `Tin Tức`
- **server:** Chọn `VietNam RolePlay`
- **postStatus:** `Published`
- **views:** `1250`
- **likes:** `89`
- **isFeatured:** `true`

### Post 2: Hướng Dẫn Heist
- **title:** `Hướng Dẫn Hoàn Thành Heist Hiệu Quả`
- **slug:** `huong-dan-hoan-thanh-heist-hieu-qua`
- **content:**
```
# Hướng Dẫn Hoàn Thành Heist Hiệu Quả

## Chuẩn Bị
1. Tập hợp đội ngũ 4 người
2. Chuẩn bị vũ khí và giáp
3. Lên kế hoạch chi tiết

## Thực Hiện
- Phân công vai trò rõ ràng
- Giao tiếp liên tục qua voice chat
- Hỗ trợ đồng đội khi cần

## Mẹo Hay
💡 Luôn có 1 người làm driver
💡 Mang theo snacks và armor
💡 Tránh đấu súng không cần thiết
```
- **excerpt:** `Mẹo và chiến thuật để hoàn thành heist một cách hiệu quả nhất`
- **author:** Chọn `vp_manager`
- **category:** Chọn `Hướng Dẫn`
- **server:** Chọn `VietNam RolePlay`
- **postStatus:** `Published`
- **views:** `856`
- **likes:** `67`
- **isFeatured:** `false`

---

## 6. Events (Sự Kiện)

Vào **Content Manager → Event → Create new entry**

### Event 1: Gang War Championship
- **title:** `Gang War Championship 2024`
- **slug:** `gang-war-championship-2024`
- **description:**
```
# Gang War Championship 2024

Giải đấu Gang War lớn nhất năm! Tham gia cùng Viet Pride để tranh tài với các bang hội mạnh nhất.

## Giải Thưởng
- 🥇 1st Place: $10M + Trophy
- 🥈 2nd Place: $5M
- 🥉 3rd Place: $2M

## Thể Lệ
- 5v5 Team Deathmatch
- Best of 3 rounds
- No explosives allowed
```
- **server:** Chọn `VietNam RolePlay`
- **organizer:** Chọn `vietpride_admin`
- **startDate:** `2024-12-20 19:00:00`
- **endDate:** `2024-12-20 22:00:00`
- **location:** `Los Santos Arena`
- **maxParticipants:** `10`
- **eventStatus:** `Upcoming`
- **type:** `PvP`
- **difficulty:** `Hard`
- **rewards:** `$10M + Trophy + Gang Reputation`
- **isPublic:** `true`

### Event 2: Heist Marathon
- **title:** `Heist Marathon - Cayo Perico`
- **slug:** `heist-marathon-cayo-perico`
- **description:**
```
# Heist Marathon - Cayo Perico

Thử thách hoàn thành Cayo Perico Heist nhiều lần nhất trong 4 giờ!

## Mục Tiêu
- Hoàn thành nhiều lần nhất
- Kiếm được nhiều tiền nhất
- Không được caught

## Giải Thưởng
Top 3 sẽ nhận được phần thưởng hấp dẫn!
```
- **server:** Chọn `VietNam RolePlay`
- **organizer:** Chọn `vp_manager`
- **startDate:** `2024-12-25 15:00:00`
- **endDate:** `2024-12-25 19:00:00`
- **location:** `Cayo Perico Island`
- **maxParticipants:** `20`
- **eventStatus:** `Upcoming`
- **type:** `Heist`
- **difficulty:** `Medium`
- **rewards:** `$5M + Exclusive Items`
- **isPublic:** `true`

---

## Sau Khi Thêm Dữ Liệu

1. **Verify Permissions:**
   - Settings → Roles → Public
   - Đảm bảo đã tick `find` và `findOne` cho tất cả collection types

2. **Test API:**
   - Mở browser console
   - Truy cập: `http://strapi.vietpride.online/api/member-tiers`
   - Kiểm tra có data trả về không

3. **Test Frontend:**
   - Truy cập: https://3000-iefajlmyg7olhzxw7pmly-2853d326.manus-asia.computer
   - Kiểm tra các trang: Members, Events, Posts, Servers
   - Data từ Strapi sẽ hiển thị thay vì mock data

---

## Troubleshooting

**Nếu không thấy data:**
1. Kiểm tra Permissions (Settings → Roles → Public)
2. Kiểm tra API Token đã đúng chưa
3. Mở browser console xem có lỗi API không
4. Verify Strapi đang chạy: `http://strapi.vietpride.online/api/member-tiers`
