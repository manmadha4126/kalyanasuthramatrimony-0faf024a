import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer style={{ background: "hsl(var(--royal-black))", borderTop: "1px solid hsl(var(--gold)/0.15)" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold gold-text mb-3">Kalyanasuthra Matrimony</h3>
            <p className="text-sm" style={{ color: "hsl(var(--cream)/0.6)" }}>
              The Wedding Chapter Starts here… Trusted matchmaking since 2020.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-3" style={{ color: "hsl(var(--cream))" }}>Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm transition-colors" style={{ color: "hsl(var(--cream)/0.6)" }}>
                  {l}
                </a>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-3" style={{ color: "hsl(var(--cream))" }}>Contact</h4>
            <div className="space-y-2 text-sm" style={{ color: "hsl(var(--cream)/0.6)" }}>
              <p>📞 9553306667</p>
              <p>📞 9866288767</p>
              <p>✉️ kalyanasuthra@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="ornament-line mb-6" />
        <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "hsl(var(--cream)/0.4)" }}>
          © 2025 Kalyanasuthra Matrimony. Made with <Heart size={12} style={{ color: "hsl(var(--burgundy-light))" }} /> in Tirupati
        </p>
      </div>
    </footer>
  );
};

export default Footer;
