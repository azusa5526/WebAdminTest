<template>
	<layout-content-container>
		<template v-slot:page>
			<v-card color="basil" class="mt-0 mt-sm-4">
				<v-card-title class="text-center justify-center py-6">
					<h1 class="font-weight-bold text-h2 basil--text">BASiL</h1>
				</v-card-title>

				<v-tabs v-model="tab" background-color="transparent" color="basil" grow>
					<v-tab v-for="item in items" :key="item">
						{{ item }}
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item v-for="item in items" :key="item">
						<v-card color="basil" flat>
							<v-card-text>
								<component :is="items[tab]"></component>
							</v-card-text>
						</v-card>
					</v-tab-item>
				</v-tabs-items>
			</v-card>
		</template>
	</layout-content-container>
</template>

<script>
import LayoutContentContainer from '@/views/layout/LayoutContentContainer.vue';
import MultiRecord from '@/components/TabComponents/MultiRecord.vue';
import Other from '@/components/TabComponents/Other.vue';

export default {
	components: {
		LayoutContentContainer,
		MultiRecord,
		Other
	},
	name: 'TimeRecord',

	data: () => ({
		tab: null,
		items: ['MultiRecord', 'Other']
	})
};
</script>

<style lang="scss" scoped>
.basil {
	background-color: #ffffff !important;
}
.basil--text {
	color: #356859 !important;
}
</style>
