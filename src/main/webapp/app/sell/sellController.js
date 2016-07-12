(function() {
	'use strict';

	angular.module('sampleApp').controller('sellController', sellController);

	sellController.$inject = [ '$scope', '$rootScope', 'device.utility','GlobalVariable','DialogFactory','modalService','RestrictedCharacter.Types','dataService','$state'];

	function sellController($scope, $rootScope, device ,GlobalVariable,DialogFactory,modalService,restrictCharacter,dataService,$state) {
		
		$scope.device = device;
		$scope.GlobalVariable = GlobalVariable;
		$scope.restrictCharacter=restrictCharacter;
		GlobalVariable.isLoginPage = false;
		
		var i=0;
		$scope.pageSize = 10;
		
		$rootScope.testData = [];
		$scope.productNames = [];
		$scope.firstNames = [];
		
		$scope.addRow = function()
		{
			
			/*$rootScope.testData.push({"itemNo":Math.round((Math.random() * 10) * 10),
				"item":"check",
				"quantity":89,
				"retail":"test",
				"discount":20,
				"total":20.00,
				"stock":5,
				"costPrice":"12.90"});
			
			$scope.loadCheckOutData();*/
			
			$state.go('product');
		};
		$scope.removeRow = function(itemNo){	
			
			GlobalVariable.itemNoToDelete = itemNo;
			modalService.showModal('', {
				isCancel : true
			}, "Are you Sure Want to Delete ? ", $scope.callBackAction);
		/*var index = -1;		
		var comArr = eval( $rootScope.testData );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].itemNo === itemNo ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$rootScope.testData.splice( index, 1 );*/		
	};
	$scope.callBackAction = function(isOKClicked)
	{
		
		if(isOKClicked)
		{
			var index = -1;		
			var comArr = eval( $rootScope.testData );
			for( var i = 0; i < comArr.length; i++ ) {
				if( comArr[i].itemNo === GlobalVariable.itemNoToDelete ) {
					index = i;
					break;
				}
			}
			if( index === -1 ) {
				alert( "Something gone wrong" );
			}
			$rootScope.testData.splice( index, 1 );
		}	
	}
	$scope.changeQuantity= function()
	{
		var searchTxt = $scope.searchValue.toString();
		if(searchTxt !== '' && searchTxt !== undefined && searchTxt.indexOf(".") !== 0 )
		{	
		if (searchTxt.match(/[a-z]/i)) {
				    console.log("contains only charcters");
				    $scope.discount =0;
				    for(var i=0;i<GlobalVariable.getProducts.length;i++)
				    {
				    	if(searchTxt === GlobalVariable.getProducts[i].description)
				    	{
				    		$rootScope.testData.push({"itemNo":GlobalVariable.getProducts[i].productId,
								"item":GlobalVariable.getProducts[i].description,
								"quantity":GlobalVariable.getProducts[i].quantity,
								"retail":GlobalVariable.getProducts[i].retailPrice,
								"discount":parseFloat($scope.discount),
								"total":(parseFloat(GlobalVariable.getProducts[i].retailPrice)-(parseFloat($scope.discount)))*parseFloat(GlobalVariable.getProducts[i].quantity),
								"stock":GlobalVariable.getProducts[i].stock,
								"costPrice":GlobalVariable.getProducts[i].costPrice});
				    	}	
				    }	
				    
				}
				else if(searchTxt.length > 5)
				{
					console.log(""+$scope.searchValue);
					$scope.discount =0;
					 for(var i=0;i<GlobalVariable.getProducts.length;i++)
					    {
					    	if(searchTxt === GlobalVariable.getProducts[i].prodcutNo)
					    	{
					    		$rootScope.testData.push({"itemNo":GlobalVariable.getProducts[i].productId,
									"item":GlobalVariable.getProducts[i].description,
									"quantity":GlobalVariable.getProducts[i].quantity,
									"retail":GlobalVariable.getProducts[i].retailPrice,
									"discount":parseFloat($scope.discount),
									"total":(parseFloat(GlobalVariable.getProducts[i].retailPrice)-(parseFloat($scope.discount)))*parseFloat(GlobalVariable.getProducts[i].quantity),
									"stock":GlobalVariable.getProducts[i].stock,
									"costPrice":GlobalVariable.getProducts[i].costPrice});
					    	}	
					    }
				}	
				else
				{
					if(searchTxt.indexOf(".") >0 )
					{
						$scope.quantity = $rootScope.testData[$rootScope.testData.length-1].quantity;
						if(parseFloat($scope.searchValue) > parseFloat(parseFloat($rootScope.testData[$rootScope.testData.length-1].retail)))
						{
							$scope.discount =0;
							$rootScope.testData[$rootScope.testData.length-1].retail = $scope.searchValue;
							
						}
						else
						{
							$scope.discount = parseFloat($rootScope.testData[$rootScope.testData.length-1].retail)-parseFloat($scope.searchValue);
						}	
						if($scope.discount == 0)
							$scope.total = (parseFloat($rootScope.testData[$rootScope.testData.length-1].retail)-$scope.discount)*parseFloat($scope.quantity);
						else
							$scope.total = ($scope.discount)*parseFloat($scope.quantity);
					}
					else
					{
						$scope.quantity = $scope.searchValue;
						if(parseFloat($rootScope.testData[$rootScope.testData.length-1].discount) == 'NaN')
						{
							$scope.discount=0
						}	
						else
						{
							$scope.discount = parseFloat($rootScope.testData[$rootScope.testData.length-1].discount);
						}
						if($scope.discount !== 0)
							{
							  $scope.total = parseFloat($scope.quantity) * parseFloat($scope.discount);
							}
						else
						$scope.total = (parseFloat($rootScope.testData[$rootScope.testData.length-1].retail)-parseFloat($scope.discount))*parseFloat($scope.quantity);
					}	
					
					$rootScope.testData.push({"itemNo":$rootScope.testData[$rootScope.testData.length-1].itemNo,
						"item":$rootScope.testData[$rootScope.testData.length-1].item,
						"quantity":$scope.quantity,
						"retail":$rootScope.testData[$rootScope.testData.length-1].retail,
						"discount":$scope.discount,
						"total":$scope.total,
						"stock":$rootScope.testData[$rootScope.testData.length-1].stock,
						"costPrice":$rootScope.testData[$rootScope.testData.length-1].costPrice});
					//for(var i=0;i<$rootScope.testData.length-1;i++)
						//{
						$scope.removeRowOnSearch($rootScope.testData[$rootScope.testData.length-2].itemNo);
						//}
				}	
				
		$scope.loadCheckOutData();
					$scope.searchValue = '';
		}
	};
	$scope.removeRowOnSearch = function(itemNo){				
		var index = -1;		
		var comArr = eval( $rootScope.testData );
		for( var i = 0; i < comArr.length; i++ ) {
			if(itemNo.toString().indexOf(".")>=0)
			{
				if( comArr[i].itemNo === itemNo ) {
					index = i;
					break;
				}
			}
			else
			{
				if( comArr[i].itemNo === itemNo ) {
					index = i;
					break;
				}
			}	
			
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$rootScope.testData.splice( index, 1 );		
	};
		$scope.openCashPopup = function()
		{
			
			var _tmPath = 'app/sell/paymentPopup.html';
			var _ctrlPath = 'paymentPopupController';
			DialogFactory.show(_tmPath, _ctrlPath, callbackPayment);
		};
		$scope.createCustomer = function()
		{
			var _tmPath = 'app/AddCustomer/addcustomer.html';
			var _ctrlPath = 'addCustomerController';
			DialogFactory.show(_tmPath, _ctrlPath, callbackPayment);
		};
		function callbackPayment()
		{
			$scope.totalQuantity = 0;
			$scope.subTotal = 0;
			$scope.productTotal = 0;
			
		}
		$scope.test = function()
		{
			console.log(""+$scope.searchValue);
		};
		$scope.loadCheckOutData = function()
		{
			$scope.totalQuantity=0;
			$scope.subTotal = 0;
			for(var i=0;i<$rootScope.testData.length;i++)
			{
				$scope.totalQuantity = parseFloat( $scope.totalQuantity) + parseFloat($rootScope.testData[i].quantity);
				$scope.subTotal = parseFloat($scope.subTotal) + parseFloat($rootScope.testData[i].total);
				
			}
			GlobalVariable.quantityTotal = $scope.totalQuantity;
			GlobalVariable.totalSub = $scope.subTotal;
			if($scope.totalDisc == undefined)
				$scope.totalDisc = 0;
			
			GlobalVariable.discountTotal = $scope.totalDisc ;
			if($scope.totalDisc == "")
				$scope.productTotalWithoutTax = Number(parseFloat( $scope.subTotal)).toFixed(2);
			else
			$scope.productTotalWithoutTax = Number(parseFloat( $scope.subTotal) - parseFloat($scope.totalDisc)).toFixed(2);
			
			
			if($scope.productTotalWithoutTax == 'NaN')
			{
				$scope.productTotalWithoutTax =0;
			}	
			
			if($scope.totalTax == undefined)
				$scope.totalTax = 0;
			
			GlobalVariable.taxTotal = parseFloat($scope.productTotalWithoutTax) * (parseFloat($scope.totalTax) / 100);
			$scope.productTotal = Number(parseFloat($scope.productTotalWithoutTax)+(((parseFloat($scope.productTotalWithoutTax) * parseFloat($scope.totalTax))) / 100 )).toFixed(2);
			 
			$rootScope.totalPayment = $scope.productTotal;
			GlobalVariable.checkOuttotal = $rootScope.totalPayment;
		}
		$scope.searchCustomer = function()
		{
			// $scope.customerPhone;
			for(var i=0;i<GlobalVariable.getCustomerDtls.length;i++)
			{
				if($scope.regPhone == GlobalVariable.getCustomerDtls[i].phoneNo)
				{
					$scope.customerNameOnSearch = GlobalVariable.getCustomerDtls[i].firstName +  ' ' +GlobalVariable.getCustomerDtls[i].lastName;
					$rootScope.customerPhone= $scope.regPhone;
				}	
				else
				{
					$rootScope.customerNameOnSearch = 'No customer found';
					$rootScope.customerPhone = $scope.regPhone;
				}	
		
			}	
			
		};
		$scope.searchCustomerByFirst = function()
		{
			for(var i=0;i<GlobalVariable.getCustomerDtls.length;i++)
			{
				if($scope.customerNameOnSearch == GlobalVariable.getCustomerDtls[i].firstName)
				{
					$scope.customerNameOnSearch = GlobalVariable.getCustomerDtls[i].firstName +  ' ' +GlobalVariable.getCustomerDtls[i].lastName;
					$rootScope.customerPhone= GlobalVariable.getCustomerDtls[i].phoneNo;
					$scope.regPhone = GlobalVariable.getCustomerDtls[i].phoneNo;
				}	
				/*else
				{
					$rootScope.customerName = 'No customer found';
					$rootScope.customerPhone = $scope.regPhone;
				}*/	
		
			}
		}
		function render()
		{
			$scope.currentPageIndexArr = 0;
			$scope.totalTax=GlobalVariable.totalTaxSetup;
			for(var i=0;i<GlobalVariable.getProducts.length;i++)
			{
				$scope.productNames.push(GlobalVariable.getProducts[i].description);
			}
			for(var i=0;i<GlobalVariable.getCustomerDtls.length;i++)
			{
				$scope.firstNames.push(GlobalVariable.getCustomerDtls[i].firstName);
			}
			$scope.loadCheckOutData();
			if(GlobalVariable.returnProduct == true)
			{	
				for(var i=0;i<GlobalVariable.getReturnDetails[0].transactionLineItemDtoList.length;i++)
				{
					$rootScope.testData.push({"itemNo":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].productId,
						"item":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].productNumber,
						"quantity":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].quantity,
						"retail":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].retail,
						"discount":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].retailWithDis,
						"total":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].totalProductPrice,
						"stock":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].quantity,
						"costPrice":GlobalVariable.getReturnDetails[0].transactionLineItemDtoList[i].cost
						});
				}	
				$scope.totalQuantity =GlobalVariable.getReturnDetails[0].transactionDtoList[0].totalQuantity;
				$scope.subTotal = GlobalVariable.getReturnDetails[0].transactionDtoList[0].subTotal;
				$scope.totalDisc =GlobalVariable.getReturnDetails[0].transactionDtoList[0].discount;
				$scope.totalTax =GlobalVariable.getReturnDetails[0].transactionDtoList[0].tax;
				$scope.productTotal= GlobalVariable.getReturnDetails[0].transactionDtoList[0].totalAmount;
				$rootScope.totalPayment =$scope.productTotal;
				$scope.returnAmount = $rootScope.totalPayment
				$scope.returnDate = GlobalVariable.getReturnDetails[0].transactionDtoList[0].transactionDate;
				$scope.returnId = GlobalVariable.getReturnDetails[0].transactionDtoList[0].transactionCompId;
				$scope.userIdReturn = GlobalVariable.getReturnDetails[0].transactionDtoList[0].userId;
				$scope.returnPhone = GlobalVariable.getReturnDetails[0].transactionDtoList[0].userId;
				$scope.returnCreditId = GlobalVariable.getReturnDetails[0].transactionDtoList[0].customerPhoneNo;
				$scope.returncashId = GlobalVariable.getReturnDetails[0].transactionDtoList[0].cashId;
				$scope.paidAmountReturn = GlobalVariable.getReturnDetails[0].transactionDtoList[0].paidAmountCash;
				$scope.paidAmountCreditReturn = GlobalVariable.getReturnDetails[0].transactionDtoList[0].paidAmountCredit;
				$scope.changeAmountReturn =GlobalVariable.getReturnDetails[0].transactionDtoList[0].changeAmount;
				$scope.creditIdReturn =GlobalVariable.getReturnDetails[0].transactionDtoList[0].creditId;
			
			}
		}
		$scope.returnProduct = function()
		{
			var msg= "Your total balance is "+-(Number(parseFloat($scope.productTotal)).toFixed(2));
			modalService.showModal('', '', msg, $scope.callBackReturnCheckout);
		};
		$scope.callBackReturnCheckout = function()
		{
			var url ="http://localhost:8080/returnTransaction";
			var request = new Object();
			request = {
				"transactionDate":$scope.returnDate,  
				"totalAmount":$scope.returnAmount,
				"tax":$scope.totalTax,
				"discount":$scope.totalDisc ,
				"customerPhoneNo":$scope.returnPhone,
				"userId":$scope.userIdReturn,
				"cashId":$scope.returncashId,
				"status":"return",
			"paidAmountCash":$scope.paidAmountReturn,
			"changeAmount":$scope.changeAmountReturn,
				"creditId":$scope.creditIdReturn,
				"paidAmountCredit":$scope.paidAmountCreditReturn,
			"transactionCompId":$scope.returnId,
			"subTotal":$scope.subTotal,
			"totalQuantity":$scope.totalQuantity

			};
			request = JSON.stringify(request);
			dataService.Post(url,request,returnTransactionSuccessHandler,returnTransactionErrorHandler,"application/json","application/json");
		};
		function returnTransactionSuccessHandler(response)
		{
			$rootScope.testData = [];
		}
		function returnTransactionErrorHandler(response)
		{
			
		}
		render();
	}
		
})();