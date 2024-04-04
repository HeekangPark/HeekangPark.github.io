import _ from 'lodash';

import { ref, type Ref, computed } from "vue";
import { createGlobalState, useDark, useToggle } from "@vueuse/core";
import { data } from "@/data/documents.data";
import Fuse from 'fuse.js';

const { documents } = data;

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

  return {
    isLeftPanelOpen, openLeftPanel, closeLeftPanel, toggleLeftPanel,
    leftSearchModel, searchModel, searchedDocumentPaths, resetLeftSearchModel, search,
    isDark, toggleColorMode,
    selectedTagPaths, toggleSelectedTagPath, addSelectedTagPath, removeSelectedTagPath, isSelectedTagPath, resetSelectedTagPaths,
  };
});