<template>
	<v-form>
		<v-text-field
			v-model.number.trim="inputIssueId"
			@blur="issueBlurHandler()"
			outlined
			dense
			:label="issue.subject ? `議題：${issue.subject}` : '議題號碼'"
			prepend-icon="search"
		>
		</v-text-field>

		<v-menu
			v-model="menu"
			:close-on-content-click="true"
			bottom
			left
			:nudge-bottom="-20"
			:nudge-left="-32"
			transition="scale-transition"
			offset-y
			min-width="auto"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					v-model="timeEntries.spentOn"
					label="日期*"
					prepend-icon="today"
					readonly
					outlined
					dense
					v-bind="attrs"
					v-on="on"
				></v-text-field>
			</template>
			<v-date-picker v-model="timeEntries.spentOn" @input="menu = false" :day-format="getFormattedDay" color="primary"></v-date-picker>
		</v-menu>

		<div class="d-flex flex-nowrap">
			<v-autocomplete
				v-model="participants"
				:items="filterdUsers"
				dense
				outlined
				multiple
				chips
				deletable-chips
				small-chips
				item-text="name"
				item-value="id"
				label="參與人員"
				prepend-icon="person_add"
				style="border-radius: 4px 0 0 4px"
			>
			</v-autocomplete>
			<v-btn
				@click="participantsFunctionHandler()"
				tile
				:color="participants.length ? 'disabled' : 'primary'"
				elevation="0"
				height="40px"
				class="text-h6 font-weight-bold"
				style="border-radius: 0 4px 4px 0"
				>{{ participants.length ? '清除' : '全選' }}</v-btn
			>
		</div>

		<v-text-field
			v-model.number="timeEntries.hours"
			outlined
			dense
			label="耗用時數*"
			type="number"
			prepend-icon="hourglass_bottom"
		></v-text-field>
		<v-text-field v-model="timeEntries.comments" outlined dense label="描述" prepend-icon="comment"></v-text-field>
		<v-select v-model="timeEntries.activity_id" :items="activities" item-text="name" item-value="id" label="活動*" outlined dense>
			<template v-slot:prepend>
				<icon iconName="skateboarding_FILL0_wght400_GRAD0_opsz48" :width="24" :height="24" :color="'#757575'"></icon>
			</template>
		</v-select>

		<div class="d-flex flex-nowrap justify-end">
			<v-btn @click="addIssuesHandler()" elevation="0" color="primary" height="40px" class="text-h6 font-weight-bold mr-3 px-8">建立</v-btn>
			<v-btn @click="clearFormInput()" elevation="0" color="secondary" height="40px" class="text-h6 font-weight-bold px-8">清除</v-btn>
		</div>
	</v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { addTimeEntries } from '@/api/redmine';

export default {
	name: 'MultiRecord',

	data: () => ({
		menu: false,
		timeEntries: {
			issue_id: '',
			spentOn: new Date().toISOString().substr(0, 10),
			hours: '',
			activity_id: '',
			comments: '',
			user_id: ''
		},
		defaultTimeEntries: {
			issue_id: '',
			spentOn: new Date().toISOString().substr(0, 10),
			hours: '',
			activity_id: '',
			comments: '',
			user_id: ''
		},
		inputIssueId: '',
		participants: []
	}),

	computed: {
		...mapGetters('redmine', ['rdGroupId', 'filterdUsers', 'issue', 'activities', 'userIdApiKeyRelationship'])
	},

	async created() {
		await Promise.all([this.getGroups(), this.getActivities()]);
		if (this.rdGroupId) await this.getGroupMember(this.rdGroupId);
	},

	methods: {
		...mapActions('redmine', ['getGroups', 'getGroupMember', 'getIssue', 'getActivities']),

		getFormattedDay(date) {
			const DD = check(new Date(date).getDate());
			function check(number) {
				if (number < 10) return '0' + number;
				else return number;
			}
			return DD;
		},

		clearFormInput() {
			this.timeEntries = Object.assign({}, this.defaultTimeEntries);
			this.participants = [];
			this.inputIssueId = '';
		},

		async issueBlurHandler() {
			if (this.inputIssueId) {
				await this.getIssue(this.inputIssueId);
				if (this.issue) this.timeEntries.issue_id = this.issue.id;
			} else {
				this.$store.commit('redmine/SET_ISSUE', 'default');
				this.timeEntries.issue_id = null;
			}
		},

		async addIssuesHandler() {
			const vm = this;
			if (this.participants.length) {
				const promises = [];
				this.participants.forEach((item) => {
					const payload = {
						body: {
							time_entry: Object.assign({}, vm.timeEntries)
						}
					};
					payload.body.time_entry.user_id = item;
					payload.userKey = vm.userIdApiKeyRelationship[item];
					promises.push(addTimeEntries(payload));
				});

				try {
					await Promise.all(promises);
					this.$store.dispatch('alert/updateMessage', { message: `建立成功`, status: 'success' }, { root: true });
					this.clearFormInput();
				} catch (error) {
					console.error('addIssuesHandler error', error);
					this.$store.dispatch(
						'alert/updateMessage',
						{
							message: `發生錯誤 (${error.response.status})：${error.response.data.errors.join(', ')}`,
							status: 'error'
						},
						{ root: true }
					);
				}
			}
		},

		participantsFunctionHandler() {
			if (this.participants.length) {
				this.participants = [];
			} else {
				this.participants = this.filterdUsers.map((item) => item.id);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .v-chip {
	background-color: white !important;
	border: 2px solid $primary !important;
	padding: 0 0.5rem;
	line-height: 1px;

	&::before {
		background-color: white;
	}

	.v-chip__content {
		color: $primary;
		font-weight: bold;
		font-size: 0.875rem;
	}

	.v-chip__close {
		margin-left: 0.5rem;
		color: $primary;
	}
}

::v-deep .v-list-item__title {
	font-size: 0.875rem !important;
}
</style>
