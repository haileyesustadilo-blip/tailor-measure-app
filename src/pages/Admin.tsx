import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Eye, Download, User, Ruler, Calendar, MessageSquare } from "lucide-react";

// Mock data for demonstration
const mockOrders = [
  {
    id: "ORD-001",
    fullName: "John Smith",
    height: "175",
    photoUrl: "/uploads/photo_john.jpg",
    receiptUrl: "/uploads/receipt_john.png",
    notes: "Prefer dark navy suit with slim fit",
    status: "Pending",
    createdAt: "2024-08-01T10:30:00Z",
  },
  {
    id: "ORD-002",
    fullName: "Sarah Johnson",
    height: "165",
    photoUrl: "/uploads/photo_sarah.jpg",
    receiptUrl: "/uploads/receipt_sarah.pdf",
    notes: "Wedding dress, vintage style preferred",
    status: "In Progress",
    createdAt: "2024-07-30T14:15:00Z",
  },
  {
    id: "ORD-003",
    fullName: "Michael Brown",
    height: "180",
    photoUrl: "/uploads/photo_michael.jpg",
    receiptUrl: "/uploads/receipt_michael.png",
    notes: "Business suit for corporate meetings",
    status: "Completed",
    createdAt: "2024-07-28T09:45:00Z",
  },
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [orders] = useState(mockOrders);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in real app, use proper auth
    if (loginData.username === "admin" && loginData.password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Use admin/admin123");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen pt-16">
          <Card className="w-full max-w-md shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" variant="premium" className="w-full">
                  Login
                </Button>
              </form>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Demo credentials: admin / admin123
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Manage custom clothing orders and customer requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold">
                    {orders.filter(order => order.status === "Pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-yellow-800" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">
                    {orders.filter(order => order.status === "Completed").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-800" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl">Customer Orders</CardTitle>
            <CardDescription>
              Review and manage all incoming custom clothing orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-lg font-semibold">{order.fullName}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Order ID: {order.id}
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4" />
                          Height: {order.height} cm
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                        </div>
                        {order.notes && (
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 mt-0.5" />
                            <span className="line-clamp-2">{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                      <Button variant="premium" size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;