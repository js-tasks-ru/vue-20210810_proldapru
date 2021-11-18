<template>
  <button
    @click="increaseCount()"
    @click.right.prevent="decreaseCount()"
    @click.middle="resetCounter()"
  >{{ countLocal }}</button>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'CounterButton',

  props: {
    count: { 
      type: Number,
      default: 0,
    }
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    const countLocal = ref(0)
    watch(() => props.count, (newVal) => { countLocal.value = newVal }, { immediate: true })
    const updateParent  = () => { if(props.count !== countLocal.value) emit('update:count', countLocal.value) }
    const increaseCount = () => { countLocal.value++;   updateParent() }
    const decreaseCount = () => { countLocal.value--;   updateParent() }
    const resetCounter  = () => { countLocal.value = 0; updateParent() }

    return {
      countLocal,
      increaseCount,
      decreaseCount,
      resetCounter,
    }
  },
/*
  data() {
    return { countLocal: 0 }
  },

  watch: {
    count: {
      immediate: true,
      handler() { this.countLocal = this.count },
    },
  },

  methods: {
    updateParent()  { if(this.count !== this.countLocal) this.$emit('update:count', this.countLocal) },
    increaseCount() { this.countLocal++;   this.updateParent() },
    decreaseCount() { this.countLocal--;   this.updateParent() },
    resetCounter()  { this.countLocal = 0; this.updateParent() },
  },
*/
};
</script>
<style scoped>
button {
  width: 30px 
}
</style>
