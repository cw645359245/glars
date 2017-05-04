$(function(){
	var aSwiper = new Swiper('.banner-index',{
        loop:true,
        autoplay:4000,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,

    })
	
	var mySwiper = new Swiper('.pro-list',{
		 autoHeight: true,
		onSlideChangeEnd:function(){
			$(".pro-title li").eq(mySwiper.activeIndex).addClass("active").siblings().removeClass("active");
		}
	})
	$(".pro-title li").click(function(){
		var index = $(this).index();
		console.log(index)
		$(this).addClass("active").siblings().removeClass("active");
		mySwiper.slideTo(index);
	})
	
	// 返回顶部
function getScroll(roll_top){
 var obj = document.getElementById("roll_top");
 console.log(obj)
 var timer = null;
 positionFixed(obj);
 if(obj){
 	obj.style.transition="all 0.5s"
 obj.style.opacity =0;
 window.onscroll=function(){
  getScrollTop() > 0 ? obj.style.opacity = "1" : obj.style.opacity = "0";
 }
 obj.onclick=function(){
  var timer = setInterval(sMove,10);
  function sMove(){
  setScrollTop(getScrollTop() / 1.5);
  if(getScrollTop() < 1)clearInterval(timer);
  }
 } 
 }
}
//判断IE6
function positionFixed(obj){
 var iE6 = !-[1,] && !window.XMLHttpRequest;
 if(obj){
     var top = obj.offsetTop;
 if(iE6){
  document.documentElement.style.textOverflow = "ellipsis";
  obj.style.position = "absolute";
  obj.style.setExpression("top", "eval(documentElement.scrollTop + " + top + ') + "px"');
 }
 }
}
//获取滚动条Top
function getScrollTop(){
 return document.documentElement.scrollTop || document.body.scrollTop;
}
//回到顶部
function setScrollTop(value){
 document.documentElement.scrollTop = value;
 document.body.scrollTop = value;
}
window.onload = function(){
 getScroll('#roll_top');
};
	
	
	
})



// 放大镜下面轮播

$(function () {
    if ($(".proviewbox").length) {
        var page = 0;
        var $ul = $(".ul_prothumb"), $li = $(".ul_prothumb li");
        var $liL = $li.length;
        var $bigShowBox = $(".probigshow");
        var str = '<div class="zoomplepopup"></div><div id="probig_preview" ><img  alt="" /></div>';
        $bigShowBox.append(str);

        var $pre = $("#probig_preview");
        var $preimg = $(".probigshow");
        var $zoom = $(".probigshow .zoomplepopup");
        var $link = $('#a_enlarge').attr('href');
        var $SPage = Math.floor($liL / 4), sLong = $li.width() * 4;
        var sto;

        function btnStyle() {
            if (page == 0) { $('.span_prev').addClass('span_prevb'); } else { $('.span_prev').removeClass('span_prevb'); }
            if (page == $SPage) { $('.span_next').addClass('span_nextb'); } else { $('.span_next').removeClass('span_nextb'); }
        };

        if (page < 1) {
            var _src = $(".a_probigshow:first").attr("ref");
            $preimg.attr("src", _src);
        } else {
            $preimg.attr("src", $li.find("a").attr("href"));
        }
        btnStyle();
        //$li.overOnlyClass("now");
        $('#a_enlarge').attr('href', $link + '#' + '0');

        $(".span_prev").click(function () {
            if (page > 0) { page--; $(".ul_prothumb").animate({ left: "+=" + sLong }); };
            btnStyle();
        });
        $(".span_next").click(function () {
            if (page < $SPage) { page++; $(".ul_prothumb").animate({ left: "-=" + sLong }); };
            btnStyle();
        });
        window.lichange = function (indx) {
            var obj = $li.eq(indx);
            if (typeof (OBJ_TITLE) != "undefined") {
                $preimg.find("img").attr({ "src": (obj.find("a").attr("href")), "title": OBJ_TITLE });
                $preimg.find("a").attr({ "href": (obj.find("a").attr("href")), "title": OBJ_TITLE });
            } else {
                $preimg.find("img").attr("src",(obj.find("a").attr("href")));
                $preimg.find("a").attr("href", (obj.find("a").attr("href")));
            }

            $(".a_probigshow img").attr("src", obj.find("img").attr("longdesc"));
            $('#a_enlarge').attr('href', $link + '#' + indx);
            $li.removeClass('now').eq(indx).addClass('now');
        }
        $li.mouseenter(function () {
            var indx = $li.index($(this));
            sto = setTimeout('lichange(' + indx + ')', 150);
        }).mouseleave(function () {
            clearTimeout(sto);
        }).click(function () {
            var indx = $li.index($(this)); lichange(indx);
            return false;
        });
    };
});
// 放大镜

 $(function(){
            $("#show").simpleZoom({

                                                zoomBox : "#zoom",

                                                markSize : [150, 150],

                                                zoomSize : [650, 400],

                                                zoomImg : [800, 800]

                                        });

                                

                                });

                                

                                ;(function($){

                                        $.fn.simpleZoom = function(options){

                                                var defs = {

                                                        zoomBox : "#zoomBox",                        //需要放大的区域

                                                        markSize : [200, 100],                        //放大镜宽高

                                                        zoomSize : [540, 540],                        //需要放大的区域宽高

                                                        zoomImg : [800, 800]                        //需要放大的区域的图片的宽高

                                                };

                                                var opt = $.fn.extend({}, defs, options);

                                                return this.each(function(){

                                                        var markBox = $(this);

                                                        var zoomBox = $(opt.zoomBox);

                                                        var zoom_img = $(opt.zoomBox).find("img"); 

                                                        var markBoxSize = [markBox.width(), markBox.height(), markBox.offset().left, markBox.offset().top];

                                                        var markSize = opt.markSize;

                                                        var zoomSize = opt.zoomSize;

                                                        var zoomImg = opt.zoomImg;

                                                        var mark_ele = "<i id='mark'></i>";

                                                        var mark_css = {position:"absolute", top:0, left:0, width:markSize[0]+"px", height:markSize[1]+"px", backgroundColor:"#000", opacity:.5, filter:"alpha(opacity=50)",  display:"none", cursor:"crosshair"};

                                                        

                                                        var show_w = markBoxSize[0]-markSize[0];

                                                        var show_h = markBoxSize[1]-markSize[1];

                                

                                                        //created mark element and add cascading style sheets

                                                        zoomBox.css({width:zoomSize[0]+"px", height:zoomSize[1]+"px"});

                                                        markBox.append(mark_ele);

                                                        $("#mark").css(mark_css);

                                

                                                        markBox.mouseover(function(){

                                                                $("#mark").show();

                                                                zoomBox.show();

                                                        }).mouseout(function(){

                                                                $("#mark").hide();

                                                                zoomBox.hide();

                                                        }).mousemove(function(e){

                                                                var l = e.pageX-markBoxSize[2]-(markSize[0]/2);

                                                                var t = e.pageY-markBoxSize[3]-(markSize[1]/2);

                                                                if(l < 0){

                                                                        l = 0;

                                                                }else if(l > show_w){

                                                                        l = show_w;

                                                                }

                                                                if(t < 0){

                                                                        t = 0;

                                                                }else if(t > show_h){

                                                                        t = show_h;

                                                                }

                                

                                                                $("#mark").css({left:l+"px", top:t+"px"});

                                                                

                                                                var z_x = -(l/show_w)*(zoomImg[0]-zoomSize[0]);

                                                                var z_y = -(t/show_h)*(zoomImg[1]-zoomSize[1]);

                                                                zoom_img.css({left:z_x+"px", top:z_y+"px"});

                                                        });

                                                });

                                        }

                                })(jQuery);

                                
                
