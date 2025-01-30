import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const ProductCard = ({ id, name, description, price, image }: ProductCardProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-transform duration-200 hover:scale-105">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold mb-2">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-4">
          {description}
        </CardDescription>
        <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};