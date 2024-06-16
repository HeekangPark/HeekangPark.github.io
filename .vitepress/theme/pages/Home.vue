<script lang="ts" setup>
import _ from "lodash";
import { computed, ref, type Ref, onMounted, onUpdated } from "vue";

import { useData } from "vitepress";
import type { ThemeConfig } from "@/themeConfig";
const { theme: themeData } = useData<ThemeConfig>();

import Panel from "@/layouts/Panel.vue";
import DocumentBlockComponent from "@/components/DocumentBlockComponent.vue";

import { data } from "@/data/documents.data";
const { documents, collections, tags } = data;

import { useGlobalState } from '@/store';
const state = useGlobalState();

const recently_added_document_paths = computed(() => {
  return _.chain(documents)
    .keys()
    .filter((path) => documents[path].date_created && documents[path].date_created !== "")
    .orderBy((path) => documents[path].date_created, "desc")
    .take(5)
    .value();
});

const recently_modified_document_paths = computed(() => {
  return _.chain(documents)
    .keys()
    .filter((path) => documents[path].date_modified && documents[path].date_modified !== "")
    .orderBy((path) => documents[path].date_modified, "desc")
    .take(5)
    .value();
});

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
    <p class="site-title">{{ themeData.title }}</p>
    <div class="section notices">
      <p class="section-title">Notices</p>
      <div class="section-content">
        <Content></Content>
      </div>
    </div>
    <div class="section recently-added-documents-section">
      <p class="section-title">Recently Added Documents</p>
      <div class="section-content">
        <DocumentBlockComponent v-for="document_path in recently_added_document_paths" :key="document_path"
          :document_path="document_path" :pageviews="pageviews" />
      </div>
    </div>
    <div class="section recently-modified-documents-section">
      <p class="section-title">Recently Modified Documents</p>
      <div class="section-content">
        <DocumentBlockComponent v-for="document_path in recently_modified_document_paths" :key="document_path"
          :document_path="document_path" :pageviews="pageviews" />
      </div>
    </div>
    <div class="footer">
      <p class="site-author">{{ themeData.author.name }}</p>
      <p class="site-since">Since {{ themeData.since }}</p>
    </div>
  </Panel>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins";

$gap: 48px;

.site-title {
  font-size: 2em;
  font-weight: bold;
  text-align: center;

  padding: {
    top: 2em;
    bottom: 2em;
    left: 1em;
    right: 1em;
  }

  margin: {
    bottom: $gap;
  }

  color: var(--site-text);
  border-radius: 0.5em;
  word-break: keep-all;

  @include shadow_inset_small;
}

.notices {
  .section-title {
    margin: {
      bottom: 0.5em;
    }
  }

  .section-content :deep(> *) {
    @import "@/styles/document.scss";
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  margin: {
    top: $gap;
    bottom: $gap;
  }

  .section-title {
    font-size: 1.2em;
    font-weight: bold;
  }
}

.footer {
  margin: {
    top: 2em;
  }

  border: {
    top: 1px solid var(--site-border);
  }

  padding: {
    top: 1em;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--site-muted-text);
  font-size: 0.9em;
  gap: 0.25em;
}
</style>