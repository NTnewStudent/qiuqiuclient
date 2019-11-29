<template>
	<view>

		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">聊天<text style="font-size: 25upx;padding-left: 10upx;">对方正在输入中...</text></block>
		</cu-custom>

		<!-- end -->



		<view class="cu-chat">
			<view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">2018年3月23日 13:23</view>
			</view>
			<view class="cu-info round">对方撤回一条消息!</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>
			<view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view>
			<view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view>
			<view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view>
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" @focus="InputFocus"
			 @blur="InputBlur" v-model="text"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @click="send">发送</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				//文本内容
				text: '',
				Uid: '', //从本地换成或者接口获取
				toUid: '', //从上一个页面获取
				MSG_TYPE: {
					IMG: 10003, //图片消息
					TEXT: 10002, //正文消息
					PING: 10004, //心跳消息
					BIND: 10001 //绑定消息
				}

			};
		},
		onLoad() {
			//获取用户uid
			this.getUserUid()


			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			this.connectSocketInit();
		},
		// 关闭websocket【必须在实例销毁之前关闭,否则会是underfined错误】
		beforeDestroy() {
			this.closeSocket();
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			connectSocketInit() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "ws://47.102.204.86:8282/",
					success(data) {
						console.log("websocket连接成功");
					},
				});

				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					//开启心跳
					this.startHear()

					this.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常成功发送消息

					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {
						console.log(res.data)
						let msgObj = JSON.parse(res.data)

						switch (msgObj.type) {
							case 10001:
								console.log("握手消息")
								//发送一次用户ID去绑定以后
								this.sendMessage({
									type: this.MSG_TYPE.BIND,
									send_id: this.Uid
								})
								break;
							case 10002:
								console.log("正文消息")
								console.log(msgObj.message)
								//在这里进行前端界面文字渲染

								break;
							case 10003:
								console.log("图片信息")
								//使用img对象进行渲染
								console.log(msgObj.img)

							case 10004:
								console.log("心跳消息")
								console.log(msgObj.message)

								break;
						}

					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					console.log("已经被关闭了")
				})
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				this.socketTask.close({
					success(res) {
						this.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			
			send(){
				this.sendMessage({
					type:this.MSG_TYPE.TEXT,
					message:this.text,
				})
			},
			
			//发送正文消息
			sendMessage(param) {
				if (this.is_open_socket) {

					//封装消息结构
					var message = {
						type: param.type,
						message: param.message,
						to_id: this.toUid,
						send_id: this.Uid,
						is_read: 0,
					}

					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					this.socketTask.send({
						data: JSON.stringify(message),
						async success() {
							console.log("消息发送成功");
						},
					});
				}
			},

			//发送图片消息
			sendImageMessage() {
				//获取上传图片地址

				//通过 websocket发送消息

			},

			//获取用户UID 模拟
			getUserUid() {

				this.Uid = 2
				this.toUid = 10

			},

			//开启心跳
			startHear() {
				var self = this
				setInterval(function() {
					var message = {
						type: self.MSG_TYPE.PING
					}

					self.socketTask.send({
						data: JSON.stringify(message),
						success() {
							console.log("ping")
						}
					})
				}, 1000 * 45)
			}

		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}
</style>
