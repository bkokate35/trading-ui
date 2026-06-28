"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function PrivyProviderClient({
  appId,
  children
}: {
  appId: string;
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["google", "apple", "wallet"],
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets"
          }
        },
        appearance: {
          theme: "dark",
          accentColor: "#b8ff2c"
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}
