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
    <div className="rounded border border-white/12 bg-white p-5 text-black">
      <div className="grid grid-cols-2 rounded bg-black p-1">
        <button className="h-10 rounded bg-volt text-sm font-black text-black">buy</button>
        <button className="h-10 rounded text-sm font-black text-white/60">sell</button>
      </div>

      <label className="mt-5 block text-xs font-black uppercase text-black/45">you pay</label>
      <div className="mt-2 flex h-14 items-center justify-between rounded border border-black/10 bg-black px-3 text-white">
        <input
          className="w-full bg-transparent text-xl font-black outline-none"
          inputMode="decimal"
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
        />
        <button className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-sm font-black text-black">
          SOL
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <label className="mt-4 block text-xs font-black uppercase text-black/45">you receive</label>
      <div className="mt-2 flex h-14 items-center justify-between rounded border border-black/10 bg-black px-3 text-white">
        <input className="w-full bg-transparent text-xl font-black outline-none" readOnly value={outAmount} />
        <button className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-sm font-black text-black">
          {token.symbol}
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <p className="mt-3 text-xs font-black uppercase text-black/45">{routeLabel}</p>
      <ConnectWalletButton />
    </div>
  );
}
