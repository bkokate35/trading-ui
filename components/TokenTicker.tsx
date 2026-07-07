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
    <div className="w-full overflow-hidden border-y border-white/10 bg-black py-2.5">
      <div className={`flex min-w-max gap-2 ${reverse ? "ticker-track-reverse" : "ticker-track"}`}>
        {rail.map((token, index) => (
          <Link
            className="group flex h-10 items-center gap-3 rounded border border-white/12 bg-white px-4 text-black transition hover:bg-volt"
            href={`/trade/${token.symbol.toLowerCase()}`}
            key={`${token.symbol}-${index}`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: token.accent, boxShadow: `0 0 18px ${token.accent}` }}
            />
            <span className="text-sm font-black">{token.symbol}</span>
            <span className="text-sm font-bold text-black/55">{token.price}</span>
            <span className="text-sm font-black text-ink">{token.change}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
