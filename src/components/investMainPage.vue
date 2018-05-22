<template>
	<div class="investment-first">
		<div class="invest-time">
			<div class="module-title" style="margin-top: 6px;">
				<!--时间控件公共组件-->
				<timeEnd @end-data="endDataParent" @get-init-date="initDateParent"></timeEnd>
			</div>
			<div class="invest-content">
				<div class="bids-content">
					<!--tab切换公共组件-->
					<dataTabParent :getDataTab='dataTabType' @get-index="getIndexParent"></dataTabParent>
					<div class="bids-year-count bids-nowyear-count" style="height:191px;width:51.3%;">
						<div class="bids-year-count-title">
							<img src="../assets/img/total-situation.png" />
							<span class="yearSelectV">{{endDataYear}}</span>年01-
							<i class="monthSelectV">{{endDataMonth}}</i>月汇总
						</div>
						<div class="bids-year-content payfor">
							<div class="bids-panel">
								<div class="bids-finished">完成投资</div>
								<div class="bid-nums">
									<span id="nowyear-finished-v">{{INVEST_YRLMONEY}}</span>
									<i id="INVEST_YRLMONEYTYPE">{{INVEST_YRLMONEYTYPE}}</i></div>
							</div>
							<div class="bids-middle bids-middle-1" style="width:38%;">
								<div class="bids-middle-content" style="margin-bottom:48px;">年累计划投资 : 
									<span id="nowyear-calcu-v">{{INVEST_YlPLMONEY}}</span>
									<i id="INVEST_YlPLMONEYTYPE">{{INVEST_YlPLMONEYTYPE}}</i>
								</div>
								<div class="bids-middle-content">年累完成率 : 
									<span id="nowyear-calcu-rate-v">{{INVEST_YlRATE}}</span>
								</div>
							</div>
							<div class="bids-middle bids-middle-2" style="width:auto;border:0;">
								<div class="bids-middle-content" style="margin-bottom:48px;">年度计划投资 : 
									<span id="nowyear-plan-v">{{INVEST_YPLMONEY}}</span>
									<i id="INVEST_YPLMONEYTYPE">{{INVEST_YPLMONEYTYPE}}</i>
								</div>
								<div class="bids-middle-content">年度完成率 : 
									<span id="nowyear-plan-r">{{INVEST_YRATE}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="bids-year-count bids-month-count" style="width:34.4%;">
						<div class="bids-year-count-title">
							<img src="../assets/img/month-sum.png" />
							<i class="monthSelectV">{{endDataMonth}}</i>月汇总
						</div>
						<div class="bids-year-content">
							<div class="bids-panel payfor">
								<div class="bids-finished">完成投资</div>
								<div class="bid-nums">
									<span id="m-finished-v">{{INVEST_MRLMONEY}}</span>
									<i id="INVEST_MRLMONEYTYPE">{{INVEST_MRLMONEYTYPE}}</i>
								</div>
							</div>
							<div class="bids-middle bids-middle-1" style="width:auto;border:0;margin-left:30px;">
								<div class="bids-middle-content" style="margin-bottom:48px;">计划投资 : 
									<span id="m-plan-v">{{INVEST_MPLMONEY}}</span>
									<i id="INVEST_MPLMONEYTYPE">{{INVEST_MPLMONEYTYPE}}</i>
								</div>
								<div class="bids-middle-content">月度完成率 : 
									<span id="m-t-rate">{{INVEST_MRATE}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="invest-charts">
					<div class="invest-left-c">
						<div class="invest-month-finished" style="position:relative;">
							<div class="invest-month-title">
								<span style="margin-right:0;" class="yearSelectV"></span>年每月投资完成情况
							</div>
							<div class="charts-invest-top" id="invest-charts"></div>
						</div>
						<table class="invest-table">
							<thead>
								<th></th>
								<th>合计</th>
								<th>1月</th>
								<th>2月</th>
								<th>3月</th>
								<th>4月</th>
								<th>5月</th>
								<th>6月</th>
								<th>7月</th>
								<th>8月</th>
								<th>9月</th>
								<th>10月</th>
								<th>11月</th>
								<th>12月</th>
							</thead>
							<tbody>
								<tr>
									<td>计划</td>
									<td v-for="(value,index) in rawData">
										{{value.PLAN_AMOUNT}}<span v-if="(index == 0)">亿元</span>
									</td>
								</tr>
								<tr>
									<td>实际</td>
									<td v-for="(value,index) in rawData">
										{{value.REAL_AMOUNT}}<span v-if="(index == 0)">亿元</span>
									</td>
								</tr>
								<tr>
									<td>完成率</td>
									<td v-for="(value,index) in rawData">
										{{value.INVEST_RATE}}<span>%</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="invest-right-c" style="border:0;">
						<div class="investment-chart-box">
							<div class="invest-month-title">
								<span class="yearSelectV"></span>年01-<i class="monthSelectV"></i>月投资金额分布
							</div>
							<div style="height:239px;" id="contracts_chart_1"></div>
							<div class="middle-tip middle-tip_1">计划<div class="unit-money">（万元）</div></div>
							<div class="middle-tip middle-tip_2">完成<div class="unit-money">（万元）</div></div>
						</div>
						<div style="border: 1px solid #063666;">
							<div class="invest-month-title" id="comp-sub-page">
								<span class="rankChild" @click="changePath">
									<span>项目投资排行榜</span>
									<span class="more-info"></span>
								</span>
								<div class="select-container" id="invest-select-container">
									<div class="select-style" :class="{'selected-active-c':isYearRankList}" @click="tabList">
										<em class="yearSelectV"></em>年累
										<span :class="{'selected-active':isYearRankList}"></span>
									</div>
									<div class="select-style" :class="{'selected-active-c':!isYearRankList}" @click="tabList">
										<em class="monthSelectV"></em>月
										<span :class="{'selected-active':!isYearRankList}"></span>
									</div>
								</div>
							</div>
							<div class="sub-title">
								<span>项目名称</span>
								<div class="sub-title-right">
									<div class="sub-title-box" id="money-ranking">
										完成投资（万元）
										<span class="sort-img"></span>
									</div>
									<div class="sub-title-box" id="plan-ranking">
										计划完成率
										<span class="sort-img-rate"></span>
									</div>
								</div>
							</div>
							<div class="rank-list-c">
								<table class="rank-list">
									<tr v-for="(value,index) in rankList">
										<td class="first-td">{{index+1}}、</td>
										<td class="second-td" :title="value.PRONAME">{{value.PRONAME}}</td>
										<td class="third-td">{{value.REAL_AMOUNT}}</td>
										<td class="forth-td">{{value.INVEST_RATE}}</td>
									</tr>
								</table>
								<img class="no-data no-data1" src="../assets/img/no-data.png" style="left:36%;top:29%;" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import timeEnd from '../components/timeEnd.vue'
import dataTabParent from '../components/dataTab.vue'

export default{
	components:{
		timeEnd:timeEnd,
		dataTabParent:dataTabParent
	},
	data:function(){
		return{
			endData:'',
			dataTabNum:'',
			endDataYear:'',
			endDataMonth:'',
			dataTabType:['汇总','房建类','市政类','其他类'],
			INVEST_YRLMONEY:'',
			INVEST_YlPLMONEY:'',
			INVEST_YlRATE:'',
			INVEST_YPLMONEY:'',
			INVEST_YRATE:'',
			INVEST_MRLMONEY:'',
			INVEST_MPLMONEY:'',
			INVEST_MRATE:'',
			INVEST_YRLMONEYTYPE:'',
			INVEST_YlPLMONEYTYPE:'',
			INVEST_YPLMONEYTYPE:'',
			INVEST_MRLMONEYTYPE:'',
			INVEST_MPLMONEYTYPE:'',
			rawData:'',
			rankList:'',
			isYearRankList:1
		}
	},
	watch:{
		endData:function(){
			this.getTabDetailData();
			this.getEchart();
			this.getYearAndMonth();
			this.getEchartRight();
			this.getRankList();
		}
	},
	methods:{
		endDataParent:function(endData){
			this.endData = endData;
		},
		initDateParent:function(data){
			this.endData = data;
		},
		getYearAndMonth:function(){
			var arr = this.endData.split("-");
			this.endDataYear = arr[0];
			this.endDataMonth = arr[1];
		},
		getIndexParent:function(type){
			this.dataTabNum = type;
			this.getTabDetailData();
			this.getEchart();
		},
		getTabDetailData:function(){
			var that = this;
			this.$http.get('/api/txieasyui?taskFramePN=InvestSummary&command=getInvestOfDateCount&colname=json&colname1=%7B%27dataform%27:%27eui_form_data%27%7D&timeStramp='+that.endData+'&orgID=&projType='+that.dataTabNum).then(function(data){
				that.INVEST_YRLMONEY = data.data.data.INVEST_YRLMONEY;
				that.INVEST_YlPLMONEY = data.data.data.INVEST_YlPLMONEY;
				that.INVEST_YlRATE = data.data.data.INVEST_YlRATE;
				that.INVEST_YPLMONEY = data.data.data.INVEST_YPLMONEY;
				that.INVEST_YRATE = data.data.data.INVEST_YRATE;
				that.INVEST_MRLMONEY = data.data.data.INVEST_MRLMONEY;
				that.INVEST_MPLMONEY = data.data.data.INVEST_MPLMONEY;
				that.INVEST_MRATE = data.data.data.INVEST_MRATE;

				if(data.data.data.INVEST_YRLMONEYTYPE == 1){  //单位
					that.INVEST_YRLMONEYTYPE = "亿元";
				}else if(data.data.data.INVEST_YRLMONEYTYPE == 2){
					that.data.data.INVEST_YRLMONEYTYPE = "万元";
				}else if(data.data.data.INVEST_YRLMONEYTYPE == 3){
					that.data.data.INVEST_YRLMONEYTYPE = "元";
				}

				if(data.data.data.INVEST_YlPLMONEYTYPE == 1){  //单位
					that.INVEST_YlPLMONEYTYPE = "亿元";
				}else if(data.data.data.INVEST_YlPLMONEYTYPE == 2){
					that.INVEST_YlPLMONEYTYPE = "万元";
				}else if(data.data.data.INVEST_YlPLMONEYTYPE == 3){
					that.INVEST_YlPLMONEYTYPE = "元";
				}

				if(data.data.data.INVEST_YPLMONEYTYPE == 1){  //单位
					that.INVEST_YPLMONEYTYPE = "亿元";
				}else if(data.data.data.INVEST_YPLMONEYTYPE == 2){
					that.INVEST_YPLMONEYTYPE = "万元";
				}else if(data.data.data.INVEST_YPLMONEYTYPE == 3){
					that.INVEST_YPLMONEYTYPE = "元";
				}

				if(data.data.data.INVEST_MRLMONEYTYPE == 1){  //单位
					that.INVEST_MRLMONEYTYPE = "亿元";
				}else if(data.data.data.INVEST_MRLMONEYTYPE == 2){
					that.INVEST_MRLMONEYTYPE = "万元";
				}else if(data.data.data.INVEST_MRLMONEYTYPE == 3){
					that.INVEST_MRLMONEYTYPE = "元";
				}

				if(data.data.data.INVEST_MPLMONEYTYPE == 1){  //单位
					that.INVEST_MPLMONEYTYPE = "亿元";
				}else if(data.data.data.INVEST_MPLMONEYTYPE == 2){
					that.INVEST_MPLMONEYTYPE = "万元";
				}else if(data.data.data.INVEST_MPLMONEYTYPE == 3){
					that.INVEST_MPLMONEYTYPE = "元";
				}
			})
		},
		getEchart:function(){
			var that = this;
 	        this.$http.get("/api/txieasyui?taskFramePN=InvestMonthly&command=rankInvestMonthly&colname=json_ajax&colname1={'dataform':'eui_form_data'}",{params:{'orgID':'','timeStramp':that.endData,'projType':that.dataTabNum}}).then(function(data){
 	        	var myChart_7 = that.$echarts.init(document.getElementById('invest-charts'));
				 // 指定图表的配置项和数据
				var option_7 = {
				    tooltip: {
				        trigger: 'axis',
				        backgroundColor: '#a3d9f3',
						textStyle:{
					        color: '#183756',
					        fontStyle: 'normal',
					        fontWeight: 'normal',
					        fontFamily: 'sans-serif',
					        fontSize: 14,
					    },
				        axisPointer: {
				            crossStyle: {
				                color: '#999'
				            }
				        }
					},
					legend: {
						itemWidth:10,
						top: 395,
						left: 'center',
						data: ["计划完成投资金额","实际完成投资金额","实际完成投资率"],
						textStyle:{color:'#89a7bf',fontSize:"14"},
						itemGap:40
					},
					xAxis: {
						data:[
								data.data.data.inMonths[1]+"月",
							  	data.data.data.inMonths[2]+"月",
							  	data.data.data.inMonths[3]+"月",
							  	data.data.data.inMonths[4]+"月",
							 	data.data.data.inMonths[5]+"月",
							  	data.data.data.inMonths[6]+"月",
							  	data.data.data.inMonths[7]+"月",
							  	data.data.data.inMonths[8]+"月",
							  	data.data.data.inMonths[9]+"月",
							  	data.data.data.inMonths[10]+"月",
							  	data.data.data.inMonths[11]+"月",
							  	data.data.data.inMonths[12]+"月"
							],
						axisLabel:{
							show: true,
							textStyle: {
								color: '#93bbd4',
								fontSize:14
							},
							interval:0
						},
						axisLine: {
							lineStyle: {
								color: '#15638a'
							}
						}
					},
					yAxis:[
						{
							type: 'value',
							name: '（万元）',
							nameTextStyle: {
				                color: '#ecf6ff',
				                fontSize:"14"
				            },
							axisLabel: {
								show: true,
								textStyle: {
									color: '#93bbd4'
								},
								formatter: '{value}'
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
						},
						{
							type: 'value',
							name: '（完成率）',
							nameTextStyle: {
				                color: '#ecf6ff',
				                fontSize:"14"
				            },
							axisLabel: {
								show: true,
								interval: 'auto',  
                                formatter: '{value} %',
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
							name: '计划完成投资金额',
							type: 'bar',
							data: [
								       data.data.data.planAmts[1],
									   data.data.data.planAmts[2],   
									   data.data.data.planAmts[3],
									   data.data.data.planAmts[4],   
									   data.data.data.planAmts[5],
									   data.data.data.planAmts[6],   
									   data.data.data.planAmts[7],
									   data.data.data.planAmts[8],   
									   data.data.data.planAmts[9],
									   data.data.data.planAmts[10],   
									   data.data.data.planAmts[11],
									   data.data.data.planAmts[12]
								],
							barWidth :13,//柱子宽度
							 //配置样式
							itemStyle: {
								normal: {
									color: function (params){ //设置x轴标注的颜色
										return  ['rgb(27,186,102)'];
									}
								}
							}
						},
						{
							name: '实际完成投资金额',
							type: 'bar',
							data: [
									   data.data.data.realAmts[1],
									   data.data.data.realAmts[2],
									   data.data.data.realAmts[3],
									   data.data.data.realAmts[4],
									   data.data.data.realAmts[5],
									   data.data.data.realAmts[6],
									   data.data.data.realAmts[7],
									   data.data.data.realAmts[8],
									   data.data.data.realAmts[9],
									   data.data.data.realAmts[10],
									   data.data.data.realAmts[11],
									   data.data.data.realAmts[12]
								],
							barWidth :13,//柱子宽度
							 //配置样式
							itemStyle: {
								normal: {
									color: function (params){ //设置x轴标注的颜
										return  ['rgb(16,148,210)'];
									}
								}
							}
						},
						{
							name:'实际完成投资率',
							type:'line',
							yAxisIndex:1,
							symbol:'circle',//拐点样式
							symbolSize: 10,//拐点大小
							data:[
									data.data.data.inRates[1],
								    data.data.data.inRates[2],
								    data.data.data.inRates[3],
								    data.data.data.inRates[4],
								    data.data.data.inRates[5],
								    data.data.data.inRates[6],
								    data.data.data.inRates[7],
								    data.data.data.inRates[8],
								    data.data.data.inRates[9],
								    data.data.data.inRates[10],
								    data.data.data.inRates[11],
								    data.data.data.inRates[12]
							    ],
							itemStyle : {
								normal : {
									color:"#d79d1f",
									lineStyle:{
									 	width:3,
										color:"#d79d1f",
									}
	                     		}
	                  		}
		         		},
					]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart_7.setOption(option_7);

				that.rawData = data.data.data.rawData;
 	        });
		},
		getEchartRight:function(){
			var that = this;
 	        this.$http.get("/api/txieasyui?taskFramePN=IndexInvestment&command=getInvestmentDepts&colname=json_ajax&colname1={%27dataform%27:%27eui_variable_data%27,%27variable%27:%27returnJson%27}",{params:{'timeStramp':that.endData,'projType':that.dataTabNum}}).then(function(data){
 	        	var zzcount; //住宅工程管理站
				var tdcount; //土地投资开发中心
				var gccount; //工程管理中心
				var zzcount2, tdcount2, gccount2 = 0;

 	        	if(data.data.data.length == 0){
					zzcount = 0;
					tdcount = 0;
					gccount = 0;
					zzcount2 = 0;
					tdcount2 = 0;
					gccount2 = 0;
					
				}

				for(var i=0;i<data.data.data.length;i++){
					if(data.data.data[i].DEPT == "住宅工程管理站"){  //住宅工程管理站
						zzcount = data.data.data[i].WCMONEY;
						zzcount2 = data.data.data[i].JHMONEY
					}else if(data.data.data[i].DEPT == "土地投资开发中心"){  //土地投资开发中心
						tdcount = data.data.data[i].WCMONEY;
						tdcount2 = data.data.data[i].JHMONEY
					}else if(data.data.data[i].DEPT == "工程管理中心"){  //工程管理中心
						gccount = data.data.data[i].WCMONEY;
						gccount2 = data.data.data[i].JHMONEY;
					}
				}

				var myChart_1 = that.$echarts.init(document.getElementById('contracts_chart_1'));
					 // 指定图表的配置项和数据
				var option_1 = {
					tooltip: {
					 	trigger: 'item',
					 	backgroundColor: '#a3d9f3',
						textStyle:{
					        color: '#183756',
					        fontStyle: 'normal',
					        fontWeight: 'normal',
					        fontFamily: 'sans-serif',
					        fontSize: "14",
					    },
						formatter: "{a}{b} : {c} ({d}%)"
				    },
					legend: {
						orient: 'horizontal',
						x: '2%',
						y: '28%',
						data:['工程管理中心','','土地投资开发中心','','住宅工程管理站'],
						textStyle:{color:'#89a7bf',fontSize:"14"},
						itemWidth:10,
						itemGap:25
					},
					series: [
						{
							name:'',
							type:'pie',
							radius: ['40%', '49%'],
							center : ['50%', '50%'],
							data:[
							    {value:gccount2, name:"工程管理中心"},
								{value:tdcount2, name:"土地投资开发中心"},
								{value:zzcount2, name:"住宅工程管理站"}
							],
							itemStyle : {
								normal: {
									color: function (params){ //设置饼的颜色
										var colorList = ['rgb(23,87,161)','rgb(186,76,77)','rgb(175,131,58)','rgb(18,137,73)'];
										return colorList[params.dataIndex];
									},
									label:{
										show:false, //是否显示饼图提示信息
										position:'inside',
										textStyle:{color:'#e5edff',fontSize:"14"}
									},
									title:{
										text:'aaaa'
									},
									labelLine:{
										lineStyle:{color:'#39759a'}
									}
								}
							}
						},
						{
							name:'',
							type:'pie',
							radius: ['40%', '49%'],
							center : ['84%', '50%'],
						    data:[
							    {value:gccount, name:"工程管理中心"},
								{value:tdcount, name:"土地投资开发中心"},
								{value:zzcount, name:"住宅工程管理站"}
							],
							itemStyle : {
								normal: {
									color: function (params){ //设置饼的颜色
										var colorList = ['rgb(23,87,161)','rgb(186,76,77)','rgb(175,131,58)','rgb(18,137,73)'];
										return colorList[params.dataIndex];
									},
									label:{
										show:false, //是否显示饼图提示信息
										position:'inside',
										textStyle:{color:'#e5edff',fontSize:"14"}
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
				 myChart_1.setOption(option_1);
 	        })
		},
		getRankList:function(){
			var that = this;
 	        this.$http.get("/api/txieasyui?taskFramePN=InvestProject&command=rankInvestProject&colname=json_ajax&colname1=%7B%27dataform%27:%27eui_form_data%27%7D",{params:{'orgID':'','timeStramp':that.endData,'projType':that.dataTabNum,'isYear':that.isYearRankList,'sort':'inRate','order':'desc'}}).then(function(data){

 	        	that.rankList = data.data.data;
 	        });
		},
		tabList:function(){
			if(this.isYearRankList == 1){
				this.isYearRankList = 0;
			}else{
				this.isYearRankList = 1;
			}

			this.getRankList();
		},
		changePath:function(){
			this.$router.push({path:'/invest/investRankList'});
		}
	}
}
</script>
<style type="text/css">
	
</style>