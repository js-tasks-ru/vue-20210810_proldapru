<template>
  <div class="toasts">
    <ui-toast v-for="(toast, index) in toasts" :key="toast.id" v-bind="toast"/>
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'UiToastsContainer',

  components: { UiToast },

  provide() {
    return {
      toaster: {
        removeToast: this.removeToast,
      }
    }
  },

  inject: ['toasterConfig'],

  data() {
    return {
      toasts: [],
    }
  },

  methods: {
    addToast({type='error', message}) {
      const toastObj = Object.assign(
        {id: (new Date()).valueOf(), close: this.toasterConfig.needCloseButton},
        arguments[0]
      )
      this.toasts.push(toastObj)
      setTimeout(()=>{this.removeToast(toastObj.id)}, this.toasterConfig.toastTimeout)
    },

    removeToast(toastId) {
      this.toasts.splice(this.toasts.findIndex(x=>x.id===toastId), 1)
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

</style>
