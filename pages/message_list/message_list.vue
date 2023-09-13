<script setup>
	import { useMessageStore } from '@/stores/message';
	import { storeToRefs } from "pinia"
	import { reactive } from "vue"
	import { onShow, onReachBottom } from '@dcloudio/uni-app'
	const messageStore = useMessageStore()
	const { page, length, list, isLastPage } = storeToRefs(messageStore)
	onShow(() => {
		page.value = 1
		isLastPage.value = false
		uni.pageScrollTo({ scrollTop: '0' })
		messageStore.loadMessageList()
	})
	onReachBottom(() => {
		if (isLastPage.value) return
		page.value++
		messageStore.loadMessageList()
	})
	const toMessage = (id) => {
		uni.navigateTo({
			url: `/pages/message/message?id=${id}`
		})
	}
</script>

<template>
	<view classs="message_list">
		<view class="cu-list menu-avatar">
			<view @click="toMessage(item.id)" class="cu-item" :class="'move-box-'+ index" v-for="(item,index) in list" :key="index"
				:data-target="'move-box-' + index">
				<view v-if="item.senderName !== '系统消息'" class="cu-avatar round lg"
					:style="[{backgroundImage:'url('+ item.senderPhoto+')'}]"></view>
				<view v-else class="cu-avatar radius" style="margin: 0 5px;">
					<text class="cuIcon-noticefill"></text>
					<view v-if="!item.readFlag" class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view class="text-grey">{{item.senderName}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{item.msg}}</view>
					</view>
				</view>
				<view class="action" style="width: 150rpx">
					<view class="text-gray text-sm">{{item.sendTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style></style>