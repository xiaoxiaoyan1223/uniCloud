<template>
	<view class="content">
		<input type="text" v-module="title" placeholder="请输入标题">
		<uni-file-picker 
			v-model="imageValue" 
			fileMediatype="image" 
			mode="grid" 
			@select="select" 
			@progress="progress" 
			@success="success" 
			@fail="fail" 
			ref="files"
		/>
		<button @click="onSubmit" type="primary">确认发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				imageValue:[],
				//回调到云数据库
				filesUrl:[]
			}
		},
		onLoad() {

		},
		methods: {
			//点击发布
			onSubmit(){
				uniCloud.callFunction({
					name:"pic_keep",
					data:{
						title:this.title,
						filesUrl:this.filesUrl
					}
				}).then(res=>{
					
				})
			}
			//实现手动上传
			upload(){
				this.$refs.files.upload()
			}
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			
			// 上传成功
			success(e){
				console.log('上传成功')
				this.fileUrl=e.tempFilePaths
			},
			
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
