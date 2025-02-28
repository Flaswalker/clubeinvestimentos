import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentSession, logoutUser } from "@/lib/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(getCurrentSession());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    // Update session when route changes
    setSession(getCurrentSession());
  }, [location.pathname]);
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg animate-fade-in">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-all duration-300 hover:opacity-80">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">B</div>
          <span className="font-semibold text-lg">Clube de Investimento</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === "/" ? "text-primary" : "text-muted-foreground")}>
            Home
          </Link>
          
          {session ? session.role === "admin" ? <Link to="/admin" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground")}>
                Admin Panel
              </Link> : <Link to="/dashboard" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname.startsWith("/dashboard") ? "text-primary" : "text-muted-foreground")}>
                Dashboard
              </Link> : null}
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-panel">
                <div className="px-4 py-3 border-b border-border/50">
                  <p className="text-sm font-medium">Account</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {session.role === "admin" ? "Administrator" : "Client"}
                  </p>
                </div>
                {session.role === "admin" ? <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Admin Panel
                  </DropdownMenuItem> : <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>
                Register
              </Button>
            </>}
        </div>
        
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/40 p-4 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === "/" ? "text-primary" : "text-muted-foreground")} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            
            {session ? session.role === "admin" ? <Link to="/admin" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground")} onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </Link> : <Link to="/dashboard" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname.startsWith("/dashboard") ? "text-primary" : "text-muted-foreground")} onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link> : <>
                <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>}
            
            {session && <Button variant="ghost" className="justify-start px-0 hover:bg-transparent" onClick={() => {
          handleLogout();
          setIsMenuOpen(false);
        }}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>}
          </nav>
        </div>}
    </header>;
};
export default Header;