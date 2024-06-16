import _ from 'lodash';

import { ref, type Ref, computed } from "vue";
import { createGlobalState, useDark, useToggle } from "@vueuse/core";
import Fuse from 'fuse.js';

import { data } from "@/data/documents.data";
const { documents } = data;

const pageview_update_interval_sec = 60 * 60 * 6;

export const useGlobalState = createGlobalState(() => {
  /* left panel */
  const isLeftPanelOpen = ref(false);

  const openLeftPanel = () => {
    isLeftPanelOpen.value = true;
  }

  const closeLeftPanel = () => {
    isLeftPanelOpen.value = false;
  }

  const toggleLeftPanel = () => {
    isLeftPanelOpen.value = !isLeftPanelOpen.value;
  }

  /* search */
  const leftSearchModel = ref('');
  const searchModel = ref('');
  const fuse = new Fuse(_.chain(documents).values().map((document) => {
    return {
      title: document.title,
      src: document.src,
      path: document.path,
    }
  }).value(), { 
    keys: ['title', 'src'],
    //includeScore: true,
    //includeMatches: true,
    ignoreLocation: true,
  });
  const searchedDocumentPaths: Ref<string[]> = ref([]);
  
  const resetLeftSearchModel = () => {
    leftSearchModel.value = '';
  }

  const search = (query: string) => {
    searchModel.value = query;
    resetLeftSearchModel();
    searchedDocumentPaths.value = _.chain(fuse.search(query)).map((result) => result.item.path).value();
  }

  /* color mode */
  const isDark = useDark();
  
  const toggleColorMode = useToggle(isDark);

  /* tags */
  const selectedTagPaths: Ref<Set<string>> = ref(new Set());
  
  const toggleSelectedTagPath = (path: string) => {
    if (selectedTagPaths.value.has(path)) {
      selectedTagPaths.value.delete(path);
    } else {
      selectedTagPaths.value.add(path);
    }
  }

  const addSelectedTagPath = (path: string) => {
    selectedTagPaths.value.add(path);
  }

  const removeSelectedTagPath = (path: string) => {
    selectedTagPaths.value.delete(path);
  }

  const isSelectedTagPath = (path: string) => {
    return selectedTagPaths.value.has(path);
  }

  const resetSelectedTagPaths = () => {
    selectedTagPaths.value.clear();
  }

  /* pageview */
  const pageviews: Ref<{ [path: string]: number }> = ref({});
  const pageviews_last_updated: Ref<number | null> = ref(null);

  const fetchPageviews = async () => {
    const response = await fetch('https://reinventing-the-wheel-20240404.du.r.appspot.com/pageview');
    const fetched_pageviews = await response.json();
    _.chain(documents)
      .keys()
      .forEach((path) => {
        if (Object.keys(fetched_pageviews).includes(path)) {
          pageviews.value[path] = parseInt(fetched_pageviews[path]);
        } else {
          pageviews.value[path] = 0;
        }
      })
      .value();
    
    pageviews_last_updated.value = Date.now();
  }

  const getPageviews = async () => {
    if (pageviews_last_updated.value === null || Date.now() - pageviews_last_updated.value > pageview_update_interval_sec * 1000) {
      await fetchPageviews();
    }

    return pageviews.value;
  }

  const getPageview = async (path: string) => {
    if (pageviews_last_updated.value === null || Date.now() - pageviews_last_updated.value > pageview_update_interval_sec * 1000) {
      await fetchPageviews();
    }

    if (Object.keys(pageviews.value).includes(path)) {
      return pageviews.value[path];
    } else {
      return 0;
    }
  }

  return {
    isLeftPanelOpen, openLeftPanel, closeLeftPanel, toggleLeftPanel,
    leftSearchModel, searchModel, searchedDocumentPaths, resetLeftSearchModel, search,
    isDark, toggleColorMode,
    selectedTagPaths, toggleSelectedTagPath, addSelectedTagPath, removeSelectedTagPath, isSelectedTagPath, resetSelectedTagPaths,
    getPageviews, getPageview,
  };
});