angular.module('myApp2', []).controller('personCtrl', function ($scope) {
	$scope.firstName = "John",
	$scope.lastName = "Doe",
	$scope.fullName = function () {
		return $scope.firstName + " " + $scope.lastName;
	}
});
angular.bootstrap(document.getElementsByTagName('div')[2], ['myApp2']);