import { CyberpunkCard, DataDecor, GlitchText } from "@/components/CyberpunkCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Eye, Heart, MessageCircle, Search, User } from "lucide-react";
import { useState } from "react";

// Mock data - sẽ được thay thế bằng dữ liệu từ Strapi
const mockPosts = [
  {
    id: 1,
    title: "Chiến Thắng Vang Dội Tại Server Los Santos",
    slug: "chien-thang-vang-doi-tai-server-los-santos",
    excerpt: "Sau 3 giờ chiến đấu căng thẳng, VIET PRIDE đã giành chiến thắng trong trận Gang War lớn nhất tháng...",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    author: { displayName: "Rồng Vàng" },
    category: { name: "Thành Tích", slug: "thanh-tich" },
    server: { name: "Server 1 - Los Santos" },
    publishedAt: "2024-01-15T10:00:00",
    views: 1250,
    likes: 89,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Hướng Dẫn: Cách Tham Gia Heist Hiệu Quả",
    slug: "huong-dan-cach-tham-gia-heist-hieu-qua",
    excerpt: "Bài viết chi tiết về cách chuẩn bị và thực hiện một heist thành công trong GTA V Online...",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    author: { displayName: "Phượng Hoàng" },
    category: { name: "Hướng Dẫn", slug: "huong-dan" },
    server: { name: "Server 1 - Los Santos" },
    publishedAt: "2024-01-14T15:30:00",
    views: 890,
    likes: 67,
    isFeatured: false,
  },
  {
    id: 3,
    title: "Tin Tức: Cập Nhật Mới Cho Gang System",
    slug: "tin-tuc-cap-nhat-moi-cho-gang-system",
    excerpt: "Rockstar Games vừa công bố bản cập nhật mới với nhiều tính năng thú vị cho hệ thống gang...",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop",
    author: { displayName: "Hổ Móng" },
    category: { name: "Tin Tức", slug: "tin-tuc" },
    server: { name: "Server 2 - Vice City" },
    publishedAt: "2024-01-13T09:00:00",
    views: 1450,
    likes: 102,
    isFeatured: true,
  },
  {
    id: 4,
    title: "Recap: Street Race Championship Tháng 12",
    slug: "recap-street-race-championship-thang-12",
    excerpt: "Tổng hợp những khoảnh khắc đáng nhớ nhất từ giải đua xe đường phố tháng trước...",
    thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop",
    author: { displayName: "Mắt Đại Bàng" },
    category: { name: "Sự Kiện", slug: "su-kien" },
    server: { name: "Server 1 - Los Santos" },
    publishedAt: "2024-01-12T18:00:00",
    views: 720,
    likes: 54,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Chào Mừng Thành Viên Mới Tháng 1",
    slug: "chao-mung-thanh-vien-moi-thang-1",
    excerpt: "Hãy cùng chào đón 5 thành viên mới gia nhập gia đình VIET PRIDE trong tháng này...",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
    author: { displayName: "Rồng Vàng" },
    category: { name: "Tin Tức", slug: "tin-tuc" },
    server: { name: "Server 1 - Los Santos" },
    publishedAt: "2024-01-11T12:00:00",
    views: 650,
    likes: 48,
    isFeatured: false,
  },
  {
    id: 6,
    title: "Top 10 Xe Đua Tốt Nhất Cho Street Race",
    slug: "top-10-xe-dua-tot-nhat-cho-street-race",
    excerpt: "Danh sách những chiếc xe tốt nhất để chiến thắng trong các cuộc đua đường phố...",
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop",
    author: { displayName: "Nọc Rắn" },
    category: { name: "Hướng Dẫn", slug: "huong-dan" },
    server: { name: "Server 2 - Vice City" },
    publishedAt: "2024-01-10T14:00:00",
    views: 980,
    likes: 71,
    isFeatured: false,
  },
];

const categories = [
  { value: "all", label: "Tất Cả Danh Mục" },
  { value: "tin-tuc", label: "Tin Tức" },
  { value: "su-kien", label: "Sự Kiện" },
  { value: "huong-dan", label: "Hướng Dẫn" },
  { value: "thanh-tich", label: "Thành Tích" },
];

export default function Posts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const featuredPosts = mockPosts.filter(p => p.isFeatured);
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || 
      post.category.slug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12">

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <GlitchText>BÀI VIẾT</GlitchText>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tin tức, hướng dẫn và câu chuyện từ các thành viên VIET PRIDE. 
              Cập nhật mọi hoạt động của gang từng ngày.
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-primary animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-bold">NỔI BẬT</h2>
                <div className="flex-1 h-px bg-primary/30" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <CyberpunkCard key={post.id} className="overflow-hidden hover:scale-[1.02] transition-transform">
                    <div className="relative h-48 -m-6 mb-4">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {post.category.name}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-primary/20">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author.displayName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </div>
                        </div>
                      </div>
                    </div>


                  </CyberpunkCard>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <CyberpunkCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-primary/30"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-background border-primary/30">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </CyberpunkCard>
          </div>

          {/* All Posts */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">TẤT CẢ BÀI VIẾT</h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <CyberpunkCard key={post.id} className="overflow-hidden hover:scale-105 transition-transform">
                  <div className="relative h-40 -m-6 mb-4">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-card/80 backdrop-blur-sm text-xs">
                      {post.category.name}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-primary/20 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author.displayName}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                  </div>


                </CyberpunkCard>
              ))}
            </div>

            {/* No results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">Không Tìm Thấy Bài Viết</h3>
                <p className="text-muted-foreground">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto">
            <CyberpunkCard>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary neon-text mb-2">
                    {mockPosts.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Tổng Bài Viết
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-2 mb-2">
                    {featuredPosts.length}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Nổi Bật
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-3 mb-2">
                    {mockPosts.reduce((sum, p) => sum + p.views, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Lượt Xem
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-4 mb-2">
                    {mockPosts.reduce((sum, p) => sum + p.likes, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Lượt Thích
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
