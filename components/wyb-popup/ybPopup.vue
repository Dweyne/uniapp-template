<template>
	<view 
		:class="{'yb-popup': true, 'show': isShowOff, 'shadow': theme === 'light'}" 
		@touchmove.prevent="scroll" 
		v-show="visible"
	>
		<view class="arrow">
			<uni-icons color="#fff" size="18" type="arrowup" v-if="!isShowOff" @click="handleToggleArrow"></uni-icons>
			<uni-icons color="#fff" size="18" type="arrowdown" v-else @click="handleToggleArrow"></uni-icons>
			<!-- <image :src="arrow" mode="" @click="handleToggleArrow"></image> -->
		</view>
		
		<!-- 弹出框部分 -->
		<view class="content">
			<swiper :duration="200" class="swiper" style="height: 100%;" :current="smallCurrent" @change="smallSwiperChange" @reachEnd="transitionChange">
				<swiper-item v-for="(smallQuestion, j) in questionData.questionsListResults" :key="j">
					<scroll-view scroll-y="true" class="swiper-item">
						<!-- 小题头部 -->
						<view class="small-head">
							<view class="brief">本大题共{{ questionData.questionsListResults.length }}小题</view>
							<view class="number">
								<text>{{ smallCurrent + 1 }}</text>
								/{{ questionData.questionsListResults.length }}
							</view>
						</view>
						<!-- 题目渲染 -->
						<view class="small-question-box">
							<yb-question
								v-if="!smallQuestion.questionsListResults"
								:smallQuestion="true"
								ref="smallQuestionBox"
								:questionData="smallQuestion"
								@answerChange="answerChange($event)"
								@submitAnswer="submitAnswer($event, questionData)"
								@prev="prev"
								@next="next"
							></yb-question>										
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>	
	</view>

</template>

<script>
	export default {
		props: {
			// 主题
			theme: {
				type: String,
				default: 'light'
			},
			// 是否显示上拉框
			visible: {
				type: Boolean,
				default: false
			},
			// 题目信息
			questionData: {
				type: Object,
				default: null
			}
		},
		data() {
			return {
				isShowOff: false,
				smallCurrent: 0, // 小题index
				// questionData: null
			};
		},
		watch: {
			visible:{
				handler: function (value, oldVal) {
					if(value) {
						this.isShowOff = true
					}
				},
				immediate: true
			},
			// questionData1:{
			// 	handler: function (value, oldVal) {
			// 		this.$nextTick(function(){
			// 		setTimeout(()=>{
			// 		this.questionData = value
						
			// 		this.$forceUpdate()
			// 		}, 100)
						
			// 		})
			// 	},
			// 	immediate: true,
			// 	deep: true
			// }
		},
		methods: {
			// 显示隐藏解析
			handleToggleArrow(){
				this.isShowOff = !this.isShowOff
				this.$emit('toggleShowPopup', !this.isShowOff)
			},
			// 阻止事件冒泡
			scroll(){
				return
			},
			transitionChange(e){
				console.log(e);
			},
			/* 滑动小题 */
			smallSwiperChange(e) {
				// console.log(e)
				this.smallCurrent = e.detail.current;
				this.$emit('smallCurrentChange', this.smallCurrent)
			},
			/* 答案变化 */
			answerChange(e){
				this.$emit('answerChange', e, this.smallCurrent)
			},
			/* 提交答案 */
			submitAnswer(e){
				this.$emit('submitAnswer', e, this.smallCurrent)
			},
			/* 上一题 */
			prev() {
				let index = this.smallCurrent - 1
				if(index < 0){
					this.$emit('prev')
				} else {
					this.smallCurrent = index
				}
			},
			/* 下一题 */
			next() {
				let index = this.smallCurrent + 1
				if(index >= this.questionData.questionsListResults.length){
					this.$emit('next')
				} else {
					this.smallCurrent = index
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 解析 */
	.yb-popup{
		z-index: 9999;
		box-sizing: border-box;
		position: fixed;
		bottom: -770rpx;
		overflow-y: scroll;
		left: 0;
		// padding-bottom: 130rpx;
		color: #666666;
		font-size: 28rpx;
		background-color: #FFFFFF;
		border-radius: 34rpx 34rpx 0 0;
		height: 930rpx;
		width: 100%;
		transition: bottom .5s;
		&.shadow{
			box-shadow: 0rpx -20rpx 20rpx 2rpx rgba(213, 213, 213, 0.9);
		}
		&.show{
			bottom: 0;
			.arrow{
				top: 0;
				image{
					transform: rotate(180deg);
				}
			}
		}
		.arrow{
			width: 100%;
			position: absolute;
			padding: 2rpx 0;
			background-color: #8ebbf5;
			left: 0;
			text-align: center;
			z-index: 99;
		}
		.content{
			padding-top: 46rpx;
			height: 100%;
			position: relative;
			swiper{
				position: relative;
			}
			.swiper-item{
				height: 100%;
			}
			.small-head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 14rpx 40rpx;
				border-bottom: 1rpx solid #bfbfbf;
				position: fixed;
				z-index: 999;
				width: 100%;
				top: 0;
				left: 0;
				background-color: #FFFFFF;
				.brief {
					color: #646464;
					font-size: 24rpx;
				}
				.number {
					color: #646464;
					font-size: 36rpx;
					text{
						color: #646464;
						
					}
				}
			}
			.small-question-box{
				padding-top: 84rpx;
			}
		}
	}
	
</style>
