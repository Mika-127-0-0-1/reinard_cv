import Image from "next/image";
import Link from "next/link";
import { ArrowDown, CheckCircle2, MapPin, Radio, Send } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandTiktok,
  IconBrandYoutube,
  IconWorld,
} from "@tabler/icons-react";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { LayoutTextFlip } from "../ui/layout-text-flip";

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  headlineStaticText,
  headlineAnimatedWords,
  headlineAnimationDuration,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`);
const CTA_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "singleton-siteSettings"][0]{ctaText, ctaUrl}`);
const availabilityLabels: Record<string, string> = { available: "Available for hire", open: "Open to opportunities", unavailable: "Currently unavailable" };

async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });
  const { data: ctaSettings } = await sanityFetch({ query: CTA_QUERY });
  if (!profile) return null;
  const availability = profile.availability ? availabilityLabels[profile.availability] || profile.availability : null;
  const socialLinks = [
    { label: "Instagram", href: profile.socialLinks?.instagram, icon: IconBrandInstagram },
    { label: "Facebook", href: profile.socialLinks?.facebook, icon: IconBrandFacebook },
    { label: "SoundCloud", href: profile.socialLinks?.soundcloud, icon: IconBrandSoundcloud },
    { label: "Spotify", href: profile.socialLinks?.spotify, icon: IconBrandSpotify },
    { label: "YouTube", href: profile.socialLinks?.youtube, icon: IconBrandYoutube },
    { label: "TikTok", href: profile.socialLinks?.tiktok, icon: IconBrandTiktok },
    { label: "LinkedIn", href: profile.socialLinks?.linkedin, icon: IconBrandLinkedin },
    { label: "Website", href: profile.socialLinks?.website, icon: IconWorld },
    { label: "GitHub", href: profile.socialLinks?.github, icon: IconBrandGithub },
  ].filter((item) => Boolean(item.href));

  return (
    <section id="home" className="relative isolate min-h-[94svh] overflow-hidden bg-[#090b0d] text-white">
      <Image src="/images/sound-engineer-at-work.jpeg" alt="Sound engineer operating a live digital mixing console" fill priority sizes="100vw" className="object-cover object-[62%_center] opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,11,13,.98)_0%,rgba(9,11,13,.88)_38%,rgba(9,11,13,.28)_76%,rgba(9,11,13,.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,11,13,1)_0%,transparent_38%)]" />
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-accent to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[94svh] max-w-7xl items-center px-6 py-28 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary"><span className="flex size-9 items-center justify-center rounded-full border border-primary/35 bg-primary/10"><Radio className="size-4" aria-hidden="true" /></span>Live sound · Production audio</div>
          <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">{profile.firstName} <span className="text-primary">{profile.lastName}</span></h1>
          <div className="mt-6 min-h-12 text-xl font-medium text-white/88 sm:text-2xl md:text-3xl">
            {profile.headlineStaticText && profile.headlineAnimatedWords?.length ? <LayoutTextFlip text={profile.headlineStaticText} words={profile.headlineAnimatedWords} duration={profile.headlineAnimationDuration || 3000} className="text-xl font-medium text-white/88 sm:text-2xl md:text-3xl" /> : <p>{profile.headline}</p>}
          </div>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/68 sm:text-lg">{profile.shortBio}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#experience" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">View experience <ArrowDown className="size-4" aria-hidden="true" /></Link>
            <Link href={ctaSettings?.ctaUrl || "#contact"} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/14">{ctaSettings?.ctaText || "Discuss an opportunity"} <Send className="size-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/65">
            {availability && <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" aria-hidden="true" />{availability}</span>}
            {profile.location && <span className="flex items-center gap-2"><MapPin className="size-4 text-primary" aria-hidden="true" />{profile.location}</span>}
            {profile.email && <a className="transition hover:text-white" href={`mailto:${profile.email}`}>{profile.email}</a>}
          </div>
          {socialLinks.length > 0 && <nav aria-label="Social profiles" className="mt-7 flex flex-wrap gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => <Link key={label} href={href!} target="_blank" rel="noopener noreferrer" aria-label={`View ${label} profile`} title={label} className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/65 transition hover:border-primary/60 hover:bg-primary/10 hover:text-primary"><Icon className="size-5" aria-hidden="true" /></Link>)}
          </nav>}
        </div>
        {profile.profileImage && <div className="absolute bottom-10 right-8 hidden items-center gap-3 rounded-full border border-white/15 bg-black/35 p-2 pr-5 backdrop-blur-md xl:flex"><Image src={urlFor(profile.profileImage).width(96).height(96).url()} alt={`${profile.firstName} ${profile.lastName}`} width={52} height={52} className="size-13 rounded-full object-cover" /><div><p className="text-sm font-semibold">{profile.firstName} {profile.lastName}</p><p className="text-xs text-white/55">On the controls</p></div></div>}
      </div>
    </section>
  );
}
export default HeroSection;
