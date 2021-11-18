<template>
  <button
    @click="increaseCount()"
    @click.right.prevent="decreaseCount()"
    @click.middle="resetCounter()"
  >{{ countLocal }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: { 
      type: Number,
      default: 0,
    }
  },

  emits: ['update:count'],

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

};
</script>
<style scoped>
button {
  width: 30px 
}
</style>
