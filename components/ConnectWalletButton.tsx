"use client";

import dynamic from "next/dynamic";
import { Wallet } from "lucide-react";

const PrivyConnectWalletButton = dynamic(() => import("./PrivyConnectWalletButton"), {
  ssr: false,
  loading: () => <PreviewConnectWalletButton />
});

export function ConnectWalletButton() {
  return process.env.NEXT_PUBLIC_PRIVY_APP_ID ? <PrivyConnectWalletButton /> : <PreviewConnectWalletButton />;
}

function PreviewConnectWalletButton() {
  return (
    <button
      className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-volt text-sm font-black text-black transition hover:bg-black hover:text-white"
      title="Set NEXT_PUBLIC_PRIVY_APP_ID to enable Privy wallet connection"
    >
      <Wallet className="h-4 w-4" aria-hidden />
      Connect wallet
    </button>
  );
}
