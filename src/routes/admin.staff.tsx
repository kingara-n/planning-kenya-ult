import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  UploadCloud,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  Bookmark
} from "lucide-react";

export const Route = createFileRoute("/admin/staff")({
  component: StaffRosterPage,
  head: () => ({
    meta: [{ title: "Staff Roster CMS — Planning Admin" }],
  }),
});

interface Member {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  img: string;
}

function StaffRosterPage() {
  // Bootstrapped staff roster from initial site departments list
  const [roster, setRoster] = useState<Member[]>([
    {
      id: "1",
      name: "Henry Musangi",
      role: "Managing Director",
      department: "Architectural Staff",
      img: "/assets/images/staff/HENRY-MUSANGI-Copy.jpg",
      bio: "Henry leads Planning Systems Services with three decades of experience shaping civic, commercial and residential architecture across East Africa. He balances rigorous planning discipline with a quiet, contextual design sensibility, guiding the practice's long-term vision and client relationships."
    },
    {
      id: "2",
      name: "Mumo Musuva",
      role: "Director",
      department: "Architectural Staff",
      img: "/assets/images/staff/MUMO-MUSUVA-min.jpg",
      bio: "Mumo brings deep expertise in large-scale architectural delivery, overseeing complex briefs from concept through completion. His work focuses on integrating environmental responsibility with the cultural and material context of each site."
    },
    {
      id: "3",
      name: "Susan Makhulo",
      role: "Studio Director",
      department: "Architectural Staff",
      img: "/assets/images/staff/sus-min.jpg",
      bio: "Susan directs the studio's day-to-day creative output, ensuring every project meets the practice's standards for craft and clarity. She mentors emerging architects and shapes the design culture across all four divisions."
    },
    {
      id: "4",
      name: "William Omondi",
      role: "Graphics Lead",
      department: "Arts & Graphics",
      img: "/assets/images/staff/William-Omondi2-min.jpg",
      bio: "William shapes how Planning Systems' work is communicated — from project visualisations and presentation books to wayfinding and brand systems. His craft brings precision and warmth to every visual the studio sends out."
    },
    {
      id: "5",
      name: "Moses Kinyanjui",
      role: "Director of Finance and Operations",
      department: "Finance",
      img: "/assets/images/staff/Moses-min.jpg",
      bio: "Moses oversees the firm's financial strategy and operational health, keeping projects resourced and the business resilient. His steady stewardship gives the design teams the freedom to focus on the work."
    },
    {
      id: "6",
      name: "Victoria Awiti",
      role: "Associate Director, HR",
      department: "Human Resources & Administration",
      img: "/assets/images/staff/Victoria-Awiti-Copy.jpg",
      bio: "Victoria leads people and culture at Planning Systems, building the structures that support a multidisciplinary studio. His work spans recruitment, professional development and the rituals that keep the team connected."
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Partial<Member>>({});
  const [simulatedAvatar, setSimulatedAvatar] = useState("");

  const departments = ["Architectural Staff", "Arts & Graphics", "Finance", "Human Resources & Administration", "Information Technology"];

  const filteredRoster = roster.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "all" || m.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const openForm = (member?: Member) => {
    if (member) {
      setCurrentMember(member);
      setSimulatedAvatar(member.img);
    } else {
      setCurrentMember({
        id: "",
        name: "",
        role: "",
        department: departments[0],
        bio: "",
        img: ""
      });
      setSimulatedAvatar("");
    }
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsEditing(false);
    setCurrentMember({});
  };

  const triggerAvatarSimulation = () => {
    const avatars = [
      "/assets/images/staff/HENRY-MUSANGI-Copy.jpg",
      "/assets/images/staff/MUMO-MUSUVA-min.jpg",
      "/assets/images/staff/sus-min.jpg",
      "/assets/images/staff/Moses-min.jpg",
      "/assets/images/staff/Victoria-Awiti-Copy.jpg"
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setSimulatedAvatar(randomAvatar);
  };

  const saveMember = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMember: Member = {
      id: currentMember.id || Date.now().toString(),
      name: currentMember.name || "Unnamed Member",
      role: currentMember.role || "Designer",
      department: currentMember.department || "Architectural Staff",
      bio: currentMember.bio || "",
      img: simulatedAvatar || "/assets/images/staff/HENRY-MUSANGI-Copy.jpg"
    };

    const exists = roster.some(m => m.id === formattedMember.id);

    if (exists) {
      setRoster(prev => prev.map(m => m.id === formattedMember.id ? formattedMember : m));
    } else {
      setRoster(prev => [formattedMember, ...prev]);
    }

    closeForm();
  };

  const deleteMember = (id: string) => {
    if (confirm("Are you sure you want to remove this staff member from the roster?")) {
      setRoster(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[10px] tracking-[0.25em] uppercase">
            <Users size={12} />
            <span>ORGANIZATIONAL ROSTER</span>
          </div>
          <h1 className="text-3xl font-extralight text-white tracking-tight">Staff Management</h1>
        </div>

        <button
          onClick={() => openForm()}
          className="self-start sm:self-auto flex items-center justify-center gap-2 bg-white text-black font-medium text-sm px-5 py-3 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
        >
          <Plus size={16} />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Controllers: Search & Filter */}
      <div className="grid md:grid-cols-12 gap-4">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roster by name, title, role..."
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
          />
        </div>

        {/* Department select filter */}
        <div className="md:col-span-6 flex gap-2 overflow-x-auto pb-1 pk-no-scrollbar">
          <button
            onClick={() => setSelectedDept("all")}
            className={`px-4 py-3.5 rounded-xl border text-xs tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
              selectedDept === "all"
                ? "bg-white/15 border-white text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/8"
            }`}
          >
            All Divisions
          </button>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-3.5 rounded-xl border text-xs tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === dept
                  ? "bg-white/15 border-white text-white"
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              {dept.split(" & ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoster.map(member => (
          <div 
            key={member.id} 
            className="pk-glass-pop overflow-hidden rounded-2xl border border-white/10 flex flex-col justify-between group shadow-md"
          >
            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              {/* Profile details */}
              <div className="flex gap-4 items-start">
                {/* Visual Avatar */}
                <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0 relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                    style={{ filter: "grayscale(100%) contrast(1.02)" }}
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-base font-normal text-white group-hover:text-white/95 transition-colors truncate">
                    {member.name}
                  </h3>
                  <p className="text-white/45 text-[10px] tracking-wider uppercase truncate">{member.role}</p>
                  <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/65 font-light">
                    {member.department}
                  </span>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-white/60 font-light text-xs leading-relaxed line-clamp-4 flex-1">
                {member.bio}
              </p>

              {/* Roster actions */}
              <div className="flex gap-2 pt-4 border-t border-hairline bg-black/5 p-2 rounded-xl">
                <button
                  onClick={() => openForm(member)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 text-white/80 hover:text-white text-xs tracking-wider uppercase rounded-lg transition-all cursor-pointer"
                >
                  <Edit3 size={13} />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => deleteMember(member.id)}
                  className="flex items-center justify-center h-8.5 w-8.5 rounded-lg border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-300 hover:text-red-200 transition-all cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roster Add / Edit Modal Drawer */}
      {isEditing && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          {/* Overlay */}
          <div 
            onClick={closeForm}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Form Workspace Slideout */}
          <div className="relative w-full max-w-xl bg-background border-l border-hairline h-full flex flex-col justify-between z-10 animate-pk-backdrop-in">
            {/* Header */}
            <div className="p-6 border-b border-hairline flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-light">CMS FORM EDITOR</span>
                <h2 className="text-xl font-light text-white">
                  {currentMember.id ? "Modify Staff Record" : "Add Staff Roster Member"}
                </h2>
              </div>
              <button 
                onClick={closeForm}
                className="p-2 rounded-lg bg-white/5 border border-hairline text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form id="staff-form" onSubmit={saveMember} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Profile Photo Upload simulated zone */}
              <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="h-20 w-20 rounded-2xl bg-black/20 border border-white/15 overflow-hidden shrink-0 relative flex items-center justify-center">
                  {simulatedAvatar ? (
                    <img 
                      src={simulatedAvatar} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      style={{ filter: "grayscale(100%) contrast(1.02)" }}
                    />
                  ) : (
                    <Users size={28} className="text-white/20 animate-pulse" />
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-normal text-white">Profile Avatar Photo</h4>
                  <button
                    type="button"
                    onClick={triggerAvatarSimulation}
                    className="flex items-center justify-center gap-2 py-2 px-3 border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs tracking-wider uppercase rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    <UploadCloud size={14} />
                    <span>Upload Photo</span>
                  </button>
                </div>
              </div>

              {/* Roster fields */}
              <div className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={currentMember.name || ""}
                    onChange={(e) => setCurrentMember(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Henry Musangi"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={currentMember.role || ""}
                    onChange={(e) => setCurrentMember(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g. Associate Architect"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                  />
                </div>

                {/* Department select */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Organizational Division
                  </label>
                  <select
                    value={currentMember.department || ""}
                    onChange={(e) => setCurrentMember(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all font-light text-sm cursor-pointer"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Biographical Summary */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Biographical Short Summary
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={currentMember.bio || ""}
                    onChange={(e) => setCurrentMember(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Write a brief professional summary focusing on project specializations..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm resize-none"
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-hairline bg-black/10 flex gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 text-white text-sm font-light tracking-wide rounded-xl transition-all cursor-pointer"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                form="staff-form"
                className="flex-1 py-3 bg-white text-black hover:bg-white/90 font-medium text-sm tracking-wide rounded-xl transition-all cursor-pointer shadow-md"
              >
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
