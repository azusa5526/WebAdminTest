const { defineConfig } = require('@vue/cli-service');
const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = defineConfig({
	publicPath: '/redmine',
	transpileDependencies: ['vuetify'],
	// css: {
	// 	loaderOptions: {
	// 		scss: {
	// 			additionalData: `@import "@/scss/helpers/_theme-colors.scss";`
	// 		}
	// 	}
	// },
	productionSourceMap: false,
	chainWebpack: (config) => {
		config.resolve.alias.set('@', resolve('src'));
		config.resolve.alias.set('~', resolve('node_modules'));

		// del default svg setting
		config.module.rules.delete('svg');

		// add svg-sprite-loader setting
		config.module
			.rule('svg-sprite-loader')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icon'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({ symbolId: '[name]' });

		// modify image-loader setting
		config.module.rule('images').exclude.add(resolve('src/assets/icon'));

		config.plugin('html').tap((args) => {
			args[0].title = 'Redmine';
			return args;
		});
	}
});
