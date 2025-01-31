import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      toast({
        title: "¡Pago exitoso!",
        description: "Tu orden ha sido procesada correctamente.",
      });
    }

    // Redirigir al inicio después de 5 segundos
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [sessionId, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
          <p className="text-gray-600 mb-8">
            Tu orden ha sido procesada exitosamente. Serás redirigido a la página principal en unos segundos.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;