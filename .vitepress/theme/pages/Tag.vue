<script lang="ts" setup>
import { computed } from "vue";

import { data } from "@/data/documents.data";
const { collections, documents, tags } = data;

import Panel from "@/layouts/Panel.vue";
import DocumentBlockComponent from '@/components/DocumentBlockComponent.vue';

const props = defineProps<{
  tag_path: string;
}>();

const tag = computed(() => {
  if (Object.keys(tags).includes(props.tag_path)) return tags[props.tag_path];
  else return null;
});
</script>

<template>
  <Panel>
    <p class="page-title">Tag : {{ tag.name }}</p>
    <DocumentBlockComponent v-for="document_path in tag.document_paths" :key="document_path"
      :document_path="document_path" />
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