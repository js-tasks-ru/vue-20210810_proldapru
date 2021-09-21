<template>
  <ui-toaster>
    <ui-toast v-for="toast in toasts" :key="toast.id" v-bind="toast" @removeToast="removeToast($event)" />
  </ui-toaster>

  <fieldset v-if="isToasterConfigVisible" class="toaster-config">
    <legend>Toaster Settings</legend>
    <label for="timeout_input">Timeout (ms): <input id="timeout_input" type="number" size="5" v-model="toastTimeout"></label>
    
    <label for="need_close_button">Need close button <input id="need_close_button" type="checkbox" v-model="needCloseButton"></label>
    
  </fieldset>

</template>

<script>
import UiToaster from './UiToaster'
import UiToast from './UiToast'

export default {
  name: 'TheToaster',

  components: {
    UiToaster,
    UiToast
  },

  data() {
    return {
      toasts: [],
      toastTimeout: 5000,
      needCloseButton: false,
    }
  },

  props: {
    isToasterConfigVisible: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    addToast({type='error', message}) {
      const toastObj = Object.assign(
        {id: (new Date()).valueOf(), close: this.needCloseButton},
        arguments[0]
      )
      this.toasts.push(toastObj)
      setTimeout(()=>{this.removeToast(toastObj.id)}, this.toastTimeout)
    },

    removeToast(toastId) {
      this.toasts.splice(this.toasts.findIndex(x=>x.id===toastId), 1)
    },

    success(text) {
      this.addToast({type: 'success', message: text})
    },

    error(text) {
      this.addToast({type: 'error', message: text})
    },

    warning(text) {
      this.addToast({type: 'warning', message: text})
    },

    info(text) {
      this.addToast({type: 'info', message: text})
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
