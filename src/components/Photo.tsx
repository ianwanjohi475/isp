import Image, { type StaticImageData } from "next/image";

export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" className={`object-cover ${imgClassName}`} />
    </div>
  );
}
