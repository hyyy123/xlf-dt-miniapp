<template>
	<view class="viewBox viewulBox">
		<div>
			<wuc-tab :tab-list="tabList3" textFlex :tabCur.sync="status" @change="getnewsList" tab-class="text-center text-black bg-white fixed"
			 select-class="text-orange"></wuc-tab>
		</div>
		<view style="padding: 0px 10px;padding-top: 50px;">
			<view class="listliBox lh20 stsbox" v-for="doc in newsList">
				<navigator hover-class="none" :url='"../system/detail?id=" +doc.id'>
					<view class="clearfix">
						<view style="float: left;">
							<view class="font14">{{doc.name}}</view>
							<view class="font12 text-gray">{{doc.add_time}}</view>
						</view>
						<view style="float: right;position:relative; top:9px; ">
							<uni-tag type="success" v-if="doc.status==1" text="已通过" size="small" :circle="true"></uni-tag>
							<uni-tag type="warning" v-if="doc.status==0" text="审核中" size="small" :circle="true"></uni-tag>
							<uni-tag type="error" v-if="doc.status==3" text="已驳回" size="small" :circle="true"></uni-tag>
							<uni-tag type="default" v-if="doc.status==2" text="关闭" size="small" :circle="true"></uni-tag>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<uni-load-more :status="loadingType" v-if="newsList.length>0"></uni-load-more>
		<view style="width: 100%;text-align: center;" v-if="newsList.length==0">
			<image src="../../static/empty.png" style="width: 70%;" mode="aspectFill"></image>
		</view>
		<view>
			<uni-fab :pattern="{color:'#999',selectedColor:'#FEAB01',buttonColor:'#FEAB01'}" :content="[{text:'首页',icon: 'home-filled'},{text:'开通系统',icon: 'circle-filled'},{text:'学校',icon: 'checkbox-filled',active:true},{text:'个人中心',icon: 'person-filled'},{text:'数据统计',icon: 'bars'}]"
			 horizontal="right" vertical="bottom" direction="vertical" @trigger="trigger"></uni-fab>
		</view>
	</view>
</template>

<script>
	import {
		getGroupList
	} from '@/api/group.js'
	import {
		trigger
	} from '@/utils/common.js'
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import store from '@/store'

	var _self, page = 1,
		pagesize = 10,
		count = 0,
		timer = null;

	export default {
		components: {
			WucTab
		},
		data() {
			return {
				tabList3: [{
					name: '全部'
				}, {
					name: '待审核'
				}, {
					name: '已通过'
				}, {
					name: '已驳回'
				}],
				newsList: [],
				loadingType: 'more', //定义加载方式 0---contentdown  1---contentrefresh 2--contentnomore
				status: 0,
			}
		},
		onLoad() {
			//页面一加载时请求一次数据
			// this.TowerSwiper('swiperList');
			_self = this;
			_self.getnewsList();
		},
		onPullDownRefresh() {
			//下拉刷新的时候请求一次数据
			_self.getnewsList();
		},
		onReachBottom() {
			// console.log(222)
			//触底的时候请求数据，即为上拉加载更多 
			_self.getmorenews();
		},
		methods: {
			trigger(e) {
				trigger(e)
			},

			// 上拉加载
			getmorenews: function() {
				if (_self.loadingType !== "more") { //loadingType!=0;直接返回
					return false;
				}
				if (count <= _self.newsList.length) {
					_self.loadingType = "noMore";
					return false;
				}
				_self.loadingType = "loading";
				uni.showNavigationBarLoading(); //显示加载动画 
				getGroupList({
					p: page,
					ps: pagesize,
					status: this.status
				}).then(res => {
					if (res.data.length == 0) { //没有数据
						_self.loadingType = "noMore";
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					}
					page++; //每触底一次 page +1
					_self.newsList = _self.newsList.concat(res.data); //将数据拼接在一起
					_self.loadingType = "more"; //将loadingType归0重置
					uni.hideNavigationBarLoading(); //关闭加载动画 
				})
			},
			// 下拉刷新
			getnewsList: function() { //第一次回去数据
				page = 1;
				this.loadingType = "more";
				uni.showNavigationBarLoading();
				getGroupList({
					p: page,
					ps: pagesize,
					status: this.status == 0 ? "" : this.status == 1 ? 0 : this.status == 2 ? 1 : this.status
				}).then(res => {
					count = res.count;
					if (count == 0 || count <= pagesize) { //没有数据
						_self.loadingType = "noMore";
					}
					page++; //得到数据之后page+1
					_self.newsList = res.data;
					// console.log(_self.newsList)
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新 
				})
			},


		} 

	}
</script>

<style>
	.viewulBox {
		background-color: #FFFFFF;
	}

	.listliBox {
		padding: 10px 5px;
		border-bottom: 1px #ccc solid;
		padding: ;

	}
</style>
