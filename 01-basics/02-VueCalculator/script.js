import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
createApp({
	data() {
		return {
			firstArg: 1,
			secondArg: 1,
			operation: 'sum'
		}
	},
	computed: {
		operationResult() {
			// Проверка на числа
			if(typeof this.firstArg !== 'number' || typeof this.secondArg !== 'number')
				return 'Error: numbers are required';
			// Возврат вычисляемого свойства
			return {
				sum: ()=>this.firstArg + this.secondArg,
				subtract: ()=>this.firstArg - this.secondArg,
				multiply: ()=>this.firstArg * this.secondArg,
				divide: ()=>this.secondArg!=0 ? this.firstArg / this.secondArg : 'Error: division by zero'
			}[this.operation]();
		}
	}
}).mount('#app')
