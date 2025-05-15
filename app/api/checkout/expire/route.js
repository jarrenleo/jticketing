import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status !== "open")
      return NextResponse.json({
        success: true,
      });

    const expiredSession = await stripe.checkout.sessions.expire(sessionId);
    if (expiredSession.status !== "expired")
      throw new Error("Failed to expire session");

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
