<template>
	<view style="margin: 0 10px;">
		<!-- 不带边框并矩形显示 -->
		<uni-grid :column="3" :show-border="false" :square="false" class="grid-view">
			<uni-grid-item class="grid-item text-center valignCenter" v-for="item in nav">
				<navigator hover-class="none" :url="item.href">
					<uni-icons :type="item.icon" size="40" color="#007AFF" class="icon-item"></uni-icons>
					<view class="text">{{item.name}}</view>
				</navigator>
			</uni-grid-item>
		</uni-grid>
		<button type="danger" class="bg-blue text-white" id="msgbtn" style="display: none;" @click="openMsg">123456</button>
	</view>
</template>

<script>
	import {
		goWindow
	} from '@/utils/common.js'
	import {
		getGroupList
	} from '@/api/group.js'
	import store from '@/store'
	export default {
		data() {
			return {
				nav: [{
						name: "开通系统",
						icon: "circle-filled",
						href: "../system/system",
					},
					{
						name: "已推广学校",
						icon: "checkbox-filled",
						href: "../school/school",
					},
					{
						name: "个人中心",
						icon: "person-filled",
						href: "../personal/index",
					},
					{
						name: "数据统计",
						icon: "bars",
						href: "../statistics/statistics",
					}
				]
			}
		},
		onLoad() {
			getGroupList({
				p: 1,
				ps: 1,
				status: 0
			}).then(res => {})
		},
		methods: {

			openMsg() {
				var that = this
				// 获取用户的当前设置，判断是否点击了“总是保持以上，不在询问”
				wx.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(res) {
						console.log(res)
						if (res.authSetting['scope.subscribemsg']) { //用户点击了“总是保持以上，不再询问”

						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							uni.showModal({
								title: '提示',
								content: '是否接收订阅消息？',
								success: function(res) {
									if (res.confirm) {
										// var templateid = that.setting.templateid.map(item => item.tempid)
										var templateid = ['17bYJZkxmv3YbwGQHfxqdSlQDlW0G8_QFCEBJ_Kw-KE'];
										uni.requestSubscribeMessage({
											tmplIds: ['17bYJZkxmv3YbwGQHfxqdSlQDlW0G8_QFCEBJ_Kw-KE'],
											success(res) {
												console.log(res)
											},
											fail: (res) => {
												console.log(res)
												if (res.errCode == 20004) {
													uni.showModal({
														title: '提示',
														content: '您在设置里关闭了订阅消息，前往设置中心设置？',
														success: function(res) {
															uni.openSetting({ // 打开设置页
																success(res) {
																	console.log(res.authSetting)
																}
															});
														}
													});
												}
											}
										})
									}
								}
							});

						}
					}
				})

			}

		}
	}
</script>

<style>
	.grid-view {}

	.grid-item {
		padding: 20px 0px;
	}

	.text {
		font-size: 12px;
		padding-top: 5px;
	}
</style>
