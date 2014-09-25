var app = angular.module('app');


app.controller('LandingController', 
function($routeParams, $cookieStore, $rootScope, $scope) {
	init();

	function init() {
		checkKey();

		$scope.test = {
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