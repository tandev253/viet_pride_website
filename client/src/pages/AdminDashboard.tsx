import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Users,
  UserCheck,
  UserX,
  Search,
  Crown,
  Star,
  Briefcase,
  Home as HomeIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data - sẽ được thay thế bằng dữ liệu từ Strapi
const mockUsers = [
  {
    id: 1,
    username: "newuser1",
    email: "newuser1@example.com",
    role: "Khách",
    status: "pending",
    joinedAt: "2024-12-10",
    confirmed: true,
  },
  {
    id: 2,
    username: "newuser2",
    email: "newuser2@example.com",
    role: "Khách",
    status: "pending",
    joinedAt: "2024-12-11",
    confirmed: true,
  },
  {
    id: 3,
    username: "DragonKing",
    email: "dragon@vietpride.com",
    role: "Admin",
    status: "approved",
    joinedAt: "2020-01-15",
    confirmed: true,
  },
  {
    id: 4,
    username: "PhoenixFire",
    email: "phoenix@vietpride.com",
    role: "Quản Lý Gia Tộc",
    status: "approved",
    joinedAt: "2020-03-20",
    confirmed: true,
  },
  {
    id: 5,
    username: "TigerClaw",
    email: "tiger@vietpride.com",
    role: "VP Team",
    status: "approved",
    joinedAt: "2021-06-10",
    confirmed: true,
  },
];

const roles = [
  { value: "Admin", label: "Admin", icon: Crown, color: "#FFD700" },
  { value: "Quản Lý Gia Tộc", label: "Quản Lý Gia Tộc", icon: Shield, color: "#FF6B35" },
  { value: "Quản Lý Doanh Nghiệp", label: "Quản Lý Doanh Nghiệp", icon: Briefcase, color: "#00F0FF" },
  { value: "VP Team", label: "VP Team", icon: Star, color: "#DC143C" },
  { value: "Việt Pride", label: "Việt Pride", icon: HomeIcon, color: "#DC143C" },
];

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [users, setUsers] = useState(mockUsers);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || user?.role !== "Admin") {
    setLocation("/");
    return null;
  }

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, role: newRole, status: newRole !== "Khách" ? "approved" : "pending" }
        : u
    ));
    toast.success(`Đã cập nhật role thành công!`);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa user này?")) {
      setUsers(users.filter(u => u.id !== userId));
      toast.success("Đã xóa user thành công!");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "pending" && user.role === "Khách") ||
      (filterStatus === "approved" && user.role !== "Khách");

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: users.length,
    pending: users.filter(u => u.role === "Khách").length,
    approved: users.filter(u => u.role !== "Khách").length,
    admins: users.filter(u => u.role === "Admin").length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-20 pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 clip-corner">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Quản lý thành viên và cấp quyền truy cập
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 bg-card border-primary/30 clip-corner">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tổng Users</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Users className="w-10 h-10 text-primary" />
              </div>
            </Card>

            <Card className="p-6 bg-card border-yellow-500/30 clip-corner">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Chờ Duyệt</p>
                  <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
                </div>
                <UserX className="w-10 h-10 text-yellow-500" />
              </div>
            </Card>

            <Card className="p-6 bg-card border-green-500/30 clip-corner">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Đã Duyệt</p>
                  <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
                </div>
                <UserCheck className="w-10 h-10 text-green-500" />
              </div>
            </Card>

            <Card className="p-6 bg-card border-primary/30 clip-corner">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Admins</p>
                  <p className="text-3xl font-bold text-primary">{stats.admins}</p>
                </div>
                <Crown className="w-10 h-10 text-primary" />
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6 bg-card border-primary/30 clip-corner mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo username hoặc email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-primary/30"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 bg-background border-primary/30">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/30">
                  <SelectItem value="all">Tất Cả</SelectItem>
                  <SelectItem value="pending">Chờ Duyệt</SelectItem>
                  <SelectItem value="approved">Đã Duyệt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="bg-card border-primary/30 clip-corner overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/30 hover:bg-transparent">
                    <TableHead className="text-foreground font-bold">Username</TableHead>
                    <TableHead className="text-foreground font-bold">Email</TableHead>
                    <TableHead className="text-foreground font-bold">Role Hiện Tại</TableHead>
                    <TableHead className="text-foreground font-bold">Trạng Thái</TableHead>
                    <TableHead className="text-foreground font-bold">Ngày Tham Gia</TableHead>
                    <TableHead className="text-foreground font-bold">Cấp Role</TableHead>
                    <TableHead className="text-foreground font-bold text-right">Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-primary/30">
                      <TableCell className="font-medium text-foreground">
                        {user.username}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-primary/30"
                          style={{
                            color: user.role === "Khách" ? "#999" : "#DC143C",
                            borderColor: user.role === "Khách" ? "#999" : "#DC143C",
                          }}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.role === "Khách" ? (
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-500">
                            Chờ Duyệt
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-500/30 text-green-500">
                            Đã Duyệt
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.joinedAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="w-48 bg-background border-primary/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-primary/30">
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center gap-2">
                                  <role.icon className="w-4 h-4" style={{ color: role.color }} />
                                  {role.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="border-destructive/30 text-destructive hover:bg-destructive/10"
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Không tìm thấy user nào</p>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
