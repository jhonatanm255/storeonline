import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const Cart = () => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            total,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      console.log("Order creado:", order);
      console.log("Order ID:", order.id, typeof order.id);

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      console.log("Order Items:", orderItems);

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Error al insertar items:", itemsError);
        throw itemsError;
      }

      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              name: item.name,
              price: Math.round(item.price),
              quantity: item.quantity,
            })),
            orderId: order.id,
          }),
        }
      );

      const sessionData = await response.json();

      if (sessionData?.url) {
        console.log("Redirigiendo a:", sessionData.url);
        clearCart();
        window.location.href = sessionData.url;
      } else {
        throw new Error("Error al obtener la URL del checkout de Stripe");
      }
    } catch (error) {
      console.error("Error durante el checkout:", error);
      toast({
        title: "Error",
        description:
          "Hubo un error al procesar el pago. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600">
              ¡Agrega algunos productos deliciosos!
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
        <div className="grid grid-cols-1 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-end gap-4">
          <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
          <Button className="w-full md:w-auto" onClick={handleCheckout}>
            Proceder al pago
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
