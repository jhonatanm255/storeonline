import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Success from "./pages/SuccessView";
import Cancel from "./pages/CancelView"; // Nueva ruta para cancelación
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />{" "}
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
