<template>
	<view class="UploaderImg">
		<ul v-if="img_url.length>0" class="pciture-card upload-list">
			<li class="upload-list__item is-ready" v-for="(item,index) in img_url">
				<view style="position: relative;">
					<view style="position: absolute;right:-4px; top:-9px; " @click="del(index)" v-if="update">
						<uni-icons type="minus-filled" color="#f00"></uni-icons>
					</view>
					<image :src="item" style="width: 50px; height: 50px;margin-right: 10px;" @click="preview(index)" mode="aspectFit"></image>
				</view>
			</li>
		</ul>
		<view @click="open" class="viewPlus" v-if="update">
			<uni-icons type="plusempty" size="30" color="#ccc" class="icon-item"></uni-icons>
		</view>
	</view>
</template>

<script>
	import {
		uploadFild
	} from '@/api/uploader'
	import store from '@/store'
	export default {
		props: {
			param: {
				type: Object,
				defalut: {
					img_url: []
				}
			},
			name: {
				type: String,
				defalut: ""
			},
			update: {
				type: Boolean,
				defalut: true
			}

		},
		watch: {
			param(val) {
				// console.log(1)
				if (this.is_img) {
					this.img_url = this.param.img_url;
				}
			},
			// img_url(val) {
			// 	console.log(2)
			// 	this.param.img_url = this.img_url;
			// }
		},
		data() {
			return {
				img_url: this.param.img_url,
				is_img: true
				// name: this.name,
			}
		},
		onShow() {},
		methods: {
			del(index) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '确认删除当前图片？',
					success: function(res) {
						if (res.confirm) {
							_this.img_url.splice(index, 1)
							_this.$emit("change", _this.img_url, _this.name);
						}
					}
				})
			},
			preview(index) {
				// 预览图片
				uni.previewImage({
					urls: this.img_url,
					current: index,
				});
			},
			open() {
				let _this = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFiles = chooseImageRes.tempFiles; 
						_this.uploadFile(tempFiles, 0, tempFiles.length, function() {
							_this.is_img = false;
							_this.$emit("change", _this.img_url, _this.name);
						})
					}
				});
			},
			uploadFile(imgurls, index, max, func) {
				if (index == max) {
					if (func != undefined) {
						func()
					}
					return false
				}
				var size = imgurls[index].size
				var path = imgurls[index].path
				if (size > 1048576) { //1MB=1048576Byte
					uni.showToast({
						title: '文件大小超出最大限制',
						icon: "none"
					})
					index = index + 1;
					_this.uploadFile(imgurls, index, max, func)
					return false
				}
				let token = store.getters.token;
				let _this = this;
				uni.uploadFile({
					url: 'https://main.paikongtong.com/tools/upload_ajax.ashx?action=uploadFild', //仅为示例，非真实的接口地址
					// files: tempFilePaths,
					fileType: "image",
					filePath: path,
					name: 'Filedata',
					header: {
						"token_pc": token == undefined ? "" : token,
						"Content-Type": "multipart/form-data"
					},
					success: (uploadFileRes) => {
						var res = uploadFileRes.data
						if (res != undefined) {
							res = JSON.parse(res);
						}
						index = index + 1;
						_this.img_url.push("https://main.paikongtong.com" + res.path)
						_this.uploadFile(imgurls, index, max, func)
					},
					fail: (error) => {
						console.log(error)
					}
				});
			}
		}
	}
</script>

<style>
	.viewPlus {
		height: 50px;
		width: 50px;
		line-height: 50px;
		border: 1px #DFDFDF solid;
		text-align: center;
		display: inline-block;
		text-align: center;
		vertical-align: top;
	}

	.upload-list {
		margin: 0;
		display: inline;
		vertical-align: top;
	}

	.upload-list__item {
		background-color: #fff;
		border: 1px solid #DFDFDF;
		/* border-radius: 6px; */
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 52px;
		height: 52px;
		display: inline-block;
		margin-right: 5px;

	}
</style>
