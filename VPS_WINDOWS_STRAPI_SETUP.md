# Hướng Dẫn Thiết Lập Strapi Trên VPS Windows 11

Hướng dẫn chi tiết cách cài đặt và cấu hình Strapi backend trên VPS Windows 11 để kết nối với website Viet Pride.

## Yêu Cầu VPS

### Cấu Hình Tối Thiểu
- **RAM:** 4GB (khuyến nghị 8GB cho Windows)
- **CPU:** 2 cores
- **Disk:** 40GB SSD
- **OS:** Windows Server 2019/2022 hoặc Windows 11
- **Bandwidth:** Unlimited hoặc ít nhất 1TB/tháng

### Nhà Cung Cấp VPS Windows
- **Contabo** - €8.99/tháng (6GB RAM, 4 CPU)
- **Vultr** - $24/tháng (4GB RAM, 2 CPU)
- **DigitalOcean** - $24/tháng (4GB RAM, 2 CPU)
- **Kamatera** - $20/tháng (4GB RAM, 2 CPU)

## Bước 1: Kết Nối VPS

### Remote Desktop Connection

1. Mở **Remote Desktop Connection** trên máy tính
2. Nhập IP address của VPS
3. Click **Connect**
4. Nhập username và password
5. Click **OK**

### Hoặc Dùng RDP Client

- **Windows:** Built-in Remote Desktop
- **Mac:** Microsoft Remote Desktop từ App Store
- **Linux:** Remmina hoặc xfreerdp

## Bước 2: Cài Đặt Dependencies

### 2.1 Cài Đặt Node.js

1. Mở browser trên VPS
2. Truy cập: https://nodejs.org/
3. Download **LTS version** (18.x)
4. Chạy installer
5. Chọn **Add to PATH** trong quá trình cài đặt
6. Click **Next** → **Install**

**Kiểm tra cài đặt:**

Mở **PowerShell** hoặc **Command Prompt**:

```powershell
node --version
npm --version
```

### 2.2 Cài Đặt PostgreSQL

1. Truy cập: https://www.postgresql.org/download/windows/
2. Download **PostgreSQL 15** (hoặc 14)
3. Chạy installer
4. Thiết lập:
   - **Password:** Nhập password cho postgres user (ghi nhớ!)
   - **Port:** 5432 (default)
   - **Locale:** Default
5. Bỏ chọn **Stack Builder** ở cuối
6. Click **Finish**

**Thêm PostgreSQL vào PATH:**

1. Mở **System Properties** → **Environment Variables**
2. Trong **System variables**, tìm **Path**
3. Click **Edit** → **New**
4. Thêm: `C:\Program Files\PostgreSQL\15\bin`
5. Click **OK**

**Kiểm tra:**

```powershell
psql --version
```

### 2.3 Cài Đặt Git (Optional nhưng khuyến nghị)

1. Truy cập: https://git-scm.com/download/win
2. Download và cài đặt
3. Chọn **Use Git from Windows Command Prompt**

### 2.4 Cài Đặt PM2 (Process Manager)

Mở **PowerShell as Administrator**:

```powershell
npm install -g pm2
npm install -g pm2-windows-startup

# Setup PM2 to run on startup
pm2-startup install
```

### 2.5 Cài Đặt IIS (Web Server) - Optional

**Nếu muốn dùng IIS làm reverse proxy:**

1. Mở **Server Manager**
2. Click **Add roles and features**
3. Chọn **Web Server (IIS)**
4. Click **Next** → **Install**

**Hoặc dùng PowerShell:**

```powershell
Install-WindowsFeature -name Web-Server -IncludeManagementTools
```

## Bước 3: Cấu Hình PostgreSQL

### Tạo Database và User

Mở **SQL Shell (psql)** từ Start Menu:

```sql
-- Login với postgres user
-- Password: (nhập password đã tạo lúc cài đặt)

-- Tạo database
CREATE DATABASE viet_pride_db;

-- Tạo user
CREATE USER viet_pride_user WITH PASSWORD 'YourSecurePassword123!';

-- Cấp quyền
GRANT ALL PRIVILEGES ON DATABASE viet_pride_db TO viet_pride_user;

-- Thoát
\q
```

### Test Connection

```powershell
psql -h localhost -U viet_pride_user -d viet_pride_db
# Nhập password
# Nếu thành công, gõ \q để thoát
```

## Bước 4: Cài Đặt Strapi

### Tạo Project Directory

Mở **PowerShell**:

```powershell
# Tạo thư mục projects
cd C:\
mkdir projects
cd projects
```

### Tạo Strapi Project

```powershell
npx create-strapi-app@latest viet-pride-backend --quickstart --no-run
```

Chờ quá trình cài đặt hoàn tất (có thể mất 5-10 phút).

### Cấu Hình Database

```powershell
cd viet-pride-backend
```

Tạo file `.env` trong thư mục project:

```powershell
notepad .env
```

Thêm nội dung sau:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=GenerateRandomKey1,GenerateRandomKey2,GenerateRandomKey3,GenerateRandomKey4
API_TOKEN_SALT=GenerateRandomSalt1
ADMIN_JWT_SECRET=GenerateRandomSecret1
TRANSFER_TOKEN_SALT=GenerateRandomSalt2
JWT_SECRET=GenerateRandomSecret2

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=viet_pride_db
DATABASE_USERNAME=viet_pride_user
DATABASE_PASSWORD=YourSecurePassword123!
DATABASE_SSL=false

# Public URL (thay bằng domain hoặc IP của bạn)
URL=http://your_vps_ip:1337
```

**Tạo random secrets:**

Mở **PowerShell** và chạy:

```powershell
# Tạo random string
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

Chạy lệnh trên 6 lần và thay vào các trường trong `.env`.

### Cài Đặt PostgreSQL Driver

```powershell
npm install pg
```

### Cấu Hình Database Connection

Mở file `config\database.js`:

```powershell
notepad config\database.js
```

Thay thế nội dung:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'viet_pride_db'),
      user: env('DATABASE_USERNAME', 'viet_pride_user'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

## Bước 5: Build và Start Strapi

### Build Production

```powershell
$env:NODE_ENV="production"
npm run build
```

### Start với PM2

```powershell
pm2 start npm --name "viet-pride-strapi" -- run start

# Lưu PM2 configuration
pm2 save

# Check status
pm2 status
pm2 logs viet-pride-strapi
```

### Hoặc Start Trực Tiếp (Development)

```powershell
npm run develop
```

## Bước 6: Cấu Hình Windows Firewall

### Mở Port 1337

Mở **PowerShell as Administrator**:

```powershell
# Allow inbound traffic on port 1337
New-NetFirewallRule -DisplayName "Strapi API" -Direction Inbound -LocalPort 1337 -Protocol TCP -Action Allow

# Verify rule
Get-NetFirewallRule -DisplayName "Strapi API"
```

### Hoặc Dùng GUI

1. Mở **Windows Defender Firewall with Advanced Security**
2. Click **Inbound Rules** → **New Rule**
3. Chọn **Port** → **Next**
4. Chọn **TCP**, nhập **1337** → **Next**
5. Chọn **Allow the connection** → **Next**
6. Chọn **Domain, Private, Public** → **Next**
7. Name: **Strapi API** → **Finish**

## Bước 7: Cấu Hình IIS Reverse Proxy (Optional)

### 7.1 Cài Đặt URL Rewrite Module

1. Truy cập: https://www.iis.net/downloads/microsoft/url-rewrite
2. Download và cài đặt **URL Rewrite Module 2.1**

### 7.2 Cài Đặt Application Request Routing (ARR)

1. Truy cập: https://www.iis.net/downloads/microsoft/application-request-routing
2. Download và cài đặt **ARR 3.0**

### 7.3 Enable Proxy trong ARR

1. Mở **IIS Manager**
2. Click vào server name (root level)
3. Double-click **Application Request Routing Cache**
4. Click **Server Proxy Settings** (right panel)
5. Check **Enable proxy**
6. Click **Apply**

### 7.4 Tạo Reverse Proxy Rule

1. Trong **IIS Manager**, expand **Sites**
2. Click **Default Web Site**
3. Double-click **URL Rewrite**
4. Click **Add Rule(s)** → **Reverse Proxy**
5. Nhập: `localhost:1337`
6. Click **OK**

### 7.5 Mở Port 80/443

```powershell
# Allow HTTP
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow

# Allow HTTPS
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
```

## Bước 8: Cài Đặt SSL Certificate (Optional)

### Dùng Win-ACME (Let's Encrypt cho Windows)

1. Truy cập: https://www.win-acme.com/
2. Download **win-acme**
3. Extract vào `C:\win-acme`
4. Chạy `wacs.exe` as Administrator
5. Chọn **N** (Create certificate)
6. Chọn **1** (Single binding of an IIS site)
7. Chọn site của bạn
8. Follow prompts

## Bước 9: Truy Cập Strapi Admin

### Mở Browser

Truy cập một trong các URL sau:

- **Direct:** `http://your_vps_ip:1337/admin`
- **Via IIS:** `http://your_vps_ip/admin`
- **With domain:** `http://yourdomain.com/admin`

### Tạo Admin Account

1. Điền thông tin admin đầu tiên
2. Email
3. Password (mạnh)
4. Username
5. Click **Let's start**

## Bước 10: Cấu Hình Strapi

### 10.1 Tạo Collection Types

Theo hướng dẫn trong file `STRAPI_SETUP.md`, tạo các collection types:

1. **member-tier** - Cấp độ thành viên
2. **server** - Server GTA V
3. **member** - Thành viên
4. **category** - Danh mục bài viết
5. **post** - Bài viết
6. **event** - Sự kiện

### 10.2 Cấu Hình Roles

Vào **Settings → Users & Permissions Plugin → Roles**

Tạo các custom roles:
- Admin
- Quản Lý Gia Tộc
- Quản Lý Doanh Nghiệp
- VP Team
- Việt Pride
- Khách (default)

### 10.3 Tạo API Token

Vào **Settings → API Tokens → Create new API Token**

- Name: `Viet Pride Website`
- Token type: `Full access`
- Token duration: `Unlimited`

**Copy token và lưu lại!**

## Bước 11: Kết Nối Website với Strapi

### Cập Nhật Environment Variables

Trên máy local (hoặc hosting của frontend), tạo file `.env.local`:

```env
VITE_STRAPI_URL=http://your_vps_ip:1337
# Hoặc nếu dùng IIS:
# VITE_STRAPI_URL=http://your_vps_ip
# Hoặc với domain:
# VITE_STRAPI_URL=https://yourdomain.com

VITE_STRAPI_API_TOKEN=your_api_token_here
```

### Disable Mock Auth

Mở file `client/src/contexts/AuthContext.tsx`:

```javascript
// Đổi từ:
const USE_MOCK_AUTH = true;

// Thành:
const USE_MOCK_AUTH = false;
```

### Test Connection

```bash
# Rebuild frontend
npm run build

# Hoặc restart dev server
npm run dev
```

## Bước 12: Cấu Hình CORS

### Trong Strapi Admin

Vào **Settings → CORS**

Thêm frontend domain vào whitelist:

```
http://localhost:3000
https://yourdomain.com
https://www.yourdomain.com
```

### Hoặc Edit File

Mở `config\middlewares.js`:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',
        'https://yourdomain.com',
        'https://www.yourdomain.com',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

Restart Strapi:

```powershell
pm2 restart viet-pride-strapi
```

## Bước 13: Backup & Maintenance

### Backup Database

Tạo file `backup-db.ps1`:

```powershell
notepad C:\projects\backup-db.ps1
```

Nội dung:

```powershell
$BackupDir = "C:\backups"
$Date = Get-Date -Format "yyyyMMdd_HHmmss"
$DbName = "viet_pride_db"
$DbUser = "viet_pride_user"

# Tạo backup directory nếu chưa có
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir
}

# Set password environment variable
$env:PGPASSWORD = "YourSecurePassword123!"

# Backup
& "C:\Program Files\PostgreSQL\15\bin\pg_dump.exe" -U $DbUser -h localhost $DbName > "$BackupDir\backup_$Date.sql"

# Xóa backup cũ hơn 7 ngày
Get-ChildItem $BackupDir -Filter "backup_*.sql" | Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-7)} | Remove-Item
```

### Tạo Scheduled Task

1. Mở **Task Scheduler**
2. Click **Create Basic Task**
3. Name: **Strapi Database Backup**
4. Trigger: **Daily** at **2:00 AM**
5. Action: **Start a program**
6. Program: `powershell.exe`
7. Arguments: `-File C:\projects\backup-db.ps1`
8. Click **Finish**

## Troubleshooting

### Strapi Không Start

```powershell
# Check logs
pm2 logs viet-pride-strapi

# Check if port is in use
netstat -ano | findstr :1337

# Rebuild
cd C:\projects\viet-pride-backend
$env:NODE_ENV="production"
npm run build
pm2 restart viet-pride-strapi
```

### Database Connection Error

```powershell
# Check PostgreSQL service
Get-Service -Name postgresql*

# Start service if stopped
Start-Service -Name "postgresql-x64-15"

# Test connection
psql -h localhost -U viet_pride_user -d viet_pride_db
```

### Port Already in Use

```powershell
# Find process using port 1337
netstat -ano | findstr :1337

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Firewall Blocking

```powershell
# Check firewall rules
Get-NetFirewallRule -DisplayName "Strapi API"

# Disable Windows Firewall temporarily (for testing)
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

# Re-enable after testing
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
```

## Useful Commands

### PM2

```powershell
pm2 list                    # List all processes
pm2 logs viet-pride-strapi  # View logs
pm2 restart viet-pride-strapi  # Restart
pm2 stop viet-pride-strapi  # Stop
pm2 delete viet-pride-strapi  # Delete
pm2 save                    # Save current list
```

### PostgreSQL

```powershell
# Check service
Get-Service postgresql*

# Start service
Start-Service postgresql-x64-15

# Stop service
Stop-Service postgresql-x64-15

# Restart service
Restart-Service postgresql-x64-15
```

### IIS

```powershell
# Restart IIS
iisreset

# Start IIS
iisreset /start

# Stop IIS
iisreset /stop
```

## Performance Optimization

### Increase Node.js Memory

```powershell
pm2 delete viet-pride-strapi
pm2 start npm --name "viet-pride-strapi" --node-args="--max-old-space-size=2048" -- run start
pm2 save
```

### PostgreSQL Tuning

Mở `C:\Program Files\PostgreSQL\15\data\postgresql.conf`:

```
shared_buffers = 1GB
effective_cache_size = 3GB
maintenance_work_mem = 256MB
work_mem = 32MB
```

Restart PostgreSQL service.

## Lưu Ý Quan Trọng

### Windows Server vs Windows 11

- **Windows Server** được khuyến nghị cho production
- **Windows 11** có thể dùng nhưng có giới hạn connections
- Cân nhắc upgrade lên Windows Server 2022 nếu có nhiều users

### Auto-Start Services

Đảm bảo các services sau start automatically:

1. **PostgreSQL** - Already auto-start
2. **PM2** - Configured with pm2-startup
3. **IIS** - Already auto-start

### Security

- Đổi password mặc định của Administrator
- Enable Windows Update
- Cài đặt antivirus (Windows Defender đã tích hợp)
- Backup thường xuyên
- Sử dụng strong passwords

## Kết Luận

Bây giờ bạn đã có:
- ✅ Strapi backend chạy trên Windows VPS với PostgreSQL
- ✅ PM2 process manager
- ✅ IIS reverse proxy (optional)
- ✅ Automatic backups
- ✅ Firewall configuration

Website Viet Pride của bạn giờ có thể kết nối với Strapi backend để quản lý dữ liệu thực!

## Support

Nếu gặp vấn đề:
1. Check PM2 logs: `pm2 logs viet-pride-strapi`
2. Check Windows Event Viewer: **Event Viewer → Windows Logs → Application**
3. Check PostgreSQL logs: `C:\Program Files\PostgreSQL\15\data\log\`
4. Tham khảo [Strapi Documentation](https://docs.strapi.io/)
5. Tham khảo [Strapi Forum](https://forum.strapi.io/)
