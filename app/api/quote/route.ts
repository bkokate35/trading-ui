import { NextResponse } from "next/server";
import { getToken } from "@/lib/tokens";

const solMint = "So11111111111111111111111111111111111111112";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "CHAD";
  const amount = Number(searchParams.get("amount") ?? "1");
  const token = getToken(symbol);
  const lamports = Math.max(1, Math.round(amount * 1_000_000_000));

  try {
    const url = new URL("https://lite-api.jup.ag/swap/v1/quote");
    url.searchParams.set("inputMint", solMint);
    url.searchParams.set("outputMint", token.mint);
    url.searchParams.set("amount", String(lamports));
    url.searchParams.set("slippageBps", "50");

    const response = await fetch(url, { next: { revalidate: 10 } });
    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "quote_unavailable" }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json({
      ok: true,
      outAmount: data.outAmount,
      routePlan: data.routePlan?.length ?? 0,
      priceImpactPct: data.priceImpactPct
    });
  } catch {
    return NextResponse.json({ ok: false, error: "quote_unavailable" }, { status: 200 });
  }
}
