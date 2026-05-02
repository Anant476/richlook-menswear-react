// SAME IMPORTS (no change)
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/whatsapp.ts";
import { mensProducts } from "@/data/mensProducts";

const categories = ["All","T-Shirts","Shirts","Jeans","Cargos","Pants","Kurtas"];

const Mens = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<Record<number,string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string|null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // scroll lock
  useEffect(()=>{
    document.body.style.overflow = selectedProduct ? "hidden" : "auto";
  },[selectedProduct]);

  // ESC
  useEffect(()=>{
    const esc=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){
        setSelectedProduct(null);
        setIsFullscreen(false);
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown",esc);
    return()=>window.removeEventListener("keydown",esc);
  },[]);

  // swipe
  let startX=0;
  const handleTouchStart=(e:any)=>startX=e.touches[0].clientX;
  const handleTouchEnd=(e:any)=>{
    if(!selectedProduct) return;
    const imgs = selectedProduct.images?.length ? selectedProduct.images : [selectedProduct.image];
    const endX=e.changedTouches[0].clientX;

    if(startX-endX>50) setImageIndex(p=>p===imgs.length-1?0:p+1);
    if(endX-startX>50) setImageIndex(p=>p===0?imgs.length-1:p-1);
  };

  // filter + search
  const products = mensProducts
    .filter(p=>activeCategory==="All"||p.category===activeCategory)
    .filter(p=>p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sizes=(cat:string)=>
    ["Shirts","T-Shirts","Kurtas"].includes(cat)
      ?["S","M","L","XL"]
      :["28","30","32","34"];

  const order = (p:any) => {
    if (!p) return;
    const size = selectedSizes[p.id];
    if(!size) {
      alert("Please select a size first");
      return;
    }
    const message = encodeURIComponent(
      `🛍️ *New Order - Rich Look Menswear*\n\n` +
      `👔 *Product:* ${p.name}\n` +
      `📏 *Size:* ${size}\n` +
      `💰 *Price:* ${p.price}\n\n` +
      `📦 Please confirm availability.\n` +
      `🚚 Also share delivery details.`
    ); 
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold">Mens Collection</h1>
        <p className="text-muted-foreground">Premium wear</p>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 px-4 overflow-x-auto pb-4">
        {categories.map(c=>(
          <button key={c}
            onClick={()=>setActiveCategory(c)}
            className={`px-4 py-2 rounded-full border ${
              activeCategory===c?"bg-black text-white":""
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="px-4 mb-4">
        <input
          placeholder="Search..."
          value={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {products.map(p=>{
          const imgs=p.images?.length?p.images:[p.image];
          return(
          <div key={p.id}
            onClick={()=>{setSelectedProduct(p);setActiveImage(imgs[0]);setImageIndex(0);}}
            className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer">

            <img src={p.image} className="h-56 w-full object-cover"/>

            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                {p.rating}
              </div>

              <div className="flex gap-2 mt-2">
                <span className="font-bold">{p.price}</span>
                <span className="line-through text-sm">{p.originalPrice}</span>
              </div>

              {/* sizes */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {sizes(p.category).map(s=>(
                  <button 
                    key={s}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSizes(prev => ({
                        ...prev,
                        [p.id]: s
                      }));
                    }}
                    className={`px-3 py-1 border rounded transition ${
                      selectedSizes[p.id] === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <Button className="w-full mt-3"
                onClick={(e)=>{e.stopPropagation();order(p);}}>
                Order on WhatsApp
              </Button>
            </div>
          </div>
        )})}
      </div>

      {/* PREMIUM POPUP */}
      {selectedProduct && (() => {
        const imgs = selectedProduct.images?.length ? selectedProduct.images : [selectedProduct.image];

        return (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
            onClick={()=>setSelectedProduct(null)}>

            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 relative"
              onClick={(e)=>e.stopPropagation()}>
              
              <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-50 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-xl hover:scale-110 transition"
              >
                ✕
              </button>

              {/* LEFT IMAGE */}
              <div className="bg-gray-100 p-4">
                <img
                  src={activeImage || imgs[0]}
                  onClick={()=>setIsFullscreen(true)}
                  className="w-full h-80 object-cover rounded-xl cursor-zoom-in"
                />

                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {imgs.map((img,i)=>(
                    <img key={i}
                      src={img}
                      onClick={()=>{setActiveImage(img);setImageIndex(i);}}
                      className="w-16 h-16 object-cover rounded border cursor-pointer"/>
                  ))}
                </div>
              </div>

              {/* RIGHT DETAILS */}
              <div className="p-6 flex flex-col gap-4">

                <div>
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>

                  <div className="flex items-center gap-2 mt-2">
                    ⭐ {selectedProduct.rating}
                  </div>

                  <div className="flex gap-3 mt-3">
                    <span className="text-xl font-bold">{selectedProduct.price}</span>
                    <span className="line-through text-gray-400">{selectedProduct.originalPrice}</span>
                  </div>

                  <p className="text-green-600 mt-3">🔥 Limited stock</p>

                  {/* size */}
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {sizes(selectedProduct.category).map(s=>(
                      <button 
                        key={s}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSizes(prev => ({
                            ...prev,
                            [selectedProduct.id]: s
                          }));
                        }}
                        className={`px-4 py-2 border rounded transition ${
                          selectedSizes[selectedProduct.id] === s
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-gray-300"
                          }`}
                        >
                          {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-4">
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      order(selectedProduct);
                    }}
                  > 
                    Order on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* FULLSCREEN */}
      {isFullscreen && selectedProduct && (() => {
        const imgs = selectedProduct.images?.length ? selectedProduct.images : [selectedProduct.image];

        return (
          <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>

            <button className="absolute top-4 right-4 text-white text-3xl"
              onClick={()=>setIsFullscreen(false)}>✕</button>

            <img src={imgs[imageIndex]} className="max-h-[90vh] max-w-[95vw]"/>
          </div>
        );
      })()}

    </div>
  );
};

export default Mens;