// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { number, name, expiry, cvc } = req.body;

  console.log(number, name, expiry, cvc, "Hey!", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

  try {
    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: "usd",
      payment_method_data: {
        type: "card",
        card: {
          number,
          exp_month: parseInt(expiry.slice(0, 2)),
          exp_year: parseInt(`20${expiry.slice(3)}`),
          cvc,
        },
      },
      confirm: true,
    });

    // Handle the payment intent response
    if (paymentIntent.status === "succeeded") {
      res.status(200).json({ message: "Payment successful" });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Error processing payment" });
  }
}
