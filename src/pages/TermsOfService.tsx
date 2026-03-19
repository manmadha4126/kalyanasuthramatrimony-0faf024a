import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-primary" size={32} />
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Terms of Service</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 19, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Kalyanasuthra Matrimony ("the Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">2. Eligibility</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You must be at least 18 years of age (21 for male, 18 for female as per Indian law)</li>
              <li>You must be legally eligible for marriage under applicable laws</li>
              <li>You must provide truthful and accurate information</li>
              <li>Only one account per person is allowed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and truthful profile information</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Not share or misuse other members' personal information</li>
              <li>Not use the platform for any unlawful or fraudulent purpose</li>
              <li>Report any suspicious or inappropriate behavior</li>
              <li>Not upload offensive, obscene, or copyrighted content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">4. Profile Verification</h2>
            <p className="text-muted-foreground leading-relaxed">
              All profiles submitted to Kalyanasuthra Matrimony are reviewed by our admin team before activation. We reserve the right to reject, deactivate, or remove any profile that contains false information, inappropriate content, or violates our terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">5. Subscription & Payments</h2>
            <p className="text-muted-foreground leading-relaxed">
              Basic profile registration is free. Assisted subscription access for viewing contact details of other members is managed by our admin team. Subscription durations and fees are determined at the time of purchase and are non-refundable unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, logos, design elements, and branding on this platform are the intellectual property of Kalyanasuthra Matrimony. You may not copy, reproduce, or distribute any content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kalyanasuthra Matrimony acts as a platform to connect individuals for matrimonial purposes. We do not guarantee the accuracy of user-provided information, the success of any match, or the behavior of any member. We are not liable for any disputes, damages, or losses arising from interactions between members.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">8. Account Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate any account that violates these terms, engages in fraudulent activity, or is reported for harassment or misconduct. You may also request account deletion by contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Tirupati, Andhra Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-foreground mb-3">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, contact us at:<br />
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

export default TermsOfService;
