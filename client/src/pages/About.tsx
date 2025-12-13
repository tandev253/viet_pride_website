import { CyberpunkCard, GlitchText } from "@/components/CyberpunkCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Award, Calendar, Flag, Shield, Target, Trophy, Users } from "lucide-react";

export default function About() {
  const milestones = [
    {
      year: "2020",
      title: "Thành Lập Gang",
      description: "Viet Pride được thành lập bởi một nhóm game thủ Việt Nam đam mê GTA V Online, với mục tiêu tạo dựng một cộng đồng mạnh mẽ và đoàn kết.",
      icon: Flag,
    },
    {
      year: "2021",
      title: "Mở Rộng Lãnh Thổ",
      description: "Chinh phục 5 server lớn, thiết lập uy tín và trở thành một trong những gang được kính nể nhất trên Los Santos.",
      icon: Target,
    },
    {
      year: "2022",
      title: "Giải Đấu Đầu Tiên",
      description: "Vô địch giải đấu Gang War Championship, đánh bại 20 gang khác và khẳng định vị thế số 1.",
      icon: Trophy,
    },
    {
      year: "2023",
      title: "Cộng Đồng 50+ Thành Viên",
      description: "Đạt mốc 50 thành viên chính thức, xây dựng hệ thống cấp bậc chuyên nghiệp và tổ chức các sự kiện thường xuyên.",
      icon: Users,
    },
    {
      year: "2024",
      title: "Thống Trị Đa Server",
      description: "Hoạt động trên 10+ server khác nhau, tổ chức 100+ sự kiện thành công và trở thành biểu tượng của cộng đồng GTA V Việt Nam.",
      icon: Award,
    },
  ];

  const achievements = [
    {
      title: "Vô Địch Gang War Championship 2022",
      description: "Đánh bại 20 gang mạnh nhất trong giải đấu lớn nhất năm",
      stats: "20 trận thắng liên tiếp",
      color: "text-yellow-500",
    },
    {
      title: "Heist Master Achievement",
      description: "Hoàn thành 500+ nhiệm vụ heist với tỷ lệ thành công 95%",
      stats: "$500M+ kiếm được",
      color: "text-green-500",
    },
    {
      title: "Server Domination",
      description: "Kiểm soát 10+ server đồng thời, thiết lập kỷ lục chưa từng có",
      stats: "10 server đang hoạt động",
      color: "text-blue-500",
    },
    {
      title: "Community Leader Award",
      description: "Được cộng đồng GTA V Việt Nam bình chọn là Gang của năm 2023",
      stats: "5000+ votes",
      color: "text-purple-500",
    },
    {
      title: "Racing Champions",
      description: "Vô địch 15 giải đua xe lớn nhỏ, thiết lập nhiều kỷ lục tốc độ",
      stats: "15 chức vô địch",
      color: "text-orange-500",
    },
    {
      title: "Loyalty Legend",
      description: "Duy trì 50+ thành viên trung thành trong 4 năm hoạt động",
      stats: "4 năm không ngừng nghỉ",
      color: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 scanline opacity-20" />

        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="Viet Pride Logo" 
                className="h-24 w-24 md:h-32 md:w-32 object-contain animate-pulse"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GlitchText>VỀ CHÚNG TÔI</GlitchText>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Hành trình từ một nhóm nhỏ đến trở thành <span className="text-primary font-bold">huyền thoại</span> của Los Santos
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-5" />
        
        <div className="container px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <GlitchText>LỊCH SỬ HÌNH THÀNH</GlitchText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Câu chuyện về sự trỗi dậy của một gang huyền thoại
              </p>
            </div>

            <CyberpunkCard className="mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 border border-primary clip-corner-sm shrink-0">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Khởi Nguồn</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Vào năm 2020, giữa thời kỳ đại dịch COVID-19, một nhóm game thủ Việt Nam đam mê GTA V Online đã quyết định tập hợp lại để tạo nên một điều gì đó đặc biệt. Họ không chỉ muốn chơi game, mà còn muốn xây dựng một cộng đồng thực sự - nơi mà tinh thần đồng đội, lòng trung thành và niềm tự hào dân tộc được đặt lên hàng đầu.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 border border-primary clip-corner-sm shrink-0">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Sứ Mệnh</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Viet Pride được thành lập với sứ mệnh rõ ràng: Trở thành gang mạnh nhất, được tôn trọng nhất và có tinh thần đoàn kết nhất trong cộng đồng GTA V Online Việt Nam. Chúng tôi tin rằng sức mạnh không chỉ đến từ kỹ năng cá nhân, mà còn từ sự gắn kết và tin tưởng lẫn nhau.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 border border-primary clip-corner-sm shrink-0">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Thành Tựu</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Sau 4 năm hoạt động không ngừng nghỉ, Viet Pride đã trở thành một trong những gang uy tín và mạnh mẽ nhất. Chúng tôi đã chinh phục hơn 10 server, tổ chức hơn 100 sự kiện, và quan trọng nhất là xây dựng được một gia đình gồm 50+ thành viên trung thành, luôn sẵn sàng chiến đấu vì danh dự của gang.
                    </p>
                  </div>
                </div>
              </div>
            </CyberpunkCard>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative bg-card/30">
        <div className="absolute inset-0 grid-bg opacity-5" />
        
        <div className="container px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GlitchText>TIMELINE</GlitchText>
            </h2>
            <p className="text-lg text-muted-foreground">
              Những mốc son đánh dấu hành trình của chúng tôi
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={milestone.year}
                      className={`relative flex items-center ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      } flex-row gap-8`}
                    >
                      {/* Year badge */}
                      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                        <div className="w-16 h-16 bg-primary border-4 border-background clip-corner-sm flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} pl-24 md:pl-0`}>
                        <CyberpunkCard>
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/20 border border-primary clip-corner-sm shrink-0">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="text-3xl font-bold text-primary mb-2">
                                {milestone.year}
                              </div>
                              <h3 className="text-xl font-bold mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        </CyberpunkCard>
                      </div>

                      {/* Spacer for desktop */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-5" />
        
        <div className="container px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GlitchText>THÀNH TỰU</GlitchText>
            </h2>
            <p className="text-lg text-muted-foreground">
              Những chiến công đáng tự hào của Viet Pride
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {achievements.map((achievement, index) => (
              <CyberpunkCard key={index} className="hover:scale-105 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Trophy className={`w-8 h-8 ${achievement.color}`} />
                    <div className={`text-xs font-mono ${achievement.color} bg-current/10 px-2 py-1 clip-corner-sm`}>
                      #{(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {achievement.description}
                    </p>
                    <div className={`text-sm font-mono font-bold ${achievement.color}`}>
                      {achievement.stats}
                    </div>
                  </div>
                </div>
              </CyberpunkCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="container px-4 relative">
          <CyberpunkCard className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <GlitchText>THAM GIA CÙNG CHÚNG TÔI</GlitchText>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Bạn có muốn trở thành một phần của huyền thoại? Viet Pride luôn chào đón những thành viên mới có tinh thần đồng đội và đam mê chinh phục.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a 
                  href="/members" 
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/80 transition-all clip-corner-sm border-2 border-primary hover:shadow-[0_0_20px_rgba(220,20,60,0.5)]"
                >
                  Xem Thành Viên
                </a>
                <a 
                  href="/events" 
                  className="px-8 py-3 bg-transparent text-primary font-bold uppercase tracking-wider border-2 border-primary hover:bg-primary/10 transition-all clip-corner-sm hover:shadow-[0_0_15px_rgba(220,20,60,0.3)]"
                >
                  Sự Kiện Sắp Tới
                </a>
              </div>
            </div>
          </CyberpunkCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
