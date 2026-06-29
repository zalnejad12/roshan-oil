import { NextRequest, NextResponse } from "next/server";
import { zarinpalVerify } from "@/lib/payment/zarinpal";
import { idpayVerify } from "@/lib/payment/idpay";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://roshanoil.ir";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gateway = searchParams.get("gateway");
  const orderId = searchParams.get("orderId");

  // ---- زرین‌پال ----
  if (gateway === "zarinpal") {
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    if (status !== "OK" || !authority) {
      return NextResponse.redirect(`${SITE_URL}/payment/failed?orderId=${orderId}&reason=cancelled`);
    }

    // مبلغ را از دیتابیس بگیرید — اینجا نمونه است
    const amount = Number(searchParams.get("amount") || 0);

    const result = await zarinpalVerify({ authority, amount });

    if (result.success) {
      return NextResponse.redirect(
        `${SITE_URL}/payment/success?orderId=${orderId}&refId=${result.refId}&gateway=zarinpal`
      );
    }

    return NextResponse.redirect(`${SITE_URL}/payment/failed?orderId=${orderId}&reason=verify_failed`);
  }

  // ---- آیدی‌پی ----
  if (gateway === "idpay") {
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    if (status !== "100" && status !== "101" || !id || !orderId) {
      return NextResponse.redirect(`${SITE_URL}/payment/failed?orderId=${orderId}&reason=cancelled`);
    }

    const result = await idpayVerify({ id, orderId });

    if (result.success) {
      return NextResponse.redirect(
        `${SITE_URL}/payment/success?orderId=${orderId}&refId=${result.trackId}&gateway=idpay`
      );
    }

    return NextResponse.redirect(`${SITE_URL}/payment/failed?orderId=${orderId}&reason=verify_failed`);
  }

  return NextResponse.redirect(`${SITE_URL}/payment/failed?reason=invalid_gateway`);
}
