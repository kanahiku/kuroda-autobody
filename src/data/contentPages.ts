/** Every copy-driven page rendered by `ContentPageView` — route files look their page up by path. */
import type { ContentPage } from '~/data/contentPage';
import { collisionRepairPages } from '~/data/collisionRepair';
import { hadAnAccidentPages } from '~/data/hadAnAccident';
import { ourStoryPages } from '~/data/ourStory';

export const contentPages: ContentPage[] = [...collisionRepairPages, ...hadAnAccidentPages, ...ourStoryPages];

export function getContentPage(path: string): ContentPage {
  const page = contentPages.find((p) => p.path === path);
  if (!page) throw new Error(`No content page for "${path}" — add it to src/data/*.ts`);
  return page;
}
