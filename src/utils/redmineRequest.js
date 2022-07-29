import axios from 'axios';
import store from '@/store';

const instance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
	// // send cookies when cross-domain requests
	// withCredentials: true,

	// // request timeout
	// timeout: 5000
});

// request interceptor
instance.interceptors.request.use(
	(config) => {
		// console.log('request interceptor config.headers', config.headers);
		if (!config.headers['X-Redmine-API-Key']) {
			const key = process.env.VUE_APP_REDMINE_KEY;
			if (key) {
				config.headers['X-Redmine-API-Key'] = key;
			}
		}
		return config;
	},
	(error) => {
		// do something with request error
		return Promise.reject(error);
	}
);

// response interceptor
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		// if (error.response) {
		// 	store.dispatch(
		// 		'alert/updateMessage',
		// 		{
		// 			message: `發生錯誤 (${error.response.status}) ${error.response.statusText}`,
		// 			status: 'error'
		// 		},
		// 		{ root: true }
		// 	);
		// }

		if (error.code === 'ECONNABORTED') {
			if (Object.prototype.hasOwnProperty.call(error.config, 'dontUpdateMessage') && error.config.dontUpdateMessage !== true) {
				store.dispatch('alert/updateMessage', { message: `發生錯誤 (Timeout) 連線逾時，請重新再試`, status: 'error' }, { root: true });
			}
		}

		/* https://gist.github.com/saqueib/a495af17d7c0e2fd5c2316b0822ebac3
		 If this statement is TRUE, the code below this if statement will not be executed */
		if (Object.prototype.hasOwnProperty.call(error.config, 'handleErrorLocally') && error.config.handleErrorLocally === true) {
			console.log('axios retrun error. Local code handle it');
			return Promise.reject(error);
		}
	}
);

export default instance;
