import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Kalyanasuthra Matrimony</h3>
            <p className="text-sm text-muted-foreground">The Wedding Chapter Starts Here… Trusted matchmaking since 2020.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Contact</h4>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p>📞 9553306667</p>
              <p>📞 9866288767</p>
              <p>✉️ kalyanasuthra@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="gold-divider mb-4" />
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
          © 2025 Kalyanasuthra Matrimony. Made with <Heart size={12} className="text-primary" /> in Tirupati
        </p>
      </div>
    </footer>
  );
};

export default Footer;
