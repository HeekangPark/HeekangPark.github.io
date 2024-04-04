<script lang="ts" setup>
import { ref, computed } from "vue";

import { data } from "@/data/documents.data";
const { collections, documents, tags } = data;

import DocumentBlockComponent from "./DocumentBlockComponent.vue";

const props = withDefaults(defineProps<{
  collection_path: string;
  depth: number;
  indent?: string;
  show_collection_name?: boolean;
  show_full_collection_name?: boolean;
  show_description?: boolean;
  show_documents?: boolean;
  show_subcollections?: boolean;
  initial_closed?: boolean;
}>(), {
  indent: "2em",
  show_collection_name: true,
  show_full_collection_name: false,
  show_description: true,
  show_documents: true,
  show_subcollections: true,
  initial_closed: true
});

const collection = computed(() => {
  if (collections[props.collection_path]) {
    return collections[props.collection_path];
  } else return null;
});

const closed = ref(props.initial_closed);
</script>

<template>
  <div class="collection" :style="{ '--depth': props.depth, '--indent': props.indent }">
    <p v-if="props.show_collection_name" class="collection-name" @click="closed = !closed">
      <v-icon class="icon" name="bi-folder" v-if="closed"></v-icon>
      <v-icon class="icon" name="bi-folder2-open" v-else></v-icon>
      <span class="text" v-if="props.show_full_collection_name">
        <span v-for="collection_path, i in [...collection.parent_collection_paths, collection.path]"
          :key="collection_path">
          <span class="item">
            {{ collections[collection_path].name }}
          </span>
          <span class="delim" v-if="i < collection.parent_collection_paths.length">/</span>
        </span>
      </span>
      <span class="text" v-else>{{ collection.name }}</span>
    </p>
    <div class="documents" v-if="collection.document_paths.length > 0" v-show="!closed">
      <DocumentBlockComponent v-for="document_path in collection.document_paths" :key="document_path"
        :document_path="document_path" :depth="props.depth" :indent="props.indent" />
    </div>
    <div class="subcollections"
      v-if="props.show_subcollections && collection.subcollection_paths.length > 0" v-show="!closed">
      <CollectionComponent v-for="subcollection_path in collection.subcollection_paths" :key="subcollection_path"
        :collection_path="subcollection_path" :show_collection_name="props.show_collection_name"
        :show_full_collection_name="false" :show_description="props.show_description"
        :show_documents="props.show_documents" :depth="props.depth + 1" :indent="props.indent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  $treeview-width: 1em;
  $treeview-height: 2em;
  $treeview-padding: 0.5em;
  $treeview-color: var(--site-border);

  $gap: 0.25em;
  user-select: none;

  position: relative;

  &:not(.no-gutter):not(:last-child)::before {
    position: absolute;
    top: 1em;
    left: calc(var(--depth) * var(--indent) - #{$treeview-width + $treeview-padding});
    height: 100%;
    z-index: 10;

    border: {
      left: 1px solid $treeview-color;
    }

    content: "";
    display: inline-block;
  }

  .collection-name {
    display: inline-flex;
    cursor: pointer;
    font-size: 1em;
    align-items: center;
    column-gap: 0.5em;
    position: relative;

    padding: {
      top: $gap;
      bottom: $gap;
    }

    margin: {
      left: calc(var(--depth) * var(--indent));
    }

    .icon {
      position: relative;
      top: 0.05em;
    }

    .text {
      font-weight: bold;

      display: inline-flex;
      flex-wrap: wrap;

      .delim {
        margin: {
          left: 0.5em;
          right: 0.5em;
        }
      }
    }

    &:not(.no-gutter)::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 1em;
      left: -#{$treeview-width + $treeview-padding};
      width: $treeview-width;

      border: {
        bottom: 1px solid $treeview-color;
      }
    }
  }

  .documents {
    position: relative;

    &:not(.no-gutter):not(:last-child):before {
      position: absolute;
      top: 0em;
      left: calc((var(--depth) + 1) * var(--indent) - #{$treeview-padding + $treeview-width});
      width: $treeview-width;
      height: calc(100% + 1em);
      z-index: 10;

      border: {
        left: 1px solid $treeview-color;
      }

      content: "";
      display: inline-block;
    }
  }


}
</style>