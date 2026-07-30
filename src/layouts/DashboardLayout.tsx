import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  Search,
  Store,
  UserSquare2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const shopLinks = [
  { name: "Dashboard", href: "/shop", icon: LayoutDashboard },
  { name: "Inventory", href: "/shop/inventory", icon: Package },
  { name: "Farmers", href: "/shop/farmers", icon: Users },
  { name: "Sales", href: "/shop/sales", icon: ShoppingCart },
  { name: "Credit Ledger", href: "/shop/credit", icon: BookOpen },
  { name: "Reports", href: "/shop/reports", icon: BarChart3 },
];

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Agents", href: "/admin/agents", icon: UserSquare2 },
  { name: "Shops", href: "/admin/shops", icon: Store },
  { name: "Reports", href: "/admin/reports", icon: FileText },
];

const agentLinks = [
  { name: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { name: "Register Shop", href: "/agent/register-shop", icon: Store },
  { name: "My Shops", href: "/agent/shops", icon: Package },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    return document.cookie.includes("googtrans=/en/kn") ? "kn" : "en";
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "kn" : "en";
    setLanguage(newLang);
    
    if (newLang === "kn") {
      document.cookie = "googtrans=/en/kn; path=/";
    } else {
      document.cookie = "googtrans=/en/en; path=/";
      // Clear cookie completely to revert to original
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    }
    window.location.reload();
  };

  const currentPath = location.pathname;
  let sidebarLinks = shopLinks;
  if (currentPath.startsWith("/admin")) {
    sidebarLinks = adminLinks;
  } else if (currentPath.startsWith("/agent")) {
    sidebarLinks = agentLinks;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out border-r bg-card flex-col z-50 fixed md:relative h-full ${mobileMenuOpen ? "flex" : "hidden md:flex"}`}
      >
        <div className="h-16 flex items-center justify-center border-b px-4">
          {sidebarOpen ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-primary leading-none">AgriFlow</h2>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold mt-1">By BluNet IT Services</span>
            </div>
          ) : (
            <h2 className="text-xl font-bold text-primary">AF</h2>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.href || (location.pathname.startsWith(link.href) && !["/shop", "/admin", "/agent"].includes(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  title={!sidebarOpen ? link.name : undefined}
                >
                  <Icon className={`flex-shrink-0 ${sidebarOpen ? "mr-3" : "mx-auto"} h-5 w-5`} />
                  {sidebarOpen && <span>{link.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t space-y-2">
          <Link
            to="/settings"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Settings className={`flex-shrink-0 ${sidebarOpen ? "mr-3" : "mx-auto"} h-5 w-5`} />
            {sidebarOpen && <span>Settings</span>}
          </Link>
          <button
            onClick={() => {
              navigate("/auth/login");
              setMobileMenuOpen(false);
            }}
            className="flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className={`flex-shrink-0 ${sidebarOpen ? "mr-3" : "mx-auto"} h-5 w-5`} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between border-b bg-card px-4 lg:px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:flex">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="hidden sm:flex items-center relative w-64 lg:w-96">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search anything..."
                className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-muted-foreground font-semibold px-2 border-primary/20 hover:bg-primary/5"
              onClick={toggleLanguage}
            >
              {language === "en" ? "EN/ಕನ್ನಡ" : "ಕನ್ನಡ/EN"}
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="@shopowner" />
                    <AvatarFallback>SO</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Sri Ram Fertilizers</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      owner@sriram.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info("Profile page coming soon")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Billing page coming soon")}>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => navigate("/auth/login")}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
