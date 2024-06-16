<script setup lang="ts">
import _ from 'lodash';
import { ref, computed, onMounted, onUpdated, nextTick, type Ref } from 'vue';

import Panel from "@/layouts/Panel.vue";
import TagComponent from "@/components/TagComponent.vue";
import Giscus from "@giscus/vue";
import AdComponent from '@/components/AdComponent.vue';

import shikiTheme from 'tm-themes/themes/dark-plus.json';

import { useData } from 'vitepress';
import type { ThemeConfig } from "@/themeConfig";
const { theme: themeData } = useData<ThemeConfig>();

import { data } from "@/data/documents.data";
const { collections, documents, tags } = data;

import { useGlobalState } from '@/store';
const state = useGlobalState();

const props = defineProps<{
  path: string;
}>();

const document = computed(() => {
  if (Object.keys(documents).includes(props.path)) {
    return documents[props.path];
  } else return null;
});

const collection = computed(() => {
  if (document.value) {
    return collections[document.value.collection_path];
  }
  return null;
});

const collection_full_name = computed(() => {
  if (collection.value) {
    return [...collection.value.parent_collection_paths, collection.value.path].map(path => collections[path].name).join(" / ");
  }
  return null;
})

const collection_document_paths = computed(() => {
  if (collection.value) {
    return collection.value.document_paths;
  }
  return [];
});

const current_document_index = computed(() => {
  return collection_document_paths.value.indexOf(document.value.path);
});

const prev_document = computed(() => {
  if (document.value) {
    const index = collection_document_paths.value.indexOf(document.value.path);
    if (index > 0) {
      const prev_document_path = collection_document_paths.value[index - 1];
      return documents[prev_document_path];
    }
  }
  return null;
});

const next_document = computed(() => {
  if (document.value) {
    const index = collection_document_paths.value.indexOf(document.value.path);
    if (index < collection_document_paths.value.length - 1) {
      const next_document_path = collection_document_paths.value[index + 1];
      return documents[next_document_path];
    }
  }
  return null;
});

const sibling_documents = computed(() => _.chain(collection_document_paths.value).map(path => documents[path]).value());

const is_series_opened = ref(false);
const toggle_series_opened = () => {
  is_series_opened.value = !is_series_opened.value;
};

const giscusTheme = computed(() => {
  return state.isDark.value ? themeData.value.giscus.darkTheme : themeData.value.giscus.lightTheme;
});

// footnotes
const el__content = ref<HTMLElement | null>(null);
const el__footnote_popup = ref<HTMLElement | null>(null);
const footnote_popups = ref<{ [key: string]: HTMLElement }>({});
const selected_footnote_id = ref<string | null>(null);

const showFootnotePopup = (id: string, top: number, left: number) => {
  selected_footnote_id.value = id;

  el__footnote_popup.value.classList.remove("hidden");
  el__footnote_popup.value.innerHTML = footnote_popups.value[id].innerHTML;

  const rect_self = el__footnote_popup.value.getBoundingClientRect();
  el__footnote_popup.value.style.setProperty("--top", `${top - rect_self.height}px`);
  el__footnote_popup.value.style.setProperty("--left", `${left}px`);
}

const hideFootnotePopup = () => {
  if (selected_footnote_id.value === null) return;

  selected_footnote_id.value = null;
  el__footnote_popup.value.innerHTML = "";
  el__footnote_popup.value.classList.add("hidden");
}

const buildFootnotePopups = () => {
  // reset
  footnote_popups.value = {};
  selected_footnote_id.value = null;

  // build popups
  el__content.value?.querySelectorAll(".footnote-item").forEach((el, i) => {
    const copy = el.cloneNode(true) as HTMLElement;

    const a = copy.querySelector(".footnote-backref");
    a.remove();

    const div = window.document.createElement("div");
    div.innerHTML = copy.innerHTML;

    footnote_popups.value[copy.id] = div;
  });

  // link popups
  el__content.value?.querySelectorAll(".footnote-ref").forEach((el, i) => {
    const a = el.querySelector("a");
    if (a) {
      const span = window.document.createElement("span");
      span.innerHTML = a.innerHTML;
      span.id = a.id;
      a.replaceWith(span);

      const target = a.getAttribute("href")?.slice(1);
      span.addEventListener("click", (e) => {
        e.preventDefault();

        if (selected_footnote_id.value === target) {
          hideFootnotePopup();
        } else {
          const rect_content = el__content.value?.getBoundingClientRect();
          const rect_span = span.getBoundingClientRect();
          const top = rect_span.top - rect_content.top;
          const left = rect_span.left - rect_content.left + rect_span.width / 2;
          showFootnotePopup(target, top, left);
        }
      });
    }
  });

  // close popups on click outside
  window.document.addEventListener("click", async (e) => {
    await nextTick();

    if (selected_footnote_id.value !== null) {
      if (!(e.target as HTMLElement).closest(".footnote-popup") && !(e.target as HTMLElement).closest(".footnote-ref")) {
        hideFootnotePopup();
      }
    }
  });
}

// toc
const el__toc = ref<HTMLElement | null>(null);
const buildTOC = () => {
  // reset
  el__toc.value.innerHTML = "";

  // build toc
  let prev_level = 0;
  let level_indices = [0, 1, 1, 1, 1, 1, 1];

  el__content.value?.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
    const level = parseInt(el.tagName.slice(1));
    const content = el.innerHTML;
    const id = el.id;

    const div = window.document.createElement("div");

    div.classList.add("toc-item");
    div.classList.add(`toc-level-${level}`);

    div.innerHTML = `<span class="toc-item-idx">${level_indices[level]}. </span><a href="#${id}">${content}</a>`;

    el__toc.value.appendChild(div);

    level_indices[level] += 1;
    if (level < prev_level) {
      for (let i = level + 1; i <= 6; i++) {
        level_indices[i] = 1;
      }
    }
    prev_level = level;
  });
}

// pageviews
const pageviews: Ref<{ [path: string]: number } | null> = ref(null);

onMounted(async () => {
  await nextTick();
  buildTOC();
  buildFootnotePopups();

  // update pageviews
  pageviews.value = await state.getPageviews();
});

onUpdated(async () => {
  await nextTick();
  buildTOC();
  buildFootnotePopups();

  // update pageviews
  pageviews.value = await state.getPageviews();
});
</script>

<template>
  <Panel class="document">
    <div class="document-header">
      <p class="collection"><a :href="collection.path">
          {{ collection_full_name }}
        </a></p>
      <h1 class="title">{{ document.title }}</h1>
      <div class="wrapable">
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
        <p class="with-icon views" v-if="pageviews && pageviews[props.path] !== null">
          <span class="name">
            <v-icon class="icon" name="bi-eye" scale="1" title="Views" />
            <span class="text">Views</span>
          </span>
          <span class="value">{{ pageviews[props.path] }}</span>
        </p>
      </div>
    </div>
    <div class="series" v-if="collection.is_series && collection_document_paths.length > 1">
      <a class="series-title" :href="collection.path">{{ collection.name }}</a>
      <div class="series-content" v-show="is_series_opened">
        <p class="series-description" v-if="collection.description">{{ collection.description }}</p>
        <ol class="series-documents">
          <li class="series-document" v-for="document_path in collection_document_paths" :key="document_path"
            :class="{ 'current-document': document_path === document.path }">
            <a :href="document_path">{{ documents[document_path].title }}</a>
          </li>
        </ol>
      </div>
      <div class="line">
        <div class="left" @click="toggle_series_opened">
          <p class="opened btn" v-if="is_series_opened">
            <v-icon class="icon" name="bi-caret-up-fill" scale="1" />
            <span>목록 닫기</span>
          </p>
          <p class="closed btn" v-else>
            <v-icon class="icon" name="bi-caret-down-fill" scale="1" />
            <span>목록 열기</span>
          </p>
        </div>
        <div class="right">
          <p class="index">{{ current_document_index + 1 }} / {{ collection_document_paths.length }}
          </p>
          <a class="prev-document btn" v-if="prev_document" :href="prev_document.path">
            <v-icon class="icon" name="bi-chevron-left" scale="1" />
          </a>
          <a class="next-document btn" v-if="next_document" :href="next_document.path">
            <v-icon class="icon" name="bi-chevron-right" scale="1" />
          </a>
        </div>
      </div>
    </div>
    <div class="content" :style="{
      '--code-block-background': (shikiTheme as any).colors['editor.background'],
      '--code-block-text': (shikiTheme as any).colors['editor.foreground'],
      '--code-block-menu-background': (shikiTheme as any).colors['menu.background'],
      '--code-block-menu-border': (shikiTheme as any).colors['menu.border'],
      '--code-block-menu-text': (shikiTheme as any).colors['menu.foreground'],
    }" ref="el__content">
      <div class="toc" ref="el__toc"></div>
      <Content></Content>
      <div class="footnote-popup hidden" ref="el__footnote_popup"></div>
    </div>
    <div class="relative-documents">
      <div class="tags-section section">
        <div class="tags">
          <TagComponent v-for="tag_path in document.tag_paths" :key="tag_path" :tag_path="tag_path" />
        </div>
      </div>
      <div class="adjacent-documents-section section">
        <div class="adjacent-documents">
          <a class="adjacent-document prev-document" v-if="prev_document" :href="prev_document.path">
            <v-icon class="arrow" name="bi-chevron-left" scale="1.5" />
            <p class="indicator">Previous Document</p>
            <p class="adjacent-document-title">{{ prev_document.title }}</p>
          </a>
          <a class="adjacent-document next-document" v-if="next_document" :href="next_document.path">
            <v-icon class="arrow" name="bi-chevron-right" scale="1.5" />
            <p class="indicator">Next Document</p>
            <p class="adjacent-document-title">{{ next_document.title }}</p>
          </a>
        </div>
      </div>
      <div class="sibling-documents-section section">
        <p class="section-title">같은 컬랙션의 다른 문서</p>
        <div class="sibling-documents">
          <a v-for="sibling_document in sibling_documents" :key="sibling_document.path" class="sibling-document"
            :href="sibling_document.path">
            <p class="document-title">{{ sibling_document.title }}</p>
            <div class="document-meta">
              <p class="with-icon date-created" v-if="sibling_document.date_created">
                <span class="name">
                  <v-icon class="icon" name="bi-plus-circle" scale="1" title="Created Date" />
                </span>
                <span class="value">{{ sibling_document.date_created }}</span>
              </p>
              <p class="with-icon date-modified" v-if="sibling_document.date_modified">
                <span class="name">
                  <v-icon class="icon" name="bi-pencil-square" scale="1" title="Date Modified" />
                </span>
                <span class="value">{{ sibling_document.date_modified }}</span>
              </p>
              <p class="with-icon views" v-if="pageviews && pageviews[sibling_document.path] !== null">
                <span class="name">
                  <v-icon class="icon" name="bi-eye" scale="1" title="Views" />
                </span>
                <span class="value">{{ pageviews[sibling_document.path] }}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </Panel>
  <Panel class="comment panel">
    <p class="panel-title">Comments</p>
    <Giscus id="comments" :repo="themeData.giscus.repo" :repoId="themeData.giscus.repoId"
      :category="themeData.giscus.category" :categoryId="themeData.giscus.categoryId" mapping="pathname" strict="0"
      reactionsEnabled="1" emitMetadata="0" inputPosition="top" :theme="giscusTheme" lang="ko" loading="lazy"
      crossorigin="anonymous" async />
  </Panel>
  <Panel class="ad panel">
    <p class="panel-title">Advertisement</p>
    <AdComponent />
  </Panel>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
@import "@/styles/mixins";

.toc {
  display: inline-block;
  border: 1px solid var(--site-border);
  border-radius: 1em;
  overflow-x: auto;

  padding: {
    top: 1.5em;
    bottom: 1.5em;
    left: 1.5em;
    right: 1.5em;
  }

  margin: {
    bottom: 2em;
  }

  &::before {
    display: block;
    content: "[Table of Contents]";
    font-size: 1.1em;
    font-weight: bold;
    color: var(--site-text);

    margin: {
      bottom: 1em;
    }
  }

  :deep(.toc-item) {
    padding: {
      top: 0.25em;
      bottom: 0.25em;
    }

    @for $i from 1 through 6 {
      &.toc-level-#{$i} {
        margin-left: calc((#{$i} - 1) * 1.5em);
      }
    }
  }
}

.footnote-popup {
  --aside: 1em;
  --tip_size: 0.5em;

  display: block;
  position: absolute;
  z-index: 2000;
  left: calc(-1 * var(--aside));
  right: calc(-1 * var(--aside));
  top: calc(var(--top) - var(--tip_size));
  padding: 1em;
  border-radius: 0.5em;
  background: var(--footnote-popup-background);
  border: 1px solid var(--footnote-popup-border);
  color: var(--site-text);
  font-size: 0.9rem;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: calc(var(--left) + var(--aside));
    transform: translateX(-50%);
    border: var(--tip_size) solid transparent;
    border-top-color: var(--footnote-popup-border);
  }

  &.hidden {
    display: none;
  }
}

.document {
  --scrollbar-thumb: var(--document-scrollbar-thumb);
  --scrollbar-thumb-hover: var(--document-scrollbar-thumb-hover);
  --scrollbar-thumb-active: var(--document-scrollbar-thumb-active);

  .document-header {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: {
      bottom: 1em;
    }

    border: {
      bottom: 1px solid var(--site-border);
    }

    margin: {
      bottom: 1em;
    }

    .collection {
      display: inline-block;
      color: var(--site-muted-text);
      font-size: 1em;
      text-align: center;

      margin: {
        bottom: 0.5em;
      }
    }

    .title {
      font-size: 2em;
      display: inline-block;
      font-weight: bold;
      text-align: center;

      margin: {
        bottom: 0.5em;
      }
    }

    .wrapable {
      display: flex;
      flex-wrap: wrap;
      column-gap: 2em;
      row-gap: 0.5em;
      justify-content: center;

      margin: {
        bottom: 0.5em;
      }

      .with-icon {
        display: flex;
        align-items: center;
        color: var(--site-muted-text);

        .name {
          flex-shrink: 0;

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
    }
  }

  .series {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin: {
      bottom: 2em;
    }

    padding: {
      top: 0.5em;
      bottom: 0.5em;
      left: 1.5em;
      right: 1.5em;
    }

    border-radius: 1em;
    @include shadow_inset_small;

    .series-title {
      font-size: 1.2em;

      padding: {
        top: 1em;
        bottom: 1em;
      }

      font-weight: bold;
      display: inline-block;
      cursor: pointer;
      position: relative;
      left: -0.25em;
    }

    .series-content {
      .series-description {
        margin: {
          bottom: 1em;
        }

        font-size: 0.9em;
        color: var(--site-muted-text);
      }

      .series-documents {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 0.5em;
        list-style-position: inside;

        margin: {
          bottom: 1em;
        }

        .series-document {
          font-size: 1em;
          color: var(--site-muted-text);

          &:hover {
            color: var(--site-text);
          }

          &.current-document {
            color: var(--site-text);
            font-weight: bold;
            cursor: default;
          }


        }
      }

    }

    .line {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      align-items: center;
      justify-content: space-between;

      margin: {
        bottom: 1em;
      }

      .left {
        display: flex;
        align-items: center;

        .btn {
          display: inline-flex;
          align-items: center;
          column-gap: 0.25em;
          cursor: pointer;
          font-size: 0.9em;
          flex-shrink: 0;
        }
      }

      .right {
        $btn-width: 2em;

        display: grid;
        grid-template-columns: auto $btn-width $btn-width;
        align-items: center;
        column-gap: 0.5em;

        .index {
          font-size: 0.9em;
          color: var(--site-muted-text);
          justify-self: center;
          flex-shrink: 0;

          margin: {
            right: 1em;
          }
        }

        .btn {
          flex-shrink: 0;
          display: flex;
          width: $btn-width;
          height: $btn-width;
          align-items: center;
          justify-content: center;
          color: var(--site-muted-text);
          font-size: 0.9em;
          text-decoration: none;
          border-radius: 50%;
          padding: 0.25em;
          @include shadow_outset_small;

          &:hover {
            color: var(--site-text);
            @include shadow_outset;
          }

          &:active {
            @include shadow_inset_small;
          }

          &.prev-document {
            justify-self: center;
            grid-column: 2 / 3;
          }

          &.next-document {
            justify-self: center;
            grid-column: 3 / 4;
          }
        }
      }
    }

  }

  .content {
    font-size: 1rem;
    position: relative;

    &:deep(> *) {
      @import "@/styles/document.scss";
    }
  }

  .relative-documents {
    margin: {
      top: 5em;
    }

    border: {
      top: 1px solid var(--site-border);
    }

    padding: {
      top: 1em;
    }

    .tags-section {
      .tags {
        display: flex;
        flex-wrap: wrap;
        column-gap: 0.5em;
        row-gap: 0.5em;
        justify-content: flex-start;
      }
    }

    .adjacent-documents-section {
      margin: {
        top: 2em;
      }

      .adjacent-documents {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1em;
        align-items: stretch;

        .adjacent-document {
          display: grid;
          grid-template-rows: auto auto;
          column-gap: 0.5em;
          row-gap: 0.25em;
          color: var(--site-muted-text);
          border-radius: 1em;
          padding: 1em;
          @include shadow_outset_small;

          &:hover {
            @include shadow_outset;
          }

          &:active {
            @include shadow_inset_small;
          }

          .arrow {
            grid-row: 1 / 3;
            align-self: center;
          }

          .indicator {
            font-size: 0.9em;
            grid-row: 1 / 2;
          }

          .adjacent-document-title {
            font-weight: bold;
            font-size: 1.1em;
            grid-row: 2 / 3;
          }

          &.prev-document {
            grid-column: 1 / 2;
            grid-template-columns: auto 1fr;
            text-align: left;

            .arrow {
              grid-column: 1 / 2;
            }

            .indicator {
              grid-column: 2 / 3;
            }

            .adjacent-document-title {
              grid-column: 2 / 3;
            }
          }

          &.next-document {
            grid-column: 2 / 3;
            grid-template-columns: 1fr auto;
            text-align: right;

            .arrow {
              grid-column: 2 / 3;
            }

            .indicator {
              grid-column: 1 / 2;
            }

            .adjacent-document-title {
              grid-column: 1 / 2;
            }
          }

          &:hover {
            background: var(--hovered-document-background);
          }
        }
      }
    }

    .sibling-documents-section {
      margin: {
        top: 2em;
      }

      .section-title {
        font-size: 1.1em;
        font-weight: bold;

        margin: {
          top: 1em;
          bottom: 0.5em;
        }
      }

      .sibling-documents {
        display: flex;
        overflow-x: auto;
        column-gap: 1em;

        padding: {
          top: 1em;
          bottom: 1em;
          left: 0.5em;
          right: 0.5em;
        }

        margin: {
          bottom: -0.5em;
        }

        border-radius: 1em;

        @include scrollbar;

        .sibling-document {
          width: 15em;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding: 1em;
          border-radius: 1em;
          color: var(--site-muted-text);

          @include shadow_outset_small;

          &:hover {
            @include shadow_outset;
          }

          &:active {
            @include shadow_inset_small;
          }

          .document-title {
            font-weight: bold;
            font-size: 1.1em;
          }

          .with-icon {
            display: flex;
            align-items: center;
            color: var(--site-muted-text);

            margin: {
              top: 0.25em;
            }

            .name {
              flex-shrink: 0;

              .icon {
                margin-right: 0.25em;
              }
            }
          }

          &:hover {
            background: var(--hovered-document-background);
          }
        }
      }
    }
  }
}

.panel {
  .panel-title {
    font-size: 1.25em;
    margin-bottom: 2em;
    font-weight: bold;
  }
}
</style>
