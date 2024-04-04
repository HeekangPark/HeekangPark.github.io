import { resolve } from 'path';

import { defineConfigWithTheme } from 'vitepress';
import type { ThemeConfig } from '@/themeConfig';

import footnote from 'markdown-it-footnote';
//import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';

const themeConfig: ThemeConfig = {
  title: "Reinventing the Wheel",
  author: {
    name: "Heekang Park",
    email: "park.heekang33@gmail.com",
    github: "https://github.com/HeekangPark"
  },
  giscus: {
    repo: "HeekangPark/HeekangPark.github.io",
    repoId: "MDEwOlJlcG9zaXRvcnkyNTk1NTA4Mzk=",
    category: "giscus",
    categoryId: "DIC_kwDOD3hud84Cd9aO",
    lightTheme: "light",
    darkTheme: "dark"
  },
  since: 2020
};

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: themeConfig.title,
  lang: 'ko-KR',
  cleanUrls: true,
  srcDir: './docs',
  outDir: './dist',
  assetsDir: 'assets',
  themeConfig: themeConfig,
  rewrites: {
    "_home.md": "index.md",
    "_about.md": "about.md",
    "_collections.md": "collections.md",
    "_tags.md": "tags.md",
    "_guestbook.md": "guestbook.md",
  },
  head: [
    ["title", {}, themeConfig.title],
    ["meta", { name: "description", content: themeConfig.title }],
    ["meta", { name: "author", content: themeConfig.author.name }],
    ["link", { rel: "icon", href: "/icons/icon-light.ico", media: "(prefers-color-scheme: light)" }],
    ["link", { rel: "icon", href: "/icons/icon-dark.ico", media: "(prefers-color-scheme: dark)" }],
  ],
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'theme')
      }
    },
    optimizeDeps: {
      exclude: ["oh-vue-icons/icons"]
    },
    ssr: {
      noExternal: ["oh-vue-icons"]
    },
    plugins: []
  },
  vue: {
  },
  markdown: {
    theme: "dark-plus",
    toc: {
      containerTag: "div",
      containerClass: "toc",
      listTag: "ol",
      listClass: "toc-list",
      itemClass: "toc-item",
      linkClass: "toc-link",
      shouldAllowNested: true,
      level: [1, 2, 3, 4, 5, 6],
    },
    math: true,
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      // activate footnotes
      md.use(footnote);

      // wrap tables with div
      md.renderer.rules.table_open = function (tokens, idx, options) {
        return '<div class="table-wrapper"><table>';
      }

      md.renderer.rules.table_close = function (tokens, idx, options) {
        return '</table></div>';
      }

      // tabs plugin
      //md.use(tabsMarkdownPlugin);
    }
  },
  //ignoreDeadLinks: true,
  sitemap: {
    hostname: "https://heekangpark.github.io",
  },
})
