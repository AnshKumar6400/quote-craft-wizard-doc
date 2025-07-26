import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white border-b border-primary/10 shadow-sm py-2 px-4 flex items-center justify-between z-20">
      <div className="font-bold text-xl text-primary cursor-pointer" onClick={() => navigate("/")}>QuoteCraft</div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button variant="ghost" onClick={() => navigate("/quotation")}>Quotation</Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button variant="ghost" onClick={() => navigate("/items")}>Items</Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {isAuthenticated && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Button variant="outline" className="ml-2" onClick={logout}>Logout</Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Optional: Replace with a spinner or full-screen loader
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
