import { createServerFn } from "@tanstack/react-start";
import { decode } from "html-entities";
import { adventures as staticAdventures } from "../data/adventures";

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

export const getAdventuresServer = createServerFn("GET", async () => {
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

export const getAdventureBySlugServer = createServerFn("GET", async (slug: string) => {
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
    const wpAdventure = await getAdventureBySlugServer(slug);
    if (wpAdventure) {
      return wpAdventure;
    }
  } catch (err) {
    console.warn(`Failed to get WP adventure for slug "${slug}", falling back to static:`, err);
  }
  const staticPost = staticAdventures.find((a) => a.slug === slug);
  return staticPost || null;
}
