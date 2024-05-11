import { resolve } from 'path';

import { defineConfigWithTheme } from 'vitepress';
import type { ThemeConfig } from '@/themeConfig';

import markdownItFootnote from 'markdown-it-footnote';
//import markdownItFootnote from "./footnote";
import markdownItAttrs from 'markdown-it-attrs';

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
  googleAnalytics: {
    trackingId: "G-325ND33JD3"
  },
  googleAdSense: {
    adClient: "ca-pub-7509436363176620",
    adSlot: "7405859258"
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
    ["script", { async: "", src: `https://www.googletagmanager.com/gtag/js?id=${themeConfig.googleAnalytics.trackingId}` }],
    ["script", {}, `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${themeConfig.googleAnalytics.trackingId}');`]
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
      // markdown-it-footnote
      md.use(markdownItFootnote);

      // markdown-it-attrs
      md.use(markdownItAttrs, {
        leftDelimiter: '{',
        rightDelimiter: '}',
        allowedAttributes: []
      });

      // markdown-it customization : wrap tables with div
      md.renderer.rules.table_open = (tokens, idx, options) => '<div class="table-wrapper"><table>';
      md.renderer.rules.table_close = (tokens, idx, options) => '</table></div>';

      // markdown-it-footnote customization : assign vue ref attributes to footnotes
      md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
        const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
        const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
        let refid = id;

        if (tokens[idx].meta.subId > 0) refid += `:${tokens[idx].meta.subId}`;

        //return `<sup class="footnote-ref" :ref="(el) => if(el__footnote_refs !== null) el__footnote_refs.push(el);"><a href="#fn${id}" id="fnref${refid}">${caption}</a></sup>`;
        return `<sup class="footnote-ref" ref="el__footnote_ref"><a href="#fn${id}" id="fnref${refid}">${caption}</a></sup>`;
      }
    }
  },
  //ignoreDeadLinks: true,
  sitemap: {
    hostname: "https://heekangpark.github.io",
  },
})
