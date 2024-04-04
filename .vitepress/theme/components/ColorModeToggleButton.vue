<script setup lang="ts">
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const onColorModeToggleBtnClicked = () => {
  toggleDark();
}
</script>

<template>
  <div class="color-mode-toggle-btn" @click="onColorModeToggleBtnClicked">
    <div class="background light-mode-background" v-if="!isDark">
      <v-icon name="bi-sun" scale="1.1" title="Light mode" />
    </div>
    <div class="background dark-mode-background" v-if="isDark">
      <v-icon name="bi-moon" scale="1.1" title="Dark mode" />
    </div>
    <div class="ball" :class="{'light': !isDark, 'dark': isDark}"></div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins";

.color-mode-toggle-btn {
  $ball-size: 1.4em;
  $padding: 0.3em;
  $border: 0px;
  $background-width: calc($ball-size * 2 + $padding * 2 + $padding + $border * 2);
  $background-height: calc($ball-size + $padding * 2 + $border * 2);
  
  --color-mode-toggle-btn-background: var(--site-panel-background);
  --color-mode-toggle-btn-ball-light: var(--site-panel-background);
  --color-mode-toggle-btn-ball-dark: var(--site-panel-background);

  
  display: inline-block;
  cursor: pointer;
  position: relative;

  .background {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $background-width;
    height: $background-height;
    border-radius: calc($background-width / 2);
    padding: $padding;
    color: var(--site-muted-text);
    background: var(--color-mode-toggle-btn-background);
    border: $border solid transparent;
    @include shadow_inset_small;
    
    &.light-mode-background {
      justify-content: flex-end;
    }

    &.dark-mode-background {
      justify-content: flex-start;
    }
  }

  .ball {
    width: $ball-size;
    height: $ball-size;
    border-radius: 50%;
    @include shadow_outset;
    position: absolute;
    top: calc($padding + $border);
    transition: left 1s;

    &.light {
      left: calc($border + $padding);
      background: var(--color-mode-toggle-btn-ball-light);
    }

    &.dark {
      left: calc($border + $padding + $ball-size + $padding);
      background: var(--color-mode-toggle-btn-ball-dark);
    }
  }
}
</style>