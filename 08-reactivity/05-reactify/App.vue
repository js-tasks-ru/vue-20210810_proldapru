<template>
  <div class="sample container">
    <p>foo = <input v-model="foo" type="number" /></p>
    <p>bar = {{ bar }}</p>
    <p>sqr(foo) = {{ computedSqrFoo }}</p>
    <p>sum(foo, bar) = {{ computedSumFooBar }}</p>
    <p>minutesToHHMM(foo) = {{ computedMinutesToHHMMFoo }}</p>
    <p>minutesToHHMM(sqr(foo)) = {{ computedMinutesToHHMMSqrFoo }}</p>
    <p></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { reactify } from './utils/reactify';

export default {
  name: 'App',

  setup() {
    // Исходные обычные чистые функции
    const sum = (a, b) => a + b;
    const sqr = (num) => num ** 2;
    const minutesToHHMM = (minutes) =>
      `${Math.floor(minutes / 60)
        .toString()
        .padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}`;

    // Реактивные версии исходных функций
    const reactiveSqr = reactify(sqr);
    const reactiveSum = reactify(sum);
    const reactiveMinutesToHHMM = reactify(minutesToHHMM);

    // Значения для тестрования
    const foo = ref(0);
    const bar = 10;

    // Вычисляемые свойства в результате использования реактивных функций
    const computedSqrFoo = reactiveSqr(foo);
    const computedSumFooBar = reactiveSum(foo, bar);
    const computedMinutesToHHMMFoo = reactiveMinutesToHHMM(foo);
    const computedMinutesToHHMMSqrFoo = reactiveMinutesToHHMM(computedSqrFoo);
    // const computedStringLength = reactiveSum(a, b);

    return {
      foo,
      bar,
      computedSqrFoo,
      computedSumFooBar,
      computedMinutesToHHMMFoo,
      computedMinutesToHHMMSqrFoo,
    }
  },
};
</script>

<style></style>
