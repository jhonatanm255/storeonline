import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import sandwich from "@/components/assets/sandwich.png";


const featuredProducts = [
  {
    id: "1",
    name: "Classic Club",
    description: "Triple-decker with turkey, bacon, lettuce, and tomato",
    price: 12.99,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Veggie Delight",
    description: "Fresh vegetables with hummus and avocado spread",
    price: 10.99,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Italian Sub",
    description: "Salami, pepperoni, ham with Italian dressing",
    price: 13.99,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Chicken Pesto",
    description: "Grilled chicken with fresh pesto and mozzarella",
    price: 11.99,
    image: "/placeholder.svg",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        className="grid md:grid-cols-2 pt-12 bg-gradient-to-r from-red-500 to-orange-500 bg-hero-pattern bg-cover bg-center 
        bg-blend-overlay"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Delicious Sandwiches Made Fresh
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Handcrafted with premium ingredients for the perfect bite
            </p>
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full text-lg font-semibold shadow-xl">
              Order Now
            </button>
          </div>
        </div>
        <img
          className="flex lg:justify-center m-auto"
          src={sandwich}
          alt="foto-sandwich"
        />
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Sandwiches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Fresh Ingredients</h3>
              <p className="text-gray-600">
                We use only the freshest ingredients, sourced locally when
                possible.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Made to Order</h3>
              <p className="text-gray-600">
                Each sandwich is crafted fresh when you order.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;