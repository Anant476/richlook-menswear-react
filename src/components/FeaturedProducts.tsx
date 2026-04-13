import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import productDressShirt from "@/assets/product-dress-shirt.jpg";
import productOversizedTee from "@/assets/product-oversized-tee.jpg";
import productChinoPants from "@/assets/product-chino-pants.jpg";
import productCargoPants from "@/assets/product-cargo-pants.jpg";

const WHATSAPP_NUMBER = "919960761173"; // replace later

const featuredProducts = [
  {
    id: 1,
    name: "Premium Navy Dress Shirt",
    price: "₹2,999",
    originalPrice: "₹3,999",
    image: productDressShirt,
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Oversized Black T-Shirt",
    price: "₹1,299",
    originalPrice: "₹1,799",
    image: productOversizedTee,
    rating: 4.6,
    reviews: 89,
    badge: "Trending"
  },
  {
    id: 3,
    name: "Premium Chino Pants",
    price: "₹2,499",
    originalPrice: "₹3,299",
    image: productChinoPants,
    rating: 4.7,
    reviews: 156,
    badge: "New"
  },
  {
    id: 4,
    name: "Cargo Utility Pants",
    price: "₹2,799",
    originalPrice: "₹3,699",
    image: productCargoPants,
    rating: 4.5,
    reviews: 93,
    badge: "Limited"
  }
];

const FeaturedProducts = () => {
  const orderOnWhatsApp = (product: any) => {
    const message = encodeURIComponent(
      `Hi, I want to order this product from Rich Look Mens Wear:\n\n` +
      `🧥 Product: ${product.name}\n` +
      `💰 Price: ${product.price}\n\n` +
      `Please share available sizes & details.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-luxury mb-4">
            🔥 Current Top Grossing in Mens
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our best-selling pieces that define modern menswear
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-red text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.badge}
                </span>
              </div>

              {/* Wishlist (future use) */}
              <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full">
                <Heart className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 sm:h-64 object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-accent fill-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold">{product.price}</span>
                  <span className="text-sm line-through text-muted-foreground">
                    {product.originalPrice}
                  </span>
                </div>

                {/* WhatsApp Order */}
                <Button
                  className="w-full btn-primary"
                  onClick={() => orderOnWhatsApp(product)}
                >
                  Order on WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button className="btn-outline-gold px-8 py-3">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
