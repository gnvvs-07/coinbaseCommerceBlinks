import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

type MerchantOrderEmailProps = {
  to: string; // merchant's email
  customer_name: string;
  customer_email: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  product_id: string;
  title: string;
  description: string;
  image: string;
};

export async function sendMerchantOrderEmail(props: MerchantOrderEmailProps) {
  const {
    to,
    customer_name,
    customer_email,
    phone,
    address,
    city,
    state,
    postcode,
    country,
    product_id,
    title,
    description,
    image,
  } = props;

  const msg = {
    to:to,
    from: "noreply@coinbasecommerceblinks.shop",
    subject: "🔥 New Order Placed!",
    html: `
    <div style="font-family: Inter, sans-serif; background: #f5f7fa; padding: 24px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); overflow: hidden;">
        <div style="background: #1652f0; color: white; padding: 24px;">
          <h2 style="margin: 0;">🚨 New Order Received!</h2>
          <p style="margin: 4px 0 0;">A customer just placed an order on your store.</p>
        </div>

        <div style="padding: 24px;">
          <h3 style="margin-top: 0;">🛍️ Product Details</h3>
          <img src="${image}" alt="${title}" style="max-width: 100%; border-radius: 8px; margin-bottom: 12px;" />
          <p><strong>Product:</strong> ${title}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Product ID:</strong> ${product_id}</p>

          <hr style="margin: 24px 0;" />

          <h3>📦 Shipping Info</h3>
          <p><strong>Name:</strong> ${customer_name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${customer_email}</p>
          <p><strong>Address:</strong><br/>
            ${address},<br/>
            ${city}, ${state} - ${postcode},<br/>
            ${country}
          </p>

          <hr style="margin: 24px 0;" />

          <p style="font-size: 13px; color: #666;">This email is to notify you of a new order. Please reach out to the customer at <strong>${customer_email}</strong> if you need to follow up.</p>
          <p style="font-size: 13px; color: #888; margin-top: 24px;">&copy; ${new Date().getFullYear()} Gotcha Frame – Stay Based 🧢</p>
        </div>
      </div>
    </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (err) {
    console.error("SendGrid Merchant Email Error:", err);
    return { success: false, error: err };
  }
}
