<template>
	<div>
		<div @click="backRouter">返回</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		methods:{
			backRouter:function(){
				this.$router.push({path:'/invest'});
			}
		}
	}
</script>
<style type="text/css">
	
</style>