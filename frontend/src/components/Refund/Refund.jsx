import React from "react";

const RefundCancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 py-10 px-6 sm:px-20 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-amber-200">

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-700 mb-2 text-center">
          Refund & Cancellation Policy
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Effective Date: <span className="font-medium">25-08-2025</span>
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          At <span className="font-semibold text-amber-700">Annpurna Dhaba & Family Restaurant</span>, 
          we always strive to deliver the best food and service to our customers. However, we understand 
          that sometimes situations may arise where you may need to cancel an order or request a refund. 
          Please read our Refund & Cancellation Policy carefully:
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            1. Order Cancellation
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Orders once placed cannot be cancelled after food preparation has started.</li>
            <li>
              If you wish to cancel your order, you must do so within 
              <span className="font-medium"> 5 minutes </span> of placing it, by calling our customer care number.
            </li>
            <li>Cancellation requests after this period will not be accepted as the food may already be in preparation.</li>
            <li>Prepaid orders cancelled within the eligible time frame will be refunded as per our refund policy.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            2. Refund Policy
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><span className="font-medium">Wrong Order Delivered:</span> We will replace it or issue a refund for the value of the wrong item.</li>
            <li><span className="font-medium">Quality Issues:</span> Full refund or replacement if food is spoiled or unfit for consumption (after verification).</li>
            <li><span className="font-medium">Late Delivery:</span> If delivery is delayed beyond 60 minutes due to our fault, you may request a refund or compensation coupon.</li>
            <li><span className="font-medium">Non-Delivery:</span> In rare cases of non-delivery, a full refund will be issued.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            3. Refund Method & Timeline
          </h2>
          <p className="text-gray-700">
            Refunds for online/prepaid orders will be credited to the original payment method 
            within <span className="font-medium">5–7 working days</span>, depending on your payment provider. <br />
            Refunds for cash-on-delivery orders will be provided in the form of store credit/coupon 
            for future purchases.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            4. No Refund / No Cancellation Cases
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>No refunds or cancellations once the order is successfully delivered.</li>
            <li>Taste preference is subjective and not eligible for refunds.</li>
            <li>Partially or fully consumed items will not be refunded.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            5. Coupons & Discounts
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Coupons once applied are considered used and cannot be reissued if cancelled.</li>
            <li>If you cancel a coupon-applied order, only the amount paid will be refunded (excluding coupon value).</li>
            <li>Promotional offers and discount coupons are non-refundable and non-exchangeable.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            6. Dispute Resolution
          </h2>
          <p className="text-gray-700">
            Any disputes related to cancellation or refund will first be addressed by our 
            customer support team. If unresolved, the matter shall fall under the jurisdiction 
            of the <span className="font-medium">Gumla Judicial Court, Jharkhand</span>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default RefundCancellationPolicy;
