<template>
	<v-container class="fill-height align-start">
		<v-row no-gutters dense align="center" justify="center" class="fill-height">
			<v-col class="fill-height">
				<slot name="page" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'LayoutContentContainer',
	data: () => ({})
};
</script>
