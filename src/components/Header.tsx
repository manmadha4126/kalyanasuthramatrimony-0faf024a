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
      className={`fixed top-0 left-0 right-0 z-50 bg-card transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ height: "80px" }}
    >
      <div className="container mx-auto h-full flex items-center px-4 relative">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="Kalyanasuthra Matrimony" className="h-14 w-auto object-contain" />
          <span className="font-serif text-lg font-semibold text-primary hidden sm:inline">
            Kalyanasuthra Matrimony
          </span>
        </a>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link-premium font-bold text-base px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <a href="/register" className="text-sm px-5 py-2.5 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: "linear-gradient(135deg, hsl(348, 60%, 38%), hsl(348, 50%, 28%))" }}>Register</a>
          <a href="/login" className="text-sm px-5 py-2.5 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-md" style={{ background: "hsl(42, 50%, 90%)", color: "hsl(42, 50%, 30%)" }}>Login</a>
          <a href="/admin" className="text-sm px-5 py-2.5 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-md" style={{ background: "hsl(220, 45%, 92%)", color: "hsl(220, 45%, 30%)" }}>Admin</a>
        </div>

        {/* Mobile */}
        <button className="lg:hidden p-2 text-primary ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
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
              <a href="/register" className="btn-burgundy text-xs mt-2" onClick={() => setMobileOpen(false)}>Register</a>
              <a href="/login" className="text-xs font-semibold" style={{ color: "hsl(var(--burgundy))" }} onClick={() => setMobileOpen(false)}>Login</a>
              <a href="/admin" className="text-xs font-semibold text-gray-500" onClick={() => setMobileOpen(false)}>Admin</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
