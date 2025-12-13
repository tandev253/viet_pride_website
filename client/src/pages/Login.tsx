import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
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
    setIsLoading(true);

    try {
      await login(identifier, password);
      toast.success("Đăng nhập thành công!");
      setLocation("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đăng nhập thất bại";
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
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Đăng Nhập
            </h1>
            <p className="text-muted-foreground">
              Chào mừng trở lại Viet Pride Gang
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card border-2 border-primary/30 clip-corner p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 clip-corner-sm">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Email/Username */}
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-foreground font-medium">
                  Email hoặc Tên đăng nhập
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="your@email.com hoặc username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
                    <LogIn className="w-5 h-5 mr-2" />
                    Đăng Nhập
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
                  Chưa có tài khoản?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link href="/register">
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10 clip-corner"
              >
                Đăng Ký Ngay
              </Button>
            </Link>
          </div>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-muted/50 border border-primary/20 clip-corner-sm">
            <p className="text-sm text-muted-foreground text-center">
              <span className="text-primary font-semibold">Lưu ý:</span> Tài khoản mới sẽ có role{" "}
              <span className="text-foreground font-medium">"Khách"</span> và cần được Admin phê duyệt để trở thành thành viên chính thức.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
