import fs from 'node:fs';
import os from 'node:os';
import type { AstroConfig, AstroIntegration, AstroIntegrationLogger } from 'astro';

import { site } from '../../src/config/site';
import configBuilder, { type Config } from './utils/configBuilder';
import loadConfig from './utils/loadConfig';

type ThemeConfig = ReturnType<typeof configBuilder>;

const VIRTUAL_MODULE_ID = 'astrowind:config';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

/** Identity, SEO defaults and analytics ids come from `src/config/site.ts`, not from config.yaml. */
function applySiteOverrides({ SITE, METADATA, ANALYTICS }: ThemeConfig): void {
  SITE.name = site.name;
  SITE.site = site.url;
  SITE.trailingSlash = site.trailingSlash;
  SITE.googleSiteVerificationId = site.analytics.googleSiteVerificationId;

  if (METADATA.title) {
    METADATA.title.default = site.name;
    METADATA.title.template = `%s | ${site.name}`;
  }
  METADATA.description = site.description;
  if (METADATA.openGraph) {
    METADATA.openGraph.siteName = site.name;
  }

  ANALYTICS.vendors.googleTagManager = {
    id: site.analytics.googleTagManagerId || undefined,
  };
  ANALYTICS.vendors.googleAnalytics = {
    ...ANALYTICS.vendors.googleAnalytics,
    id: site.analytics.googleAnalyticsId || undefined,
  };
}

/** Vite plugin that serves the `astrowind:config` virtual module. */
function configModulePlugin({ SITE, I18N, METADATA, APP_BLOG, UI, ANALYTICS }: ThemeConfig) {
  return {
    name: 'vite-plugin-astrowind-config',
    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return `
                    export const SITE = ${JSON.stringify(SITE)};
                    export const I18N = ${JSON.stringify(I18N)};
                    export const METADATA = ${JSON.stringify(METADATA)};
                    export const APP_BLOG = ${JSON.stringify(APP_BLOG)};
                    export const UI = ${JSON.stringify(UI)};
                    export const ANALYTICS = ${JSON.stringify(ANALYTICS)};
                    `;
      }
    },
  };
}

/** Adds (or refreshes) the `Sitemap:` line in the built robots.txt. */
function writeSitemapToRobots(cfg: AstroConfig): void {
  const outDir = cfg.outDir;
  const publicDir = cfg.publicDir;
  const sitemapName = 'sitemap-index.xml';
  const sitemapFile = new URL(sitemapName, outDir);
  const robotsTxtFile = new URL('robots.txt', publicDir);
  const robotsTxtFileInOut = new URL('robots.txt', outDir);

  const hasIntegration =
    Array.isArray(cfg?.integrations) && cfg.integrations?.find((e) => e?.name === '@astrojs/sitemap') !== undefined;
  const sitemapExists = fs.existsSync(sitemapFile);

  if (hasIntegration && sitemapExists) {
    const robotsTxt = fs.readFileSync(robotsTxtFile, { encoding: 'utf8', flag: 'a+' });
    const sitemapUrl = new URL(sitemapName, String(new URL(cfg.base, cfg.site)));
    const pattern = /^Sitemap:(.*)$/m;

    if (!pattern.test(robotsTxt)) {
      fs.writeFileSync(robotsTxtFileInOut, `${robotsTxt}${os.EOL}${os.EOL}Sitemap: ${sitemapUrl}`, {
        encoding: 'utf8',
        flag: 'w',
      });
    } else {
      fs.writeFileSync(robotsTxtFileInOut, robotsTxt.replace(pattern, `Sitemap: ${sitemapUrl}`), {
        encoding: 'utf8',
        flag: 'w',
      });
    }
  }
}

function updateRobotsTxt(cfg: AstroConfig, logger: AstroIntegrationLogger): void {
  const buildLogger = logger.fork('astrowind');
  const dynamicRobots = new URL('src/pages/robots.txt.ts', cfg.root);

  if (fs.existsSync(dynamicRobots)) {
    buildLogger.info('Skipping static robots.txt update; src/pages/robots.txt.ts is host-aware.');
    return;
  }

  buildLogger.info('Updating `robots.txt` with `sitemap-index.xml` ...');

  try {
    writeSitemapToRobots(cfg);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    /* empty */
  }
}

export default ({ config: _themeConfig = 'src/config.yaml' } = {}): AstroIntegration => {
  let cfg: AstroConfig;
  return {
    name: 'astrowind-integration',

    hooks: {
      'astro:config:setup': async ({ config, logger, updateConfig, addWatchFile }) => {
        const buildLogger = logger.fork('astrowind');

        const themeConfig = configBuilder((await loadConfig(_themeConfig)) as Config);
        applySiteOverrides(themeConfig);
        const { SITE } = themeConfig;

        updateConfig({
          site: SITE.site,
          base: SITE.base,

          trailingSlash: SITE.trailingSlash ? 'always' : 'never',

          vite: { plugins: [configModulePlugin(themeConfig)] },
        });

        if (typeof _themeConfig === 'string') {
          addWatchFile(new URL(_themeConfig, config.root));
          addWatchFile(new URL('src/config/site.ts', config.root));

          buildLogger.info(`Astrowind \`${_themeConfig}\` has been loaded.`);
        } else {
          buildLogger.info(`Astrowind config has been loaded.`);
        }
      },
      'astro:config:done': async ({ config }) => {
        cfg = config;
      },

      'astro:build:done': async ({ logger }) => {
        updateRobotsTxt(cfg, logger);
      },
    },
  };
};
