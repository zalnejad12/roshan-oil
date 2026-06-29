// =============================================
// آیدی‌پی - درگاه پرداخت
// https://idpay.ir
// =============================================

const API_KEY = process.env.IDPAY_API_KEY || "your-api-key";
const IS_SANDBOX = process.env.IDPAY_SANDBOX === "true";

const BASE_URL = "https://api.idpay.ir/v1.1";

export interface IdpayRequestResult {
  success: boolean;
  id?: string;
  link?: string;
  error?: string;
  errorCode?: number;
}

export interface IdpayVerifyResult {
  success: boolean;
  trackId?: string;
  orderId?: string;
  amount?: number;
  cardNo?: string;
  error?: string;
}

// درخواست پرداخت
export async function idpayRequest(params: {
  orderId: string;
  amount: number; // ریال
  name?: string;
  phone?: string;
  mail?: string;
  desc?: string;
  callbackUrl: string;
}): Promise<IdpayRequestResult> {
  try {
    const res = await fetch(`${BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        "X-SANDBOX": IS_SANDBOX ? "1" : "0",
      },
      body: JSON.stringify({
        order_id: params.orderId,
        amount: params.amount,
        name: params.name,
        phone: params.phone,
        mail: params.mail,
        desc: params.desc || "پرداخت روشن اویل",
        callback: params.callbackUrl,
      }),
    });

    const data = await res.json();

    if (data.id && data.link) {
      return { success: true, id: data.id, link: data.link };
    }

    return {
      success: false,
      error: data.error_message || "خطا در ایجاد درخواست پرداخت",
      errorCode: data.error_code,
    };
  } catch {
    return { success: false, error: "خطا در اتصال به درگاه آیدی‌پی" };
  }
}

// تأیید پرداخت
export async function idpayVerify(params: {
  id: string;
  orderId: string;
}): Promise<IdpayVerifyResult> {
  try {
    const res = await fetch(`${BASE_URL}/payment/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        "X-SANDBOX": IS_SANDBOX ? "1" : "0",
      },
      body: JSON.stringify({ id: params.id, order_id: params.orderId }),
    });

    const data = await res.json();

    if (data.status === 100 || data.status === 101) {
      return {
        success: true,
        trackId: String(data.track_id),
        orderId: data.order_id,
        amount: data.amount,
        cardNo: data.payment?.card_no,
      };
    }

    return {
      success: false,
      error: data.error_message || "پرداخت تأیید نشد",
    };
  } catch {
    return { success: false, error: "خطا در تأیید پرداخت" };
  }
}
