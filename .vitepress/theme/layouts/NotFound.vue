<script setup lang="ts">
import Panel from '@/layouts/Panel.vue';
</script>

<template>
  <Panel class="page">
    <h1 class="page-title">Page not found :(</h1>
    <p class="page-content">요청하신 페이지는 없거나 이동되었습니다.</p>
    <p class="page-content">왼쪽 패널의 검색 기능을 활용해 보세요.</p>
  </Panel>
</template>

<style scoped lang="scss">
.page {
  .page-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .page-content {
    text-align: center;
  }
}
</style>