<script setup>
	import { ref } from 'vue'
	
	const bottomModal = ref(false)
	const register = () => {
		// uni.login({
		// 	provider: 'weixin',
		// 	success: (resp) => {
		// 		// 获取用户信息
		// 		uni.getUserInfo({
		// 			provider: 'weixin',
		// 			success: (res) => {
		// 				let nickName = res.userInfo.nickName
		// 				let avatarUrl = res.userInfo.avatarUrl
		// 				console.log(nickName,avatarUrl);
		// 			}
		// 		})
		// 	}
		// })
		bottomModal.value = true;           
	}
</script>

<template>
	<view>
		<view class="logo">
			<image mode="widthFix" src="/static/logo-2.png" />
		</view>
		<view class="register-container">
			<input type="text" v-model="code" class="register-code" maxlength="6" placeholder="输入你的邀请码">
			<view class="                                                                                                                                                                                                             ">
				管理员创建员工账号之后,你可以从你的个人邮箱中获得邀请码
			</view>
		</view>
		<button class="register-btn cu-btn bg-blue lg" open-type="getUserInfo" @click="register">执行注册</button>
	</view>
	<!-- 模态框 -->
	<view class="cu-modal bottom-modal" :class="bottomModal?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-green">确定</view>
				<view class="action text-blue" @tap="hideModal">取消</view>
			</view>
			<view class="padding-xl">
				Modal 内容。
			</view>
		</view>
	</view>

</template>

<style>
	.register-container {
		width: 70%;
		margin: 150rpx auto 0 auto;
	}

	.register-code {
		background-color: #F5F5F5;
		border: 1rpx solid #e0e0e0;
		font-size: 34rpx;
		color: #333;
		text-align: center;
		border-radius: 10rpx;
		margin-bottom: 30rpx;
		height: 80rpx;
		padding: 0 20rpx;
	}

	.register-desc {
		color: #C5BFC3;
		font-size: 28rpx;
		line-height: 1.5;
		margin-bottom: 80rpx;
	}

	.register-btn {
		width: 60%;
		position: absolute;
		bottom: 20%;
		left: 20%;
	}
</style>