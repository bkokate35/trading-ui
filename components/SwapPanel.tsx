"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import type { Token } from "@/lib/tokens";

type SwapPanelProps = {
  token: Token;
};

export function SwapPanel({ token }: SwapPanelProps) {
  const [amount, setAmount] = useState("1.00");
  const [outAmount, setOutAmount] = useState("...");
  const [routePlan, setRoutePlan] = useState(0);

  useEffect(() => {
    let alive = true;

    async function loadQuote() {
      try {
        const response = await fetch(`/api/quote?symbol=${token.symbol}&amount=${amount}`);
        const quote = await response.json();
        if (!alive) return;

        if (!quote.ok || !quote.outAmount) {
          setOutAmount("quote unavailable");
          setRoutePlan(0);
          return;
        }

        const decimals = token.symbol === "SOL" ? 9 : 6;
        const value = Number(quote.outAmount) / 10 ** decimals;
        setOutAmount(new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value));
        setRoutePlan(quote.routePlan ?? 0);
      } catch {
        if (alive) setOutAmount("quote unavailable");
      }
    }

    loadQuote();
    return () => {
      alive = false;
    };
  }, [amount, token.symbol]);

  const routeLabel = useMemo(() => {
    if (!routePlan) return "Jupiter route pending";
    return `${routePlan} Jupiter route${routePlan === 1 ? "" : "s"}`;
  }, [routePlan]);

  return (
    <div className="rounded border border-white/10 bg-white/[0.05] p-5">
      <div className="grid grid-cols-2 rounded bg-black/30 p-1">
        <button className="h-10 rounded bg-volt text-sm font-black text-ink">Buy</button>
        <button className="h-10 rounded text-sm font-black text-white/60">Sell</button>
      </div>

      <label className="mt-5 block text-xs font-black uppercase text-white/45">You pay</label>
      <div className="mt-2 flex h-14 items-center justify-between rounded border border-white/10 bg-black/24 px-3">
        <input
          className="w-full bg-transparent text-xl font-black outline-none"
          inputMode="decimal"
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
        />
        <button className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-sm font-black">
          SOL
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <label className="mt-4 block text-xs font-black uppercase text-white/45">You receive</label>
      <div className="mt-2 flex h-14 items-center justify-between rounded border border-white/10 bg-black/24 px-3">
        <input className="w-full bg-transparent text-xl font-black outline-none" readOnly value={outAmount} />
        <button className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-sm font-black">
          {token.symbol}
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <p className="mt-3 text-xs font-bold text-white/45">{routeLabel}</p>
      <ConnectWalletButton />
    </div>
  );
}
