(function() {
	'use strict';

	angular.module('sampleApp').controller('clockPopupController', clockPopupController);

	clockPopupController.$inject = [ '$scope', '$rootScope', 'device.utility','GlobalVariable','DialogFactory','modalService','dataService','$state','RestrictedCharacter.Types','GlobalConstants'];

	function clockPopupController($scope, $rootScope, device ,GlobalVariable,DialogFactory,modalService,dataService,$state,restrictCharacter,GlobalConstants)
	{

		$scope.clockdata = [];
		$scope.maxDate = new Date();
		$scope.minDate = new Date();;
		function loadHistoryData()
		{
			var url =GlobalConstants.URLCONSTANTS+'getUserClockIn?username='+GlobalVariable.usernameCust;
			dataService.Get(url,geClockHistorySuccessHandler,getClockHistroyErrorHandler,"application/json","application/json");
			
		}
		$scope.openStartCalendar = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.openStart = true;
		};
		$scope.onDateSelected = function(startDate, endDate, label, element) {
			var receiptIndex = element.attr('data-receipt-index');
			element.find('span').eq(0).html(endDate.format('yyyy-MM-dd'));
		};
		function geClockHistorySuccessHandler(response)
		{
			$scope.getClockHistory = response;
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
				var total = "$"+Number(8*hours).toFixed(2);
				$scope.clockdata.push({
					"clockInId": response[i].clockInId,
					"username": response[i].username,
					"clockInTime": response[i].clockInTime,
					"clockOutTime": response[i].clockOutTime,
					"noOfhours": hours,
					"hrlyRate": rate,
					"total":total
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
			loadHistoryData();
		};
		function render()
		{
			loadHistoryData();
		}
		render();
	}
		
})();