import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Si estás usando react-router para navegación

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Instancia de autenticación de Firebase
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Iniciar sesión con Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado:", user);

      // Redirigir al home o al panel del usuario después del login
      navigate("/home"); // Cambia la ruta según necesites
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión con Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;
