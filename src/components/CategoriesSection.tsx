import categoryMen from "@/assets/category-men.jpg";
import categoryBoys from "@/assets/category-boys.jpg";
import categoryKids from "@/assets/category-kids.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Men",
    image: categoryMen,
    description: "Premium formal & casual wear",
    route: "/mens"
  },
  {
    title: "Boys",
    image: categoryBoys,
    description: "Trendy styles for young gentlemen",
    route: "/kids"
  },
  {
    title: "Kids",
    image: categoryKids,
    description: "Comfortable & stylish clothing",
    route: "/kids"
  },
  {
    title: "Accessories",
    image: categoryAccessories,
    description: "Complete your perfect look",
    route: "/accessories"
  }
];


const CategoriesSection = () => {
  const navigate = useNavigate();
  
  return (
    <section
      id="categories"
      className="py-16 sm:py-20 bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-luxury mb-4">
            Shop by Category
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card group h-64 sm:h-80 cursor-pointer"
              onClick={() => navigate(category.route)}
              
            >

              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="category-overlay"></div>

              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold heading-luxury mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  {category.description}
                </p>
                <button className="w-fit bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-medium text-sm">
                  Browse Collection
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
