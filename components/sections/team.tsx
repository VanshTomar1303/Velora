"use client";

import { useTranslations } from "next-intl";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, staggerItem } from "@/components/animations/stagger-container";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types/team";

export function Team({ members }: { members: TeamMember[] }) {
  const t = useTranslations("team");

  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">{t("heading")}</h2>
          </FadeIn>
        </div>

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <motion.div key={member.id} variants={staggerItem} className="group text-center" data-cursor-hover>
              <div className="relative overflow-hidden rounded-2xl">
                <MediaPlaceholder ratio="portrait" src={member.image} label={member.name} className="transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-end justify-center gap-3 bg-black/40 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {member.social.instagram && (
                    <a href={member.social.instagram} aria-label="Instagram" className="text-white/90 hover:text-primary">
                      <Instagram className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} aria-label="Twitter" className="text-white/90 hover:text-primary">
                      <Twitter className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} aria-label="LinkedIn" className="text-white/90 hover:text-primary">
                      <Linkedin className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="font-display mt-4 text-lg">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
