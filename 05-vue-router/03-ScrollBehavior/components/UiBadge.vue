<template>
  <span class="badge" :class="badgeClass"><slot /></span>
</template>

<script>
import { computed } from 'vue';

const badgeClasses = {
  primary: 'badge_primary',
  success: 'badge_success',
};

export default {
  name: 'UiBadge',

  props: {
    type: {
      type: String,
      required: false,
      validate: (value) => Object.key(badgeClasses).includes(value),
    },
  },

  setup(props) {
    return {
      badgeClass: computed(() => badgeClasses[props.type]),
    }
  }

/*
  computed: {
    badgeClass() {
      return badgeClasses[this.type];
    },
  },
*/
};
</script>

<style scoped>
.badge {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  display: flex;
  flex-direction: row;
  padding: 4px 12px;
}

.badge_primary {
  color: var(--blue);
  background-color: var(--blue-extra);
}

.badge_success {
  color: var(--green);
  background-color: var(--green-light);
}
</style>
