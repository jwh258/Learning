/**
 * 这里是书籍列表模块
 * @type {[type]}
 */
var bookListModule = angular.module("BookListModule", []);
bookListModule.controller('BookListCtrl', function ($scope, $http, $state, $stateParams) {
	$scope.filterOptions = {
		filterText: "",
		useExternalFilter: true
	};
	$scope.totalServerItems = 0;
	$scope.pagingOptions = {
		pageSizes: [5, 10, 20],
		pageSize: 5,
		currentPage: 1
	};
	$scope.setPagingData = function (data, page, pageSize) {
		var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
		$scope.books = pagedData;
		$scope.totalServerItems = data.length;
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	};
	//这里可以根据路由上传递过来的bookType参数加载不同的数据
	console.log($stateParams);
	$scope.getPagedDataAsync = function (pageSize, page, searchText) {
		setTimeout(function () {
			var data;
			if (searchText) {
				var ft = searchText.toLowerCase();
				$http.get('data/books' + $stateParams.bookType + '.json')
				.success(function (largeLoad) {
					data = largeLoad.filter(function (item) {
						return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
					});
					$scope.setPagingData(data, page, pageSize);
				});
			} else {
				$http.get('data/books' + $stateParams.bookType + '.json')
				.success(function (largeLoad) {
					$scope.setPagingData(largeLoad, page, pageSize);
				});
			}
		}, 100);
	};
	$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	$scope.$watch('pagingOptions', function (newVal, oldVal) {
		if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		}
	}, true);
	$scope.$watch('filterOptions', function (newVal, oldVal) {
		if (newVal !== oldVal) {
			$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		}
	}, true);
	$scope.gridOptions = {
		data: 'books',
		rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
		'<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
		'<div ng-cell></div>' +
		'</div></div>',
		multiSelect: false,
		enableCellSelection: true,
		enableRowSelection: false,
		enableCellEdit: true,
		enablePinning: true,
		columnDefs: [{
			field: 'index',
			displayName: '序号',
			width: 60,
			pinnable: false,
			sortable: false
		}, {
			field: 'name',
			displayName: '书名',
			enableCellEdit: true
		}, {
			field: 'author',
			displayName: '作者',
			enableCellEdit: true,
			width: 220
		}, {
			field: 'pubTime',
			displayName: '出版日期',
			enableCellEdit: true,
			width: 120
		}, {
			field: 'price',
			displayName: '定价',
			enableCellEdit: true,
			width: 120,
			cellFilter: 'currency:"￥"'
		}, {
			field: 'bookId',
			displayName: '操作',
			enableCellEdit: false,
			sortable: false,
			pinnable: false,
			cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field),bookType:$stateParams.bookType})" id="{{row.getProperty(col.field)}}">详情</a></div>'
		}],
		enablePaging: true,
		showFooter: true,
		totalServerItems: 'totalServerItems',
		pagingOptions: $scope.pagingOptions,
		filterOptions: $scope.filterOptions
	};
});
/**
 * 这里是书籍详情模块
 * @type {[type]}
 */

// var bookDetailModule = angular.module("BookDetailModule", []);
// bookDetailModule.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {
// 	console.log($stateParams);
// 	//请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
//
// });
var bookDetailModule = angular.module("BookDetailModule", []);
bookDetailModule.controller('BookDetailCtrl', function ($scope, $http, $state, $stateParams) {
	// console.log($stateParams.bookType);
	// console.log($stateParams.bookId);
	var type = $stateParams.bookType;
	var id = $stateParams.bookId;
	$http.get('data/books' + (type) + '.json')
	.success(function (response) {
		// allData = response;
		// data1 = response.filter(function(item) {
		// 	return JSON.stringify(item).toLowerCase();
		// });
		data = response[(id - 1)];
		$scope.data = data;
	});
});
/*学习笔记*/
//步骤1 在app.js中修改
// .state('bookdetail', {
//     url: '/bookdetail/{bookType:[0-9]{1,4}}/:bookId',
//这样页面变为：bookdetail/页数/ID  这样的结构
//
//步骤2 在本文件ui-grid设置中修改
//cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field),bookType:$stateParams.bookType})" id="{{row.getProperty(col.field)}}">详情</a></div>'
//ui-sref是传递参数的  原来只传ID  加入bookType后传递2个参数
//这样 在bookDetailModule中可以使用bookType这个参数获取指定文件了
//注：上面代码中  response 是json文件的所有对象 所以要获取其中第X个对象
var bookAddModule = angular.module("BookAddModule", []);
bookAddModule.controller('BookAddCtrl', function ($scope, $log, $filter) {
	$scope.bookInfo = {};
	$scope.bookInfo.result = function () {
		$log.debug("新添加书籍信息如下：");
		$scope.bookInfo.date = $filter("date")($scope.bookInfo.date,'yyyy-MM-dd');//日期格式化
		var eBook = "";//这个不定义也行 下面判断会创建
		if($scope.bookInfo.EBook == true){
			eBook = "有";
		}else{
			eBook = "无";
		}
		$log.debug($scope.bookInfo);
		$log.debug($scope.bookInfo.date);
		$log.debug($scope.bookInfo.name);
		$log.debug($scope.bookInfo.type);
		$log.debug($scope.bookInfo.auther);
		$log.debug($scope.bookInfo.EBook);
		alert("新添加书籍信息如下：\n" + "书籍名称："+$scope.bookInfo.name + "\n" + "书籍类型："+ $scope.bookInfo.type + "\n" + "出版日期：" + $scope.bookInfo.date + "\n" + "书籍作者："+ $scope.bookInfo.auther + "\n" + "是否有电子书："+ eBook)
	};
});
/*学习笔记*/
// 1.先在app.js中添加模块BookAddModule
//
// 2.在html文件中写好样式
//     maxlength="20" 最大长度
//     required 必填项
//     ng-disabled="form.$invalid"检查前面选项是否填完
//
// 3.在本文件中补充代码
//     定义$scope.bookInfo = {};这个对象  这样ng-modele里面的东西就有效了
//     在chrome中日期需要格式化
//     在ff中日期必须按规定日期填写
//     本程序并没有写判断表达式
//
// 后面传递数据也暂时没做
//
// 4.补充reset() 未做
//
//注意：在alert()之后 出版日期会重置回空 导致按钮不能按