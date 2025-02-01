import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY"); // Reemplaza con tu clave pública de Stripe

const CheckoutButton = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          // Ajusta la URL según tu servidor
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: cartItems }),
        }
      );

      const { id } = await response.json();
      const stripe = await stripePromise;

      // Redirigir al usuario al checkout de Stripe
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema con el proceso de pago.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className="w-full" disabled={loading} onClick={handleCheckout}>
      {loading ? "Procesando..." : "Pagar con Stripe"}
    </Button>
  );
};

export default CheckoutButton;
