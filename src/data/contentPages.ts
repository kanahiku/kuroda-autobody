/** Every copy-driven page rendered by `ContentPageView` — route files look their page up by path. */
import type { ContentPage } from '~/data/contentPage';
import { collisionRepairPages } from '~/data/collisionRepair';
import { hadAnAccidentHubPages } from '~/data/hadAnAccidentHub';
import { hadAnAccidentPages } from '~/data/hadAnAccident';
import { collisionRepairHubPages } from '~/data/collisionRepairHub';
import { reviewPages } from '~/data/reviews';
import { ourStoryPages } from '~/data/ourStory';
import { whyKurodaPages } from '~/data/whyKuroda';
import { serviceAreaPages } from '~/data/serviceAreas';
import { certificationProgramPages } from '~/data/certificationPrograms';
import { serviceAreaWestPages } from '~/data/serviceAreasWest';
import { insuranceCompanyPages } from '~/data/insuranceCompanies';

export const contentPages: ContentPage[] = [
  ...collisionRepairPages,
  ...collisionRepairHubPages,
  ...hadAnAccidentPages,
  ...hadAnAccidentHubPages,
  ...insuranceCompanyPages,
  ...ourStoryPages,
  ...reviewPages,
  ...whyKurodaPages,
  ...certificationProgramPages,
  ...serviceAreaPages,
  ...serviceAreaWestPages,
];

export function getContentPage(path: string): ContentPage {
  const page = contentPages.find((p) => p.path === path);
  if (!page) throw new Error(`No content page for "${path}" — add it to src/data/*.ts`);
  return page;
}
