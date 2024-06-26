<script setup lang="ts">
import { ref, computed } from "vue";

import { useData } from "vitepress";
import Panel from "@/layouts/Panel.vue";

const { page: pageData } = useData();

const title = computed(() => pageData.value.frontmatter.title);
const date_modified = computed(() => pageData.value.frontmatter.date_modified);
</script>

<template>
  <Panel class="document">
    <div class="document-header">
      <h1 class="title">{{ title }}</h1>
      <div class="wrapable">
        <p class="with-icon date-modified">
          <span class="name">
            <v-icon class="icon" name="bi-pencil-square" scale="1" title="Date Modified" />
            <span class="text">Date Modified</span>
          </span>
          <span class="value">{{ date_modified }}</span>
        </p>
      </div>
    </div>
    <div class="content">
      <Content></Content>
    </div>
  </Panel>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
@import "@/styles/mixins";

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

  .content:deep(> *) {
    @import "@/styles/document.scss";

    .toc {
      display: inline-block;
      border: 1px solid var(--site-border);
      border-radius: 1em;

      padding: {
        top: 1em;
        bottom: calc(1em - 8px);
        left: 1em;
        right: calc(1em + 8px);
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

      .toc-list {
        margin: {
          top: 0;
          bottom: 0;
        }
      }
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

.comment {
  .panel-title {
    font-size: 1.25em;
    margin-bottom: 2em;
    font-weight: bold;
  }
}
</style>
