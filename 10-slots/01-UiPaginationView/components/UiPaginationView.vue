<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
    <slot v-for="item in currentPageItems" :item="item" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
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
});

const currentPageItems = computed(
  () => props.items.filter((x, ind) => (ind >= (props.page - 1) * props.perPage) && (ind < props.page * props.perPage))
);
</script>

<style></style>
