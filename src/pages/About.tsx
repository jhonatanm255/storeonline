import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Clock, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-accent rounded-lg">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Equipo Apasionado</h3>
              <p className="text-gray-600">
                Nuestro equipo está dedicado a crear las mejores experiencias culinarias.
              </p>
            </div>
            
            <div className="text-center p-6 bg-accent rounded-lg">
              <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Servicio Rápido</h3>
              <p className="text-gray-600">
                Entrega rápida y eficiente sin comprometer la calidad.
              </p>
            </div>
            
            <div className="text-center p-6 bg-accent rounded-lg">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">
                Ingredientes frescos y de la más alta calidad en cada sándwich.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
            <p className="mb-6">
              Desde 2015, SandwichShop ha estado sirviendo los mejores sándwiches artesanales en la ciudad. 
              Comenzamos con una simple idea: crear sándwiches excepcionales usando ingredientes frescos y de 
              alta calidad.
            </p>

            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="mb-6">
              Nuestra misión es ofrecer una experiencia culinaria única a través de sándwiches artesanales 
              preparados con pasión y los mejores ingredientes, brindando un servicio excepcional a 
              nuestros clientes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;