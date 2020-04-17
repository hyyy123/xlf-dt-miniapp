<template>
	<view style="padding: 10px 10px;">
		<form>
			<form-item label="学校名称">
				<view slot="content">
					<text>{{form.name}}</text>
				</view>
			</form-item>
			<form-item label="联系人姓名">
				<view slot="content">
					<text>{{form.connect_name}}</text>
				</view>
			</form-item>
			<form-item label="联系电话">
				<view slot="content">
					<text>{{form.connect_phone}}</text>
				</view>
			</form-item>
			<form-item label="学校地址">
				<view slot="content">
					<text>{{form.address}}</text>
				</view>
			</form-item>
			<view style="padding: 10px 10px 10px;">
				<uploader :param="{img_url:form.img_url}" ref="upload" :update="false"></uploader>
			</view>
			<view style="padding-bottom: 10px;padding-left: 10px;">
				<uni-tag type="success" v-if="form.status==1" text="已通过" size="small" :circle="true"></uni-tag>
				<uni-tag type="warning" v-if="form.status==0" text="审核中" size="small" :circle="true"></uni-tag>
				<uni-tag type="error" v-if="form.status==3" text="已驳回" size="small" :circle="true"></uni-tag>
				<uni-tag type="default" v-if="form.status==2" text="关闭" size="small" :circle="true"></uni-tag>
				<text class="font12">{{form.audit_time}} </text>
			</view>
			<view class="font12" style="padding-bottom: 10px;padding-left: 10px;" v-if="form.audit_opinion!=''">审核意见：{{form.audit_opinion}}</view>
			<view class="font12" style="padding-bottom: 10px;padding-left: 10px;">备注：{{form.remark}}</view>

			<view class="uni-btn-v" style="padding-top: 20px;padding-bottom:15px;" v-if="form.status==3">
				<button @click="goUpdate" type="danger" class="bg-blue text-white">修改信息</button>
			</view>
		</form>
		<view>
			<uni-fab :pattern="{color:'#999',selectedColor:'#FEAB01',buttonColor:'#FEAB01'}" :content="[{text:'首页',icon: 'home-filled'},{text:'开通系统',icon: 'circle-filled'},{text:'学校',icon: 'checkbox-filled'},{text:'个人中心',icon: 'person-filled'},{text:'数据统计',icon: 'bars'}]"
			 horizontal="right" vertical="bottom" direction="vertical" @trigger="trigger"></uni-fab>
		</view>
	</view>
</template>

<script>
	import formItem from '@/components/uni-form-item/uni-form-item'
	import uploader from '@/components/uni-uploader/uni-uploader'
	import store from '@/store'
	import {
		trigger
	} from '@/utils/common.js'
	import {
		openGroup,
		getGroup
	} from '@/api/group'
	export default {
		components: {
			formItem,
			uploader
		},
		data() {
			return {
				loading: false,
				is_valid: 0,
				form: {
					id: 0,
					name: "",
					status: 0,
					connect_name: "",
					connect_phone: "",
					audit_time: "",
					audit_opinion: "",
					remark: "",
					address: "",
					img_url: [],
					quality_img: [],
					run_img: [],
					door_img: [],
					public_img: [],
				},
			}
		},
		computed: {

		},
		onLoad(option) {
			// console.log(option)
			if (option.id != undefined) {
				this.form.id = option.id;
				this.getModel();
			}
		},
		methods: {
			trigger(e) {
				trigger(e)
			},
			getModel() {
				getGroup({
					id: this.form.id
				}).then(res => {
					if (res.msg > 0) {
						var img_url = [];
						for (var key in this.form) {
							if (res.data[key]) {
								if (key == "door_img" || key == "public_img" || key == "quality_img" || key == "run_img") {
									// this.form[key] = JSON.parse(res.data[key]);
									var url = JSON.parse(res.data[key]);
									url.forEach(res => {
										img_url.push(res)
									})
								} else {
									this.form[key] = res.data[key];
								}
							}
						}
						this.form.img_url = img_url;
					}
				})
			},
			goUpdate() {
				uni.redirectTo({
					url: './system?id=' + this.form.id
				});
			}
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
		border: 0 !important;
		padding: 5px 10px !important;
		position: relative;
		font-size: 14px;

	}
</style>
