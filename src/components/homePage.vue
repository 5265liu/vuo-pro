<template>
	<div id="index" class="cabinIndex">
		<div class="content">
		    <div class="overview">
		    	<div class="module_1">
		    		<timeEnd @end-data="endDataParent"></timeEnd>
		    		<div class="module-content">
		    			<div class="content_1">
		    				<div>项目总数1</div>
		    				<div class="module-num">
		    					<span id="proj-all">{{projAll}}</span>个
		    				</div>
		    			</div>
		    			<div class="content_1">
		    				<div>前期项目</div>
		    				<div class="module-num">
		    					<span id="proj-before">{{projBefore}}</span>个
		    				</div>
		    			</div>
		    			<div class="content_1">
		    				<div>在建项目</div>
		    				<div class="module-num">
		    					<span id="proj-on">{{projOn}}</span>个
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    	<div class="module_2">
		    		<div class="module-title">
                        <img class="left_logo" src="../assets/img/investment.png" />
		    			<span>投资</span>
		    		</div>
		    		<div class="module-content">
						<div class="box">
                            <div class="box-title">
                            	<span class="monthSelect">{{choseMonth}}</span>月完成
                            	<i class="yuan" id="invest-month">{{investMonth}}</i>
                            	<i id="INVEST_MONEYMTYPE">{{investMonthUnit}}</i>
                            </div>
							<div class="ok">
								<div class="ok-title">月完成率</div>
								<div class="ok-rate">
									<span id="invest-month-rate">{{investMonthRate}}</span>
								</div>
                            </div>
							<div class="tbox">
								<el-progress :percentage="investMonthPer" :stroke-width="12" :show-text="false"></el-progress>
							</div>
						</div>
						<div class="box">
							<div class="box-title">
								<span class="yearSelect">{{choseYear}}</span>年完成
								<i class="year-yuan" id="invest-year">{{investYear}}</i>
								<i id="INVEST_MONEYYTYPE">{{investYearUnit}}</i>
							</div>
							<div class="ok">
								<div class="ok-title">年完成率</div>
								<div class="ok-rate">
									<span id="invest-year-rate">{{investYearRate}}</span>
								</div>
							</div>
							<div class="tbox">
								<el-progress :percentage="investYearPer" :show-text="false" :stroke-width="12" ></el-progress>
							</div>
						</div>
		    		</div>
		    	</div>
		    	<div class="module_2">
		    		<div class="module-title">
						<img class="left_logo" src="../assets/img/pay.png" />
		    			<span>支付</span>
		    		</div>
		    		<div class="module-content">
						<div class="box">
							<div class="box-title module2_box_title">
								<span class="monthSelect">{{choseMonth}}</span>月完成
								<i class="yuan" id="pay-month">{{payMonthMoney}}</i>
								<i id="PAY_MONTHTYPE">{{payMonthMoneyUnit}}</i>
							</div>
                            <div class="box-title module2_box_title">
                            	<span class="yearSelect">{{choseYear}}</span>年完成<i class="yuan" id="pay-year">{{payYearMoney}}</i>
                            	<i id="PAY_YEARTYPE">{{payYearMoneyUnit}}</i>
                            </div>
                            <div class="box-title module2_box_title">汇总完成
                            	<i class="yuan" id="pay-total">{{payTotalMoney}}</i>
                            	<i id="PAY_TOTLETYPE">{{payTotalMoneyUnit}}</i>
                            </div>
							<div class="ok">
								<div class="ok-title">整体支付进度</div>
							</div>
							<div class="tbox payfor">
								<el-progress :percentage="payRate" :stroke-width="12" :show-text="false"></el-progress>
							</div>
						</div>
		    		</div>
		    	</div>
		    	<div class="module_2 module_3">
		    		<div class="module-title">
                        <img class="left_logo" src="../assets/img/bidding.png" />
		    			<span>招投标</span>
		    		</div>
		    		<div class="module-content">
						<div class="box">
							<div class="box-title">
								<span class="monthSelect">{{choseMonth}}</span>月完成
							</div>
							<div class="ok last-two">
								<div class="ok-title">招标额
                                     <span class="yuan" id="bidding-month">{{tenderAmoutMonthRate}}</span>
                                     <i id="BIDDING_MONEYMTYPE">{{BIDDING_MONEYMTYPE}}</i>
                                </div>
                                <div class="ok-rate">招标数
                                     <span class="yuan" id="biddingnum-month">{{tenderAmoutMonthNum}}</span>
                                     <i>个</i>
                                </div>
							</div>
						</div>
						<div class="box">
							<div class="box-title">
								<span class="yearSelect">{{choseYear}}</span>年完成
							</div>
							<div class="ok last-two">
								<div class="ok-title">招标额
									<span class="yuan" id="bidding-year">{{tenderAmoutYearRate}}</span>
									<i id="BIDDING_MONEYYTYPE">{{BIDDING_MONEYYTYPE}}</i>
								</div>
								<div class="ok-rate">招标数
									<span class="yuan" id="biddingnum-year">{{tenderAmoutYearNum}}</span>
									<i>个</i>
								</div>
							</div>
						</div>
		    		</div>
		    	</div>
		    	<div class="module_2 module_3">
		    		<div class="module-title">
                        <img class="left_logo" src="../assets/img/contract.png" />
		    			<span>合同</span>
					</div>
		    		<div class="module-content">
						<div class="box">
							<div class="box-title">
								<span class="monthSelect">{{choseMonth}}</span>月完成
							</div>
							<div class="ok last-two">
								<div class="ok-title">合同额
									<span class="yuan" id="contract-month">{{monthContractRate}}</span>
									<i id="CONTRACT_MONEYMTYPE">{{CONTRACT_MONEYMTYPE}}</i>
								</div>
								<div class="ok-rate">合同数
									<span class="yuan" id="contractnum-month">{{monthContractNum}}</span>
									<i>个</i>
								</div>
							</div>
						</div>
						<div class="box">
							<div class="box-title">
								<span class="yearSelect">{{choseYear}}</span>年完成
							</div>
							<div class="ok last-two">
								<div class="ok-title">合同额
									<span class="yuan" id="contract-year">{{yearContractRate}}</span>
									<i id="CONTRACT_MONEYYTYPE">{{CONTRACT_MONEYYTYPE}}</i>
								</div>
								<div class="ok-rate">合同数
									<span class="yuan" id="contractnum-year">{{yearContractNum}}</span>
									<i>个</i>
								</div>
							</div>
						</div>
			    	</div>
			    </div>
			</div>
			<homePageEchart :choseYearChild="choseYear" :choseMonthChild="choseMonth" :endDataChild="endData"></homePageEchart>
		</div>
	</div>
</template>
<script type="text/javascript">
	
	import homePageEchart from '../components/homePageEchart.vue'
	import timeEnd from '../components/timeEnd.vue'

	export default{
		components:{
			homePageEchart:homePageEchart,
			timeEnd:timeEnd
		},
		data:function(){
			return{
		        endData:'',
		        projAll:'',
		        projBefore:'',
		        projOn:'',
		        choseMonth:'',          //选择的月份
		        choseYear:'',			//选择的年份
		        monthContractRate:'',  //月合同额
		        monthContractNum:'',  //月合同个数
		        yearContractRate:'',  //年合同额
		        yearContractNum:'',		//年合同数
		        CONTRACT_MONEYMTYPE:'',  //月合同额单位
		        CONTRACT_MONEYYTYPE:'',  //年合同额单位
		        investMonth:'',          //投资月完成
		        investYear:'',          //投资年完成
		        investMonthRate:'',          //投资月完成率
		        investYearRate:'',          //投资年完成率
		        investMonthPer:0,          //投资月完成进度条
		        investYearPer:0,             //投资年完成进度条
		        payMonthMoney:'',              //支付月完成
		        payYearMoney:'',               //支付年完成
		        payTotalMoney:'',               //汇总完成
		        payRate:0,                     //整体支付进度
		        tenderAmoutYearNum:'',         //招标个数年
		        tenderAmoutMonthNum:'',         //招标个数月
		        tenderAmoutMonthRate:'',         //招标额年
		        tenderAmoutYearRate:'',         //招标额年
		        BIDDING_MONEYYTYPE:'',           //招投标单位年
		        BIDDING_MONEYMTYPE:'',           //招投标单位月
		        investYearUnit:'',                //投资年完成单位
		        investMonthUnit:'',                //投资月完成单位
		        payMonthMoneyUnit:'',              //支付月完成单位
		        payYearMoneyUnit:'',              //支付年完成单位
		        payTotalMoneyUnit:''              //支付总完成单位
		        
			}
		},
		created(){
			this.getNowMonth();
			this.getHeaderSelData();
		},
		watch:{
			endData:function(){
				this.getHeaderSelData();
			}
		},
		methods:{
			//当前日期
			getNowMonth:function(){
				 var date = new Date;
				 var year = date.getFullYear(); 
				 var month = date.getMonth()+1;
				 if(month < 10){
				 	month = '0' + month;
				 }else{
				 	month = month;
				 }
				 this.endData = year + '-' + month;  
				 this.choseMonth = month;
				 this.choseYear = year;
			},
			getHeaderSelData:function(){
				var that = this;
				var data = this.endData;
				var urlContent = '/api/txieasyui?taskFramePN=ProjectInfoCount&command=getPVariousStatistics&colname=json&colname1=%7B%27dataform%27:%27eui_form_data%27%7D&timeStramp='+data+'&orgID=';

				var urlOtherHeader = '/api/txieasyui?taskFramePN=ProjectInfoCount&command=getPayAndInvest&colname=json&colname1=%7B%27dataform%27:%27eui_form_data%27%7D&timeStramp='+data+'&orgID=';

				this.$http.get(urlContent).then(function (response) {
					that.projAll = response.data.data.PRJ_ALL; //项目总数
					that.projBefore = response.data.data.PRJ_BEF; //前期项目
					that.projOn = response.data.data.PRJ_ON; //前期项目
					that.monthContractRate = response.data.data.CONTRACT_MONEYM;   //月合同额
					that.monthContractNum = response.data.data.CONTRACT_TOTLEM;   //月合同数
					that.yearContractRate = response.data.data.CONTRACT_MONEYY;   //年合同额
					that.yearContractNum = response.data.data.CONTRACT_TOTLEY;   //年合同数

					that.tenderAmoutMonthRate = response.data.data.BIDDING_MONEYM;
					that.tenderAmoutMonthNum = response.data.data.BIDDING_TOTLEM;
					that.tenderAmoutYearRate = response.data.data.BIDDING_MONEYY;
					that.tenderAmoutYearNum = response.data.data.BIDDING_TOTLEY;

					that.CONTRACT_MONEYMTYPE = that.unit(response.data.data.CONTRACT_MONEYMTYPE);

					that.CONTRACT_MONEYYTYPE = that.unit(response.data.data.CONTRACT_MONEYYTYPE);

					that.BIDDING_MONEYMTYPE = that.unit(response.data.data.BIDDING_MONEYMTYPE);

					that.BIDDING_MONEYYTYPE = that.unit(response.data.data.BIDDING_MONEYYTYPE);
				}).catch(function (response) {
				    console.log(response);
				});

				this.$http.get(urlOtherHeader).then(function (response) {
					that.investMonth = response.data.data.INVEST_MONEYM;
					that.investMonthRate = response.data.data.INVEST_RATEM;
					that.investYear = response.data.data.INVEST_MONEYY;
					that.investYearRate = response.data.data.INVEST_RATEY;
					that.investMonthPer = parseFloat(response.data.data.INVEST_RATEM.replace("%","")); //投资月完成率

					that.investYearPer = parseFloat(response.data.data.INVEST_RATEY.replace("%","")); //投资年完成率

					that.payMonthMoney = response.data.data.PAY_MONTH;
					that.payYearMoney = response.data.data.PAY_YEAR;
					that.payTotalMoney = response.data.data.PAY_TOTLE;
					that.payRate = parseFloat(response.data.data.PAY_RATE.replace("%",""));

					that.investMonthUnit = that.unit(response.data.data.INVEST_MONEYMTYPE);

					that.investYearUnit = that.unit(response.data.data.INVEST_MONEYYTYPE);

					that.payMonthMoneyUnit = that.unit(response.data.data.PAY_MONTHTYPE);

					that.payYearMoneyUnit = that.unit(response.data.data.PAY_YEARTYPE);

					that.payTotalMoneyUnit = that.unit(response.data.data.PAY_TOTLETYPE);
				}).catch(function (response) {
				    console.log(response);
				});
			},
			//单位封装
			unit:function(obj){
				//console.log(objW);
				var objUnit = "";
				if(obj == 1){  //单位
					objUnit = "亿元";
				}else if(obj == 2){
					objUnit = "万元";
				}else if(obj == 3){
					objUnit = "元";
				}

				return objUnit;
			},
			endDataParent:function(endData){
				this.endData = endData;
			}
		}
	}
</script>
<style type="text/css">
</style>