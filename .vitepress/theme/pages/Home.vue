<script lang="ts" setup>
import _ from "lodash";
import { computed } from "vue";
import { useData } from "vitepress";
import type { ThemeConfig } from "@/themeConfig";

import Panel from "@/layouts/Panel.vue";
import DocumentBlockComponent from "@/components/DocumentBlockComponent.vue";

const { theme: themeData } = useData<ThemeConfig>();

import { data } from "@/data/documents.data";
const { documents, collections, tags } = data;

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
</script>

<template>
  <Panel>
    <p class="site-title">{{ themeData.title }}</p>
    <div class="section recently-added-documents-section">
      <p class="section-title">Recently Added Documents</p>
      <div class="section-content">
        <DocumentBlockComponent v-for="document_path in recently_added_document_paths" :key="document_path"
          :document_path="document_path" />
      </div>
    </div>
    <div class="section recently-modified-documents-section">
      <p class="section-title">Recently Modified Documents</p>
      <div class="section-content">
        <DocumentBlockComponent v-for="document_path in recently_modified_document_paths" :key="document_path"
          :document_path="document_path" />
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

$gap: 4em;

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

  color: var(--site-text);
  border-radius: 0.5em;
  word-break: keep-all;

  @include shadow_inset_small;
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
    top: 2em;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--site-muted-text);
  font-size: 0.9em;
  gap: 0.25em;
}
</style>