import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/kalyanasuthra-logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ height: "80px", background: "hsl(0, 0%, 0%)" }}
    >
      <div className="container mx-auto h-full flex items-center px-4 relative">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 ml-4 sm:ml-8">
          <img src={logo} alt="Kalyanasuthra Matrimony" className="h-14 w-auto object-contain" />
          <span className="text-xl sm:text-2xl font-bold tracking-wide" style={{
            fontFamily: "'Playfair Display', serif",
            color: "hsl(0, 0%, 100%)",
          }}>
            Kalyanasuthra Matrimony
          </span>
        </a>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-bold text-base px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:scale-105 hover:shadow-md"
              style={{ color: "hsl(0, 0%, 100%)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <a 
            href="/register" 
            className="text-sm px-5 py-2.5 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg" 
            style={{ background: "linear-gradient(135deg, hsl(160, 45%, 40%), hsl(160, 50%, 30%))" }}
          >
            Register
          </a>
          <a 
            href="/login" 
            className="text-sm px-5 py-2.5 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-md" 
            style={{ background: "linear-gradient(135deg, hsl(280, 55%, 50%), hsl(280, 60%, 40%))" }}
          >
            Login
          </a>
          <a 
            href="/admin" 
            className="text-sm px-5 py-2.5 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-md" 
            style={{ background: "linear-gradient(135deg, hsl(35, 85%, 55%), hsl(25, 90%, 45%))" }}
          >
            Admin
          </a>
        </div>

        {/* Mobile */}
        <button className="lg:hidden p-2 text-white ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <nav className="flex flex-col items-center py-4 gap-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="nav-link-premium" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <a 
                  href="/register" 
                  className="text-xs px-4 py-2 rounded-lg font-bold text-white" 
                  style={{ background: "linear-gradient(135deg, hsl(160, 45%, 40%), hsl(160, 50%, 30%))" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </a>
                <a 
                  href="/login" 
                  className="text-xs px-4 py-2 rounded-lg font-bold text-white" 
                  style={{ background: "linear-gradient(135deg, hsl(280, 55%, 50%), hsl(280, 60%, 40%))" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </a>
                <a 
                  href="/admin" 
                  className="text-xs px-4 py-2 rounded-lg font-bold text-white" 
                  style={{ background: "linear-gradient(135deg, hsl(35, 85%, 55%), hsl(25, 90%, 45%))" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;