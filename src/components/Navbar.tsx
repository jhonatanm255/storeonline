import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
              SandwichShop
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/menu")}>Menu</Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
            <Button variant="ghost" onClick={() => navigate("/cart")} className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button variant="ghost" className="w-full text-left" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" className="w-full text-left" onClick={() => navigate("/menu")}>Menu</Button>
            <Button variant="ghost" className="w-full text-left" onClick={() => navigate("/about")}>About</Button>
            <Button variant="ghost" className="w-full text-left" onClick={() => navigate("/contact")}>Contact</Button>
            <Button variant="ghost" className="w-full text-left" onClick={() => navigate("/cart")}>
              <div className="flex items-center justify-between">
                <span>Cart</span>
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};