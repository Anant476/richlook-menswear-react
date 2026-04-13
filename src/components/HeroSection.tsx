import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const WHATSAPP_NUMBER = "919960761173"; // replace later

const HeroSection = () => {
  const scrollToCategories = () => {
    const section = document.getElementById("categories");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi, I want to explore your collection at Rich Look Mens Wear."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section className="relative h-[55vh] sm:h-[70vh] min-h-[480px] sm:min-h-[600px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Rich Look Menswear Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl text-white">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold heading-luxury mb-4 leading-tight">
          Elevate Your Style
          <span className="block bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
          with Rich Look
          </span>
          </h1>

          <p className="text-base sm:text-xl mb-6 text-white/90">
              Premium mens & kids wear for everyday style and special occasions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="btn-gold text-base px-6 py-4 h-auto"
              onClick={scrollToCategories}
            >
              Shop Now
            </Button>

            <Button
              variant="outline"
              className="btn-outline-gold text-base px-6 py-4 h-auto bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary"
              onClick={openWhatsApp}
            >
              View Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
