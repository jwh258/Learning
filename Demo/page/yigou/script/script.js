$(function() {
	//广告轮播
	var iShow = 1,//页数
		changeTime = 4000;//自动播放时间

	function show() {
		$(".bannerCenterImgLists ul li:eq(" + iShow + ")").fadeIn(1000).siblings(".bannerCenterImgLists ul li").fadeOut(1000);
		$(".bannerCenterLinkLists ul li:eq(" + iShow + ")").addClass("bannerCenterLinkListsLiHover").siblings(".bannerCenterLinkLists ul li").removeClass("bannerCenterLinkListsLiHover");
		iShow = iShow + 1;
		if (iShow == $(".bannerX").length) {
			iShow = 0;
		}
	}
	$(function() {
		for(var i=0;i<$(".bannerCenterImgLists ul li").length;i++){
			$(".bannerCenterLinkLists li:eq("+i+")").attr({num:i,class:"bannerX"});
		}
		$(".bannerCenterImgLists ul li:eq(0)").show().siblings(".bannerCenterImgLists ul li").hide();//初始化刷新后的第一张图片
		$(".bannerCenterLinkLists ul li:eq(0)").addClass("bannerCenterLinkListsLiHover");
		setInterval(show, changeTime);//自动播放循环带入渐隐
		$(".bannerCenterLinkLists ul li a").click(function() {
			iShow = parseInt($(this).parent().attr("num"));//获取父框体属性(这是一个文本，需要转为数字)
			$(".bannerCenterImgLists ul li:eq(" + iShow + ")").fadeIn().siblings(".bannerCenterImgLists ul li").fadeOut();
			$(this).parent().addClass("bannerCenterLinkListsLiHover").siblings($(this).parent().parent().children()).removeClass("bannerCenterLinkListsLiHover");
		});
	});
})