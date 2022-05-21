<script>
import { ref, watch } from 'vue';
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  setup(props, { slots }) {
    const componentRender = ref(slots.pending);
    
    watch(
      () => props.promise,
      (newVal) => {
        componentRender.value = () => slots.pending();
        props.promise
          .then(result => componentRender.value = () => slots.fulfilled({ result }))
          .catch(error => componentRender.value = () => slots.rejected({ error }));
      },
      { immediate: true }
    );

    return () => componentRender.value();
  },
};
</script>
