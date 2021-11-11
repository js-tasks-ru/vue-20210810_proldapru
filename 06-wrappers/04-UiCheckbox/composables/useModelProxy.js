import { computed } from 'vue';

export function useModelProxy(props, { emit }, propName = 'modelValue') {
  return computed({
    get() { return props[propName] },
    set(newValue) { emit(`update:${propName}`, newValue) },
  })
}
