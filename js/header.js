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
    var cartlist = [{"MerNo":"SBSS017","MerNo1":"BSS017","MerName":"ELMO條紋短T","Color":"74丈青","Size":"S","Price":350,"Num":1,"PhotoSmPath":"http://www.caco.url.tw/caco/PD/BSS017_260_2.jpg","ColorPhotoPath":"http://www.caco.url.tw/caco/COLOR/BSS01774.jpg"},{"MerNo":"SBCA071","MerNo1":"BCA071","MerName":"雪花鬚邊牛仔短褲","Color":"70淺藍","Size":"M","Price":550,"Num":1,"PhotoSmPath":"http://www.caco.url.tw/caco/PD/BCA071_260_1.jpg","ColorPhotoPath":"http://www.caco.url.tw/caco/COLOR/BCA07170.jpg"},{"MerNo":"SBNA006","MerNo1":"BNA006","MerName":"潑漆破壞牛仔短褲‧情侶款(女)","Color":"70淺藍","Size":"M","Price":680,"Num":1,"PhotoSmPath":"http://www.caco.url.tw/caco/PD/BNA006_260_1.jpg","ColorPhotoPath":"http://www.caco.url.tw/caco/COLOR/BNA00670.jpg"},{"MerNo":"SBSS013","MerNo1":"BSS013","MerName":"MIT 拼接數字ELMO背心‧情侶款(女)","Color":"34紅色","Size":"F","Price":350,"Num":1,"PhotoSmPath":"http://www.caco.url.tw/caco/PD/BSS013_260_1.jpg","ColorPhotoPath":"http://www.caco.url.tw/caco/COLOR/BSS01334.jpg"}];
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
            var data = [{"uid":"0b82f6e0-5bcc-4339-8d63-1dcad621bc0c","image":"http://www.caco2.url.tw/caco/AC/images/15601-EVENT.gif","title":" ","thumb":null,"url":"http://goo.gl/MBp04e","enable":true,"sortnum":0},{"uid":"dc8066ce-0e56-4c1b-ac1e-aa20bb559e56","image":"http://www.caco2.url.tw/caco/AC/images/EVENT_70off_MAN.gif","title":"  ","thumb":null,"url":"http://goo.gl/nRsAfd","enable":true,"sortnum":6},{"uid":"d19061a7-6115-4c32-888c-2e07c3c48977","image":"http://www.caco2.url.tw/caco/AC/images/EVENT_70off_WOMAN.gif","title":"  ","thumb":null,"url":"http://goo.gl/Io0uZO","enable":true,"sortnum":7},{"uid":"165c01c1-9894-411c-a34a-93903914f0d8","image":"http://www.caco2.url.tw/caco/AC/images/150427-EVENT.gif","title":" ","thumb":null,"url":"http://goo.gl/ekoxwm","enable":true,"sortnum":11},{"uid":"8335181b-9971-489f-bc5e-05e73e7cb430","image":"http://www.caco2.url.tw/caco/AC/images/150427-EVENT-bonus.gif","title":" ","thumb":null,"url":"http://goo.gl/XD1IEA","enable":true,"sortnum":12},{"uid":"70764ce4-ea7b-45f1-8521-71241f16b6e6","image":"http://www.caco2.url.tw/caco/AC/images/150424-EVENT_over.gif","title":" ","thumb":null,"url":"http://goo.gl/0TUpKF","enable":true,"sortnum":100}];
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
        var data = [{"Idno":20,"Name":"demo","MouseoverName":"http://roush.hishop.com.tw/UserFiles/upFiles/images/NEWARRIVAL-.png","PhotoPath":"http://roush.hishop.com.tw/UserFiles/upFiles/images/NEWARRIVAL.png","MainPhoto":"http://xovera.verawang.com/uploads/Image/2013-10-10-Ded/WVW_image1.jpg","ShowType":0,"OrderNum":1,"V1":"","SubClass":[{"Idno":124,"Name":"Shop Demo","MouseoverName":"AINIA","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]}]},{"Idno":15,"Name":"男裝","MouseoverName":"http://roush.hishop.com.tw/UserFiles/upFiles/images/MEN-.png","PhotoPath":"http://roush.hishop.com.tw/UserFiles/upFiles/images/MEN.png","MainPhoto":"http://media2.intoday.in/indiatoday/images/stories/mid-length-dress_storysize_350_121013014341.jpg","ShowType":0,"OrderNum":2,"V1":"","SubClass":[{"Idno":107,"Name":"  美式柔棉上衣","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":50,"Level":0,"List":[{"Idno":108,"Name":"   短袖上衣","MouseoverName":"","TopIdno":107,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":51,"Level":0,"List":[]},{"Idno":109,"Name":"   長袖上衣","MouseoverName":"","TopIdno":107,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":52,"Level":0,"List":[]}]},{"Idno":91,"Name":"  美式洗水襯衫","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":60,"Level":0,"List":[{"Idno":92,"Name":"   短袖襯衫","MouseoverName":"","TopIdno":91,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":61,"Level":0,"List":[]},{"Idno":93,"Name":"   長袖襯衫","MouseoverName":"","TopIdno":91,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":62,"Level":0,"List":[]}]},{"Idno":103,"Name":"  美式牛仔褲","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":70,"Level":0,"List":[]},{"Idno":106,"Name":"  美式軍裝外套","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":80,"Level":0,"List":[]},{"Idno":145,"Name":"測試大類別一","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":146,"Name":"測試大類別二","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":147,"Name":"測試大類別三","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":148,"Name":"測試大類別四","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":149,"Name":"測試大類別五","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":150,"Name":"測試大類別六","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":151,"Name":"測試大類別七","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":152,"Name":"測試大類別八","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":153,"Name":"測試大類別九","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":154,"Name":"測試大類別十","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]}]},{"Idno":16,"Name":"女裝","MouseoverName":"http://roush.hishop.com.tw/UserFiles/upFiles/images/WOMEN-.png","PhotoPath":"http://roush.hishop.com.tw/UserFiles/upFiles/images/WOMEN.png","MainPhoto":"http://www.travelandstyle.ca/wp-content/uploads/2011/11/cocktail-dress-thumb.jpg","ShowType":0,"OrderNum":3,"V1":"","SubClass":[{"Idno":96,"Name":"  美式簡約上衣","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":50,"Level":0,"List":[{"Idno":101,"Name":"   短袖上衣","MouseoverName":"","TopIdno":96,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":51,"Level":0,"List":[]},{"Idno":100,"Name":"   長袖上衣","MouseoverName":"","TopIdno":96,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":52,"Level":0,"List":[]},{"Idno":143,"Name":"   短袖上衣1","MouseoverName":"","TopIdno":96,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":144,"Name":"   長袖上衣2","MouseoverName":"","TopIdno":96,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]}]},{"Idno":112,"Name":"  美式修身下身","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":60,"Level":0,"List":[{"Idno":114,"Name":"   七分牛仔褲","MouseoverName":"","TopIdno":112,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":61,"Level":0,"List":[]},{"Idno":113,"Name":"   水洗牛仔褲","MouseoverName":"","TopIdno":112,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":62,"Level":0,"List":[]}]},{"Idno":142,"Name":"無小類別的連結","MouseoverName":"","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":155,"Name":"4444","MouseoverName":"","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":156,"Name":"5555","MouseoverName":"","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]},{"Idno":157,"Name":"6666","MouseoverName":"","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]}]},{"Idno":17,"Name":"配件","MouseoverName":"http://roush.hishop.com.tw/UserFiles/upFiles/images/OUTLET-.png","PhotoPath":"http://roush.hishop.com.tw/UserFiles/upFiles/images/OUTLET.png","MainPhoto":"http://xovera.verawang.com/uploads/Image/2013-10-10-Ded/WVW_image1.jpg","ShowType":0,"OrderNum":4,"V1":"","SubClass":[{"Idno":98,"Name":"  美式率性配件","MouseoverName":"test","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":50,"Level":0,"List":[]}]},{"Idno":19,"Name":"NEW","MouseoverName":"","PhotoPath":"","MainPhoto":"http://www.womangettingmarried.com/wp-content/uploads/2013/11/WVW_ebony_350x225.jpg","ShowType":0,"OrderNum":100,"V1":"","SubClass":[{"Idno":119,"Name":"新品","MouseoverName":"NEW","TopIdno":99999,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[{"Idno":120,"Name":"NEW","MouseoverName":"","TopIdno":119,"Visible":false,"MobileVisibleType":1,"MainIdno":0,"ShowType":0,"V1":"","ordernum":100,"Level":0,"List":[]}]}]}];
        function getdata(data) {
            var html="";
            for (var i = 0, max = data.length; i < max; i++) {
                html += "<a href=\"";
                switch (data[i].ShowType) {
                    case 0:
                        html += "../Shop/itemList.aspx?m=" + data[i].Idno;
                        break;
                    case 2:
                    case 3:
                        html += data[i].V1;
                        break;
                }
                html +="\"";
                if (data[i].ShowType === 3) {
                    html += " target=\"_blank\"";
                }
                html += "><img src=\"" + data[i].PhotoPath + "\" hover=\"" + data[i].MouseoverName + "\"></a>";
            }
            $(".header>.down").html(html);
            $("img[hover]").on("mouseover mouseleave",function() {
                var $this = $(this),
                    src = $this.attr("src");
                $this.attr("src", $this.attr("hover"));
                $this.attr("hover", src);
            });
        }
        if (isLocal) {
            getdata(data);
        } else {
            $.getJSON("../common/ajax/menucmd.ashx", function(data) {
                getdata(data);
            });
        }
    })(); //menu load
    (function() {
        initShoppingCart();
    })(); //init
});