import { ref } from 'vue';

export function useMeetupsView() {
  const view = ref('list');

  return {
    view,
  };
}
