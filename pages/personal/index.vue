<template>
	<view style="background: #F1F1F1;min-height: 100vh;">
		<view class="TitleBar">
			<view class=" clearfix box bg-white">
				<view class="left">
					<h5 style="font-weight: 600;">{{model.real_name}} </h5>
					<view class="text-gray font14" style="padding-bottom: 5px;">{{model.user_name}}</view>
					<view class="text-gray font14" style="padding-bottom: 5px;" v-if="model.phone!=''">联系方式：{{model.phone}}</view>
					<view class="text-gray font14" style="padding-bottom: 5px;" v-if="model.email!=''">邮箱：{{model.email}}</view>

				</view>
				<view class="right" style="text-align: right;">
					<view style="padding-bottom: 5px;" v-if="model.role_name!=''">
						<uni-tag :text="model.role_name" type="success" size="small" :inverted="true"></uni-tag>
					</view>
					<view v-if="model.org_name!=''">
						<uni-tag :text="model.org_name" type="warning" size="small" :inverted="true"></uni-tag>
					</view>
				</view>

			</view>

		</view>

		<view class="uni-btn-v" style="margin: 20px;margin-top: 10px;">
			<button type="danger" @click="logout" class="bg-red text-white">退出登录</button>
		</view>
		<view>
			<uni-fab :pattern="{color:'#999',selectedColor:'#FEAB01',buttonColor:'#FEAB01'}" :content="[{text:'首页',icon: 'home-filled'},{text:'开通系统',icon: 'circle-filled'},{text:'学校',icon: 'checkbox-filled'},{text:'个人中心',icon: 'person-filled',active:true},{text:'数据统计',icon: 'bars'}]"
			 horizontal="right" vertical="bottom" direction="vertical" @trigger="trigger"></uni-fab>
		</view>
	</view>
</template>

<script>
	import {
		getInfo
	} from '@/api/user.js'
	import {
		trigger
	} from '@/utils/common.js'
	import formItem from '@/components/uni-form-item/uni-form-item'
	import store from '@/store'
	export default {
		components: {
			formItem
		},
		data() {
			return {
				baseUrl: 'https://main.paikongtong.com',
				model: {},
				count: {
					count: 0,
					count1: 0,
					count2: 0,
					count3: 0,
				}
			}

		},
		onShow() {
			this.getUser();
		},
		methods: {
			trigger(e) {
				trigger(e)
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '是否退出重新登录？',
					success: function(res) {
						if (res.confirm) {
							store.dispatch('user/logout', {
								token: store.getters.token,
							}).then(() => {
								uni.navigateTo({
									url: '../Login/Login'
								});
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getUser() {
				uni.showLoading({
					title: "加载中..."
				})
				getInfo({}).then(res => {
					this.model = res.data
					uni.hideLoading()
				})
			}
		}

	}
</script>

<style>
	.TitleBar {
		padding: 15px;
		background: linear-gradient(to bottom, #299DE1 60%, transparent 40%);
	}

	.box {
		padding: 15px;
	}

	.uni-column {
		border: 0 !important;
		padding: 5px 10px !important;
		position: relative;
		font-size: 14px;

	}
</style>
