import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: Number
  },
  emits: ['update:count'],

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    increaseCount() {
      return (this.count || 0) + 1
    },

    decreaseCount() {
      return (this.count || 0) - 1
    }

  },

  // Шаблон потребуется отредактировать
  template:
  `<button style="width:50px"
    @click="$emit('update:count', increaseCount())"
    @click.right.prevent="$emit('update:count', decreaseCount())"
    @click.middle="$emit('update:count', 0)"
  >
    {{ count || 0}}
  </button>`,
});
