import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import SvgIcon from '@/components/widget/SvgIcon';

Vue.config.productionTip = false;

// require all svg
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context('@/assets/icon', true, /\.svg$/);
requireAll(req);
Vue.component('icon', SvgIcon);

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount('#app');
