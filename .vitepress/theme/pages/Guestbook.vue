<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import type { ThemeConfig } from "@/themeConfig";

import Panel from "@/layouts/Panel.vue";
import Giscus from "@giscus/vue";

import { useGlobalState } from '@/store';

const state = useGlobalState();

const { theme: themeData } = useData<ThemeConfig>();
const giscusTheme = computed(() => {
  return state.isDark.value ? themeData.value.giscus.darkTheme : themeData.value.giscus.lightTheme;
});
</script>

<template>
  <Panel>
    <p class="page-title">Guestbook</p>
    <Giscus id="comments" :repo="themeData.giscus.repo" :repoId="themeData.giscus.repoId"
      :category="themeData.giscus.category" :categoryId="themeData.giscus.categoryId" mapping="pathname" strict="0"
      reactionsEnabled="0" emitMetadata="0" inputPosition="top" :theme="giscusTheme" lang="ko" loading="lazy"
      crossorigin="anonymous"  async />
  </Panel>
</template>

<style lang="scss" scoped>
.page-title {
  font-size: 1.5em;
  margin-bottom: 2em;
  font-weight: bold;
  text-align: center;
}
</style>