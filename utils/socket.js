import { ref } from "vue";
import { WS_URL } from "@/server/config.js"

const websocket = ref();
let isConnection = false

const websocketInit = () => {
	if (!isConnection) {
		websocket.value = uni.connectSocket({
			url: WS_URL,
			header: { 'token': uni.getStorageSync("token") },
			success: () => {
				console.log('websocket连接成功');
			},
			fail: () => {
				console.log('websocket连接失败');
				uni.showToast({
					title: 'websocket连接失败',
					icon: 'error',
					duration: 2000,
				});
			},
		});

		websocket.value.onOpen(() => {
			console.log('WebSocket连接正常打开中...！');
			isConnection = true
		});

		websocket.value.onClose(() => {
			console.log('已经被关闭了');
			isConnection = false
		});
	}
}

// 关闭websocket【离开这个页面的时候执行关闭】
const closeSocket = () => {
	websocket.value.close({
		success(res) {
			console.log('关闭成功', res);
		},
		fail(err) {
			console.log('关闭失败', err);
		},
	});
};

const sendMessage = (value) => {
	console.log("sendMessage(): " + websocket.value.readyState);
	if (websocket.value.readyState === 0) {
		console.log('还在建立连接，请稍等...');
		const interval = setInterval(() => {
			if (websocket.value.readyState === 1) {
				clearInterval(interval);
				websocket.value.send({
					data: value,
					success: () => {
						console.log('消息发送成功');
					}
				});
			}
		}, 1000);
	} else if (websocket.value.readyState === 1) {
		websocket.value.send({
			data: value,
			success: () => {
				console.log('消息发送成功');
			}
		});
	}
};

export {
	websocket,
	websocketInit,
	closeSocket,
	sendMessage,
};