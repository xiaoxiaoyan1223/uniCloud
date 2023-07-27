<template>
	<view class="add" >
		<form @submit="onSubmit">
			<view class="item">
				<input v-model="formValue.title" type="text" name="title" placeholder="请输入标题"><input/>
			<view/>
			<view class="item">
				<input v-model="formValue.author" type="text" name="author" placeholder="请输入作者"><input/>
			<view/>
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细内容"></textarea> 
			<view/>
			<view class="item">
				<uni-file-picker 
					v-model="imageValue" 
					fileMediatype="image" 
					mode="grid" 
					@select="select" 
					@success="uploadSuccess" 
					@fail="fail" 
				/>
			</view>
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="inDisable()">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formValue:{
					title:"",
					author:"",
					content:""
				},
				picurls:[]
			}
		},
		methods: {
			//图片上传成功
			uploadSuccess(e){
				this.picurls=e.tempFilePaths
			}
			//判断提交按钮是否禁用
			inDisable(obj){
				for(let key in obj){
					if(!obj[key]){
						return true
					}
				}
			}
			//点击提交表单
			onSubmit(e){
			  let detail=e.detail.value;
			  uniCloud.callFunction({
			  	name:"art_add_row",
				data:{
					detail,
					picurls
				}
			  }).then(res=>{
				  uni.showToast({
				  	title:"发布成功"
				  })
				  //发布成功后直接返回首页
				  setTimeout(()=>{
					  uni.reLaunch({
					  	url:"/pages/index/index"
					  })
				  },800)
				  
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		padding: 30rpx;
		.item {
			padding-bottom: 20rpx;
			input,textarea {
				border:1px solid #eee;
				height: 80rpx;
				padding: 0 20rpx;
			}
			textarea{
				height: 200rpx;
				width: 100%;
			}
			button {
				margin-bottom: 20rpx;
			}
		}
	}

</style>
