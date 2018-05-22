<template>
	<div class="mainPageHeader" style="height:100%; overflow:hidden;">
      <div class="self-header" id="self-header">
        <div style="float:left;width:52%;font-size:22px;height:66px;line-height:66px;position:relative;">
          <img src='../assets/img/logo.png' height="44" width="42" style="vertical-align:middle;margin:0px 6px 0px 15px;"/>
          <span class="header-title">深圳建筑工务署驾驶舱</span>
          <el-select v-model="headerSelOPtion" placeholder="请选择" class="M20 headerSel">
		    <el-option
		      v-for="item in options"
		      :key="item.id"
		      :label="item.text"
		      :value="item.id">
		    </el-option>
		   </el-select>
        </div>
        <div style="float:right;width:44%;text-align:right;margin-right:40px;height:66px;line-height:66px;">
      <!-- 廉政管理页面头部菜单-->
          <a class="exit" id="exit">
            <img class="menu-img" src="../assets/img/exit.png" style="top:5px;" />
            <span class="menu-a">退出</span>
            <span class="liner">|</span>  
          </a>
          <a class="help" id="help">
            <img class="menu-img" src="../assets/img/help.png" style="top:5px;" />
            <span class="menu-a">帮助</span>
            <span class="liner">|</span>  
          </a>
        </div>
        <div style="float:right;width:0%;text-align:right;margin-right:10px;height:66px;line-height:66px;" class="nav-main">   
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="banner">
      	<router-link to="/header">首页</router-link>
      	<router-link to="/invest">投资</router-link>
      	<a data-name="payfor">支付</a>
      	<a data-name="bidding">招标</a>
      	<a data-name="contracts">合同</a>
      	<a data-name="agreement">履约评价</a>
      	<a data-name="change">变更签证</a>
      </div>
      <!--路由切换菜单,keep-alive不会重新加载数据-->
      <div class="wrap" id="wrap" :style="{height:screenHeight}">
      	<keep-alive>
      		<router-view></router-view>
      	</keep-alive>
      </div>
    </div>
</template>
<script>
	//import homePage from "../components/homePage.vue"

	export default {
		components:{
			//'homePage':homePage
		},
		data:function(){
			return{
				options:[],
				headerSelOPtion:'',
				docHeight:document.body.clientHeight //定义屏幕高度
			}
		},
		mounted(){
			var that = this;
			window.onresize = function () {
        		that.docHeight = document.body.clientHeight;  //窗口改变时监听屏幕高度
        	}
		},
		created(){
			this.getHeaderSelData();
		},
		computed:{  //选择用计算属性，通过屏幕高度的改变返回当前div的高度
			screenHeight:function(){
				return ((this.docHeight -120)+'px');
			}
		},
		methods:{
			getHeaderSelData:function(){
				var that = this;
				this.$http.get('/api/txieasyui?taskFramePN=aproTotal&command=org4projectList&colname=json_ajax&colname1=%7B%2527dataform%2527:%2527eui_variable_data%2527,%2527variable%2527:%2527returnJson%2527%7D&ID&type=org').then(function (response) {
					var headerSel = response.data;
					var headerSelOPtion = [];
					for(var i=0;i<headerSel.length;i++){
						var obj={};
						obj.id = headerSel[i].ORG_ID == undefined? '' : headerSel[i].ORG_ID;
						obj.text = headerSel[i].EAF_NAME == '全部'? '深圳市建筑工务署': headerSel[i].EAF_NAME;
						headerSelOPtion.push(obj);
					}
					that.options = headerSelOPtion;
				}).catch(function (response) {
				    console.log(response);
				});
			}
		}
	}
</script>
<style type="text/css">
	.self-header{
		background:#021b39;
	}
	.exit,.help{
		display:inline-block;
		display:none;
	}
	.weather{
	    width: 26px;
	    height: 22px;
	    position: relative;
	    top: 6px;
	    left: -4px;
	    border-radius: 4px;
	}
	#login{    
	   position:absolute;/*��Ư��*/    
	   top:50%;    
	   left:50%;    
	   height:626px;    
	   margin-top:-313px;/*ע�����������DIV�߶ȵ�һ��*/    
	   margin-left:-50%;/*������DIV��ȵ�һ��*/   
	} 

	.header-title{
		color:#c9dde4;
	}

	.headerSel .el-input__inner{
		background:#114e91;
		border:1px solid #00a7fc;
	}
	.el-input__inner{
		color:#a0d1ff;
	}
	.banner{
		padding-left: 0.9%;
		background:#062750;
		z-index:9;
		border:1px solid #11345c;
		z-index: 10;
		overflow: hidden;
	}
	.banner>a{
		display:block;
		float:left;
		padding:12px 28px;
		border-right:1px solid #11375e;
		font-size:18px;
		color:#6287b4;
	}
	.banner>span:nth-of-type(1){
		border-left:1px solid #11375e;
	}
	.router-link-active,.banner>a:hover{
		color: #ffffea!important;
    	background: #058bea;
    	box-shadow: 0 0 2px 2px #29aef1 inset;
	}
</style>