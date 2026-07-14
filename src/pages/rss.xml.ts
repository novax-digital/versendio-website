import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../data/site';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(context: APIContext) {
  const site = context.site?.toString().replace(/\/$/, '') ?? SITE.url;
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.id}`;
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <category>${escapeXml(post.data.category)}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>versendio Blog</title>
    <link>${site}/blog</link>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Praxiswissen rund um Briefversand, E-Post, Serienbriefe und Direktmailings.</description>
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
