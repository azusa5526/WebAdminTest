import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import alert from './modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		alert
	},

	plugins: [],

	state: {},

	getters: {},

	mutations: {},

	actions: {}
});
