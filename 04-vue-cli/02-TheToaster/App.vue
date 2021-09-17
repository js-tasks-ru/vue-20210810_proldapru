<template>
  <the-toaster ref="toaster" />
  <p class="buttons">
    <button @click="success">Add Success Message</button>
    <button @click="error">Add Error Message</button>
    <button @click="warning">Add Warning Message</button>
    <button @click="info">Add Info Message</button>
  </p>
</template>

<script>
import TheToaster from './components/TheToaster';

export default {
  name: 'App',

  components: { TheToaster },

  methods: {
    success() {
      this.$refs.toaster.success('Success ' + new Date().toLocaleTimeString());
    },

    error() {
      this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString());
    },

    warning() {
      this.$refs.toaster.warning('Warning ' + new Date().toLocaleTimeString());
    },

    info() {
      this.$refs.toaster.info('Info ' + new Date().toLocaleTimeString());
    },
  },
};
</script>

<style scoped>
  .buttons {
    width: 230px;
    height: 120px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

</style>
