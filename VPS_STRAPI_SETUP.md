# Hướng Dẫn Thiết Lập Strapi Trên VPS

Hướng dẫn chi tiết cách cài đặt và cấu hình Strapi backend trên VPS để kết nối với website Viet Pride.

## Yêu Cầu VPS

### Cấu Hình Tối Thiểu
- **RAM:** 2GB (khuyến nghị 4GB)
- **CPU:** 2 cores
- **Disk:** 20GB SSD
- **OS:** Ubuntu 22.04 LTS hoặc Ubuntu 20.04 LTS
- **Bandwidth:** Unlimited hoặc ít nhất 1TB/tháng

### Nhà Cung Cấp VPS Gợi Ý
- **DigitalOcean** - $12/tháng (2GB RAM, 1 CPU)
- **Vultr** - $12/tháng (2GB RAM, 1 CPU)
- **Linode** - $12/tháng (2GB RAM, 1 CPU)
- **AWS Lightsail** - $10/tháng (2GB RAM, 1 CPU)
- **Contabo** - €6/tháng (4GB RAM, 2 CPU) - rẻ nhất

## Bước 1: Kết Nối VPS

### SSH vào VPS

```bash
ssh root@your_vps_ip
```

Hoặc nếu dùng user khác:

```bash
ssh your_username@your_vps_ip
```

### Tạo User Mới (Khuyến Nghị)

```bash
# Tạo user mới
adduser strapi

# Cấp quyền sudo
usermod -aG sudo strapi

# Chuyển sang user mới
su - strapi
```

## Bước 2: Cài Đặt Dependencies

### Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Cài Đặt Node.js 18.x (LTS)

```bash
# Thêm NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Cài đặt Node.js
sudo apt install -y nodejs

# Kiểm tra version
node --version  # Should be v18.x.x
npm --version   # Should be 9.x.x or higher
```

### Cài Đặt PostgreSQL

```bash
# Cài đặt PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Khởi động PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Kiểm tra status
sudo systemctl status postgresql
```

### Cài Đặt Nginx (Web Server)

```bash
sudo apt install -y nginx

# Khởi động Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Cài Đặt PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

## Bước 3: Cấu Hình PostgreSQL

### Tạo Database và User

```bash
# Chuyển sang postgres user
sudo -u postgres psql

# Trong PostgreSQL prompt, chạy các lệnh sau:
```

```sql
-- Tạo database
CREATE DATABASE viet_pride_db;

-- Tạo user
CREATE USER viet_pride_user WITH PASSWORD 'your_secure_password_here';

-- Cấp quyền
GRANT ALL PRIVILEGES ON DATABASE viet_pride_db TO viet_pride_user;

-- Thoát
\q
```

### Test Connection

```bash
psql -h localhost -U viet_pride_user -d viet_pride_db
# Nhập password khi được hỏi
# Nếu kết nối thành công, gõ \q để thoát
```

## Bước 4: Cài Đặt Strapi

### Tạo Project Directory

```bash
cd ~
mkdir projects
cd projects
```

### Tạo Strapi Project

```bash
npx create-strapi-app@latest viet-pride-backend \
  --quickstart \
  --no-run
```

**Lưu ý:** Sử dụng `--no-run` để không tự động start, chúng ta sẽ cấu hình trước.

### Cấu Hình Database

```bash
cd viet-pride-backend
```

Tạo file `.env`:

```bash
nano .env
```

Thêm nội dung sau:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_key_1,your_app_key_2,your_app_key_3,your_app_key_4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=viet_pride_db
DATABASE_USERNAME=viet_pride_user
DATABASE_PASSWORD=your_secure_password_here
DATABASE_SSL=false

# Public URL (thay bằng domain hoặc IP của bạn)
URL=https://api.yourdomain.com
```

**Tạo random secrets:**

```bash
# Chạy lệnh này để tạo random strings
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Chạy lệnh trên 5 lần và copy vào các trường:
- APP_KEYS (4 keys, cách nhau bởi dấu phẩy)
- API_TOKEN_SALT
- ADMIN_JWT_SECRET  
- TRANSFER_TOKEN_SALT
- JWT_SECRET

### Cấu Hình Database Connection

Chỉnh sửa file `config/database.js`:

```bash
nano config/database.js
```

Thay thế nội dung bằng:

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

### Cài Đặt PostgreSQL Driver

```bash
npm install pg
```

## Bước 5: Build và Start Strapi

### Build Production

```bash
NODE_ENV=production npm run build
```

### Start với PM2

```bash
pm2 start npm --name "viet-pride-strapi" -- run start

# Lưu PM2 configuration
pm2 save

# Tự động start khi reboot
pm2 startup
# Copy và chạy lệnh được suggest
```

### Kiểm Tra Status

```bash
pm2 status
pm2 logs viet-pride-strapi
```

## Bước 6: Cấu Hình Nginx Reverse Proxy

### Tạo Nginx Config

```bash
sudo nano /etc/nginx/sites-available/strapi
```

Thêm nội dung:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # Thay bằng domain của bạn

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Enable Site

```bash
# Tạo symbolic link
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Bước 7: Cài Đặt SSL với Let's Encrypt

### Cài Đặt Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Tạo SSL Certificate

```bash
sudo certbot --nginx -d api.yourdomain.com
```

Làm theo hướng dẫn:
1. Nhập email
2. Đồng ý Terms of Service
3. Chọn redirect HTTP to HTTPS (option 2)

### Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot tự động tạo cron job để renew
```

## Bước 8: Truy Cập Strapi Admin

### Mở Browser

Truy cập: `https://api.yourdomain.com/admin`

### Tạo Admin Account

1. Điền thông tin admin đầu tiên
2. Email
3. Password (mạnh)
4. Username

## Bước 9: Cấu Hình Strapi

### 9.1 Tạo Collection Types

Theo hướng dẫn trong file `STRAPI_SETUP.md`, tạo các collection types:

1. **member-tier** - Cấp độ thành viên
2. **server** - Server GTA V
3. **member** - Thành viên
4. **category** - Danh mục bài viết
5. **post** - Bài viết
6. **event** - Sự kiện

### 9.2 Cấu Hình Roles

Vào **Settings → Users & Permissions Plugin → Roles**

Tạo các custom roles:
- Admin
- Quản Lý Gia Tộc
- Quản Lý Doanh Nghiệp
- VP Team
- Việt Pride
- Khách (default)

### 9.3 Cấu Hình Permissions

**Public role:**
- Enable `find` và `findOne` cho các collection công khai

**Authenticated role:**
- Enable CRUD permissions phù hợp

### 9.4 Tạo API Token

Vào **Settings → API Tokens → Create new API Token**

- Name: `Viet Pride Website`
- Token type: `Full access` hoặc `Custom`
- Token duration: `Unlimited`

**Copy token và lưu lại!**

## Bước 10: Kết Nối Website với Strapi

### Cập Nhật Environment Variables

Trên máy local (hoặc hosting của frontend), tạo file `.env.local`:

```env
VITE_STRAPI_URL=https://api.yourdomain.com
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

## Bước 11: Cấu Hình CORS

### Trong Strapi Admin

Vào **Settings → CORS**

Thêm frontend domain vào whitelist:

```
https://yourdomain.com
https://www.yourdomain.com
http://localhost:3000  # For development
```

### Hoặc Edit File

```bash
nano config/middlewares.js
```

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
        'http://localhost:3000',
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

```bash
pm2 restart viet-pride-strapi
```

## Bước 12: Bảo Mật VPS

### Cấu Hình Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP/HTTPS
sudo ufw allow 'Nginx Full'

# Check status
sudo ufw status
```

### Disable Root Login

```bash
sudo nano /etc/ssh/sshd_config
```

Tìm và đổi:

```
PermitRootLogin no
PasswordAuthentication no  # Nếu dùng SSH keys
```

Restart SSH:

```bash
sudo systemctl restart sshd
```

### Cài Đặt Fail2Ban

```bash
sudo apt install -y fail2ban

# Start service
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

## Bước 13: Backup & Monitoring

### Backup Database

Tạo script backup:

```bash
nano ~/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/strapi/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="viet_pride_db"
DB_USER="viet_pride_user"

mkdir -p $BACKUP_DIR

pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Cấp quyền:

```bash
chmod +x ~/backup-db.sh
```

Tạo cron job:

```bash
crontab -e
```

Thêm dòng (backup hàng ngày lúc 2AM):

```
0 2 * * * /home/strapi/backup-db.sh
```

### Monitoring với PM2

```bash
# Install PM2 monitoring
pm2 install pm2-logrotate

# Set max log size
pm2 set pm2-logrotate:max_size 10M

# Keep logs for 7 days
pm2 set pm2-logrotate:retain 7
```

## Troubleshooting

### Strapi Không Start

```bash
# Check logs
pm2 logs viet-pride-strapi

# Check database connection
psql -h localhost -U viet_pride_user -d viet_pride_db

# Rebuild
cd ~/projects/viet-pride-backend
NODE_ENV=production npm run build
pm2 restart viet-pride-strapi
```

### Database Connection Error

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check database exists
sudo -u postgres psql -l

# Reset password
sudo -u postgres psql
ALTER USER viet_pride_user WITH PASSWORD 'new_password';
```

### Nginx 502 Bad Gateway

```bash
# Check Strapi is running
pm2 status

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test Strapi directly
curl http://localhost:1337
```

### SSL Certificate Issues

```bash
# Renew certificate
sudo certbot renew

# Check certificate
sudo certbot certificates
```

## Useful Commands

```bash
# PM2
pm2 list                    # List all processes
pm2 logs viet-pride-strapi  # View logs
pm2 restart viet-pride-strapi  # Restart
pm2 stop viet-pride-strapi  # Stop
pm2 delete viet-pride-strapi  # Delete

# Nginx
sudo systemctl status nginx  # Check status
sudo nginx -t               # Test config
sudo systemctl reload nginx  # Reload config

# PostgreSQL
sudo systemctl status postgresql  # Check status
sudo -u postgres psql            # Access psql
```

## Performance Optimization

### Increase Node.js Memory

```bash
pm2 delete viet-pride-strapi
pm2 start npm --name "viet-pride-strapi" --node-args="--max-old-space-size=2048" -- run start
pm2 save
```

### Enable Gzip trong Nginx

```bash
sudo nano /etc/nginx/nginx.conf
```

Uncomment hoặc thêm:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### PostgreSQL Tuning

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Điều chỉnh (cho VPS 2GB RAM):

```
shared_buffers = 512MB
effective_cache_size = 1536MB
maintenance_work_mem = 128MB
work_mem = 16MB
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

## Kết Luận

Bây giờ bạn đã có:
- ✅ Strapi backend chạy trên VPS với PostgreSQL
- ✅ Nginx reverse proxy với SSL
- ✅ PM2 process manager
- ✅ Automatic backups
- ✅ Security hardening
- ✅ Monitoring và logging

Website Viet Pride của bạn giờ có thể kết nối với Strapi backend để quản lý dữ liệu thực!

## Support

Nếu gặp vấn đề:
1. Check logs: `pm2 logs viet-pride-strapi`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check PostgreSQL logs: `sudo tail -f /var/log/postgresql/postgresql-14-main.log`
4. Tham khảo [Strapi Documentation](https://docs.strapi.io/)
5. Tham khảo [Strapi Forum](https://forum.strapi.io/)
