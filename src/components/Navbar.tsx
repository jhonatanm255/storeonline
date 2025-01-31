import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { items } = useCart();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
            <Button variant="ghost" onClick={() => navigate("/")}>Inicio</Button>
            <Button variant="ghost" onClick={() => navigate("/menu")}>Menú</Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>Sobre Nosotros</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contacto</Button>
            <Button variant="ghost" onClick={() => navigate("/cart")} className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/cart")} className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            </Button>
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button variant="ghost" className="w-full text-left" onClick={() => {
            navigate("/");
            setIsMenuOpen(false);
          }}>Inicio</Button>
          <Button variant="ghost" className="w-full text-left" onClick={() => {
            navigate("/menu");
            setIsMenuOpen(false);
          }}>Menú</Button>
          <Button variant="ghost" className="w-full text-left" onClick={() => {
            navigate("/about");
            setIsMenuOpen(false);
          }}>Sobre Nosotros</Button>
          <Button variant="ghost" className="w-full text-left" onClick={() => {
            navigate("/contact");
            setIsMenuOpen(false);
          }}>Contacto</Button>
        </div>
      </div>
    </nav>
  );
};