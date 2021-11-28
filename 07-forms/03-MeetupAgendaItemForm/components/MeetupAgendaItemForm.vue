<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown title="Тип" :options="agendaItemTypeOptions" name="type" v-model="agendaItemLocal.type"/>
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input type="time" placeholder="00:00" name="startsAt" v-model="agendaItemLocal.startsAt" @change="updateEndsAt"/>
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input type="time" placeholder="00:00" name="endsAt" v-model="agendaItemLocal.endsAt"/>
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="titleFieldLabel">
      <ui-input name="title" v-model="agendaItemLocal.title"/>
    </ui-form-group>
    <ui-form-group v-if="agendaItemLocal.type==='talk'" label="Докладчик">
      <ui-input name="speaker" v-model="agendaItemLocal.speaker"/>
    </ui-form-group>
    <ui-form-group v-if="['talk', 'other'].includes(agendaItemLocal.type)" label="Описание">
      <ui-input multiline name="description" v-model="agendaItemLocal.description"/>
    </ui-form-group>
    <ui-form-group v-if="agendaItemLocal.type==='talk'" label="Язык">
      <ui-dropdown title="Язык" :options="talkLanguageOptions" name="language" v-model="agendaItemLocal.language"/>
    </ui-form-group>
  </fieldset>
</template>

<script>
import { ref, computed, watch } from 'vue';

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

const timeToMiliseconds = (time) => (time.substr(0, 2) * 3600 + time.substr(3, 2) * 60) * 1000;

const timeFromMiliseconds = (mls) => new Date(mls).toISOString().substr(11, 5)

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

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

    const titleFieldLabel = computed(() => {
      return { talk: 'Тема', other: 'Заголовок' }[agendaItemLocal.value.type] ?? 'Нестандартный текст (необязательно)'
    })

    let prevStartsAt = timeToMiliseconds(agendaItemLocal.value.startsAt)
    const updateEndsAt = (ev) => {
      const curStartsAt = ev.target.valueAsNumber
      agendaItemLocal.value.endsAt = timeFromMiliseconds(timeToMiliseconds(agendaItemLocal.value.endsAt) + (curStartsAt - prevStartsAt))
      prevStartsAt = curStartsAt
    }

    return {
      agendaItemLocal,
      agendaItemTypeOptions,
      talkLanguageOptions,
      titleFieldLabel,
      updateEndsAt,
    }
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
