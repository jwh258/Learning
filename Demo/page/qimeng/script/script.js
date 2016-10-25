$(function() {
	//导航栏
	function navShow(LI) {$(LI).children("div").css("display","block")};
	function navHide(LI) {$(LI).children("div").css("display","none")};
	$(".nav .clearfix>li:has(div)").mouseover(function (){navShow(this)});//选子集要注意 ">"
	$(".nav .clearfix>li:has(div)").mouseout(function (){navHide(this)});

	//导航栏下方3个点击变换
	// $(document).ready(function() {$(".banner_top_list li:eq(0)").addClass("main_tup_list_hov");});//这两行一个效果啊？
	$(".banner_top_list li:eq(0)").addClass("banner_top_list_hov");//这两行一个效果啊？
	function changeBg(thisObj){$(thisObj).addClass("banner_top_list_hov").siblings(".banner_top_list li").removeAttr("class")};
	$(".banner_top_list li").click(function (){changeBg(this);});

	//main_tdown左右切换
    var
    index = 0,
    Swidth = 996;

    function NextPage() {
    	if(index>2)
			{
				index = 0 ;
			}
        $(".banner_bottom_cut ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)//animate是动画内置参数
    }
    function PrevPage() {
    	if(index<0)
			{
				index = 2 ;
			}
        $(".banner_bottom_cut ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)
    }

    $(".banner_bottom_right").click(function() {
        index++;
        NextPage();
    });
    $(".banner_bottom_left").click(function() {
        index--;
        PrevPage();
    });

	//news轮播
	var iShow = 1;
	var changeTime = 4000;//自动播放时间

	function showDilde() {
		$(".news_con_list2_con li:eq(" + iShow + ")").fadeIn(1000).siblings(".news_con_list2_con li").fadeOut(1000);
		$(".news_con_list2_btn a:eq(" + iShow + ")").addClass("btn_a_hov").siblings(".news_con_list2_btn a").removeClass("btn_a_hov");
		iShow = iShow + 1;
		if (iShow == $(".news_con_list2_btn_a").length) {
			iShow = 0;
		}
	}
	$(function() {
		for(var i=0;i<3;i++){
			$(".news_con_list2_btn a:eq("+i+")").attr({num:i,class:"news_con_list2_btn_a"});
		}
		jQuery(".news_con_list2_con li").hide();//多加一行初始了刷新后的图片
		jQuery(".news_con_list2_con li:eq(0)").show();
		jQuery(".news_con_list2_btn a:eq(0)").addClass("btn_a_hov");
		setInterval(showDilde, changeTime);//自动播放循环带入渐隐
		$(".news_con_list2_btn a").click(function() {
			iShow = parseInt($(this).attr("num"));//转为数字
			$(".news_con_list2_con li:eq(" + iShow + ")").fadeIn().siblings(".news_con_list2_con li").fadeOut();
			$(".news_con_list2_btn a:eq(" + iShow + ")").addClass("btn_a_hov").siblings(".news_con_list2_btn a").removeClass("btn_a_hov");
		});
	});
})
