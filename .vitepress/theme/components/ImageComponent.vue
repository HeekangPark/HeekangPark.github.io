<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vitepress';

const props = defineProps<{
  src: string
  title?: string
  description?: string
  alt?: string
}>();

const route = useRoute();

const src = computed(() => {
  if (props.src.startsWith('http')) { // External URL
    return props.src;
  } else if (props.src.startsWith('/')) { // Absolute path
    return props.src;
  } else { // Relative path
    return `/imgs/${route.path.split('/').slice(1, -1).join('/')}/${props.src}`;
  }
});
const alt = computed(() => props.alt || props.title || props.src);

const popover = ref(false);
</script>

<template>
  <figure class="figure">
    <img class="img" :src="src" :alt="alt" @click="popover = true"/>
    <figcaption class="figcaption" v-if="props.title || props.description">
      <p class="title" v-if="props.title">{{ props.title }}</p>
      <p class="description" v-if="props.description">{{ props.description }}</p>
    </figcaption>
  </figure>
  <div class="popover" v-if="popover" @click.self="popover = false">
    <button class="close-btn" @click="popover = false">
      <v-icon name="bi-x-lg" scale="1.75" title="Close Image Popover" />
    </button>
    <img class="popover-img" :src="src" :alt="alt" />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins";

.figure {
  @include gap;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.1em;

  .img {
    max-width: min(100%, 800px);
    max-height: 80vh;
    object-fit: contain;
    cursor: pointer;
  }

  .figcaption {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .title {
      font-weight: bold;
      text-align: center;
      margin: 0 !important;
      line-height: 1.5 !important;
    }

    .description {
      color: var(--site-muted-text);
      margin: 0 !important;
      text-align: center;
      line-height: 1.5 !important;
    }
  }
}

.popover {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  padding: 1em;

  .close-btn {
    position: absolute;
    top: 1em;
    right: 1em;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.25em;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .popover-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>