<template>
  <div class="sample container">
    <p>source = <input v-model="source" type="number" /></p>
    <pre><code>history = {{ history }}</code></pre>
  </div>
</template>

<script>
import { ref } from 'vue';
import { refHistory } from './utils/refHistory';

export default {
  name: 'App',

  setup() {
    const source = ref(0);
    const { history } = refHistory(source);
    return { source, history }
  },

/*  created() {
    // Здесь лучше использовать Composition API, но мы с ним пока не знакомы
    // Для примера и ручного тестирования подойдёт и такое нетипичное решение

    this.source = ref(0);

    const { history } = refHistory(this.source);
    this.history = history;
  },
*/
};
</script>

<style></style>
