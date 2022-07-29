import { getGroups, getGroupMember, getIssue, getActivities } from '@/api/redmine';
import relationshipJson from '../../../public/userId_apiKey_relationship.json';

const state = {
	groups: [],
	groupUsers: [],
	issue: {
		project: {
			name: ''
		}
	},
	activities: []
};

const getters = {
	groups: (state) => state.groups,
	rdGroupId: (state) => (state.groups.length ? state.groups.find((item) => item.name === '研發處').id : ''),

	groupUsers: (state) => state.groupUsers,
	groupUsersWithKey: (state) => {
		return state.groupUsers.map((item) => ({
			id: item.id,
			name: item.name,
			key: relationshipJson[item.id] ? relationshipJson[item.id] : null
		}));
	},
	filterdUsers: (state, getters) => {
		return getters.groupUsersWithKey.filter((item) => item.key);
	},

	issue: (state) => state.issue,
	activities: (state) => state.activities,
	userIdApiKeyRelationship: () => relationshipJson
};

const mutations = {
	SET_GROUPS: (state, payload) => {
		state.groups = payload;
	},

	SET_GROUP_MEMBER: (state, payload) => {
		state.groupUsers = payload;
	},

	SET_ISSUE: (state, payload) => {
		if (payload === 'default') {
			state.issue = { project: { name: '' } };
		} else {
			state.issue = payload;
		}
	},

	SET_ACTIVITIES: (state, payload) => {
		state.activities = payload;
	}
};

const actions = {
	getGroups: async ({ commit }) => {
		const res = await getGroups();
		commit('SET_GROUPS', res.data.groups);
	},

	getGroupMember: async ({ commit }, groupId) => {
		const res = await getGroupMember(groupId);
		commit('SET_GROUP_MEMBER', res.data.group.users);
	},

	getIssue: async ({ commit }, issueId) => {
		const res = await getIssue(issueId);
		commit('SET_ISSUE', res.data.issue);
	},

	getActivities: async ({ commit }) => {
		const res = await getActivities();
		commit('SET_ACTIVITIES', res.data.time_entry_activities);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
