import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SwapPanel } from "@/components/SwapPanel";
import { TokenTicker } from "@/components/TokenTicker";
import { TradingViewChart } from "@/components/TradingViewChart";
import { getLiveTrades, getMarketTokens, getTokenHolders } from "@/lib/market";
import { getToken } from "@/lib/tokens";

type TradePageProps = {
  params: Promise<{ symbol: string }>;
};

export const revalidate = 20;

export default async function TradePage({ params }: TradePageProps) {
  const { symbol } = await params;
  const [tokens, holders, trades] = await Promise.all([
    getMarketTokens(),
    getTokenHolders(symbol),
    getLiveTrades(symbol)
  ]);
  const active = tokens.find((token) => token.symbol.toLowerCase() === symbol.toLowerCase()) ?? getToken(symbol);

  return (
    <main className="min-h-screen bg-ink text-white">
      <TokenTicker items={tokens} />
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Logo />
        <Link
          className="inline-flex h-10 items-center gap-2 rounded border border-white/10 px-3 text-sm font-bold text-white/70 transition hover:border-volt hover:text-white"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Landing
        </Link>
      </nav>

      <section className="mx-auto grid max-w-[1500px] gap-4 px-4 pb-10 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)_340px] lg:px-8">
        <aside className="rounded border border-white/10 bg-white/[0.05] p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase text-white/56">Trending</h2>
            <span className="text-xs font-bold text-mint">Live</span>
          </div>
          <div className="space-y-2">
            {tokens.map((token) => (
              <Link
                className={`flex items-center justify-between rounded p-3 transition ${
                  token.symbol === active.symbol ? "bg-volt text-ink" : "bg-white/[0.05] text-white hover:bg-white/10"
                }`}
                href={`/trade/${token.symbol.toLowerCase()}`}
                key={token.symbol}
              >
                <span>
                  <span className="block text-sm font-black">{token.symbol}</span>
                  <span className={`block text-xs ${token.symbol === active.symbol ? "text-ink/60" : "text-white/45"}`}>
                    {token.name}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-black">{token.price}</span>
                  <span className={`block text-xs font-bold ${token.symbol === active.symbol ? "text-ink" : "text-mint"}`}>
                    {token.change}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </aside>

        <section className="space-y-4">
          <div className="rounded border border-white/10 bg-white/[0.05] p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-bold text-white/45">Solana token</p>
                <h1 className="mt-1 text-4xl font-black text-white">{active.name}</h1>
                <p className="mt-2 text-white/60">
                  {active.symbol} is moving across ChadWallet discovery, holders, and live trade flow.
                </p>
              </div>
              <div className="rounded border border-white/10 bg-black/20 p-4 text-right">
                <p className="text-3xl font-black text-white">{active.price}</p>
                <p className="text-sm font-black text-mint">{active.change}</p>
              </div>
            </div>
            <div className="mt-5">
              <TradingViewChart symbol={active.tradingViewSymbol} />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded border border-white/10 bg-white/[0.05] p-5">
              <h2 className="text-lg font-black">Top holders</h2>
              <div className="mt-4 space-y-3">
                {holders.map(([wallet, share, pnl]) => (
                  <div className="flex items-center justify-between rounded bg-black/20 p-3" key={wallet}>
                    <span className="font-mono text-sm text-white/70">{wallet}</span>
                    <span className="text-sm font-bold text-white">{share}</span>
                    <span className="text-sm font-bold text-mint">{pnl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-white/10 bg-white/[0.05] p-5">
              <h2 className="text-lg font-black">Live trades</h2>
              <div className="mt-4 space-y-3">
                {trades.map(([side, amount, value, time], index) => (
                  <div className="grid grid-cols-[64px_1fr_auto_40px] items-center gap-3 rounded bg-black/20 p-3" key={`${side}-${index}`}>
                    <span className={`text-sm font-black ${side === "Buy" ? "text-mint" : "text-lava"}`}>{side}</span>
                    <span className="text-sm text-white/72">{amount}</span>
                    <span className="text-sm font-bold text-white">{value}</span>
                    <span className="text-right text-xs text-white/40">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <SwapPanel token={active} />

          <div className="rounded border border-white/10 bg-white/[0.05] p-5">
            <h2 className="text-lg font-black">Position</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Balance", `0 ${active.symbol}`],
                ["Avg entry", "$0.00"],
                ["PnL", "$0.00"],
                ["MCap", active.marketCap]
              ].map(([label, value]) => (
                <div className="rounded bg-black/20 p-3" key={label}>
                  <p className="text-xs font-bold text-white/42">{label}</p>
                  <p className="mt-1 text-sm font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
      <TokenTicker reverse items={tokens} />
    </main>
  );
}
