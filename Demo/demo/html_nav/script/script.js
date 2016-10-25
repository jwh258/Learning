$(function() {
	//导航栏
	function navShow(LI) {$(LI).children("div").css("display","block")};
	function navHide(LI) {$(LI).children("div").css("display","none")};
	$(".nav .clearfix>li:has(div)").mouseover(function (){navShow(this)});//选子集要注意 ">"
	$(".nav .clearfix>li:has(div)").mouseout(function (){navHide(this)});
})
