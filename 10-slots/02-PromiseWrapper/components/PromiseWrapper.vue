<template>
  <slot :name="slotParams.name" v-bind="slotParams.params" />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  promise: {
    type: Promise,
    required: true,
  },
});

const slotParams = ref({name: 'pending', params: {}});
watch(
  () => props.promise,
  (newVal) => {
    slotParams.value = { name: 'pending', params: {} };
    props.promise
      .then(result => {
        // console.log(result);
        slotParams.value = { name: 'fulfilled', params: {result} };
      }).catch(error => {
        // console.log(error.message);
        slotParams.value = { name: 'rejected', params: {error} };
      });
  },
  { immediate: true }
);
</script>

<!--
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

  setup(props) {
    const slotParams = ref({name: 'pending', params: {}});
    /**/
    watch(
      () => props.promise,
      (newVal) => {
        slotParams.value = { name: 'pending', params: {} };
        props.promise
          .then(result => {
            // console.log(result);
            slotParams.value = { name: 'fulfilled', params: {result} };
          }).catch(error => {
            // console.log(error.message);
            slotParams.value = { name: 'rejected', params: {error} };
          });
      },
      { immediate: true }
    );
    /**/
    return { slotParams }
  }


/*** Сначала хотел сделать "true renderless", но render-функция не реактивна =( ***/
/*  setup(props, { slots }) {
    const componentRender = ref(slots.pending);
    
    watch(
      () => props.promise,
      (newVal) => props.promise
        .then(result => {
          console.log(result);
          componentRender.value = () => slots.fulfilled({ result })
        }).catch(error => {
          console.log(error.message);
          componentRender.value = () => slots.rejected({ error })
        }),
      { immediate: true }
    );

    return componentRender.value;
  },
*/
};
</script>
-->