import request from '@/utils/redmineRequest';

export function getGroups(params) {
	return request({
		url: '/groups.json',
		method: 'get',
		params
	});
}

export function getGroupMember(groupId) {
	return request({
		url: `/groups/${groupId}.json/`,
		method: 'get',
		params: { include: 'users' }
	});
}

export function getIssue(issueId) {
	return request({
		url: `/issues/${issueId}.json/`,
		method: 'get'
	});
}

export function getActivities() {
	return request({
		url: `/enumerations/time_entry_activities.json`,
		method: 'get'
	});
}

export function addTimeEntries(payload) {
	return request({
		url: `/time_entries.json`,
		method: 'post',
		headers: { 'X-Redmine-API-Key': payload.userKey },
		data: payload.body,
		handleErrorLocally: true
	});
}
