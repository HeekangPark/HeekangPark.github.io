<script lang="ts" setup>
import { computed } from "vue";

import { data } from "@/data/documents.data";
const { collections, documents, tags } = data;

import Panel from "@/layouts/Panel.vue";
import CollectionComponent from '@/components/CollectionComponent.vue';

const props = defineProps<{
  collection_path: string;
}>();

const collection = computed(() => {
  if (Object.keys(collections).includes(props.collection_path)) return collections[props.collection_path];
  else return null;
});

const full_collection_name = computed(() => {
  return [...collection.value.parent_collection_paths, collection.value.path].map(collection_path => collections[collection_path].name).join(" / ");
});
</script>

<template>
  <Panel>
    <p class="page-title">Collection : {{ full_collection_name }}</p>
    <p class="description" v-if="collection.description">{{ collection.description }}</p>
    <CollectionComponent :collection_path="props.collection_path" :show_full_collection_name="true" :depth="0" :initial_closed="false" />
  </Panel>
</template>

<style lang="scss" scoped>
.page-title {
  font-size: 1.5em;
  margin-bottom: 1em;
  font-weight: bold;
  text-align: center;
}

.description {
  margin-bottom: 1.5em;
  text-align: center;
  color: var(--site-muted-text);
}
</style>