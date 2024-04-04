<script lang="ts" setup>
import { computed } from 'vue';
import _ from 'lodash';

import { data } from "@/data/documents.data";
const { collections, documents, tags } = data;

import Panel from "@/layouts/Panel.vue";
import CollectionComponent from '@/components/CollectionComponent.vue';

const top_level_collection_paths = computed(() => {
  const collection_paths = new Set(Object.keys(collections));

  for (const collection_path of Object.keys(collections)) {
    const collection = collections[collection_path];
    if (collection.subcollection_paths) {
      collection.subcollection_paths.forEach((subcollection_path: string) => {
        collection_paths.delete(subcollection_path);
      });
    }
  }

  return Array.from(collection_paths);
})
</script>

<template>
  <Panel>
    <p class="page-title">Collections</p>
    <CollectionComponent v-for="collection_path in top_level_collection_paths" :key="collection_path"
      :collection_path="collection_path" :depth="0" />
  </Panel>
</template>

<style lang="scss" scoped>
.page-title {
  font-size: 1.5em;
  margin-bottom: 1em;
  font-weight: bold;
  text-align: center;
}
</style>