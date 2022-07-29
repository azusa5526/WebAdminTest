<template>
	<v-app>
		<alert-message />
		<layout-app-bar />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import LayoutAppBar from './views/layout/LayoutAppBar.vue';
export default {
	components: { LayoutAppBar, AlertMessage: () => import('@/components/widget/AlertMessage.vue') },
	name: 'App',

	data: () => ({
		//
	})
};
</script>

<style lang="scss">
@import '@/scss/all.scss';
</style>
