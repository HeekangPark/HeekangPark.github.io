<script setup lang="ts">
import _ from "lodash";
import { computed } from "vue";
import { useWindowScroll } from "@vueuse/core";

import LeftPanel from "@/components/LeftPanelComponent.vue";

import { useGlobalState } from "@/store";
const state = useGlobalState();

const isLeftPanelOpen = computed(() => state.isLeftPanelOpen.value);
const onLeftPanelToggleBtnClicked = () => {
  state.toggleLeftPanel();
};

const { y: windowScroll } = useWindowScroll();
const scrollToTop = () => {
  windowScroll.value = 0;
};

const scrollToBottom = () => {
  windowScroll.value = document.body.scrollHeight;
};
</script>

<template>
  <div class="centered">
    <div class="panel-slots">
      <button class="left-panel-toggle-btn" @click="onLeftPanelToggleBtnClicked">
        <v-icon v-if="isLeftPanelOpen" name="bi-x-lg" scale="1.25" title="Close Left Panel" />
        <v-icon v-else name="bi-three-dots-vertical" scale="1.25" title="Open Left Panel" />
      </button>
      <div class="left-panel-slot" :class="{ 'hide': !isLeftPanelOpen }">
        <LeftPanel />
      </div>
      <div class="right-panel-slot" :class="{ 'hide': isLeftPanelOpen }">
        <slot></slot>
      </div>
    </div>
  </div>
  <div class="scroll-btns">
    <button class="scroll-btn scroll-top-btn" title="Scroll to Top" @click="scrollToTop">
      <v-icon name="bi-caret-up-fill" scale="1.5" />
    </button>
    <button class="scroll-btn scroll-bottom-btn" title="Scroll to Bottom" @click="scrollToBottom">
      <v-icon name="bi-caret-down-fill" scale="1.5" />
    </button>
  </div>
</template>

<style lang="scss">
@import "@/styles/fonts";
@import "@/styles/colors";
@import "@/styles/reset";

@import "@/styles/variables";
@import "@/styles/mixins";

@import "@/styles/nprogress";

body {
  background-color: var(--site-background);
  color: var(--site-text);
  overflow-y: scroll;

  
  --scrollbar-thumb: var(--body-scrollbar-thumb);
  --scrollbar-thumb-hover: var(--body-scrollbar-thumb-hover);
  --scrollbar-thumb-active: var(--body-scrollbar-thumb-active);

  @include scrollbar;
}
</style>

<style scoped lang="scss">
@import "@/styles/variables";
@import "@/styles/mixins";

.centered {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.panel-slots {
  position: relative;
  display: grid;
  align-items: start;
  grid-template-columns: $left-panel-size $main-panel-size-desktop;
  column-gap: $panel-gap;
  padding: $panel-gap;

  @include desktop {
    width: 100%;
    grid-template-columns: $left-panel-size 1fr;
  }

  @include tablet {
    font-size: 0.9em;
  }

  @include phone {
    grid-template-columns: 1fr;
  }
}

.left-panel-toggle-btn {
  display: none;
  position: absolute;
  top: calc($panel-gap * 2);
  right: calc($panel-gap * 2);
  z-index: 1000;
  width: calc($panel-gap * 2.5);
  height: calc($panel-gap * 2.5);
  border-radius: 50%;
  color: var(--site-text);

  &:hover {
    opacity: 1;
    background-color: var(--site-background);
  }

  @include phone {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.right-panel-slot {
  display: flex;
  flex-direction: column;
  gap: $panel-gap;
}

.hide {
  @include phone {
    display: none !important;
  }
}

.scroll-btns {
  position: fixed;
  bottom: 0.75em;
  right: 0.25em;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  .scroll-btn {
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--site-text);
    border: 1px solid var(--site-text);
    opacity: 0.1;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
      color: var(--site-highlight-text);
      border-color: var(--site-highlight-text);
    }
  }
}
</style>