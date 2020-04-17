<template>
	<view>
		<view>
			<uni-grid :column="5" :show-border="false" :square="false" class="grid-view">
				<uni-grid-item class="grid-item text-center valignCenter" v-for="item in allNumber">
					<view style="font-size: 20px;" :style="{color: item.color}">{{item.value}}</view>
					<view class="text" :style="{color: item.color}">{{item.name}}</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view>
			<view class="clearfix" style="margin:10px;border:1px #f1f1f1 solid;margin-top:0;margin-bottom: 20px;">
				<view class="dayTime">
					<DyDate @getData="getData" name="start" :maxSelect="end==''?'2050/12/31':end"></DyDate>
				</view>
				<view style="float: left;width: 20px;line-height: 30px;">~</view>
				<view class="dayTime">
					<DyDate @getData="getData" name="end" :minSelect="start==''?'1900/01/01':start"></DyDate>
				</view>
			</view>
			<boolTable :tableData="tableData"></boolTable>
		</view>
		<view>
			<uni-fab :pattern="{color:'#999',selectedColor:'#FEAB01',buttonColor:'#FEAB01'}" :content="[{text:'首页',icon: 'home-filled'},{text:'开通系统',icon: 'circle-filled'},{text:'学校',icon: 'checkbox-filled'},{text:'个人中心',icon: 'person-filled'},{text:'数据统计',icon: 'bars',active:true}]"
			 horizontal="right" vertical="bottom" direction="vertical" @trigger="trigger"></uni-fab>
		</view>
	</view>
</template>

<script>
	import {
		trigger
	} from '@/utils/common.js'
	import DyDate from '@/components/dy-Date/dy-Date.vue';
	import boolTable from '@/components/booleen-single-table/table.vue'
	import {
		getGroupCount,
		getGroupCountByUser
	} from '@/api/group.js'
	export default {
		components: {
			DyDate,
			boolTable
		},
		data() {
			return {
				allNumber: [{
						name: "已结账",
						value: 25,
						color: "#7EC663"
					},
					{
						name: "未结账",
						value: 25,
						color: "#4CD964"
					},
					{
						name: "待审核",
						value: 25,
						color: "#FEAB01"
					},
					{
						name: "已驳回",
						value: 25,
						color: "#FF0000"
					},
					{
						name: "总计",
						value: 25,
						color: "#007AFF"
					}
				],
				start: "",
				end: "",
				tableData: []
			}
		},
		onLoad() {
			this.getAllCount();
		},
		methods: {
			trigger(e) {
				trigger(e)
			},
			getData(timeValue, name) {
				if (name == "start") {
					this.start = timeValue
				} else if (name == "end") {
					this.end = timeValue
				}
				if (this.start != "" && this.end != "") {
					this.getList();
				}
			},
			getAllCount() {
				uni.showLoading({
					title: "加载中..."
				})
				getGroupCount({}).then(res => {
					var all_count = 0;
					all_count += parseInt(res.data["check_count"]);
					all_count += parseInt(res.data["uncheck_count"]);
					all_count += parseInt(res.data["wait_count"]);
					all_count += parseInt(res.data["reject_count"]);
					this.allNumber[0].value = res.data["check_count"];
					this.allNumber[1].value = res.data["uncheck_count"];
					this.allNumber[2].value = res.data["wait_count"];
					this.allNumber[3].value = res.data["reject_count"];
					this.allNumber[4].value = all_count;
					this.getList()
				})
			},
			getList() {
				uni.showLoading({
					title: "加载中..."
				})
				getGroupCountByUser({
					start: this.start,
					end: this.end
				}).then(res => {
					var all_check_count = 0,
						all_uncheck_count = 0,
						all_wait_count = 0,
						all_reject_count = 0,
						all_all_count = 0;
					res.data.forEach(res => {
						var all_count = 0;
						all_count += parseInt(res["check_count"]);
						all_count += parseInt(res["uncheck_count"]);
						all_count += parseInt(res["wait_count"]);
						all_count += parseInt(res["reject_count"]);
						res["all_count"] = all_count;

						all_check_count += parseInt(res["check_count"]);
						all_uncheck_count += parseInt(res["uncheck_count"]);
						all_wait_count += parseInt(res["wait_count"]);
						all_reject_count += parseInt(res["reject_count"]);
						all_all_count += all_count;
					})
					res.data.push({
						real_name: "总计",
						check_count: all_check_count,
						uncheck_count: all_uncheck_count,
						wait_count: all_wait_count,
						reject_count: all_reject_count,
						all_count: all_all_count
					})
					this.tableData = res.data;
					uni.hideLoading();
				})
			},

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

	.dayTime {
		float: left;
		width: calc(50% - 10px);
		line-height: 30px;
		text-align: center;

	}
</style>
