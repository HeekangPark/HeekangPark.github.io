<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vitepress";

import { data } from "@/data/documents.data";
const { tags } = data;

import { useGlobalState } from "@/store";

const state = useGlobalState();

const props = withDefaults(defineProps<{
  tag_path: string;
  do_not_activate_link?: boolean;
  selected?: boolean;
  show_count?: boolean;
}>(), {
  tag_path: "",
  do_not_activate_link: false,
  selected: false,
  show_count: false,
});

const tag = computed(() => {
  if (tags[props.tag_path]) {
    return tags[props.tag_path];
  } else return null;
});

const router = useRouter();

const onTagClicked = () => {
  if (!props.do_not_activate_link && tag.value) {
    state.resetSelectedTagPaths();
    state.addSelectedTagPath(tag.value.path);
    router.go("/tags");
  }
};
</script>

<template>
  <button class="tag" :class="{ 'selected': props.selected }" @click.stop="onTagClicked" :title="tag.name">
    <v-icon class="icon" name="bi-tag-fill" scale="1" title="Tag" />
    <span class="name">{{ tag.name }}</span>
    <span v-if="props.show_count" class="count">{{ tag.document_paths.length }}</span>
  </button>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
@import "@/styles/mixins";

.tag {
  --tag-text: var(--site-text);
  --tag-background: transparent;

  font-size: 0.8em;
  display: inline-flex;
  align-items: center;
  color: var(--tag-text);

  padding: {
    top: 0.4em;
    bottom: 0.4em;
    left: 0.8em;
    right: 0.8em;
  }

  border-radius: 2em;
  background-color: var(--tag-background);
  word-break: keep-all;
  cursor: pointer;

  @include shadow_outset_small;

  &:hover {
    @include shadow_outset;
  }

  &:active,
  &.selected {
    @include shadow_inset_small;
  }

  .icon {
    margin: {
      right: 0.25em;
    }
  }

  .name {
    margin: {
      right: 0.5em;
    }
  }

  .count {
    font-size: 0.9em;
    border-radius: 1em;
    width: 2em;
    height: 2em;
    padding: 0.5em;
    background: var(--site-highlight-text);
    color: var(--site-highlight-background);


    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
