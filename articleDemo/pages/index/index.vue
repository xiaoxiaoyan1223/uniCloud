<template>
	<view class="home">
		<view class="content">
			<view class="item" v-for="item in listArr" :key="item._id">
				<view class="text">
					<view class="title">默认标题</view>
					<view class="info">
						<text>小明</text>
						<text>2023-6-17</text>
						<text>删除</text>
					</view>
				</view>
				<view class="pic">
					<image src="../../static/logo.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="goAdd" @click="goAdd">
			<uni-icons type="compose" size="30"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr:[]
			}
		},
		onLoad() {
		this.getData()
		},
		//页面触底方法
		onReachBottom(){
			this.getData()
		},
		methods: {
			//获取数据库的列表
			getData(){
			 uniCloud.callFunction({
			 	name:"art_get_all",
				data:{
					skip:this.listArr.length
				}
			 }).then(res=>{
				 let oldList=this.listArr
				 let totalList=[...this.listArr,...res.result.data]
				 this.listArr=totalList
			 })
			},
			//点击跳转到新增页面
			goAdd(){
			uni.navigateTo({
				url:"/pages/add/add"
			})
		}
		}
	}
</script>

<style lang="scss">
	.home {
		.content{
			padding: 30rpx;
			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;
				.text {
					flex:1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
		            .title{
						font-size: 50rpx;
						color:#333;
						display: -webkit-box;
						-webkit-box-origin: vertical;
						-webkit-box-clamp: 2;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.info {
						font-size: 28rpx;
						color: #888;
					}
				}
				.pic {
					width: 260rpx;
					height:180rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	    .goAdd{
			width: 120rpx;
			height: 120rpx;
			background-color: #2b89939;
			color:#fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			font-size: 50rpx;
			position: fixed;
			right: 60rpx;
			bottom: 100rpx;
			box-shadow: 0 0 20rpx rgba(43,153,57,0.7);
		}
	}
</style>
