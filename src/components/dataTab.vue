<template>
	<div class="bids-banner-title bidinng-banner-tab payfor">
		<span v-for="(value,index) in getDataTab" class="bid-banner-span" :class="[index==selectTab?'bids-banner-title-active':'']" @click="clickTab(index)"><i></i>{{value}}</span>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			getDataTab:Array
		},
		data:function(){
			return{
				selectTab:0
			}
		},
		methods:{
			clickTab:function(index){
				this.selectTab = index;
				var indexParent = (index == 0?'':'0'+index);
				if(indexParent == '03'){
					indexParent = '09';
				}
				this.$emit("get-index",indexParent);
			}
		}
	}
</script>
<style type="text/css">
	
</style>