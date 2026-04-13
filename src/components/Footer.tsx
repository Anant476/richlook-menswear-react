import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold heading-luxury bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              Rich Look Menswear
            </h3>

            <p className="text-white/80 text-sm leading-relaxed">
              Elevating men's fashion with premium clothing & accessories.
            </p>

            <div className="flex space-x-4">
              <a className="icon-btn"><Facebook /></a>
              <a className="icon-btn"><Instagram /></a>
              <a className="icon-btn"><Twitter /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["New Arrivals", "Best Sellers", "Sale"].map((item) => (
                <li key={item}>
                  <a className="footer-link">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              {["Shirts", "T-Shirts", "Pants", "Accessories"].map((item) => (
                <li key={item}>
                  <a className="footer-link">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="text-accent h-4 w-4" />
                <span className="text-white/80">+91 9960761173</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="text-accent h-4 w-4" />
                <span className="text-white/80 break-all">
                  info@richlookmenswear.com
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="text-accent h-4 w-4" />
                <span className="text-white/80">
                  Mumbai, Maharashtra
                </span>
              </div>
            </div>

            {/* ✅ FIXED SUBSCRIBE */}
            <div className="mt-4">
              <p className="text-sm text-white/80 mb-2">
                Subscribe to our newsletter
              </p>

              <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <button className="w-full sm:w-auto px-4 py-2 bg-accent text-primary rounded-lg font-semibold hover:bg-accent/90">
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center md:flex md:justify-between md:items-center">
          
          <p className="text-white/60 text-xs">
            © 2024 Rich Look Menswear. All rights reserved.
          </p>

          <div className="flex justify-center md:justify-end gap-4 mt-3 md:mt-0 text-xs">
            <a className="footer-link">Privacy Policy</a>
            <a className="footer-link">Terms</a>
            <a className="footer-link">Returns</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;