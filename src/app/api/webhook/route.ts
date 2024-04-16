import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET_KEY) {
  console.error("Stripe Secret Key Not In Env. Set it up. Exiting!");
  process.exit(-1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req: NextRequest) {
  console.log("stripe web hook");
  const payload = await req.text();
  const response = JSON.parse(payload);
  const sig = req.headers.get("Stripe-Signature");
  if (!sig) return console.error("Stripe-Signature");

  console.log({ response });
  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );
    console.log("event", event.type);
    // response.data.object.billing_details.email
    // response.data.object.amount
    // response.data.object.receipt_email
    // response.data.object.currency
    // const dateTime = new Date(response.created * 1000).toLocaleDateString();
    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ status: "Failed", error }, { status: 400 });
  }
}
