import { CyberpunkCard, DataDecor } from "@/components/CyberpunkCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Crown, Mail, Search, Shield, Star, User } from "lucide-react";
import { useState } from "react";

// Mock data - sẽ được thay thế bằng dữ liệu từ Strapi
// Chỉ hiển thị members có role chính thức (không phải "Khách")
const mockMembers = [
  {
    id: 1,
    username: "DragonKing",
    displayName: "Rồng Vàng",
    tier: { name: "Admin", color: "#FFD700", icon: Crown },
    status: "Active",
    joinDate: "2020-01-15",
    contributions: 150,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DragonKing",
  },
  {
    id: 2,
    username: "PhoenixFire",
    displayName: "Phượng Hoàng",
    tier: { name: "Quản Lý Gia Tộc", color: "#FF6B35", icon: Shield },
    status: "Active",
    joinDate: "2020-03-20",
    contributions: 120,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PhoenixFire",
  },
  {
    id: 3,
    username: "TigerClaw",
    displayName: "Hổ Móng",
    tier: { name: "Quản Lý Doanh Nghiệp", color: "#00F0FF", icon: Star },
    status: "Active",
    joinDate: "2021-06-10",
    contributions: 80,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TigerClaw",
  },
  {
    id: 4,
    username: "EagleEye",
    displayName: "Mắt Đại Bàng",
    tier: { name: "VP Team", color: "#DC143C", icon: Star },
    status: "Active",
    joinDate: "2021-08-15",
    contributions: 65,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EagleEye",
  },
  {
    id: 5,
    username: "WolfPack",
    displayName: "Bầy Sói",
    tier: { name: "Việt Pride", color: "#DC143C", icon: User },
    status: "Active",
    joinDate: "2023-12-01",
    contributions: 15,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WolfPack",
  },
  {
    id: 6,
    username: "SnakeVenom",
    displayName: "Nọc Rắn",
    tier: { name: "VP Team", color: "#DC143C", icon: Star },
    status: "Active",
    joinDate: "2022-02-14",
    contributions: 95,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnakeVenom",
  },
];

const tiers = [
  { value: "all", label: "Tất Cả Cấp Độ" },
  { value: "admin", label: "Admin" },
  { value: "quản lý gia tộc", label: "Quản Lý Gia Tộc" },
  { value: "quản lý doanh nghiệp", label: "Quản Lý Doanh Nghiệp" },
  { value: "vp team", label: "VP Team" },
  { value: "việt pride", label: "Việt Pride" },
];

export default function Members() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch = 
      member.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = 
      selectedTier === "all" || 
      member.tier.name.toLowerCase() === selectedTier;

    return matchesSearch && matchesTier;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12">

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              THÀNH VIÊN GANG
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Danh sách các chiến binh của VIET PRIDE. Mỗi thành viên đều là một phần 
              không thể thiếu trong gia đình chúng tôi.
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <CyberpunkCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm thành viên..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-primary/30"
                  />
                </div>

                {/* Tier Filter */}
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger className="bg-background border-primary/30">
                    <SelectValue placeholder="Chọn cấp độ" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiers.map((tier) => (
                      <SelectItem key={tier.value} value={tier.value}>
                        {tier.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </CyberpunkCard>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredMembers.map((member) => {
              const TierIcon = member.tier.icon;
              
              return (
                <CyberpunkCard key={member.id} className="hover:scale-105 transition-transform">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div 
                        className="w-24 h-24 rounded-full border-2 overflow-hidden"
                        style={{ borderColor: member.tier.color }}
                      >
                        <img 
                          src={member.avatar} 
                          alt={member.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Tier badge */}
                      <div 
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 clip-corner-sm flex items-center gap-1"
                        style={{ 
                          backgroundColor: `${member.tier.color}20`,
                          borderColor: member.tier.color,
                          borderWidth: '1px',
                        }}
                      >
                        <TierIcon className="w-3 h-3" style={{ color: member.tier.color }} />
                        <span className="text-xs font-bold" style={{ color: member.tier.color }}>
                          {member.tier.name}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="w-full">
                      <h3 className="text-xl font-bold mb-1">{member.displayName}</h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        @{member.username}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="w-full grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-background/50 p-2 clip-corner-sm border border-primary/20">
                        <div className="text-xs text-muted-foreground">Đóng Góp</div>
                        <div className="text-lg font-bold text-primary">{member.contributions}</div>
                      </div>
                      <div className="bg-background/50 p-2 clip-corner-sm border border-primary/20">
                        <div className="text-xs text-muted-foreground">Trạng Thái</div>
                        <Badge 
                          variant={member.status === "Active" ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {member.status === "Active" ? "Hoạt Động" : "Không Hoạt Động"}
                        </Badge>
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="w-full text-xs text-muted-foreground font-mono pt-2 border-t border-primary/20">
                      Tham gia: {new Date(member.joinDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>


                </CyberpunkCard>
              );
            })}
          </div>

          {/* No results */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-20">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Không Tìm Thấy Thành Viên</h3>
              <p className="text-muted-foreground">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}

          {/* Stats Summary */}
          <div className="mt-16 max-w-4xl mx-auto">
            <CyberpunkCard>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary neon-text mb-2">
                    {mockMembers.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Tổng Thành Viên
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-2 mb-2">
                    {mockMembers.filter(m => m.tier.name === "Boss" || m.tier.name === "Officer").length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Quản Lý
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-3 mb-2">
                    {mockMembers.filter(m => m.status === "Active").length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Đang Hoạt Động
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-4 mb-2">
                    {mockMembers.reduce((sum, m) => sum + m.contributions, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Tổng Đóng Góp
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
