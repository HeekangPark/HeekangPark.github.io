<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import type { ThemeConfig } from '@/themeConfig';

const { theme: themeData } = useData<ThemeConfig>();

const adClient = computed(() => themeData.value.googleAdSense.adClient);
const adSlot = computed(() => themeData.value.googleAdSense.adSlot);

onMounted(() => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient.value}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  script.onload = () => {
    // @ts-ignore
    (adsbygoogle = window.adsbygoogle || []).push({});
  };
});
</script>

<template>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7509436363176620"
     crossorigin="anonymous"></script>
  <ins
    class="adsbygoogle"
    style="display:block"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
</template>