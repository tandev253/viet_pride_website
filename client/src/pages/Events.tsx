import { CyberpunkCard, DataDecor, GlitchText } from "@/components/CyberpunkCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Trophy, Users } from "lucide-react";

// Mock data - sẽ được thay thế bằng dữ liệu từ Strapi
const mockEvents = [
  {
    id: 1,
    title: "Heist Cuối Tuần - Cướp Ngân Hàng Trung Ương",
    slug: "heist-cuoi-tuan-cuop-ngan-hang-trung-uong",
    description: "Nhiệm vụ heist lớn nhất trong tháng! Chúng ta sẽ cướp Ngân Hàng Trung Ương với kế hoạch chi tiết. Cần tối thiểu 8 thành viên có kinh nghiệm.",
    server: { name: "Server 1 - Los Santos" },
    organizer: { displayName: "Rồng Vàng" },
    startDate: "2024-01-20T19:00:00",
    location: "Central Bank, Downtown LS",
    status: "Upcoming",
    type: "Heist",
    difficulty: "Extreme",
    maxParticipants: 12,
    currentParticipants: 8,
    rewards: "$5,000,000 + Rare Items",
  },
  {
    id: 2,
    title: "Street Race Championship - Vòng Chung Kết",
    slug: "street-race-championship-vong-chung-ket",
    description: "Giải đua xe đường phố hàng tháng của gang. Top 3 sẽ nhận được phần thưởng giá trị và danh hiệu vinh dự.",
    server: { name: "Server 2 - Vice City" },
    organizer: { displayName: "Phượng Hoàng" },
    startDate: "2024-01-18T20:00:00",
    location: "Ocean Drive Circuit",
    status: "Upcoming",
    type: "Race",
    difficulty: "Hard",
    maxParticipants: 20,
    currentParticipants: 15,
    rewards: "$2,000,000 + Custom Cars",
  },
  {
    id: 3,
    title: "Gang War - Chiến Tranh Lãnh Thổ",
    slug: "gang-war-chien-tranh-lanh-tho",
    description: "Bảo vệ lãnh thổ của chúng ta khỏi gang đối thủ. Tất cả thành viên cần tham gia để giữ vững vị thế.",
    server: { name: "Server 1 - Los Santos" },
    organizer: { displayName: "Hổ Móng" },
    startDate: "2024-01-22T21:00:00",
    location: "Grove Street Territory",
    status: "Upcoming",
    type: "PvP",
    difficulty: "Extreme",
    maxParticipants: 30,
    currentParticipants: 25,
    rewards: "Territory Control + $3,000,000",
  },
  {
    id: 4,
    title: "Buổi Họp Mặt Gang - Tháng 1",
    slug: "buoi-hop-mat-gang-thang-1",
    description: "Buổi họp mặt định kỳ hàng tháng để thảo luận về chiến lược, kế hoạch và gặp gỡ các thành viên mới.",
    server: { name: "Server 1 - Los Santos" },
    organizer: { displayName: "Rồng Vàng" },
    startDate: "2024-01-15T18:00:00",
    location: "Gang Hideout",
    status: "Completed",
    type: "Social",
    difficulty: "Easy",
    maxParticipants: 50,
    currentParticipants: 42,
    rewards: "N/A",
  },
];

const statusColors = {
  Upcoming: "bg-chart-2 text-black",
  Ongoing: "bg-chart-3 text-white",
  Completed: "bg-muted text-muted-foreground",
  Cancelled: "bg-destructive text-destructive-foreground",
};

const difficultyColors = {
  Easy: "text-chart-2",
  Medium: "text-chart-3",
  Hard: "text-chart-4",
  Extreme: "text-primary",
};

export default function Events() {
  const upcomingEvents = mockEvents.filter(e => e.status === "Upcoming");
  const completedEvents = mockEvents.filter(e => e.status === "Completed");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12">

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GlitchText>SỰ KIỆN GANG</GlitchText>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tham gia các sự kiện hấp dẫn của VIET PRIDE. Từ heist, race đến PvP, 
              luôn có điều gì đó thú vị đang chờ bạn!
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">SỰ KIỆN SẮP TỚI</h2>
              <div className="flex-1 h-px bg-primary/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <CyberpunkCard key={event.id} className="hover:scale-[1.02] transition-transform">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={statusColors[event.status as keyof typeof statusColors]}>
                            {event.status === "Upcoming" ? "Sắp Diễn Ra" : event.status}
                          </Badge>
                          <Badge variant="outline" className="border-primary/50">
                            {event.type}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2 leading-tight">
                          {event.title}
                        </h3>
                      </div>
                      <div className={`text-xs font-bold uppercase ${difficultyColors[event.difficulty as keyof typeof difficultyColors]}`}>
                        {event.difficulty}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          {new Date(event.startDate).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground truncate">
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          {event.currentParticipants}/{event.maxParticipants} người
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground truncate">
                          {event.rewards}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Đã đăng ký</span>
                        <span>{Math.round((event.currentParticipants / event.maxParticipants) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden border border-primary/30">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-mono">Tổ chức: </span>
                        <span className="text-primary">{event.organizer.displayName}</span>
                      </div>
                      <Button size="sm" className="clip-corner-sm">
                        Đăng Ký
                      </Button>
                    </div>
                  </div>


                </CyberpunkCard>
              ))}
            </div>
          </div>

          {/* Completed Events */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-muted-foreground" />
              <h2 className="text-2xl md:text-3xl font-bold">SỰ KIỆN ĐÃ HOÀN THÀNH</h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedEvents.map((event) => (
                <CyberpunkCard key={event.id} className="opacity-75 hover:opacity-100 transition-opacity">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold leading-tight flex-1">
                        {event.title}
                      </h3>
                      <Badge className={statusColors[event.status as keyof typeof statusColors]}>
                        Hoàn Thành
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(event.startDate).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {event.currentParticipants} người tham gia
                      </div>
                    </div>
                  </div>

                </CyberpunkCard>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 max-w-4xl mx-auto">
            <CyberpunkCard>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary neon-text mb-2">
                    {mockEvents.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Tổng Sự Kiện
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-2 mb-2">
                    {upcomingEvents.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Sắp Diễn Ra
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-3 mb-2">
                    {completedEvents.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Đã Hoàn Thành
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-4 mb-2">
                    {mockEvents.reduce((sum, e) => sum + e.currentParticipants, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Lượt Tham Gia
                  </div>
                </div>
              </div>

            </CyberpunkCard>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
