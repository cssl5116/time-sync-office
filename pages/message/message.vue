<script setup>
	import { useMessageStore } from '@/stores/message';
	import { storeToRefs } from "pinia"
	const messageStore = useMessageStore()
	const { message } = storeToRefs(messageStore)
	import { onLoad, onShow, onReachBottom } from '@dcloudio/uni-app'
	let id = ""
	onLoad((option) => {
		id = option.id
		messageStore.searchMessageById(id)
		if (!message.value.readFlag) messageStore.updateUnreadMessage(id)
	})
	const deleteMsg = () => {
		uni.showModal({
			title: '温馨提示',
			content: '确认删除此消息?',
			success: function(res) {
				if (res.confirm) {
					messageStore.deleteMessageRefById(id).then(res => { if (res) uni.navigateBack() })
				}
			}
		})
	}
</script>

<template>
	<view class="message">
		<view class="header">
			<view class="desc">{{message.sendTime}}</view>
			<view class="opt" @click="deleteMsg">删除消息</view>
		</view>
		<view class="content">{{message.msg}}</view>
	</view>
</template>

<style lang="less">
	.message {
		margin: 55rpx;

		.header {
			display: flex;
			justify-content: space-between;
			margin-bottom: 15rpx;

			.desc {
				font-size: 28rpx;
				color: #999;
			}

			.opt {
				font-size: 28rpx;
				color: red;
				padding-right: 10rpx;
			}
		}

		.content {
			background-color: #f5f5f5;
			font-size: 32rpx;
			padding: 20rpx 45rpx;
			line-height: 1.8;
			color: #333;
			border-radius: 15rpx;
		}
	}
</style>