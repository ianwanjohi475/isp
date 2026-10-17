/**
 * Site icon set — Phosphor Icons (https://phosphoricons.com), a professional open-source library.
 * Feature icons use the two-tone "duotone" style; UI glyphs (arrows, checks, menus) use "bold".
 * Import icons from here instead of the library so the whole site stays consistent.
 */
import type { IconProps, Icon as PhIcon } from "@phosphor-icons/react";
import {
  ArrowRight as PArrowRight,
  ArrowUp as PArrowUp,
  Asterisk as PAsterisk,
  CaretDown as PCaretDown,
  CaretLeft as PCaretLeft,
  CaretRight as PCaretRight,
  Check as PCheck,
  CheckCircle as PCheckCircle,
  CheckSquare as PCheckSquare,
  Clock as PClock,
  Coins as PCoins,
  EnvelopeSimple as PEnvelope,
  Eye as PEye,
  Gauge as PGauge,
  Headset as PHeadset,
  House as PHouse,
  Lightning as PLightning,
  List as PList,
  MapPin as PMapPin,
  Minus as PMinus,
  Package as PPackage,
  PaperPlaneTilt as PPaperPlane,
  Phone as PPhone,
  PhoneCall as PPhoneCall,
  Plus as PPlus,
  RocketLaunch as PRocket,
  ShieldCheck as PShieldCheck,
  Target as PTarget,
  Television as PTelevision,
  WhatsappLogo as PWhatsapp,
  WifiHigh as PWifi,
  WifiSlash as PWifiSlash,
  X as PX,
} from "@phosphor-icons/react/dist/ssr";

export type { IconProps };

function make(Icon: PhIcon, weight: IconProps["weight"]) {
  const Wrapped = (props: IconProps) => <Icon weight={weight} {...props} />;
  Wrapped.displayName = `Icon(${Icon.displayName ?? "phosphor"})`;
  return Wrapped;
}

// Feature icons — duotone
export const Wifi = make(PWifi, "bold");
export const WifiOff = make(PWifiSlash, "duotone");
export const House = make(PHouse, "duotone");
export const Tv = make(PTelevision, "duotone");
export const Phone = make(PPhone, "duotone");
export const PhoneCall = make(PPhoneCall, "duotone");
export const Mail = make(PEnvelope, "duotone");
export const Clock = make(PClock, "duotone");
export const Coins = make(PCoins, "duotone");
export const Eye = make(PEye, "duotone");
export const Target = make(PTarget, "duotone");
export const Gauge = make(PGauge, "duotone");
export const Headset = make(PHeadset, "duotone");
export const PackageCheck = make(PPackage, "duotone");
export const Rocket = make(PRocket, "duotone");
export const ShieldCheck = make(PShieldCheck, "duotone");
export const Zap = make(PLightning, "duotone");
export const MapPin = make(PMapPin, "duotone");
export const MessageCircle = make(PWhatsapp, "duotone");
export const Send = make(PPaperPlane, "duotone");
export const CheckCircle2 = make(PCheckCircle, "duotone");
export const CheckSquare = make(PCheckSquare, "duotone");

// UI glyphs — bold
export const ArrowRight = make(PArrowRight, "bold");
export const ArrowUp = make(PArrowUp, "bold");
export const ChevronLeft = make(PCaretLeft, "bold");
export const ChevronRight = make(PCaretRight, "bold");
export const ChevronDown = make(PCaretDown, "bold");
export const Check = make(PCheck, "bold");
export const Plus = make(PPlus, "bold");
export const Minus = make(PMinus, "bold");
export const Menu = make(PList, "bold");
export const X = make(PX, "bold");
export const Asterisk = make(PAsterisk, "bold");
