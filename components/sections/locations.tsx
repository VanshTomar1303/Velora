"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import type { Location } from "@/types/location";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";

function LocationCard({ location }: { location: Location }) {
  const t = useTranslations("locations");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${location.mapLat},${location.mapLng}`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative">
        <MediaPlaceholder ratio="landscape" src={location.image} label={location.city} className="rounded-none" />
        {location.flagship && (
          <Badge className="absolute left-3 top-3" variant="secondary">
            {t("flagship")}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-display text-xl">{location.city}</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{location.address}</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <a href={`tel:${location.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-primary">
              {location.phone}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{location.hours}</span>
          </li>
        </ul>
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline"
          data-cursor-hover
        >
          <Navigation className="size-4" aria-hidden="true" /> {t("directions")}
        </a>
      </div>
    </div>
  );
}

export function Locations({ locations }: { locations: Location[] }) {
  const t = useTranslations("locations");

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display mt-4 text-4xl sm:text-5xl">{t("heading")}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground">{t("subheading")}</p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, i) => (
            <FadeIn key={location.id} delay={(i % 3) * 0.08}>
              <LocationCard location={location} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
