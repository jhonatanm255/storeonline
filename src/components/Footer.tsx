import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SandwichShop</h3>
            <p className="text-sm">
              Deliciosos sándwiches frescos hechos con amor y los mejores ingredientes.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/menu" className="hover:text-accent">Menú</Link></li>
              <li><Link to="/about" className="hover:text-accent">Sobre Nosotros</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contacto</Link></li>
              <li><Link to="/admin" className="hover:text-accent">Administración</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
            <ul className="space-y-2">
              <li>123 Sandwich Street</li>
              <li>Foodville, FD 12345</li>
              <li>Teléfono: (555) 123-4567</li>
              <li>Email: hello@sandwichshop.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-accent">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-accent">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} SandwichShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};