var isLocal = /^file\:\/\/\//i.test(location.href);

$(function() {
	(function() {
	    $(window).scroll(function() {
	        if ($(window).scrollTop() <= 19) {
	            if ($(".header").hasClass("min")) {
	                $(".header").removeClass("min");
	            }
	        } else {
	            if (!$(".header").hasClass("min")) {
	                $(".header").addClass("min");
	            }

	        }
	    }).scroll();
	})(); //scroll header
    (function() {
        var sid = null;
        $(".bagboxlink").mouseenter(function() {
            if (sid !== null) {
                clearTimeout(sid);
            }
            $(".bagbox").show();
        }).mouseleave(function() {
            sid = setTimeout(function() {
                $(".bagbox").hide();
            }, 100);
        });
        $(".bagbox").mouseenter(function() {
            if (sid !== null) {
                clearTimeout(sid);
            }
            $(".bagbox").show();
        }).mouseleave(function() {
            sid = setTimeout(function() {
                $(".bagbox").hide();
            }, 100);
        });
    })(); //bagbox show hide
    (function() {
        var data={UserId: "",IsLogin: false};
        function getData(data) {
            if (data !== null && data.IsLogin) {
                $(".loginlogout").attr("href", "../common/loginout.aspx").text("會員登出");
            }
        }
        if (isLocal) {
            getData(data);
        } else {
            $.getJSON("../Common/LoginStatus.ashx",function(data){
                getData(data);
            }); 
        }
    })(); //login
});