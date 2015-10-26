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
});