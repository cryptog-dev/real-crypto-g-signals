import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl font-bold text-contrast-high mb-6">Privacy Policy</h1>
        <p className="text-contrast-medium mb-8">Last updated: September 2, 2024</p>
      </div>

      <div className="space-y-8 text-contrast-medium">
        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, such as when you create an account, subscribe to our services, or contact us for support. This may include:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Personal identification information (name, email address, etc.)</li>
            <li>Payment and transaction information</li>
            <li>Communication preferences</li>
            <li>Account credentials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">2. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">3. Information Sharing</h2>
          <p className="mb-4">We do not share your personal information with third parties except as described in this Privacy Policy or with your consent. We may share information with:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Service providers who perform services on our behalf</li>
            <li>Law enforcement or other government officials, as required by law</li>
            <li>Other parties in connection with a business transaction</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">4. Data Security</h2>
          <p className="mb-4">We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">5. Your Choices</h2>
          <p className="mb-4">You may update, correct, or delete your account information at any time by logging into your account or contacting us. You can opt out of receiving promotional communications from us by following the instructions in those communications.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">6. Changes to This Policy</h2>
          <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@cryptogsignals.com" className="text-[var(--color-primary)] hover:underline">privacy@cryptogsignals.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
