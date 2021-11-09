<template>
  <div
    class="input-group"
    :class="{
      'input-group_icon': hasLeftIcon() || hasRightIcon(),
      'input-group_icon-left': hasLeftIcon(),
      'input-group_icon-right': hasRightIcon(),
    }"
  >
    <div v-if="hasLeftIcon()" class="input-group__icon">
      <slot name="left-icon" />
    </div>

    <component
      :is="tag"
      ref="input"
      v-bind="$attrs"
      class="form-control"
      :class="{ 'form-control_rounded': rounded, 'form-control_sm': small }"
      :value="modelValue"
      @[inputEvent]="$emit('update:modelValue', $event.target.value)"
    />

    <div v-if="hasRightIcon()" class="input-group__icon">
      <slot name="right-icon" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'UiInput',
  inheritAttrs: false,

  props: {
    small: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
    },
    modelModifiers: {
      type: Object,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { slots, expose }) {
    const input = ref(null)

    const tag = computed(() => props.multiline ? 'textarea' : 'input')

    const inputEvent = computed(() => props.modelModifiers?.lazy ? 'change' : 'input')

    const focus = () => input.value.focus()

    const hasLeftIcon = () => Boolean(slots['left-icon'])

    const hasRightIcon = () => Boolean(slots['right-icon'])

    expose({
      focus,
    })

    return {
      input,
      tag,
      inputEvent,
      focus,
      hasLeftIcon,
      hasRightIcon,
    }
    
  },

/*
  computed: {
    tag() {
      return this.multiline ? 'textarea' : 'input'
    },
    inputEvent() {
      return this.modelModifiers?.lazy ? 'change' : 'input'
    },
  },

  methods: {
    focus() {
      this.$refs['input'].focus()
    },
    hasLeftIcon() {
      return Boolean(this.$slots['left-icon'])
    },
    hasRightIcon() {
      return Boolean(this.$slots['right-icon'])
    },
  },
*/
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
