var app = angular.module('app');


app.controller('LandingController', 
function($routeParams, $cookieStore, $rootScope, $scope, $compile) {
	init();

	function init() {
		checkKey();

		testData($scope);

		$scope.addChart = addChart;
	};


	function addChart(type) {
		var div;
		switch(type) {
			case "bar":
				//div = $('<bar-chart data="barData"></bar-chart>');
				div = $compile( '<bar-chart data="barData"></bar-chart>' )( $scope );
				break;
			case "scatter":
				div = $compile( '<scatter height="450" data="scatterData"></scatter>' )( $scope );
				break;

			case "line":
				div = $compile( '<time-series smooth="true" data="staticTimeSeriesData" y-label="Total" recentdata=""></time-series>' )( $scope );
				break;
			default:
				return;
		}

		$("#workspace").append(div);
	};


	function testData($scope) {
		$scope.barData = {
			'group1': [
				{ name: "Bob", score: 10 },
				{ name: "Joe", score: 3 }
			]
			, 'group2': [
				{ name: "Bob", score: -2 },
				{ name: "Joe", score: 7 },
				{ name: "Jane", score: 4 },
				{ name: "Henry", score: -5 },
				{ name: "Ford", score: 10 }
			]
			,'group3': [
				{ name: "Bob", score: 8 },
				{ name: "Joe", score: 1 },
				{ name: "Jill", score: 4 },
			]
		};

		var BAND = 10;
		$scope.scatterData = [
	      {label: "dunno", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND, score: 3},

	      {label: "yes", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND, score: 12},
	      {label: "yes", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND, score: 23},
	      {label: "yes", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND},
	      {label: "yes", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND},

	      {label: "no", x:  -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND},
	      {label: "no", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND},
	      {label: "no", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND},
	      {label: "no", x:  -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND},
	      {label: "no", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND},

	      {label: "maybe", x:  -BAND + Math.random()*2*BAND, y :  -BAND + Math.random()*2*BAND, score: 10},
	      {label: "maybe", x: -BAND + Math.random()*2*BAND, y : -BAND + Math.random()*2*BAND, score: -5}
	    ];

	  
	    $scope.timeSeriesRecentData = {};
      	$scope.staticTimeSeriesData = {
        	"cows": [],
        	"chickens": []
      	};
      	for (k in $scope.staticTimeSeriesData) {
        	for (var i=0; i<20; i++) {
          		$scope.staticTimeSeriesData[k].push(-BAND + Math.random()*2*BAND);
      	  	}
      	}
	};


	function showAlert(type, msg) {
		if (!type) return;

		if (!msg) {
			switch(type) {
				case "danger":
					msg = "Something went wrong";
					break;
				case "warning":
					msg = "Warning";
					break;
				case "success":
					msg = "Successful";
					break;
				default:
					"";
			}
		}

		var select = ".alert-" + type;
		var spot = $(select);
		spot.html(msg);
		spot.slideDown();
		setTimeout(function() {
			spot.slideUp();
		}, 3000);

	};

	// check if there's an api key in the url
	// if any store it and clear from url
	function checkKey() {
		var key = $routeParams.key;
		if (!key || key===undefined) return showAlert('warning', 'You do not seem to have an API key');

		$cookieStore.put("key", key);
		$rootScope.setHttpBasicHeaders();
		// clear params in url
		//$location.url("/");
		//$location.search('key', null);
	};
});