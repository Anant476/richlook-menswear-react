import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/whatsapp.ts";
import { mensProducts } from "@/data/mensProducts";

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
  const [activeCategory, setActiveCategory] = useState("All");
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
      alert("Please select a size first.");
      return;
    }

    const message = encodeURIComponent(
`🛍️ *Rich Look Menswear Order*

👔 Product: ${product.name}
📏 Size: ${selectedSize}
💰 Price: ${product.price}

Please confirm availability and delivery.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <div className="py-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Mens Collection
        </h1>
        <p className="text-muted-foreground">
          Elevate your style with Rich Look
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-background"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Search shirts, t-shirts, cargos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {searchedProducts.map(product => (
          <div key={product.id} className="product-card">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold mb-1">{product.name}</h3>

              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">{product.rating}</span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold">
                  {product.price}
                </span>

                {product.originalPrice && (
                  <span className="text-sm line-through text-muted-foreground">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* SIZE SELECT */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {getSizesForCategory(product.category).map(size => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSizes({
                        ...selectedSizes,
                        [product.id]: size
                      })
                    }
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSizes[product.id] === size
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* ORDER BUTTON */}
              <Button
                className="w-full bg-black text-white"
                onClick={() => orderOnWhatsApp(product)}
              >
                Order on WhatsApp
              </Button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mens;