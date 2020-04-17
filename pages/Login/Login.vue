<template>
	<view class="view-form ">

		<view class="text-center" style=" color: #505050;margin: 30px 0px;">
			<image class="logo_img" src="../../static/logo.png"></image>
			<h5 style="padding:20px 0px 5px; font-weight: 600;">学来蜂</h5>
			<p>系统推广工具</p>
		</view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<input class="uni-input" name="userName" v-model="userName" placeholder="请输入用户名" />
			</view>
			<span class="error" v-if="userName==''&&is_valid==1">请输入用户名</span>

			<view class="uni-form-item uni-column">
				<input class="uni-input" name="password" v-model="password" type="password" placeholder="请输入密码" />
			</view>
			<span class="error" v-if="password==''&&is_valid==1">请输入密码</span>

			<view class="uni-btn-v" style="padding-top: 20px;">
				<button form-type="submit" type="danger" class="bg-blue text-white" :loading="loading">登录</button>
			</view>

		</form>
	</view>
</template>

<script>
	import store from '@/store'
	import {
		login
	} from '@/api/user.js'
	import {
		getToken,
		setToken,
		removeToken
	} from '@/utils/auth'
	export default {
		data() {
			return {
				loading: false,
				is_valid: 0,
				userName: "",
				password: ""
			}
		},
		onLoad() {
			getToken().then(res => {
				var token = res.data;
				if (token != undefined) {
					store.dispatch('user/tokenOld', {});
					uni.reLaunch({
						url: '../Home/Home'
					});
				}
			})
		},
		methods: {
			formSubmit(e) {
				this.is_valid = 1;
				this.loading = true;
				var _this = this;
				if (this.userName != "" && this.password != "") {
					var userName = this.userName
					var password = this.password
					let _this = this;
					// uni.login({
					// 	provider: 'weixin',
					// 	success: function(loginRes) {
					// 		let code = loginRes.code;
					store.dispatch('user/login', {
						// code: code,
						username: userName,
						password: password
					}).then(res => {
						_this.loading = false;
						uni.reLaunch({
							url: '../Home/Home'
						});
					}).catch(error => {
						_this.loading = false;
					});
					// 	}
					// });
				} else {
					this.loading = false;
				}


			},
			formReset: function(e) {
				console.log('清空数据')
			}
		},
	}
</script>

<style>
	.view-form {
		padding: 15px;
	}

	.view-form .uni-form-item {
		border-bottom: 1px #F2F2F2 solid;
		margin-bottom: 10px;
		padding: 10px;
		position: relative;
	}

	span.error {
		font-size: 12px;
		color: #dd524d;
		position: relative;
		padding-left: 10px;
		top: -10px;

	}
</style>
