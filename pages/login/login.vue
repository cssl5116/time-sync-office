<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: '../register/register'
				})
			}
		}
	}
</script>

<template>
	<view>
		<view class="logo">
			<image mode="widthFix" src="/static/logo-1.png" />
		</view>
		<view class="logo-title">时刻协同在线办公</view>
		<view class="logo-subtitle">Ver 2023.08</view>
		<button class="login-btn cu-btn bg-blue lg" open-type="getUserInfo" @click="login">登录系统</button>
		<view class="register-container">
			没有账号? <text class="register" @click="toRegister">立即注册</text>
		</view>
	</view>
</template>

<style>
.logo-title {
	font-size: 48rpx;
	font-weight: bold;
	text-align: center;
	margin-top: 8%;
	color: #333;
}
.logo-subtitle {
	font-size: 34rpx;
	text-align: center;
}
.login-btn {
	width: 60%;
	position: absolute;
	bottom: 25%;
	left: 20%;
}
.register-container {
	position: absolute;
	bottom: 100rpx;
	width: 100%;
	text-align: center;
	font-size: 30rpx;
}
.register{
	color: #3474ff;
}
.register:active {
	color: #0052ff;
}
</style>
