import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link aria-label="ChadWallet home" className="group flex items-center gap-3" href="/">
      <span className="grid h-12 w-12 place-items-center overflow-hidden rounded border border-white/12 bg-black shadow-glow transition group-hover:border-volt">
        <Image
          alt=""
          className="h-full w-full object-cover"
          height={48}
          priority
          src="/cw/logo-dark.png"
          width={48}
        />
      </span>
      <span className="leading-none">
        <span className="block text-xl font-black tracking-normal text-white">ChadWallet</span>
        <span className="mt-1 block text-[0.65rem] font-black uppercase tracking-normal text-volt/80">
          Solana wallet
        </span>
      </span>
    </Link>
  );
}
