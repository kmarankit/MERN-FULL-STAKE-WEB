import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderNotification = async (to, order, isCustomer) => {
  try {
    if (!to) throw new Error("Recipient email missing!");

    const subject = isCustomer
      ? "Your order has been placed!"
      : `New Order Received - ${order._id}`;

    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden;">

        <!-- Header with text logo -->
        <div style="background-color: #e6002b; color: #fff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
          ANNPURNA DHABA
        </div>

        <!-- Title -->
        <div style="padding: 25px; text-align: center; border-bottom: 1px solid #eee;">
          <h2 style="margin: 0; color: green;">${
            isCustomer
              ? "Your order is confirmed 🎉"
              : "New Order Notification"
          }</h2>
          <p style="margin: 5px 0; color: #666; font-size: 14px;">
            ${isCustomer ? "Thanks for ordering with us!" : "You’ve received a new customer order."}
          </p>
        </div>

        <!-- Order Details -->
        <div style="padding: 25px;">
          <h3 style="margin-bottom: 15px; color: #444;">Order Summary</h3>
          <div style="border: 1px solid #eee; border-radius: 8px; padding: 15px; background: #fafafa;">
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <strong>Order ID:</strong> ${order._id}
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <strong>Customer:</strong> ${order.firstName} ${order.lastName}
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <strong>Total:</strong> ₹${order.total}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f1f1f1; padding: 20px; text-align: center; font-size: 13px; color: #777;">
          <p style="margin: 0;">📍 Annpurna Dhaba | Thank you for supporting us!</p>
          <p style="margin: 5px 0 0;">Need help? <a href="mailto:support@annpurnadhaba.com" style="color: #e6002b; text-decoration: none;">Contact Support</a></p>
        </div>

      </div>
    </div>
    `;

    const mailOptions = {
      from: `"Annpurna Dhaba" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};

