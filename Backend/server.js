// const express = require("express");
// const Stripe = require("stripe");
// const cors = require("cors");

// const app = express();
// const stripe = Stripe(
//   "sk_test_51QmgnTP7xAW3Ba0EoTTYcOpbeVvMjUJJEjL3tk9cZMvi8SnsYUgGvMXBiBoiXULnrzc0igAYlL7spLTeH19UNGGA00ZqqTXg1q"
// );

// app.use(cors());
// app.use(express.json());

// app.post("/create-checkout-session", async (req, res) => {
//   console.log("Request received:", req.body);
//   const { items, orderId } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ error: "No se proporcionaron productos." });
//   }

//   // Verificar la estructura de items
//   console.log("Items recibidos:", items);

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: items.map((item) => {
//         if (!item.name || !item.price) {
//           throw new Error("Faltan datos del producto (name o price)");
//         }

//         return {
//           price_data: {
//             currency: "mxn",
//             product_data: {
//               name: item.name,
//             },
//             unit_amount: item.price * 100, // Convertir de MXN a centavos
//           },
//           quantity: item.quantity,
//         };
//       }),
//       mode: "payment",
//       success_url: `http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:8080/cancel`,
//       metadata: {
//         orderId,
//       },
//     });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error("Error al crear la Checkout Session:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(5000, () => {
//   console.log("Servidor corriendo en http://localhost:5000");
// });






const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(
  "sk_test_51QmgnTP7xAW3Ba0EoTTYcOpbeVvMjUJJEjL3tk9cZMvi8SnsYUgGvMXBiBoiXULnrzc0igAYlL7spLTeH19UNGGA00ZqqTXg1q"
);

app.use(cors());
app.use(express.json());

// Ruta para crear una sesión de pago
app.post("/create-checkout-session", async (req, res) => {
  console.log("Request received:", req.body);
  const { items, orderId } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No se proporcionaron productos." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => {
        if (!item.name || !item.price) {
          throw new Error("Faltan datos del producto (name o price)");
        }

        return {
          price_data: {
            currency: "mxn",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Convertir de MXN a centavos
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:8080/cancel`,
      metadata: {
        orderId,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error al crear la Checkout Session:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para verificar el estado del pago
app.get("/api/verify-payment", async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "No session_id provided" });
  }

  try {
    // Llamamos a la API de Stripe para obtener la sesión de pago
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Verificamos el estado del pago
    if (session.payment_status === "paid") {
      // Si el pago fue exitoso, podemos obtener el orderId almacenado en los metadatos
      res.status(200).json({
        success: true,
        orderId: session.metadata.orderId,
      });
    } else {
      res.status(400).json({ success: false, message: "Pago no realizado" });
    }
  } catch (error) {
    console.error("Error al verificar la sesión de pago:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
