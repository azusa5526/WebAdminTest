import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import alert from './modules/alert';
import redmine from './modules/redmine';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		alert,
		redmine
	},

	plugins: [],

	state: {},

	getters: {},

	mutations: {},

	actions: {}
});
