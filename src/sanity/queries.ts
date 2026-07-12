/* GROQ queries. Cover images are resolved to direct CDN URLs (`asset->url`)
 * so they drop straight into <img src> on the statically-exported site. */

const NOT_DRAFT = `!(_id in path("drafts.**"))`;

export const postsQuery = `*[_type == "post" && ${NOT_DRAFT}] | order(publishedAt desc){
  "slug": slug.current,
  title,
  excerpt,
  category,
  "readTime": coalesce(readTime, 6),
  "published": publishedAt,
  "coverImage": coverImage.asset->url
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current) && ${NOT_DRAFT}].slug.current`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && ${NOT_DRAFT}][0]{
  "slug": slug.current,
  title,
  excerpt,
  category,
  "readTime": coalesce(readTime, 6),
  "published": publishedAt,
  "coverImage": coverImage.asset->url,
  "authorName": coalesce(authorName, "QuionAi"),
  body
}`;

export const projectsQuery = `*[_type == "project" && ${NOT_DRAFT}] | order(coalesce(orderRank, 0) asc, featured desc, year desc){
  "slug": slug.current,
  title,
  client,
  industry,
  services,
  description,
  technologies,
  result,
  liveUrl,
  year,
  featured,
  "image": coverImage.asset->url,
  testimonial
}`;
