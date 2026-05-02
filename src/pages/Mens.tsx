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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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

Please confirm availability, sizes, and delivery details.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">

      {/* HEADER */}
      <div className="py-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight">
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
            className={`px-4 py-2 rounded-full text-sm border transition ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-background hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT COUNT */}
      <div className="flex justify-between items-center px-4 mb-4">
        <p className="text-sm text-muted-foreground">
          {searchedProducts.length} Products
        </p>
      </div>

      {/* SEARCH */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Search shirts, t-shirts, cargos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {searchedProducts.map(product => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="p-4">

              {/* NAME */}
              <h3 className="font-semibold mb-1">{product.name}</h3>

              {/* RATING */}
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
                    onClick={(e) => {
  e.stopPropagation();
  setSelectedSizes({
    ...selectedSizes,
    [product.id]: size
  });
}}
                    className={`px-3 py-1.5 border rounded-md text-sm font-medium transition-all ${
                      selectedSizes[product.id] === size
                        ? "bg-black text-white border-black"
                        : "hover:border-black hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* ORDER BUTTON */}
              <Button
                className="w-full bg-black text-white rounded-lg py-3 hover:scale-[1.02] transition-all"
                onClick={(e) => {
  e.stopPropagation();
  orderOnWhatsApp(product);
}}
              >
                Order on WhatsApp
              </Button>

            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {searchedProducts.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No products found.
        </div>
      )}

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

        {/* IMAGE */}
        <div className="bg-gray-100">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-72 md:h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="p-6 flex flex-col justify-between">

          <div>
            <h2 className="text-xl font-bold mb-2">
              {selectedProduct.name}
            </h2>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-500">★</span>
              <span className="text-sm">{selectedProduct.rating}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">
                {selectedProduct.price}
              </span>

              {selectedProduct.originalPrice && (
                <span className="line-through text-gray-400 text-sm">
                  {selectedProduct.originalPrice}
                </span>
              )}
            </div>

            <p className="text-sm text-green-600 mb-4">
              🔥 Limited Stock Available
            </p>

            {/* SIZE */}
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
                  className={`px-4 py-2 border rounded-md text-sm ${
                    selectedSizes[selectedProduct.id] === size
                      ? "bg-black text-white"
                      : "hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <Button
            className="w-full bg-black text-white py-3 rounded-lg"
            onClick={() => orderOnWhatsApp(selectedProduct)}
          >
            Order on WhatsApp
          </Button>

        </div>
      </div>

      {/* CLOSE */}
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