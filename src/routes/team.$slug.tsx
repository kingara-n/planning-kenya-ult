import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTeamMember } from "@/data/team";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { 
  ArrowLeft, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  ChevronRight,
  User
} from "lucide-react";

export const Route = createFileRoute("/team/$slug")({
  loader: ({ params }) => {
    const member = getTeamMember(params.slug);
    if (!member) throw notFound();
    return member;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Team Member — Planning Kenya" }] };
    }
    return {
      meta: [
        { title: `${loaderData.name} — Our Team — Planning Kenya` },
        { name: "description", content: `${loaderData.name} acts as ${loaderData.role} at Planning Kenya. Read their full story, studies, and career history.` },
        { property: "og:title", content: `${loaderData.name} — Planning Kenya` },
        { property: "og:description", content: loaderData.bio },
        { property: "og:image", content: loaderData.img }
      ]
    };
  },
  notFoundComponent: () => (
    <main className="bg-[#070b13] min-h-screen text-white flex flex-col justify-between">
      <Nav />
      <section className="px-8 md:px-16 pt-40 pb-32 max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-thin">Team Member Not Found</h1>
        <p className="text-white/60 font-light">The requested team member story could not be located in our directory.</p>
        <Link to="/team" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors uppercase text-xs tracking-wider">
          <ArrowLeft size={14} />
          <span>Back to Our Team</span>
        </Link>
      </section>
      <Footer />
    </main>
  ),
  component: TeamMemberStoryPage,
});

function TeamMemberStoryPage() {
  const member = Route.useLoaderData();

  return (
    <main className="bg-background min-h-screen text-white overflow-hidden">
      <Nav />

      {/* Top Banner and Breadcrumbs */}
      <section className="px-6 md:px-12 lg:px-20 pt-36 md:pt-40 max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 text-white/45 text-[10px] tracking-[0.25em] uppercase mb-8">
            <Link to="/team" className="hover:text-white transition-colors">Our Team</Link>
            <ChevronRight size={10} />
            <span className="text-white/80">{member.name}</span>
          </div>
        </Reveal>
      </section>

      {/* Primary Section: Portrait & Main Bio */}
      <section className="px-6 md:px-12 lg:px-20 pb-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Portrait Column (Grayscale Portrayed in double-bordered glass frame) */}
          <div className="lg:col-span-4 max-w-sm lg:max-w-none mx-auto lg:mx-0 w-full">
            <Reveal y={30}>
              <div className="relative p-2.5 bg-white/5 border border-white/10 rounded-3xl shadow-xl aspect-[4/5] overflow-hidden">
                <div className="absolute inset-px border border-white/15 rounded-[22px] overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-transform duration-[2000ms] ${
                      member.zoom ? "scale-[1.3] origin-center" : "scale-[1.02]"
                    }`}
                    style={{ filter: "grayscale(100%) contrast(1.03)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bio & Details Column */}
          <div className="lg:col-span-8 flex flex-col justify-center gap-6">
            <Reveal delay={120}>
              <span className="text-[11px] tracking-[0.28em] text-accent-gold uppercase font-normal">
                {member.role}
              </span>
            </Reveal>

            <Reveal delay={200}>
              <h1 
                className="text-4xl md:text-6xl font-extralight text-white leading-[1.05] tracking-tight"
                style={{ fontWeight: 200 }}
              >
                {member.name}
              </h1>
            </Reveal>

            <Reveal delay={280}>
              <div className="h-[1px] w-20 bg-white/20 my-2" />
            </Reveal>

            <Reveal delay={360}>
              <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                {member.bio}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grid: Studies, Academic History, & Professional Career */}
      <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-white/12 max-w-[1400px] mx-auto bg-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          
          {/* Studies Card */}
          <Reveal y={40} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-md">
                <GraduationCap size={18} />
              </div>
              <h3 className="text-lg font-light text-white tracking-wide">Studies</h3>
            </div>
            <ul className="space-y-4">
              {member.studies.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm font-light text-white/70 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Academic History Card */}
          <Reveal y={40} delay={120} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-md">
                <BookOpen size={18} />
              </div>
              <h3 className="text-lg font-light text-white tracking-wide">Academic History</h3>
            </div>
            <ul className="space-y-4">
              {member.academic_history.length > 0 ? (
                member.academic_history.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-light text-white/70 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm font-light text-white/40 italic">
                  Not applicable or proprietary records.
                </li>
              )}
            </ul>
          </Reveal>

          {/* Academic & Professional Career Card */}
          <Reveal y={40} delay={240} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-md">
                <Briefcase size={18} />
              </div>
              <h3 className="text-lg font-light text-white tracking-wide">Academic & Career Highlights</h3>
            </div>
            <ul className="space-y-4">
              {member.academic_career.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm font-light text-white/70 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Bottom Back Navigation Button */}
      <section className="px-6 md:px-12 lg:px-20 pt-12 pb-32 max-w-[1400px] mx-auto border-t border-white/8 flex justify-center">
        <Reveal delay={120}>
          <Link
            to="/team"
            className="group flex items-center justify-center gap-3 px-8 py-3.5 border border-white/20 hover:border-white/45 bg-white/5 hover:bg-white/10 rounded-full text-white text-xs tracking-[0.25em] uppercase transition-all duration-500 shadow-md cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1.5" />
            <span>Back to Our Team</span>
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}


