import type { SiteConfig } from "vitepress";
import type { ThemeConfig } from "@/themeConfig";
import type { ImageTextsData } from "@/data/imageTexts";

import _ from "lodash";
import { createMarkdownRenderer, createContentLoader } from "vitepress";

declare const data: ImageTextsData;
export { data };

const config: SiteConfig<ThemeConfig> = globalThis.VITEPRESS_CONFIG;

const vImageTagPattern = /<v-image[^>]*>/g;
const srcAttrPattern = /src="([^"]*)"/;
const titleAttrPattern = /title="([^"]*)"/;
const descriptionAttrPattern = /description="([^"]*)"/;

const getAttrValue = (pattern: RegExp, text: string) => {
  const match = text.match(pattern);
  return match ? match[1].trim() : "";
}

const decodeHTMLCodes = (text: string) => {
  return text
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&apos;/g, "'");
}

const encodeHTMLCodes = (text: string) => {
  return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");
}

export default createContentLoader("**/*.md", {
  includeSrc: true,
  render: false,
  excerpt: false,
  transform: async (markdownFiles) => {
    const md = await createMarkdownRenderer(
      config.srcDir,
      config.markdown,
      config.site.base,
      config.logger
    );

    const result: ImageTextsData = {};
    markdownFiles.forEach(({ src }) => {
      _.chain(src)
        .split("\n")
        .filter((line) => line.startsWith("<v-image") && line.endsWith("/>"))
        .map((tag) => {
          return {
            src: getAttrValue(srcAttrPattern, tag),
            title: getAttrValue(titleAttrPattern, tag),
            description: getAttrValue(descriptionAttrPattern, tag)
          };
        })
        .forEach((item) => {
          if (item.title !== null && !result.hasOwnProperty(item.title)) {
            result[decodeHTMLCodes(item.title)] = md.renderInline(item.title);
          }

          if (item.description !== null && !result.hasOwnProperty(item.description)) {
            result[decodeHTMLCodes(item.description)] = md.renderInline(item.description);
          }
        })
        .value();
    });

    return result;
  }
})