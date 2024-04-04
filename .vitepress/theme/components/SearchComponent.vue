<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string;
}>(), {
  placeholder: ''
});

const modelValue = defineModel<string>();

const emit = defineEmits<{
  enter: [value: string]
}>();
</script>

<template>
  <input type="text" class="search-component" v-model="modelValue" :placeholder="props.placeholder" @keyup.enter="() => {
    emit('enter', modelValue);
  }" />
</template>

<style scoped lang="scss">
@import "@/styles/mixins";

.search-component {
  --search-text: var(--site-text);
  --search-background: transparent;

  $border: 0px;

  width: 100%;
  padding: {
    top: 0.5em;
    bottom: 0.5em;
    left: 1em;
    right: 1em;
  }
  background: var(--search-background);
  border: $border solid transparent;
  color: var(--search-text);
  border-radius: 1em;
  @include shadow_inset_small;

  &::placeholder {
    color: var(--site-muted-text);
  }
}
</style>