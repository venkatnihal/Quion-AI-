import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      description: "Used as the category filter on the portfolio page.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "services",
      title: "Services Provided",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "result",
      title: "Headline Result",
      description: "The key outcome, e.g. '70% of tickets auto-resolved'.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover / Gallery Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "liveUrl",
      title: "Live Website URL",
      type: "url",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured project?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "orderRank",
      title: "Sort order",
      description: "Lower numbers appear first. Leave blank for automatic ordering.",
      type: "number",
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      fields: [
        { name: "quote", title: "Quote", type: "text", rows: 3 },
        { name: "author", title: "Author", type: "string" },
        { name: "role", title: "Role / Company", type: "string" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
