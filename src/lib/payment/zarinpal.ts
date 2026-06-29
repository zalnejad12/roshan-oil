// =============================================
// زرین‌پال - درگاه پرداخت
// https://www.zarinpal.com
// =============================================

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
const IS_SANDBOX = process.env.ZARINPAL_SANDBOX === "true";

const BASE_URL = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/v4/payment"
  : "https://payment.zarinpal.com/pg/v4/payment";

const GATEWAY_URL = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/StartPay"
  : "https://www.zarinpal.com/pg/StartPay";

export interface ZarinpalRequestResult {
  success: boolean;
  authority?: string;
  gatewayUrl?: string;
  error?: string;
  code?: number;
}

export interface ZarinpalVerifyResult {
  success: boolean;
  refId?: string;
  cardPan?: string;
  error?: string;
  code?: number;
}

// درخواست پرداخت
export async function zarinpalRequest(params: {
  amount: number; // تومان
  description: string;
  callbackUrl: string;
  mobile?: string;
  email?: string;
  orderId?: string;
}): Promise<ZarinpalRequestResult> {
  try {
    const res = await fetch(`${BASE_URL}/request.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        merchant_id: MERCHANT_ID,
        amount: params.amount * 10, // تبدیل تومان به ریال
        description: params.description,
        callback_url: params.callbackUrl,
        metadata: {
          mobile: params.mobile,
          email: params.email,
          order_id: params.orderId,
        },
      }),
    });

    const data = await res.json();

    if (data.data?.code === 100) {
      return {
        success: true,
        authority: data.data.authority,
        gatewayUrl: `${GATEWAY_URL}/${data.data.authority}`,
      };
    }

    return {
      success: false,
      error: data.errors?.message || "خطا در ایجاد درخواست پرداخت",
      code: data.errors?.code,
    };
  } catch (err) {
    return { success: false, error: "خطا در اتصال به درگاه زرین‌پال" };
  }
}

// تأیید پرداخت
export async function zarinpalVerify(params: {
  authority: string;
  amount: number; // تومان
}): Promise<ZarinpalVerifyResult> {
  try {
    const res = await fetch(`${BASE_URL}/verify.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        merchant_id: MERCHANT_ID,
        amount: params.amount * 10, // تبدیل تومان به ریال
        authority: params.authority,
      }),
    });

    const data = await res.json();

    if (data.data?.code === 100 || data.data?.code === 101) {
      return {
        success: true,
        refId: String(data.data.ref_id),
        cardPan: data.data.card_pan,
        code: data.data.code,
      };
    }

    return {
      success: false,
      error: data.errors?.message || "پرداخت تأیید نشد",
      code: data.errors?.code,
    };
  } catch (err) {
    return { success: false, error: "خطا در تأیید پرداخت" };
  }
}
