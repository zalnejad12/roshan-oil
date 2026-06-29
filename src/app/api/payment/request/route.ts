import { NextRequest, NextResponse } from "next/server";
import { zarinpalRequest } from "@/lib/payment/zarinpal";
import { idpayRequest } from "@/lib/payment/idpay";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://roshanoil.ir";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gateway, amount, orderId, name, phone, description } = body;

    if (!gateway || !amount || !orderId) {
      return NextResponse.json({ error: "پارامترهای ناقص" }, { status: 400 });
    }

    const callbackUrl = `${SITE_URL}/api/payment/verify?gateway=${gateway}&orderId=${orderId}`;

    if (gateway === "zarinpal") {
      const result = await zarinpalRequest({
        amount,
        description: description || `سفارش ${orderId} - روشن اویل`,
        callbackUrl,
        mobile: phone,
        orderId,
      });

      if (result.success) {
        return NextResponse.json({ success: true, gatewayUrl: result.gatewayUrl, authority: result.authority });
      }
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    if (gateway === "idpay") {
      const result = await idpayRequest({
        orderId,
        amount: amount * 10, // تومان به ریال
        name,
        phone,
        desc: description || `سفارش ${orderId} - روشن اویل`,
        callbackUrl,
      });

      if (result.success) {
        return NextResponse.json({ success: true, gatewayUrl: result.link, id: result.id });
      }
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ error: "درگاه نامعتبر" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
