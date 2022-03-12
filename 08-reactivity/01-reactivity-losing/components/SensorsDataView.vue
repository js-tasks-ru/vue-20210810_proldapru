<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else>
    <!-- Так не перерисовывалось, хотя Computed ниже отрабатывал -->
    <!-- <sensors-data-row v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" /> -->
    <!-- Так перерисовывается (изменил key) -->
    <sensors-data-row v-for="sensor in sensors" :key="`${sensor.id}_${sensor.value}`" :sensor="sensor" />
  </template>
  <div>Computed {{ v46242 }}</div>
</template>

<script>
import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      sensors: null,
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);

    // Раз в секунду запрашиваем и выводим новые данные сенсоров
    setInterval(() => {
      this.sensorsDataController.getData();
    }, 1000);
  },

  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },

  methods: {
    callback(data) {
      this.setData(data);
    },

    setData(sensors) {
      // this.sensors = sensors;
       this.sensors = { ...sensors };
    },
  },
  computed: {
    v46242() {
      // console.log(this.sensors['46242'].value);
      return this.sensors ? this.sensors['46242'].value : 0;
    }
  },
};
</script>

<style scoped></style>
