import {
	login,
	logout, 
	getInfo, 
} from '@/api/user'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'



const state = { 
	token: "70698E8EB544F091D2E41F432B22D868609868359DE42D84E5A9B0D908970ED6DCE77BE30B0192A2548BC405B75980E2997A7A94B3F0DDF8",
	name: '',
	avatar: '',
	introduction: '',
	roles: [],
	auth: [],
	userInfo: {},
	groupInfo: {},
	getGroupInfo: () => {

	},
	userName: "",
	realName: ""
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
	SET_USER_CARD_INFO: (state, userCardInfo) => {
		state.userCardInfo = userCardInfo
	},
	SET_AUTH: (state, auth) => {
		state.auth = auth
	},
	SET_GROUP_INFO: (state, groupInfo) => {
		state.groupInfo = groupInfo
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_USER_NAME: (state, userName) => {
		state.userName = userName
	},
	SET_REAL_NAME: (state, realName) => {
		state.realName = realName
	}
}

const actions = {
	tokenOld({
		commit
	}, obj) {
		return new Promise((resolve, reject) => {
			getToken().then(response => {
				const {
					data
				} = response
				commit('SET_TOKEN', data);
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// user login
	login({
		commit
	}, obj) {
		return new Promise((resolve, reject) => {
			login({
				// code: obj.code,
				un: obj.username.trim(),
				pwd: obj.password
			}).then(response => {
				const {
					data
				} = response
				console.log(data.token_pc)
				commit('SET_TOKEN', data.token_pc);
				setToken(data.token_pc)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	getInfo({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			getInfo().then(response => {
				const {
					data
				} = response
				commit('SET_USER_INFO', data)

				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// user logout
	logout({
		commit
	}, obj) {
		return new Promise((resolve, reject) => {
			logout({
				token_wx: obj.token
			}).then(() => {
				commit('SET_TOKEN', '');
				// commit('SET_ROLES', []);
				// commit('SET_AUTH', []);
				removeToken()
				// resetRouter()
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '');
			// commit('SET_ROLES', []);
			// commit('SET_AUTH', []);
			removeToken()
			resolve()
		})
	},


}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
