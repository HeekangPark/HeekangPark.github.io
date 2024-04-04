<script lang="ts" setup>
import _ from 'lodash';

import { ref, computed } from 'vue';
import type { Ref } from 'vue';

import { data } from "@/data/documents.data";
const { collections, documents, tags } = data;

import { useGlobalState } from '@/store';

import Panel from "@/layouts/Panel.vue";
import TagComponent from '@/components/TagComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import RadioButtonComponent from '@/components/RadioButtonComponent.vue';
import DocumentBlockComponent from '@/components/DocumentBlockComponent.vue';

const state = useGlobalState();

const tag_paths = computed(() => _.chain(tags).keys().sortBy().value());

const selected_tag_paths = computed(() => state.selectedTagPaths.value);

const onTagClicked = (tag_path: string) => {
  state.toggleSelectedTagPath(tag_path);
}

const onResetBtnClicked = () => {
  state.resetSelectedTagPaths();
}

const selected_document_paths = computed(() => {
  if (selected_tag_paths.value.size === 0) return [];

  const document_paths = Object.keys(documents);
  const selected_tag_paths_array = Array.from(selected_tag_paths.value);

  if (logic.value === "and") {
    return _.chain(document_paths)
      .filter((document_path) => {
        const document = documents[document_path];
        return _.every(selected_tag_paths_array, (tag_path) => document.tag_paths.includes(tag_path));
      })
      .value();
  } else {
    return _.chain(document_paths)
      .filter((document_path) => {
        const document = documents[document_path];
        return _.some(selected_tag_paths_array, (tag_path) => document.tag_paths.includes(tag_path));
      })
      .value();
  }
});

const logic: Ref<"and" | "or"> = ref("and");
</script>

<template>
  <Panel>
    <p class="page-title">Tags</p>
    <div class="tags">
      <TagComponent v-for="tag_path in tag_paths" :key="tag_path" :tag_path="tag_path"
        do_not_activate_link show_count :selected="selected_tag_paths.has(tag_path)" @click="onTagClicked(tag_path)" />
    </div>
    <div class="controls-wrapper">
      <div class="controls">
        <RadioButtonComponent :ids="['and', 'or']" v-model="logic" />
        <ButtonComponent value="Reset" @click="onResetBtnClicked" />
      </div>
    </div>
    <p class="initial-state" v-if="selected_tag_paths.size === 0">Select tags to filter documents</p>
    <p class="no-document-state" v-else-if="selected_document_paths.length === 0">No documents found</p>
    <p class="count" v-else>{{ selected_document_paths.length }} document(s) found</p>
    <div class="documents" v-if="selected_document_paths.length > 0">
      <DocumentBlockComponent v-for="document_path in selected_document_paths" :key="document_path"
        :document_path="document_path" />
    </div>
  </Panel>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins";

.page-title {
  font-size: 1.5em;
  margin-bottom: 1em;
  font-weight: bold;
  text-align: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  border-radius: 1em;
  padding: {
    top: 1.5em;
    bottom: 1.5em;
    left: 1.5em;
    right: 1.5em;
  }
  @include shadow_inset_small;
}

.controls-wrapper {
  text-align: right;

  .controls {
    display: inline-flex;
    align-items: center;
    gap: 2em;

    margin: {
      top: 1em;
      bottom: 1em;
    }

    @include shadow_inset_small;
    border-radius: 1em;

    padding: {
      top: 1em;
      bottom: 1em;
      left: 1.5em;
      right: 1.5em;
    }

    .selection-logics {
      display: flex;
      gap: 1em;

      .selection-logic {
        display: flex;
        align-items: center;
        gap: 0.5em;

        label {
          flex-shrink: 0;
          cursor: pointer;
        }
      }
    }
  }
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