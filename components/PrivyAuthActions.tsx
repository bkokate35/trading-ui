"use client";

import { useLoginWithOAuth } from "@privy-io/react-auth";
import { Apple, Chrome } from "lucide-react";

export default function PrivyAuthActions() {
  const { initOAuth, loading } = useLoginWithOAuth();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/14 bg-white text-sm font-black text-ink transition hover:bg-volt disabled:cursor-wait disabled:opacity-70"
        disabled={loading}
        onClick={() => void initOAuth({ provider: "apple" })}
      >
        <Apple className="h-4 w-4" aria-hidden />
        Sign in with Apple
      </button>
      <button
        className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/14 bg-white/10 px-5 text-sm font-black text-white transition hover:border-volt hover:bg-volt/12 disabled:cursor-wait disabled:opacity-70"
        disabled={loading}
        onClick={() => void initOAuth({ provider: "google" })}
      >
        <Chrome className="h-4 w-4" aria-hidden />
        Sign in with Google
      </button>
    </div>
  );
}
