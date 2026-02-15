import React from "react";

const ShippingDeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 py-10 px-6 sm:px-20 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-amber-200">

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-700 mb-2 text-center">
          Shipping & Delivery Policy
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Effective Date: <span className="font-medium">25-08-2025</span>
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          At <span className="font-semibold text-amber-700">Annpurna Dhaba & Family Restaurant</span>, 
          we are committed to delivering freshly prepared meals to your doorstep with care and punctuality. 
          Please read our shipping and delivery timelines carefully:
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            1. Delivery Coverage Area
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>We currently deliver within a <span className="font-medium">10 km radius</span> from our restaurant in Kamdara, Gumla (Jharkhand).</li>
            <li>Orders beyond this radius may not be accepted. Special cases like bulk orders may be considered with extra charges.</li>
            <li>Please confirm your address is within our serviceable area before ordering.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            2. Delivery Timelines
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Delivery time starts once food preparation is complete.</li>
            <li>All orders are typically delivered within <span className="font-medium">30 minutes</span> after preparation.</li>
            <li><span className="font-medium">Average preparation time:</span> 15–25 mins for regular dishes, 30–45 mins for bulk/party orders.</li>
            <li>During weekends, festivals, or peak hours, delivery may take longer. Customers will be informed in advance.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            3. Order Processing
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Orders are confirmed only after receiving complete details (address, phone, payment method).</li>
            <li>Food is freshly prepared and dispatched immediately after preparation.</li>
            <li>Customers will be notified via call/SMS when the order is out for delivery.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            4. Delivery Charges
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>A nominal delivery fee may apply within the 10 km serviceable area.</li>
            <li>Free delivery may be offered during promotions or for bulk/catering orders (management discretion).</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            5. Failed / Missed Deliveries
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>If the customer is unavailable at delivery time, our team will attempt to contact you.</li>
            <li>Orders undelivered after repeated attempts will be marked undelivered — no refunds applicable.</li>
            <li>Please ensure accurate delivery details and availability during the delivery window.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            6. Bulk / Pre-scheduled Orders
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Catering or party orders must be placed at least <span className="font-medium">24 hours in advance</span>.</li>
            <li>Delivery timelines for such orders will be confirmed separately with the customer.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            7. Force Majeure
          </h2>
          <p className="text-gray-700">
            In case of bad weather, traffic, natural calamities, or government restrictions, delivery may be delayed. 
            While we strive for timely service, <span className="font-semibold text-amber-700">Annpurna Dhaba & Family Restaurant</span> 
            cannot be held responsible for delays beyond our control.
          </p>
        </section>

      </div>
    </div>
  );
};

export default ShippingDeliveryPolicy;
