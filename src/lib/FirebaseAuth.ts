import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaCXYSlcP8snM1CL6KNb-Qu2mb2HpLTGw",
  authDomain: "store-sandwich.firebaseapp.com",
  projectId: "store-sandwich",
  storageBucket: "store-sandwich.firebasestorage.app",
  messagingSenderId: "783483031977",
  appId: "1:783483031977:web:b8fafddbcb82e78ecb34b8",
  measurementId: "G-YTBH9J12Z8",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Crear el objeto `auth` con getAuth
const auth = getAuth(app);

// Asegúrate de exportar correctamente `auth`
export { auth, app }; // Este es el punto clave
