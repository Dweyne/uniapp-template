<template>
	<view class="authorityWX">
		<nav-bar backState="1000" :title="title"></nav-bar>
		<!-- 小程序 -->
		<view class="content">
			<view class="getUserInfo">
				<view class="logo">
					<image :src="resoure_URL('logo.png')" mode="heightFix"></image>
				</view>
				<view style="margin-bottom: 16rpx;">请完成微信授权以继续使用</view>
				<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" lang="zh_CN">微信授权</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '微信授权',
				
			};
		},
		methods:{
			
			/* 获取用户信息 */
			getUserInfo(userInfo){
				uni.navigateTo({
					url:'/pages/user/authority'
				})
			}
			
		}
	}
</script>

<style lang="scss">
.authorityWX{
	.content{
		padding-top: 200rpx;
		.getUserInfo {
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 60rpx;
			button{
				width: 100%;
				&:last-of-type{
					border: 1rpx solid #ddd;
				}
			}
			.logo{
				width: 120rpx;
				height: 120rpx;
				background-color: $main-color;
				border-radius: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 60rpx;
				image{
					height: 90rpx;
				}
			}
			
		}
	}
}
</style>
