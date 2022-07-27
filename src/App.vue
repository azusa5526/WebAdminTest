<template>
	<v-app>
		<layout-app-bar />

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import LayoutAppBar from './views/layout/LayoutAppBar.vue';
export default {
	components: { LayoutAppBar },
	name: 'App',

	data: () => ({
		//
	})
};
</script>
