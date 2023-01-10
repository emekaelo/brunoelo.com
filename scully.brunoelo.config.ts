import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import 'prismjs/components/prism-git.js';
import { useSitemapPlugin } from '@recursyve/scully-sitemap';

setPluginConfig('md', { enableSyntaxHighlighting: true });

useSitemapPlugin({
  urlPrefix: 'https://brunoelo.com',
  sitemapFilename: 'sitemap.xml',
  merge: false,
  trailingSlash: true,
  changeFreq: 'monthly',
  priority: [
    '1.0',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
    '0.4',
    '0.3',
    '0.2',
    '0.1',
    '0.0',
  ],
  ignoredRoutes: ['/404'],
  routes: {
    '/blog/:slug': {
      changeFreq: 'monthly',
      priority: '0.9',
      sitemapFilename: 'sitemap-blog-posts.xml',
      merge: true,
    },
  },
});

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'brunoelo',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog',
      },
    },
  },
  defaultPostRenderers: ['seoHrefOptimise'],
  puppeteerLaunchOptions: {
    args: ['--no-sandbox', '--disable-setuid--sandbox'],
  },
};
