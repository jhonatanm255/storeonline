import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

const menuItems = [
  {
    id: "1",
    name: "Club Clásico",
    description: "Pan integral, pechuga de pavo, tocino crujiente, lechuga fresca, tomate y mayonesa casera",
    price: 12.99,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Vegetariano Deluxe",
    description: "Pan de centeno, hummus, aguacate, pepino, zanahoria rallada, brotes y pesto",
    price: 10.99,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Italiano Supremo",
    description: "Pan ciabatta, salami, pepperoni, jamón, queso provolone, lechuga, tomate y aderezo italiano",
    price: 13.99,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Pollo Pesto",
    description: "Pan focaccia, pechuga de pollo a la parrilla, mozzarella, tomate, albahaca y pesto casero",
    price: 11.99,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Atún Mediterráneo",
    description: "Pan integral, ensalada de atún, aceitunas, pepino, cebolla roja y aderezo de yogur",
    price: 11.99,
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "BBQ Pull Pork",
    description: "Pan brioche, cerdo desmenuzado en salsa BBQ, ensalada de col y cebolla caramelizada",
    price: 14.99,
    image: "/placeholder.svg",
  }
];

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Nuestro Menú</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;