import {
  Barcode,
  FileCheck2,
  Handshake,
  LayoutPanelTop,
  MapPin,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  uk: MapPin,
  batch: Barcode,
  verify: ShieldCheck,
  docs: FileCheck2,
  presentation: LayoutPanelTop,
  traceability: ScanLine,
  verification: ShieldCheck,
  support: Handshake,
  supply: PackageCheck,
};

export function Icon({ name, className = "size-5" }: { name: string; className?: string }) {
  const Cmp = map[name] ?? ShieldCheck;
  return <Cmp aria-hidden className={className} strokeWidth={1.5} />;
}
