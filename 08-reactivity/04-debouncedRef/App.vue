<template>
  <div class="sample container">
    <p>source = <input v-model="source" type="number" /></p>
    <p>Debounced source (wait=1000ms) = {{ debouncedSource }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { debouncedRef } from './utils/debouncedRef';

export default {
  name: 'App',

  setup() {
    const source = ref(0);
    const debouncedSource = debouncedRef(source, 1000);
    return { source, debouncedSource }
  },
};
</script>

<style></style>
