const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    // Get the Stripe token and the payment amount from the request body
    const { stripeToken, amount, billingDetails } = req.body;

    const customer = await stripe.customers.create({
      email: billingDetails.email,
      source: stripeToken,
      address: {
        city: billingDetails?.city || null,
        country: billingDetails?.country || null,
        line1: billingDetails?.address || null,
        line2: billingDetails?.address2 || null,
        postal_code: billingDetails?.zipCode || null,
        state: billingDetails?.state || null,
      },
      name: `${
        billingDetails?.fullName
          ? billingDetails?.fullName
          : billingDetails?.firstName + " " + billingDetails?.lastName
      }`,
      phone: billingDetails?.phone || null,
    });

    // Create a Stripe Charge
    const charge = await stripe.charges.create({
      amount: amount, // Amount in the smallest currency unit (e.g., cents for USD)
      currency: "DKK",
      customer: customer.id,
      description: "Example charge",
    });

    // Return the Stripe Charge response
    res.json(charge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Stripe charge" });
  }
}
