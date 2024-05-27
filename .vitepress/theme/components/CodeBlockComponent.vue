<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  title?: string
}>();
</script>

<template>

  <div class="code-block" :class="{ 'show-title': props.title }">
    <p class="title" v-if="props.title">{{ props.title }}</p>
    <slot></slot>
  </div>

</template>

<style scoped lang="scss">
@import "@/styles/mixins";
@import "@/styles/variables";

.code-block {
  @include gap;

  .title {
    color: var(--shiki-text);
    background-color: var(--shiki-background);

    padding: {
      top: $code-block-padding;
      bottom: $code-block-padding;
      left: $code-block-padding;
      right: $code-block-padding;
    }

    margin: 0 !important;
    border-top-left-radius: $code-block-border-radius;
    border-top-right-radius: $code-block-border-radius;
  }

  &.show-title {
    :deep(div[class*="language-"]) {
      border-radius: 0 !important;
      margin: 0 !important;

      &:last-child {
        border-bottom-left-radius: $code-block-border-radius !important;
        border-bottom-right-radius: $code-block-border-radius !important;
      }
    }
  }
}
</style>