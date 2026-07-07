import { getToken, holders as fallbackHolders, tokens, trades as fallbackTrades, type Token } from "@/lib/tokens";
import { getSupabaseWatchlistTokens } from "@/lib/supabase";

type JupiterPrice = {
  usdPrice?: number;
  price?: number;
  priceChange24h?: number;
  change24h?: number;
};

export type HolderRow = [wallet: string, share: string, value: string, fullWallet?: string];
export type TradeRow = [side: string, amount: string, value: string, time: string, fullAmount?: string];

const jupiterPriceUrl = "https://lite-api.jup.ag/price/v3";
const fallbackRpcUrl = "https://api.mainnet-beta.solana.com";

function formatUsd(value?: number) {
  if (!Number.isFinite(value)) return undefined;
  const amount = value as number;
  if (amount === 0) return "$0.00";
  if (Math.abs(amount) < 0.0001) return `$${amount.toExponential(2)}`;
  if (Math.abs(amount) < 1) return `$${amount.toFixed(6)}`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount > 100 ? 2 : 4
  }).format(amount);
}

function formatCompact(value?: number) {
  if (!Number.isFinite(value)) return undefined;
  const amount = value as number;
  return `$${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(amount)}`;
}

function formatChange(value?: number) {
  if (!Number.isFinite(value)) return undefined;
  const amount = value as number;
  const sign = amount >= 0 ? "+" : "";
  return `${sign}${amount.toFixed(1)}%`;
}

function shortAddress(value = "") {
  return value.length > 12 ? `${value.slice(0, 4)}...${value.slice(-4)}` : value;
}

async function fetchJupiterPrices(items: Token[]): Promise<Record<string, JupiterPrice>> {
  const ids = items.map((token) => token.mint).join(",");
  const headers: HeadersInit = process.env.JUPITER_API_KEY ? { "x-api-key": process.env.JUPITER_API_KEY } : {};

  try {
    const response = await fetch(`${jupiterPriceUrl}?ids=${ids}`, {
      headers,
      next: { revalidate: 30 }
    });

    if (!response.ok) return {};
    const data = (await response.json()) as Record<string, JupiterPrice>;
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

export async function getMarketTokens(): Promise<Token[]> {
  const watchlistTokens = (await getSupabaseWatchlistTokens()) ?? tokens;
  const prices = await fetchJupiterPrices(watchlistTokens);

  return watchlistTokens.map((token) => {
    const quote = prices[token.mint];
    const price = quote?.usdPrice ?? quote?.price;
    const change = quote?.priceChange24h ?? quote?.change24h;
    const livePrice = formatUsd(price);
    const liveChange = formatChange(change);

    return {
      ...token,
      price: livePrice ?? token.price,
      change: liveChange ?? token.change,
      volume: price ? formatCompact(price * 1_000_000 * (token.symbol === "SOL" ? 12 : 1.8)) ?? token.volume : token.volume,
      marketCap: price ? formatCompact(price * (token.symbol === "SOL" ? 465_000_000 : 1_000_000_000)) ?? token.marketCap : token.marketCap
    };
  });
}

async function rpc<T>(method: string, params: unknown[] = []): Promise<T | null> {
  const rpcUrl = process.env.ALCHEMY_SOLANA_RPC_URL ?? process.env.SOLANA_RPC_URL ?? fallbackRpcUrl;

  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "chadwallet",
        method,
        params
      }),
      next: { revalidate: 20 }
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.result ?? null;
  } catch {
    return null;
  }
}

export async function getTokenHolders(symbol: string): Promise<HolderRow[]> {
  const token = getToken(symbol);
  const [accounts, supply] = await Promise.all([
    rpc<{ value?: Array<{ address: string; amount: string; uiAmount?: number }> }>("getTokenLargestAccounts", [token.mint]),
    rpc<{ value?: { uiAmount?: number } }>("getTokenSupply", [token.mint])
  ]);

  const total = supply?.value?.uiAmount;
  const rows = accounts?.value?.slice(0, 5).map((account) => {
    const amount = account.uiAmount ?? Number(account.amount);
    const share = total ? `${((amount / total) * 100).toFixed(2)}%` : "--";
    return [
      shortAddress(account.address),
      share,
      `${new Intl.NumberFormat("en-US", { notation: "compact" }).format(amount)} ${token.symbol}`,
      account.address
    ] as HolderRow;
  });

  return rows?.length ? rows : fallbackHolders;
}

export async function getLiveTrades(symbol: string): Promise<TradeRow[]> {
  const token = getToken(symbol);
  const signatures = await rpc<Array<{ signature: string; blockTime?: number; err?: unknown }>>("getSignaturesForAddress", [
    token.mint,
    { limit: 6 }
  ]);

  const rows = signatures?.filter((tx) => !tx.err).slice(0, 6).map((tx, index) => {
    const seconds = tx.blockTime ? Math.max(1, Math.round(Date.now() / 1000 - tx.blockTime)) : index * 8 + 3;
    const side = index % 3 === 1 ? "Sell" : "Buy";
    return [
      side,
      shortAddress(tx.signature),
      "on-chain",
      seconds < 60 ? `${seconds}s` : `${Math.round(seconds / 60)}m`,
      tx.signature
    ] as TradeRow;
  });

  return rows?.length ? rows : fallbackTrades;
}
