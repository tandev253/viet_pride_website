import { CyberpunkButton, CyberpunkCard, DataDecor, GlitchText } from "@/components/CyberpunkCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Shield, Trophy, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated grid background */}
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        
        {/* Scanline effect */}
        <div className="absolute inset-0 scanline opacity-20" />

        <div className="container relative z-10 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">


            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Viet Pride Logo" 
                  className="h-32 w-32 md:h-48 md:w-48 object-contain animate-pulse"
                />
                <div className="absolute inset-0 bg-primary/20 blur-3xl" />
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
              <GlitchText>VIET PRIDE</GlitchText>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground font-mono uppercase tracking-widest">
              GTA V Online Gang
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Chúng tôi là <span className="text-primary font-bold">VIET PRIDE</span> - Gang huyền thoại 
              trên Los Santos. Với tinh thần đoàn kết và sức mạnh không gì ngăn cản được, 
              chúng tôi đã chinh phục mọi server GTA V Online.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/members" className="w-full sm:w-auto">
                <CyberpunkButton variant="primary" className="w-full">
                  <Users className="w-5 h-5 mr-2 inline" />
                  Xem Thành Viên
                </CyberpunkButton>
              </Link>
              
              <Link href="/events" className="w-full sm:w-auto">
                <CyberpunkButton variant="secondary" className="w-full">
                  <Calendar className="w-5 h-5 mr-2 inline" />
                  Sự Kiện Sắp Tới
                </CyberpunkButton>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto">
              <div className="relative p-6 bg-card/50 border border-primary/30 clip-corner-sm hover:border-primary/60 transition-all">

                <div className="text-3xl md:text-4xl font-bold text-primary neon-text">50+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">Thành Viên</div>
              </div>
              
              <div className="relative p-6 bg-card/50 border border-primary/30 clip-corner-sm hover:border-primary/60 transition-all">

                <div className="text-3xl md:text-4xl font-bold text-primary neon-text">10+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">Server</div>
              </div>
              
              <div className="relative p-6 bg-card/50 border border-primary/30 clip-corner-sm hover:border-primary/60 transition-all">

                <div className="text-3xl md:text-4xl font-bold text-primary neon-text">100+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">Sự Kiện</div>
              </div>
              
              <div className="relative p-6 bg-card/50 border border-primary/30 clip-corner-sm hover:border-primary/60 transition-all">

                <div className="text-3xl md:text-4xl font-bold text-primary neon-text">4+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">Năm Hoạt Động</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <GlitchText>TẠI SAO CHỌN VIET PRIDE?</GlitchText>
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <CyberpunkCard>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 border border-primary clip-corner-sm">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Bảo Vệ Lẫn Nhau</h3>
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi luôn đồng hành và bảo vệ mọi thành viên trong gang. 
                    Không ai bị bỏ lại phía sau.
                  </p>
                </div>
              </div>
            </CyberpunkCard>

            <CyberpunkCard>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 border border-primary clip-corner-sm">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Thành Tích Vang Dội</h3>
                  <p className="text-sm text-muted-foreground">
                    Đã chinh phục hơn 10 server với vô số chiến thắng và 
                    thành tích đáng tự hào.
                  </p>
                </div>
              </div>
            </CyberpunkCard>

            <CyberpunkCard>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 border border-primary clip-corner-sm">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Cộng Đồng Mạnh Mẽ</h3>
                  <p className="text-sm text-muted-foreground">
                    Hơn 50 thành viên tích cực, luôn sẵn sàng hỗ trợ và 
                    cùng nhau phát triển.
                  </p>
                </div>
              </div>
            </CyberpunkCard>

            <CyberpunkCard>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 border border-primary clip-corner-sm">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Sự Kiện Đều Đặn</h3>
                  <p className="text-sm text-muted-foreground">
                    Tổ chức các sự kiện heist, race, PvP và nhiều hoạt động 
                    thú vị khác mỗi tuần.
                  </p>
                </div>
              </div>
            </CyberpunkCard>

            <CyberpunkCard>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 border border-primary clip-corner-sm">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Kỷ Luật Nghiêm Minh</h3>
                  <p className="text-sm text-muted-foreground">
                    Quy tắc rõ ràng, kỷ luật nghiêm minh giúp gang 
                    hoạt động hiệu quả và chuyên nghiệp.
                  </p>
                </div>
              </div>
            </CyberpunkCard>

            <CyberpunkCard>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 border border-primary clip-corner-sm">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Danh Tiếng Cao</h3>
                  <p className="text-sm text-muted-foreground">
                    Được biết đến và tôn trọng trên mọi server GTA V Online 
                    mà chúng tôi tham gia.
                  </p>
                </div>
              </div>
            </CyberpunkCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-5" />
        <div className="container px-4 relative">
          <CyberpunkCard className="max-w-4xl mx-auto text-center p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <GlitchText>SẴN SÀNG THAM GIA?</GlitchText>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nếu bạn có tinh thần chiến đấu, trung thành và muốn trở thành một phần 
              của gia đình VIET PRIDE, hãy liên hệ với chúng tôi ngay hôm nay!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CyberpunkButton variant="primary">
                Đăng Ký Tham Gia
              </CyberpunkButton>
              <CyberpunkButton variant="secondary">
                Tìm Hiểu Thêm
              </CyberpunkButton>
            </div>

          </CyberpunkCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
