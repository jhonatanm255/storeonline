import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SandwichShop</h3>
            <p className="text-sm">
              Delicious, fresh sandwiches made with love and the finest ingredients.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/menu" className="hover:text-accent">Menu</a></li>
              <li><a href="/about" className="hover:text-accent">About Us</a></li>
              <li><a href="/contact" className="hover:text-accent">Contact</a></li>
              <li><a href="/privacy" className="hover:text-accent">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>123 Sandwich Street</li>
              <li>Foodville, FD 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: hello@sandwichshop.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
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
          <p>&copy; {new Date().getFullYear()} SandwichShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};