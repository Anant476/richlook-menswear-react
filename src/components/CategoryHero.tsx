type CategoryHeroProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
};

const CategoryHero = ({ title, subtitle, backgroundImage }: CategoryHeroProps) => {
  return (
    <section className="relative h-[40vh] min-h-[320px] flex items-center">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-luxury mb-3">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default CategoryHero;
