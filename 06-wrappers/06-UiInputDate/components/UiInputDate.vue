<template>
  <ui-input ref="uiInput" :type="type" v-model="modelValueProxy">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: value => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        if(!this.modelValue) return '';

        const dateParts = new Date(this.modelValue).toISOString().split(/T|\./)
        if(!this.$attrs.step || !(this.$attrs.step % 60)) dateParts[1] = dateParts[1].substr(0, 5)
        return this.type==='date' ?
          dateParts[0] :
          (this.type==='time' ? dateParts[1] : `${dateParts[0]}T${dateParts[1]}`)
      },
      set(newValue) {
        this.$emit('update:modelValue', this.$refs.uiInput.$refs.input.valueAsNumber)
      },
    },
  },
};
</script>
