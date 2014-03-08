var app = angular.module('mentalMathJs', []);

app.controller('GameCtrl', function($scope) {
	//$scope.num = {'a': random(0, 100), 'b' : random(0, 100), 'op' : random(0,1)};
	var generateRanNum = function() {
		$scope.num = {'a': random(0, 100), 'b':random(0, 100), 'op' : random(0,1)};
		if($scope.num.op == 0) {
			$scope.operator = '+';
		} else {
			$scope.operator = '-';
		}
	}
	generateRanNum();

	$scope.checkAns = function() {
		var answer = 0;
		if($scope.op === 0) {
			var answer = $scope.num.a + $scope.num.b;
		} else {
			var answer = $scope.num.a - $scope.num.b;
		}
		if(parseInt($scope.ans) === answer) {
			$scope.result = 'Correct answer';
			generateRanNum();
			$scope.ans = '' ;
		} else {
			$scope.result = 'Incorrect anser';
		}
	};
});

var random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
 };
