//lunbo左右切换 jQuery
$(function() {
	var index = 0,
		Swidth = 996;

	function NextPage() {
		if(index>2)
		{
			index = 0 ;
		}
		$(".lunbo_in ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)//animate是动画内置参数
	}
	function PrevPage() {
		if(index<0)
		{
			index = 2 ;
		}
		$(".lunbo_in ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)
	}

	$(".goleft").click(function() {
		index++;
		NextPage();
	});
	$(".goright").click(function() {
		index--;
		PrevPage();
	});
})