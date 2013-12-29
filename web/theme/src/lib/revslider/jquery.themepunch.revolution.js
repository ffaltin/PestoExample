/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for kenburn Slider
 * @version: 2.3.9 (03.04.2013)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
 **************************************************************************/
(function (e, t) {
    function n(e) {
        var t = [],
            n;
        var r = window.location.href.slice(window.location.href.indexOf(e) + 1).split("_");
        for (var i = 0; i < r.length; i++) {
            r[i] = r[i].replace("%3D", "=");
            n = r[i].split("=");
            t.push(n[0]);
            t[n[0]] = n[1]
        }
        return t
    }

    function r(t, n) {
        t.find(".defaultimg").each(function (r) {
            d(e(this), n);
            n.height = Math.round(n.startheight * (n.width / n.startwidth));
            t.height(n.height);
            d(e(this), n);
            try {
                t.parent().find(".tp-bannershadow").css({
                    width: n.width
                })
            } catch (s) {}
            var o = t.find(">ul >li:eq(" + n.act + ") .slotholder");
            var u = t.find(">ul >li:eq(" + n.next + ") .slotholder");
            b(t, n);
            u.find(".defaultimg").css({
                opacity: 0
            });
            o.find(".defaultimg").css({
                opacity: 1
            });
            w(t, n);
            var a = t.find(">ul >li:eq(" + n.next + ")");
            t.find(".tp-caption").each(function () {
                e(this).stop(true, true)
            });
            L(a, n);
            i(n, t)
        })
    }

    function i(e, t) {
        e.cd = 0;
        if (e.videoplaying != true) {
            var n = t.find(".tp-bannertimer");
            if (n.length > 0) {
                n.stop();
                n.css({
                    width: "0%"
                });
                n.animate({
                    width: "100%"
                }, {
                    duration: e.delay - 100,
                    queue: false,
                    easing: "linear"
                })
            }
            clearTimeout(e.thumbtimer);
            e.thumbtimer = setTimeout(function () {
                u(t);
                p(t, e)
            }, 200)
        }
    }

    function s(e, t) {
        e.cd = 0;
        E(t, e);
        var n = t.find(".tp-bannertimer");
        if (n.length > 0) {
            n.stop();
            n.css({
                width: "0%"
            });
            n.animate({
                width: "100%"
            }, {
                duration: e.delay - 100,
                queue: false,
                easing: "linear"
            })
        }
    }

    function o(n, r) {
        var i = n.parent();
        if (r.navigationType == "thumb" || r.navsecond == "both") {
            i.append('<div class="tp-bullets tp-thumbs ' + r.navigationStyle + '"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>')
        }
        var o = i.find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");
        var f = o.parent();
        f.width(r.thumbWidth * r.thumbAmount);
        f.height(r.thumbHeight);
        f.parent().width(r.thumbWidth * r.thumbAmount);
        f.parent().height(r.thumbHeight);
        n.find(">ul:first >li").each(function (e) {
            var r = n.find(">ul:first >li:eq(" + e + ")");
            if (r.data("thumb") != t) var i = r.data("thumb");
            else var i = r.find("img:first").attr("src");
            o.append('<div class="bullet thumb"><img src="' + i + '"></div>');
            var s = o.find(".bullet:first")
        });
        var l = 100;
        o.find(".bullet").each(function (t) {
            var i = e(this);
            if (t == r.slideamount - 1) i.addClass("last");
            if (t == 0) i.addClass("first");
            i.width(r.thumbWidth);
            i.height(r.thumbHeight);
            if (l > i.outerWidth(true)) l = i.outerWidth(true);
            i.click(function () {
                if (r.transition == 0 && i.index() != r.act) {
                    r.next = i.index();
                    s(r, n)
                }
            })
        });
        var c = l * n.find(">ul:first >li").length;
        var h = o.parent().width();
        r.thumbWidth = l;
        if (h < c) {
            e(document).mousemove(function (t) {
                e("body").data("mousex", t.pageX)
            });
            o.parent().mouseenter(function () {
                var t = e(this);
                t.addClass("over");
                var r = t.offset();
                var i = e("body").data("mousex") - r.left;
                var s = t.width();
                var o = t.find(".bullet:first").outerWidth(true);
                var u = o * n.find(">ul:first >li").length;
                var f = u - s + 15;
                var l = f / s;
                i = i - 30;
                var c = 0 - i * l;
                if (c > 0) c = 0;
                if (c < 0 - u + s) c = 0 - u + s;
                a(t, c, 200)
            });
            o.parent().mousemove(function () {
                var t = e(this);
                var r = t.offset();
                var i = e("body").data("mousex") - r.left;
                var s = t.width();
                var o = t.find(".bullet:first").outerWidth(true);
                var u = o * n.find(">ul:first >li").length;
                var f = u - s + 15;
                var l = f / s;
                i = i - 30;
                var c = 0 - i * l;
                if (c > 0) c = 0;
                if (c < 0 - u + s) c = 0 - u + s;
                a(t, c, 0)
            });
            o.parent().mouseleave(function () {
                var t = e(this);
                t.removeClass("over");
                u(n)
            })
        }
    }

    function u(e) {
        var t = e.parent().find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");
        var n = t.parent();
        var r = n.offset();
        var i = n.find(".bullet:first").outerWidth(true);
        var s = n.find(".bullet.selected").index() * i;
        var o = n.width();
        var i = n.find(".bullet:first").outerWidth(true);
        var u = i * e.find(">ul:first >li").length;
        var f = u - o;
        var l = f / o;
        var c = 0 - s;
        if (c > 0) c = 0;
        if (c < 0 - u + o) c = 0 - u + o;
        if (!n.hasClass("over")) {
            a(n, c, 200)
        }
    }

    function a(e, t, n) {
        e.stop();
        e.find(".tp-thumbcontainer").animate({
            left: t + "px"
        }, {
            duration: n,
            queue: false
        })
    }

    function f(t, n) {
        if (n.navigationType == "bullet" || n.navigationType == "both") {
            t.parent().append('<div class="tp-bullets simplebullets ' + n.navigationStyle + '"></div>')
        }
        var r = t.parent().find(".tp-bullets");
        t.find(">ul:first >li").each(function (e) {
            var n = t.find(">ul:first >li:eq(" + e + ") img:first").attr("src");
            r.append('<div class="bullet"></div>');
            var i = r.find(".bullet:first")
        });
        r.find(".bullet").each(function (r) {
            var i = e(this);
            if (r == n.slideamount - 1) i.addClass("last");
            if (r == 0) i.addClass("first");
            i.click(function () {
                var e = false;
                if (n.navigationArrows == "withbullet" || n.navigationArrows == "nexttobullets") {
                    if (i.index() - 1 == n.act) e = true
                } else {
                    if (i.index() == n.act) e = true
                } if (n.transition == 0 && !e) {
                    if (n.navigationArrows == "withbullet" || n.navigationArrows == "nexttobullets") {
                        n.next = i.index() - 1
                    } else {
                        n.next = i.index()
                    }
                    s(n, t)
                }
            })
        });
        r.append('<div class="tpclear"></div>');
        p(t, n)
    }

    function l(e, n) {
        var r = e.find(".tp-bullets");
        var i = "";
        var o = n.navigationStyle;
        if (n.navigationArrows == "none") i = "visibility:none";
        n.soloArrowStyle = "default";
        if (n.navigationArrows != "none" && n.navigationArrows != "nexttobullets") o = n.soloArrowStyle;
        e.parent().append('<div style="' + i + '" class="tp-leftarrow tparrows ' + o + '"></div>');
        e.parent().append('<div style="' + i + '" class="tp-rightarrow tparrows ' + o + '"></div>');
        e.parent().find(".tp-rightarrow").click(function () {
            if (n.transition == 0) {
                if (e.data("showus") != t && e.data("showus") != -1) n.next = e.data("showus") - 1;
                else n.next = n.next + 1;
                e.data("showus", -1);
                if (n.next >= n.slideamount) n.next = 0;
                if (n.next < 0) n.next = 0;
                if (n.act != n.next) s(n, e)
            }
        });
        e.parent().find(".tp-leftarrow").click(function () {
            if (n.transition == 0) {
                n.next = n.next - 1;
                n.leftarrowpressed = 1;
                if (n.next < 0) n.next = n.slideamount - 1;
                s(n, e)
            }
        });
        p(e, n)
    }

    function c(e, t) {
        if (t.touchenabled == "on") e.swipe({
            data: e,
            swipeRight: function () {
                if (t.transition == 0) {
                    t.next = t.next - 1;
                    t.leftarrowpressed = 1;
                    if (t.next < 0) t.next = t.slideamount - 1;
                    s(t, e)
                }
            },
            swipeLeft: function () {
                if (t.transition == 0) {
                    t.next = t.next + 1;
                    if (t.next == t.slideamount) t.next = 0;
                    s(t, e)
                }
            },
            allowPageScroll: "auto"
        })
    }

    function h(e, t) {
        var n = e.parent().find(".tp-bullets");
        var r = e.parent().find(".tparrows");
        if (n == null) {
            e.append('<div class=".tp-bullets"></div>');
            var n = e.parent().find(".tp-bullets")
        }
        if (r == null) {
            e.append('<div class=".tparrows"></div>');
            var r = e.parent().find(".tparrows")
        }
        e.data("hidethumbs", t.hideThumbs);
        n.addClass("hidebullets");
        r.addClass("hidearrows");
        n.hover(function () {
            n.addClass("hovered");
            clearTimeout(e.data("hidethumbs"));
            n.removeClass("hidebullets");
            r.removeClass("hidearrows")
        }, function () {
            n.removeClass("hovered");
            if (!e.hasClass("hovered") && !n.hasClass("hovered")) e.data("hidethumbs", setTimeout(function () {
                n.addClass("hidebullets");
                r.addClass("hidearrows")
            }, t.hideThumbs))
        });
        r.hover(function () {
            n.addClass("hovered");
            clearTimeout(e.data("hidethumbs"));
            n.removeClass("hidebullets");
            r.removeClass("hidearrows")
        }, function () {
            n.removeClass("hovered")
        });
        e.on("mouseenter", function () {
            e.addClass("hovered");
            clearTimeout(e.data("hidethumbs"));
            n.removeClass("hidebullets");
            r.removeClass("hidearrows")
        });
        e.on("mouseleave", function () {
            e.removeClass("hovered");
            if (!e.hasClass("hovered") && !n.hasClass("hovered")) e.data("hidethumbs", setTimeout(function () {
                n.addClass("hidebullets");
                r.addClass("hidearrows")
            }, t.hideThumbs))
        })
    }

    function p(e, t) {
        var n = e.parent();
        var r = n.find(".tp-bullets");
        var i = n.find(".tp-leftarrow");
        var s = n.find(".tp-rightarrow");
        if (t.navigationType == "thumb" && t.navigationArrows == "nexttobullets") t.navigationArrows = "solo";
        if (t.navigationArrows == "nexttobullets") {
            i.prependTo(r).css({
                "float": "left"
            });
            s.insertBefore(r.find(".tpclear")).css({
                "float": "left"
            })
        }
        if (t.navigationArrows != "none" && t.navigationArrows != "nexttobullets") {
            i.css({
                position: "absolute"
            });
            s.css({
                position: "absolute"
            });
            if (t.soloArrowLeftValign == "center") i.css({
                top: "50%",
                marginTop: t.soloArrowLeftVOffset - Math.round(i.innerHeight() / 2) + "px"
            });
            if (t.soloArrowLeftValign == "bottom") i.css({
                bottom: 0 + t.soloArrowLeftVOffset + "px"
            });
            if (t.soloArrowLeftValign == "top") i.css({
                top: 0 + t.soloArrowLeftVOffset + "px"
            });
            if (t.soloArrowLeftHalign == "center") i.css({
                left: "50%",
                marginLeft: t.soloArrowLeftHOffset - Math.round(i.innerWidth() / 2) + "px"
            });
            if (t.soloArrowLeftHalign == "left") i.css({
                left: 0 + t.soloArrowLeftHOffset + "px"
            });
            if (t.soloArrowLeftHalign == "right") i.css({
                right: 0 + t.soloArrowLeftHOffset + "px"
            });
            if (t.soloArrowRightValign == "center") s.css({
                top: "50%",
                marginTop: t.soloArrowRightVOffset - Math.round(s.innerHeight() / 2) + "px"
            });
            if (t.soloArrowRightValign == "bottom") s.css({
                bottom: 0 + t.soloArrowRightVOffset + "px"
            });
            if (t.soloArrowRightValign == "top") s.css({
                top: 0 + t.soloArrowRightVOffset + "px"
            });
            if (t.soloArrowRightHalign == "center") s.css({
                left: "50%",
                marginLeft: t.soloArrowRightHOffset - Math.round(s.innerWidth() / 2) + "px"
            });
            if (t.soloArrowRightHalign == "left") s.css({
                left: 0 + t.soloArrowRightHOffset + "px"
            });
            if (t.soloArrowRightHalign == "right") s.css({
                right: 0 + t.soloArrowRightHOffset + "px"
            });
            if (i.position() != null) i.css({
                top: Math.round(parseInt(i.position().top, 0)) + "px"
            });
            if (s.position() != null) s.css({
                top: Math.round(parseInt(s.position().top, 0)) + "px"
            })
        }
        if (t.navigationArrows == "none") {
            i.css({
                visibility: "hidden"
            });
            s.css({
                visibility: "hidden"
            })
        }
        if (t.navigationVAlign == "center") r.css({
            top: "50%",
            marginTop: t.navigationVOffset - Math.round(r.innerHeight() / 2) + "px"
        });
        if (t.navigationVAlign == "bottom") r.css({
            bottom: 0 + t.navigationVOffset + "px"
        });
        if (t.navigationVAlign == "top") r.css({
            top: 0 + t.navigationVOffset + "px"
        });
        if (t.navigationHAlign == "center") r.css({
            left: "50%",
            marginLeft: t.navigationHOffset - Math.round(r.innerWidth() / 2) + "px"
        });
        if (t.navigationHAlign == "left") r.css({
            left: 0 + t.navigationHOffset + "px"
        });
        if (t.navigationHAlign == "right") r.css({
            right: 0 + t.navigationHOffset + "px"
        })
    }

    function d(e, n) {
        n.width = parseInt(n.container.width(), 0);
        n.height = parseInt(n.container.height(), 0);
        n.bw = n.width / n.startwidth;
        n.bh = n.height / n.startheight;
        if (n.bh > 1) {
            n.bw = 1;
            n.bh = 1
        }
        if (e.data("orgw") != t) {
            e.width(e.data("orgw"));
            e.height(e.data("orgh"))
        }
        var r = n.width / e.width();
        var i = n.height / e.height();
        n.fw = r;
        n.fh = i;
        if (e.data("orgw") == t) {
            e.data("orgw", e.width());
            e.data("orgh", e.height())
        }
        if (n.fullWidth == "on") {
            var s = n.container.parent().width();
            var o = n.container.parent().height();
            var u = o / e.data("orgh");
            var a = s / e.data("orgw");
            e.width(e.width() * u);
            e.height(o);
            if (e.width() < s) {
                e.width(s + 50);
                var a = e.width() / e.data("orgw");
                e.height(e.data("orgh") * a)
            }
            if (e.width() > s) {
                e.data("fxof", s / 2 - e.width() / 2);
                e.css({
                    position: "absolute",
                    left: e.data("fxof") + "px"
                })
            }
            if (e.height() <= o) {
                e.data("fyof", 0);
                e.data("fxof", s / 2 - e.width() / 2);
                e.css({
                    position: "absolute",
                    top: e.data("fyof") + "px",
                    left: e.data("fxof") + "px"
                })
            }
            if (e.height() > o && e.data("fullwidthcentering") == "on") {
                e.data("fyof", o / 2 - e.height() / 2);
                e.data("fxof", s / 2 - e.width() / 2);
                e.css({
                    position: "absolute",
                    top: e.data("fyof") + "px",
                    left: e.data("fxof") + "px"
                })
            }
        } else {
            e.width(n.width);
            e.height(e.height() * r);
            if (e.height() < n.height && e.height() != 0 && e.height() != null) {
                e.height(n.height);
                e.width(e.data("orgw") * i)
            }
        }
        e.data("neww", e.width());
        e.data("newh", e.height());
        if (n.fullWidth == "on") {
            n.slotw = Math.ceil(e.width() / n.slots)
        } else {
            n.slotw = Math.ceil(n.width / n.slots)
        }
        n.sloth = Math.ceil(n.height / n.slots)
    }

    function v(n, r) {
        n.find(".tp-caption").each(function () {
            e(this).addClass(e(this).data("transition"));
            e(this).addClass("start")
        });
        n.find(">ul:first >li").each(function (n) {
            var r = e(this);
            if (r.data("link") != t) {
                var i = r.data("link");
                var s = "_self";
                var o = 2;
                if (r.data("slideindex") == "back") o = 0;
                var u = r.data("linktoslide");
                if (r.data("target") != t) s = r.data("target");
                if (i == "slide") {
                    r.append('<div class="tp-caption sft slidelink" style="z-index:' + o + ';" data-x="0" data-y="0" data-linktoslide="' + u + '" data-start="0"><a><div></div></a></div>')
                } else {
                    u = "no";
                    r.append('<div class="tp-caption sft slidelink" style="z-index:' + o + ';" data-x="0" data-y="0" data-linktoslide="' + u + '" data-start="0"><a target="' + s + '" href="' + i + '"><div></div></a></div>')
                }
            }
        });
        n.find(">ul:first >li >img").each(function (t) {
            var n = e(this);
            n.addClass("defaultimg");
            d(n, r);
            d(n, r);
            n.wrap('<div class="slotholder"></div>');
            n.css({
                opacity: 0
            });
            n.data("li-id", t)
        })
    }

    function m(e, n, r) {
        var i = e;
        var s = i.find("img");
        d(s, n);
        var o = s.attr("src");
        var u = s.css("background-color");
        var a = s.data("neww");
        var f = s.data("newh");
        var l = s.data("fxof");
        if (l == t) l = 0;
        var c = s.data("fyof");
        if (s.data("fullwidthcentering") != "on" || c == t) c = 0;
        var h = 0;
        if (!r) var h = 0 - n.slotw;
        for (var p = 0; p < n.slots; p++) i.append('<div class="slot" style="position:absolute;top:' + (0 + c) + "px;left:" + (l + p * n.slotw) + "px;overflow:hidden;width:" + n.slotw + "px;height:" + f + 'px"><div class="slotslide" style="position:absolute;top:0px;left:' + h + "px;width:" + n.slotw + "px;height:" + f + 'px;overflow:hidden;"><img style="background-color:' + u + ";position:absolute;top:0px;left:" + (0 - p * n.slotw) + "px;width:" + a + "px;height:" + f + 'px" src="' + o + '"></div></div>')
    }

    function g(e, n, r) {
        var i = e;
        var s = i.find("img");
        d(s, n);
        var o = s.attr("src");
        var u = s.css("background-color");
        var a = s.data("neww");
        var f = s.data("newh");
        var l = s.data("fxof");
        if (l == t) l = 0;
        var c = s.data("fyof");
        if (s.data("fullwidthcentering") != "on" || c == t) c = 0;
        var h = 0;
        if (!r) var h = 0 - n.sloth;
        for (var p = 0; p < n.slots + 2; p++) i.append('<div class="slot" style="position:absolute;' + "top:" + (c + p * n.sloth) + "px;" + "left:" + l + "px;" + "overflow:hidden;" + "width:" + a + "px;" + "height:" + n.sloth + 'px"' + '><div class="slotslide" style="position:absolute;' + "top:" + h + "px;" + "left:0px;width:" + a + "px;" + "height:" + n.sloth + "px;" + 'overflow:hidden;"><img style="position:absolute;' + "background-color:" + u + ";" + "top:" + (0 - p * n.sloth) + "px;" + "left:0px;width:" + a + "px;" + "height:" + f + 'px" src="' + o + '"></div></div>')
    }

    function y(e, n, r) {
        var i = e;
        var s = i.find("img");
        d(s, n);
        var o = s.attr("src");
        var u = s.css("background-color");
        var a = s.data("neww");
        var f = s.data("newh");
        var l = s.data("fxof");
        if (l == t) l = 0;
        var c = s.data("fyof");
        if (s.data("fullwidthcentering") != "on" || c == t) c = 0;
        var h = 0;
        var p = 0;
        if (n.sloth > n.slotw) p = n.sloth;
        else p = n.slotw; if (!r) {
            var h = 0 - p
        }
        n.slotw = p;
        n.sloth = p;
        var v = 0;
        var m = 0;
        for (var g = 0; g < n.slots; g++) {
            m = 0;
            for (var y = 0; y < n.slots; y++) {
                i.append('<div class="slot" ' + 'style="position:absolute;' + "top:" + (c + m) + "px;" + "left:" + (l + v) + "px;" + "width:" + p + "px;" + "height:" + p + "px;" + 'overflow:hidden;">' + '<div class="slotslide" data-x="' + v + '" data-y="' + m + '" ' + 'style="position:absolute;' + "top:" + 0 + "px;" + "left:" + 0 + "px;" + "width:" + p + "px;" + "height:" + p + "px;" + 'overflow:hidden;">' + '<img style="position:absolute;' + "top:" + (0 - m) + "px;" + "left:" + (0 - v) + "px;" + "width:" + a + "px;" + "height:" + f + "px" + "background-color:" + u + ';"' + 'src="' + o + '"></div></div>');
                m = m + p
            }
            v = v + p
        }
    }

    function b(n, r, i) {
        if (i == t) i == 80;
        setTimeout(function () {
            n.find(".slotholder .slot").each(function () {
                clearTimeout(e(this).data("tout"));
                e(this).remove()
            });
            r.transition = 0
        }, i)
    }

    function w(e, t) {
        var n = e.find(">li:eq(" + t.act + ")");
        var r = e.find(">li:eq(" + t.next + ")");
        var i = r.find(".tp-caption");
        if (i.find("iframe") == 0) {
            if (i.hasClass("hcenter")) i.css({
                height: t.height + "px",
                top: "0px",
                left: t.width / 2 - i.outerWidth() / 2 + "px"
            });
            else if (i.hasClass("vcenter")) i.css({
                width: t.width + "px",
                left: "0px",
                top: t.height / 2 - i.outerHeight() / 2 + "px"
            })
        }
    }

    function E(n, r) {
        n.trigger("revolution.slide.onbeforeswap");
        r.transition = 1;
        r.videoplaying = false;
        try {
            var i = n.find(">ul:first-child >li:eq(" + r.act + ")")
        } catch (s) {
            var i = n.find(">ul:first-child >li:eq(1)")
        }
        r.lastslide = r.act;
        var o = n.find(">ul:first-child >li:eq(" + r.next + ")");
        var a = i.find(".slotholder");
        var f = o.find(".slotholder");
        i.css({
            visibility: "visible"
        });
        o.css({
            visibility: "visible"
        });
        if (r.ie) {
            if (o.data("transition") == "boxfade") o.data("transition", "boxslide");
            if (o.data("transition") == "slotfade-vertical") o.data("transition", "slotzoom-vertical");
            if (o.data("transition") == "slotfade-horizontal") o.data("transition", "slotzoom-horizontal")
        }
        if (o.data("delay") != t) {
            r.cd = 0;
            r.delay = o.data("delay")
        } else {
            r.delay = r.origcd
        }
        i.css({
            left: "0px",
            top: "0px"
        });
        o.css({
            left: "0px",
            top: "0px"
        });
        if (o.data("differentissplayed") == "prepared") {
            o.data("differentissplayed", "done");
            o.data("transition", o.data("savedtransition"));
            o.data("slotamount", o.data("savedslotamount"));
            o.data("masterspeed", o.data("savedmasterspeed"))
        }
        if (o.data("fstransition") != t && o.data("differentissplayed") != "done") {
            o.data("savedtransition", o.data("transition"));
            o.data("savedslotamount", o.data("slotamount"));
            o.data("savedmasterspeed", o.data("masterspeed"));
            o.data("transition", o.data("fstransition"));
            o.data("slotamount", o.data("fsslotamount"));
            o.data("masterspeed", o.data("fsmasterspeed"));
            o.data("differentissplayed", "prepared")
        }
        var l = 0;
        if (o.data("transition") == "boxslide") l = 0;
        else if (o.data("transition") == "boxfade") l = 1;
        else if (o.data("transition") == "slotslide-horizontal") l = 2;
        else if (o.data("transition") == "slotslide-vertical") l = 3;
        else if (o.data("transition") == "curtain-1") l = 4;
        else if (o.data("transition") == "curtain-2") l = 5;
        else if (o.data("transition") == "curtain-3") l = 6;
        else if (o.data("transition") == "slotzoom-horizontal") l = 7;
        else if (o.data("transition") == "slotzoom-vertical") l = 8;
        else if (o.data("transition") == "slotfade-horizontal") l = 9;
        else if (o.data("transition") == "slotfade-vertical") l = 10;
        else if (o.data("transition") == "fade") l = 11;
        else if (o.data("transition") == "slideleft") l = 12;
        else if (o.data("transition") == "slideup") l = 13;
        else if (o.data("transition") == "slidedown") l = 14;
        else if (o.data("transition") == "slideright") l = 15;
        else if (o.data("transition") == "papercut") l = 16;
        else if (o.data("transition") == "3dcurtain-horizontal") l = 17;
        else if (o.data("transition") == "3dcurtain-vertical") l = 18;
        else if (o.data("transition") == "cubic" || o.data("transition") == "cube") l = 19;
        else if (o.data("transition") == "flyin") l = 20;
        else if (o.data("transition") == "turnoff") l = 21;
        else {
            l = Math.round(Math.random() * 21);
            o.data("slotamount", Math.round(Math.random() * 12 + 4))
        } if (o.data("transition") == "random-static") {
            l = Math.round(Math.random() * 16);
            if (l > 15) l = 15;
            if (l < 0) l = 0
        }
        if (o.data("transition") == "random-premium") {
            l = Math.round(Math.random() * 6 + 16);
            if (l > 21) l = 21;
            if (l < 16) l = 16
        }
        var c = -1;
        if (r.leftarrowpressed == 1 || r.act > r.next) c = 1;
        if (o.data("transition") == "slidehorizontal") {
            l = 12;
            if (r.leftarrowpressed == 1) l = 15
        }
        if (o.data("transition") == "slidevertical") {
            l = 13;
            if (r.leftarrowpressed == 1) l = 14
        }
        r.leftarrowpressed = 0;
        if (l > 21) l = 21;
        if (l < 0) l = 0;
        if ((r.ie || r.ie9) && l > 18) {
            l = Math.round(Math.random() * 16);
            o.data("slotamount", Math.round(Math.random() * 12 + 4))
        }
        if (r.ie && (l == 17 || l == 16 || l == 2 || l == 3 || l == 9 || l == 10)) l = Math.round(Math.random() * 3 + 12);
        if (r.ie9 && l == 3) l = 4;
        var h = 300;
        if (o.data("masterspeed") != t && o.data("masterspeed") > 99 && o.data("masterspeed") < 4001) h = o.data("masterspeed");
        n.parent().find(".bullet").each(function () {
            var t = e(this);
            t.removeClass("selected");
            if (r.navigationArrows == "withbullet" || r.navigationArrows == "nexttobullets") {
                if (t.index() - 1 == r.next) t.addClass("selected")
            } else {
                if (t.index() == r.next) t.addClass("selected")
            }
        });
        n.find(">li").each(function () {
            var t = e(this);
            if (t.index != r.act && t.index != r.next) t.css({
                "z-index": 16
            })
        });
        i.css({
            "z-index": 18
        });
        o.css({
            "z-index": 20
        });
        o.css({
            opacity: 0
        });
        A(i, r);
        L(o, r);
        if (o.data("slotamount") == t || o.data("slotamount") < 1) {
            r.slots = Math.round(Math.random() * 12 + 4);
            if (o.data("transition") == "boxslide") r.slots = Math.round(Math.random() * 6 + 3)
        } else {
            r.slots = o.data("slotamount")
        } if (o.data("rotate") == t) r.rotate = 0;
        else if (o.data("rotate") == 999) r.rotate = Math.round(Math.random() * 360);
        else r.rotate = o.data("rotate"); if (!e.support.transition || r.ie || r.ie9) r.rotate = 0;
        if (r.firststart == 1) {
            i.css({
                opacity: 0
            });
            r.firststart = 0
        }
        if (l == 0) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            o.css({
                opacity: 1
            });
            y(a, r, true);
            y(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.sloth,
                    left: 0 - r.slotw
                }, 0);
                else s.transition({
                    top: 0 - r.sloth,
                    left: 0 - r.slotw,
                    rotate: r.rotate
                }, 0);
                setTimeout(function () {
                    s.transition({
                        top: 0,
                        left: 0,
                        scale: 1,
                        rotate: 0
                    }, h * 1.5, function () {
                        if (t == r.slots * r.slots - 1) {
                            b(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (o.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            u(n)
                        }
                    })
                }, t * 15)
            })
        }
        if (l == 1) {
            if (r.slots > 5) r.slots = 5;
            o.css({
                opacity: 1
            });
            y(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.css({
                    opacity: 0
                });
                s.find("img").css({
                    opacity: 0
                });
                if (r.ie9) s.find("img").transition({
                    top: Math.random() * r.slotw - r.slotw + "px",
                    left: Math.random() * r.slotw - r.slotw + "px"
                }, 0);
                else s.find("img").transition({
                    top: Math.random() * r.slotw - r.slotw + "px",
                    left: Math.random() * r.slotw - r.slotw + "px",
                    rotate: r.rotate
                }, 0);
                var l = Math.random() * 1e3 + (h + 200);
                if (t == r.slots * r.slots - 1) l = 1500;
                s.find("img").transition({
                    opacity: 1,
                    top: 0 - s.data("y") + "px",
                    left: 0 - s.data("x") + "px",
                    rotate: 0
                }, l);
                s.transition({
                    opacity: 1
                }, l, function () {
                    if (t == r.slots * r.slots - 1) {
                        b(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (o.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        u(n)
                    }
                })
            })
        }
        if (l == 2) {
            h = h + 200;
            o.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this);
                t.transit({
                    left: r.slotw + "px",
                    rotate: 0 - r.rotate
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    u(n)
                })
            });
            f.find(".slotslide").each(function () {
                var t = e(this);
                if (r.ie9) t.transit({
                    left: 0 - r.slotw + "px"
                }, 0);
                else t.transit({
                    left: 0 - r.slotw + "px",
                    rotate: r.rotate
                }, 0);
                t.transit({
                    left: "0px",
                    rotate: 0
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    if (r.ie) a.find(".defaultimg").css({
                        opacity: 1
                    });
                    r.act = r.next;
                    u(n)
                })
            })
        }
        if (l == 3) {
            h = h + 200;
            o.css({
                opacity: 1
            });
            g(a, r, true);
            g(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this);
                t.transit({
                    top: r.sloth + "px",
                    rotate: r.rotate
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    u(n)
                })
            });
            f.find(".slotslide").each(function () {
                var t = e(this);
                if (r.ie9) t.transit({
                    top: 0 - r.sloth + "px"
                }, 0);
                else t.transit({
                    top: 0 - r.sloth + "px",
                    rotate: r.rotate
                }, 0);
                t.transit({
                    top: "0px",
                    rotate: 0
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    u(n)
                })
            })
        }
        if (l == 4) {
            o.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transit({
                    top: 0 + r.height + "px",
                    opacity: 1,
                    rotate: r.rotate
                }, h + t * (70 - r.slots))
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    top: "0px",
                    opacity: 1,
                    rotate: 0
                }, h + t * (70 - r.slots), function () {
                    if (t == r.slots - 1) {
                        b(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (o.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        u(n)
                    }
                })
            })
        }
        if (l == 5) {
            o.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transition({
                    top: 0 + r.height + "px",
                    opacity: 1,
                    rotate: r.rotate
                }, h + (r.slots - t) * (70 - r.slots))
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    top: "0px",
                    opacity: 1,
                    rotate: 0
                }, h + (r.slots - t) * (70 - r.slots), function () {
                    if (t == 0) {
                        b(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (o.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        u(n)
                    }
                })
            })
        }
        if (l == 6) {
            o.css({
                opacity: 1
            });
            if (r.slots < 2) r.slots = 2;
            m(a, r, true);
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                if (t < r.slots / 2) var i = (t + 2) * 60;
                else var i = (2 + r.slots - t) * 60;
                n.transition({
                    top: 0 + r.height + "px",
                    opacity: 1
                }, h + i)
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0); if (t < r.slots / 2) var l = (t + 2) * 60;
                else var l = (2 + r.slots - t) * 60;
                s.transition({
                    top: "0px",
                    opacity: 1,
                    rotate: 0
                }, h + l, function () {
                    if (t == Math.round(r.slots / 2)) {
                        b(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (o.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        u(n)
                    }
                })
            })
        }
        if (l == 7) {
            h = h * 3;
            o.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this).find("img");
                t.transition({
                    left: 0 - r.slotw / 2 + "px",
                    top: 0 - r.height / 2 + "px",
                    width: r.slotw * 2 + "px",
                    height: r.height * 2 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    u(n)
                })
            });
            /						/;
            f.find(".slotslide").each(function (t) {
                var s = e(this).find("img");
                if (r.ie9) s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    left: 0 - t * r.slotw + "px",
                    top: 0 + "px",
                    width: f.find(".defaultimg").data("neww") + "px",
                    height: f.find(".defaultimg").data("newh") + "px",
                    opacity: 1,
                    rotate: 0
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    u(n)
                })
            })
        }
        if (l == 8) {
            h = h * 3;
            o.css({
                opacity: 1
            });
            g(a, r, true);
            g(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this).find("img");
                t.transition({
                    left: 0 - r.width / 2 + "px",
                    top: 0 - r.sloth / 2 + "px",
                    width: r.width * 2 + "px",
                    height: r.sloth * 2 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    u(n)
                })
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this).find("img");
                if (r.ie9) s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    left: 0 + "px",
                    top: 0 - t * r.sloth + "px",
                    width: f.find(".defaultimg").data("neww") + "px",
                    height: f.find(".defaultimg").data("newh") + "px",
                    opacity: 1,
                    rotate: 0
                }, h, function () {
                    b(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (o.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    u(n)
                })
            })
        }
        if (l == 9) {
            o.css({
                opacity: 1
            });
            r.slots = r.width / 20;
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            var p = 0;
            f.find(".slotslide").each(function (t) {
                var n = e(this);
                p++;
                n.transition({
                    opacity: 0,
                    x: 0,
                    y: 0
                }, 0);
                n.data("tout", setTimeout(function () {
                    n.transition({
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, h)
                }, t * 4))
            });
            setTimeout(function () {
                b(n, r);
                f.find(".defaultimg").css({
                    opacity: 1
                });
                if (o.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                if (r.ie) a.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                u(n)
            }, h + p * 4)
        }
        if (l == 10) {
            o.css({
                opacity: 1
            });
            r.slots = r.height / 20;
            g(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            var p = 0;
            f.find(".slotslide").each(function (t) {
                var n = e(this);
                p++;
                n.transition({
                    opacity: 0,
                    x: 0,
                    y: 0
                }, 0);
                n.data("tout", setTimeout(function () {
                    n.transition({
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, h)
                }, t * 4))
            });
            setTimeout(function () {
                b(n, r);
                f.find(".defaultimg").css({
                    opacity: 1
                });
                if (o.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                if (r.ie) a.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                u(n)
            }, h + p * 4)
        }
        if (l == 11) {
            o.css({
                opacity: 1
            });
            r.slots = 1;
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0,
                position: "relative"
            });
            var p = 0;
            f.find(".slotslide").each(function (t) {
                var n = e(this);
                p++;
                if (r.ie9 || r.ie) {
                    if (r.ie) o.css({
                        opacity: "0"
                    });
                    n.css({
                        opacity: 0
                    })
                } else n.transition({
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                setTimeout(function () {
                    if (r.ie9 || r.ie) {
                        if (r.ie) o.animate({
                            opacity: 1
                        }, {
                            duration: h
                        });
                        else n.transition({
                            opacity: 1
                        }, h)
                    } else {
                        n.transition({
                            opacity: 1,
                            rotate: 0
                        }, h)
                    }
                }, 10)
            });
            setTimeout(function () {
                b(n, r);
                f.find(".defaultimg").css({
                    opacity: 1
                });
                if (o.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                if (r.ie) a.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                u(n)
            }, h + 15)
        }
        if (l == 12 || l == 13 || l == 14 || l == 15) {
            h = h * 3;
            o.css({
                opacity: 1
            });
            r.slots = 1;
            m(f, r, true);
            m(a, r, true);
            a.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".defaultimg").css({
                opacity: 0
            });
            var d = r.width;
            var v = r.height;
            if (r.fullWidth == "on") {
                d = r.container.parent().width();
                v = r.container.parent().height()
            }
            var w = f.find(".slotslide");
            if (l == 12)
                if (r.ie9) {
                    w.transition({
                        left: d + "px"
                    }, 0)
                } else {
                    w.transition({
                        left: d + "px",
                        rotate: r.rotate
                    }, 0)
                } else if (l == 15)
                if (r.ie9) w.transition({
                    left: 0 - r.width + "px"
                }, 0);
                else w.transition({
                    left: 0 - r.width + "px",
                    rotate: r.rotate
                }, 0);
                else if (l == 13)
                if (r.ie9) w.transition({
                    top: v + "px"
                }, 0);
                else w.transition({
                    top: v + "px",
                    rotate: r.rotate
                }, 0);
                else if (l == 14)
                if (r.ie9) w.transition({
                    top: 0 - r.height + "px"
                }, 0);
                else w.transition({
                    top: 0 - r.height + "px",
                    rotate: r.rotate
                }, 0);
            w.transition({
                left: "0px",
                top: "0px",
                opacity: 1,
                rotate: 0
            }, h, function () {
                b(n, r, 0);
                if (o.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                f.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                u(n)
            });
            var E = a.find(".slotslide");
            if (l == 12) E.transition({
                left: 0 - d + "px",
                opacity: 1,
                rotate: 0
            }, h);
            else if (l == 15) E.transition({
                left: d + "px",
                opacity: 1,
                rotate: 0
            }, h);
            else if (l == 13) E.transition({
                top: 0 - v + "px",
                opacity: 1,
                rotate: 0
            }, h);
            else if (l == 14) E.transition({
                top: v + "px",
                opacity: 1,
                rotate: 0
            }, h)
        }
        if (l == 16) {
            i.css({
                position: "absolute",
                "z-index": 20
            });
            o.css({
                position: "absolute",
                "z-index": 15
            });
            i.wrapInner('<div class="tp-half-one"></div>');
            i.find(".tp-half-one").clone(true).appendTo(i).addClass("tp-half-two");
            i.find(".tp-half-two").removeClass("tp-half-one");
            i.find(".tp-half-two").wrapInner('<div class="tp-offset"></div>');
            var S = i.find(".defaultimg");
            if (S.length > 0 && S.data("fullwidthcentering") == "on") {
                var x = S.height() / 2;
                var T = S.position().top
            } else {
                var x = r.height / 2;
                var T = 0
            }
            i.find(".tp-half-one").css({
                width: r.width + "px",
                height: T + x + "px",
                overflow: "hidden",
                position: "absolute",
                top: "0px",
                left: "0px"
            });
            i.find(".tp-half-two").css({
                width: r.width + "px",
                height: T + x + "px",
                overflow: "hidden",
                position: "absolute",
                top: T + x + "px",
                left: "0px"
            });
            i.find(".tp-half-two .tp-offset").css({
                position: "absolute",
                top: 0 - x - T + "px",
                left: "0px"
            });
            if (!e.support.transition) {
                i.find(".tp-half-one").animate({
                    opacity: 0,
                    top: 0 - r.height / 2 + "px"
                }, {
                    duration: 500,
                    queue: false
                });
                i.find(".tp-half-two").animate({
                    opacity: 0,
                    top: r.height + "px"
                }, {
                    duration: 500,
                    queue: false
                })
            } else {
                var N = Math.round(Math.random() * 40 - 20);
                var C = Math.round(Math.random() * 40 - 20);
                var k = Math.random() * 1 + 1;
                var O = Math.random() * 1 + 1;
                i.find(".tp-half-one").transition({
                    opacity: 1,
                    scale: k,
                    rotate: N,
                    y: 0 - r.height / 1.4 + "px"
                }, 800, "in");
                i.find(".tp-half-two").transition({
                    opacity: 1,
                    scale: O,
                    rotate: C,
                    y: 0 + r.height / 1.4 + "px"
                }, 800, "in");
                if (i.html() != null) o.transition({
                    scale: .8,
                    x: r.width * .1,
                    y: r.height * .1,
                    rotate: N
                }, 0).transition({
                    rotate: 0,
                    scale: 1,
                    x: 0,
                    y: 0
                }, 600, "snap")
            }
            f.find(".defaultimg").css({
                opacity: 1
            });
            setTimeout(function () {
                i.css({
                    position: "absolute",
                    "z-index": 18
                });
                o.css({
                    position: "absolute",
                    "z-index": 20
                });
                f.find(".defaultimg").css({
                    opacity: 1
                });
                a.find(".defaultimg").css({
                    opacity: 0
                });
                if (i.find(".tp-half-one").length > 0) {
                    i.find(".tp-half-one >img, .tp-half-one >div").unwrap()
                }
                i.find(".tp-half-two").remove();
                r.transition = 0;
                r.act = r.next
            }, 800);
            o.css({
                opacity: 1
            })
        }
        if (l == 17) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            o.css({
                opacity: 1
            });
            g(a, r, true);
            g(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.transition({
                    opacity: 0,
                    rotateY: 350,
                    rotateX: 40,
                    perspective: "1400px"
                }, 0);
                setTimeout(function () {
                    s.transition({
                        opacity: 1,
                        top: 0,
                        left: 0,
                        scale: 1,
                        perspective: "150px",
                        rotate: 0,
                        rotateY: 0,
                        rotateX: 0
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            b(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (o.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            u(n)
                        }
                    })
                }, t * 100)
            })
        }
        if (l == 18) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            o.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.transition({
                    rotateX: 10,
                    rotateY: 310,
                    perspective: "1400px",
                    rotate: 0,
                    opacity: 0
                }, 0);
                setTimeout(function () {
                    s.transition({
                        top: 0,
                        left: 0,
                        scale: 1,
                        perspective: "150px",
                        rotate: 0,
                        rotateY: 0,
                        rotateX: 0,
                        opacity: 1
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            b(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (o.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            u(n)
                        }
                    })
                }, t * 100)
            })
        }
        if (l == 19) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            o.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            var M = o.css("z-index");
            var _ = i.css("z-index");
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.parent().css({
                    overflow: "visible"
                });
                s.css({
                    background: "#333"
                });
                if (c == 1) s.transition({
                    opacity: 0,
                    left: 0,
                    top: r.height / 2,
                    rotate3d: "1, 0, 0, -90deg "
                }, 0);
                else s.transition({
                    opacity: 0,
                    left: 0,
                    top: 0 - r.height / 2,
                    rotate3d: "1, 0, 0, 90deg "
                }, 0);
                setTimeout(function () {
                    s.transition({
                        opacity: 1,
                        top: 0,
                        perspective: r.height * 2,
                        rotate3d: " 1, 0, 0, 0deg "
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            b(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (o.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            u(n)
                        }
                    })
                }, t * 150)
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.parent().css({
                    overflow: "visible"
                });
                n.css({
                    background: "#333"
                });
                n.transition({
                    top: 0,
                    rotate3d: "1, 0, 0, 0deg"
                }, 0);
                a.find(".defaultimg").css({
                    opacity: 0
                });
                setTimeout(function () {
                    if (c == 1) n.transition({
                        opacity: .6,
                        left: 0,
                        perspective: r.height * 2,
                        top: 0 - r.height / 2,
                        rotate3d: "1, 0, 0, 90deg"
                    }, h * 2, function () {});
                    else n.transition({
                        opacity: .6,
                        left: 0,
                        perspective: r.height * 2,
                        top: 0 + r.height / 2,
                        rotate3d: "1, 0, 0, -90deg"
                    }, h * 2, function () {})
                }, t * 150)
            })
        }
        if (l == 20) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            o.css({
                opacity: 1
            });
            g(a, r, true);
            g(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.parent().css({
                    overflow: "visible"
                });
                if (c == 1) s.transition({
                    scale: .8,
                    top: 0,
                    left: 0 - r.width,
                    rotate3d: "2, 5, 0, 110deg"
                }, 0);
                else s.transition({
                    scale: .8,
                    top: 0,
                    left: 0 + r.width,
                    rotate3d: "2, 5, 0, -110deg"
                }, 0);
                setTimeout(function () {
                    s.transition({
                        scale: .8,
                        left: 0,
                        perspective: r.width,
                        rotate3d: "1, 5, 0, 0deg"
                    }, h * 2, "ease").transition({
                        scale: 1
                    }, 200, "out", function () {
                        if (t == r.slots - 1) {
                            b(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (o.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            u(n)
                        }
                    })
                }, t * 100)
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transition({
                    scale: .5,
                    left: 0,
                    rotate3d: "1, 5, 0, 5deg"
                }, 300, "in-out");
                a.find(".defaultimg").css({
                    opacity: 0
                });
                setTimeout(function () {
                    if (c == 1) n.transition({
                        top: 0,
                        left: r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, -3, 0, 70deg",
                        opacity: 0
                    }, h * 2, "out", function () {});
                    else n.transition({
                        top: 0,
                        left: 0 - r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, -3, 0, -70deg",
                        opacity: 0
                    }, h * 2, "out", function () {})
                }, t * 100)
            })
        }
        if (l == 21) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            o.css({
                opacity: 1
            });
            g(a, r, true);
            g(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (c == 1) s.transition({
                    top: 0,
                    left: 0 - r.width,
                    rotate3d: "0, 1, 0, 90deg"
                }, 0);
                else s.transition({
                    top: 0,
                    left: 0 + r.width,
                    rotate3d: "0, 1, 0, -90deg"
                }, 0);
                setTimeout(function () {
                    s.transition({
                        left: 0,
                        perspective: r.width * 2,
                        rotate3d: "0, 0, 0, 0deg"
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            b(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (o.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            u(n)
                        }
                    })
                }, t * 100)
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transition({
                    left: 0,
                    rotate3d: "0, 0, 0, 0deg"
                }, 0);
                a.find(".defaultimg").css({
                    opacity: 0
                });
                setTimeout(function () {
                    if (c == 1) n.transition({
                        top: 0,
                        left: r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, 1, 0, -90deg"
                    }, h * 1.5, function () {});
                    else n.transition({
                        top: 0,
                        left: 0 - r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, 1, 0, +90deg"
                    }, h * 1.5, function () {})
                }, t * 100)
            })
        }
        var D = {};
        D.slideIndex = r.next + 1;
        n.trigger("revolution.slide.onchange", D);
        setTimeout(function () {
            n.trigger("revolution.slide.onafterswap")
        }, h);
        n.trigger("revolution.slide.onvideostop")
    }

    function S() {}

    function x(t) {
        if (t.data == YT.PlayerState.PLAYING) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            n.stop();
            r.videoplaying = true;
            r.videostartednow = 1
        } else {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            if (r.conthover == 0) n.animate({
                width: "100%"
            }, {
                duration: r.delay - r.cd - 100,
                queue: false,
                easing: "linear"
            });
            r.videoplaying = false;
            r.videostoppednow = 1
        }
    }

    function T(e) {
        e.target.playVideo()
    }

    function N(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, false)
        } else {
            e.attachEvent(t, n, false)
        }
    }

    function C(t) {
        var n = $f(t);
        n.addEvent("ready", function (t) {
            n.addEvent("play", function (t) {
                var n = e("body").find(".tp-bannertimer");
                var r = n.data("opt");
                n.stop();
                r.videoplaying = true
            });
            n.addEvent("finish", function (t) {
                var n = e("body").find(".tp-bannertimer");
                var r = n.data("opt");
                if (r.conthover == 0) n.animate({
                    width: "100%"
                }, {
                    duration: r.delay - r.cd - 100,
                    queue: false,
                    easing: "linear"
                });
                r.videoplaying = false;
                r.videostartednow = 1
            });
            n.addEvent("pause", function (t) {
                var n = e("body").find(".tp-bannertimer");
                var r = n.data("opt");
                if (r.conthover == 0) n.animate({
                    width: "100%"
                }, {
                    duration: r.delay - r.cd - 100,
                    queue: false,
                    easing: "linear"
                });
                r.videoplaying = false;
                r.videostoppednow = 1
            })
        })
    }

    function k(t) {
        var n = $f(t);
        n.addEvent("ready", function (e) {
            n.api("play")
        });
        n.addEvent("play", function (t) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            n.stop();
            r.videoplaying = true
        });
        n.addEvent("finish", function (t) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            if (r.conthover == 0) n.animate({
                width: "100%"
            }, {
                duration: r.delay - r.cd - 100,
                queue: false,
                easing: "linear"
            });
            r.videoplaying = false;
            r.videostartednow = 1
        });
        n.addEvent("pause", function (t) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            if (r.conthover == 0) n.animate({
                width: "100%"
            }, {
                duration: r.delay - r.cd - 100,
                queue: false,
                easing: "linear"
            });
            r.videoplaying = false;
            r.videostoppednow = 1
        })
    }

    function L(n, r, i) {
        var s = 0;
        n.find(".tp-caption").each(function (i) {
            s = r.width / 2 - r.startwidth / 2;
            if (r.bh > 1) {
                r.bw = 1;
                r.bh = 1
            }
            if (r.bw > 1) {
                r.bw = 1;
                r.bh = 1
            }
            var o = r.bw;
            var u = r.bh;
            var a = n.find(".tp-caption:eq(" + i + ")");
            var f = 0;
            if (r.width < r.hideCaptionAtLimit && a.data("captionhidden") == "on") {
                a.addClass("tp-hidden-caption");
                f = 1
            } else {
                if (r.width < r.hideAllCaptionAtLilmit) {
                    a.addClass("tp-hidden-caption");
                    f = 1
                } else {
                    a.removeClass("tp-hidden-caption")
                }
            }
            a.stop(true, true);
            if (f == 0) {
                if (a.data("linktoslide") != t) {
                    a.css({
                        cursor: "pointer"
                    });
                    if (a.data("linktoslide") != "no") {
                        a.click(function () {
                            var t = e(this);
                            var n = t.data("linktoslide");
                            if (n != "next" && n != "prev") {
                                r.container.data("showus", n);
                                r.container.parent().find(".tp-rightarrow").click()
                            } else if (n == "next") r.container.parent().find(".tp-rightarrow").click();
                            else if (n == "prev") r.container.parent().find(".tp-leftarrow").click()
                        })
                    }
                }
                if (a.hasClass("coloredbg")) s = 0;
                if (s < 0) s = 0;
                var l = 0;
                clearTimeout(a.data("timer"));
                clearTimeout(a.data("timer-end"));
                var c = "iframe" + Math.round(Math.random() * 1e3 + 1);
                if (a.find("iframe").length > 0) {
                    a.find("iframe").each(function () {
                        var n = e(this);
                        if (n.attr("src").toLowerCase().indexOf("youtube") >= 0) {
                            if (!n.hasClass("HasListener")) {
                                try {
                                    n.attr("id", c);
                                    var r;
                                    if (a.data("autoplay") == true) r = new YT.Player(c, {
                                        events: {
                                            onStateChange: x,
                                            onReady: T
                                        }
                                    });
                                    else r = new YT.Player(c, {
                                        events: {
                                            onStateChange: x
                                        }
                                    });
                                    n.addClass("HasListener");
                                    a.data("player", r)
                                } catch (i) {}
                            } else {
                                if (a.data("autoplay") == true) {
                                    var r = a.data("player");
                                    r.playVideo()
                                }
                            }
                        } else {
                            if (n.attr("src").toLowerCase().indexOf("vimeo") >= 0) {
                                if (!n.hasClass("HasListener")) {
                                    n.addClass("HasListener");
                                    n.attr("id", c);
                                    var s = n.attr("src");
                                    var o = {}, u = s,
                                        f = /([^&=]+)=([^&]*)/g,
                                        l;
                                    while (l = f.exec(u)) {
                                        o[decodeURIComponent(l[1])] = decodeURIComponent(l[2])
                                    }
                                    if (o["player_id"] != t) {
                                        s = s.replace(o["player_id"], c)
                                    } else {
                                        s = s + "&player_id=" + c
                                    }
                                    try {
                                        s = s.replace("api=0", "api=1")
                                    } catch (i) {}
                                    s = s + "&api=1";
                                    n.attr("src", s);
                                    var r = a.find("iframe")[0];
                                    if (a.data("autoplay") == true) $f(r).addEvent("ready", k);
                                    else $f(r).addEvent("ready", C)
                                } else {
                                    if (a.data("autoplay") == true) {
                                        var n = a.find("iframe");
                                        var h = n.attr("id");
                                        var p = $f(h);
                                        p.api("pause")
                                    }
                                }
                            }
                        }
                    })
                }
                if (a.hasClass("randomrotate") && (r.ie || r.ie9)) a.removeClass("randomrotate").addClass("sfb");
                a.removeClass("noFilterClass");
                var h = 0;
                var p = 0;
                if (a.find("img").length > 0) {
                    var d = a.find("img");
                    if (d.data("ww") == t) d.data("ww", d.width());
                    if (d.data("hh") == t) d.data("hh", d.height());
                    var v = d.data("ww");
                    var m = d.data("hh");
                    d.width(v * r.bw);
                    d.height(m * r.bh);
                    h = d.width();
                    p = d.height()
                } else {
                    if (a.find("iframe").length > 0) {
                        var d = a.find("iframe");
                        if (a.data("ww") == t) {
                            a.data("ww", d.width())
                        }
                        if (a.data("hh") == t) a.data("hh", d.height());
                        var v = a.data("ww");
                        var m = a.data("hh");
                        var g = a;
                        if (g.data("fsize") == t) g.data("fsize", parseInt(g.css("font-size"), 0) || 0);
                        if (g.data("pt") == t) g.data("pt", parseInt(g.css("paddingTop"), 0) || 0);
                        if (g.data("pb") == t) g.data("pb", parseInt(g.css("paddingBottom"), 0) || 0);
                        if (g.data("pl") == t) g.data("pl", parseInt(g.css("paddingLeft"), 0) || 0);
                        if (g.data("pr") == t) g.data("pr", parseInt(g.css("paddingRight"), 0) || 0);
                        if (g.data("mt") == t) g.data("mt", parseInt(g.css("marginTop"), 0) || 0);
                        if (g.data("mb") == t) g.data("mb", parseInt(g.css("marginBottom"), 0) || 0);
                        if (g.data("ml") == t) g.data("ml", parseInt(g.css("marginLeft"), 0) || 0);
                        if (g.data("mr") == t) g.data("mr", parseInt(g.css("marginRight"), 0) || 0);
                        if (g.data("bt") == t) g.data("bt", parseInt(g.css("borderTop"), 0) || 0);
                        if (g.data("bb") == t) g.data("bb", parseInt(g.css("borderBottom"), 0) || 0);
                        if (g.data("bl") == t) g.data("bl", parseInt(g.css("borderLeft"), 0) || 0);
                        if (g.data("br") == t) g.data("br", parseInt(g.css("borderRight"), 0) || 0);
                        if (g.data("lh") == t) g.data("lh", parseInt(g.css("lineHeight"), 0) || 0);
                        var y = r.width;
                        var b = r.height;
                        if (y > r.startwidth) y = r.startwidth;
                        if (b > r.startheight) b = r.startheight;
                        if (!a.hasClass("fullscreenvideo")) a.css({
                            "font-size": g.data("fsize") * r.bw + "px",
                            "padding-top": g.data("pt") * r.bh + "px",
                            "padding-bottom": g.data("pb") * r.bh + "px",
                            "padding-left": g.data("pl") * r.bw + "px",
                            "padding-right": g.data("pr") * r.bw + "px",
                            "margin-top": g.data("mt") * r.bh + "px",
                            "margin-bottom": g.data("mb") * r.bh + "px",
                            "margin-left": g.data("ml") * r.bw + "px",
                            "margin-right": g.data("mr") * r.bw + "px",
                            "border-top": g.data("bt") * r.bh + "px",
                            "border-bottom": g.data("bb") * r.bh + "px",
                            "border-left": g.data("bl") * r.bw + "px",
                            "border-right": g.data("br") * r.bw + "px",
                            "line-height": g.data("lh") * r.bh + "px",
                            height: m * r.bh + "px",
                            "white-space": "nowrap"
                        });
                        else a.css({
                            width: r.startwidth * r.bw,
                            height: r.startheight * r.bh
                        });
                        d.width(v * r.bw);
                        d.height(m * r.bh);
                        h = d.width();
                        p = d.height()
                    } else {
                        var g = a;
                        if (g.data("fsize") == t) g.data("fsize", parseInt(g.css("font-size"), 0) || 0);
                        if (g.data("pt") == t) g.data("pt", parseInt(g.css("paddingTop"), 0) || 0);
                        if (g.data("pb") == t) g.data("pb", parseInt(g.css("paddingBottom"), 0) || 0);
                        if (g.data("pl") == t) g.data("pl", parseInt(g.css("paddingLeft"), 0) || 0);
                        if (g.data("pr") == t) g.data("pr", parseInt(g.css("paddingRight"), 0) || 0);
                        if (g.data("mt") == t) g.data("mt", parseInt(g.css("marginTop"), 0) || 0);
                        if (g.data("mb") == t) g.data("mb", parseInt(g.css("marginBottom"), 0) || 0);
                        if (g.data("ml") == t) g.data("ml", parseInt(g.css("marginLeft"), 0) || 0);
                        if (g.data("mr") == t) g.data("mr", parseInt(g.css("marginRight"), 0) || 0);
                        if (g.data("bt") == t) g.data("bt", parseInt(g.css("borderTop"), 0) || 0);
                        if (g.data("bb") == t) g.data("bb", parseInt(g.css("borderBottom"), 0) || 0);
                        if (g.data("bl") == t) g.data("bl", parseInt(g.css("borderLeft"), 0) || 0);
                        if (g.data("br") == t) g.data("br", parseInt(g.css("borderRight"), 0) || 0);
                        if (g.data("lh") == t) g.data("lh", parseInt(g.css("lineHeight"), 0) || 0);
                        a.css({
                            "font-size": g.data("fsize") * r.bw + "px",
                            "padding-top": g.data("pt") * r.bh + "px",
                            "padding-bottom": g.data("pb") * r.bh + "px",
                            "padding-left": g.data("pl") * r.bw + "px",
                            "padding-right": g.data("pr") * r.bw + "px",
                            "margin-top": g.data("mt") * r.bh + "px",
                            "margin-bottom": g.data("mb") * r.bh + "px",
                            "margin-left": g.data("ml") * r.bw + "px",
                            "margin-right": g.data("mr") * r.bw + "px",
                            "border-top": g.data("bt") * r.bh + "px",
                            "border-bottom": g.data("bb") * r.bh + "px",
                            "border-left": g.data("bl") * r.bw + "px",
                            "border-right": g.data("br") * r.bw + "px",
                            "line-height": g.data("lh") * r.bh + "px",
                            "white-space": "nowrap"
                        });
                        p = a.outerHeight(true);
                        h = a.outerWidth(true)
                    }
                } if (a.data("x") == "center" || a.data("xcenter") == "center") {
                    a.data("xcenter", "center");
                    a.data("x", (r.width / 2 - a.outerWidth(true) / 2) / o - s)
                }
                if (a.data("y") == "center" || a.data("ycenter") == "center") {
                    a.data("ycenter", "center");
                    a.data("y", (r.height / 2 - a.outerHeight(true) / 2) / r.bh)
                }
                if (a.hasClass("fade")) {
                    a.css({
                        opacity: 0,
                        left: o * a.data("x") + s + "px",
                        top: r.bh * a.data("y") + "px"
                    })
                }
                if (a.hasClass("randomrotate")) {
                    a.css({
                        left: o * a.data("x") + s + "px",
                        top: u * a.data("y") + l + "px"
                    });
                    var w = Math.random() * 2 + 1;
                    var E = Math.round(Math.random() * 200 - 100);
                    var S = Math.round(Math.random() * 200 - 100);
                    var N = Math.round(Math.random() * 200 - 100);
                    a.data("repx", S);
                    a.data("repy", N);
                    a.data("repo", a.css("opacity"));
                    a.data("rotate", E);
                    a.data("scale", w);
                    a.transition({
                        opacity: 0,
                        scale: w,
                        rotate: E,
                        x: S,
                        y: N,
                        duration: "0ms"
                    })
                } else {
                    if (r.ie || r.ie9) {} else {
                        if (a.find("iframe").length == 0) a.transition({
                            scale: 1,
                            rotate: 0
                        })
                    }
                } if (a.hasClass("lfr")) {
                    a.css({
                        opacity: 1,
                        left: 15 + r.width + "px",
                        top: r.bh * a.data("y") + "px"
                    })
                }
                if (a.hasClass("lfl")) {
                    a.css({
                        opacity: 1,
                        left: -15 - h + "px",
                        top: r.bh * a.data("y") + "px"
                    })
                }
                if (a.hasClass("sfl")) {
                    a.css({
                        opacity: 0,
                        left: o * a.data("x") - 50 + s + "px",
                        top: r.bh * a.data("y") + "px"
                    })
                }
                if (a.hasClass("sfr")) {
                    a.css({
                        opacity: 0,
                        left: o * a.data("x") + 50 + s + "px",
                        top: r.bh * a.data("y") + "px"
                    })
                }
                if (a.hasClass("lft")) {
                    a.css({
                        opacity: 1,
                        left: o * a.data("x") + s + "px",
                        top: -25 - p + "px"
                    })
                }
                if (a.hasClass("lfb")) {
                    a.css({
                        opacity: 1,
                        left: o * a.data("x") + s + "px",
                        top: 25 + r.height + "px"
                    })
                }
                if (a.hasClass("sft")) {
                    a.css({
                        opacity: 0,
                        left: o * a.data("x") + s + "px",
                        top: r.bh * a.data("y") - 50 + "px"
                    })
                }
                if (a.hasClass("sfb")) {
                    a.css({
                        opacity: 0,
                        left: o * a.data("x") + s + "px",
                        top: r.bh * a.data("y") + 50 + "px"
                    })
                }
                a.data("timer", setTimeout(function () {
                    a.css({
                        visibility: "visible"
                    });
                    if (a.hasClass("fade")) {
                        a.data("repo", a.css("opacity"));
                        a.animate({
                            opacity: 1
                        }, {
                            duration: a.data("speed"),
                            complete: function () {
                                if (r.ie) e(this).addClass("noFilterClass")
                            }
                        })
                    }
                    if (a.hasClass("randomrotate")) {
                        a.transition({
                            opacity: 1,
                            scale: 1,
                            left: o * a.data("x") + s + "px",
                            top: u * a.data("y") + l + "px",
                            rotate: 0,
                            x: 0,
                            y: 0,
                            duration: a.data("speed")
                        });
                        if (r.ie) a.addClass("noFilterClass")
                    }
                    if (a.hasClass("lfr") || a.hasClass("lfl") || a.hasClass("sfr") || a.hasClass("sfl") || a.hasClass("lft") || a.hasClass("lfb") || a.hasClass("sft") || a.hasClass("sfb")) {
                        var n = a.data("easing");
                        if (n == t) n = "linear";
                        a.data("repx", a.position().left);
                        a.data("repy", a.position().top);
                        a.data("repo", a.css("opacity"));
                        a.animate({
                            opacity: 1,
                            left: o * a.data("x") + s + "px",
                            top: r.bh * a.data("y") + "px"
                        }, {
                            duration: a.data("speed"),
                            easing: n,
                            complete: function () {
                                if (r.ie) e(this).addClass("noFilterClass")
                            }
                        })
                    }
                }, a.data("start")));
                if (a.data("end") != t) a.data("timer-end", setTimeout(function () {
                    if ((r.ie || r.ie9) && (a.hasClass("randomrotate") || a.hasClass("randomrotateout"))) {
                        a.removeClass("randomrotate").removeClass("randomrotateout").addClass("fadeout")
                    }
                    O(a, r)
                }, a.data("end")))
            }
        });
        var o = jQuery("body").find("#" + r.container.attr("id")).find(".tp-bannertimer");
        o.data("opt", r)
    }

    function A(e, t) {
        e.find(".tp-caption").each(function (n) {
            var r = e.find(".tp-caption:eq(" + n + ")");
            r.stop(true, true);
            clearTimeout(r.data("timer"));
            clearTimeout(r.data("timer-end"));
            var i = r.data("easing");
            i = "easeInOutSine";
            var s = r.data("repx");
            var o = r.data("repy");
            var u = r.data("repo");
            var a = r.data("rotate");
            var f = r.data("scale");
            if (r.find("iframe").length > 0) {
                try {
                    var l = r.find("iframe");
                    var c = l.attr("id");
                    var h = $f(c);
                    h.api("pause")
                } catch (p) {}
                try {
                    var d = r.data("player");
                    d.stopVideo()
                } catch (p) {}
            }
            try {
                O(r, t)
            } catch (p) {}
        })
    }

    function O(n, r) {
        if (n.hasClass("randomrotate") && (r.ie || r.ie9)) n.removeClass("randomrotate").addClass("sfb");
        if (n.hasClass("randomrotateout") && (r.ie || r.ie9)) n.removeClass("randomrotateout").addClass("stb");
        var i = n.data("endspeed");
        if (i == t) i = n.data("speed");
        var s = n.data("repx");
        var o = n.data("repy");
        var u = n.data("repo");
        if (r.ie) {
            n.css({
                opacity: "inherit",
                filter: "inherit"
            })
        }
        if (n.hasClass("ltr") || n.hasClass("ltl") || n.hasClass("str") || n.hasClass("stl") || n.hasClass("ltt") || n.hasClass("ltb") || n.hasClass("stt") || n.hasClass("stb")) {
            s = n.position().left;
            o = n.position().top;
            if (n.hasClass("ltr")) s = r.width + 60;
            else if (n.hasClass("ltl")) s = 0 - n.width() - 60;
            else if (n.hasClass("ltt")) o = 0 - n.height() - 60;
            else if (n.hasClass("ltb")) o = r.height + 60;
            else if (n.hasClass("str")) {
                s = s + 50;
                u = 0
            } else if (n.hasClass("stl")) {
                s = s - 50;
                u = 0
            } else if (n.hasClass("stt")) {
                o = o - 50;
                u = 0
            } else if (n.hasClass("stb")) {
                o = o + 50;
                u = 0
            }
            var a = n.data("endeasing");
            if (a == t) a = "linear";
            n.animate({
                opacity: u,
                left: s + "px",
                top: o + "px"
            }, {
                duration: n.data("endspeed"),
                easing: a,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("randomrotateout")) {
            n.transition({
                opacity: 0,
                scale: Math.random() * 2 + .3,
                left: Math.random() * r.width + "px",
                top: Math.random() * r.height + "px",
                rotate: Math.random() * 40,
                duration: i,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("fadeout")) {
            if (r.ie) n.removeClass("noFilterClass");
            n.animate({
                opacity: 0
            }, {
                duration: 200,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            })
        } else if (n.hasClass("lfr") || n.hasClass("lfl") || n.hasClass("sfr") || n.hasClass("sfl") || n.hasClass("lft") || n.hasClass("lfb") || n.hasClass("sft") || n.hasClass("sfb")) {
            if (n.hasClass("lfr")) s = r.width + 60;
            else if (n.hasClass("lfl")) s = 0 - n.width() - 60;
            else if (n.hasClass("lft")) o = 0 - n.height() - 60;
            else if (n.hasClass("lfb")) o = r.height + 60;
            var a = n.data("endeasing");
            if (a == t) a = "linear";
            n.animate({
                opacity: u,
                left: s + "px",
                top: o + "px"
            }, {
                duration: n.data("endspeed"),
                easing: a,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("fade")) {
            n.animate({
                opacity: 0
            }, {
                duration: i,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("randomrotate")) {
            n.transition({
                opacity: 0,
                scale: Math.random() * 2 + .3,
                left: Math.random() * r.width + "px",
                top: Math.random() * r.height + "px",
                rotate: Math.random() * 40,
                duration: i
            });
            if (r.ie) n.removeClass("noFilterClass")
        }
    }

    function M(t, n) {
        t.children().each(function () {
            try {
                e(this).die("click")
            } catch (t) {}
            try {
                e(this).die("mouseenter")
            } catch (t) {}
            try {
                e(this).die("mouseleave")
            } catch (t) {}
            try {
                e(this).unbind("hover")
            } catch (t) {}
        });
        try {
            $container.die("click", "mouseenter", "mouseleave")
        } catch (r) {}
        clearInterval(n.cdint);
        t = null
    }

    function _(n, r) {
        r.cd = 0;
        r.loop = 0;
        if (r.stopAfterLoops != t && r.stopAfterLoops > -1) r.looptogo = r.stopAfterLoops;
        else r.looptogo = 9999999; if (r.stopAtSlide != t && r.stopAtSlide > -1) r.lastslidetoshow = r.stopAtSlide;
        else r.lastslidetoshow = 999;
        r.stopLoop = "off";
        if (r.looptogo == 0) r.stopLoop = "on";
        if (r.slideamount > 1 && !(r.stopAfterLoops == 0 && r.stopAtSlide == 1)) {
            var i = n.find(".tp-bannertimer");
            if (i.length > 0) {
                i.css({
                    width: "0%"
                });
                i.animate({
                    width: "100%"
                }, {
                    duration: r.delay - 100,
                    queue: false,
                    easing: "linear"
                })
            }
            i.data("opt", r);
            r.cdint = setInterval(function () {
                if (e("body").find(n).length == 0) M(n, r);
                if (n.data("conthover-changed") == 1) {
                    r.conthover = n.data("conthover");
                    n.data("conthover-changed", 0)
                }
                if (r.conthover != 1 && r.videoplaying != true && r.width > r.hideSliderAtLimit) r.cd = r.cd + 100;
                if (r.fullWidth != "on")
                    if (r.width > r.hideSliderAtLimit) n.parent().removeClass("tp-hide-revslider");
                    else n.parent().addClass("tp-hide-revslider");
                if (r.videostartednow == 1) {
                    n.trigger("revolution.slide.onvideoplay");
                    r.videostartednow = 0
                }
                if (r.videostoppednow == 1) {
                    n.trigger("revolution.slide.onvideostop");
                    r.videostoppednow = 0
                }
                if (r.cd >= r.delay) {
                    r.cd = 0;
                    r.act = r.next;
                    r.next = r.next + 1;
                    if (r.next > n.find(">ul >li").length - 1) {
                        r.next = 0;
                        r.looptogo = r.looptogo - 1;
                        if (r.looptogo <= 0) {
                            r.stopLoop = "on"
                        }
                    }
                    if (r.stopLoop == "on" && r.next == r.lastslidetoshow - 1) {
                        clearInterval(r.cdint);
                        n.find(".tp-bannertimer").css({
                            visibility: "hidden"
                        });
                        n.trigger("revolution.slide.onstop")
                    }
                    E(n, r);
                    if (i.length > 0) {
                        i.css({
                            width: "0%"
                        });
                        i.animate({
                            width: "100%"
                        }, {
                            duration: r.delay - 100,
                            queue: false,
                            easing: "linear"
                        })
                    }
                }
            }, 100);
            n.hover(function () {
                if (r.onHoverStop == "on") {
                    r.conthover = 1;
                    i.stop();
                    n.trigger("revolution.slide.onpause")
                }
            }, function () {
                if (n.data("conthover") != 1) {
                    n.trigger("revolution.slide.onresume");
                    r.conthover = 0;
                    if (r.onHoverStop == "on" && r.videoplaying != true) {
                        i.animate({
                            width: "100%"
                        }, {
                            duration: r.delay - r.cd - 100,
                            queue: false,
                            easing: "linear"
                        })
                    }
                }
            })
        }
    }
    e.fn.extend({
        revolution: function (i) {
            e.fn.revolution.defaults = {
                delay: 9e3,
                startheight: 500,
                startwidth: 960,
                hideThumbs: 200,
                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,
                navigationType: "bullet",
                navigationArrows: "withbullet",
                navigationStyle: "round",
                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,
                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,
                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,
                touchenabled: "on",
                onHoverStop: "on",
                stopAtSlide: -1,
                stopAfterLoops: -1,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                hideSliderAtLimit: 0,
                shadow: 1,
                fullWidth: "off"
            };
            i = e.extend({}, e.fn.revolution.defaults, i);
            return this.each(function () {
                var s = i;
                var u = e(this);
                if (!u.hasClass("revslider-initialised")) {
                    u.addClass("revslider-initialised");
                    s.firefox13 = false;
                    s.ie = !e.support.opacity;
                    s.ie9 = document.documentMode == 9;
                    var a = e.fn.jquery.split("."),
                        p = parseFloat(a[0]),
                        d = parseFloat(a[1]),
                        m = parseFloat(a[2] || "0");
                    if (p == 1 && d < 7) {
                        u.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + a + " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>")
                    }
                    if (!e.support.transition) e.fn.transition = e.fn.animate;
                    e.cssEase["bounce"] = "cubic-bezier(0,1,0.5,1.3)";
                    u.find(".caption").each(function () {
                        e(this).addClass("tp-caption")
                    });
                    u.find(".tp-caption iframe").each(function () {
                        try {
                            if (e(this).attr("src").indexOf("you") > 0) {
                                var t = document.createElement("script");
                                t.src = "http://www.youtube.com/player_api";
                                var n = document.getElementsByTagName("script")[0];
                                n.parentNode.insertBefore(t, n)
                            }
                        } catch (r) {}
                    });
                    u.find(".tp-caption iframe").each(function () {
                        try {
                            if (e(this).attr("src").indexOf("vim") > 0) {
                                var t = document.createElement("script");
                                t.src = "http://a.vimeocdn.com/js/froogaloop2.min.js";
                                var n = document.getElementsByTagName("script")[0];
                                n.parentNode.insertBefore(t, n)
                            }
                        } catch (r) {}
                    });
                    if (s.shuffle == "on") {
                        for (var g = 0; g < u.find(">ul:first-child >li").length; g++) {
                            var y = Math.round(Math.random() * u.find(">ul:first-child >li").length);
                            u.find(">ul:first-child >li:eq(" + y + ")").prependTo(u.find(">ul:first-child"))
                        }
                    }
                    s.slots = 4;
                    s.act = -1;
                    s.next = 0;
                    if (s.startWithSlide != t) s.next = s.startWithSlide;
                    var b = n("#")[0];
                    if (b.length < 9) {
                        if (b.split("slide").length > 1) {
                            var w = parseInt(b.split("slide")[1], 0);
                            if (w < 1) w = 1;
                            if (w > u.find(">ul:first >li").length) w = u.find(">ul:first >li").length;
                            s.next = w - 1
                        }
                    }
                    s.origcd = s.delay;
                    s.firststart = 1;
                    if (s.navigationHOffset == t) s.navOffsetHorizontal = 0;
                    if (s.navigationVOffset == t) s.navOffsetVertical = 0;
                    u.append('<div class="tp-loader"></div>');
                    if (u.find(".tp-bannertimer").length == 0) u.append('<div class="tp-bannertimer" style="visibility:hidden"></div>');
                    var S = u.find(".tp-bannertimer");
                    if (S.length > 0) {
                        S.css({
                            width: "0%"
                        })
                    }
                    u.addClass("tp-simpleresponsive");
                    s.container = u;
                    s.slideamount = u.find(">ul:first >li").length;
                    if (u.height() == 0) u.height(s.startheight);
                    if (s.startwidth == t || s.startwidth == 0) s.startwidth = u.width();
                    if (s.startheight == t || s.startheight == 0) s.startheight = u.height();
                    s.width = u.width();
                    s.height = u.height();
                    s.bw = s.startwidth / u.width();
                    s.bh = s.startheight / u.height();
                    if (s.width != s.startwidth) {
                        s.height = Math.round(s.startheight * (s.width / s.startwidth));
                        u.height(s.height)
                    }
                    if (s.shadow != 0) {
                        u.parent().append('<div class="tp-bannershadow tp-shadow' + s.shadow + '"></div>');
                        u.parent().find(".tp-bannershadow").css({
                            width: s.width
                        })
                    }
                    u.find("ul").css({
                        display: "none"
                    });
                    u.waitForImages(function () {
                        u.find("ul").css({
                            display: "block"
                        });
                        v(u, s);
                        if (s.slideamount > 1) f(u, s);
                        if (s.slideamount > 1) o(u, s);
                        if (s.slideamount > 1) l(u, s);
                        e("#unvisible_button").click(function () {
                            s.navigationArrows = e(".selectnavarrows").val();
                            s.navigationType = e(".selectnavtype").val();
                            s.navigationStyle = e(".selectnavstyle").val();
                            s.soloArrowStyle = "default";
                            e(".tp-bullets").remove();
                            e(".tparrows").remove();
                            if (s.slideamount > 1) f(u, s);
                            if (s.slideamount > 1) o(u, s);
                            if (s.slideamount > 1) l(u, s)
                        });
                        c(u, s);
                        if (s.hideThumbs > 0) h(u, s);
                        u.waitForImages(function () {
                            u.find(".tp-loader").fadeOut(600);
                            setTimeout(function () {
                                E(u, s);
                                if (s.slideamount > 1) _(u, s);
                                u.trigger("revolution.slide.onloaded")
                            }, 600)
                        })
                    });
                    e(window).resize(function () {
                        if (e("body").find(u) != 0)
                            if (u.outerWidth(true) != s.width) {
                                r(u, s)
                            }
                    })
                }
            })
        },
        revpause: function (t) {
            return this.each(function () {
                var t = e(this);
                t.data("conthover", 1);
                t.data("conthover-changed", 1);
                t.trigger("revolution.slide.onpause");
                var n = t.parent().find(".tp-bannertimer");
                n.stop()
            })
        },
        revresume: function (t) {
            return this.each(function () {
                var t = e(this);
                t.data("conthover", 0);
                t.data("conthover-changed", 1);
                t.trigger("revolution.slide.onresume");
                var n = t.parent().find(".tp-bannertimer");
                var r = n.data("opt");
                n.animate({
                    width: "100%"
                }, {
                    duration: r.delay - r.cd - 100,
                    queue: false,
                    easing: "linear"
                })
            })
        },
        revnext: function (t) {
            return this.each(function () {
                var t = e(this);
                t.parent().find(".tp-rightarrow").click()
            })
        },
        revprev: function (t) {
            return this.each(function () {
                var t = e(this);
                t.parent().find(".tp-leftarrow").click()
            })
        },
        revmaxslide: function (t) {
            return e(this).find(">ul:first-child >li").length
        },
        revcurrentslide: function (t) {
            var n = e(this);
            var r = n.parent().find(".tp-bannertimer");
            var i = r.data("opt");
            return i.act
        },
        revlastslide: function (t) {
            var n = e(this);
            var r = n.parent().find(".tp-bannertimer");
            var i = r.data("opt");
            return i.lastslide
        },
        revshowslide: function (t) {
            return this.each(function () {
                var n = e(this);
                n.data("showus", t);
                n.parent().find(".tp-rightarrow").click()
            })
        }
    })
})(jQuery)