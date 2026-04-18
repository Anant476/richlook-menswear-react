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
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // FILTER
  const filteredProducts =
    activeCategory === "All"
      ? mensProducts
      : mensProducts.filter(p => p.category === activeCategory);

  const searchedProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SIZE LOGIC
  const getSizesForCategory = (category: string) => {
    if (["Shirts", "T-Shirts", "Kurtas"].includes(category)) {
      return ["S", "M", "L", "XL"];
    }
    return ["28", "30", "32", "34"];
  };

  // ADD TO CART
  const addToCart = (product: any) => {
    const size = selectedSizes[product.id];
    if (!size) return alert("Select size");

    const existing = cart.find(
      item => item.id === product.id && item.size === size
    );

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, qty: 1 }]);
    }

    setIsCartOpen(true);
  };

  // REMOVE ITEM
  const removeItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // UPDATE QTY
  const updateQty = (index: number, type: "inc" | "dec") => {
    const updated = [...cart];

    if (type === "inc") updated[index].qty += 1;
    if (type === "dec") {
      if (updated[index].qty === 1) {
        removeItem(index);
        return;
      }
      updated[index].qty -= 1;
    }

    setCart(updated);
  };

  // WHATSAPP ORDER
  const orderAll = () => {
    const msg = encodeURIComponent(
      "🛍️ *Rich Look Order*\n\n" +
      cart.map(
        (i, idx) =>
          `${idx + 1}. ${i.name} (${i.size}) x${i.qty} - ${i.price}`
      ).join("\n")
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`);
  };

  return (
    <div className="min-h-screen bg-background">

      <CategoryHero
        title="Mens Collection"
        subtitle="Sharp. Confident. Timeless styles."
        backgroundImage={mensHero}
      />

      {/* CART BUTTON */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          🛒 {cart.length}
        </button>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 px-4 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="border px-3 py-1 rounded"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="p-4">
        <input
          placeholder="Search..."
          className="w-full border p-2 rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {searchedProducts.map(product => (
          <div
            key={product.id}
            className="border p-2 cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} />
            <p>{product.name}</p>
            <p>{product.price}</p>

            {/* SIZE FIX */}
            <div className="flex gap-2">
              {getSizesForCategory(product.category).map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 FIX
                    setSelectedSizes({
                      ...selectedSizes,
                      [product.id]: size
                    });
                  }}
                  className="border px-2"
                >
                  {size}
                </button>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white p-4 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedProduct.image} />
            <h2>{selectedProduct.name}</h2>

            <div className="flex gap-2">
              {getSizesForCategory(selectedProduct.category).map(size => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSizes({
                      ...selectedSizes,
                      [selectedProduct.id]: size
                    })
                  }
                  className="border px-2"
                >
                  {size}
                </button>
              ))}
            </div>

            <Button onClick={() => addToCart(selectedProduct)}>
              Add to Cart
            </Button>

          </div>
        </div>
      )}

      {/* CART */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40">
          <div className="absolute right-0 w-80 h-full bg-white p-4">

            <h2>Cart</h2>

            {cart.map((item, i) => (
              <div key={i} className="border-b mb-2 pb-2">
                <p>{item.name}</p>
                <p>Size: {item.size}</p>

                <div className="flex gap-2">
                  <button onClick={() => updateQty(i, "dec")}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(i, "inc")}>+</button>
                </div>

                <button onClick={() => removeItem(i)}>❌ Remove</button>
              </div>
            ))}

            <Button onClick={orderAll}>Order All</Button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Mens;