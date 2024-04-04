<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  ids: string[],
  values?: string[]
}>();

const _ids = computed(() => props.ids);
const _values = computed(() => {
  if (props.values) return props.values;
  else return props.ids;
});

const model = defineModel<string>();
</script>

<template>
  <div class="radio-group">
    <div class="radio-button" v-for="id, i in _ids" :key="id">
      <input type="radio" :id="id" :value="id" v-model="model" />
      <label :for="id">{{ _values[i] }}</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixins";

.radio-group {
  --radio-button-text: var(--site-text);
  --radio-button-background: transparent;
  --radio-button-checked: var(--site-highlight-text);

  display: flex;
  gap: 1em;
  color: var(--radio-button-text);

  .radio-button {
    display: flex;
    align-items: flex-end;
    gap: 0.5em;

    label {
      flex-shrink: 0;
      cursor: pointer;
    }

    input {
      $size: 1.25em;
      $padding: 5px;

      cursor: pointer;
      border-radius: 50%;
      width: $size;
      height: $size;
      position: relative;
      background: var(--radio-button-background);
      
      @include shadow_inset_small;

      &:checked {        
        &::before {
          content: '';
          position: absolute;
          top: $padding;
          left: $padding;
          width: calc(100% - #{$padding * 2});
          height: calc(100% - #{$padding * 2});
          border-radius: 50%;
          background: var(--radio-button-checked);
        }
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
}
</style>