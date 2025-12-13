import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-primary/30 mt-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container relative py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Viet Pride Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-lg font-bold text-primary">VIET PRIDE</h3>
                <p className="text-[10px] text-muted-foreground font-mono">
                  [EST. 2020]
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Gang huyền thoại trong GTA V Online. Chúng tôi là niềm tự hào của người Việt trên Los Santos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">
              Liên Kết
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="/members" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Thành Viên
                </a>
              </li>
              <li>
                <a href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sự Kiện
                </a>
              </li>
              <li>
                <a href="/posts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bài Viết
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">
              Cộng Đồng
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/servers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Server
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Quy Tắc Gang
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tuyển Thành Viên
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">
              Mạng Xã Hội
            </h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary transition-all clip-corner-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary transition-all clip-corner-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary transition-all clip-corner-sm"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary transition-all clip-corner-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-mono">
              [SOCIAL_LINK_v1.0]
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            © {currentYear} VIET PRIDE GANG. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            [SYSTEM_ID: VP-{currentYear}-{Math.random().toString(16).slice(2, 6).toUpperCase()}]
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
    </footer>
  );
}
