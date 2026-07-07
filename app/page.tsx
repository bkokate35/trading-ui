import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, CreditCard, Download, Flame, Trophy, Users, Zap } from "lucide-react";
import { AuthActions } from "@/components/AuthActions";
import { Logo } from "@/components/Logo";
import { TokenTicker } from "@/components/TokenTicker";
import { getMarketTokens } from "@/lib/market";
import type { Token } from "@/lib/tokens";

const androidUrl = "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";
const iphoneUrl = "https://apps.apple.com/us/app/chadwallet/id6757367474";
const brandKitUrl = "https://drive.google.com/drive/folders/1j4PZng-sJHxqAATUF1WYw1_jm8nyQwCE";

export const revalidate = 30;

const appScreens = [
  ["/cw/splash.png", "splash"],
  ["/cw/discover.png", "discover"],
  ["/cw/search.png", "search"],
  ["/cw/token.png", "token"],
  ["/cw/portfolio.png", "portfolio"],
  ["/cw/deposit.png", "deposit"],
  ["/cw/launch.png", "launch"],
  ["/cw/kol.png", "kol"],
  ["/cw/x.png", "x social"]
] as const;

const flowScreens = [
  ["/cw/buy-sell.png", "buy and sell"],
  ["/cw/flow-kol.png", "kol flow"],
  ["/cw/flow-launch.png", "launch flow"],
  ["/cw/flow-relaunch.png", "relaunch flow"],
  ["/cw/flow-portfolio.png", "portfolio flow"],
  ["/cw/flow-memecoin.png", "memecoin flow"]
] as const;

function PhoneMockup({
  token,
  imageSrc,
  offset = false
}: {
  token: Token;
  imageSrc: string;
  offset?: boolean;
}) {
  return (
    <div
      className={`relative w-full max-w-[19rem] rounded-[2rem] border border-white/12 bg-white p-2 shadow-2xl ${
        offset ? "translate-y-10 rotate-3" : "-rotate-3"
      }`}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.55rem] bg-black">
        <Image
          alt={`${token.name} ChadWallet app screen`}
          className="h-full w-full object-cover"
          height={760}
          priority={!offset}
          src={imageSrc}
          width={360}
        />
        <div className="absolute left-4 top-4 rounded bg-white px-3 py-1 text-xs font-black text-black">
          {token.symbol} {token.change}
        </div>
      </div>
    </div>
  );
}

function ScreenRail() {
  return (
    <div className="-mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
      <div className="flex w-max animate-marquee gap-4 px-4 sm:px-6 lg:px-8">
        {[...appScreens, ...appScreens].map(([src, label], index) => (
          <div
            className="w-[13.5rem] shrink-0 rounded-[1.45rem] border border-black/10 bg-black p-2 shadow-xl"
            key={`${src}-${index}`}
          >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.05rem] bg-black">
              <Image alt={`ChadWallet ${label} app screen`} className="h-full w-full object-cover" fill sizes="216px" src={src} />
            </div>
            <p className="px-2 py-3 text-xs font-black uppercase text-white/50">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {flowScreens.map(([src, label]) => (
        <div className="rounded border border-white/12 bg-white/[0.08] p-2" key={src}>
          <div className="relative aspect-[9/16] overflow-hidden rounded bg-black">
            <Image alt={`ChadWallet ${label} screen`} className="h-full w-full object-cover" fill sizes="(min-width: 1280px) 33vw, 50vw" src={src} />
          </div>
          <p className="px-2 py-3 text-xs font-black uppercase text-white/42">{label}</p>
        </div>
      ))}
    </div>
  );
}

function WebTerminal({ tokens }: { tokens: Token[] }) {
  return (
    <div className="rounded border border-white/12 bg-white p-2 text-black shadow-2xl">
      <div className="rounded bg-black p-4 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <p className="text-xs font-black uppercase text-white/40">chadwallet web</p>
          <span className="rounded bg-white px-3 py-1 text-xs font-black text-black">NOW AVAILABLE</span>
        </div>
        <div className="grid gap-3 py-4 sm:grid-cols-3">
          {tokens.slice(0, 3).map((token) => (
            <Link
              className="rounded border border-white/10 bg-white/[0.08] p-3 transition hover:bg-white hover:text-black"
              href={`/trade/${token.symbol.toLowerCase()}`}
              key={token.symbol}
            >
              <p className="text-xs font-black uppercase opacity-55">{token.name}</p>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-2xl font-black">{token.symbol}</span>
                <span className="text-sm font-black text-mint">{token.change}</span>
              </div>
              <p className="mt-2 text-sm font-bold opacity-60">{token.price}</p>
            </Link>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_17rem]">
          <div className="min-h-72 rounded border border-white/10 bg-white/[0.08] p-4">
            <p className="text-xs font-black uppercase text-white/40">social orderflow</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                ["/cw/discover.png", "discover"],
                ["/cw/token.png", "token"]
              ].map(([src, label]) => (
                <div className="relative min-h-64 overflow-hidden rounded border border-white/10 bg-black" key={src}>
                  <Image alt={`ChadWallet ${label} screen`} className="h-full w-full object-cover" fill src={src} />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded border border-white/10 bg-volt p-4 text-black">
            <p className="text-xs font-black uppercase text-black/50">one click</p>
            <h3 className="mt-2 text-4xl font-black leading-none">buy before the feed catches up.</h3>
            <Link className="mt-6 inline-flex h-12 w-full items-center justify-center rounded bg-black text-sm font-black text-white" href="/trade/sol">
              start trading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const tokens = await getMarketTokens();
  const lead = tokens[0];
  const second = tokens[1] ?? lead;

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <TokenTicker items={tokens} />
      <section className="relative min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 noise opacity-20" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between py-5">
          <Logo />
          <div className="hidden items-center gap-2 md:flex">
            <Link className="rounded px-3 py-2 text-sm font-black text-white/62 hover:text-white" href="/trade/chad">
              start trading
            </Link>
            <a className="rounded px-3 py-2 text-sm font-black text-white/62 hover:text-white" href={iphoneUrl}>
              app store
            </a>
            <a className="rounded px-3 py-2 text-sm font-black text-white/62 hover:text-white" href={androidUrl}>
              google play
            </a>
            <a className="rounded px-3 py-2 text-sm font-black text-white/62 hover:text-white" href={brandKitUrl}>
              brand kit
            </a>
          </div>
        </nav>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 pb-16 pt-8 lg:min-h-[calc(100vh-130px)] lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded bg-white px-3 py-2 text-sm font-black text-black">
              <Flame className="h-4 w-4" aria-hidden />
              now available on web
            </div>
            <h1 className="max-w-5xl text-balance text-6xl font-black lowercase leading-[0.9] tracking-normal text-white sm:text-8xl lg:text-[8.8rem]">
              where solana traders become legends.
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-bold leading-8 text-white/62">
              From memecoins to viral tokens, discover wallet moves and trade any Solana asset in seconds.
            </p>
            <div className="mt-8">
              <AuthActions />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="inline-flex h-12 items-center justify-center gap-2 rounded bg-volt px-5 text-sm font-black text-black" href="/trade/chad">
                start trading
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/18 px-5 text-sm font-black text-white hover:bg-white/10"
                href={iphoneUrl}
              >
                <Download className="h-4 w-4" aria-hidden />
                download app
              </a>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-2xl justify-center gap-4">
            <PhoneMockup token={lead} imageSrc="/cw/discover.png" />
            <div className="hidden sm:block">
              <PhoneMockup token={second} imageSrc="/cw/token.png" offset />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase text-black/45">trade from anywhere.</p>
          <div className="mt-3 grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-end">
            <h2 className="text-5xl font-black lowercase leading-none sm:text-7xl">never lose a beat.</h2>
            <p className="max-w-2xl text-xl font-bold leading-8 text-black/58">
              Open a trade on mobile, close it on desktop, and follow the wallets moving the market in one ChadWallet loop.
            </p>
          </div>
          <div className="mt-12">
            <WebTerminal tokens={tokens} />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase text-white/40">never miss out again</p>
          <h2 className="mt-3 max-w-4xl text-5xl font-black lowercase leading-none sm:text-7xl">
            the social-first wallet for solana.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [Trophy, "leaderboard", "become a legend, top the token feed"],
              [Users, "feed", "discover and follow top wallets"],
              [Bell, "alerts", "real-time notifications for what the best are buying"],
              [Zap, "one click to buy", "Jupiter quotes directly in the trading flow"],
              [CreditCard, "easy onboarding", "Privy Apple and Google sign in"],
              [Flame, "zero complexity", "Solana-first, fast, and web-ready"]
            ].map(([Icon, label, copy]) => (
              <div className="rounded border border-white/12 bg-white p-5 text-black" key={label as string}>
                <Icon className="h-6 w-6" aria-hidden />
                <p className="mt-8 text-xs font-black uppercase text-black/45">{label as string}</p>
                <h3 className="mt-2 text-3xl font-black lowercase leading-none">{copy as string}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-black sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.58fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase text-black/45">all chadwallet screens</p>
              <h2 className="mt-3 text-5xl font-black lowercase leading-none sm:text-7xl">every moment, one scroll.</h2>
            </div>
            <p className="max-w-2xl text-xl font-bold leading-8 text-black/58 lg:justify-self-end">
              Jump from onboarding to discovery, search, token detail, portfolio, deposits, launchpad, KOL signals, and social context.
            </p>
          </div>
          <div className="mt-12">
            <ScreenRail />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase text-white/40">trade flow</p>
              <h2 className="mt-3 text-5xl font-black lowercase leading-none sm:text-7xl">from signal to position.</h2>
            </div>
            <p className="max-w-2xl text-xl font-bold leading-8 text-white/58 lg:justify-self-end">
              Follow the full loop from buy and sell decisions to KOL tracking, launches, relaunches, portfolio checks, and memecoin entries.
            </p>
          </div>
          <FlowGrid />
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-black sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-black/45">motion asset</p>
            <h2 className="mt-3 text-5xl font-black lowercase leading-none sm:text-7xl">watch chadwallet move.</h2>
            <p className="mt-6 max-w-xl text-xl font-bold leading-8 text-black/58">
              Built for the trader who wants the feed, the wallet, and the trade button to feel like the same place.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              <div className="flex aspect-square items-center justify-center rounded border border-black/10 bg-black p-6">
                <Image alt="ChadWallet dark logo asset" height={160} src="/cw/logo-dark.png" width={160} />
              </div>
              <div className="flex aspect-square items-center justify-center rounded border border-black/10 bg-white p-6">
                <Image alt="ChadWallet light logo asset" height={160} src="/cw/logo-light.png" width={160} />
              </div>
            </div>
          </div>
          <div className="rounded bg-black p-2 shadow-2xl">
            <video
              autoPlay
              className="aspect-video w-full rounded object-cover"
              loop
              muted
              playsInline
              poster="/cw/discover.png"
              src="/cw/chadwallet.mp4"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-black sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <h2 className="text-6xl font-black lowercase leading-none sm:text-8xl">a trading app for the rest of us.</h2>
            <p className="mt-6 max-w-2xl text-xl font-bold text-black/58">
              Join the Solana traders making their name on ChadWallet.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a className="inline-flex h-12 items-center justify-center rounded bg-black px-5 text-sm font-black text-white" href={androidUrl}>
              download app
            </a>
            <Link className="inline-flex h-12 items-center justify-center rounded bg-volt px-5 text-sm font-black text-black" href="/trade/chad">
              start trading
            </Link>
          </div>
        </div>
      </section>
      <TokenTicker reverse items={tokens} />
    </main>
  );
}
