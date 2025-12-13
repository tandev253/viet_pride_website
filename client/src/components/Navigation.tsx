import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const baseNavItems = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/about" },
  { label: "Thành Viên", href: "/members" },
  { label: "Sự Kiện", href: "/events" },
  { label: "Bài Viết", href: "/posts" },
  { label: "Gallery", href: "/gallery" },
  { label: "Server", href: "/servers" },
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Add Admin Dashboard link if user is Admin
  const navItems = user?.role === "Admin" 
    ? [...baseNavItems, { label: "Admin", href: "/admin" }]
    : baseNavItems;

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công!");
    setLocation("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Viet Pride Logo" 
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary neon-text">
                VIET PRIDE
              </span>
              <span className="text-[8px] text-muted-foreground font-mono">
                [GTA V ONLINE GANG]
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`
                    px-4 py-2 text-sm font-medium uppercase tracking-wider
                    transition-all duration-200 relative
                    ${isActive 
                      ? "text-primary" 
                      : "text-foreground hover:text-primary"
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_oklch(0.55_0.25_20)]" />
                  )}
                </Link>
              );
            })}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 clip-corner-sm flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-primary/30 clip-corner">
                  <DropdownMenuLabel className="text-foreground">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {user.role && (
                        <p className="text-xs text-primary font-semibold">Role: {user.role}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/30" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng Xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 clip-corner-sm"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Đăng Nhập
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground clip-corner-sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Đăng Ký
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/30">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`
                      block px-4 py-3 text-sm font-medium uppercase tracking-wider
                      transition-all duration-200 clip-corner-sm
                      ${isActive 
                        ? "bg-primary/20 text-primary border-l-2 border-primary" 
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>                );
              })}

              {/* Mobile Auth Buttons */}
              <div className="mt-4 pt-4 border-t border-primary/30 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-2 bg-card border border-primary/30 clip-corner-sm">
                      <p className="text-sm font-medium text-foreground">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {user.role && (
                        <p className="text-xs text-primary font-semibold mt-1">Role: {user.role}</p>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 clip-corner-sm"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng Xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full border-primary/30 hover:bg-primary/10 clip-corner-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Đăng Nhập
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground clip-corner-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Đăng Ký
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
