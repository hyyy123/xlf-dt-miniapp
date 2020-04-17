<template>
	<view>
		<!-- <view class="listBox" style="" >
			<h5 v-if="title" class="listheader" >{{title}}</h5>
			<slot name="default"></slot>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			}

		}
	}
</script>

<style>
	.listheader {
		font-weight: 600;
		padding: 10px;
		border-bottom: 1px #F5F5F5 solid;
	}
</style>
