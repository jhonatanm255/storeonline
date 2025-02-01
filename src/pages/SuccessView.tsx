// import { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { supabase } from "@/lib/supabaseClient";

// const Success = () => {
//   const location = useLocation();
//   const [orderDetails, setOrderDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const params = new URLSearchParams(location.search);
//       const sessionId = params.get("session_id");

//       if (!sessionId) {
//         setLoading(false);
//         setError("No se proporcionó un ID de sesión.");
//         return;
//       }

//       // Llamada a la API de Stripe para verificar la sesión de pago
//       try {
//         const response = await fetch(
//           `/api/verify-payment?session_id=${sessionId}`
//         );
//         const result = await response.json();

//         console.log("Resultado de la verificación de pago:", result); // Log de depuración

//         if (result.success) {
//           // Obtener detalles de la orden si el pago fue exitoso
//           const { data: order, error: orderError } = await supabase
//             .from("orders")
//             .select("*")
//             .eq("id", result.orderId)
//             .single();

//           if (orderError) {
//             setError("Error al obtener los detalles de la orden.");
//             console.error("Error al obtener la orden:", orderError);
//           } else {
//             setOrderDetails(order);
//           }
//         } else {
//           setError("El pago no fue exitoso.");
//         }
//       } catch (err) {
//         setError("Hubo un error al verificar la sesión de pago.");
//         console.error("Error al verificar la sesión de pago:", err);
//       }

//       setLoading(false);
//     };

//     fetchSession();
//   }, [location.search]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold">Cargando...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold text-red-500">{error}</h2>
//         <Link to="/" className="mt-4 text-blue-500 hover:text-blue-700">
//           Regresar al inicio
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <h2 className="text-3xl font-bold text-green-500">¡Pago exitoso!</h2>
//       <p className="mt-4 text-xl">
//         Gracias por tu compra. Tu pedido ha sido procesado con éxito.
//       </p>
//       <p className="mt-4">ID de pedido: {orderDetails.id}</p>
//       <Link
//         to="/"
//         className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//       >
//         Volver al inicio
//       </Link>
//     </div>
//   );
// };

// export default Success;







import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const Success = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) return;

      try {
        // Llamada a la API para verificar el estado del pago
        const response = await fetch(
          `http://localhost:5000/api/verify-payment?session_id=${sessionId}`
        );
        const result = await response.json();

        if (result.success) {
          // Obtener detalles de la orden si el pago fue exitoso
          const { data: order } = await supabase
            .from("orders")
            .select("*")
            .eq("id", result.orderId)
            .single();

          setOrderDetails(order);
        } else {
          console.error("Error al verificar el pago:", result.message);
        }
      } catch (error) {
        console.error("Error al verificar la sesión de pago:", error);
      }
    };

    fetchSession();
  }, [location.search]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Cargando...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold">¡Pago exitoso!</h2>
      <p className="mt-4">
        Gracias por tu compra. Tu pedido ha sido procesado con éxito.
      </p>
      <p className="mt-4">ID de pedido: {orderDetails.id}</p>
      <a href="/" className="mt-4 text-blue-600">
        Regresar al inicio
      </a>
    </div>
  );
};

export default Success;
