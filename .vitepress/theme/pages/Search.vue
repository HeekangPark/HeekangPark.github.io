<script setup lang="ts">
import _ from "lodash";
import { computed, ref, type Ref, onMounted, onUpdated } from "vue";

import Panel from "@/layouts/Panel.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import DocumentBlockComponent from "@/components/DocumentBlockComponent.vue";

import { useGlobalState } from "@/store";
const state = useGlobalState();

const searchModel = computed({
  get: () => state.searchModel.value,
  set: (value) => state.searchModel.value = value
});

const searched_document_paths = computed({
  get: () => state.searchedDocumentPaths.value,
  set: (value) => state.searchedDocumentPaths.value = value
});

const search = () => {
  if (!searchModel.value) return;
  state.search(searchModel.value);
}

const pageviews: Ref<{ [path: string]: number } | null> = ref(null);
onMounted(async () => {
  pageviews.value = await state.getPageviews();
});

onUpdated(async () => {
  pageviews.value = await state.getPageviews();
});
</script>

<template>
  <Panel>
    <p class="page-title">Search</p>
    <div class="search-section section">
      <SearchComponent v-model="searchModel" placeholder="Search" @enter="search" />
    </div>
    <p class="initial-state" v-if="searchModel === '' && searched_document_paths.length === 0">Enter a search term to find documents</p>
    <p class="no-document-state" v-else-if="searchModel !== '' && searched_document_paths.length === 0">No documents found</p>
    <p class="count" v-else>{{ searched_document_paths.length }} document(s)  found</p>
    <div class="documents" v-if="searched_document_paths.length > 0">
      <DocumentBlockComponent v-for="path in searched_document_paths" :key="path"
        :document_path="path" :pageviews="pageviews" />
    </div>
  </Panel>
</template>

<style lang="scss" scoped>
.page-title {
  font-size: 1.5em;
  margin-bottom: 1em;
  font-weight: bold;
  text-align: center;
}

.initial-state {
  text-align: center;
  margin: {
    top: 3em;
  }
  color: var(--site-muted-text);
}

.no-document-state {
  text-align: center;
  margin: {
    top: 3em;
  }
  color: var(--site-muted-text);
}

.count {
  text-align: right;
  margin: {
    top: 2em;
    bottom: 0.5em;
  }
  color: var(--site-muted-text);
}
</style>