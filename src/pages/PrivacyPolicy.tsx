import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-primary" size={32} />
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Privacy Policy</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 19, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect personal information that you voluntarily provide when registering on our platform, including but not limited to: full name, date of birth, gender, contact information (phone, email, WhatsApp), photographs, educational qualifications, occupation details, family information, religious preferences, and horoscope details. This information is essential for providing our matrimony matchmaking services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To create and manage your matrimonial profile</li>
              <li>To match you with compatible profiles based on your preferences</li>
              <li>To communicate with you regarding your account, matches, and services</li>
              <li>To verify your identity and prevent fraudulent activity</li>
              <li>To improve our services and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">3. Data Protection & Encryption</h2>
            <p className="text-muted-foreground leading-relaxed">
              All data transmitted between your browser and our servers is encrypted using TLS/SSL encryption. Your passwords are hashed using industry-standard algorithms and are never stored in plain text. We implement row-level security policies to ensure users can only access data they are authorized to view.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">4. Data Sharing & Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. Your profile information is shared only with other registered members for matchmaking purposes. Sensitive contact details (phone, email, WhatsApp) are only visible to members with an active assisted subscription.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data for as long as your account is active or as needed to provide our services. You may request deletion of your account and associated data at any time by contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">6. Your Rights</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Access:</strong> You can request a copy of your personal data</li>
              <li><strong>Correction:</strong> You can update or correct your profile information</li>
              <li><strong>Deletion:</strong> You can request deletion of your account</li>
              <li><strong>Restriction:</strong> You can request limiting the processing of your data</li>
              <li><strong>Portability:</strong> You can request your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies for authentication and session management. No third-party tracking cookies are used without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any privacy-related questions or requests, please contact us at:<br />
              📧 info@kalyanasuthra.com<br />
              📞 9553306667 / 9866288767<br />
              📍 4-23, Govinda Nagar, Karakambadi Road, Tirupati - 517501
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
