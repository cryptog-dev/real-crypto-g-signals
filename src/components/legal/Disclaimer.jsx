import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Disclaimer = () => {
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
        <h1 className="text-3xl font-bold text-contrast-high mb-6">Disclaimer</h1>
        <p className="text-contrast-medium mb-8">Last updated: September 2, 2024</p>
      </div>

      <div className="space-y-8 text-contrast-medium">
        <section className="bg-[var(--color-neutral-dark)]/30 p-6 rounded-lg border border-[var(--color-border-light)]">
          <h2 className="text-xl font-semibold text-contrast-high mb-4 text-center">Important Risk Disclosure</h2>
          <p className="text-center text-[var(--color-accent1)] font-medium mb-4">
            CRYPTOCURRENCY TRADING INVOLVES SIGNIFICANT RISK OF LOSS AND IS NOT SUITABLE FOR ALL INVESTORS.
          </p>
          <p className="text-center">
            The information provided on this platform is for educational and informational purposes only and should not be considered financial advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">1. No Financial Advice</h2>
          <p className="mb-4">
            The content provided by CryptoG Signals is for informational and educational purposes only and should not be construed as financial, investment, tax, legal, or other professional advice. We are not financial advisors, and the information on our platform is not intended to be a substitute for professional financial advice.
          </p>
          <p className="mb-4">
            Trading cryptocurrencies involves substantial risk of loss and is not suitable for every investor. The valuation of cryptocurrencies may fluctuate, and as a result, you may lose more than your initial investment. You should be aware of all the risks associated with cryptocurrency trading and seek advice from an independent financial advisor if you have any doubts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">2. Investment Risks</h2>
          <p className="mb-4">
            Cryptocurrency markets are highly volatile and can experience rapid price movements. The following risks should be carefully considered:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Market Volatility:</strong> Cryptocurrency prices can fluctuate rapidly in price and may become worthless.</li>
            <li><strong>Liquidity Risk:</strong> Some cryptocurrencies may have limited liquidity, making it difficult to execute large trades without impacting the market price.</li>
            <li><strong>Regulatory Risk:</strong> The regulatory environment for cryptocurrencies is evolving and may change in ways that could adversely affect the market.</li>
            <li><strong>Technology Risk:</strong> The underlying technology of cryptocurrencies is complex and may be subject to flaws, attacks, or other technical issues.</li>
            <li><strong>No FDIC Insurance:</strong> Unlike bank accounts, cryptocurrency holdings are not insured by any government agency.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">3. Past Performance</h2>
          <p className="mb-4">
            Past performance is not indicative of future results. The value of investments and the income from them may go down as well as up, and investors may not get back the amount originally invested. Any historical returns, expected returns, or probability projections may not reflect actual future performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">4. No Guarantee of Accuracy</h2>
          <p className="mb-4">
            While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on our platform. Any reliance you place on such information is strictly at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">5. Third-Party Content</h2>
          <p className="mb-4">
            Our platform may contain links to third-party websites or content. We do not endorse, guarantee, or assume responsibility for the accuracy, reliability, or quality of any information, products, or services provided by third parties. We are not responsible for any loss or damage caused by your use of or reliance on any third-party content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">6. No Liability</h2>
          <p className="mb-4">
            In no event will CryptoG Signals, its affiliates, or their respective officers, directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">7. Jurisdictional Considerations</h2>
          <p className="mb-4">
            The availability of the Service does not mean that cryptocurrencies, digital assets, or related services are permitted under the laws of your jurisdiction. It is your responsibility to ensure that your use of the Service complies with all applicable laws and regulations in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">8. Changes to This Disclaimer</h2>
          <p className="mb-4">
            We reserve the right to modify this Disclaimer at any time. We will provide notice of material changes by posting the updated Disclaimer on our website and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Disclaimer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-contrast-high mb-4">9. Contact Us</h2>
          <p>If you have any questions about this Disclaimer, please contact us at: <a href="mailto:legal@cryptogsignals.com" className="text-[var(--color-primary)] hover:underline">legal@cryptogsignals.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
