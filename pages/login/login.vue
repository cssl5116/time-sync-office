<script setup>
	import { IMG_URL } from "@/server/config.js"
	import { useUserStore } from "../../stores/user";
	import { toast } from "@/utils/utils.js"
	const userStore = useUserStore()
	const toRegister = () => {
		uni.navigateTo({
			url: "/pages/register/register",

		})
	}
	const login = () => {
		uni.login({
			success(resp) {
				userStore.login(resp.code);
			}
		})
	}
</script>

<template>
	<view>
		<image :src="IMG_URL+'logo-1.png'" class="logo" mode="widthFix"></image>
		<view class="logo-title">时刻在线协同办公系统</view>
		<view class="logo-subtitle">Ver 2050.2</view>
		<button class="login-btn" open-type="getUserInfo" @click="login()">登录系统</button>
		<view class="register-container">
			没有账号？
			<text class="register" @click="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<style lang="less">
	@import url("login.less");
</style>