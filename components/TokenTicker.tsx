import Link from "next/link";
import { tokens as fallbackTokens, type Token } from "@/lib/tokens";

type TokenTickerProps = {
  reverse?: boolean;
  items?: Token[];
};

export function TokenTicker({ reverse = false, items = fallbackTokens }: TokenTickerProps) {
  const tokens = items.length ? items : fallbackTokens;
  const rail = [...tokens, ...tokens, ...tokens, ...tokens];

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-ink/82 py-3 backdrop-blur">
      <div className={`flex min-w-max gap-3 ${reverse ? "ticker-track-reverse" : "ticker-track"}`}>
        {rail.map((token, index) => (
          <Link
            className="group flex h-11 items-center gap-3 rounded border border-white/10 bg-white/[0.06] px-4 transition hover:border-volt hover:bg-volt/12"
            href={`/trade/${token.symbol.toLowerCase()}`}
            key={`${token.symbol}-${index}`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: token.accent, boxShadow: `0 0 18px ${token.accent}` }}
            />
            <span className="text-sm font-black text-white">{token.symbol}</span>
            <span className="text-sm text-white/60">{token.price}</span>
            <span className="text-sm font-bold text-mint">{token.change}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
