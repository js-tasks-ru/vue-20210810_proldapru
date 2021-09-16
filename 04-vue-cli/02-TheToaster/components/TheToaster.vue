<template>
  <ui-toasts-container ref="toastsCont" v-bind="$data"/>
  <fieldset class="toaster-config">
    <legend>Toaster Settings</legend>
    <label for="timeout_input">Timeout (ms): <input id="timeout_input" type="number" size="5" v-model="toastTimeout"></label>
    
    <label for="need_close_button">Need close button <input id="need_close_button" type="checkbox" v-model="needCloseButton"></label>
    
  </fieldset>

</template>

<script>
import UiToastsContainer from './UiToastsContainer';

export default {
  name: 'TheToaster',

  components: { UiToastsContainer },

  data() {
    return {
      toastTimeout: 5000,
      needCloseButton: false,
    }
  },

  methods: {
    success(text) {
      this.$refs.toastsCont.addToast({type: 'success', message: text})
    },

    error(text) {
      this.$refs.toastsCont.addToast({type: 'error', message: text})
    },

    warning(text) {
      this.$refs.toastsCont.addToast({type: 'warning', message: text})
    },

    info(text) {
      this.$refs.toastsCont.addToast({type: 'info', message: text})
    },
  },
};
</script>

<style scoped>
  .toaster-config {
    padding: 5px;
    width: 230px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
