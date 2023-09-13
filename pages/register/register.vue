<script setup>
	import { reactive, ref } from "vue"
	import { useUserStore } from "@/stores/user";
	import { IMG_URL } from "@/server/config.js"
	import { toast } from "@/utils/utils.js"

	const userStore = useUserStore()

	const status = ref(false)
	const userInfo = reactive({
		photo: IMG_URL + 'user/132.jpeg',
		nickName: '',
		registerCode: '',
		code: '',
	})

	const register = () => {
		if (userInfo.registerCode == null || userInfo.registerCode.length == 0) {
			toast("邀请码不能为空", "error")
			return
		} else if (!/^[0-9]{6}$/.test(userInfo.registerCode)) {
			toast("请规范填写邀请码", "error")
			return
		}
		uni.login({
			provider: 'weixin', //使用微信登录
			success: function(resp) {
				userInfo.code = resp.code
				status.value = true;
			}
		})
	}

	const chooseavatar = (res) => {
		userInfo.photo = res.detail.avatarUrl
	}
	const nameInput = (e) => {
		userInfo.nickName = e.detail.value
	}
	const saveUserInfo = () => {
		console.log(userInfo);
		userStore.register(userInfo)
		status.value = false

	}
</script>

<template>
	<view>
		<image :src="IMG_URL+'logo-2.png'" mode="widthFix" class="logo"></image>
		<view class="register-container">
			<input type="text" placeholder="请输入你的邀请码" class="register-code" maxlength="6" v-model="userInfo.registerCode">
			<view class="register-desc">管理员创建员工证账号之后，你可以从你的个人邮箱中获得注册码</view>
			<button class="register-btn" open-type="getUserInfo" @click="register()">执行注册</button>
		</view>
	</view>
	<view class="cu-modal" :class="status?'show':''">
		<view class="cu-dialog">
			<view class="padding-xl">
				<view class="containar">
					<view class="title">补充用户信息</view>
					<view class="avatarUrl">
						<button class='cu-avatar radius xl' type="balanced" open-type="chooseAvatar" @chooseavatar="chooseavatar">
							<image mode="widthFix" :src="userInfo.photo" class="refreshIcon"></image>
						</button>
					</view>
					<view class="nickname">
						<text>昵称：</text>
						<input type="nickname" class="weui-input" :value="userInfo.nickName" @blur="nameInput" placeholder="请输入昵称"
							@input="nameInput" />
					</view>
					<view class="btn">
						<button @click="saveUserInfo" class="cu-btn block bg-blue margin-tb-sm lg">保存</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="less">
	@import url("register.less");
</style>