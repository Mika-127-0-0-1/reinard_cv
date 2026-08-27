import Image from "next/image";
import { Activity } from "lucide-react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

const STRENGTHS_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`);

export async function WorkEnvironmentSection() {
  const { data: profile } = await sanityFetch({ query: STRENGTHS_QUERY });
  const statCount = profile?.stats?.length || 0;
  const statsGridColumns =
    statCount === 1
      ? "sm:grid-cols-1"
      : statCount === 2
        ? "sm:grid-cols-2"
      : statCount === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : statCount === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : statCount === 5
              ? "sm:grid-cols-2 lg:grid-cols-5"
              : statCount === 6
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <section id="work-environment" className="overflow-hidden bg-[#0d1012] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="section-kicker">Behind the mix</p><h2 className="mt-4 max-w-xl text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Technical focus in real production spaces.</h2></div>
          <p className="max-w-xl text-base leading-7 text-white/60 lg:justify-self-end">A sound engineer’s value is clearest at the controls: reading the room, managing signal flow, and helping the wider team deliver a dependable experience.</p>
        </div>
        <div className="mt-12 grid auto-rows-[240px] gap-4 md:grid-cols-5 md:auto-rows-[390px]">
          <figure className="group relative overflow-hidden rounded-3xl md:col-span-3"><Image src="/images/sound-engineer-at-work.jpeg" alt="Engineer mixing audio during a live production" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><figcaption className="absolute bottom-0 p-6 text-sm font-medium text-white/85">Live production control</figcaption></figure>
          <figure className="group relative overflow-hidden rounded-3xl md:col-span-2"><Image src="/images/sound-desk-laptop.jpeg" alt="Digital sound desk and laptop in a dark control position" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><figcaption className="absolute bottom-0 p-6 text-sm font-medium text-white/85">Digital console workflow</figcaption></figure>
        </div>
        {profile?.stats && profile.stats.length > 0 && <div className={`mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 ${statsGridColumns}`}>
          {profile.stats.map((stat, index) => <article key={`${stat.label}-${index}`} className="bg-[#111416] p-7 md:p-8"><Activity className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-5 text-sm font-medium text-white/65">{stat.label}</h3><p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p></article>)}
        </div>}
      </div>
    </section>
  );
}
