(function($) {
    $.fn.removeStyle = function(property) {
        if (typeof property === "string" && property.length > 0) {
            var style = this.attr("style") || "";
            style = style.split(";");
            var newStyle = [];
            for (var i = 0, max = style.length; i < max; i++) {
                if (style[i].split(":")[0].indexOf(property) === -1) {
                    newStyle.push(style[i]);
                }
            }
            this.attr("style", newStyle.join(";"));
        }
        return this;
    };
})(jQuery); //removeStyle plug-in
var isLocal = /^file\:\/\/\//i.test(location.href);
function showMoment($selector, effectTime, delayTime) {
    var originHeight = $selector.height(),
        time = effectTime || 400,
        delay = delayTime || 2000;
    console.log(originHeight);
    $selector.show().css({
        "height": 0,
        "min-height": 0,
        "overflow": "hidden"
    }).animate({
        "height": originHeight,
        "min-height": originHeight
    }, time).delay(delay).animate({
        "height": 0,
        "min-height": 0
    }, time, function() {
        $(this).removeAttr("style");
    });
}
function showMomentShoppingCart() {
    alert("加入購物車完成！");
    initShoppingCart(function() {
        showMoment($(".bagbox"));
    });
}
function initShoppingCart(callback) {
    var cartlist = [{
        "MerNo": "SBSS017",
        "MerNo1": "BSS017",
        "MerName": "ELMO條紋短T",
        "Color": "74丈青",
        "Size": "S",
        "Price": 350,
        "Num": 1,
        "PhotoSmPath": "http://www.caco.url.tw/caco/PD/BSS017_260_2.jpg",
        "ColorPhotoPath": "http://www.caco.url.tw/caco/COLOR/BSS01774.jpg"
    }, {
        "MerNo": "SBCA071",
        "MerNo1": "BCA071",
        "MerName": "雪花鬚邊牛仔短褲",
        "Color": "70淺藍",
        "Size": "M",
        "Price": 550,
        "Num": 1,
        "PhotoSmPath": "http://www.caco.url.tw/caco/PD/BCA071_260_1.jpg",
        "ColorPhotoPath": "http://www.caco.url.tw/caco/COLOR/BCA07170.jpg"
    }, {
        "MerNo": "SBNA006",
        "MerNo1": "BNA006",
        "MerName": "潑漆破壞牛仔短褲‧情侶款(女)",
        "Color": "70淺藍",
        "Size": "M",
        "Price": 680,
        "Num": 1,
        "PhotoSmPath": "http://www.caco.url.tw/caco/PD/BNA006_260_1.jpg",
        "ColorPhotoPath": "http://www.caco.url.tw/caco/COLOR/BNA00670.jpg"
    }, {
        "MerNo": "SBSS013",
        "MerNo1": "BSS013",
        "MerName": "MIT 拼接數字ELMO背心‧情侶款(女)",
        "Color": "34紅色",
        "Size": "F",
        "Price": 350,
        "Num": 1,
        "PhotoSmPath": "http://www.caco.url.tw/caco/PD/BSS013_260_1.jpg",
        "ColorPhotoPath": "http://www.caco.url.tw/caco/COLOR/BSS01334.jpg"
    }];

    function getdata(cartlist) {
        var html = "";
        var count = 0;
        var total = 0;
        try {
            if (cartlist[0].MerName) {
                for (var i = 0, max = cartlist.length; i < max; i++) {
                    html += "<tr>";
                    html += "<td width=\"34\" class=\"end\" align=\"center\"><img src=\"" + cartlist[i].PhotoSmPath + "\" height=\"25\"></td>";
                    html += "<td>" + cartlist[i].MerName + "</td>";
                    html += "<td width=\"34\" align=\"center\"><img title=\"" + cartlist[i].Color + "\" src=\"" + cartlist[i].ColorPhotoPath + "\"></td>";
                    html += "<td width=\"44\" align=\"center\">" + cartlist[i].Size + "</td>";
                    html += "<td width=\"44\" align=\"center\">" + cartlist[i].Price + "</td>";
                    html += "<td width=\"34\" class=\"end\" align=\"center\">" + cartlist[i].Num + "</td>";
                    html += "</tr>";
                    count += cartlist[i].Num;
                    total += cartlist[i].Num * cartlist[i].Price;
                }
            }
        } catch (e) {}
        if (html === "") {
            html += "<tr>";
            html += "<td class=\"end\" align=\"center\" colspan=\"6\">沒有商品</td>";
            html += "</tr>";
        }
        $(".header>.up>div>.right>.bagbox>.tablebody>tbody").html(html);
        $(".header>.up>div>.right>.bagbox>.totalmoney>span").text(total);
        if (callback) {
            callback();
        }
    }
    if (isLocal) {
        getdata(cartlist);
    } else {
        $.getJSON("../Common/CartList.ashx", function(cartlist) {
            getdata(cartlist);
        });
    }
}
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
        var data = {
            UserId: "",
            IsLogin: true
        };

        function getData(data) {
            if (data !== null && data.IsLogin) {
                $(".loginlogout").attr("href", "../common/loginout.aspx").text("會員登出");
            }
        }
        if (isLocal) {
            getData(data);
        } else {
            $.getJSON("../Common/LoginStatus.ashx", function(data) {
                getData(data);
            });
        }
    })(); //login status
    (function() {
        function setAdjustHeight() {
            $(".event>.inbox").height($(window).height() - $(".header").height());
            $(".event>.inbox>.box").height($(window).height() - $(".header").height() - $(".event>.inbox>.lab").outerHeight(true));
            $(".event>.inbox>.box").mCustomScrollbar("update");
        }
        function setmCustomScrollbar() {
            $(".event>.inbox").width(190);
            $(".event>.inbox>.box").mCustomScrollbar({
                autoDraggerLength: false,
                mouseWheel: "auto",
                scrollButtons: {
                    enable: false
                }
            });
            $(".event>.inbox").removeStyle("width");
        }
        $(window).resize(function() {
            setAdjustHeight();
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() <= 19) {
                $(".event>.open").css("top", $(".header").height() + 51 - $(window).scrollTop());
                $(".event>.inbox").css("top", $(".header").height() - $(window).scrollTop());
            } else {
                if (parseInt($(".event>.open").css("top"), 10) !== 219) {
                    $(".event>.open").css("top", 219);
                }
                if (parseInt($(".event>.inbox").css("top"), 10) !== 168) {
                    $(".event>.inbox").css("top", 168);
                }
            }
        }).scroll();
        $(".event").mouseenter(function() {
            if (!$(this).hasClass("close")) {
                $(this).add(".overlayer").addClass("close");
                setAdjustHeight();
            }
        }).mouseleave(function() {
            if ($(this).hasClass("close")) {
                $(this).add(".overlayer").removeClass("close");
            }
        });
        (function() {
            var data = [{
                "uid": "0b82f6e0-5bcc-4339-8d63-1dcad621bc0c",
                "image": "http://www.caco2.url.tw/caco/AC/images/15601-EVENT.gif",
                "title": " ",
                "thumb": null,
                "url": "http://goo.gl/MBp04e",
                "enable": true,
                "sortnum": 0
            }, {
                "uid": "dc8066ce-0e56-4c1b-ac1e-aa20bb559e56",
                "image": "http://www.caco2.url.tw/caco/AC/images/EVENT_70off_MAN.gif",
                "title": "  ",
                "thumb": null,
                "url": "http://goo.gl/nRsAfd",
                "enable": true,
                "sortnum": 6
            }, {
                "uid": "d19061a7-6115-4c32-888c-2e07c3c48977",
                "image": "http://www.caco2.url.tw/caco/AC/images/EVENT_70off_WOMAN.gif",
                "title": "  ",
                "thumb": null,
                "url": "http://goo.gl/Io0uZO",
                "enable": true,
                "sortnum": 7
            }, {
                "uid": "165c01c1-9894-411c-a34a-93903914f0d8",
                "image": "http://www.caco2.url.tw/caco/AC/images/150427-EVENT.gif",
                "title": " ",
                "thumb": null,
                "url": "http://goo.gl/ekoxwm",
                "enable": true,
                "sortnum": 11
            }, {
                "uid": "8335181b-9971-489f-bc5e-05e73e7cb430",
                "image": "http://www.caco2.url.tw/caco/AC/images/150427-EVENT-bonus.gif",
                "title": " ",
                "thumb": null,
                "url": "http://goo.gl/XD1IEA",
                "enable": true,
                "sortnum": 12
            }, {
                "uid": "70764ce4-ea7b-45f1-8521-71241f16b6e6",
                "image": "http://www.caco2.url.tw/caco/AC/images/150424-EVENT_over.gif",
                "title": " ",
                "thumb": null,
                "url": "http://goo.gl/0TUpKF",
                "enable": true,
                "sortnum": 100
            }];
            function getdata(data) {
                var html = "";
                for (var i = 0, max = data.length; i < max; i++) {
                    html += "<a href=\"" + data[i].url + "\">";
                    html += "<img src=\"" + data[i].image + "\">";
                    html += "</a>";
                }
                $(".event>.inbox>.box").html(html);
                setmCustomScrollbar();
                $(".event>.inbox>.box img").load(function() {
                    setAdjustHeight();
                });
                setAdjustHeight();
            }
            if (isLocal) {
                getdata(data);
            } else {
                $.getJSON("../Common/supersizelist.ashx", function(data) {
                    getdata(data);
                });
            }
        })(); //load event data
    })(); //event
    (function() {
        initShoppingCart();
    })(); //init
});