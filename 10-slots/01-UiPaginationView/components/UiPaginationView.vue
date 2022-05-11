<template>
  <div class="pagination-container">
    <!-- Контент страницы -->

    <!-- Так не сработало -->
    <!-- <slot v-for="meetup in pageMeetups" :item="meetup" /> -->

    <!-- Так сработало -->
    <template v-for="meetup in pageMeetups">
      <slot :item="meetup" />
    </template>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const pageMeetups = computed(() => {
      // console.log(`${(props.page - 1) * props.perPage} ${props.page * props.perPage}`);
      return props.items.filter((x, ind) => (ind >= (props.page - 1) * props.perPage) && (ind < props.page * props.perPage));
    });
    return { pageMeetups }
  },
};
</script>

<style></style>
