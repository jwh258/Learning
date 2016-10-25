$(function() {
//广告轮播
	var iShow = 1,
		changeTime = 4000;//自动播放时间

	function show() {
		$(".news ul li:eq(" + iShow + ")").fadeIn(1000).siblings(".news ul li").fadeOut(1000);
		$(".news_btn a:eq(" + iShow + ")").addClass("btn_hover").siblings(".news_btn a").removeClass("btn_hover");
		iShow = iShow + 1;
		if (iShow == $(".news_x").length) {
			iShow = 0;
		}
	}
	$(function() {
		for(var i=0;i<3;i++){
			$(".news_btn a:eq("+i+")").attr({num:i,class:"news_x"});
		}
		$(".news ul li:eq(0)").show().siblings(".news ul li").hide();//初始化刷新后的第一张图片
		$(".news_btn a:eq(0)").addClass("btn_hover");
		setInterval(show, changeTime);//自动播放循环带入渐隐
		$(".news_btn a").click(function() {
			iShow = parseInt($(this).attr("num"));//转为数字
			$(".news ul li:eq(" + iShow + ")").fadeIn().siblings(".news ul li").fadeOut();
			$(".news_btn a:eq(" + iShow + ")").addClass("btn_hover").siblings(".news_btn a").removeClass("btn_hover");
		});
	});
})
