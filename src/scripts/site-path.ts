/** Prefix an internal path with Astro's configured base, including the trailing slash. */
export function sitePath(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}
