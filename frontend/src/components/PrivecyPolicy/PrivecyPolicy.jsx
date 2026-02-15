import React from "react";

const PrivacyPolicy=() =>{
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 py-10 px-6 sm:px-20 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-amber-200">
        
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-700 mb-2 text-center">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Effective Date: <span className="font-medium">25-08-2025</span> | Time:{" "}
          <span className="font-medium">17:50</span>
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          At <span className="font-semibold text-amber-700">Annpurna Dhaba and Family Restaurant</span>, 
          we respect your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data 
          when you visit our website or place an order.
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Personal Information:</span> Name, phone number, email, 
              delivery address, and payment details when you place an order.
            </li>
            <li>
              <span className="font-medium">Non-Personal Information:</span> Browser type, device details, 
              IP address, and cookies to improve user experience.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>To process and deliver your food orders.</li>
            <li>To communicate order updates, offers, or customer support.</li>
            <li>To improve website performance and user experience.</li>
            <li>To comply with legal requirements.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">3. Cookies</h2>
          <p className="text-gray-700">
            We use cookies to enhance your browsing experience, remember your preferences, 
            and personalize offers. You can disable cookies in your browser settings, 
            but some features may not work properly.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            4. Sharing of Information
          </h2>
          <p className="text-gray-700 mb-2">
            We do not sell or trade your personal information. We may share it only with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Delivery partners to fulfill your order.</li>
            <li>Payment gateways for secure transactions.</li>
            <li>Authorities if required by law.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">5. Data Security</h2>
          <p className="text-gray-700">
            We use SSL encryption and secure payment gateways to protect your information. 
            However, no online transmission is 100% secure, and we cannot guarantee complete security.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            6. Third-Party Links
          </h2>
          <p className="text-gray-700">
            Our website does not include links to third-party websites. 
            We are not responsible for the privacy practices, policies, or content of any external sites.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">7. Your Rights</h2>
          <p className="text-gray-700 mb-2">
            You may request to access, update, or delete your personal information by contacting us at:
          </p>
          <p className="text-gray-700">
            📧 <span className="font-medium">support@annpurnadhaba.in</span> <br />
            📞 <span className="font-medium">7903335271</span>
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. 
            Please review it regularly.
          </p>
        </section>

      
      </div>
    </div>
  );
}
export default PrivacyPolicy;
