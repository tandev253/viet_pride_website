# Hướng Dẫn Thiết Lập Strapi.io Backend

Tài liệu này hướng dẫn cách thiết lập Strapi.io backend cho website Viet Pride Gang.

## 1. Cài Đặt Strapi

### Tạo Project Mới

```bash
npx create-strapi-app@latest viet-pride-backend --quickstart
cd viet-pride-backend
```

Sau khi cài đặt xong, Strapi sẽ tự động mở Admin Panel tại `http://localhost:1337/admin`

### Tạo Admin Account

Điền thông tin admin đầu tiên:
- Email
- Password
- Username

## 2. Cấu Hình Roles & Permissions

### 2.1 Tạo Custom Roles

Vào **Settings → Users & Permissions Plugin → Roles**

Tạo các roles sau (ngoài roles mặc định `Authenticated` và `Public`):

1. **Admin** - Quản trị viên cấp cao nhất
2. **Quản Lý Gia Tộc** - Quản lý các hoạt động gia tộc
3. **Quản Lý Doanh Nghiệp** - Quản lý doanh nghiệp trong game
4. **VP Team** - Thành viên team VP
5. **Việt Pride** - Thành viên chính thức
6. **Khách** - Role mặc định cho user mới đăng ký

### 2.2 Cấu Hình Permissions

Cho mỗi role, cấu hình permissions phù hợp trong **Settings → Roles → [Role Name] → Permissions**

**Khách** (role mặc định):
- Chỉ có quyền đọc (find, findOne) các collection công khai
- Không được hiển thị trong danh sách Members

**Việt Pride** đến **Admin**:
- Có quyền đọc và tạo content
- Admin có full permissions

## 3. Tạo Collection Types

### 3.1 Member Tiers (Cấp Độ Thành Viên)

**Content-Type Name:** `member-tier`

**Fields:**
- `name` (Text, Required) - Tên cấp độ
- `slug` (UID, Required, Based on name)
- `description` (Rich Text) - Mô tả
- `color` (Text, Required) - Mã màu hex (#FFD700)
- `icon` (Media, Single) - Icon cho cấp độ
- `permissions` (JSON) - Quyền hạn
- `order` (Number, Required) - Thứ tự sắp xếp
- `isActive` (Boolean, Default: true)

**Sample Data:**
```json
[
  { "name": "Admin", "color": "#FFD700", "order": 1 },
  { "name": "Quản Lý Gia Tộc", "color": "#FF6B35", "order": 2 },
  { "name": "Quản Lý Doanh Nghiệp", "color": "#00F0FF", "order": 3 },
  { "name": "VP Team", "color": "#DC143C", "order": 4 },
  { "name": "Việt Pride", "color": "#DC143C", "order": 5 }
]
```

### 3.2 Servers (Server GTA V)

**Content-Type Name:** `server`

**Fields:**
- `name` (Text, Required)
- `slug` (UID, Required)
- `description` (Rich Text)
- `image` (Media, Single)
- `status` (Enumeration: Active, Inactive, Archived)
- `joinedDate` (Date)
- `leftDate` (Date)
- `memberCount` (Number)
- `achievements` (Rich Text)
- `order` (Number)

### 3.3 Members (Thành Viên)

**Content-Type Name:** `member`

**Fields:**
- `username` (Text, Required, Unique)
- `displayName` (Text, Required)
- `email` (Email)
- `avatar` (Media, Single)
- `tier` (Relation: Many-to-One with member-tier)
- `joinDate` (Date, Required)
- `status` (Enumeration: Active, Inactive, Suspended, Left)
- `servers` (Relation: Many-to-Many with server)
- `bio` (Rich Text)
- `role` (Text) - Role từ Users & Permissions
- `contributions` (Number, Default: 0)
- `joinedAt` (DateTime)
- `lastActive` (DateTime)
- `isVerified` (Boolean, Default: false)

### 3.4 Categories (Danh Mục Bài Viết)

**Content-Type Name:** `category`

**Fields:**
- `name` (Text, Required)
- `slug` (UID, Required)
- `description` (Rich Text)
- `icon` (Text) - Lucide icon name
- `color` (Text) - Mã màu hex
- `order` (Number)

**Sample Data:**
```json
[
  { "name": "Tin Tức", "slug": "tin-tuc", "icon": "Newspaper", "order": 1 },
  { "name": "Hướng Dẫn", "slug": "huong-dan", "icon": "BookOpen", "order": 2 },
  { "name": "Thành Tích", "slug": "thanh-tich", "icon": "Trophy", "order": 3 }
]
```

### 3.5 Posts (Bài Viết)

**Content-Type Name:** `post`

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Required)
- `content` (Rich Text, Required)
- `excerpt` (Text)
- `author` (Relation: Many-to-One with member)
- `category` (Relation: Many-to-One with category)
- `server` (Relation: Many-to-One with server)
- `thumbnail` (Media, Single)
- `images` (Media, Multiple)
- `tags` (JSON)
- `publishedAt` (DateTime)
- `status` (Enumeration: Draft, Published, Archived)
- `views` (Number, Default: 0)
- `likes` (Number, Default: 0)
- `isFeatured` (Boolean, Default: false)
- `seoDescription` (Text)

### 3.6 Events (Sự Kiện)

**Content-Type Name:** `event`

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Required)
- `description` (Rich Text, Required)
- `server` (Relation: Many-to-One with server)
- `organizer` (Relation: Many-to-One with member)
- `startDate` (DateTime, Required)
- `endDate` (DateTime)
- `location` (Text)
- `image` (Media, Single)
- `banner` (Media, Single)
- `participants` (Relation: Many-to-Many with member)
- `maxParticipants` (Number)
- `status` (Enumeration: Upcoming, Ongoing, Completed, Cancelled)
- `type` (Text) - Heist, Race, PvP, etc.
- `difficulty` (Enumeration: Easy, Medium, Hard, Extreme)
- `rewards` (Rich Text)
- `rules` (Rich Text)
- `registrationDeadline` (DateTime)
- `isPublic` (Boolean, Default: true)

## 4. Cấu Hình API

### 4.1 Enable Public Access

Vào **Settings → Users & Permissions Plugin → Roles → Public**

Enable các permissions sau:
- `member-tier`: find, findOne
- `server`: find, findOne
- `category`: find, findOne
- `post`: find, findOne (chỉ published)
- `event`: find, findOne (chỉ public)

### 4.2 Enable Authenticated Access

Vào **Settings → Users & Permissions Plugin → Roles → Authenticated**

Enable thêm permissions:
- `member`: find, findOne, update (own)
- `post`: create
- `event`: create, update (own)

### 4.3 Tạo API Token

Vào **Settings → API Tokens → Create new API Token**

- Name: `Viet Pride Website`
- Token type: `Full access` hoặc `Custom` (tuỳ nhu cầu)
- Token duration: `Unlimited`

Copy token và lưu lại.

## 5. Cấu Hình Frontend

### 5.1 Environment Variables

Tạo file `.env.local` trong project Next.js:

```env
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_api_token_here
```

**Production:**
```env
VITE_STRAPI_URL=https://your-strapi-domain.com
VITE_STRAPI_API_TOKEN=your_production_api_token
```

### 5.2 Test Connection

Mở browser console và test:

```javascript
fetch('http://localhost:1337/api/member-tiers')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 6. Authentication Flow

### 6.1 User Registration

Khi user đăng ký qua website:
1. Frontend gọi `/api/auth/local/register`
2. Strapi tạo user với role mặc định `Authenticated`
3. Frontend nhận JWT token và user data
4. Lưu JWT vào localStorage

### 6.2 Assign Custom Role

Admin cần manually assign custom role cho user:

1. Vào **Content Manager → User** (trong Users & Permissions Plugin)
2. Chọn user cần cấp role
3. Trong field `role`, chọn role phù hợp (Việt Pride, VP Team, etc.)
4. Save

### 6.3 Create Member Profile

Sau khi assign role, tạo Member profile:

1. Vào **Content Manager → Member**
2. Create new entry
3. Link với user account (qua username hoặc email)
4. Điền thông tin: tier, joinDate, status, etc.
5. Publish

**Lưu ý:** Chỉ members có role chính thức (không phải "Khách") mới hiển thị trong trang Members.

## 7. Deploy Strapi

### 7.1 Database

Strapi mặc định dùng SQLite (dev only). Production nên dùng:
- PostgreSQL (recommended)
- MySQL
- MariaDB

### 7.2 Hosting Options

- **Strapi Cloud** - Official hosting
- **Heroku** - Free tier available
- **Railway** - Modern platform
- **DigitalOcean** - VPS
- **AWS/Google Cloud** - Enterprise

### 7.3 Environment Variables

Set các biến môi trường sau trên hosting:

```env
DATABASE_HOST=your_db_host
DATABASE_PORT=5432
DATABASE_NAME=your_db_name
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_api_token_salt
```

## 8. Bảo Mật

### 8.1 CORS

Cấu hình CORS trong `config/middlewares.js`:

```javascript
module.exports = [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://your-frontend-domain.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
  // ...
];
```

### 8.2 Rate Limiting

Cài đặt rate limiting để chống spam:

```bash
npm install @strapi/plugin-users-permissions
```

### 8.3 SSL/HTTPS

Luôn dùng HTTPS cho production. Hầu hết hosting platforms đều cung cấp SSL miễn phí.

## 9. Backup & Maintenance

### 9.1 Database Backup

Thiết lập automated backup cho database:
- Daily backups
- Keep backups for 30 days
- Test restore procedure

### 9.2 Media Backup

Backup folder `public/uploads` hoặc dùng cloud storage:
- AWS S3
- Cloudinary
- DigitalOcean Spaces

### 9.3 Updates

Thường xuyên update Strapi:

```bash
npm outdated
npm update
```

## 10. Troubleshooting

### CORS Error

Kiểm tra `config/middlewares.js` và đảm bảo frontend domain được whitelist.

### 401 Unauthorized

- Kiểm tra API token
- Kiểm tra JWT token còn hạn
- Kiểm tra permissions cho role

### 404 Not Found

- Kiểm tra collection type đã được tạo
- Kiểm tra API endpoint đúng format
- Kiểm tra data đã được publish

## 11. Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi Forum](https://forum.strapi.io/)
- [Strapi Discord](https://discord.strapi.io/)
- [Next.js + Strapi Tutorial](https://strapi.io/blog/nextjs-react-hooks-strapi-food-app-1)

## 12. Support

Nếu gặp vấn đề, liên hệ:
- Strapi Community Forum
- GitHub Issues
- Discord Channel

---

**Lưu ý:** Tài liệu này được tạo cho website Viet Pride Gang. Điều chỉnh theo nhu cầu cụ thể của project.
