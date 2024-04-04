<script setup lang="ts">
import { computed, ref } from "vue";
import { useData, useRoute, useRouter } from 'vitepress';
import { useGlobalState } from '@/store';
import type { ThemeConfig } from "@/themeConfig";

import Panel from "@/layouts/Panel.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import ColorModeToggleButton from "@/components/ColorModeToggleButton.vue";

const { theme: themeConfig } = useData<ThemeConfig>();
const state = useGlobalState();
const route = useRoute();
const router = useRouter();

const leftSearchModel = computed({
  get: () => state.leftSearchModel.value,
  set: (value) => state.leftSearchModel.value = value
});

const onInternalLinkClick = (link: string) => {
  if (link === route.path) {
    state.closeLeftPanel();
  }
}

const search = () => {
  if (leftSearchModel.value) {
    state.search(leftSearchModel.value);
    router.go(`/search`);
  }
}
</script>

<template>
  <Panel class="left-panel">
    <div class="logo-section section">
      <a href="/" @click="onInternalLinkClick('/')">
        <img class="site-logo" src="@/assets/logos/logo-light.png" alt="logo">
        <p class="site-title">{{ themeConfig.title }}</p>
      </a>
    </div>
    <div class="internal-links-section section">
      <a class="internal-link" href="/" @click="onInternalLinkClick('/')">
        <v-icon class="icon" name="bi-house-fill" scale="1.2" title="Home" />
        <span class="name">Home</span>
      </a>
      <a class="internal-link" href="/collections" @click="onInternalLinkClick('/collections')">
        <v-icon class="icon" name="bi-folder-fill" scale="1.2" title="Collections" />
        <span class="name">Collections</span>
      </a>
      <a class="internal-link" href="/tags" @click="onInternalLinkClick('/tags')">
        <v-icon class="icon" name="bi-tags-fill" scale="1.2" title="Tags" />
        <span class="name">Tags</span>
      </a>
      <a class="internal-link" href="/about" @click="onInternalLinkClick('/about')">
        <v-icon class="icon" name="bi-person-fill" scale="1.2" title="About" />
        <span class="name">About</span>
      </a>
      <a class="internal-link" href="/guestbook" @click="onInternalLinkClick('/guestbook')">
        <v-icon class="icon" name="bi-mailbox2" scale="1.2" title="Guestbook" />
        <span class="name">Guestbook</span>
      </a>
    </div>
    <div class="search-section section">
      <SearchComponent v-model="leftSearchModel" placeholder="Search" @enter="search" />
    </div>
    <div class="setting-section section">
      <div class="setting color-mode">
        <ColorModeToggleButton />
      </div>
    </div>
    <div class="external-link-section section">
      <a class="external-link" :href="`mailto:${themeConfig.author.email}`" target="_blank" rel="noreferrer">
        <v-icon class="icon" name="bi-envelope-fill" scale="1.8" title="Email" />
      </a>
      <a class="external-link" :href="`${themeConfig.author.github}`" target="_blank" rel="noreferrer">
        <v-icon class="icon" name="bi-github" scale="1.8" title="GitHub" />
      </a>
    </div>
  </Panel>
</template>

<style scoped lang="scss">
.left-panel {
  width: 100%;
  max-height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.section {
  width: 100%;

  padding: {
    bottom: 2em;
  }

  &:last-child {
    padding: {
      bottom: 0;
    }
  }
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: inline-block;
    text-align: center;

    .site-logo {
      width: 70%;
      height: auto;
      max-width: 8em;
      filter: var(--site-logo-filter);
    }

    .site-title {
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 1.1em;
      word-break: keep-all;
    }
  }
}

.internal-links-section {
  display: flex;
  flex-direction: column;

  .internal-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 0.5em;
    position: relative;

    padding: {
      top: 0.75em;
      bottom: 0.75em;
    }

    border: {
      bottom: 1px solid var(--site-border);
    }

    color: var(--site-muted-text);

    &:hover {
      color: var(--site-highlight-text);
    }

    &:last-child {
      border: {
        bottom: none;
      }
    }

    .icon {
      position: relative;
    }
  }
}

.search-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.setting-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.external-link-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 1em;
  row-gap: 1em;

  .external-link {
    color: var(--site-muted-text);

    &:hover {
      color: var(--site-highlight-text);
    }
  }
}
</style>
