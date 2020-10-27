import Vue from "vue";
import $http from '@/config/requestConfig'

const state = {
	//用户数据
	userInfo: '',
	isLogin: false, // 是否登录
	sessionCode: '', // 登录sessionCode
};
const mutations = {
	//储存用户信息
	setUserInfo(state, data) {
		if (data) {
			state.userInfo = data;
			this.commit('user/setLoginStatus', {})
			// #ifdef H5
			// window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo));
			// #endif
			// #ifndef H5
			// uni.setStorageSync('userInfo', JSON.stringify(state.userInfo));
			// #endif
		}
	},

	// 设置登录状态
	setLoginStatus(state, data) {
		if (uni.getStorageSync('token')) {
			state.isLogin = true
		} else {
			state.isLogin = false
		}
	},

	// 检测微信是否授权
	checkUserInfo(state, data) {
		uni.getSetting({
			success(res) {
				if (!res.authSetting['scope.userInfo']) {
					//这里调用授权
					uni.navigateTo({
						url: '/pages/authority/authorityWX'
						
					})
				} else {
					// console.log('ss');
					uni.navigateTo({
						url: '/pages/authority/authority',
						fail(res) {
							console.log(res);
						}
					})
				}

			},
			fail(res) {
				console.log(res);
			}
		})
	},
	
	// 获取小程序sessionCode
	setSessionCode(state){		
		uni.login({
			provider: 'weixin',
			success(res) {
				state.sessionCode = res.code;
			},
			fail(res) {
				console.log('sessionCode:', res);
			}
		})
	},

	// 退出APP
	emptyUserInfo(state) {
		state.userInfo = {};
		state.isLogin = false
		// #ifdef H5
		window.sessionStorage.removeItem("userInfo");
		window.sessionStorage.removeItem("token");
		// #endif
		// #ifndef MP-WEIXIN
		uni.removeStorageSync("userInfo");
		uni.removeStorageSync('token')
		// #endif
	},
};
const actions = {
	// 获取用户信息
	getUserInfo({
		commit
	}) {
		$http.post('/api/wx_user_info')
			.then(res => {
				if (res.code == 200) {
					commit('setUserInfo', res.data);
					uni.setStorageSync('userInfo', JSON.stringify(res.data));
				}
			})
	},
	
};

const getters = {
	userInfo(state) {
		return state.userInfo
	},
	isLogin(state) {
		return state.isLogin
	},
	sessionCode(state){
		return state.sessionCode
	}
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
