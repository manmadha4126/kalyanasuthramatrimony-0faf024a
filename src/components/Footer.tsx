import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#0D1137" }}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">Kalyanasuthra Matrimony</h3>
            <p className="text-sm text-white/80">The Wedding Chapter Starts Here… Trusted matchmaking since 2020.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-3">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-white/80 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-3">Contact</h4>
            <div className="space-y-1.5 text-sm text-white/80">
              <p>📞 9553306667</p>
              <p>📞 9866288767</p>
              <p>✉️ info@kalyanasuthra.com</p>
              <p>📍 4-23, Govinda Nagar, Karakambadi Road, Tirupati - 517501</p>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full mb-4" style={{ background: "rgba(255,255,255,0.15)" }} />
        <p className="text-center text-sm text-white/90 flex items-center justify-center gap-1">
          © 2025 Kalyanasuthra Matrimony. Made with <Heart size={12} className="text-red-400" /> in Tirupati. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
