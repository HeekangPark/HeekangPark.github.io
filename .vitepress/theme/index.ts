import type { Theme } from 'vitepress';
import { createHead } from "@vueuse/head";
import nprogress from 'nprogress';
//import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client';
import { useGlobalState } from '@/store';

import ImageComponent from '@/components/ImageComponent.vue';
import CodeBlockComponent from '@/components/CodeBlockComponent.vue';
import Layout from "./Layout.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiXLg,
  BiThreeDotsVertical,
  BiPlusCircle,
  BiPencilSquare,
  BiEye,
  BiTagsFill,
  BiTagFill,
  BiHouseFill,
  BiFolderFill,
  BiPersonFill,
  BiMailbox2,
  BiEnvelopeFill,
  BiGithub,
  BiFolder2Open,
  BiFolder,
  BiFileEarmarkText,
  BiChevronLeft,
  BiChevronRight,
  BiSun,
  BiMoon,
  BiCaretDownFill,
  BiCaretUpFill,
} from "oh-vue-icons/icons";

addIcons(
  BiXLg,
  BiThreeDotsVertical,
  BiPlusCircle,
  BiPencilSquare,
  BiEye,
  BiTagsFill,
  BiTagFill,
  BiHouseFill,
  BiFolderFill,
  BiPersonFill,
  BiMailbox2,
  BiEnvelopeFill,
  BiGithub,
  BiFolder2Open,
  BiFolder,
  BiFileEarmarkText,
  BiChevronLeft,
  BiChevronRight,
  BiSun,
  BiMoon,
  BiCaretDownFill,
  BiCaretUpFill
);

const state = useGlobalState();

export default {
  Layout,
  enhanceApp({ app, router }) {
    app.component("v-icon", OhVueIcon);
    app.use(createHead());
    app.component("v-image", ImageComponent);
    app.component("v-codeblock", CodeBlockComponent);
    //enhanceAppWithTabs(app);

    setTimeout(() => {
      nprogress.configure({ showSpinner: false });

      const cacheBeforeRouteChange = router.onBeforeRouteChange;
      router.onBeforeRouteChange = (to) => {
        nprogress.start();
        if (cacheBeforeRouteChange) {
          cacheBeforeRouteChange(to);
        }
      }
      
      const cacheAfterRouteChange = router.onAfterRouteChanged;
      router.onAfterRouteChanged = (to) => {
        state.closeLeftPanel();
        state.resetLeftSearchModel();
        nprogress.done();
        if (cacheAfterRouteChange) {
          cacheAfterRouteChange(to);
        }
      }
    }, 0);
  }
} satisfies Theme;