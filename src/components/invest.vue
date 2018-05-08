<template>
	<div id="investment" class="investment newinvestment">
		<div class="investment-first">
			<div class="invest-time">
				<div class="module-title">
					<timeEnd @end-data="endDataParent"></timeEnd>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import timeEnd from '../components/timeEnd.vue'

	export default{
		components:{
			timeEnd:timeEnd
		},
		data:function(){
			return{
				endData:''
			}
		},
		methods:{
			endDataParent:function(endData){
				this.endData = endData;
			}
		}
	}
</script>
<style type="text/css">
	.invest-time{
		margin-top:55px;	
	}

	.invest-content .module-title{
		height: 42px;
	    line-height: 42px;
	}
</style>