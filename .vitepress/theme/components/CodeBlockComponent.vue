<script setup lang="ts">
import { ref, computed } from 'vue';
import shikiTheme from 'tm-themes/themes/dark-plus.json';
import { data as codeblockTextsData } from "@/data/codeblockTexts.data";

const props = defineProps<{
  title?: string
}>();

const title = computed(() => props.title ? codeblockTextsData[props.title.trim()] : props.title.trim());
</script>

<template>
  <div class="code-block" :class="{ 'show-title': props.title }" :style="{
    '--code-block-result-background': (shikiTheme as any).colors['editor.inactiveSelectionBackground'],
    '--code-block-result-text': (shikiTheme as any).colors['editor.foreground'],
  }">
    <p class="title" v-if="props.title" v-html="title"></p>
    <slot></slot>
  </div>

</template>

<style scoped lang="scss">
@import "@/styles/mixins";
@import "@/styles/variables";

.code-block {
  @include gap;

  .title {
    color: var(--code-block-menu-text);
    background-color: var(--code-block-menu-background);
    font-weight: bold;
    font-size: 0.95em;
    font-family: var(--code-font);
    border: {
      bottom: 1px solid var(--code-block-menu-border);
    }

    padding: {
      top: calc($code-block-padding-vertical * 0.75);
      bottom: calc($code-block-padding-vertical * 0.75);
      left: $code-block-padding-horizontal;
      right: $code-block-padding-horizontal;
    }

    margin: 0 !important;
    border-top-left-radius: $code-block-border-radius;
    border-top-right-radius: $code-block-border-radius;
  }

  &:not(.show-title) {
    :slotted(div[class*="language-"]) {
      &:first-child {
        border-top-left-radius: $code-block-border-radius !important;
        border-top-right-radius: $code-block-border-radius !important;
      }
    }
  }

  :slotted(div[class*="language-"]) {
    @include no-gap;
    border-radius: 0 !important;

      &:last-child {
        border-bottom-left-radius: $code-block-border-radius !important;
        border-bottom-right-radius: $code-block-border-radius !important;
      }

    &.language-result {
      &::before {
        content: '[Result]';
        display: block;
        font-size: 0.75em;
        font-family: var(--code-font);
        padding: {
          top: $code-block-padding-vertical;
          bottom: 0;
          left: $code-block-padding-horizontal;
          right: $code-block-padding-horizontal;
        }
      }
      color: var(--code-block-result-text) !important;
      background-color: var(--code-block-result-background) !important;

      .lang {
        display: none !important;
      }

      .copy {
        display: none !important;
      }

      &:hover {
        .lang {
          display: none;
        }

        .copy {
          display: none;
        }
      }
    }
  }
}
</style>