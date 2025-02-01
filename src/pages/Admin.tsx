// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
// import { useState } from "react";
// import { ProductCard } from "@/components/ProductCard";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "@/contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   const [products, setProducts] = useState([
//     {
//       id: "1",
//       name: "Club Clásico",
//       description: "Pan integral, pechuga de pavo, tocino crujiente, lechuga fresca, tomate y mayonesa casera",
//       price: 12.99,
//       image: "/placeholder.svg",
//     },
//     {
//       id: "2",
//       name: "Vegetariano Deluxe",
//       description: "Pan de centeno, hummus, aguacate, pepino, zanahoria rallada, brotes y pesto",
//       price: 10.99,
//       image: "/placeholder.svg",
//     }
//   ]);
  
//   const { toast } = useToast();
//   const { signOut } = useAuth();
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       toast({
//         title: "Sesión cerrada",
//         description: "Has cerrado sesión correctamente",
//       });
//       navigate("/");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "No se pudo cerrar la sesión",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleAddProduct = () => {
//     toast({
//       title: "Función no disponible",
//       description: "Por favor, configura Supabase primero para habilitar la gestión de productos.",
//     });
//   };

//   const handleEditProduct = (id: string) => {
//     toast({
//       title: "Función no disponible",
//       description: "Por favor, configura Supabase primero para habilitar la edición de productos.",
//     });
//   };

//   const handleDeleteProduct = (id: string) => {
//     toast({
//       title: "Función no disponible",
//       description: "Por favor, configura Supabase primero para habilitar la eliminación de productos.",
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow container mx-auto px-4 py-8 mt-16">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Panel de Administración</h1>
//           <div className="flex gap-4">
//             <Button 
//               className="flex items-center gap-2"
//               onClick={handleAddProduct}
//             >
//               <Plus className="h-4 w-4" />
//               Agregar Producto
//             </Button>
//             <Button 
//               variant="destructive"
//               className="flex items-center gap-2"
//               onClick={handleSignOut}
//             >
//               <LogOut className="h-4 w-4" />
//               Cerrar Sesión
//             </Button>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product.id} className="relative group">
//               <ProductCard {...product} />
//               <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Button 
//                   variant="secondary" 
//                   size="icon"
//                   onClick={() => handleEditProduct(product.id)}
//                 >
//                   <Pencil className="h-4 w-4" />
//                 </Button>
//                 <Button 
//                   variant="destructive" 
//                   size="icon"
//                   onClick={() => handleDeleteProduct(product.id)}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Admin;




import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Asegúrate de que la ruta sea correcta
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "/placeholder.svg",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const { toast } = useToast();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos.",
          variant: "destructive",
        });
        console.error(error);
      } else if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  const handleAddProduct = () => {
    setIsEditing(true);
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      image: "/placeholder.svg",
    });
  };

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      toast({
        title: "Error",
        description: "Por favor, llena todos los campos correctamente.",
        variant: "destructive",
      });
      return;
    }

    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: formData.image,
    };

    if (isEditing && selectedProduct) {
      // Editar producto
      const { data, error } = await supabase
        .from("products")
        .update(newProduct)
        .eq("id", selectedProduct.id)
        .select();

      if (error) {
        toast({
          title: "Error",
          description: "No se pudo editar el producto.",
          variant: "destructive",
        });
        console.error(error);
      } else {
        toast({
          title: "Producto actualizado",
          description: `El producto "${newProduct.name}" se ha actualizado correctamente.`,
        });
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? data[0] : product
          )
        );
        setIsEditing(false);
        setSelectedProduct(null);
      }
    } else {
      // Agregar producto
      const { data, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select();

      if (error) {
        toast({
          title: "Error",
          description: "No se pudo agregar el producto.",
          variant: "destructive",
        });
        console.error(error);
      } else {
        toast({
          title: "Producto agregado",
          description: `El producto "${newProduct.name}" se ha agregado correctamente.`,
        });
        setProducts((prevProducts) => [...prevProducts, data[0]]);
        setIsEditing(false);
        setFormData({
          name: "",
          description: "",
          price: 0,
          image: "/placeholder.svg",
        });
      }
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto.",
        variant: "destructive",
      });
      console.error(error);
    } else {
      toast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado correctamente.",
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      setIsConfirmingDelete(false);
    }
  };

  const handleConfirmDelete = (id) => {
    setIsConfirmingDelete(id);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <div className="flex gap-4">
            <Button
              className="flex items-center gap-2"
              onClick={handleAddProduct}
            >
              <Plus className="h-4 w-4" />
              Agregar Producto
            </Button>
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {isEditing && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedProduct ? "Editar Producto" : "Agregar Producto"}
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <label className="block text-sm font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <label className="block text-sm font-medium mb-2">Precio</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: +e.target.value })
                  }
                />

                <label className="block text-sm font-medium mb-2">Imagen</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />

                <Button onClick={handleSaveProduct} className="w-full mt-4">
                  {selectedProduct ? "Guardar Cambios" : "Agregar Producto"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard {...product} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => handleEditProduct(product)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleConfirmDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {isConfirmingDelete && (
          <div className="modal-overlay">
            <div className="modal">
              <p>¿Estás seguro de que quieres eliminar este producto?</p>
              <Button
                variant="destructive"
                onClick={() => handleDeleteProduct(isConfirmingDelete)}
              >
                Sí, eliminar
              </Button>
              <Button onClick={handleCancelDelete}>Cancelar</Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
