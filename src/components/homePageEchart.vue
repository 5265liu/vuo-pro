<template>
	<div>
		<div class="left_b">
			<!--地图-->
			<div class="map">
				<div class="map-container">
				    <div class="search-box">
						<el-input
						  placeholder="项目查找"
						  v-model="mapInput"
						  clearable>
						</el-input>
						<div class="iconFind" @click="mapSeach">
							<img src="../assets/img/minify.png" style="height:22px; margin:9px 15px;"/>
						</div>
					</div>
				    <div id="map-box" class="map-box"></div>
				</div>
			    <div class="enlarge" id="enlarge">
					<img src="../assets/img/enlarge.png" />
                </div>
			</div>
			<!--图表-->
			<div class="instruction">
                <div class="evaluate">
                    <div class="right_title"><span class="yearSelect">{{choseYearChild}}</span>年度履约评价</div>
                    <div id="evalute_box" class="evalute_box"></div>
                    <div class="self-tip">
                      <p style="font-size:18px;margin:0px;color:#e8f2fb;margin-bottom:12px;">评价合同</p>
                      <p style="font-size:18px;margin:0px;color:#40b5e1;"><span id="totalNum">{{assessTotal}}</span><span style="font-size:16px;">次</span></p>
                    </div>
                </div>
				<div class="proj_total" style="position:relative;">
					<div class="right_title">各阶段项目汇总</div>
					<div id="proj_total" class="proj_box"></div>
				</div>
			</div>
		</div>
		<div class="right_b">
			<div>
               <div class="right_title"><span class="yearSelect">{{choseYearChild}}</span>年质量和安全平均得分统计</div>
               <div class="right_box" id="quality_safe"></div>
            </div>
			<div>
				<div class="right_title"><span class="yearSelect">{{choseYearChild}}</span>年度廉政预警汇总</div>
				<div class="right_box middle-box">
					<div id="icac_statistics"></div>
                    <div id="icac_situation"></div>
                </div>
			</div>
			<div>
				<div class="right_title">申报人员实名及签到情况汇总</div>
				<div class="right_box" id="apply_situation"></div>
				<!-- <img class="no-data no-data2" src="img/no-data.png" style="left:37%;top:47%;" /> -->
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import avatar from '../assets/img/szwb.png'

	export default{
		props:{
			choseYearChild:'',
			choseMonthChild:'',
			endDataChild:''
		},
		data:function(){
			return{
				mapInput:'' ,                    //地图搜索框值
		        avatar:avatar,                   //地图锚点图片
		        assessTotal:''                   //履约评价总数
			}
		},
		created(){
		},
		methods:{
			//锚点表格
			showProjInfo:function(data){
				var that=this;

				var url = "/api//txieasyui?taskFramePN=DriverPorjet&command=getProjectInfoByCode&colname=json_ajax&colname1={%27dataform%27:%27eui_variable_data%27,%27variable%27:%27returnJson%27}&code="+data.EAF_ID;

				this.$http.post(url).then(function (response) {
					if(response.data.code == 200){
							that.sContent = '<div class="divt"></div><div class="infoWin" style="width:348px;height:230px;color:#666;border-radius:12px;margin-top: 14px;">'+
							'<table>'+
								'<tr><th class="info-table-th">项目名称  </th><td class="info-table-th">'+response.data.EAF_NAME+'</td></tr>'+
							    '<tr><th>项目阶段  </th><td>'+(response.data.PJ_STAGE == null || response.data.PJ_STAGE == undefined ? "" : response.data.PJ_STAGE)+'</td></tr>'+
							    '<tr><th>开工时间  </th><td>'+(response.data.PJ_STARTTIME == null || response.data.PJ_STARTTIME == undefined ? "" : response.data.PJ_STARTTIME)+'</td></tr>'+
							    '<tr><th>投资金额（万元） </th><td>'+(response.data.PJ_JH == null || response.data.PJ_JH == undefined ? "" : response.data.PJ_JH)+'</td></tr>'+
							    '<tr><th>支付金额（万元） </th><td>'+(response.data.PJ_ZF == null || response.data.PJ_ZF == undefined ? "" : response.data.PJ_ZF)+'</td></tr>'+
							    '<tr><th>合同金额（万元） </th><td>'+(response.data.PJ_COR == null || response.data.PJ_COR == undefined ? "" : response.data.PJ_COR )+'</td></tr>'+
							'</table>'+
					    '</div>';
					}
				});
				return that.sContent;
			},
			//地图搜索
			mapSeach:function(){
				if(this.mapInput == ""){
					this.getMarker(this.mapInput,0);
				}else{
					this.getMarker(this.mapInput,1);
				}
			},
			//地图
			mapMarker:function(){
				var self = this;
				var isfand=false;
				var map = new BMap.Map("map-box", {mapType: BMAP_HYBRID_MAP,enableMapClick: false, minZoom:12, maxZoom: 100});//禁止点击
			    map.centerAndZoom(new BMap.Point(114.060913,22.587571),13);//定位深圳，级别13级
			    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
			    map.enableContinuousZoom(); 	  //启用地图惯性拖拽，默认禁用
		        var b = new BMap.Bounds(new BMap.Point(113.477686,22.310655),new BMap.Point(114.688458,23.016071)); // 范围 左下角，右上角的点位置 
		        try {    // js中尽然还有try catch方法，可以避免bug引起的错误
		          BMapLib.AreaRestriction.setBounds(map, b); // 已map为中心，已b为范围的地图
		        } catch (e) {
		        // 捕获错误异常
		          //console.log(e);
		        }
				
		        var myCtrl1 = new Con1();
		        map.addControl(myCtrl1);
		       
		        var myCtrl2 = new Con2();
		        map.addControl(myCtrl2);

		        //切换地图显示类型
				function Con1() {
				    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
				    this.defaultOffset = new BMap.Size(90 , 24);

				    var div1 = document.createElement("div");
				    var e1 = document.createTextNode("透视地图");
				    div1.appendChild(e1);
				    // 设置样式    
				    div1.style.cssText = "opacity:0.8;font-weight:bold;width:80px;text-align:center;line-height:38px;height:38px;font-size:14px;color:#fff;cursor:pointer;border:1px solid CornflowerBlue;background:CornflowerBlue;right:90px;position:absolute;top:24px;";
				    // 绑定事件 
				    div1.onclick = function () {
				       //map.setMapType(map.setMapType(BMAP_NORMAL_MAP));
				    	map.setMapType(BMAP_PERSPECTIVE_MAP);     //修改地图类型为3D地图
				        map.setCurrentCity("深圳市");  //设置当前城市
				    }
				    map.getContainer().appendChild(div1);
				    return div1;
				}
				//切换地图显示类型
				function Con2() {
				    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
				    this.defaultOffset = new BMap.Size(180 , 24);

				    var div2 = document.createElement("div");
				    var e2 = document.createTextNode("混合地图");
				    div2.appendChild(e2);
				    // 设置样式    
				    div2.style.cssText = "opacity:0.8;font-weight:bold;width:80px;text-align:center;line-height:38px;height:38px;font-size:14px;color:#fff;cursor:pointer;border:1px solid CornflowerBlue;background:CornflowerBlue;right:180px;position:absolute;top:24px;";
				    
				    div2.onclick = function () {
				    	map.setMapType(BMAP_HYBRID_MAP);
				    	map.setCurrentCity("深圳市");  //设置当前城市
				    }
				    
				    map.getContainer().appendChild(div2);
				    return div2;
				}

				this.getMarker=function(inputData,isPanTo){
					map.clearOverlays();
					var that = this;
					//为地图设置锚点
					this.$http.post("/api/txieasyui?taskFramePN=DriverPorjet&command=getGovProjectList&colname=json_ajax&colname1={%27dataform%27:%27eui_datagrid_data%27,%27tablename%27:%27detail0%27}&dept_id=allProject&bim_stage=&bim_pdept=&bim_projtype=&eaf_name="+inputData).then(function (response) {

						if (response.data.rows&&response.data.rows.length>0) {
							for(var i=0;i<response.data.rows.length;i++){
								var lat = response.data.rows[i].BIM_LATITUDE,//经度
							    	lot = response.data.rows[i].BIM_LONGITUDE; //纬度
							    var point = new BMap.Point(lot, lat);

								addMarker(point,response.data.rows[i],isPanTo);
							}
						}
					});
				}
				
				this.getMarker("",0);

				function addMarker(point,data,isPanTo){
					var redIcon={icon:new BMap.Icon(self.avatar, new BMap.Size(20,20))};
					var marker=new BMap.Marker(point,redIcon);

					function markerClick(){
						var opt = {
							width:350,
			 				height:240
						}

						var sContent='';
						var url = "/api/txieasyui?taskFramePN=DriverPorjet&command=getProjectInfoByCode&colname=json_ajax&colname1={%27dataform%27:%27eui_variable_data%27,%27variable%27:%27returnJson%27}&code="+data.EAF_ID;

						self.$http.get(url).then(function (response) {
							if(response.data.code == 200){
									sContent = '<div class="divt"></div><div class="infoWin" style="width:348px;height:230px;color:#666;border-radius:12px;margin-top: 14px;">'+
									'<table>'+
										'<tr><th class="info-table-th">项目名称  </th><td class="info-table-th">'+response.data.data[0].EAF_NAME+'</td></tr>'+
									    '<tr><th>项目阶段  </th><td>'+(response.data.data[0].PJ_STAGE == null || response.data.data[0].PJ_STAGE == undefined ? "" : response.data.data[0].PJ_STAGE)+'</td></tr>'+
									    '<tr><th>开工时间  </th><td>'+(response.data.data[0].PJ_STARTTIME == null || response.data.data[0].PJ_STARTTIME == undefined ? "" : response.data.data[0].PJ_STARTTIME)+'</td></tr>'+
									    '<tr><th>投资金额（万元） </th><td>'+(response.data.data[0].PJ_JH == null || response.data.data[0].PJ_JH == undefined ? "" : response.data.data[0].PJ_JH)+'</td></tr>'+
									    '<tr><th>支付金额（万元） </th><td>'+(response.data.data[0].PJ_ZF == null || response.data.data[0].PJ_ZF == undefined ? "" : response.data.data[0].PJ_ZF)+'</td></tr>'+
									    '<tr><th>合同金额（万元） </th><td>'+(response.data.data[0].PJ_COR == null || response.data.data[0].PJ_COR == undefined ? "" : response.data.data[0].PJ_COR )+'</td></tr>'+
									'</table>'+
							    '</div>';
							}

							var infoWindow = new BMap.InfoWindow(sContent,opt);
							map.openInfoWindow(infoWindow,point);
						});
					}

					marker.addEventListener("click", function(){
						markerClick();
					});
					

					if(isPanTo){
						markerClick();      //调用表格事件
						map.panTo(point);   //地图中心点
					}else{
						map.reset();       //还原中心点
					}

					map.addOverlay(marker);
				}
			},
			//图表数据年度履约评价 & 本年度质量和安全平均得分统计
			eChartLY:function(){
				var that = this;

				this.$http.get("/api/txieasyui?taskFramePN=IndexAppointEvaluate&command=getScoreAndRank&colname=json_ajax&colname1={%27dataform%27:%27eui_variable_data%27,%27variable%27:%27returnJson%27}&timeStramp="+this.endDataChild+"&orgID=").then(function (response) {
					//console.log(response.data);
					var dataQuaArr = [];//本年度质量得分
		 			var dataSecArr = [];//本年度安全得分
					var scode=[];
					var rankName = [];//评价名称
					var data = response.data.data.rank;
		 			var dataScore = response.data.data.score;

		 			for(var i in data){
		 				rankName.push(i);
		 				scode.push(data[i]);
		 			}

		 			that.assessTotal = data['总数'];    //赋值
		 			
		 			for(var i=0;i<dataScore.length;i++){
		 			 	dataQuaArr.push(dataScore[i].QSCORE);
		 			 	dataSecArr.push(dataScore[i].SSCORE);
		 			}

		 			 //履约评价
		 			 var myChart_5 = that.$echarts.init(document.getElementById('evalute_box'));
					 // 指定图表的配置项和数据
					 var option_5 = {
						 tooltip: {
						 	 trigger: 'item',
						 	 backgroundColor: '#a3d9f3',
							 textStyle:{
						        color: '#183756',
						        fontStyle: 'normal',
						        fontWeight: 'normal',
						        fontFamily: 'sans-serif',
						        fontSize: 14,
						     },
							 formatter: "{a} {b} : {c} ({d}%)"
					     },
						 legend: {
							 orient: 'horizontal',
							 x: 'center',
							 y: '78%',
							 data:rankName,
							 textStyle:{color:'#89a7bf',fontSize:"14"},
							 itemWidth:10
						 },
						 series: [
							 {
								 name:'',
								 type:'pie',
								 radius: ['55%', '70%'],
								 center : ['50%', '42%'],
								 //avoidLabelOverlap: false,
								 data:[
									 {value:scode[0], name:'优秀'},
									 {value:scode[1], name:'良好'},
									 {value:scode[2], name:'中等'},
									 {value:scode[3], name:'合格'},
					                 {value:scode[4], name:'不合格'}
								 ],
								 itemStyle : {
									 normal: {
										 color: function (params){ //设置饼的颜色
											 var colorList = ['rgb(12,169,90)','rgb(219,134,7)','rgb(33,118,209)','rgb(225,66,63)','rgb(177,71,181)'];
											 return colorList[params.dataIndex];
										 },
										 label:{
											 show:false, //是否显示饼图提示信息
											 position:'inside',
											 textStyle:{color:'#e5edff',fontSize:"14"},
											 /*formatter: '{c}条 {d}%',*/
										 },
										 title:{
											 text:'aaaa'
										 },
										 labelLine:{
											 lineStyle:{color:'#39759a'}
										 }
									 }
								 }
							 }
						 ]
					 };
					 // 使用刚指定的配置项和数据显示图表。
					 myChart_5.setOption(option_5);


					 //本年度质量和安全平均得分统计
					 //初始化echarts实例
					 var myChart_1 = that.$echarts.init(document.getElementById('quality_safe'));
				     
					 // 指定图表的配置项和数据
					 var option_1 = {
						 tooltip : {
							 trigger: 'axis',
							 backgroundColor: '#a3d9f3',
							 textStyle:{
						        color: '#183756',
						        fontStyle: 'normal',
						        fontWeight: 'normal',
						        fontFamily: 'sans-serif',
						        fontSize: 14,
						     }
						 },
						 legend: {
							 data:['质量平均分','安全平均分'],
							 textStyle: {
								 color: '#e0f7ff',
								 fontSize:"14"
							 },
							 y:"20"
			
						 },
						/* toolbox: {
							 feature: {
								 saveAsImage: {}
							 }
						 },*/
			
						 grid: {
							 left: '3%',
							 right: '4%',
							 bottom: '3%',
							 containLabel: true
						 },
						 xAxis : [
							 {
								 type : 'category',
								 boundaryGap : false,
								 data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
								 axisLabel: {
									 show: true,
									 textStyle: {
										 color: '#93bbd4'
									 }
								 },
								 axisLine: {
									 lineStyle: {
										 color: '#15638a'
									 }
								 }
							 }
						 ],
						 yAxis : [
							 {
								 type: 'value',
								 name:"（分）",
								 nameTextStyle: {
					                color: '#ecf6ff',
					                fontSize:"14"
					             },
								 axisLabel: {
									 show: true,
									 textStyle: {
										 color: '#93bbd4'
									 }
								 },
								 axisLine: {
									 lineStyle: {
										 color: '#15638a'
			
									 }
								 },
								 splitLine: {
						            lineStyle: {
						                type: 'dashed',
						                color: '#2c527c'
						            }
						         }
							 }
						 ],
						 series : [
							 {
								 name:'质量平均分',
								 type:'line',
								 areaStyle: {normal: {
									 color:"#025c90",
									 type: 'default',
								 }},
								 symbol:'circle',//拐点样式
								 symbolSize: 8,//拐点大小
								 data:dataQuaArr,
								 itemStyle : {
									 normal : {
										 color:"#1893cc",
										 lineStyle:{
											 color:"#1893cc"
										 }
				                     }
				                  }
				              },
							 {
								 name:'安全平均分',
								 type:'line',
								 areaStyle: {normal: {
									 color:"#046c65",
									 type: 'default',
								 }},
								 symbol:'circle',//拐点样式
								 symbolSize: 8,//拐点大小
								 data:dataSecArr,
								 itemStyle : {
									 normal : {
										 color:"#21b770",
										 lineStyle:{
											 color:"#21b770"
										 }
									 }
								 }
							 }
						 ]
					 };
					 // 使用刚指定的配置项和数据显示图表。
					 myChart_1.setOption(option_1);
				});
			},
			////各阶段项目汇总
			eChartHZ:function(){
				var that = this;

				this.$http.get("/api/txieasyui?taskFramePN=DriverPorjet&command=getProjectNumsByOrg&colname=json_ajax&colname1={%27dataform%27:%27eui_variable_data%27,%27variable%27:%27returnJson%27}&orgID=").then(function (response) {
					var cou = []; //项目数
		 	    	var bimStage = [];//项目阶段

		 	    	for(var i=0;i<response.data.data.length;i++){
		 	    		cou.push(response.data.data[i].PJ_NUMS)
		 	    		bimStage.push(response.data.data[i].PJ_STAGE)
		 	    	}

		 			 //初始化echarts实例
					 var myChart_6 = that.$echarts.init(document.getElementById('proj_total'));
					 // 指定图表的配置项和数据
					 var option_6 = {
						 title: {
							 text: '',
							 x: 'center',
							 y: '15',
							 backgroundColor: 'rgba(0,0,0,0)',
							 borderColor: '#ccc',    // 标题边框颜色
							 borderWidth: 0,          // 标题边框线宽
							 padding: 5,              // 标题内边距
							 textStyle: {
								 fontSize: 14,
								 fontWeight: 'normal',
								 color: '#74b7e1'    // 主标题文字颜色
							 }
						 },
						 grid: {
							 left: '3%',
							 right: '4%',
							 bottom: '7%',
							 containLabel: true
						 },
						 tooltip: {
						 	 backgroundColor: '#a3d9f3',
							 textStyle:{
						        color: '#183756',
						        fontStyle: 'normal',
						        fontWeight: 'normal',
						        fontFamily: 'sans-serif',
						        fontSize: 14,
						     }
						 },
						 legend: {
							 itemWidth:10,
							 top: 5,
							 left: 'center',
							 textStyle:{color:'#89a7bf',fontSize:"14"},
							 //data: legendData
						 },
						 xAxis: {
							 data: bimStage,
							 axisLabel: {
								 show: true,
								 textStyle: {
									 color: '#93bbd4',
									 fontSize:14
								 },
								 interval:0,
								 formatter:function(value){
								 	if(value && value.length>=3){
								 		return value.substring(0,2)+"...";
								 	}else{
								 		return value;
								 	}
									
							      }
							 },
							 axisLine: {
								 lineStyle: {
									 color: '#15638a'
								 }
							 }
						 },
						 //grid: {
							// left: '9%',
							// bottom:'50%',
							// right:'20%'
						 //},
						 yAxis:[
							 {
								 type: 'value',
								 name: '（个）',
								 nameTextStyle: {
					                color: '#ecf6ff',
					                fontSize:"14"
					            },
								 axisLabel: {
									 show: true,
									 textStyle: {
										 color: '#93bbd4'
									 }
								 },
								 axisLine: {
									 lineStyle: {
										 color: '#15638a'
									 }
								 },
								  splitLine: {
						            lineStyle: {
						                type: 'dashed',
						                color: '#2c527c'
						            }
						         }
							 }
						 ],
						 series: [
							 {
								 name: '',
								 type: 'bar',
								 data: cou,
								 barWidth :20,//柱子宽度
								 //配置样式
								 itemStyle: {
									 normal: {
										 color: function (params){ //设置x轴标注的颜色
											 // var colorList = ['rgb(63,210,183)'];
											 return  ['rgb(16,148,210)'];
										 },
										 label : {show: true, position: 'top'} //设置柱状图上方显示数值大小
									 }
								 }
							 }
			
						 ]
					 };
					 // 使用刚指定的配置项和数据显示图表。
					 myChart_6.setOption(option_6);
			 	});
			},
			eChartYJHZ:function(){
				var that = this;

				this.$http.get("/api/txieasyui?taskFramePN=GovWarn&command=getGovWarn&colname=json_ajax&colname1={%27dataform%27:%27eui_variable_data%27,%27variable%27:%27returnJson%27}&orgID=&timeStramp="+this.endDataChild).then(function (response) {
					var myChart_2 = that.$echarts.init(document.getElementById('icac_statistics'));
					 // 指定图表的配置项和数据
					 var option_2 = {
						 tooltip: {
							 trigger: 'item',
							 backgroundColor: '#a3d9f3',
							 textStyle:{
						        color: '#183756',
						        fontStyle: 'normal',
						        fontWeight: 'normal',
						        fontFamily: 'sans-serif',
						        fontSize: 14,
						     },
							 formatter: "{a} {b} : {c} ({d}%)"
						 },
						 legend: {
							 orient: 'horizontal',
							 x: 'center',
							 y: '76%',
							 data:['提示','一级','','二级','三级'],
							 textStyle:{color:'#89a7bf',fontSize:"14"},
							 itemWidth:10
						 },
						 series: [
							 {
								 name:'',
								 type:'pie',
								 radius: ['30%', '40%'],
								 center : ['50%', '42%'],
								 avoidLabelOverlap: false,
								 data:[
									 {value:response.data.data[1].PROMITALL, name:'提示'},
									 {value:response.data.data[1].ONEGRADE, name:'一级'},
									 {value:response.data.data[1].TWOGRADE, name:'二级'},
									 {value:response.data.data[1].THREEGRADE, name:'三级'}
								 ],
								 itemStyle : {
									 normal: {
										 color: function (params){ //设置饼的颜色
											 var colorList = ['rgb(33,109,193)','rgb(0,174,79)','rgb(196,121,40)','rgb(211,67,67)'];
											 return colorList[params.dataIndex];
										 },
										/* label:{
											 show:true,
											 position:'inside',
											 textStyle:{color:'#e5edff',fontSize:"12"},
											 formatter: '{c}条 {d}%',
											 normal:{
												 padding: [0, -70]
											 }
										 },
										 title:{
											 text:'aaaa'
										 },
										 labelLine:{
											 lineStyle:{color:'#39759a'}
										 }*/
									 }
								 },
								 labelLine: {
						                normal: {
						                    length: 20,
						                    length2: 5,
						                    lineStyle: {
						                        color: '#39759a'
						                    }
						                }
						
						         },
								 label:{
								 	   normal: {
						                    formatter: '{c}条 \n{d}%',
						                    textStyle:{color:'#e5edff',fontSize:"12"},
						                    borderWidth: 0,
						                    borderRadius: 4,
						                    // shadowBlur:3,
						                    // shadowOffsetX: 2,
						                    // shadowOffsetY: 2,
						                    // shadowColor: '#999',
						                    padding: [0, -80]
						                }
								 }
								 
							 }
						 ]
					 };
					 // 使用刚指定的配置项和数据显示图表。
					 myChart_2.setOption(option_2);
					 
					 var myChart_3 = that.$echarts.init(document.getElementById('icac_situation'));
					 // 指定图表的配置项和数据
					 var option_3 = {
						 tooltip: {
							 trigger: 'item',
							 backgroundColor: '#a3d9f3',
							 textStyle:{
						        color: '#183756',
						        fontStyle: 'normal',
						        fontWeight: 'normal',
						        fontFamily: 'sans-serif',
						        fontSize: 14,
						     },
							 formatter: "{a} {b} : {c} ({d}%)"
						 },
						 legend: {
							 orient: 'horizontal',
							 x: 'center',
							 y: '76%',
							 data:['审批通过','审批不通过','','待处理','审批中'],
							 textStyle:{color:'#89a7bf',fontSize:"14"},
							 itemWidth:10,
							 itemGap:10
						 },
						 series: [
							 {
								 name:'',
								 type:'pie',
								 radius: ['30%', '40%'],
								 center : ['50%', '42%'],
								 avoidLabelOverlap: false,
								 data:[
									 {value:response.data.data[0].GOV_TOTAL_WARN_DONE, name:'审批通过'},
									 {value:response.data.data[0].GOV_TOTAL_WARN_NOTDONE, name:'审批不通过'},
									 {value:response.data.data[0].GOV_TOTAL_WARN_TODO, name:'待处理'},
									 {value:response.data.data[0].GOV_TOTAL_WARN_DOING, name:'审批中'}
								 ],
								 itemStyle : {
									 normal: {
										 color: function (params){ //设置饼的颜色
											 var colorList = ['rgb(0,174,83)','rgb(38,107,202)','rgb(168,72,182)','rgb(220,123,20)'];
											 return colorList[params.dataIndex];
										 }
										/* label:{
											 show:true,
											 //position:'inside',
											 textStyle:{color:'#e5edff',fontSize:"12"},
											 formatter: '{c}条 {d}%',
											 normal:{
												 padding: [0, -70]
											 }
										 },
										 labelLine:{
											 lineStyle:{color:'#39759a'}
										 }*/
									 }
								 },
								 labelLine: {
						                normal: {
						                    length: 20,
						                    length2: 10,
						                    lineStyle: {
						                        color: '#39759a'
						                    }
						                }
						
						         },
								 label:{
								 	   normal: {
						                    formatter: '{c}条 \n{d}%',
						                    padding: [0, -80],
						                    textStyle:{color:'#e5edff',fontSize:"12"}
						                }
								 }
							 }
						 ]
					 };
					 // 使用刚指定的配置项和数据显示图表。
					 myChart_3.setOption(option_3);
				});
			}
		},
		mounted() {
			//地图
			this.mapMarker();
			//图表Echart
			//年度履约评价 & 本年度质量和安全平均得分统计
			this.eChartLY();
			this.eChartHZ();
			this.eChartYJHZ();
		}
	}
</script>
<style type="text/css">
	@import "../assets/css/cabin.css";
	.search-box .el-input{
		width:auto;
	}

	.search-box .el-input__inner{
		width:300px;
		border-radius: 0;
	}
</style>