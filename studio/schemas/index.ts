import { blogPost } from './documents/blogPost';

/**
 * Sanity only manages the blog.
 * Page copy, navigation and imagery live in the codebase (`src/data/`, `public/`).
 */
export const schemaTypes = [blogPost];
