<template>
	<view class="athority">
		<nav-bar backState="3000" :title="title" @backClick="backClick"></nav-bar>
		<!-- 小程序 -->
		<view>
			<view class="getUserInfo">
				<view class="logo"><image :src="resoure_URL('logo.png')" mode="heightFix"></image></view>
				<view class="info">
					<view>该小程序由智练习开发，向其提供以下权限即可继续操作</view>
					<view class="recieve">· 获得你的公开信息（昵称、头像等）</view>
				</view>
				<button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信登录</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex"
export default {
	data() {
		return {
			title: '登录',
		};
	},
	onLoad() {
		this.setSessionCode()
	},
	computed:{
		...mapGetters('user', ['sessionCode'])
	},
	methods:{
		...mapMutations('user', ['setUserInfo', 'setSessionCode']),
		...mapActions('user', ['getUserInfo']),
		submit(e){
			console.log(e);
		},
		// 获取手机号
		getPhoneNumber(data) {
			console.log(data);
			uni.showLoading()
			let _this = this;
			if (data.detail.errMsg == 'getPhoneNumber:fail user deny') {
				uni.showToast({
					title: '取消授权',
					icon: 'none'
				});
				uni.hideLoading()
			} else {
				uni.getUserInfo({
					provider: 'weixin',
					async success(result) {
						await _this.login(result.userInfo);
						_this.setPhone(result, data)
					}
				});
			}
		},

		// 设置电话号码
		async setPhone(result, data){
			let _this = this
			let userInfo = { ...result };
			delete userInfo.userInfo;
			delete userInfo.errMsg;
			userInfo.iv = data.detail.iv;
			userInfo.encryptedData = data.detail.encryptedData;
			// await setTimeout(async () => {
				let phoneRes = await this.$http.post('/api/get_phone', userInfo);
				if (phoneRes.code == 200) {
					await _this.getUserInfo()
					uni.hideLoading()
					let routes = getCurrentPages();
					//获取上个页面路由以及参数
					var prevPage = routes[routes.length-2];
					let homePage = routes[0]
					let delta = 1
					if (prevPage.route == 'pages/user/authorityWX'){
						delta = 2
					}
					if (homePage.route == 'pages/index/index') {
						homePage.$vm.$refs.mine.init()
						homePage.$vm.getExam()
					}
					_this.back(delta)
				}else{
					uni.showToast({
						icon:'none',
						title:'授权失败，请重试'
					})
				}
			// }, 1000)
		},

		// 调取接口登录操作
		async login(userInfo) {
			let res = await this.$http.post('/api/wx_login', {
				code: this.sessionCode,
				...userInfo
			});
			if (res.code == 200) {
				uni.setStorageSync('token', res.data);
			} else {
				uni.showToast({
					icon:'none',
					title:'授权失败，请重试'
				})
			}
		},
		/* 点击返回 */
		backClick(){
			let delta = 1
			let routes = getCurrentPages();
			//获取上个页面路由以及参数
			var prevPage = routes[routes.length-2];
			if (prevPage.route == 'pages/user/authorityWX'){
				delta = 2
			}
			this.back(delta)
		},
		/* 返回 */
		back(delta = 1){
			uni.navigateBack({
				delta:delta
			})
		}
	}
}
</script>

<style lang="scss">
.athority {
	.getUserInfo {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 60rpx;
		button {
			width: 100%;
			&:last-of-type {
				border: 1rpx solid #ddd;
			}
		}
		.logo {
			width: 120rpx;
			height: 120rpx;
			background-color: $main-color;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				height: 90rpx;
			}
		}
		.info {
			margin-top: 60rpx;
			padding-top: 20rpx;
			border-top: 1rpx solid #ddd;
			.recieve {
				margin: 30rpx 0 50rpx;
				font-size: 28rpx;
				color: #c0c0c0;
			}
		}
	}
}
</style>
