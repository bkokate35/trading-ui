import type { Metadata } from "next";
import { PrivyProviderClient } from "@/components/PrivyProviderClient";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChadWallet | Solana's main character wallet",
  description:
    "A ChadWallet landing and trading preview with Solana token discovery, Privy sign in, and rotating token banners."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  return (
    <html lang="en">
      <body>
        {privyAppId ? <PrivyProviderClient appId={privyAppId}>{children}</PrivyProviderClient> : children}
      </body>
    </html>
  );
}
