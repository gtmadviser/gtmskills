import type { Tier } from "@/data/catalog";

const styles: Record<Tier, string> = {
  house: "bg-accent text-accent-ink",
  vetted: "border border-accent/40 text-accent",
  open: "border border-line text-muted",
};

const labels: Record<Tier, string> = {
  house: "House",
  vetted: "Vetted",
  open: "Open",
};

export function TierPill({ tier }: { tier: Tier }) {
  return (
    <span
      className={`inline-flex rounded-sm px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase ${styles[tier]}`}
    >
      {labels[tier]}
    </span>
  );
}
