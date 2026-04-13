import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold heading-luxury bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">
              Rich Look Menswear
            </h3>
            <p className="text-white/80 leading-relaxed">
              Elevating men's fashion with premium quality clothing and accessories. 
              Defining sophistication since day one.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold heading-luxury">Quick Links</h4>
            <ul className="space-y-3">
              {['New Arrivals', 'Best Sellers', 'Sale', 'Size Guide', 'Style Guide', 'Care Instructions'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-accent transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold heading-luxury">Categories</h4>
            <ul className="space-y-3">
              {['Shirts', 'T-Shirts', 'Pants', 'Joggers', 'Accessories', 'Footwear'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-white/80 hover:text-accent transition-colors duration-300">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold heading-luxury">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-white/80">+91 9960761173</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-white/80">info@richlookmenswear.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-white/80">Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-white/80 mb-3">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-white/60"
                />
                <button className="bg-accent text-primary px-6 py-2 rounded-r-lg hover:bg-accent/90 transition-colors duration-300 font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 Rich Look Menswear. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
              Return Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;