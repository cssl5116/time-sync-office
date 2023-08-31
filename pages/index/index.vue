<script setup>
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue'
	import { useUserStore } from "@/stores/user"

	const modalName = ref('')
	const title = ref('你好哇,再试试')
	const userStore = useUserStore()
	const {message} = storeToRefs(userStore)

	function showOrHideModal(e) {
		modalName.value = e
	}

	function login() {
		uni.redirectTo({
			url: '../login/login',
		});
	}

	const getData = () => {
		userStore.setUserInfo()
	}
</script>

<template>
	<view class="content">
		<button @click="showOrHideModal('bottomModal')" class="cu-btn bg-grey lg">打开对话框</button>
		<button @click="login" class="cu-btn bg-red margin-tb-sm lg">立即登录</button>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog" style="height: 40%;">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="getData">确定</view>
					<view class="action text-blue" @tap="showOrHideModal('')">取消</view>
				</view>
				<view class="padding-xl">
					{{ message }}
				</view>
			</view>
		</view>
	</view>
</template>

<style>
	.content {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>