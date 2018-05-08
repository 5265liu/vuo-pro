<template>
	<div class="module-title">
		<span>统计截止时间</span>
		<el-date-picker v-model="valueData" type="month" placeholder="选择月" :picker-options="pickerOptions" 
		@change="changeDate" value-format="yyyy-MM">
		</el-date-picker>
	</div>
</template>
<script type="text/javascript">
	export default{
		data:function(){
			return{
				endData:'',
				valueData:'',
				pickerOptions:{
				  disabledDate(time) {
		            return time.getTime() > Date.now();
		          }
		        }
			}
		},
		created:function(){
			this.getNowMonth();
		},
		methods:{
			//时间控件改变时
			changeDate:function(val){
				this.endData = val;
				this.$emit("end-data",this.endData);
			},
			getNowMonth:function(){
				 var date = new Date;
				 var year = date.getFullYear(); 
				 var month = date.getMonth()+1;
				 if(month < 10){
				 	month = '0' + month;
				 }else{
				 	month = month;
				 }

				 this.valueData = year + '-' + month; 
			}
		}
	}
</script>
<style type="text/css">
	
</style>
