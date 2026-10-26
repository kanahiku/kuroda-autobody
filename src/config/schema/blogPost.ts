import type { BlogPost } from '~/lib/content/types';
import type { JsonLdNode } from './types';
import { absoluteUrl, businessId } from './urls';

/**
 * BlogPosting + breadcrumb for every post. Built as data and stringified by JsonLd
 * so a quotation mark in a title cannot break the script.
 * dateModified uses the publish date: the blog document does not store a separate edit date.
 * The image line is omitted when the post has no featured image.
 */
export function blogPostSchema(post: BlogPost): JsonLdNode {
  const url = absoluteUrl(`/blog/${post.slug.replace(/^\/+|\/+$/g, '')}/`);
  const date = post.publishDate.slice(0, 10);
  const business = businessId('autobodyshop');
  const description = (post.seoDescription || post.excerpt).trim();

  const article: JsonLdNode = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: date,
    dateModified: date,
    author: { '@id': business },
    publisher: { '@id': business },
    isPartOf: { '@id': `${absoluteUrl('/blog/')}#blog` },
    inLanguage: 'en-US',
  };

  if (description) article.description = description;
  if (post.image?.src) article.image = post.image.src;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      article,
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog/') },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
