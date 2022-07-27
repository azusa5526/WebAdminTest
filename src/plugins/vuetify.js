import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import zhHant from 'vuetify/lib/locale/zh-Hant';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		options: {
			customProperties: true
		},
		themes: {
			light: {
				primary: '#074E92',
				secondary: '#1B5E20',
				accent: '#2196F3',
				accentDarken1: '#1976D2',
				accentLighten1: '#BBDEFB',
				light: '#E8EAF6',
				error: '#FF3D00',
				success: '#7CB342',
				warning: '#FF8F00',
				disabled: '#bdbdbd'
			}
		}
	},
	lang: {
		locales: { zhHant },
		current: 'zhHant'
	},
	icons: {
		iconfont: 'md'
	}
});
