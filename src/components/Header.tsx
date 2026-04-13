import logo from "@/assets/logo.png";
import { useState } from "react";
import { ShoppingBag, Search, User, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "919960761173"; // update later if needed

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi, I want to shop from Rich Look Mens Wear. Please share details."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>

          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="Rich Look Mens Wear"
              className="h-8 sm:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/mens"
              className={`text-sm font-medium transition-colors ${
                isActive("/mens")
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "hover:text-accent"
              }`}
            >
              Men
            </Link>

            <Link
              to="/kids"
              className={`text-sm font-medium transition-colors ${
                isActive("/kids")
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "hover:text-accent"
              }`}
            >
              Kids
            </Link>

            <Link
              to="/accessories"
              className={`text-sm font-medium transition-colors ${
                isActive("/accessories")
                  ? "text-accent border-b-2 border-accent pb-1"
                  : "hover:text-accent"
              }`}
            >
              Accessories
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button
              className="hidden md:flex gap-2 btn-primary"
              onClick={openWhatsApp}
            >
              <Phone className="h-4 w-4" />
              Order on WhatsApp
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t pt-4">
            <Link
              to="/mens"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left font-medium py-2 ${
                isActive("/mens") ? "text-accent font-semibold" : ""
              }`}
            >
              Men
            </Link>

            <Link
              to="/kids"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left font-medium py-2 ${
                isActive("/kids") ? "text-accent font-semibold" : ""
              }`}
            >
              Kids
            </Link>

            <Link
              to="/accessories"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left font-medium py-2 ${
                isActive("/accessories") ? "text-accent font-semibold" : ""
              }`}
            >
              Accessories
            </Link>

            <Button
              className="w-full btn-primary mt-2"
              onClick={openWhatsApp}
            >
              Order on WhatsApp
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
