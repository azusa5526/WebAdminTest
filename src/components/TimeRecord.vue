<template>
	<layout-content-container>
		<template v-slot:page>
			<v-card color="basil" class="fill-height">
				<v-card-title class="accentDarken1 white--text text-center justify-center pa-2 pa-sm-4">
					<h1 class="font-weight-bold text-body-2 text-sm-h6 keep-word">{{ title }}</h1>
				</v-card-title>

				<v-tabs v-model="tab" background-color="transparent" color="basil" grow>
					<v-tab v-for="(item, index) in items" :key="index" class="text-body-1 font-weight-bold" :class="{ light: tab === index }">
						{{ item.displayName }}
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item v-for="(item, index) in items" :key="index">
						<v-card color="basil" flat>
							<v-card-text>
								<component :is="items[tab].componentName"></component>
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
import Relationship from '@/components/TabComponents/Relationship.vue';
import Other from '@/components/TabComponents/Other.vue';
import titleArray from '../../public/title.json';

export default {
	components: {
		LayoutContentContainer,
		MultiRecord,
		Relationship,
		Other
	},
	name: 'TimeRecord',

	data: () => ({
		tab: 0,
		items: [
			{ componentName: 'MultiRecord', displayName: '工時記錄' },
			{ componentName: 'Relationship', displayName: '檢視關係' },
			{ componentName: 'Other', displayName: '其他功能' }
		],
		title: 'Welcome to Bluemine'
	}),

	created() {
		this.setTitle();
	},

	methods: {
		setTitle() {
			if (titleArray.length) {
				this.title = titleArray[Math.floor(Math.random() * titleArray.length)];
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
