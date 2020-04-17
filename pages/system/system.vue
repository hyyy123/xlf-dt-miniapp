<template>
	<view style="padding: 0px 10px;">
		<view class="text-gray font12" style="padding: 10px 10px 5px ;">请确认信息，验证完成后不可修改</view>
		<form @submit="formSubmit" @reset="formReset">
			<form-item label="学校名称" errorMassage="请填写学校名称" :show="form.name==''&&is_valid==1">
				<view slot="content">
					<input class="uni-input" v-model="form.name" placeholder="请填写学校名称" />
				</view>
			</form-item>
			<form-item label="联系人姓名" errorMassage="请填写联系人姓名" :show="form.connect_name==''&&is_valid==1">
				<view slot="content">
					<input class="uni-input" v-model="form.connect_name" placeholder="请填写联系人姓名" />
				</view>
			</form-item>
			<form-item label="联系电话" errorMassage="请填写联系电话" :show="isMobileNumber(form.connect_phone)&&is_valid==1">
				<view slot="content">
					<input class="uni-input" v-model="form.connect_phone" placeholder="请填写联系电话" />
				</view>
			</form-item>
			<form-item label="学校地址" errorMassage="请填写学校地址" :show="form.address==''&&is_valid==1">
				<view slot="content">
					<input class="uni-input" v-model="form.address" placeholder="请填写学校地址" />
				</view>
			</form-item>
			<view style="padding: 10px 10px 0px;">
				<h4>图片上传</h4>
				<!-- 营业执照 -->
				<view class="text-gray font12" style="padding: 10px 0px;">
					<text>营业执照</text>
					<text class="error" v-if="form.quality_img.length==0&&is_valid==1">请上传营业执照 </text>
				</view>
				<view>
					<uploader :param="{img_url:form.quality_img}" ref="upload" @change="upchange" name="quality_img" :update="true"></uploader>
				</view>
				<!-- 办学证明 -->
				<view class="text-gray font12" style="padding: 10px 0px;">
					<text>办学证明</text>
					<text class="error" v-if="form.run_img.length==0&&is_valid==1">请上传办学证明 </text></view>
				<view>
					<uploader :param="{img_url:form.run_img}" ref="upload" @change="upchange" name="run_img" :update="true"></uploader>
				</view>
				<!-- 门头照 -->
				<view class="text-gray font12" style="padding: 10px 0px;">
					<text>门头照</text>
					<text class="error" v-if="form.door_img.length==0&&is_valid==1">请上传门头照 </text></view>
				<view>
					<uploader :param="{img_url:form.door_img}" ref="upload" @change="upchange" name="door_img" :update="true"></uploader>
				</view>
				<!-- 宣传物料 -->
				<view class="text-gray font12" style="padding: 10px 0px;">
					<text>宣传物料</text>
					<text class="error" v-if="form.public_img.length==0&&is_valid==1">请上传宣传物料 </text></view>
				<view>
					<uploader :param="{img_url:form.public_img}" ref="upload" @change="upchange" name="public_img" :update="true"></uploader>
				</view>
			</view>


			<view class="uni-btn-v" style="padding-top: 20px;padding-bottom:15px;">
				<button form-type="submit" type="danger" class="bg-blue text-white" :loading="loading">提交</button>
			</view>

		</form>
		<view>
			<uni-fab :pattern="{color:'#999',selectedColor:'#FEAB01',buttonColor:'#FEAB01'}" :content="[{text:'首页',icon: 'home-filled'},{text:'开通系统',icon: 'circle-filled',active:true},{text:'学校',icon: 'checkbox-filled'},{text:'个人中心',icon: 'person-filled'},{text:'数据统计',icon: 'bars'}]"
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
		getGroup,
		updateGroup
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
					connect_name: "",
					connect_phone: "",
					address: "",
					status: 0,
					quality_img: [],
					run_img: [],
					door_img: [],
					public_img: [],
				},
			}
		},
		computed: {

		},

		onShow() {

		},
		onLoad(option) {
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
						for (var key in this.form) {
							if (res.data[key]) {
								if (key == "door_img" || key == "public_img" || key == "quality_img" || key == "run_img") {
									this.form[key] = JSON.parse(res.data[key]);
								} else if (key != "status") {
									this.form[key] = res.data[key];
								}
							}
						}
					}
				})
			},
			upchange(url, name) {
				if (name == "quality_img") {
					this.form.quality_img = url;
				} else if (name == "run_img") {
					this.form.run_img = url;
				} else if (name == "door_img") {
					this.form.door_img = url;
				} else if (name == "public_img") {
					this.form.public_img = url;
				}
			},
			isMobileNumber(value) {
				var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
				var isMob =
					/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;

				if (isMob.test(value) || isPhone.test(value)) {
					return false
				} else {
					return true
				}
			},
			judgeStr() {
				if (this.form.name == "") {
					return false
				}
				if (this.form.address == "") {
					return false
				}
				if (this.form.connect_name == "") {
					return false
				}
				if (this.isMobileNumber(this.form.connect_phone)) {
					return false
				}
				if (this.form.quality_img.length == 0) {
					return false
				}
				if (this.form.run_img.length == 0) {
					return false
				}
				if (this.form.door_img.length == 0) {
					return false
				}
				if (this.form.public_img.length == 0) {
					return false
				}
				return true
			},
			getPostData() {
				var postData = JSON.parse(JSON.stringify(this.form))
				postData.quality_img = JSON.stringify(this.form.quality_img)
				postData.run_img = JSON.stringify(this.form.run_img)
				postData.door_img = JSON.stringify(this.form.door_img)
				postData.public_img = JSON.stringify(this.form.public_img)
				return postData
			},
			formSubmit(e) {
				this.is_valid = 1;
				this.loading = true;
				var _this = this;
				console.log(this.form)
				if (this.judgeStr()) {
					if (this.form.id == 0) {
						this.addItem()
					} else {
						this.updateItem()
					}

				} else {
					this.loading = false;
				}

			},
			addItem() {
				var _this = this;
				openGroup(this.getPostData()).then(res => {
					if (res.msg > 0) {
						uni.showModal({
							title: '提示',
							content: '添加学校成功,是否进入学校详情页面？',
							success: function(res1) {
								_this.loading = false;
								if (res1.confirm) {
									uni.redirectTo({
										url: './detail?id=' + res.data
									});
								} else {
									uni.reLaunch({
										url: '../Home/Home'
									});
								}
							}
						})
					} else {
						_this.loading = false;
						uni.showToast({
							title: res.msgbox,
							icon: "none",
							duration: 2000
						});
					}
				})

			},
			updateItem() {
				var _this = this;
				updateGroup(this.getPostData()).then(res => {
					if (res.msg > 0) {
						uni.showModal({
							title: '提示',
							content: '修改学校成功,是否进入学校详情页面？',
							success: function(res) {
								_this.loading = false;
								if (res.confirm) {
									uni.redirectTo({
										url: './detail?id=' + _this.form.id
									});
								} else {
									uni.reLaunch({
										url: '../Home/Home'
									});
								}
							}
						})
					} else {
						_this.loading = false;
						uni.showToast({
							title: res.msgbox,
							icon: "none",
							duration: 2000
						});
					}
				})

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
</style>
