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
    /*** Так сработало ***/
    /*
    const newComponent = computed(() => defineComponent({
      name: 'newComponent',
      props: { bindings: { type: Object, default: () => ({})} },
      components: {...props.components},
      template: props.template,
    }));
    return () => h(newComponent.value, { bindings: props.bindings });
    */


    /*** Так не сработало ***/
    /*** render отрабатывает только один раз, дальше на изменение props.template не реагирует ***/
    /*
    const renderFunction = computed(() => {
      console.log(props.template);
      return compile(props.template);
    });
    const newComponent = defineComponent({
      name: 'newComponent',
      props: { bindings: { type: Object, default: () => ({})} },
      components: {...props.components},
      render: renderFunction.value,
    });
    return () => h(newComponent, { ...props });
    */


    /*** Так сработало ***/
    /**/
    const renderFunction = computed(() => {
      // console.log(props.template);
      return compile(props.template);
    });
    const newComponent = computed(() => defineComponent({
      name: 'newComponent',
      props: { bindings: { type: Object, default: () => ({})} },
      components: {...props.components},
      render: renderFunction.value,
    }));
    return () => h(newComponent.value, { bindings: props.bindings });
    /**/

  },
};
</script>
