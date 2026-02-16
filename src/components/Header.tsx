import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 bg-card transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ height: "80px" }}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--burgundy))" }}>
            <span className="font-serif text-lg font-bold text-primary-foreground">K</span>
          </div>
          <span className="font-serif text-lg font-semibold text-primary">
            Kalyanasuthra Matrimony
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link-premium font-bold text-base">
              {link.label}
            </a>
          ))}
          <div className="w-px h-6 mx-3" style={{ background: "hsl(var(--border))" }} />
          <a href="#register" className="btn-burgundy text-sm px-4 py-2">Register</a>
          <a href="#" className="text-sm px-4 py-2 rounded-lg font-semibold text-primary" style={{ background: "hsl(var(--burgundy-light))" }}>Admin Login</a>
          <a href="#" className="text-sm px-4 py-2 rounded-lg font-semibold text-primary" style={{ background: "hsl(var(--burgundy-light))" }}>Customer Login</a>
        </nav>

        {/* Mobile */}
        <button className="lg:hidden p-2 text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
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
              <a href="#register" className="btn-burgundy text-xs mt-2" onClick={() => setMobileOpen(false)}>Register</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
