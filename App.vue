<script>
	import store from "@/config/store";
	import socket from "@/config/socket";
	import MescrollCompMixin from "@/components/common/mescroll-uni/mixins/mescroll-comp.js";
	import { mapMutations } from 'vuex'
export default {
	mixins: [MescrollCompMixin],
	onLaunch: function() {
		console.log('App Launch');
		let userInfo = uni.getStorageSync('userInfo')
		if (userInfo) {
			this.setUserInfo(JSON.parse(userInfo))
		}
	},
	onShow: function(e) {
		// #ifdef MP-WEIXIN
	    //获取二维码携带的参数
	    let scene = decodeURIComponent(e.query.scene);
	    scene = scene.split("&");
	    let data = {
	    	//场景值
	    	scene: e.scene
	    };
	    scene.forEach(item => {
	    	let arr = item.split("=");
	    	if (arr.length == 2) {
	    		data[arr[0]] = arr[1];
	    	}
	    });
		this.setChatScenesInfo(Object.assign(e.query, data))
		//小程序更新
		if (uni.getUpdateManager) {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				// console.log(res.hasUpdate);
			});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: "更新提示",
					content: "新版本已经准备好，是否重启应用？",
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: "已经有新版本了哟~",
					content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
					showCancel: false
				});
			});
		}
		// #endif
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		...mapMutations('common', ['setChatScenesInfo']),
		...mapMutations('user', ['setUserInfo', 'setLoginStatus'])
	}
};
</script>

<style lang="scss">
page{
	height: 100%;
}
view,
text,
image,
input,
textarea {
	box-sizing: border-box;
	// color: #2f2f2f;
}
/* 去掉 */
button::after{ border: none; }
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
