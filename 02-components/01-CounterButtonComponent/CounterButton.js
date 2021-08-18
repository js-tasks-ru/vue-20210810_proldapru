import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: { 
      type: Number,
      default: 0,
    }
  },

  emits: ['update:count'],

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    increaseCount() {
      this.$emit('update:count', this.count + 1)
    },

    decreaseCount() {
      this.$emit('update:count', this.count - 1)
    },

    resetCounter() {
      this.$emit('update:count', 0)
    },
  },

  // Шаблон потребуется отредактировать
  template:
  `<button style="width:50px"
    @click="increaseCount()"
    @click.right.prevent="decreaseCount()"
    @click.middle="resetCounter()"
  >
    {{ count }}
  </button>`,
});
