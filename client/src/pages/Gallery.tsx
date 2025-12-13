import { CyberpunkCard, GlitchText } from "@/components/CyberpunkCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ZoomableImage } from "@/components/ZoomableImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Film, Play, X } from "lucide-react";
import { useState } from "react";

type MediaType = "image" | "video";
type Category = "all" | "heists" | "pvp" | "racing" | "events";

interface GalleryItem {
  id: number;
  type: MediaType;
  category: Category;
  title: string;
  description: string;
  thumbnail: string;
  fullUrl: string;
  date: string;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Mock data - replace with real data from Strapi
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: "image",
      category: "heists",
      title: "Pacific Standard Heist - Final Score",
      description: "Hoàn thành Pacific Standard với $1.2M, không một thành viên nào bị bắt",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      fullUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop",
      date: "2024-12-10",
    },
    {
      id: 2,
      type: "video",
      category: "pvp",
      title: "Gang War - Territory Defense",
      description: "Bảo vệ lãnh thổ thành công trước 15 kẻ địch trong 30 phút",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      fullUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2024-12-08",
    },
    {
      id: 3,
      type: "image",
      category: "racing",
      title: "Street Racing Championship",
      description: "Vô địch giải đua đường phố với thời gian kỷ lục 2:45",
      thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
      fullUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop",
      date: "2024-12-05",
    },
    {
      id: 4,
      type: "image",
      category: "events",
      title: "Gang Meeting - Monthly Gathering",
      description: "Họp mặt hàng tháng với 45 thành viên tham dự",
      thumbnail: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&h=600&fit=crop",
      fullUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1920&h=1080&fit=crop",
      date: "2024-12-01",
    },
    {
      id: 5,
      type: "video",
      category: "heists",
      title: "Cayo Perico Heist - Stealth Run",
      description: "Hoàn thành Cayo Perico mode stealth 100%, không bị phát hiện",
      thumbnail: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&h=600&fit=crop",
      fullUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2024-11-28",
    },
    {
      id: 6,
      type: "image",
      category: "pvp",
      title: "Rooftop Battle - Downtown LS",
      description: "Trận chiến trên nóc tòa nhà cao nhất Los Santos",
      thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop",
      fullUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&h=1080&fit=crop",
      date: "2024-11-25",
    },
    {
      id: 7,
      type: "image",
      category: "racing",
      title: "Mountain Pass Drift",
      description: "Drift hoàn hảo qua đèo núi Chiliad với 95% accuracy",
      thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      fullUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop",
      date: "2024-11-20",
    },
    {
      id: 8,
      type: "video",
      category: "events",
      title: "Anniversary Celebration",
      description: "Lễ kỷ niệm 4 năm thành lập gang với pháo hoa và parade",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      fullUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2024-11-15",
    },
    {
      id: 9,
      type: "image",
      category: "heists",
      title: "Diamond Casino Heist - Big Con",
      description: "Đánh cắp kim cương trị giá $2.1M bằng chiến thuật Big Con",
      thumbnail: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&h=600&fit=crop",
      fullUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1920&h=1080&fit=crop",
      date: "2024-11-10",
    },
  ];

  const categories = [
    { id: "all" as Category, label: "Tất Cả", icon: Camera },
    { id: "heists" as Category, label: "Heists", icon: Film },
    { id: "pvp" as Category, label: "PvP", icon: Camera },
    { id: "racing" as Category, label: "Racing", icon: Film },
    { id: "events" as Category, label: "Events", icon: Camera },
  ];

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const stats = {
    total: galleryItems.length,
    images: galleryItems.filter(item => item.type === "image").length,
    videos: galleryItems.filter(item => item.type === "video").length,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 scanline opacity-20" />

        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GlitchText>GALLERY</GlitchText>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Những khoảnh khắc <span className="text-primary font-bold">đáng nhớ</span> của Viet Pride
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary neon-text">{stats.total}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Tổng Số</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary neon-text">{stats.images}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Hình Ảnh</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary neon-text">{stats.videos}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Video</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-bg opacity-5" />
        
        <div className="container px-4 relative">
          {/* Category Filter */}
          <div className="mb-12">
            <CyberpunkCard>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;

                  return (
                    <Button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      variant={isActive ? "default" : "outline"}
                      className={`
                        clip-corner-sm uppercase tracking-wider
                        ${isActive 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-transparent text-foreground border-border hover:border-primary/50"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </CyberpunkCard>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer"
              >
                <CyberpunkCard className="overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="relative aspect-video">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {item.type === "video" ? (
                          <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-primary/80 clip-corner-sm flex items-center justify-center">
                            <Camera className="w-8 h-8 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Type badge */}
                    <div className="absolute top-2 right-2">
                      <div className={`
                        px-2 py-1 text-xs font-bold uppercase tracking-wider
                        ${item.type === "video" 
                          ? "bg-red-500 text-white" 
                          : "bg-blue-500 text-white"
                        }
                        clip-corner-sm
                      `}>
                        {item.type === "video" ? "VIDEO" : "PHOTO"}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="text-xs text-muted-foreground font-mono">
                      {new Date(item.date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </CyberpunkCard>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <CyberpunkCard className="max-w-md mx-auto">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Không Có Nội Dung</h3>
                <p className="text-muted-foreground">
                  Chưa có hình ảnh hoặc video nào trong danh mục này
                </p>
              </CyberpunkCard>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-[95vw] w-full p-0 bg-background border-2 border-primary clip-corner">
          {selectedItem && (
            <div className="relative">
              <DialogTitle className="sr-only">{selectedItem.title}</DialogTitle>
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-primary/80 hover:bg-primary clip-corner-sm flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-primary-foreground" />
              </button>

              {/* Media content */}
              <div className="relative">
                {selectedItem.type === "video" ? (
                  <div className="aspect-video bg-black">
                    <iframe
                      src={selectedItem.fullUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="w-full h-[85vh] bg-black">
                    <ZoomableImage
                      src={selectedItem.fullUrl}
                      alt={selectedItem.title}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 bg-card border-t-2 border-primary/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedItem.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                      <span>{new Date(selectedItem.date).toLocaleDateString('vi-VN')}</span>
                      <span>•</span>
                      <span className="uppercase">{selectedItem.category}</span>
                      <span>•</span>
                      <span className="uppercase">{selectedItem.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
