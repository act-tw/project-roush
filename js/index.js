var isLocal = /^file\:\/\/\//i.test(location.href);
$(function() {
    (function() {
        var datasource = [["http://eos.xinxingly.com/UploadFile/PhotoStorage/2014-03/20140320105049737.jpg","#"],["http://userdisk.webry.biglobe.ne.jp/016/434/02/N000/000/000/127263561148116408775.JPG","#"],["http://eos.xinxingly.com/UploadFile/PhotoStorage/2014-03/20140320105049737.jpg","#"],["http://userdisk.webry.biglobe.ne.jp/016/434/02/N000/000/000/127263561148116408775.JPG","#"]];
        function getdata(data) {
            (function(data) {
                var sid;
                function build(data) {
                    return "<a href=\"" + data[1] + "\"><img src=\"" + data[0] + "\"></a>";
                }
                function resize() {
                    var nowWidth;
                    $(".index>.up>div").css("left", 0).width("auto");
                    nowWidth = $(".index>.up").width();
                    $(".index>.up").height(nowWidth / (1225 / 585));
                    $(".index>.up>div").width(nowWidth * $(".index>.up>div>a").length);
                    $(".index>.up>div>a>img").width(nowWidth);
                }
                function next() {
                    $(".index>.up>div").animate({
                        left: "-=" + $(".index>.up").width()
                    }, function() {
                        var at = (parseInt($(this).css("left"), 10) / -$(".index>.up").width()) + 1;
                        if (at >= $(".index>.up>div>a").length) {
                            $(".index>.up>div").css("left", 0);
                        }
                        showNavi(parseInt($(this).css("left"), 10) / -$(".index>.up").width());
                    });
                }
                function generate(data) {
                    var html = "";
                    var navi = "<ul>";
                    for (var i = 0, max = data.length; i < max; i++) {
                        html += build(data[i]);
                        if (i === max - 1) {
                            html += build(data[0]);
                        }
                        navi += "<li";
                        if (i === 0) {
                            navi += " class=\"active\"";
                        }
                        navi += "></li>";
                    }
                    navi += "</ul>";
                    $(".index>.up>div").html(html).parent().append(navi);
                }
                function autoResize() {
                    $(window).resize(function() {
                        resize();
                    });
                    resize();
                }
                function start() {
                    sid = setInterval(next, 3000);
                }
                function hoverStop() {
                    $(".index>.up").mouseenter(function() {
                        if (sid) {
                            clearInterval(sid);
                        }
                    }).mouseleave(function() {
                        start();
                    });
                }
                function showNavi(index) {
                    $(".index>.up>ul>li.active").removeClass();
                    $(".index>.up>ul>li").eq(index).addClass("active");
                }
                function setNavi() {
                    $(".index>.up>ul>li").click(function() {
                        var index = $(this).index();
                        $(".index>.up>div").animate({
                            left: -index * $(".index>.up").width()
                        }, function() {
                            showNavi(index);
                        });
                    });
                }
                (function(data) {
                    generate(data);
                    setNavi();
                    autoResize();
                    hoverStop();
                    start();
                })(data); //initializing
            })(data); //rotate
        }
        if (isLocal) {
            getdata(datasource);
        } else {
            $.getJSON("../Common/CustomHtml.ashx?code=CacoAdRotator", function(datasource) {
                getdata(datasource);
            });
        }
    })();
    (function() {
        var datasource = [[["http://mu1.sinaimg.cn/crop.7x4x298x298/weiyinyue.music.sina.com.cn/movie_game/1410935545426.jpg?1410935548818","#"],["http://magimg.chinayes.com/Mags/xbtx1/20150901/Article/Title/S201509011418277247963.jpg","#"],["http://img1.taagoo.cn/images/20150901/553383404160.jpg","#"],["http://image.zbian.cn/Home/Images/A353A2A5-89F7-4705-9ED2-4CF2E36F8B37?fileName=s_A56715F5-203B-43A1-A311-755AD269D961.jpg","#"],["http://www.dadidudao.com/attached/image/20140718/20140718113057_8473.jpg","#"],["http://images.weiphone.net/attachments/photo/Day_120707/172657_41671341671025dc8628a45788998.jpg","#"],["http://www.afterfiveenglish.com/resources/IMG_8546.JPG.opt298x298o0,0s298x298.JPG","#"],["http://magimg.chinayes.com/Mags/xbtx1/20150930/Article/Title/S201509301649373069396.jpg","#"]]];
        function getdata(data) {
            (function(data, autoPlay) {
                var sid;

                function build(data) {
                    return "<a href=\"" + data[1] + "\"><img src=\"" + data[0] + "\"></a>";
                }

                function resize() {
                    var nowWidth;
                    $(".index>.down>div>div").css("left", 0).width("auto");
                    $(".index>.down").width("auto");
                    nowWidth = $(".index>.down>div").width();
                    $(".index>.down").width(nowWidth);
                    $(".index>.down>div").height(nowWidth / (1225 / 298)).css("margin-top", nowWidth / (1225 / 17));
                    $(".index>.down>div>div").width(nowWidth / (1225 / 309) * $(".index>.down>div>div>a").length);
                    $(".index>.down>div>div>a>img").width(nowWidth / (1225 / 298)).css("margin-right", nowWidth / (1225 / 11));
                }

                function autoResize() {
                    $(window).resize(function() {
                        resize();
                    });
                    resize();
                }

                function generate(data) {
                    var html = "";
                    for (var i = 0, max = data.length; i < max; i++) {
                        html += build(data[i]);
                    }
                    $(".index>.down>div").html("<div>" + html + "</div>");
                    if (data.length > 4) {
                        $(".index>.down").append("<span class=\"rightflag\"></span><span class=\"leftflag\"></span>");
                    }
                }

                function next() {
                    if (!$(".index>.down>div>div").is(":animated")) {
                        var max = $(".index>.down>div>div").width();
                        var width = $(".index>.down>div>div>a").width() * 4;
                        var left = -1 * parseInt($(".index>.down>div>div").css("left"));
                        var move = "-=" + width;
                        if (max - width === left) {
                            move = 0;
                        } else if (left + width > max - width) {
                            move = -(max - width);
                        }
                        $(".index>.down>div>div").animate({
                            left: move
                        });
                    }
                }

                function back() {
                    if (!$(".index>.down>div>div").is(":animated")) {
                        var max = $(".index>.down>div>div").width();
                        var width = $(".index>.down>div>div>a").width() * 4;
                        var left = -1 * parseInt($(".index>.down>div>div").css("left"));
                        var move = "+=" + width;
                        if (left <= 0) {
                            move = -(max - width);
                        } else if (left < width) {
                            move = 0;
                        }
                        $(".index>.down>div>div").animate({
                            left: move
                        });
                    }
                }

                function start(autoPlay) {
                    if (autoPlay) {
                        sid = setInterval(next, 3000);
                    }
                }

                function hoverStop(autoPlay) {
                    if (autoPlay) {
                        $(".index>.down").mouseenter(function() {
                            if (sid) {
                                clearInterval(sid);
                            }
                        }).mouseleave(function() {
                            start();
                        });
                    }
                }

                function setFlag() {
                    $(".index>.down>.leftflag").click(function() {
                        back();
                    });
                    $(".index>.down>.rightflag").click(function() {
                        next();
                    });
                }

                function adjust() {
                    try {
                        $(".index").parentsUntil("#container").css("display", "block");
                    } catch (e) {}
                }
                (function(data, autoPlay) {
                    generate(data);
                    autoResize();
                    setFlag();
                    start(autoPlay);
                    hoverStop(autoPlay);
                    adjust();
                })(data, autoPlay); //initializing
            })(data[0], data[1] !== undefined); //scrollable            
        }
        if (isLocal) {
            getdata(datasource);
        } else {
            $.getJSON("../Common/CustomHtml.ashx?code=CacoAdRotatorManual", function(datasource) {
                getdata(datasource);
            });
        }
    })(); 
    (function() {
        var datasource = [{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"},{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"},{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"},{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"},{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"},{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"},{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"},{"image":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Oa.png","cover":"http://roush.hishop.com.tw/UserFiles/upFiles/images/Ob.png","url":"#"}];
        function getdata(data) {
            var html="";
            for (var i=0,max=data.length;i<max;i++) {
                html += "<a href=\"" + data[i].url + "\"><img src=\"" + data[i].image + "\"><img src=\"" + data[i].cover + "\"></a>";
            }
            $(".hotbox").html(html);
        }
        if (isLocal) {
            getdata(datasource);
        } else {
            $.getJSON("xxx", function(datasource) {
                getdata(datasource);
            });
        }
    })();
});