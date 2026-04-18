import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/whatsapp.ts";
import { mensProducts } from "@/data/mensProducts";

const categories = ["All", "T-Shirts", "Shirts", "Jeans", "Cargos", "Pants"];

const Mens = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [activeCategory, setActiveCategory] = useState("All");

  // SIZE LOGIC
  const getSizes = (category: string) => {
    if (["Shirts", "T-Shirts"].includes(category)) return ["S", "M", "L", "XL"];
    return ["28", "30", "32", "34"];
  };

  // ADD TO CART
  const addToCart = (product: any) => {
    const size = selectedSizes[product.id];
    if (!size) return alert("Select size first");

    const exists = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, size, qty: 1 }]);
    }

    setIsCartOpen(true);
  };

  // REMOVE ITEM
  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);

    if (updated.length === 0) setIsCartOpen(false); // 🔥 FIX
  };

  // UPDATE QTY
  const updateQty = (index: number, type: "inc" | "dec") => {
    const updated = [...cart];

    if (type === "inc") updated[index].qty++;
    if (type === "dec") {
      if (updated[index].qty === 1) return removeItem(index);
      updated[index].qty--;
    }

    setCart(updated);
  };

  // FILTER
  const filtered =
    activeCategory === "All"
      ? mensProducts
      : mensProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background p-4">

      {/* CART BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          🛒 {cart.length}
        </button>
      </div>

      {/* CATEGORY */}
      <div className="flex gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3 py-1 border rounded ${
              activeCategory === c ? "bg-black text-white" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} className="h-40 w-full object-cover" />

            <div className="p-2">
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-sm">{product.price}</p>

              {/* SIZE SELECT */}
              <div className="flex gap-2 mt-2">
                {getSizes(product.category).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 IMPORTANT FIX
                      setSelectedSizes({
                        ...selectedSizes,
                        [product.id]: size,
                      });
                    }}
                    className={`px-2 py-1 border text-xs ${
                      selectedSizes[product.id] === size
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* ADD BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="mt-2 w-full bg-black text-white py-1 text-sm rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white p-4 w-80 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedProduct.image} className="mb-2" />
            <h2 className="font-bold">{selectedProduct.name}</h2>

            <div className="flex gap-2 my-2">
              {getSizes(selectedProduct.category).map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSizes({
                      ...selectedSizes,
                      [selectedProduct.id]: size,
                    })
                  }
                  className={`px-2 py-1 border ${
                    selectedSizes[selectedProduct.id] === size
                      ? "bg-black text-white"
                      : ""
                  }`}
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

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute right-0 top-0 w-80 h-full bg-white p-4 overflow-y-auto">
            <h2 className="font-bold mb-4">Your Cart</h2>

            {cart.length === 0 ? (
              <p>No items</p>
            ) : (
              cart.map((item, i) => (
                <div key={i} className="border-b pb-2 mb-2">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs">Size: {item.size}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQty(i, "dec")}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(i, "inc")}>+</button>
                  </div>

                  <button
                    onClick={() => removeItem(i)}
                    className="text-red-500 text-xs mt-1"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <Button
                className="w-full mt-4"
                onClick={() => {
                  const msg = encodeURIComponent(
                    cart
                      .map(
                        (i) =>
                          `${i.name} (${i.size}) x${i.qty} - ${i.price}`
                      )
                      .join("\n")
                  );
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`);
                }}
              >
                Order on WhatsApp
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mens;