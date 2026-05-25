import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  Briefcase, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  X, 
  Check, 
  FolderOpen,
  MapPin,
  Calendar,
  Layers,
  UploadCloud
} from "lucide-react";
import { categories as initialCategories, Project } from "@/data/portfolio";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [{ title: "Projects CMS — Planning Admin" }],
  }),
});

function ProjectsPage() {
  // Flatten initial projects from categories for easy CMS state manipulation
  const [projects, setProjects] = useState<Project[]>(() => {
    return initialCategories.flatMap(c => c.projects);
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> & { category?: string }>({});
  const [simulatedFiles, setSimulatedFiles] = useState<{ url: string; caption: string }[]>([]);

  // Search & Filter
  const categoriesList = Array.from(new Set(projects.map(p => p.type)));
  
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.client?.toLowerCase().includes(searchQuery.toLowerCase() || "");
    const matchesCategory = selectedCategory === "all" || p.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openForm = (project?: Project) => {
    if (project) {
      setCurrentProject({ ...project, category: project.type });
      setSimulatedFiles(project.gallery ? project.gallery.map(src => ({ url: src, caption: project.title })) : []);
    } else {
      setCurrentProject({
        slug: "",
        title: "",
        type: categoriesList[0] || "Architecture",
        location: "Kenya",
        year: new Date().getFullYear().toString(),
        shortDescription: "",
        description: "",
        img: ""
      });
      setSimulatedFiles([]);
    }
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsEditing(false);
    setCurrentProject({});
  };

  // Simulate file selection
  const triggerFileSimulation = () => {
    const urls = [
      "/assets/project-tower.jpg",
      "/assets/project-villa.jpg",
      "/assets/project-urban.jpg",
      "/assets/project-interior.jpg"
    ];
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    setSimulatedFiles(prev => [...prev, { url: randomUrl, caption: "Supporting Project Photo" }]);
  };

  const setCoverPhoto = (url: string) => {
    setCurrentProject(prev => ({ ...prev, img: url }));
  };

  const removePhoto = (idx: number) => {
    setSimulatedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedProject: Project = {
      slug: currentProject.slug || currentProject.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "new-project",
      title: currentProject.title || "Untitled Project",
      type: currentProject.type || "Architecture",
      location: currentProject.location || "Kenya",
      year: currentProject.year || "2024",
      img: currentProject.img || simulatedFiles[0]?.url || "/assets/project-tower.jpg",
      shortDescription: currentProject.shortDescription || currentProject.description?.slice(0, 100) + "..." || "",
      description: currentProject.description || "",
      gallery: simulatedFiles.map(f => f.url)
    };

    const exists = projects.some(p => p.slug === formattedProject.slug);

    if (exists) {
      setProjects(prev => prev.map(p => p.slug === formattedProject.slug ? formattedProject : p));
    } else {
      setProjects(prev => [formattedProject, ...prev]);
    }

    closeForm();
  };

  const deleteProject = (slug: string) => {
    if (confirm("Are you sure you want to remove this project?")) {
      setProjects(prev => prev.filter(p => p.slug !== slug));
    }
  };

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[10px] tracking-[0.25em] uppercase">
            <Briefcase size={12} />
            <span>ARCHITECTURAL PORTFOLIO</span>
          </div>
          <h1 className="text-3xl font-extralight text-white tracking-tight">Project Management</h1>
        </div>

        <button
          onClick={() => openForm()}
          className="self-start sm:self-auto flex items-center justify-center gap-2 bg-white text-black font-medium text-sm px-5 py-3 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Control Panel: Filters & Search */}
      <div className="grid md:grid-cols-12 gap-4">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, client, or location..."
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="md:col-span-6 flex gap-2 overflow-x-auto pb-1 pk-no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-3.5 rounded-xl border text-xs tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-white/15 border-white text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/8"
            }`}
          >
            All Sectors
          </button>
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-3.5 rounded-xl border text-xs tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white/15 border-white text-white"
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div 
              key={project.slug} 
              className="pk-glass-pop overflow-hidden rounded-2xl border border-white/10 flex flex-col justify-between group shadow-md"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] bg-white/5 overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 text-[10px] tracking-wider uppercase text-white/80">
                  {project.type}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-light text-white leading-snug group-hover:text-white/95 transition-colors truncate">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/45 text-xs font-light">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {project.year}
                    </span>
                  </div>

                  <p className="text-white/60 font-light text-sm line-clamp-3 leading-relaxed">
                    {project.shortDescription || project.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex gap-2 pt-4 border-t border-hairline bg-black/5 p-2 rounded-xl">
                  <button
                    onClick={() => openForm(project)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 text-white/80 hover:text-white text-xs tracking-wider uppercase rounded-lg transition-all cursor-pointer"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteProject(project.slug)}
                    className="flex items-center justify-center h-8.5 w-8.5 rounded-lg border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-300 hover:text-red-200 transition-all cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full pk-glass-pop p-16 rounded-2xl border border-white/10 shadow-lg text-center space-y-4">
            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center mx-auto text-white/40">
              <FolderOpen size={22} />
            </div>
            <h3 className="text-lg font-light text-white">No projects found</h3>
            <p className="text-white/40 font-light text-sm max-w-sm mx-auto leading-relaxed">
              We couldn't find any projects matching your search criteria. Try modifying your search or select another sector.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Slide-Over Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          {/* Overlay background */}
          <div 
            onClick={closeForm}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Form Workspace Slideout */}
          <div className="relative w-full max-w-2xl bg-background border-l border-hairline h-full flex flex-col justify-between z-10 animate-pk-backdrop-in">
            {/* Form Title bar */}
            <div className="p-6 border-b border-hairline flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-light">CMS FORM EDITOR</span>
                <h2 className="text-xl font-light text-white">
                  {currentProject.slug ? "Modify Project Record" : "Add Project to Portfolio"}
                </h2>
              </div>
              <button 
                onClick={closeForm}
                className="p-2 rounded-lg bg-white/5 border border-hairline text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form id="project-form" onSubmit={saveProject} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.title || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Lonrho House Refit"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                  />
                </div>

                {/* Sector / Category Type */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Sector Category
                  </label>
                  <select
                    value={currentProject.type || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all font-light text-sm cursor-pointer"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Hospitality">Hospitality</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>

                {/* Completion Year */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.year || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="e.g. 2024"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                  />
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Location / City
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProject.location || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Nairobi, Kenya"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                  />
                </div>

                {/* Descriptions */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Detailed Project Description
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={currentProject.description || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Write detailed design criteria, constraints, and solutions..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm resize-none"
                  />
                </div>
              </div>

              {/* Photo Galleries Workspace */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-normal text-white mb-1">Image Gallery Management</h3>
                  <p className="text-white/40 text-xs font-light">Upload high-res photos and set the primary cover thumbnail.</p>
                </div>

                {/* Drop Zone Placeholder */}
                <div 
                  onClick={triggerFileSimulation}
                  className="border border-dashed border-white/20 bg-white/5 hover:bg-white/8 hover:border-white/35 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group text-center"
                >
                  <UploadCloud size={28} className="text-white/40 group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-sm text-white font-normal">Select / Drag and Drop Project Photos</h4>
                    <p className="text-white/35 text-xs font-light mt-1">Supports high-resolution PNG, JPG, or JPEG up to 10MB</p>
                  </div>
                </div>

                {/* Thumbnail Previews */}
                {simulatedFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {simulatedFiles.map((file, idx) => {
                      const isCover = currentProject.img === file.url || (!currentProject.img && idx === 0);
                      return (
                        <div 
                          key={idx} 
                          className={`relative overflow-hidden rounded-xl border aspect-video group bg-black/10 ${
                            isCover ? "border-white/90" : "border-white/10"
                          }`}
                        >
                          <img src={file.url} alt="" className="w-full h-full object-cover" />
                          
                          {/* Banner actions overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => setCoverPhoto(file.url)}
                              className={`p-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                                isCover 
                                  ? "bg-white border-white text-black" 
                                  : "bg-black/60 border-white/20 text-white hover:bg-black/80"
                              }`}
                            >
                              <Check size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/60 hover:bg-red-500 text-white cursor-pointer transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>

                          {/* Cover badge */}
                          {isCover && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white text-black text-[8px] tracking-wider uppercase font-semibold">
                              Cover
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </form>

            {/* Footer Buttons */}
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
                form="project-form"
                className="flex-1 py-3 bg-white text-black hover:bg-white/90 font-medium text-sm tracking-wide rounded-xl transition-all cursor-pointer shadow-md"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
