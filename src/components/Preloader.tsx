import Image from "next/image";
import mark from "../../public/logo-mark.png";

/** Brief branded intro; fades out by CSS alone (no JS), so it can never block the page. */
export function Preloader() {
  return (
    <div aria-hidden="true" className="preloader pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-wave rounded-full bg-primary-500/30" />
          <span className="absolute inset-0 animate-wave rounded-full bg-primary-500/20 [animation-delay:0.8s]" />
          <Image src={mark} alt="" className="relative h-16 w-16" priority />
        </div>
        <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-primary-50">
          <div className="preloader-bar h-full bg-gradient-to-r from-primary-500 to-sky-brand" />
        </div>
      </div>
    </div>
  );
}
