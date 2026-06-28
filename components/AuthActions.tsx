"use client";

import dynamic from "next/dynamic";
import { Apple, Chrome } from "lucide-react";

const PrivyAuthActions = dynamic(() => import("./PrivyAuthActions"), {
  ssr: false,
  loading: () => <PreviewAuthActions />
});

export function AuthActions() {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    return <PreviewAuthActions />;
  }

  return <PrivyAuthActions />;
}

function PreviewAuthActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/14 bg-white text-sm font-black text-ink transition hover:bg-volt"
        title="Set NEXT_PUBLIC_PRIVY_APP_ID to enable Privy OAuth"
      >
        <Apple className="h-4 w-4" aria-hidden />
        Sign in with Apple
      </button>
      <button
        className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/14 bg-white/10 px-5 text-sm font-black text-white transition hover:border-volt hover:bg-volt/12"
        title="Set NEXT_PUBLIC_PRIVY_APP_ID to enable Privy OAuth"
      >
        <Chrome className="h-4 w-4" aria-hidden />
        Sign in with Google
      </button>
      <span className="sr-only">Authentication is designed to connect through Privy.</span>
    </div>
  );
}
