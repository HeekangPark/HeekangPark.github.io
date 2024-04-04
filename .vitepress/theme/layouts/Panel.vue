<script setup lang="ts">
</script>

<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.panel {
  background-color: var(--site-panel-background);
  @include shadow_outset_small;
  border-radius: 1em;
  padding: $panel-padding;
}
</style>