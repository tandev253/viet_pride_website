import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function Register() {
  const [, setLocation] = useLocation();
  const { register, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  if (isAuthenticated) {
    setLocation("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password);
      toast.success("Đăng ký thành công! Chào mừng bạn đến với Viet Pride!");
      setLocation("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đăng ký thất bại";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-primary/10 clip-corner mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Đăng Ký
            </h1>
            <p className="text-muted-foreground">
              Tham gia Viet Pride Gang ngay hôm nay
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-card border-2 border-primary/30 clip-corner p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 clip-corner-sm">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Tên đăng nhập
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="vietpride_member"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background border-primary/30 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Tên đăng nhập sẽ hiển thị công khai
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background border-primary/30 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Tối thiểu 6 ký tự
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                  Xác nhận mật khẩu
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background border-primary/30 focus:border-primary"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 clip-corner"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Đăng Ký
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">
                  Đã có tài khoản?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10 clip-corner"
              >
                Đăng Nhập
              </Button>
            </Link>
          </div>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-muted/50 border border-primary/20 clip-corner-sm">
            <p className="text-sm text-muted-foreground text-center">
              <span className="text-primary font-semibold">Lưu ý:</span> Sau khi đăng ký, tài khoản của bạn sẽ có role{" "}
              <span className="text-foreground font-medium">"Khách"</span>. Bạn cần liên hệ Admin để được cấp role chính thức và hiển thị trong danh sách Thành Viên.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
