import Vue from 'vue'
import App from './App'
import store from '@/config/store/index.js'
//权限配置中心
import base from '@/config/baseUrl'
Vue.prototype.$base = base;
//挂载全局http请求
import $http from '@/config/requestConfig'
Vue.prototype.$http = $http;
// #ifdef MP-WEIXIN
//挂载全局微信分享
import { wxShare } from '@/config/utils'
Vue.prototype.wxShare = wxShare;
// #endif
//判断是否登录
import { judgeLogin } from '@/config/login';
Vue.prototype.judgeLogin = judgeLogin;
Vue.config.productionTip = false;
// #ifdef H5
//微信SDK
import '@/plugins/wxJsSDK.js';
// #endif

// 图片资源请求地址
Vue.prototype.resoure_URL = function(s) {
	return 'https://studying.youngbai.com/static/learning/' + s
}

// 手机状态栏高度
Vue.prototype.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
// 小程序导航栏高度
Vue.prototype.miniProgramTopBarHeight = uni.getSystemInfoSync()['statusBarHeight'] + 44
// 判断市场常见的几种刘海屏机型
uni.getSystemInfo({
	success: function (res) {
		let modelmes = res.model;
		if(modelmes.indexOf('iPhone X')>=0||modelmes.indexOf('iPhone XR')>=0||modelmes.indexOf('iPhone XS')>=0||modelmes.indexOf('iPhone 12')>=0||modelmes.indexOf('iPhone 11')>=0||modelmes.indexOf('iPhone11')>=0||modelmes.indexOf('iPhone12')>=0||modelmes.indexOf('iPhoneXR')>=0||modelmes.indexOf('iPhoneX')>=0){
			Vue.prototype.$is_bang = true
		}else{
			Vue.prototype.$is_bang = false
		}
	}
});
//全局组件
// 导航栏
import zhouWeiNavBar from "@/components/common/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);
// 加载动画
import publicModule from "@/components/common/public_module.vue";
Vue.component("public-module", publicModule);
// 富文本解析
import jyfParser from "@/components/common/jyf-parser/jyf-parser";
Vue.component("html-parser", jyfParser)

// 列表
import MescrollBody from "@/components/common/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/common/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.config.productionTip = false


// 判断是否登录
Vue.prototype.login_status = function() {
	if (!uni.getStorageSync("token")) {
		uni.navigateTo({
			url: '/pages/authorization/index',
			success: res => {},
			fail: res => {
				console.log(res)
			}
		})
	}
}

App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
