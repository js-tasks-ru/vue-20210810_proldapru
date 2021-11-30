<script>
import { ref, computed, watch, h, resolveComponent } from 'vue';

import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

/**
 * @typedef FormItemSchema
 * @property {string} label
 * @property {string|object} component
 * @property {object} props
 */
/** @typedef {string} AgendaItemField */
/** @typedef {string} AgendaItemType */
/** @typedef {Object.<AgendaItemType, FormItemSchema>} FormSchema */

/** @type FormSchema */
const commonAgendaItemFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: 'ui-input',
    props: {
      name: 'title',
    },
  },
};

/** @type {Object.<AgendaItemField, FormSchema>} */
const agendaItemFormSchemas = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    speaker: {
      label: 'Докладчик',
      component: 'ui-input',
      props: {
        name: 'speaker',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
    language: {
      label: 'Язык',
      component: 'ui-dropdown',
      props: {
        options: talkLanguageOptions,
        title: 'Язык',
        name: 'language',
      },
    },
  },
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  other: {
    title: {
      label: 'Заголовок',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
  },
};

const timeToMiliseconds = (time) => (time.substr(0, 2) * 3600 + time.substr(3, 2) * 60) * 1000;

const timeFromMiliseconds = (mls) => new Date(mls).toISOString().substr(11, 5)

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  agendaItemTypeOptions,
  agendaItemFormSchemas,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  
  emits: ['update:agendaItem', 'remove'],
  
  setup(props, { emit }) {
    const agendaItemLocal = ref({ ...props.agendaItem })

    watch(
      () => agendaItemLocal.value,
      () => { emit('update:agendaItem', agendaItemLocal.value) },
      { deep: true }
    )

    let prevStartsAt = timeToMiliseconds(agendaItemLocal.value.startsAt)
    const updateEndsAt = (ev) => {
      const curStartsAt = ev.target.valueAsNumber
      agendaItemLocal.value.endsAt = timeFromMiliseconds(timeToMiliseconds(agendaItemLocal.value.endsAt) + (curStartsAt - prevStartsAt))
      prevStartsAt = curStartsAt
    }

    const nameAndVModelParams = (name) => {
      return {
        name,
        modelValue: agendaItemLocal.value[name],
        'onUpdate:modelValue': ($event) => { agendaItemLocal.value[name] = $event},
      }
    }

    const generatedFormElements = (type) => {
      const elements = []
      for(const el in agendaItemFormSchemas[type]) elements.push(h(
        UiFormGroup,
        { label: agendaItemFormSchemas[type][el].label },
        () => h(resolveComponent(agendaItemFormSchemas[type][el].component), {
          ...agendaItemFormSchemas[type][el].props,
          ...nameAndVModelParams(el),
      })))
      return elements
    }

    return () => h('fieldset', { class: 'agenda-item-form' }, [
      h('button', { type: 'button', class: 'agenda-item-form__remove-button', onClick: () => emit('remove') }, h(UiIcon, {icon: 'trash'})),
      h(UiFormGroup, ()=>h(UiDropdown, {
        title: 'Тип',
        options: agendaItemTypeOptions,
        ...nameAndVModelParams('type'),
      })),
      h('div', { class: 'agenda-item-form__row'}, [
        h('div', { class: 'agenda-item-form__col'}, h(UiFormGroup, { label: 'Начало' }, () => h(UiInput, {
          type: 'time',
          placeholder: '00:00',
          ...nameAndVModelParams('startsAt'),
          onChange:  updateEndsAt,
        }))),
        h('div', { class: 'agenda-item-form__col'}, h(UiFormGroup, { label: 'Окончание' }, () => h(UiInput, {
          type: 'time',
          placeholder: '00:00',
          ...nameAndVModelParams('endsAt'),
        }))),
      ]),
      ...generatedFormElements(agendaItemLocal.value.type),
    ])
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
