<script lang="ts" setup>
import { ref, type Ref, computed, onMounted, onUpdated, watch } from "vue";
import { useRouter } from "vitepress";

import TagComponent from "./TagComponent.vue";

import { data } from "@/data/documents.data";
const { documents, collections } = data;

import { useGlobalState } from "@/store";
const state = useGlobalState();

const props = withDefaults(defineProps<{
  document_path: string;
  do_not_show_collection?: boolean;
  do_not_show_excerpt?: boolean;
  do_not_show_date_created?: boolean;
  do_not_show_date_modified?: boolean;
  do_not_show_pageview?: boolean;
  do_not_show_tags?: boolean;
  depth?: number;
  indent?: string;
  pageviews?: { [key: string]: number };
}>(), {
  do_not_show_collection: false,
  do_not_show_excerpt: false,
  do_not_show_date_created: false,
  do_not_show_date_modified: false,
  do_not_show_pageview: false,
  do_not_show_tags: false,
  depth: -1,
  indent: "2em",
  pageviews: null
});

const document = computed(() => {
  if (documents[props.document_path]) {
    return documents[props.document_path];
  } else return null;
});

const collection = computed(() => {
  if (document.value && collections[document.value.collection_path]) {
    return collections[document.value.collection_path];
  } else return null;
});

const router = useRouter();

const onCollectionClicked = (path: string) => {
  router.go(path);
};

const onDocumentBlockClicked = () => {
  if (document.value) {
    router.go(document.value.path);
  }
};

const pageview = computed(() => {
  if (props.pageviews && props.pageviews[props.document_path] !== null) {
    return props.pageviews[props.document_path];
  } else return null;
});
</script>

<template>
  <div class="document-block" @click.stop="onDocumentBlockClicked">
    <div class="indentation" :style="{ '--depth': props.depth, '--indent': props.indent }">
      <p class="collection" v-if="!props.do_not_show_collection">
        <span v-for="collection_path, i in [...collection.parent_collection_paths, collection.path]" :key="collection_path">
          <span class="item" @click.stop="onCollectionClicked(collection_path)">
            {{ collections[collection_path].name }}
          </span>
          <span class="delim" v-if="i < collection.parent_collection_paths.length">/</span>
        </span>
      </p>
      <p class="title">{{ document.title }}</p>
      <div class="metas">
        <p class="with-icon date-created" v-if="document.date_created">
          <span class="name">
            <v-icon class="icon" name="bi-plus-circle" scale="1" title="Date Created" />
            <span class="text">Date Created</span>
          </span>
          <span class="value">{{ document.date_created }}</span>
        </p>
        <p class="with-icon date-modified" v-if="document.date_modified">
          <span class="name">
            <v-icon class="icon" name="bi-pencil-square" scale="1" title="Date Modified" />
            <span class="text">Date Modified</span>
          </span>
          <span class="value">{{ document.date_modified }}</span>
        </p>
        <p class="with-icon pageview" v-if="!props.do_not_show_pageview && pageview !== null">
          <span class="name">
            <v-icon class="icon" name="bi-eye" scale="1" title="Views" />
            <span class="text">Views</span>
          </span>
          <span class="value">{{ pageview }}</span>
        </p>
      </div>
      <p class="excerpt" v-if="!props.do_not_show_excerpt">{{ document.excerpt }}</p>
      <div class="tags" v-if="!props.do_not_show_tags && document.tag_paths.length > 0">
        <TagComponent v-for="tag in document.tag_paths" :key="tag" :tag_path="tag" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

$margin: 0.5em;

.document-block {
  --hovered-document-background: var(--site-highlight-background);
  cursor: pointer;

  padding: {
    top: 1em;
    bottom: 1em;
    left: $panel-padding;
    right: $panel-padding;
  }

  margin: {
    left: -$panel-padding;
    right: -$panel-padding;
  }

  &:hover {
    .title {
      text-decoration: underline;
    }
    background: var(--hovered-document-background);
  }

  &:last-child {
    margin: {
      bottom: 0;
    }

    border: {
      bottom: 0;
    }
  }

  .indentation {
    margin: {
      left: calc((var(--depth) + 1) * var(--indent));
    }
    
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
  }

  .collection {
    display: inline-block;
    font-size: 0.9em;
    color: var(--site-muted-text);
    display: inline-flex;
    flex-wrap: wrap;

    .item {
      &:hover {
        text-decoration: underline;
      }
    }

    .delim {
      margin: {
        left: 0.5em;
        right: 0.5em;
      }
    }
  }

  .title {
    font-size: 1.1em;
    font-weight: bold;
    color: var(--site-highlight-text);
  }

  .metas {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1em;
    row-gap: 0.25em;
    margin: {
      top: 0.25em;
      bottom: 0.25em;
    }
  }

  .with-icon {
    display: flex;
    align-items: center;
    color: var(--site-muted-text);
    font-size: 0.9em;

    .name {
      .icon {
        margin-right: 0.25em;
      }

      .text::after {
        content: ":";
        margin-left: 0.25em;
        margin-right: 0.25em;

      }

      @include phone {
        .text {
          display: none;
        }
      }
    }
  }

  .excerpt {
    color: var(--site-muted-text);
    line-height: $line-height;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.5em;
    row-gap: 0.5em;
    justify-content: flex-start;
    font-size: 0.9em;
  }
}
</style>