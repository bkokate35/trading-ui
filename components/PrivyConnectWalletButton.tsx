"use client";

import { useConnectWallet } from "@privy-io/react-auth";
import { Wallet } from "lucide-react";

export default function PrivyConnectWalletButton() {
  const { connectWallet } = useConnectWallet();

  return (
    <button
      className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-volt text-sm font-black text-black transition hover:bg-black hover:text-white"
      onClick={() => connectWallet()}
    >
      <Wallet className="h-4 w-4" aria-hidden />
      Connect wallet
    </button>
  );
}
