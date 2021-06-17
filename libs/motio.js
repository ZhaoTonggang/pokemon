/*! motio 2.2.2 - 7th Aug 2014 | https://github.com/darsain/motio */
(function (h, C) {
    function l(a, D) {
        function k(c) {
            d.reversed = c;
            s || (b.isPaused = !1, x("play"), s = u(l))
        }

        function l() {
            s = u(l);
            var c = E();
            60 > e.fps && d.lastFrame && d.lastFrame + 1E3 / e.fps + 1 > c || (d.lastFrame = c, v ? (g.x += e.speedX / e.fps, g.y += e.speedY / e.fps, e.bgWidth && Math.abs(g.x) > e.bgWidth && (g.x %= e.bgWidth), e.bgHeight && Math.abs(g.y) > e.bgHeight && (g.y %= e.bgHeight)) : (d.finite ? m = d.immediate ? d.to : m + (m > d.to ? -1 : 1) : d.reversed ? 0 >= --m && (m = q.length - 1) : ++m >= q.length && (m = 0), b.frame = m), y = v ? Math.round(g.x) + "px " + Math.round(g.y) + "px" : q[m],
                y !== A && (a.style.backgroundPosition = A = y), x("frame"), d.finite && d.to === m && (b.pause(), "function" === p(d.callback) && d.callback.call(b)))
        }

        function B(c, b) {
            r = 0;
            for (w = n[c].length; r < w; r++)
                if (n[c][r] === b) return r;
            return -1
        }

        function x(c, a) {
            if (n[c])
                for (r = 0, w = n[c].length; r < w; r++) n[c][r].call(b, c, a)
        }

        function z(c) {
            return h.getComputedStyle ? h.getComputedStyle(a, null)[c] : a.currentStyle[c]
        }

        var e = F(D),
            b = this,
            v = !e.frames,
            q = [],
            n = {},
            d = {},
            m = 0,
            g, y, A, s, r, w;
        b.element = a;
        b.width = e.width || a.clientWidth;
        b.height = e.height || a.clientHeight;
        b.options = e;
        b.isPaused = !0;
        b.pause = function () {
            t(s);
            s = 0;
            d.lastFrame = 0;
            b.isPaused || (b.isPaused = !0, x("pause"));
            return b
        };
        b.play = function (c) {
            d.finite = !1;
            d.callback = C;
            d.immediate = !1;
            k(c);
            return b
        };
        b.toggle = function () {
            b[s ? "pause" : "play"]();
            return b
        };
        b.toStart = function (c, a) {
            return b.to(0, c, a)
        };
        b.toEnd = function (c, a) {
            return b.to(q.length - 1, c, a)
        };
        b.to = function (c, a, f) {
            if (v || isNaN(parseFloat(c)) || !isFinite(c) || 0 > c || c >= q.length) return b;
            "function" === p(a) && (f = a, a = !1);
            if (c === m)
                if (0 === c) m = q.length;
                else if (c === q.length -
                1) m = -1;
            else return "function" === p(f) && f.call(b), b.pause(), b;
            d.finite = !0;
            d.to = c;
            d.immediate = !!a;
            d.callback = f;
            k();
            return b
        };
        b.set = function (c, a) {
            e[c] = a;
            return b
        };
        b.on = function (c, a) {
            if ("object" === p(c))
                for (var f in c) {
                    if (c.hasOwnProperty(f)) b.on(f, c[f])
                } else if ("function" === p(a)) {
                    f = c.split(" ");
                    for (var d = 0, e = f.length; d < e; d++) n[f[d]] = n[f[d]] || [], -1 === B(f[d], a) && n[f[d]].push(a)
                } else if ("array" === p(a))
                for (f = 0, d = a.length; f < d; f++) b.on(c, a[f]);
            return b
        };
        b.off = function (a, d) {
            if (d instanceof Array)
                for (var f = 0, e =
                        d.length; f < e; f++) b.off(a, d[f]);
            else
                for (var f = a.split(" "), e = 0, g = f.length; e < g; e++)
                    if (n[f[e]] = n[f[e]] || [], "undefined" === p(d)) n[f[e]].length = 0;
                    else {
                        var h = B(f[e], d); -
                        1 !== h && n[f[e]].splice(h, 1)
                    }
            return b
        };
        b.destroy = function () {
            b.pause();
            a.style.backgroundPosition = "";
            return b
        };
        (function () {
            var a = (z("backgroundPosition") || z("backgroundPositionX") + " " + z("backgroundPositionY")).replace(/left|top/gi, 0).split(" ");
            g = {
                x: 0 | parseInt(a[0], 10),
                y: 0 | parseInt(a[1], 10)
            };
            if (v) b.pos = g;
            else {
                for (a = q.length = 0; a < e.frames; a++) e.vertical ?
                    g.y = a * -b.height : g.x = a * -b.width, q.push(g.x + "px " + g.y + "px");
                b.frames = q.length;
                b.frame = 0
            }
        })()
    }

    function p(a) {
        return null == a ? String(a) : "object" === typeof a || "function" === typeof a ? a instanceof h.NodeList && "nodelist" || a instanceof h.HTMLCollection && "htmlcollection" || Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase() : typeof a
    }

    function F(a) {
        var h = {};
        a = "object" === p(a) ? a : {};
        for (var k in l.defaults) h[k] = (a.hasOwnProperty(k) ? a : l.defaults)[k];
        return h
    }

    var t = h.cancelAnimationFrame || h.cancelRequestAnimationFrame,
        u = h.requestAnimationFrame;
    (function () {
        for (var a = ["moz", "webkit", "o"], p = 0, k = 0, l = a.length; k < l && !t; ++k) u = (t = h[a[k] + "CancelAnimationFrame"] || h[a[k] + "CancelRequestAnimationFrame"]) && h[a[k] + "RequestAnimationFrame"];
        t || (u = function (a) {
            var k = +new Date,
                l = Math.max(0, 16 - (k - p));
            p = k + l;
            return h.setTimeout(function () {
                a(k + l)
            }, l)
        }, t = function (a) {
            clearTimeout(a)
        })
    })();
    var E = function () {
        var a = h.performance;
        return a && a.now ? a.now.bind(a) : function () {
            return +new Date
        }
    }();
    h.Motio = l;
    l.defaults = {
        fps: 15,
        frames: 0,
        vertical: 0,
        width: 0,
        height: 0,
        speedX: 0,
        speedY: 0,
        bgWidth: 0,
        bgHeight: 0
    }
})(window);