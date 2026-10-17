import Link from "next/link";
import { WifiOff } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="section-space bg-soft">
      <div className="container-x text-center">
        <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-50 text-primary-500">
          <WifiOff className="h-11 w-11" />
        </span>
        <p className="mt-8 text-[120px] font-semibold leading-none text-navy-900">404</p>
        <h1 className="mt-4 text-3xl">Oops! This page lost its signal.</h1>
        <p className="mt-3">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="btn-primary mt-9">Back to home</Link>
      </div>
    </section>
  );
}
