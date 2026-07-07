# ChadWallet Preview

FOMO-style ChadWallet landing page plus a bonus Solana trading interface built with Next.js and Tailwind CSS.

## What Is Included

- ChadWallet-branded landing page using `app/dark.png` as the header logo
- iPhone and Android app links
- Apple and Google sign-in flow wired through Privy
- Solana token discovery theme
- Rotating token banners at the top and bottom
- Banner token clicks route to `/trade/[symbol]`
- Trading page with:
  - Trending token list
  - Token info and TradingView chart
  - Top holders from Solana RPC
  - Live on-chain activity from Solana RPC
  - Buy/sell panel with Jupiter quote data
  - User position panel
- Vercel config
- Cloudflare Pages config
- Supabase-backed runtime watchlist with local fallback
- Full ChadWallet asset pack represented in the UI, including app-store screens, flow screens, logo variants, and video

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Privy
- Jupiter APIs
- Solana RPC / Alchemy-compatible RPC
- TradingView widget embed
- Supabase REST API

## Run Locally

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Preview

```powershell
npm run build
npm run start
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

Then fill in what you have:

```env
NEXT_PUBLIC_PRIVY_APP_ID=
JUPITER_API_KEY=
ALCHEMY_SOLANA_RPC_URL=
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Notes:

- `NEXT_PUBLIC_PRIVY_APP_ID` is required for real Privy Apple/Google login.
- `ALCHEMY_SOLANA_RPC_URL` is recommended for reliable Solana holder/activity calls.
- `SOLANA_RPC_URL` falls back to the public Solana endpoint if Alchemy is not set.
- `JUPITER_API_KEY` is optional for the current quote/price setup.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` enable the runtime token watchlist from Supabase.

## Important Files

- `app/page.tsx` - landing page
- `app/trade/[symbol]/page.tsx` - trading page
- `app/api/quote/route.ts` - Jupiter quote endpoint
- `components/Logo.tsx` - ChadWallet logo using `app/dark.png`
- `components/TokenTicker.tsx` - rotating token banners
- `components/SwapPanel.tsx` - buy/sell quote UI
- `components/TradingViewChart.tsx` - TradingView embed
- `lib/tokens.ts` - supported token metadata
- `lib/market.ts` - Jupiter and Solana RPC data layer
- `supabase/schema.sql` - Supabase token watchlist table, policy, and seed data
- `vercel.json` - Vercel config
- `wrangler.toml` - Cloudflare Pages config

## Brand Assets

The provided ChadWallet logo file is used from:

```text
app/dark.png
```

Official ChadWallet assets from `ChadWallet-Assets.zip` are extracted into:

```text
public/chadwallet-assets
public/cw
```

The flattened `public/cw` folder is used by the landing page, header logo, trading page mockups, screen rail, flow gallery, and video section.

Flattened assets currently used:

```text
buy-sell.png
chadwallet.mp4
deposit.png
discover.png
flow-kol.png
flow-launch.png
flow-memecoin.png
flow-portfolio.png
flow-relaunch.png
kol.png
launch.png
logo-dark.png
logo-light.png
portfolio.png
search.png
splash.png
token.png
x.png
```

## Deployment

### Vercel

1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

### Cloudflare Pages

The repository includes `wrangler.toml`. Use Cloudflare Pages with a Next.js-compatible build setup and add the same environment variables.

## Verification

Current checks:

```powershell
npm run build
```

Expected result: production build completes successfully.

## Supabase Runtime Data

When Supabase env vars are present, the app reads enabled tokens from:

```text
public.watchlist_tokens
```

If Supabase is not configured or the request fails, the app falls back to `lib/tokens.ts` so the preview still works.
