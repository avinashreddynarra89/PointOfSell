(function() {
	'use strict';

	angular.module('sampleApp').controller('clockPopupController', clockPopupController);

	clockPopupController.$inject = [ '$scope', '$rootScope', 'device.utility','GlobalVariable','DialogFactory','modalService','dataService','$state','RestrictedCharacter.Types','GlobalConstants','$filter'];

	function clockPopupController($scope, $rootScope, device ,GlobalVariable,DialogFactory,modalService,dataService,$state,restrictCharacter,GlobalConstants,$filter)
	{

		$scope.clockdata = [];
		$scope.maxDate = new Date();
		$scope.minDate = new Date();
		$scope.loadclockinDtls=function(saleDate)
		{
			var url;
			var start,end;

			if(saleDate=='todaySales')
			{
				start = getCurrentDay();
				end = getCurrentDay();
			}
			else if(saleDate == 'yestSales')
			{

				start = getPreviousDay();
				end = getPreviousDay();
			}
			else if(saleDate == 'lastWeekSales')
			{

				start = getLast7Day();
				end = getCurrentDay();
			}
			else if(saleDate == 'thisMonthSales')
			{

				start = getcurrentYear()+"-"+getcurrentMonth()+"-01";
				end = getcurrentYear()+"-"+getcurrentMonth()+"-31";
			}
			else if(saleDate == 'lastMonthSales')
			{

				start = getcurrentYear()+"-"+getlastMonth()+"-01";
				end = getcurrentYear()+"-"+getlastMonth()+"-31";
			}
			else if(saleDate == 'last3MonthsSales')
			{

				start = getlast3Months();
				end = getCurrentDay();
			}
			else if(saleDate == 'last6MonthsSales')
			{

				start = getlast6Months();
				end = getCurrentDay();
			}
			else if(saleDate == 'thisYearSales')
			{

				var years = getCurrentandPreviousYear().split("-");
				start =years[0]+"-01-01";
				end =years[0]+"-12-31";
			}
			else if(saleDate == 'lastYearSales')
			{

				var years = getCurrentandPreviousYear().split("-");
				start =years[1]+"-01-01";
				end =years[1]+"-12-31";
			}
			else
			{

				start = $filter('date')($scope.startTransDate, "yyyy-MM-dd");
				end = $filter('date')($scope.endTransDate, "yyyy-MM-dd");
			}
			loadHistoryData(start,end);
		};
		function loadHistoryData(start,end)
		{
			/*var start = getcurrentYear()+"-"+getcurrentMonth()+"-01 00:00:00";
			var end = getcurrentYear()+"-"+getcurrentMonth()+"-31 23:59:59";*/
			var url =GlobalConstants.URLCONSTANTS+'getUserClockInForSetup?username='+sessionStorage.userLoggedName+'&startDate='+start+'&endDate='+end;
			dataService.Get(url,geClockHistorySuccessHandler,getClockHistroyErrorHandler,"application/json","application/json");
			
		}
		$scope.maxDate = new Date();
		$scope.minDate = moment().subtract(1, "days").toDate();
		$scope.openStartCalendar = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.openStart = true;
		};
		$scope.openStartCalendarDaily = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.openStartDaily = true;
		};
		$scope.openEndCalendar = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.openEnd = true;
		};
		$scope.onDateSelected = function(startDate, endDate, label, element) {
			var receiptIndex = element.attr('data-receipt-index');
			element.find('span').eq(0).html(endDate.format('yyyy-MM-dd'));
		};
		$scope.applySalesByTypeClck = function(type)
		{

			$scope.loadclockinDtls(type);
		};
		function geClockHistorySuccessHandler(response)
		{
			$scope.getClockHistory = response;
			$scope.clockdata = [];
			for(var i=0;i<response.length;i++)
			{
				var date1 = new Date(response[i].clockInTime);
				var date2 = new Date(response[i].clockOutTime);
			/*	var time1 = date1.getTime(date1);
				var time2 = date2.getTime(date2);
				var time3 = time1-time2;*/
				var hours = Number(Math.abs(date1 - date2) / 36e5).toFixed(2);
				//var hours = new Date(time3);
				/*var noOfHrs = hours.getHours()-1;*/
				var rate = "$8";
				var total = parseFloat(8*hours)+parseFloat(response[i].userCommission);
				var totalWCom= "$"+parseFloat(Number(total).toFixed(2));
				$scope.clockdata.push({
					"clockInId": response[i].clockInId,
					"username": response[i].username,
					"clockInTime": response[i].clockInTime,
					"clockOutTime": response[i].clockOutTime,
					"noOfhours": hours,
					"hrlyRate": rate,
					"total":totalWCom,
					"date":response[i].date,
					"userCommission":response[i].userCommission
				});
			}
			
		}
		$scope.barLimit = 100;
		$scope.increaseLimit = function () {
			$scope.barLimit += 50;
			console.log('Increase Bar Limit', $scope.barLimit)
		};
		function getClockHistroyErrorHandler(response)
		{
			
		}
		$scope.editClockIn = function(row)
		{
			GlobalVariable.editClockDtls = row;
			var _tmPath = 'app/Setup/editClockInDetails.html';
			var _ctrlPath = 'EditClockController';
			DialogFactory.show(_tmPath, _ctrlPath, $scope.callBackEditClockDtls);
		};
		$scope.callBackEditClockDtls = function()
		{
			$scope.loadclockinDtls('thisMonthSales');
		};
		function render()
		{
			$scope.dateRangeOptions = {
				// startDate : moment(),
				showDropdowns : true,
				format : 'yyyy-MM-dd',
				singleDatePicker : true
			};
			$scope.clckType='todaySales';

			$scope.loadclockinDtls('todaySales');
		}
		function getPreviousDay () {
			var now = new Date();
			now.setDate(now.getDate() - 1);
			var year = "" + now.getFullYear();
			var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
			var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
			var  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
			var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
			var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
			return year + "-" + month + "-" + day ;

		}
		function getLast7Day () {
			var now = new Date();
			now.setDate(now.getDate() - 7);
			var year = "" + now.getFullYear();
			var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
			var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
			var  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
			var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
			var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
			return year + "-" + month + "-" + day ;

		}
		function getlast6Months () {
			var now = new Date();
			var year = "" + now.getFullYear();
			var month = "" + (now.getMonth() - 5); if (month.length == 1) { month = "0" + month; }
			var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
			var  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
			var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
			var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
			return year + "-" + month + "-" + day ;

		}
		function getlast3Months () {
			var now = new Date();
			var year = "" + now.getFullYear();
			var month = "" + (now.getMonth() - 2); if (month.length == 1) { month = "0" + month; }
			var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
			var  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
			var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
			var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
			return year + "-" + month + "-" + day ;

		}
		function getlastMonth()
		{
			var now = new Date();
			var year = "" + now.getFullYear();
			var month = "" + (now.getMonth()); if (month.length == 1) { month = "0" + month; }

			return month ;
		}
		function getcurrentMonth()
		{
			var now = new Date();
			var year = "" + now.getFullYear();
			var month = "" + (now.getMonth()+1); if (month.length == 1) { month = "0" + month; }

			return month ;
		}
		function getcurrentYear () {
			var now = new Date();
			var year = "" + now.getFullYear();

			return year;
		}
		function getCurrentandPreviousYear () {
			var now = new Date();
			var year = "" + now.getFullYear();
			var prevoiusYear = now.getFullYear()-1;

			return year + "-" + prevoiusYear;
		}
		function getCurrentMonth()
		{
			var now = new Date();
			var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
			var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
			var  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
			var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
			var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }

			return month;
		}
		function getCurrentDay () {
			var now = new Date();
			var year = "" + now.getFullYear();
			var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
			var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
			var  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
			var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
			var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
			return year + "-" + month + "-" + day;
		}

		render();
	}
		
})();