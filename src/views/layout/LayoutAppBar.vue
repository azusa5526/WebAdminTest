<template>
	<v-app-bar app color="primary" dark dense elevation="1">
		<div class="d-flex align-center">
			<h1 class="text-h5 font-weight-bold">Redmine</h1>
		</div>

		<v-spacer></v-spacer>

		<v-btn href="http://issue.anasystem.com.tw/" target="_blank" text>
			<span class="mr-2">Back to Redmine</span>
			<v-icon>open_in_new</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: 'LayoutAppBar',
	components: {},
	data: () => ({})
};
</script>

<style lang="scss" scoped></style>
