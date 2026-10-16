import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 pt-24">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="container-x relative text-center">
        <WifiOff className="mx-auto h-16 w-16 text-signal-300" />
        <p className="mt-6 font-display text-7xl font-extrabold text-white">404</p>
        <h1 className="mt-3 text-2xl font-bold text-white">Looks like this page lost signal.</h1>
        <p className="mt-3 text-slate-400">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-brand-400">
          Reconnect to home
        </Link>
      </div>
    </section>
  );
}
