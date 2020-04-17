<template>
	<view>
		<view style="position: fixed;top: 10%;width: 100%;">
			<view class="text-center" style=" color: #505050;margin: 30px 0px;">
				<image class="logo_img" src="../../static/logo.png"></image>
				<h5 style="padding:20px 0px 5px; font-weight: 600;">学来蜂</h5>
				<p>系统推广工具</p>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getToken,
		setToken,
		removeToken
	} from '@/utils/auth'
	import store from '@/store'
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// console.log(1)
			getToken().then(res => {
				var token = res.data;
				// console.log(res)
				if (token != undefined) {
					store.dispatch('user/tokenOld', {});
					uni.reLaunch({
						url: '../Home/Home'
					});
				}
			}).catch(res => {
				uni.reLaunch({
					url: '../Login/Login'
				});
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
