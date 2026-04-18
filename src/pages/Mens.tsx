import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/whatsapp.ts";
import { mensProducts } from "@/data/mensProducts";
import CategoryHero from "@/components/CategoryHero";
import mensHero from "@/assets/mens-hero.jpg";

const categories = [
  "All",
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Cargos",
  "Pants",
  "Kurtas"
];

const Mens = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // FILTER
  const filteredProducts =
    activeCategory === "All"
      ? mensProducts
      : mensProducts.filter(p => p.category === activeCategory);

  // SEARCH
  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SORT
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    const priceA = parseInt(a.price.replace("₹", "").replace(",", ""));
    const priceB = parseInt(b.price.replace("₹", "").replace(",", ""));

    if (sortBy === "low-high") return priceA - priceB;
    if (sortBy === "high-low") return priceB - priceA;

    return b.rating - a.rating;
  });

  // SIZE LOGIC
  const getSizesForCategory = (category: string) => {
    if (["Shirts", "T-Shirts", "Kurtas"].includes(category)) {
      return ["S", "M", "L", "XL"];
    }
    if (["Pants", "Jeans", "Cargos"].includes(category)) {
      return ["28", "30", "32", "34"];
    }
    return [];
  };

  // WHATSAPP ORDER
  const orderOnWhatsApp = (product: any) => {
    const selectedSize = selectedSizes[product.id];

    if (!selectedSize) {
      alert("Please select a size before ordering.");
      return;
    }

    const message = encodeURIComponent(
`🛍️ *Rich Look Menswear Order*

👔 Product: ${product.name}
📏 Size: ${selectedSize}
💰 Price: ${product.price}

🚚 Please confirm:
• Availability
• Delivery time
• Payment options

✨ Thank you!`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  // DISCOUNT
  const getDiscountPercent = (price: string, originalPrice?: string) => {
    if (!originalPrice) return null;

    const p = parseInt(price.replace("₹", "").replace(",", ""));
    const op = parseInt(originalPrice.replace("₹", "").replace(",", ""));

    const discount = Math.round(((op - p) / op) * 100);
    return discount > 0 ? `${discount}% OFF` : null;
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <CategoryHero
        title="Mens Collection"
        subtitle="Sharp. Confident. Timeless styles for modern men."
        backgroundImage={mensHero}
      />

      {/* CART BUTTON */}
      <div className="px-4 flex justify-end mt-4">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          🛒 Cart ({cart.length})
        </button>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 overflow-x-auto px-4 py-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "hover:bg-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SORT + SEARCH */}
      <div className="flex justify-between px-4 mb-4">
        <p className="text-sm">{sortedProducts.length} Products</p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="popular">Popular</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      <div className="px-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {sortedProducts.map(product => (
          <div
            key={product.id}
            className="product-card cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} className="w-full h-56 object-cover" />

            <div className="p-4 space-y-2">
              <h3>{product.name}</h3>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                {product.rating}
              </div>

              <p className="font-bold">{product.price}</p>

              {/* SIZE */}
              <div className="flex gap-2 flex-wrap">
                {getSizesForCategory(product.category).map(size => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSizes({
                        ...selectedSizes,
                        [product.id]: size
                      });
                    }}
                    className="border px-2 py-1 rounded"
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* ORDER */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  orderOnWhatsApp(product);
                }}
              >
                Order
              </Button>

              {/* ADD CART */}
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();

                  const size = selectedSizes[product.id];
                  if (!size) return alert("Select size");

                  setCart(prev => [...prev, { ...product, size }]);
                  setIsCartOpen(true);
                }}
              >
                Add to Cart
              </Button>

            </div>
          </div>
        ))}
      </div>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-80 bg-white p-4">
            <h2 className="font-bold mb-4">Cart</h2>

            {cart.map((item, i) => (
              <div key={i} className="mb-2">
                {item.name} ({item.size})
              </div>
            ))}

            <Button
              className="w-full mt-4"
              onClick={() => {
                const msg = encodeURIComponent(
                  cart.map(i => `${i.name} (${i.size})`).join("\n")
                );
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`);
              }}
            >
              Order All
            </Button>
          </div>
        </div>
      )}

      {/* PRODUCT POPUP */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white p-4 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedProduct.image} />
            <h2>{selectedProduct.name}</h2>
            <Button onClick={() => orderOnWhatsApp(selectedProduct)}>
              Order
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Mens;