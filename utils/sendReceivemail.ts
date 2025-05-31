import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface OrderDetails {
  to: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: number;
  product_id: string;
  title: string;
  image: string;
  description: string;
  support_email: string;
}

export async function sendOrderConfirmationEmail(order: OrderDetails) {
  const {
    to,
    first_name,
    last_name,
    address,
    city,
    state,
    postcode,
    country,
    phone,
    product_id,
    title,
    image,
    description,
    support_email,
  } = order;

  const msg = {
    to:to,
    from: "noreply@coinbasecommerceblinks.shop",
    subject: `coinbase order confirmed: ${title}`,
    text: `yo ${first_name}, your coinbase order is confirmed!`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background: #f4f6f8; padding: 24px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 32px;">
          
          <h2 style="color: #1652f0; font-size: 24px;">Thanks for your order! 🧾</h2>
          <p style="font-size: 16px;">Hey <strong>${first_name} ${last_name}</strong>, your order has been confirmed and is being processed. Here's what's up 👇</p>
          
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

          <h3 style="color: #333;">Product Details</h3>
          <img src="${image}" alt="${title}" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 8px; margin-top: 12px;"/>
          <p style="margin-top: 16px;"><strong>${title}</strong></p>
          <p style="color: #666;">${description}</p>
          <p style="margin-top: 8px;"><strong>Product ID:</strong> ${product_id}</p>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

          <h3 style="color: #333;">Shipping Info</h3>
          <p><strong>Address:</strong> ${address}, ${city}, ${state}, ${postcode}, ${country}</p>
          <p><strong>Phone:</strong> ${phone}</p>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

          <p style="margin-top: 24px;">We're hyped for you to rock this gear 😤</p>
          <p style="color: #777; font-size: 14px;">Merchant support email: <strong>${support_email}</strong></p>

          <p style="color: #aaa; font-size: 12px; margin-top: 32px;">&copy; 2024 Coinbase Commerce</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: "Email sent" };
  } catch (error) {
    console.error("SendGrid error:", error);
    return { success: false, error: error || "Failed to send email" };
  }
}
