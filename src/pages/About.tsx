import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Sobre Nosotros</h1>
          
          <div className="prose prose-lg">
            <p className="mb-6">
              Bienvenidos a SandwichShop, donde la pasión por los sándwiches se encuentra con la calidad y el sabor. Desde 2015, nos hemos dedicado a crear las combinaciones más deliciosas y memorables para nuestros clientes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Historia</h2>
            <p className="mb-6">
              Todo comenzó con una simple idea: ofrecer sándwiches artesanales de la más alta calidad, utilizando ingredientes frescos y locales. Lo que empezó como un pequeño local se ha convertido en un destino favorito para los amantes de la buena comida.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestro Compromiso</h2>
            <p className="mb-6">
              Nos comprometemos a:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Utilizar ingredientes frescos y de la mejor calidad</li>
              <li>Preparar cada sándwich al momento</li>
              <li>Ofrecer opciones para todas las preferencias dietéticas</li>
              <li>Mantener un servicio excepcional</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestro Equipo</h2>
            <p className="mb-6">
              Nuestro equipo está formado por apasionados de la gastronomía que comparten nuestra visión de excelencia y servicio. Cada miembro aporta su creatividad y dedicación para asegurar que cada sándwich sea una obra maestra.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;