import Image from "next/image";
import logo from "../../public/logo.png";
import logoWhite from "../../public/logo-white.png";

export function Logo({ light = false, className = "h-12 w-auto" }: { light?: boolean; className?: string }) {
  return <Image src={light ? logoWhite : logo} alt="SNET Networks" priority className={className} sizes="240px" />;
}
