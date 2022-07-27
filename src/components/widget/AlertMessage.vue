<template>
	<div class="message-alert overflow-y-auto scope-scrollbar-hidden">
		<v-scroll-x-transition group>
			<v-alert
				v-for="(item, index) in messages"
				:key="`message_${index}`"
				:color="item.config.color"
				border="left"
				elevation="2"
				colored-border
			>
				<template v-slot:default>
					<div class="d-flex align-center">
						<v-icon :color="item.config.color" class="material-icons-outlined ml-1 mr-3">{{ item.config.prependIcon }}</v-icon>
						<div class="text-body-1 font-weight-bold">{{ item.message }}</div>
						<v-spacer></v-spacer>
						<v-btn @click="removeMessage(index)" icon><v-icon>close</v-icon></v-btn>
					</div>
				</template>
			</v-alert>
		</v-scroll-x-transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'AlertMessage',
	data() {
		return {
			messages: [],
			themeColors: this.$vuetify.theme.themes.light
		};
	},
	methods: {
		updateMessage(message, status) {
			const timestamp = Math.floor(new Date() / 1000);
			const config = this.getAlertConfig(status);

			this.messages.push({
				message,
				timestamp,
				config
			});
			this.removeMessageWithTiming(timestamp, config.removeTimeout);
		},

		removeMessage(num) {
			this.messages.splice(num, 1);
		},

		removeMessageWithTiming(timestamp, removeTimeout) {
			const vm = this;
			setTimeout(() => {
				vm.messages.forEach((item, i) => {
					if (item.timestamp === timestamp) {
						vm.messages.splice(i, 1);
					}
				});
			}, removeTimeout);
		},

		getAlertConfig(status) {
			const vm = this;
			const config = {
				success: {
					prependIcon: 'check_circle',
					removeTimeout: 3000,
					color: vm.themeColors[status]
				},
				warning: {
					prependIcon: 'error',
					removeTimeout: 6000,
					color: vm.themeColors[status]
				},
				error: {
					prependIcon: 'cancel',
					removeTimeout: 6000,
					color: vm.themeColors[status]
				},
				default: {
					prependIcon: 'chat',
					removeTimeout: 3000,
					color: vm.themeColors.accentDarken1
				}
			};
			return config[status] ? config[status] : config.default;
		}
	},

	watch: {
		isNotice: function () {
			this.updateMessage(this.message, this.status);
		}
	},

	computed: {
		...mapGetters('alert', ['message', 'status', 'isNotice'])
	}
};
</script>

<style lang="scss" scope>
.message-alert {
	position: fixed;

	/* Mobile */
	width: 320px;

	@media screen and (min-width: 600px) {
		width: 360px;
	}
	@media screen and (min-width: 960px) {
		width: 440px;
	}

	top: 1rem;
	right: 1.125rem;
	z-index: 210; // overlay is 201
	max-height: calc(100vh - 1rem * 2);
}

.alert {
	border-radius: 0;
}
</style>
