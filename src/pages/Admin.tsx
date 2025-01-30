import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [products, setProducts] = useState([
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
    }
  ]);
  const { toast } = useToast();

  const handleAddProduct = () => {
    toast({
      title: "Función no disponible",
      description: "Por favor, configura Supabase primero para habilitar la gestión de productos.",
    });
  };

  const handleEditProduct = (id: string) => {
    toast({
      title: "Función no disponible",
      description: "Por favor, configura Supabase primero para habilitar la edición de productos.",
    });
  };

  const handleDeleteProduct = (id: string) => {
    toast({
      title: "Función no disponible",
      description: "Por favor, configura Supabase primero para habilitar la eliminación de productos.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={handleAddProduct}
          >
            <Plus className="h-4 w-4" />
            Agregar Producto
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard {...product} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={() => handleEditProduct(product.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;