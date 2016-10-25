angular.module('myApp3', []).controller('namesCtrl', function($scope) {
	$scope.names = [
		{name:'Jani',country:'Norway'},
		{name:'Hege',country:'Sweden'},
		{name:'Kai',country:'Denmark'}
	];
});
angular.bootstrap(document.getElementsByTagName('div')[3],['myApp3']);