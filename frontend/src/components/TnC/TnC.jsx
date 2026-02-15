import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-amber-200">
        <div className="max-w-5xl mx-auto text-gray-600 leading-relaxed font-['poppins']">
          <h1 className="text-3xl font-bold text-center text-amber-600 mb-8">
            Terms & Conditions
          </h1>
             <p className="text-sm text-gray-500 text-center mb-6">
          Effective Date: <span className="font-medium">25-08-2025</span> | Time:{" "}
          <span className="font-medium">17:50</span>
        </p>

          <p className="mb-6">
            Welcome to <span className="font-semibold">Annpurna Dhaba & Family Restaurant</span>. 
            By accessing or ordering from our website (
            <a
              href="https://annpurnadhaba.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 underline"
            >
              https://annpurnadhaba.in/
            </a>
            ), you agree to the following terms and conditions. We request you to carefully 
            read these terms, as they govern the use of our website, services, and offers.
          </p>

          {/* Section 1 */}
          <Section title="1. General">
            <ul className="list-disc pl-6 space-y-2">
              <li>These terms and conditions apply to all visitors, customers, and users of our website and services.</li>
              <li>By placing an order, you acknowledge that you are of legal age (18 years or above) and are capable of entering into a binding agreement.</li>
              <li>We reserve the right to modify, update, or withdraw any part of these terms at any time without prior notice.</li>
              <li>Continued use of our services will mean that you accept any changes made to the Terms & Conditions.</li>
            </ul>
          </Section>

          {/* Section 2 */}
          <Section title="2. Orders & Payments">
            <ul className="list-disc pl-6 space-y-2">
              <li>All food orders are subject to availability. In case of non-availability of an item, we may suggest a suitable alternative or provide a refund.</li>
              <li>Prices displayed on the website include applicable taxes unless specifically mentioned otherwise.</li>
              <li>Payment must be made through the available methods (e.g., UPI, Debit/Credit Card, Wallets, Cash on Delivery if applicable).</li>
              <li>Once payment is successfully processed, you will receive an order confirmation.</li>
              <li>We reserve the right to cancel or refuse any order in case of suspicious or fraudulent activity.</li>
            </ul>
          </Section>

          {/* Section 3 */}
          <Section title="3. Delivery & Pickup">
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery time may vary depending on the location, traffic, weather, or restaurant workload.</li>
              <li>Customers must provide accurate delivery information. Incorrect details may result in delay or cancellation.</li>
              <li>Delivery charges, if any, will be mentioned at checkout.</li>
              <li>Customers can also opt for self-pickup. Food should be collected within the specified timeframe to ensure quality.</li>
            </ul>
          </Section>

          {/* Section 4 */}
          <Section title="4. Coupons, Discounts & Offers">
            <ul className="list-disc pl-6 space-y-2">
              <li>Coupons are valid only for online orders placed through our official website unless otherwise stated.</li>
              <li>Each coupon is valid for one-time use per customer unless explicitly mentioned.</li>
              <li>Coupons cannot be transferred, exchanged for cash, or combined with other offers.</li>
              <li>Expired coupons will not be accepted under any circumstances.</li>
              <li>Coupons must be entered during checkout. They cannot be applied after order confirmation.</li>
              <li>The restaurant reserves the right to cancel/modify any coupon without prior notice, reject misuse, or impose minimum order value conditions.</li>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section title="5. Cancellations & Refunds">
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders cannot be canceled once prepared or dispatched.</li>
              <li>Refunds are processed if items are unavailable, payment was deducted but order not confirmed, or wrong items were delivered.</li>
              <li>Refunds are initiated within 5–7 business days via the original payment method.</li>
              <li>Partial refunds may apply if some items are unavailable.</li>
            </ul>
          </Section>

          {/* Section 6 */}
          <Section title="6. Food Quality, Health & Allergies">
            <ul className="list-disc pl-6 space-y-2">
              <li>We maintain high hygiene and quality standards.</li>
              <li>Actual food presentation may differ from website images.</li>
              <li>Customers with allergies must check product details or contact us before ordering.</li>
              <li>We are not responsible for allergic reactions or health issues due to undisclosed sensitivities.</li>
            </ul>
          </Section>

          {/* Section 7 */}
          <Section title="7. Customer Responsibilities">
            <ul className="list-disc pl-6 space-y-2">
              <li>Customers must provide correct details (name, address, phone).</li>
              <li>Customers must be available at the delivery location.</li>
              <li>Food should be consumed within a reasonable time after delivery.</li>
              <li>Sharing of login credentials or coupon codes is prohibited.</li>
              <li>Fraudulent use of the website is strictly forbidden.</li>
            </ul>
          </Section>

          {/* Section 8 */}
          <Section title="8. Restaurant Rights">
            <ul className="list-disc pl-6 space-y-2">
              <li>We reserve the right to refuse service for abusive behavior, repeated complaints, or fraudulent activity.</li>
              <li>Services may be temporarily suspended for maintenance or unforeseen issues.</li>
              <li>We may run offers, campaigns, or discounts at our discretion.</li>
            </ul>
          </Section>

          {/* Section 9 */}
          <Section title="9. Privacy & Data Protection">
            <ul className="list-disc pl-6 space-y-2">
              <li>We only use personal data for order fulfillment, delivery, and communication.</li>
              <li>We do not sell or share personal data with third parties except for payments or delivery.</li>
              <li>By using our website, you consent to our data processing in accordance with the Privacy Policy.</li>
            </ul>
          </Section>

          {/* Section 10 */}
          <Section title="10. Limitation of Liability">
            <ul className="list-disc pl-6 space-y-2">
              <li>We are not liable for delays due to traffic, weather, or third-party providers.</li>
              <li>We are not liable for indirect or consequential losses from service usage.</li>
              <li>Our maximum liability is limited to the value of the order placed.</li>
            </ul>
          </Section>

          {/* Section 11 */}
          <Section title="11. Jurisdiction">
            <p>
              In case of disputes, complaints, or legal proceedings, the matter shall fall under the jurisdiction 
              of the Gumla Judicial Court, Jharkhand (India).
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-amber-600 mb-3">{title}</h2>
    {children}
  </div>
);

export default TermsAndConditions;
