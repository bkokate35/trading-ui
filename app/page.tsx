import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Download,
  Flame,
  Shield,
  Smartphone,
  Sparkles,
  Zap
} from "lucide-react";
import { AuthActions } from "@/components/AuthActions";
import { Logo } from "@/components/Logo";
import { MarketChart } from "@/components/MarketChart";
import { TokenTicker } from "@/components/TokenTicker";
import { getMarketTokens } from "@/lib/market";

const androidUrl = "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";
const iphoneUrl = "https://apps.apple.com/us/app/chadwallet/id6757367474";
const brandKitUrl = "https://drive.google.com/drive/folders/1j4PZng-sJHxqAATUF1WYw1_jm8nyQwCE";

export const revalidate = 30;

export default async function Home() {
  const tokens = await getMarketTokens();
  const lead = tokens[0];

  return (
    <main className="min-h-screen overflow-hidden">
      <TokenTicker items={tokens} />
      <section className="relative">
        <div className="absolute inset-0 noise opacity-25" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-2 md:flex">
            <Link className="rounded px-3 py-2 text-sm font-bold text-white/70 hover:text-white" href="/trade/chad">
              Trade
            </Link>
            <a className="rounded px-3 py-2 text-sm font-bold text-white/70 hover:text-white" href={iphoneUrl}>
              iPhone
            </a>
            <a className="rounded px-3 py-2 text-sm font-bold text-white/70 hover:text-white" href={androidUrl}>
              Android
            </a>
            <a className="rounded px-3 py-2 text-sm font-bold text-white/70 hover:text-white" href={brandKitUrl}>
              Brand kit
            </a>
          </div>
        </nav>

        <div className="relative mx-auto grid min-h-[calc(100vh-124px)] max-w-7xl items-center gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded border border-volt/40 bg-volt/10 px-3 py-2 text-sm font-black text-volt">
              <Flame className="h-4 w-4" aria-hidden />
              ChadWallet on Solana
            </div>
            <h1 className="text-balance text-5xl font-black leading-[0.94] tracking-normal text-white sm:text-7xl lg:text-8xl">
              The wallet that makes every trade feel early.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Chase Solana momentum, discover what wallets are buying, and jump from token signal to swap flow before the timeline catches up.
            </p>

            <div className="mt-8">
              <AuthActions />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/14 bg-white/10 px-5 text-sm font-black text-white transition hover:border-volt hover:bg-volt/12"
                href={iphoneUrl}
              >
                <Smartphone className="h-4 w-4" aria-hidden />
                App Store
              </a>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/14 bg-white/10 px-5 text-sm font-black text-white transition hover:border-volt hover:bg-volt/12"
                href={androidUrl}
              >
                <Download className="h-4 w-4" aria-hidden />
                Google Play
              </a>
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-volt px-5 text-sm font-black text-ink transition hover:bg-mint"
                href="/trade/chad"
              >
                Open trading
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-full bg-volt/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/14 bg-white/[0.08] p-3 shadow-2xl backdrop-blur">
              <div className="rounded-[1.45rem] border border-white/10 bg-ink p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white/50">Now trending</p>
                    <h2 className="mt-1 text-3xl font-black text-white">{lead.symbol}</h2>
                  </div>
                  <div className="rounded bg-volt px-3 py-2 text-sm font-black text-ink">{lead.change}</div>
                </div>
                <div className="mt-5">
                  <MarketChart accent={lead.accent} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    ["Price", lead.price],
                    ["Volume", lead.volume],
                    ["Holders", lead.holders]
                  ].map(([label, value]) => (
                    <div className="rounded border border-white/10 bg-white/[0.06] p-3" key={label}>
                      <p className="text-xs font-bold text-white/45">{label}</p>
                      <p className="mt-1 text-sm font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.04] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            [Zap, "Fast Solana swaps", "Jupiter price data with Alchemy-ready RPC plumbing."],
            [Sparkles, "Signal-first discovery", "Rotating token momentum rails, trending feeds, and wallet context."],
            [Shield, "Privy auth path", "Apple and Google sign-in entry points prepared for Privy config."],
            [BadgeCheck, "Brand-kit ready", "Official ChadWallet Drive assets have a public drop zone in /public/brand."]
          ].map(([Icon, title, copy]) => (
            <div className="rounded border border-white/10 bg-ink/56 p-5" key={title as string}>
              <Icon className="h-5 w-5 text-volt" aria-hidden />
              <h3 className="mt-4 text-lg font-black text-white">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{copy as string}</p>
            </div>
          ))}
        </div>
      </section>

      <TokenTicker reverse items={tokens} />
    </main>
  );
}
