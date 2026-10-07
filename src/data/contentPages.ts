/** Every copy-driven page rendered by `ContentPageView` — route files look their page up by path. */
import type { ContentPage } from '~/data/contentPage';
import { collisionRepairPages } from '~/data/collisionRepair';
import { hadAnAccidentHubPages } from '~/data/hadAnAccidentHub';
import { hadAnAccidentPages } from '~/data/hadAnAccident';
import { collisionRepairHubPages } from '~/data/collisionRepairHub';
import { reviewPages } from '~/data/reviews';
import { ourStoryPages } from '~/data/ourStory';

export const contentPages: ContentPage[] = [
  ...collisionRepairPages,
  ...collisionRepairHubPages,
  ...hadAnAccidentPages,
  ...hadAnAccidentHubPages,
  ...ourStoryPages,
  ...reviewPages,
];

export function getContentPage(path: string): ContentPage {
  const page = contentPages.find((p) => p.path === path);
  if (!page) throw new Error(`No content page for "${path}" — add it to src/data/*.ts`);
  return page;
}
