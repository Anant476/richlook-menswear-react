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

  // DISCOUNT %
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

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 overflow-x-auto px-4 py-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-background text-foreground hover:bg-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SORT + COUNT */}
      <div className="flex justify-between items-center px-4 mb-4">
        <p className="text-sm text-muted-foreground">
          {sortedProducts.length} Products
        </p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-background"
        >
          <option value="popular">Sort: Popular</option>
          <option value="low-high">Price ↑</option>
          <option value="high-low">Price ↓</option>
        </select>
      </div>

      {/* SEARCH */}
      <div className="px-4 mb-6">
        <input
          type="text"
          placeholder="Search shirts, t-shirts, cargos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {sortedProducts.map(product => (
          <div
  key={product.id}
  className="product-card relative cursor-pointer"
  onClick={() => setSelectedProduct(product)}
>

            {/* BADGES */}
            {product.badge && (
              <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}

            {product.originalPrice && (
              <span className="absolute top-3 right-3 z-10 bg-green-600 text-white text-xs px-2 py-1 rounded">
                {getDiscountPercent(product.price, product.originalPrice)}
              </span>
            )}

            {/* IMAGE */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4 space-y-2">

              {/* NAME */}
              <h3 className="font-semibold">{product.name}</h3>

              {/* RATING */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-sm">{product.rating}</span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  {product.price}
                </span>

                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* 🔥 SELLING TRIGGER */}
              <p className="text-xs text-green-500 font-medium">
                🔥 Selling Fast
              </p>

              {/* SIZE */}
              <div className="flex gap-2 flex-wrap">
                {getSizesForCategory(product.category).map(size => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSizes({
                        ...selectedSizes,
                        [product.id]: size
                      })
                    }
                    className={`px-3 py-1.5 border rounded-md text-sm font-medium ${
                      selectedSizes[product.id] === size
                        ? "bg-primary text-white"
                        : "bg-background text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* BUTTON */}
              <Button
  className="w-full btn-primary hover:scale-105 transition-transform"
  onClick={(e) => {
    e.stopPropagation();
    orderOnWhatsApp(product);
  }}
>
                🛒 Order Now
              </Button>

            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
  <div
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
    onClick={() => setSelectedProduct(null)}
  >
    <div
      className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >

      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* LEFT: IMAGE */}
        <div className="bg-gray-100">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-72 md:h-full object-cover"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="p-6 flex flex-col justify-between">

          {/* TOP */}
          <div>

            <h2 className="text-xl font-bold mb-2">
              {selectedProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm">{selectedProduct.rating}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">
                {selectedProduct.price}
              </span>

              {selectedProduct.originalPrice && (
                <span className="text-sm line-through text-gray-400">
                  {selectedProduct.originalPrice}
                </span>
              )}
            </div>

            {/* Selling trigger */}
            <p className="text-sm text-green-600 font-medium mb-4">
              🔥 Limited Stock Available
            </p>

            {/* Sizes */}
            <p className="text-sm font-medium mb-2">Select Size</p>

            <div className="flex gap-2 flex-wrap mb-6">
              {getSizesForCategory(selectedProduct.category).map(size => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSizes({
                      ...selectedSizes,
                      [selectedProduct.id]: size
                    })
                  }
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                    selectedSizes[selectedProduct.id] === size
                      ? "bg-primary text-white"
                      : "hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

          </div>

          {/* BOTTOM BUTTON */}
          <Button
            className="w-full btn-primary text-base py-3 hover:scale-105 transition"
            onClick={() => orderOnWhatsApp(selectedProduct)}
          >
            🛒 Order on WhatsApp
          </Button>

        </div>
      </div>

      {/* CLOSE BUTTON */}
      <button
        className="absolute top-3 right-4 text-white text-2xl"
        onClick={() => setSelectedProduct(null)}
      >
        ✕
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default Mens;