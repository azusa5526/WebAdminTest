<template>
	<v-app-bar app color="primary" dark dense elevation="1">
		<div class="d-flex align-center">
			<v-img width="28px" height="28px" src="android-chrome-192x192.png" class="mr-3"></v-img>
			<h1 class="text-h5 font-weight-bold">Bluemine</h1>
		</div>

		<v-spacer></v-spacer>

		<v-btn href="http://issue.anasystem.com.tw/" target="_blank" text class="px-2">
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
