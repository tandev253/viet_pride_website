import { CyberpunkCard, DataDecor, GlitchText } from "@/components/CyberpunkCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

// Mock data - sẽ được thay thế bằng dữ liệu từ Strapi
const mockServers = [
  {
    id: 1,
    name: "Server 1 - Los Santos",
    slug: "server-1-los-santos",
    description: "Server chính của VIET PRIDE, nơi mọi thứ bắt đầu. Đây là căn cứ chính với hơn 30 thành viên hoạt động tích cực mỗi ngày.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    status: "Active",
    joinedDate: "2020-01-15",
    memberCount: 35,
    achievements: "Chiến thắng 50+ Gang Wars, Hoàn thành 100+ Heists, Top 1 Gang Server",
  },
  {
    id: 2,
    name: "Server 2 - Vice City",
    slug: "server-2-vice-city",
    description: "Server mở rộng của gang với phong cách chơi tốc độ cao. Chuyên về street racing và các hoạt động kinh doanh.",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=400&fit=crop",
    status: "Active",
    joinedDate: "2021-06-20",
    memberCount: 25,
    achievements: "Vô địch Street Race Championship 10 lần, Kiểm soát 5 lãnh thổ kinh doanh",
  },
  {
    id: 3,
    name: "Server 3 - San Fierro",
    slug: "server-3-san-fierro",
    description: "Server mới nhất của gang, tập trung vào xây dựng cộng đồng và phát triển thành viên mới.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    status: "Active",
    joinedDate: "2023-03-10",
    memberCount: 18,
    achievements: "Tuyển dụng 15+ thành viên mới, Tổ chức 20+ sự kiện training",
  },
  {
    id: 4,
    name: "Server 4 - Liberty City",
    slug: "server-4-liberty-city",
    description: "Server cũ của gang, hiện đã không còn hoạt động nhưng để lại nhiều kỷ niệm đẹp.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop",
    status: "Archived",
    joinedDate: "2020-08-01",
    leftDate: "2022-12-31",
    memberCount: 0,
    achievements: "Chiến thắng 30+ Gang Wars, Hoàn thành 50+ Heists",
  },
];

const statusConfig = {
  Active: {
    label: "Đang Hoạt Động",
    color: "bg-chart-2 text-black",
    icon: "🟢",
  },
  Inactive: {
    label: "Tạm Ngưng",
    color: "bg-chart-3 text-white",
    icon: "🟡",
  },
  Archived: {
    label: "Đã Lưu Trữ",
    color: "bg-muted text-muted-foreground",
    icon: "⚫",
  },
};

export default function Servers() {
  const activeServers = mockServers.filter(s => s.status === "Active");
  const archivedServers = mockServers.filter(s => s.status === "Archived");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12">

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GlitchText>SERVER GTA V</GlitchText>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Các server GTA V Online mà VIET PRIDE đã và đang hoạt động. 
              Mỗi server là một chương mới trong lịch sử gang.
            </p>
          </div>

          {/* Active Servers */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold">SERVER ĐANG HOẠT ĐỘNG</h2>
              <div className="flex-1 h-px bg-primary/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeServers.map((server) => {
                const statusInfo = statusConfig[server.status as keyof typeof statusConfig];
                
                return (
                  <CyberpunkCard key={server.id} className="overflow-hidden hover:scale-[1.02] transition-transform">
                    {/* Server Image */}
                    <div className="relative h-48 -m-6 mb-6">
                      <img 
                        src={server.image} 
                        alt={server.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      
                      {/* Status Badge */}
                      <Badge className={`absolute top-4 left-4 ${statusInfo.color}`}>
                        {statusInfo.icon} {statusInfo.label}
                      </Badge>

                      {/* Server Name Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                          {server.name}
                        </h3>
                      </div>
                    </div>

                    {/* Server Info */}
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {server.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background/50 p-3 clip-corner-sm border border-primary/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-xs text-muted-foreground">Thành Viên</span>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {server.memberCount}
                          </div>
                        </div>

                        <div className="bg-background/50 p-3 clip-corner-sm border border-primary/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-xs text-muted-foreground">Tham Gia</span>
                          </div>
                          <div className="text-sm font-bold">
                            {new Date(server.joinedDate).toLocaleDateString('vi-VN', {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="pt-4 border-t border-primary/20">
                        <div className="flex items-start gap-2 mb-2">
                          <Trophy className="w-4 h-4 text-chart-2 mt-0.5" />
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Thành Tích
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {server.achievements}
                        </p>
                      </div>
                    </div>


                  </CyberpunkCard>
                );
              })}
            </div>
          </div>

          {/* Archived Servers */}
          {archivedServers.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-muted rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold">SERVER ĐÃ LƯU TRỮ</h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {archivedServers.map((server) => {
                  const statusInfo = statusConfig[server.status as keyof typeof statusConfig];
                  
                  return (
                    <CyberpunkCard key={server.id} className="opacity-75 hover:opacity-100 transition-opacity">
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-32 h-32 flex-shrink-0 clip-corner">
                          <img 
                            src={server.image} 
                            alt={server.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="text-lg font-bold mb-1">{server.name}</h3>
                            <Badge className={`${statusInfo.color} text-xs`}>
                              {statusInfo.icon} {statusInfo.label}
                            </Badge>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {server.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(server.joinedDate).getFullYear()} - {server.leftDate && new Date(server.leftDate).getFullYear()}
                            </div>
                          </div>
                        </div>
                      </div>

                    </CyberpunkCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* Server Map */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">BẢN ĐỒ SERVER</h2>
              <div className="flex-1 h-px bg-primary/30" />
            </div>

            <CyberpunkCard className="p-0 overflow-hidden">
              <div className="relative h-96 bg-background/50 grid-bg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-primary mx-auto opacity-50" />
                    <p className="text-lg text-muted-foreground font-mono">
                      [MAP_VISUALIZATION_COMING_SOON]
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Bản đồ tương tác hiển thị vị trí các server và lãnh thổ của gang 
                      sẽ được cập nhật trong phiên bản tiếp theo.
                    </p>
                  </div>
                </div>
              </div>
            </CyberpunkCard>
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto">
            <CyberpunkCard>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary neon-text mb-2">
                    {mockServers.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Tổng Server
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-2 mb-2">
                    {activeServers.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Đang Hoạt Động
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-3 mb-2">
                    {mockServers.reduce((sum, s) => sum + s.memberCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Tổng Thành Viên
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-4 mb-2">
                    {new Date().getFullYear() - new Date(mockServers[0]?.joinedDate || "2020-01-01").getFullYear()}+
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Năm Kinh Nghiệm
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
