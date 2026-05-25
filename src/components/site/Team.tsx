import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";
import { departments, Member } from "@/data/team";

export function Team() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <section className="px-6 md:px-12 lg:px-20 pt-36 md:pt-44 pb-32 max-w-[1400px] mx-auto">
      <Reveal>
        <p className="text-xs tracking-[0.32em] text-white/55 mb-6">OUR TEAM</p>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="text-5xl md:text-7xl font-thin leading-[1.02] tracking-tight max-w-3xl text-white">
          The people behind the work.
        </h1>
      </Reveal>
      <Reveal delay={240}>
        <p className="text-base md:text-lg text-white/70 font-light max-w-xl mt-8">
          Architects, planners, interior designers and engineers united by a love of
          considered space — organised across five active divisions.
        </p>
      </Reveal>

      <div className="mt-24 space-y-20">
        {departments.map((d, di) => (
          <div
            key={d.title}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 border-t border-white/12 pt-12"
          >
            <div className="lg:col-span-3">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-thin leading-tight tracking-tight text-white">
                  {d.title}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-3 text-xs tracking-[0.24em] text-white/45 uppercase">
                  {String(di + 1).padStart(2, "0")} / {String(departments.length).padStart(2, "0")}
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {d.members.map((m, i) => (
                <MemberCard key={m.name} m={m} delay={i * 90} onClick={() => setSelectedMember(m)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <DialogPrimitive.Root
        open={!!selectedMember}
        onOpenChange={(open) => !open && setSelectedMember(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[100] pk-backdrop-blur" />
          <DialogPrimitive.Content 
            className="pk-glass-pop fixed left-1/2 top-1/2 z-[101] w-[92vw] max-w-3xl rounded-3xl p-6 md:p-8 outline-none -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto pk-no-scrollbar"
            aria-describedby={undefined}
          >
            {selectedMember && <MemberDialog m={selectedMember} onClose={() => setSelectedMember(null)} />}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}

function MemberCard({ m, delay, onClick }: { m: Member; delay: number; onClick: () => void }) {
  return (
    <Reveal delay={delay} y={24} className="group">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open profile for ${m.name}`}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-white/5">
          <img
            src={m.img}
            alt={m.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] ${
              m.zoom ? "scale-[1.4] origin-center" : ""
            }`}
            style={{ filter: "grayscale(100%) contrast(1.02)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="pt-4">
          <div className="text-white text-lg font-light tracking-tight group-hover:text-pk-gold transition-colors">{m.name}</div>
          <div className="text-white/55 text-xs tracking-[0.18em] uppercase mt-1">{m.role}</div>
        </div>
      </button>
    </Reveal>
  );
}

function MemberDialog({ m, onClose }: { m: Member; onClose: () => void }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
      <div className="md:col-span-2">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-white/5">
          <img
            src={m.img}
            alt={m.name}
            className={`absolute inset-0 w-full h-full object-cover ${m.zoom ? "scale-[1.4] origin-center" : ""}`}
            style={{ filter: "grayscale(100%) contrast(1.04)" }}
          />
        </div>
      </div>
      <div className="md:col-span-3 flex flex-col justify-center">
        <DialogPrimitive.Title asChild>
          <h3 className="text-3xl md:text-4xl font-thin tracking-tight text-white leading-[1.05]">
            {m.name}
          </h3>
        </DialogPrimitive.Title>
        <div className="text-xs tracking-[0.22em] uppercase text-white/55 mt-3">
          {m.role}
        </div>
        <div className="h-px w-12 bg-white/30 my-5" />
        <p className="text-white/80 font-light leading-relaxed text-[15px] md:text-base">
          {m.bio}
        </p>
        <div className="mt-7">
          <Link
            to="/team/$slug"
            params={{ slug: m.slug }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-white/90 text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
          >
            View Their Full Story
            <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
          </Link>
        </div>
      </div>
      <DialogPrimitive.Close
        onClick={onClose}
        className="absolute -top-2 -right-2 md:top-0 md:right-0 h-9 w-9 rounded-full border border-white/25 bg-white/10 text-white/90 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </div>
  );
}
