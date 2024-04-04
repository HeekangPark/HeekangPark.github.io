<script setup lang="ts">
import _ from "lodash";

import { computed } from 'vue';
import { useRoute, useData } from 'vitepress';
import { useHead } from '@vueuse/head';
import type { ThemeConfig } from "@/themeConfig";

// layouts
import Default from "@/layouts/Default.vue";
import Document from "@/layouts/Document.vue";
import NotFound from "@/layouts/NotFound.vue";

// pages
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import Collections from '@/pages/Collections.vue';
import Collection from '@/pages/Collection.vue';
import Tags from '@/pages/Tags.vue';
//import Tag from '@/pages/Tag.vue';
import Guestbook from "@/pages/Guestbook.vue";
import Search from "@/pages/Search.vue";

const route = useRoute();
const path = computed(() => route.path);

import { data } from "@/data/documents.data";
const { collections, documents, tags } = data;

const layout = computed(() => {
  // pages
  if (path.value === "/") return "home";
  if (path.value === "/about") return "about";
  if (path.value === "/collections") return "collections";
  if (path.value === "/tags") return "tags";
  if (path.value === "/guestbook") return "guestbook";
  if (path.value === "/search") return "search";

  // collection
  if (Object.keys(collections).includes(path.value)) {
    return "collection";
  }

  // tag
  // if (Object.keys(tags).includes(path.value)) {
  //   return "tag";
  // }

  // document
  if (Object.keys(documents).includes(path.value)) {
    const document = documents[path.value];
    return document.layout;
  }

  return null;
});

const document_path = computed(() => {
  if (Object.keys(documents).includes(path.value)) {
    return path.value;
  } else return null;
});

const collection_path = computed(() => {
  if (Object.keys(collections).includes(path.value)) {
    return path.value;
  } else return null;
});

const tag_path = computed(() => {
  if (Object.keys(tags).includes(path.value)) {
    return path.value;
  } else return null;
});

const { theme: themeData } = useData<ThemeConfig>();

useHead({
  title: computed(() => {
    let title = "";
    switch (layout.value) {
      case "home":
        title = "Home";
        break;
      case "about":
        title = "About";
        break;
      case "guestbook":
        title = "Guestbook";
        break;
      case "collections":
        title = "Collections";
        break;
      case "tags":
        title = "Tags";
        break;
      case "collection":
        const collection = collections[path.value];
        title = `Collection : ${_.chain(collection.parent_collection_paths)
            .concat(collection.path)
            .map(collection_path => collections[collection_path].name)
            .join(" / ")
            .value()
          }`;
        break;
      // case "tag":
      //   const tag = tags[path.value];
      //   title = `Tag : ${tag.name}`;
      //   break;
      case "document":
        const document = documents[path.value];
        title = document.title;
        break;
      case "search":
        title = "Search";
        break;
      default:
        title = "404 Not Found";
    }

    return `${title} | ${themeData.value.title}`
  }),
  meta: [
    { name: "description", content: themeData.value.title },
    { name: "author", content: themeData.value.author.name },
  ],
})
</script>

<template>
  <Default>
    <NotFound v-if="layout === null" />
    <Home v-else-if="layout === 'home'" />
    <Collections v-else-if="layout === 'collections'" />
    <Collection v-else-if="layout === 'collection'" :collection_path="collection_path" />
    <Tags v-else-if="layout === 'tags'" />
    <!--Tag v-else-if="layout === 'tag'" :tag_path="path" /-->
    <About v-else-if="layout === 'about'" />
    <Guestbook v-else-if="layout === 'guestbook'" />
    <Search v-else-if="layout === 'search'" />
    <Document v-else-if="layout === 'document'" :path="document_path" />
  </Default>
</template>