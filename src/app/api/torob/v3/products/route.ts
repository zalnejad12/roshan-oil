import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { Product } from "@/types";

// =============================================
// Torob Product API v3
// مستندات: https://github.com/torob/Torob-Sync
// =============================================

const TOROB_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAt6Mu4T0pBORY11W+QeM35UsmLO3vsf+6yKpFDEImFk0=
-----END PUBLIC KEY-----`;

const PRODUCTS_PER_PAGE = 100;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://roshanoil.ir";

// ---- JWT Validation ----
async function validateTorobToken(token: string, host: string): Promise<boolean> {
  try {
    // Decode JWT parts
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const header = JSON.parse(Buffer.from(parts[0], "base64url").toString());
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());

    // Check algorithm
    if (header.alg !== "EdDSA") return false;

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) return false;
    if (payload.nbf && now < payload.nbf) return false;

    // Check audience matches host
    if (payload.aud && payload.aud !== host) return false;

    // Verify signature using Web Crypto API (Ed25519)
    const keyData = TOROB_PUBLIC_KEY
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "")
      .replace(/\s/g, "");

    const keyBuffer = Buffer.from(keyData, "base64");

    const cryptoKey = await crypto.subtle.importKey(
      "spki",
      keyBuffer,
      { name: "Ed25519" },
      false,
      ["verify"]
    );

    const signingInput = `${parts[0]}.${parts[1]}`;
    const signature = Buffer.from(parts[2], "base64url");

    const isValid = await crypto.subtle.verify(
      "Ed25519",
      cryptoKey,
      signature,
      new TextEncoder().encode(signingInput)
    );

    return isValid;
  } catch {
    return false;
  }
}

// ---- Convert product to Torob format ----
function toTorobProduct(product: Product) {
  const categoryMap: Record<string, string> = {
    "engine-oil": "روغن موتور",
    "transmission-oil": "روغن گیربکس",
    "filter": "فیلتر روغن",
    "additive": "افزودنی خودرو",
    "coolant": "ضد یخ",
    "gear-oil": "روغن دیفرانسیل",
  };

  const spec: Record<string, string> = {};
  if (product.viscosity) spec["ویسکوزیته"] = product.viscosity;
  if (product.apiStandard) spec["استاندارد API"] = product.apiStandard;
  if (product.oilType) {
    spec["نوع روغن"] = product.oilType === "synthetic"
      ? "تمام سنتتیک"
      : product.oilType === "semi-synthetic"
      ? "نیمه سنتتیک"
      : "معدنی";
  }
  if (product.volume) spec["حجم"] = product.volume;
  if (product.brand) spec["برند"] = product.brand;

  return {
    page_unique: product.id,
    page_url: `${SITE_URL}/products/${product.slug}`,
    product_group_id: product.brand,
    title: product.name,
    subtitle: product.shortDescription,
    current_price: product.inStock ? product.price : 0,
    old_price: product.originalPrice || null,
    availability: product.inStock,
    category_name: categoryMap[product.category] || product.category,
    image_links: product.images.length > 0
      ? product.images.map((img) =>
          img.startsWith("http") ? img : `${SITE_URL}${img}`
        )
      : [`${SITE_URL}/images/placeholder.jpg`],
    short_desc: product.shortDescription,
    spec,
    guarantee: "ضمانت اصالت کالا",
    date_added: new Date(product.createdAt).toISOString(),
    date_updated: new Date(product.createdAt).toISOString(),
  };
}

// ---- Main Handler ----
export async function POST(request: NextRequest) {
  // --- Auth ---
  const token = request.headers.get("X-Torob-Token");
  const tokenVersion = request.headers.get("X-Torob-Token-Version");
  const host = request.headers.get("host") || "";

  if (!token) {
    return NextResponse.json({ error: "missing token" }, { status: 401 });
  }

  // In development, skip JWT validation
  if (process.env.NODE_ENV === "production") {
    const isValid = await validateTorobToken(token, host);
    if (!isValid) {
      return NextResponse.json({ error: "invalid token" }, { status: 401 });
    }
  }

  // --- Parse body ---
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json body" }, { status: 400 });
  }

  const activeProducts = products.filter((p) => p.inStock !== undefined);

  // --- Option 1: Fetch by page_urls ---
  if ("page_urls" in body) {
    const urls = body.page_urls as string[];
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "page_urls must be a non-empty array" }, { status: 400 });
    }

    const matched = activeProducts.filter((p) =>
      urls.includes(`${SITE_URL}/products/${p.slug}`)
    );

    return NextResponse.json({
      api_version: "torob_api_v3",
      current_page: 1,
      total: matched.length,
      max_pages: 1,
      products: matched.map(toTorobProduct),
    });
  }

  // --- Option 2: Fetch by page_uniques ---
  if ("page_uniques" in body) {
    const uniques = body.page_uniques as string[];
    if (!Array.isArray(uniques) || uniques.length === 0) {
      return NextResponse.json({ error: "page_uniques must be a non-empty array" }, { status: 400 });
    }

    const matched = activeProducts.filter((p) => uniques.includes(p.id));

    return NextResponse.json({
      api_version: "torob_api_v3",
      current_page: 1,
      total: matched.length,
      max_pages: 1,
      products: matched.map(toTorobProduct),
    });
  }

  // --- Option 3: Paginated list ---
  if ("page" in body) {
    const page = body.page as number;
    const sort = body.sort as string;

    if (!page || typeof page !== "number") {
      return NextResponse.json({ error: "page parameter is not provided" }, { status: 400 });
    }
    if (!sort) {
      return NextResponse.json({ error: "sort parameter is not provided" }, { status: 400 });
    }
    if (!["date_added_desc", "date_updated_desc"].includes(sort)) {
      return NextResponse.json({ error: "invalid sort parameter" }, { status: 400 });
    }

    // Sort
    const sorted = [...activeProducts].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const total = sorted.length;
    const maxPages = Math.ceil(total / PRODUCTS_PER_PAGE);
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const pageProducts = sorted.slice(start, end);

    return NextResponse.json({
      api_version: "torob_api_v3",
      current_page: page,
      total,
      max_pages: maxPages,
      products: pageProducts.map(toTorobProduct),
    });
  }

  return NextResponse.json({ error: "invalid request body" }, { status: 400 });
}
