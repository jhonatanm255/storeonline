import React, { useState } from "react";
import { ShoppingCart, Menu as MenuIcon, X, User } from "lucide-react"; // Íconos necesarios
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext"; // Administrador (Supabase)
import { useClientAuth } from "@/contexts/ClientAuthContext"; // Clientes (Firebase)

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú desplegable
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Controlar el desplegable del usuario
  const navigate = useNavigate();
  const { items } = useCart();
  const { user: adminUser, signOut: adminSignOut } = useAuth(); // Admin auth
  const { user: clientUser, signInWithGoogle, signOutUser } = useClientAuth(); // Cliente auth
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignOut = async () => {
    if (clientUser) {
      await signOutUser();
    } else if (adminUser) {
      await adminSignOut();
    }
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen); // Abrir o cerrar el menú del usuario
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span
              className="text-2xl font-bold text-primary cursor-pointer"
              onClick={() => navigate("/")}
            >
              SandwichShop
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Inicio
            </Button>
            <Button variant="ghost" onClick={() => navigate("/menu")}>
              Menú
            </Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>
              Sobre Nosotros
            </Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>
              Contacto
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {/* Mostrar el carrito de compras y la foto del usuario */}
            {clientUser || adminUser ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/cart")}
                  className="relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-0 -right-0 bg-orange-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                </Button>

                {/* Foto de perfil o avatar */}
                <div className="relative">
                  {clientUser || adminUser ? (
                    <img
                      src={
                        clientUser?.photoURL ||
                        adminUser?.user_metadata?.avatar_url
                      } // Foto de perfil de Google Auth o Supabase
                      alt="Perfil"
                      className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={handleUserMenuToggle} // Al hacer clic en la foto, se despliega el menú
                    />
                  ) : (
                    <User
                      className="h-8 w-8 text-gray-600 cursor-pointer"
                      onClick={handleUserMenuToggle}
                    />
                  )}
                  {/* Menú desplegable del usuario */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                      <div className="text-sm text-gray-700">
                        <div className="font-semibold">
                          {clientUser?.displayName ||
                            adminUser?.user_metadata?.full_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {clientUser?.email || adminUser?.email}
                        </div>
                        <hr className="my-2" />
                        {/* Otros items del menú */}
                        <Button
                          variant="ghost"
                          onClick={() => navigate("/profile")}
                        >
                          Mi perfil
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => navigate("/orders")}
                        >
                          Mis pedidos
                        </Button>
                        <hr className="my-2" />
                        {/* Botón de cerrar sesión */}
                        <button
                          className="w-full text-sm text-white bg-red-600 py-2 px-4 rounded-full"
                          onClick={handleSignOut}
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}

            <div>
              {/* Solo mostrar el botón de login en resoluciones medianas y grandes */}
              {!clientUser && !adminUser && (
                <button
                  className="flex text-sm text-white py-2 px-4 rounded-full shadow-lg bg-orange-600"
                  onClick={signInWithGoogle}
                >
                  Inicia sesión
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mostrar foto de perfil y carrito de compras en la barra de navegación en resoluciones pequeñas si el usuario está autenticado */}
            {clientUser || adminUser ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/cart")}
                  className="relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-0 -right-0 bg-orange-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                </Button>

                {/* Foto de perfil o avatar en versión móvil */}
                <div className="relative">
                  {clientUser || adminUser ? (
                    <img
                      src={
                        clientUser?.photoURL ||
                        adminUser?.user_metadata?.avatar_url
                      } // Foto de perfil
                      alt="Perfil"
                      className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={handleUserMenuToggle} // Al hacer clic en la foto, se despliega el menú
                    />
                  ) : (
                    <User
                      className="h-8 w-8 text-gray-600 cursor-pointer"
                      onClick={handleUserMenuToggle}
                    />
                  )}
                  {/* Menú desplegable del usuario en versión móvil */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                      <div className="text-sm text-gray-700">
                        <div className="font-semibold">
                          {clientUser?.displayName ||
                            adminUser?.user_metadata?.full_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {clientUser?.email || adminUser?.email}
                        </div>
                        <hr className="my-2" />
                        {/* Otros items del menú */}
                        <Button
                          variant="ghost"
                          onClick={() => navigate("/profile")}
                        >
                          Mi perfil
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => navigate("/orders")}
                        >
                          Mis pedidos
                        </Button>
                        <hr className="my-2" />
                        {/* Botón de cerrar sesión */}
                        <button
                          className="w-full text-sm text-white bg-red-600 py-2 px-4 rounded-full"
                          onClick={handleSignOut}
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}

            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <MenuIcon className="h-8 w-8" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            Inicio
          </Button>
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => {
              navigate("/menu");
              setIsMenuOpen(false);
            }}
          >
            Menú
          </Button>
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => {
              navigate("/about");
              setIsMenuOpen(false);
            }}
          >
            Sobre Nosotros
          </Button>
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => {
              navigate("/contact");
              setIsMenuOpen(false);
            }}
          >
            Contacto
          </Button>
          <div>
            {/* Solo mostrar el botón de login en resoluciones medianas y grandes */}
            {!clientUser && !adminUser && (
              <button
                className="w-full flex justify-center m-auto text-sm text-white py-2 px-4 rounded-full shadow-lg bg-orange-600"
                onClick={signInWithGoogle}
              >
                Inicia sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};







