<template>
	<view>
		<view class="uni-column">
			<view class="clearfix">
				<view class="uni-left uni-label">{{label}}</view>
				<view class="uni-left uni-content">
					<slot name="content"></slot>
				</view>
			</view>
		</view>
		<view class="error" v-if="show">{{errorMassage}} </view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ""
			},
			show: {
				type: Boolean,
				default: false
			},
			errorMassage: {
				type: String,
				default: "错误"
			},
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.error {
		font-size: 12px;
		color: #dd524d;
		position: relative;
		padding-left: 10px; 
	}

	.uni-column {
		border-bottom: 1px #F2F2F2 solid;
		margin-bottom: 5px;
		padding: 12px 10px;
		position: relative;

	}

	.uni-column .uni-left {
		float: left;
	}

	.uni-column .uni-label {
		width: 100px;
	}

	.uni-column .uni-content {
		width: calc(100% - 100px);
	}
</style>
