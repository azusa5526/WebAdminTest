import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'noto-sans-tc/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import SvgIcon from '@/components/widget/SvgIcon';
import axios from 'axios';
import VueAxios from 'vue-axios';

// vee-validate
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

Vue.config.productionTip = false;

// vee-validate
Object.keys(rules).forEach((rule) => {
	extend(rule, rules[rule]);
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
configure({
	classes: {
		valid: 'is-valid',
		invalid: 'is-invalid'
	}
});

// require all svg
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context('@/assets/icon', true, /\.svg$/);
requireAll(req);
Vue.component('icon', SvgIcon);

// axios
Vue.use(VueAxios, axios);

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount('#app');
