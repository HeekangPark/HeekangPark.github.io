<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
}>(), {
  value: ''
});

const emit = defineEmits<{
  click: [event: MouseEvent]
}>();

const onClick = (event: MouseEvent) => {
  emit('click', event);
}
</script>

<template>
  <input type="button" class="button" @click="onClick" :value="props.value">
</template>

<style scoped lang="scss">
@import "@/styles/mixins";

.button {
  --button-text: var(--site-text);
  --button-background: transparent;
  
  cursor: pointer;
  user-select: none;
  color: var(--button-text);

  padding: {
    top: 0.5em;
    bottom: 0.5em;
    left: 1em;
    right: 1em;
  }

  border-radius: 1em;
  background: var(--button-background);

  @include shadow_outset_small;

  &:hover {
    @include shadow_outset;
  }

  &:active {
    @include shadow_inset_small;
  }
}
</style>