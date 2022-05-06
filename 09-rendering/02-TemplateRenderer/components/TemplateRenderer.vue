<script>
import { compile, computed, resolveComponent, defineComponent, h } from 'vue';
// import UiAlert from './UiAlert.vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  // components: {UiAlert},

  setup(props, context) {
    /*** Так не сработало ***/
    /*** Ошибка: Uncaught TypeError: bindings is undefined ***/
    /*
    const newComponent = defineComponent({
      name: 'newComponent',
      props: { bindings: {...props.bindings} },
      components: {...props.components},
      template: props.template,
    });
    return () => h(newComponent);
    */

    /*** Так сработало ***/
    /**/
    const renderFunction = computed(() => compile(props.template));
    const newComponent = defineComponent({
      name: 'newComponent',
      components: {...props.components},
      render: () => renderFunction.value.call(undefined, props),
    });
    return () => h(newComponent);
    /**/
  },
};
</script>
