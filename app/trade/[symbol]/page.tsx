import Image from "next/image";
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
    <main className="min-h-screen bg-black text-white">
      <TokenTicker items={tokens} />
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Logo />
        <Link
          className="inline-flex h-10 items-center gap-2 rounded border border-white/16 bg-white px-3 text-sm font-black text-black transition hover:bg-volt"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          landing
        </Link>
      </nav>

      <section className="mx-auto max-w-[1500px] px-4 pb-6 sm:px-6 lg:px-8">
        <div className="border-y border-white/10 py-6">
          <p className="text-sm font-black uppercase text-white/40">chadwallet trading</p>
          <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h1 className="max-w-4xl text-5xl font-black lowercase leading-none sm:text-7xl">
              trade like the feed is watching.
            </h1>
            <p className="max-w-lg text-lg font-bold leading-7 text-white/55">
              Social-style Solana discovery, live orderflow, and one-click Jupiter quotes in a web app shell.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-4 px-4 pb-10 sm:px-6 lg:grid-cols-[285px_minmax(0,1fr)_350px] lg:px-8">
        <aside className="rounded border border-white/12 bg-white p-3 text-black">
          <div className="mb-3 flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase text-black/50">trending</h2>
            <span className="rounded bg-black px-2 py-1 text-xs font-black text-white">live</span>
          </div>
          <div className="space-y-2">
            {tokens.map((token) => (
              <Link
                className={`flex items-center justify-between rounded p-3 transition ${
                  token.symbol === active.symbol ? "bg-black text-white" : "bg-black/[0.05] text-black hover:bg-volt"
                }`}
                href={`/trade/${token.symbol.toLowerCase()}`}
                key={token.symbol}
              >
                <span>
                  <span className="block text-sm font-black">{token.symbol}</span>
                  <span className={`block text-xs ${token.symbol === active.symbol ? "text-white/50" : "text-black/45"}`}>
                    {token.name}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-black">{token.price}</span>
                  <span className={`block text-xs font-black ${token.symbol === active.symbol ? "text-volt" : "text-black"}`}>
                    {token.change}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </aside>

        <section className="space-y-4">
          <div className="rounded border border-white/12 bg-white p-5 text-black">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-black uppercase text-black/45">solana token</p>
                <h2 className="mt-1 text-5xl font-black lowercase leading-none text-black">{active.name}</h2>
                <p className="mt-2 max-w-xl font-bold text-black/55">
                  {active.symbol} is moving across ChadWallet discovery, holders, and live trade flow.
                </p>
              </div>
              <div className="rounded bg-black p-4 text-right text-white">
                <p className="text-4xl font-black">{active.price}</p>
                <p className="text-sm font-black text-volt">{active.change}</p>
              </div>
            </div>
            <div className="mt-5">
              <TradingViewChart symbol={active.tradingViewSymbol} />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded border border-white/12 bg-white p-5 text-black">
              <h2 className="text-lg font-black lowercase">top holders</h2>
              <div className="mt-4 space-y-3">
                {holders.map(([wallet, share, pnl, fullWallet]) => (
                  <div className="flex items-center justify-between rounded bg-black p-3 text-white" key={wallet}>
                    <span
                      className="cursor-help border-b border-dotted border-white/30 font-mono text-sm text-white/70"
                      title={fullWallet ?? wallet}
                    >
                      {wallet}
                    </span>
                    <span className="text-sm font-black">{share}</span>
                    <span className="text-sm font-black text-volt">{pnl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-white/12 bg-white p-5 text-black">
              <h2 className="text-lg font-black lowercase">live trades</h2>
              <div className="mt-4 space-y-3">
                {trades.map(([side, amount, value, time, fullAmount], index) => (
                  <div className="grid grid-cols-[64px_1fr_auto_40px] items-center gap-3 rounded bg-black p-3 text-white" key={`${side}-${index}`}>
                    <span className={`text-sm font-black ${side === "Buy" ? "text-volt" : "text-lava"}`}>{side}</span>
                    <span className="min-w-0">
                      <span
                        className="cursor-help truncate border-b border-dotted border-white/30 text-sm text-white/72"
                        title={fullAmount ?? amount}
                      >
                        {amount}
                      </span>
                    </span>
                    <span className="text-sm font-black">{value}</span>
                    <span className="text-right text-xs text-white/40">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <SwapPanel token={active} />

          <div className="overflow-hidden rounded border border-white/12 bg-white p-2 text-black">
            <div className="relative aspect-[4/5] overflow-hidden rounded bg-black">
              <Image
                alt="ChadWallet buy and sell app flow"
                className="h-full w-full object-cover"
                fill
                src="/cw/buy-sell.png"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-black uppercase text-black/45">mobile flow</p>
              <h2 className="mt-1 text-2xl font-black lowercase leading-none">buy, sell, and follow the move.</h2>
            </div>
          </div>

          <div className="rounded border border-white/12 bg-white p-5 text-black">
            <h2 className="text-lg font-black lowercase">your position</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Balance", `0 ${active.symbol}`],
                ["Avg entry", "$0.00"],
                ["PnL", "$0.00"],
                ["MCap", active.marketCap]
              ].map(([label, value]) => (
                <div className="rounded bg-black p-3 text-white" key={label}>
                  <p className="text-xs font-black uppercase text-white/42">{label}</p>
                  <p className="mt-1 text-sm font-black">{value}</p>
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
