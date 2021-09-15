<template>
  <div :class="`toast toast_${type}`">
    <ui-icon class="toast__icon" :icon="$options.iconByType[type]" />
    <span class="toast__message">{{ message }}</span>
    <span v-if="close" class='toast__close_button' @click="toaster.removeToast(id)">✖</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiToast',

  components: { UiIcon },

  inject: ['toaster'],

  iconByType: {
    error: 'alert-circle',
    success: 'check-circle',
    warning: 'clock',
    info: 'coffee',
  },

  props: {
    id: {type: Number, required: true},
    type: {type: String, default: 'error'},
    message: {type: String, required: true},
    close: {type: Boolean, default: false},
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

@media all and (min-width: 992px) {/*  position: absolute;*/

  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast.toast_warning {
  color: var(--red-light);
/*  stroke: var(--red-light);*/
}


.toast.toast_info {
  color: var(--blue-2);
}

.toast__message {
  margin-right: 10px;
}

.toast__close_button {
  margin-left: auto;
  cursor: pointer;
}

</style>
