<template>
	<v-data-table :headers="headers" :items="groupUsersWithKey" :items-per-page="10" class="elevation-0">
		<template v-slot:[`item.key`]="{ item }">
			<span class="break-word">{{ item.key }}</span>
		</template>
	</v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Relationship',

	data: () => ({
		headers: [
			{ text: '名稱', value: 'name' },
			{ text: 'id', value: 'id' },
			{ text: 'key', value: 'key' }
		]
	}),

	computed: {
		...mapGetters('redmine', ['groupUsersWithKey', 'userIdApiKeyRelationship'])
	},

	methods: {}
};
</script>

<style lang="scss" scoped></style>
