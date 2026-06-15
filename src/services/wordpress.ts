import { createServerFn } from "@tanstack/react-start";
import { decode } from "html-entities";
import { adventures as staticAdventures } from "../data/adventures";
import { departments as staticDepartments, Dept, Member } from "../data/team";
import { categories as staticCategories, Category, Project } from "../data/portfolio";

export interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
  acf?: {
    location?: string;
    gallery?: Array<{ url: string; title: string } | string>;
  };
}

export interface Adventure {
  slug: string;
  title: string;
  date: string;
  location: string;
  excerpt: string;
  cover: string;
  gallery: { src: string; caption: string }[];
  body: string | string[];
  isWp?: boolean;
}

function formatWpDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch (e) {
    return dateStr;
  }
}

function cleanWpExcerpt(htmlStr: string): string {
  if (!htmlStr) return '';
  const stripped = htmlStr.replace(/<[^>]*>/g, "");
  return decode(stripped).trim();
}

export function mapWpPostToAdventure(post: WpPost): Adventure {
  const title = decode(post.title.rendered);
  const cover = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/assets/images/news/5 Sweden/Artboard 6.png";
  const location = post.acf?.location || "Planning Studio";
  const date = formatWpDate(post.date);
  const excerpt = cleanWpExcerpt(post.excerpt.rendered);

  const rawGallery = post.acf?.gallery || [];
  const gallery = rawGallery.map((img: any) => {
    if (typeof img === 'string') {
      return { src: img, caption: title };
    }
    return {
      src: img.url || img.source_url || '',
      caption: decode(img.title || img.caption || title)
    };
  }).filter((img: any) => !!img.src);

  return {
    slug: post.slug,
    title,
    date,
    location,
    excerpt,
    cover,
    gallery,
    body: post.content.rendered, // HTML string
    isWp: true
  };
}

const getWpApiUrl = () => {
  return process.env.WP_API_URL || 'https://admin.planning-kenya.com/wp-json';
};

export const getAdventuresServer = createServerFn({ method: "GET" })
  .handler(async () => {
    const apiUrl = getWpApiUrl();
    try {
      const res = await fetch(`${apiUrl}/wp/v2/posts?_embed=1&status=publish&per_page=20`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        throw new Error(`WordPress API returned status ${res.status}`);
      }
      const posts: WpPost[] = await res.json();
      return posts.map(mapWpPostToAdventure);
    } catch (error: any) {
      console.warn("WordPress API fetch failed in getAdventuresServer:", error.message || error);
      return null;
    }
  });

export const getAdventureBySlugServer = createServerFn({ method: "GET" })
  .handler(async ({ data: slug }: { data: string }) => {
    const apiUrl = getWpApiUrl();
    try {
      const res = await fetch(`${apiUrl}/wp/v2/posts?_embed=1&slug=${slug}`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        throw new Error(`WordPress API returned status ${res.status}`);
      }
      const posts: WpPost[] = await res.json();
      if (posts.length > 0) {
        return mapWpPostToAdventure(posts[0]);
      }
      return null;
    } catch (error: any) {
      console.warn(`WordPress API fetch for slug "${slug}" failed in getAdventureBySlugServer:`, error.message || error);
      return null;
    }
  });

export async function fetchLiveAdventures(): Promise<Adventure[]> {
  try {
    const wpAdventures = await getAdventuresServer();
    if (wpAdventures && wpAdventures.length > 0) {
      return wpAdventures;
    }
  } catch (err) {
    console.warn("Failed to get WP adventures, falling back to static:", err);
  }
  return staticAdventures;
}

export async function fetchLiveAdventureBySlug(slug: string): Promise<Adventure | null> {
  try {
    const wpAdventure = await getAdventureBySlugServer({ data: slug });
    if (wpAdventure) {
      return wpAdventure;
    }
  } catch (err) {
    console.warn(`Failed to get WP adventure for slug "${slug}", falling back to static:`, err);
  }
  const staticPost = staticAdventures.find((a) => a.slug === slug);
  return staticPost || null;
}

/* Headless CMS Prep: Team & Portfolio integration */

export interface WpTeamMember {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    role?: string;
    department?: string;
    zoom?: boolean;
    studies?: string[];
    academic_history?: string[];
    academic_career?: string[];
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export function mapWpTeamMemberToMember(wp: WpTeamMember): Member & { department: string } {
  const name = decode(wp.title.rendered);
  const img = wp._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/assets/images/staff/HENRY-MUSANGI-Copy.jpg";
  const role = wp.acf?.role || "Team Member";
  const bio = cleanWpExcerpt(wp.content.rendered);
  const department = wp.acf?.department || "Architectural Staff";
  const zoom = !!wp.acf?.zoom;
  const studies = wp.acf?.studies || [];
  const academic_history = wp.acf?.academic_history || [];
  const academic_career = wp.acf?.academic_career || [];

  return {
    slug: wp.slug,
    name,
    role,
    img,
    bio,
    zoom,
    studies,
    academic_history,
    academic_career,
    department
  };
}

export interface WpProject {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    type?: string;
    location?: string;
    year?: string;
    short_description?: string;
    category_slug?: string;
    category_title?: string;
    category_blurb?: string;
    gallery?: Array<{ url: string } | string>;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export function mapWpProjectToProject(wp: WpProject): Project & { category: { slug: string; title: string; blurb: string } } {
  const title = decode(wp.title.rendered);
  const type = wp.acf?.type || "Architecture";
  const location = wp.acf?.location || "Kenya";
  const year = wp.acf?.year || new Date().getFullYear().toString();
  const img = wp._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const shortDescription = wp.acf?.short_description || cleanWpExcerpt(wp.content.rendered).slice(0, 150) + "...";
  const description = cleanWpExcerpt(wp.content.rendered);
  const category_slug = wp.acf?.category_slug || "arts-and-culture";
  const category_title = wp.acf?.category_title || "Arts And Culture";
  const category_blurb = wp.acf?.category_blurb || "Exceptional architecture in the Arts And Culture sector.";

  const rawGallery = wp.acf?.gallery || [];
  const gallery = rawGallery.map((img: any) => {
    if (typeof img === 'string') return img;
    return img.url || '';
  }).filter(Boolean);

  return {
    slug: wp.slug,
    title,
    type,
    location,
    year,
    img,
    shortDescription,
    description,
    gallery,
    category: {
      slug: category_slug,
      title: category_title,
      blurb: category_blurb
    }
  };
}

export const getTeamServer = createServerFn({ method: "GET" })
  .handler(async () => {
    const apiUrl = getWpApiUrl();
    try {
      const res = await fetch(`${apiUrl}/wp/v2/team_member?_embed=1&status=publish&per_page=100`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        throw new Error(`WordPress API returned status ${res.status}`);
      }
      const posts: WpTeamMember[] = await res.json();
      return posts.map(mapWpTeamMemberToMember);
    } catch (error: any) {
      console.warn("WordPress API fetch failed in getTeamServer:", error.message || error);
      return null;
    }
  });

export const getProjectsServer = createServerFn({ method: "GET" })
  .handler(async () => {
    const apiUrl = getWpApiUrl();
    try {
      const res = await fetch(`${apiUrl}/wp/v2/project?_embed=1&status=publish&per_page=100`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        throw new Error(`WordPress API returned status ${res.status}`);
      }
      const posts: WpProject[] = await res.json();
      return posts.map(mapWpProjectToProject);
    } catch (error: any) {
      console.warn("WordPress API fetch failed in getProjectsServer:", error.message || error);
      return null;
    }
  });

export async function fetchLiveTeam(): Promise<Dept[]> {
  try {
    const wpMembers = await getTeamServer();
    if (wpMembers && wpMembers.length > 0) {
      const deptMap: { [key: string]: Member[] } = {};
      wpMembers.forEach((m) => {
        const { department, ...memberData } = m;
        if (!deptMap[department]) {
          deptMap[department] = [];
        }
        deptMap[department].push(memberData);
      });
      return Object.entries(deptMap).map(([title, members]) => ({
        title,
        members
      }));
    }
  } catch (err) {
    console.warn("Failed to get WP team, falling back to static:", err);
  }
  return staticDepartments;
}

export async function fetchLiveProjects(): Promise<Category[]> {
  try {
    const wpProjects = await getProjectsServer();
    if (wpProjects && wpProjects.length > 0) {
      const catMap: { [key: string]: { title: string; blurb: string; projects: Project[] } } = {};
      wpProjects.forEach((p) => {
        const { category, ...projectData } = p;
        if (!catMap[category.slug]) {
          catMap[category.slug] = {
            title: category.title,
            blurb: category.blurb,
            projects: []
          };
        }
        catMap[category.slug].projects.push(projectData);
      });
      return Object.entries(catMap).map(([slug, data]) => ({
        slug,
        title: data.title,
        blurb: data.blurb,
        projects: data.projects
      }));
    }
  } catch (err) {
    console.warn("Failed to get WP projects, falling back to static:", err);
  }
  return staticCategories;
}

export const getTeamMemberBySlugServer = createServerFn({ method: "GET" })
  .handler(async ({ data: slug }: { data: string }) => {
    const apiUrl = getWpApiUrl();
    try {
      const res = await fetch(`${apiUrl}/wp/v2/team_member?_embed=1&slug=${slug}`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        throw new Error(`WordPress API returned status ${res.status}`);
      }
      const posts: WpTeamMember[] = await res.json();
      if (posts.length > 0) {
        return mapWpTeamMemberToMember(posts[0]);
      }
      return null;
    } catch (error: any) {
      console.warn(`WordPress API fetch for team member slug "${slug}" failed:`, error.message || error);
      return null;
    }
  });

export async function fetchLiveTeamMemberBySlug(slug: string): Promise<Member | null> {
  try {
    const wpMember = await getTeamMemberBySlugServer({ data: slug });
    if (wpMember) {
      return wpMember;
    }
  } catch (err) {
    console.warn(`Failed to get WP team member for slug "${slug}", falling back to static:`, err);
  }
  const staticMember = staticDepartments
    .flatMap((d) => d.members)
    .find((m) => m.slug === slug);
  return staticMember || null;
}

export async function fetchLiveCategoryBySlug(categorySlug: string): Promise<Category | null> {
  try {
    const categories = await fetchLiveProjects();
    const cat = categories.find((c) => c.slug === categorySlug);
    if (cat) return cat;
  } catch (err) {
    console.warn(`Failed to get WP category for slug "${categorySlug}":`, err);
  }
  return staticCategories.find((c) => c.slug === categorySlug) || null;
}

export async function fetchLiveProjectBySlug(categorySlug: string, projectSlug: string): Promise<{ category: Category; project: Project } | null> {
  try {
    const categories = await fetchLiveProjects();
    const cat = categories.find((c) => c.slug === categorySlug);
    if (cat) {
      const proj = cat.projects.find((p) => p.slug === projectSlug);
      if (proj) {
        return { category: cat, project: proj };
      }
    }
  } catch (err) {
    console.warn(`Failed to get WP project for category "${categorySlug}" and project "${projectSlug}":`, err);
  }
  
  const staticCat = staticCategories.find((c) => c.slug === categorySlug);
  if (staticCat) {
    const staticProj = staticCat.projects.find((p) => p.slug === projectSlug);
    if (staticProj) {
      return { category: staticCat, project: staticProj };
    }
  }
  return null;
}


