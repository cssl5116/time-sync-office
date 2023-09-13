<script>
	import { toast, useRouter } from '@/utils/utils.js'
	import { IMG_URL } from "@/server/config.js"
	import { refreshMessage } from "@/server/message.js"
	import { websocket, websocketInit, closeSocket, sendMessage } from "@/utils/socket.js"

	export default {
		data() {
			return {
				unreadRows: 0,
				lastRows: 0,
				timer: null,
				calendar: [],
				meetingPage: 1,
				meetingLength: 20,
				meetingList: [],
				isMeetingLastPage: false,
				IMG_URL: IMG_URL
			}
		},
		methods: {
			toPage(url) {
				if (!url) {
					toast('正在施工中...敬请期待')
					return
				}
				useRouter(url)
			}
		},
		onLoad: function() {
			let that = this
			uni.$on('showMessage', function() {
				that.$refs.popup.open('top')
			})
			/*refreshMessage().then(resp => {
				that.unreadRows = resp.unreadRows
				that.lastRows = resp.lastRows
				if (that.lastRows > 0) {
					uni.$emit('showMessage')
				}
			})*/
		},
		onUnload: function() {
			uni.$off('showMessage')
		},
		onShow: function() {
			websocketInit()
			sendMessage(0);
			let that = this
			websocket.value.onMessage((res) => {
				let resp = JSON.parse(res.data)
				that.unreadRows = resp.unreadRows
				that.lastRows = resp.lastRows
				if (that.lastRows > 0) {
					uni.$emit('showMessage')
				}
			})
		},
		onHide: () => {
			closeSocket()
		}
	}
</script>

<template>
	<view class="content">
		<swiper circular="true" interval="8000" duration="1000" class="swiper">
			<swiper-item>
				<image mode="widthFix" src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-1.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix" src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-2.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix" src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-3.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix" src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-4.jpg">
				</image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix" src="https://static-1258386385.cos.ap-beijing.myqcloud.com/img/banner/swiper-5.jpg">
				</image>
			</swiper-item>
		</swiper>
		<view class="notify-container" @click="toPage('/pages/message_list/message_list')">
			<view class="notify-title">
				<image :src="IMG_URL + 'icon-1.png'" mode="widthFix" class="notify-icon"></image>
				消息提醒
			</view>
			<view class="notify-content">你有{{ unreadRows }}条未读消息</view>
			<image :src="IMG_URL + 'icon-2.png'" mode="widthFix" class="more-icon"></image>
		</view>
		<view class="nav-container">
			<view class="nav-row">
				<view class="nav" @click="toPage('/pages/checkIn/checkIn')">
					<image mode="widthFix" :src="IMG_URL+'nav-1.png'" class="icon"></image>
					<text class="name">在线签到</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-2.png'" mode="widthFix" class="icon"></image>
					<text class="name">员工健康</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-3.png'" mode="widthFix" class="icon"></image>
					<text class="name">在线请假</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-4.png'" mode="widthFix" class="icon"></image>
					<text class="name">公务出差</text>
				</view>
			</view>
			<view class="nav-row">
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-5.png'" mode="widthFix" class="icon"></image>
					<text class="name">员工日报</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-6.png'" mode="widthFix" class="icon"></image>
					<text class="name">我的加班</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-7.png'" mode="widthFix" class="icon"></image>
					<text class="name">付款申请</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-8.png'" mode="widthFix" class="icon"></image>
					<text class="name">费用报销</text>
				</view>
			</view>
			<view class="nav-row">
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-9.png'" mode="widthFix" class="icon"></image>
					<text class="name">公告通知</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-10.png'" mode="widthFix" class="icon"></image>
					<text class="name">在线审批</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-11.png'" mode="widthFix" class="icon"></image>
					<text class="name">物品领用</text>
				</view>
				<view class="nav" @click="toPage()">
					<image :src="IMG_URL+'nav-12.png'" mode="widthFix" class="icon"></image>
					<text class="name">采购申请</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="success" :message="'接收到' + lastRows + '条消息'" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<style lang="less">
	.content {
		background-color: #EEEEF4;
	}

	.swiper {
		height: 215px;
	}

	.swiper image {
		width: 100% !important;
	}

	.notify-container {
		background-color: #fff;
		padding: 25px;
		position: relative;
		margin-bottom: 20rpx;
	}

	.notify-title {
		font-size: 34rpx;
		color: #3474FF;
		margin-bottom: 10rpx;
	}

	.notify-icon {
		width: 38rpx;
		vertical-align: -8rpx;
		margin-right: 5rpx;
	}

	.notify-content {
		font-size: 30rpx;
		color: #333;

		&::before {
			display: inline-block;
			content: "";
			width: 12rpx;
			height: 12rpx;
			border-radius: 6rpx;
			background-color: red;
			margin-left: 18rpx;
			margin-right: 15rpx;
			vertical-align: 3rpx;
		}
	}

	.more-icon {
		position: absolute;
		right: 5rpx;
		width: 60rpx;
		top: 50rpx;
	}

	.nav-container {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 50rpx 40rpx;
	}

	.nav-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 50rpx;
	}

	.nav {
		text-align: center;
	}

	.icon {
		width: 80rpx;
	}

	.name {
		display: block;
		font-size: 30rpx;
		color: #333;
	}
</style>