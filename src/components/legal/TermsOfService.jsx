import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-contrast-high mb-6">Terms of Service</h1>
        <p className="text-contrast-medium mb-8">Last updated: September 2, 2024</p>
      </div>

      <div className="space-y-8 text-contrast-medium">
        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to CryptoG Signals. These Terms of Service ("Terms") govern your access to and use of our website, 
            services, and content (collectively, the "Service"). By accessing or using the Service, you agree to be bound 
            by these Terms and our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">2. Account Registration</h2>
          <p className="mb-2">To access certain features of the Service, you may be required to create an account. You agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Be responsible for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">3. Subscription and Billing</h2>
          <p className="mb-2">Certain features of the Service may require payment. By subscribing, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-2">
            <li>Pay all applicable fees for the selected subscription plan</li>
            <li>Provide accurate billing information</li>
            <li>Authorize us to charge your chosen payment method</li>
          </ul>
          <p className="mt-4">Subscriptions automatically renew unless canceled before the renewal date. You may cancel your subscription at any time, but no refunds will be provided for the current billing period.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">4. User Conduct</h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Share your account credentials or allow others to access your account</li>
            <li>Reverse engineer, decompile, or attempt to discover the source code of the Service</li>
            <li>Use the Service to transmit any viruses or harmful code</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">5. Risk Disclosure</h2>
          <p className="mb-4">
            Cryptocurrency trading involves substantial risk of loss and is not suitable for every investor. The value of 
            cryptocurrencies can be extremely volatile. Past performance is not indicative of future results. You should 
            carefully consider your investment objectives, level of experience, and risk appetite before trading. 
            CryptoG Signals does not provide financial advice, and the information provided should not be considered as such.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, CryptoG Signals shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or 
            indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">7. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting 
            the updated Terms on our website and updating the "Last updated" date. Your continued use of the Service 
            after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">8. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at: <a href="mailto:legal@cryptogsignals.com" className="text-[var(--color-primary)] hover:underline">legal@cryptogsignals.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
