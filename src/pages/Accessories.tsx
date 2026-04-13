import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/whatsapp";
import { accessoriesProducts } from "@/data/accessoriesProducts";
import CategoryHero from "@/components/CategoryHero";
import accessoriesHero from "@/assets/accessories-hero.png";

const categories = [
  "All",
  "Goggles",
  "Belts",
  "Perfumes",
  "Bracelets",
  "Kadas"
];

const Accessories = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered =
    activeCategory === "All"
      ? accessoriesProducts
      : accessoriesProducts.filter(p => p.category === activeCategory);

  const searched = filtered.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...searched].sort((a, b) => {
    const priceA = parseInt(a.price.replace("₹", ""));
    const priceB = parseInt(b.price.replace("₹", ""));

    if (sortBy === "low-high") return priceA - priceB;
    if (sortBy === "high-low") return priceB - priceA;

    return b.rating - a.rating;
  });

  const orderOnWhatsApp = (product: any) => {
    const message = encodeURIComponent(
      `Hi 👋 I want to order this accessory from Rich Look Mens Wear:\n\n` +
      `🧢 Product: ${product.name}\n` +
      `💰 Price: ${product.price}\n\n` +
      `Please confirm availability.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const getDiscountPercent = (price: string, originalPrice?: string) => {
    if (!originalPrice) return null;
    const p = parseInt(price.replace("₹", ""));
    const op = parseInt(originalPrice.replace("₹", ""));
    return `${Math.round(((op - p) / op) * 100)}% OFF`;
  };

  return (
    <div className="min-h-screen bg-background">
      <CategoryHero
  title="Accessories"
  subtitle="Finish your look with belts, perfumes, goggles & statement pieces."
  backgroundImage={accessoriesHero}
/>


      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-background"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search + Sort */}
      <div className="flex justify-between items-center px-4 mb-4">
        <input
          placeholder="Search accessories..."
          className="border rounded-lg px-4 py-2 text-sm w-full mr-2"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {sorted.map(product => (
          <div key={product.id} className="product-card relative">
            {product.badge && (
              <span className="absolute top-3 left-3 bg-red text-white text-xs px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}

            {product.originalPrice && (
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                {getDiscountPercent(product.price, product.originalPrice)}
              </span>
            )}

            <img src={product.image} className="w-full h-56 object-cover" />

            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{product.name}</h3>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-sm">{product.rating}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-bold">{product.price}</span>
                {product.originalPrice && (
                  <span className="line-through text-sm text-muted-foreground">
                    {product.originalPrice}
                  </span>
                )}
              </div>

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
    </div>
  );
};

export default Accessories;
