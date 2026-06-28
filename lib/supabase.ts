import { tokens as fallbackTokens, type Token } from "@/lib/tokens";

type WatchlistTokenRow = {
  symbol: string;
  mint: string;
  display_name: string;
  trading_view_symbol: string | null;
  accent: string | null;
  enabled: boolean;
};

function mergeWithFallback(row: WatchlistTokenRow): Token {
  const fallback = fallbackTokens.find((token) => token.symbol.toLowerCase() === row.symbol.toLowerCase());

  return {
    symbol: row.symbol.toUpperCase(),
    name: row.display_name,
    mint: row.mint,
    tradingViewSymbol: row.trading_view_symbol ?? fallback?.tradingViewSymbol ?? "BINANCE:SOLUSDT",
    accent: row.accent ?? fallback?.accent ?? "#b8ff2c",
    price: fallback?.price ?? "$0.00",
    change: fallback?.change ?? "+0.0%",
    volume: fallback?.volume ?? "$0",
    holders: fallback?.holders ?? "--",
    marketCap: fallback?.marketCap ?? "$0"
  };
}

export async function getSupabaseWatchlistTokens(): Promise<Token[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  try {
    const response = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/watchlist_tokens?select=symbol,mint,display_name,trading_view_symbol,accent,enabled&enabled=eq.true&order=sort_order.asc`,
      {
        headers: {
          apikey: anonKey,
          authorization: `Bearer ${anonKey}`
        },
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) return null;
    const rows = (await response.json()) as WatchlistTokenRow[];
    const liveTokens = rows.map(mergeWithFallback);
    return liveTokens.length ? liveTokens : null;
  } catch {
    return null;
  }
}
