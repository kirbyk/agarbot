i18n_lang = (window.navigator.userLanguage || window.navigator.language || 'en').split('-')[0];

if (!i18n_dict.hasOwnProperty(i18n_lang)) i18n_lang = "en";
i18n = i18n_dict[i18n_lang];

(function(window, $) {
    function setup() {
        attemptWebsocket = true;

        getRegions();
        setInterval(getRegions, 18E4);

        canvas2 = canvas1 = document.getElementById("canvas");

        canvas2Context = canvas2.getContext("2d");

        canvas2.onmousedown = function(mouse) {
            if (isMobile) {
                var xMouseVector = mouse.clientX - (5 + windowWidth / 5 / 2),
                    yMouseVector = mouse.clientY - (5 + windowWidth / 5 / 2);
                if (Math.sqrt(xMouseVector * xMouseVector + yMouseVector * yMouseVector) <= windowWidth / 5 / 2) {
                    vectorThing();
                    setFirstByte(17);
                    return
                }
            }
            mouseX = mouse.clientX;
            mouseY = mouse.clientY;
            Ea();
            vectorThing()
        };

        canvas2.onmousemove = function(mouse) {
            mouseX = mouse.clientX;
            mouseY = mouse.clientY;
            Ea()
        };

        canvas2.onmouseup = function() {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", ab, false) : document.body.onmousewheel = ab;
        var a = false,
            b = false,
            c = false;
        window.onkeydown = function(q) {
            32 != q.keyCode || a || (vectorThing(), setFirstByte(17), a = true);
            81 != q.keyCode || b || (setFirstByte(18), b = true);
            87 != q.keyCode || c || (vectorThing(), setFirstByte(21), c = true);
            27 == q.keyCode && la(300)
        };
        window.onkeyup = function(q) {
            32 == q.keyCode && (a = false);
            87 == q.keyCode && (c = false);
            81 == q.keyCode && b && (setFirstByte(19), b = false)
        };
        window.onblur = function() {
            setFirstByte(19);
            c = b = a = false
        };
        window.onresize = bb;
        window.requestAnimationFrame(cb);
        setInterval($, 40);
        A && $("#region").val(A);
        checkRegion();
        ma($("#region").val());
        0 == Fa && A && L();
        la(0);
        bb();
        window.location.hash && 6 <= window.location.hash.length && connectToParty(window.location.hash)
    }

    function ab(a) {
        M *=
            Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
        1 > M && (M = 1);
        M > 4 / g && (M = 4 / g)
    }

    function Ib() {
        if (.4 > g) aa = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, q = Number.NEGATIVE_INFINITY, d = 0, n = 0; n < x.length; n++) {
                var e = x[n];
                !e.N() || e.R || 20 >= e.size * g || (d = Math.max(e.size, d), a = Math.min(e.x, a), b = Math.min(e.y, b), c = Math.max(e.x, c), q = Math.max(e.y, q))
            }
            aa = Jb.la({
                ca: a - (d + 100),
                da: b - (d + 100),
                oa: c + (d + 100),
                pa: q + (d + 100),
                ma: 2,
                na: 4
            });
            for (n = 0; n < x.length; n++)
                if (e = x[n], e.N() && !(20 >= e.size *
                    g))
                    for (a = 0; a < e.a.length; ++a) b = e.a[a].x, c = e.a[a].y, b < v - windowWidth / 2 / g || c < w - windowHeight / 2 / g || b > v + windowWidth / 2 / g || c > w + windowHeight / 2 / g || aa.m(e.a[a])
        }
    }

    function Ea() {
        na = (mouseX - windowWidth / 2) / g + v;
        oa = (mouseY - windowHeight / 2) / g + w
    }

    function getRegions() {
        null == pa && (pa = {}, $("#region").children().each(function() {
            var a = $(this),
                b = a.val();
            b && (pa[b] = a.text())
        }));
        $.get("https://m.agar.io/info", function(a) {
            var b = {},
                c;
            for (c in a.regions) {
                var q = c.split(":")[0];
                b[q] = b[q] || 0;
                b[q] += a.regions[c].numPlayers
            }
            for (c in b) $('#region option[value="' + c + '"]').text(pa[c] + " (" + b[c] + " players)")
        }, "json")
    }

    function hideTopLayers() {
        $("#adsBottom").hide();
        $("#overlays").hide();
        $("#stats").hide();
        $("#mainPanel").hide();
        S = ba = false;
        checkRegion();
        window.googletag && window.googletag.pubads && window.googletag.pubads().clear && window.googletag.pubads().clear(window.aa.concat(window.ab))
    }

    function ma(a) {
        a && a != A && ($("#region").val() != a && $("#region").val(a),
            A = window.localStorage.location = a,
            $(".region-message").hide(),
            $(".region-message." + a).show(),
            $(".btn-needs-server").prop("disabled", false), attemptWebsocket && L())
    }

    function la(a) {
        ba || S || ($("#adsBottom").show(), nickname = null, gb(window.aa), 1E3 > a && (u = 1), ba = true, $("#mainPanel").show(), 0 < a ? $("#overlays").fadeIn(a) :
            $("#overlays").show())
    }

    function setGameMode(mode) {
        $("#helloContainer").attr("data-gamemode", mode);
        gameMode = mode;
        $("#gamemode").val(mode)
    }

    function checkRegion() {
        $("#region").val() ? window.localStorage.location = $("#region").val() : window.localStorage.location && $("#region").val(window.localStorage.location);
        $("#region").val() ? $("#locationKnown").append($("#region")) : $("#locationUnknown").append($("#region"))
    }

    function gb(a) {
        window.googletag && window.googletag.cmd.push(function() {
            Ga && (Ga = false, setTimeout(function() {
                Ga = true
            }, 6E4 * Kb), window.googletag && window.googletag.pubads && window.googletag.pubads().refresh &&
            window.googletag.pubads().refresh(a))
        })
    }

    function da(a) {
        return window.i18n[a] || window.i18n_dict.en[a] || a
    }

    function getWebsocketAddressAndSecret() {
        var a = ++Fa;
        console.log("Find " + A + gameMode);
        $.ajax("https://m.agar.io/", {
            error: function() {
                setTimeout(getWebsocketAddressAndSecret, 1E3)
            },
            success: function(response) {
                a == Fa && (response = response.split("\n"), response[2] && alert(response[2]), connectToServer("ws://" + response[0], response[1]))
            },
            dataType: "text",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: (A + gameMode || "?") + "\n154669603"
        })
    }

    function L() {
        attemptWebsocket && A && ($("#connecting").show(), getWebsocketAddressAndSecret())
    }

    function connectToServer(websocketAddress, secret) {
        if (ws) {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onclose = null;
            try {
                ws.close()
            } catch (c) {

            }
            ws = null;
        }

        queryParams.ip && (websocketAddress = "ws://" + queryParams.ip);

        if (null != N) {
            var q = N;
            N = function() {
                q(secret)
            }
        }

        if (windowIsHTTPS) {
            var arr = websocketAddress.split(":");
            websocketAddress = arr[0] + "s://ip-" + arr[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + (+arr[2] + 2E3)
        }

        B = [];
        h = [];
        I = {};
        x = [];
        U = [];
        y = [];
        C = D = null;
        O = 0;
        ea = false;

        console.log("Connecting to " + websocketAddress);

        ws = new WebSocket(websocketAddress);

        ws.binaryType = "arraybuffer";

        ws.onopen = function() {
            var dataView;
            console.log("socket open");

            dataView = dataViewFactory(5);
            dataView.setUint8(0, 254);
            dataView.setUint32(1, 5, true);

            dataViewSender(dataView);
            dataView = dataViewFactory(5);
            dataView.setUint8(0, 255);
            dataView.setUint32(1, 154669603, true);

            dataViewSender(dataView);
            dataView = dataViewFactory(1 + secret.length);
            dataView.setUint8(0, 80);

            for (var c = 0; c < secret.length; ++c) {
                dataView.setUint8(c + 1, secret.charCodeAt(c));
            }

            dataViewSender(dataView);

            sendLoginToken()
        };
        ws.onmessage = handleMessage;
        ws.onclose = Mb;
        ws.onerror = function() {
            console.log("socket error")
        }
    }

    function dataViewFactory(bufferLength) {
        return new DataView(new ArrayBuffer(bufferLength))
    }

    function dataViewSender(dataView) {
        ws.send(dataView.buffer)
    }

    function Mb() {
        ea && (qa = 500);
        console.log("socket close");
        setTimeout(L, qa);
        qa *= 2
    }

    function handleMessage(message) {
        handleDataView(new DataView(message.data))
    }

    function handleDataView(localDataView) {
        function b() {
            for (var b = "";;) {
                var d = localDataView.getUint16(c, true);
                c += 2;
                if (0 == d) break;
                b += String.fromCharCode(d)
            }
            return b
        }
        
        var c = 0;
        
        240 == localDataView.getUint8(c) && (c += 5);
        
        switch (localDataView.getUint8(c++)) {
            case 16:
                Ob(localDataView, c);
                break;
            case 17:
                fa = localDataView.getFloat32(c, true);
                c += 4;
                ga = localDataView.getFloat32(c, true);
                c += 4;
                ha = localDataView.getFloat32(c, true);
                c += 4;
                break;
            case 20:
                h = [];
                B = [];
                break;
            case 21:
                Ja = localDataView.getInt16(c, true);
                c += 2;
                Ka = localDataView.getInt16(c, true);
                c += 2;
                La || (La = true, ra = Ja, sa = Ka);
                break;
            case 32:
                B.push(localDataView.getUint32(c, true));
                c += 4;
                break;
            case 49:
                if (null != D) break;
                var d = localDataView.getUint32(c, true),
                    c = c + 4;
                y = [];
                for (var e = 0; e < d; ++e) {
                    var n = localDataView.getUint32(c, true),
                        c = c + 4;
                    y.push({
                        id: n,
                        name: b()
                    })
                }
                kb();
                break;
            case 50:
                D = [];
                d = localDataView.getUint32(c, true);
                c += 4;
                for (e = 0; e < d; ++e) D.push(localDataView.getFloat32(c, true)), c += 4;
                kb();
                break;
            case 64:
                ta = localDataView.getFloat64(c, true);
                c += 8;
                ua = localDataView.getFloat64(c, true);
                c += 8;
                va = localDataView.getFloat64(c, true);
                c += 8;
                wa = localDataView.getFloat64(c, true);
                c += 8;
                fa = (va + ta) / 2;
                ga = (wa + ua) / 2;
                ha = 1;
                0 == h.length && (v = fa, w = ga, g = ha);
                break;
            case 81:
                var p = localDataView.getUint32(c, true),
                    c = c + 4,
                    k = localDataView.getUint32(c, true),
                    c = c + 4,
                    f = localDataView.getUint32(c, true),
                    c = c + 4;
                setTimeout(function() {
                    V({
                        e: p,
                        experience: k,
                        d: experience
                    })
                }, 1200)
        }
    }

    function Ob(localDataView, b) {
        function c() {
            for (var c = "";;) {
                var d = localDataView.getUint16(b, true);
                b += 2;
                if (0 == d) break;
                c += String.fromCharCode(d)
            }
            return c
        }

        function q() {
            for (var c = "";;) {
                var d = localDataView.getUint8(b++);
                if (0 == d) break;
                c += String.fromCharCode(d)
            }
            return c
        }
        
        unixMS1 = unixMS2 = Date.now();
        
        ea || (ea = true, Pb());
        
        Ma = false;
        
        var r = localDataView.getUint16(b, true);
        
        b += 2;
        
        for (var n = 0; n < r; ++n) {
            var p = I[localDataView.getUint32(b, true)],
                k = I[localDataView.getUint32(b + 4, true)];
            b += 8;
            p && k && (k.isWebsocketOpen(), k.s = k.x, k.t = k.y, k.r = k.size, k.J = p.x, k.K = p.y, k.q = k.size, k.Q = unixMS2, Qb(p, k))
        }
        
        for (n = 0;;) {
            r = localDataView.getUint32(b, true);
            b += 4;
            if (0 == r) break;
            ++n;
            var f, p = localDataView.getInt32(b, true);
            b += 4;
            k = localDataView.getInt32(b, true);
            b += 4;
            experience = localDataView.getInt16(b, true);
            b += 2;
            var l = localDataView.getUint8(b++),
                g = localDataView.getUint8(b++),
                m = localDataView.getUint8(b++),
                g = Rb(l << 16 | g << 8 | m),
                m = localDataView.getUint8(b++),
                s = !!(m & 1),
                t = !!(m & 16),
                mb = null;
            m & 2 && (b += 4 + localDataView.getUint32(b, true));
            m & 4 && (mb = q());
            var u = c(),
                l = null;
            I.hasOwnProperty(r) ? (l = I[r], l.dataViewFactory(), l.s = l.x, l.t = l.y, l.r = l.size, l.color = g) : (l = new W(r, p, k, experience, g, u), x.push(l), I[r] = l, l.ta = p, l.ua = k);
            l.h = s;
            l.n = t;
            l.J = p;
            l.K = k;
            l.q = experience;
            l.Q = unixMS2;
            l.ba = m;
            l.fa = mb;
            u && l.B(u); - 1 != B.indexOf(r) && -1 == h.indexOf(l) && (h.push(l), 1 == h.length && (v = l.x, w = l.y, nb(), document.getElementById("overlays").style.display = "none", z = [], Na = 0, Oa = h[0].color, Pa = true, ob = Date.now(), R = Qa = Ra = 0))
        }
        p = localDataView.getUint32(b, true);
        b += 4;
        for (n = 0; n <
        p; n++) r = localDataView.getUint32(b, true), b += 4, l = I[r], null != l && l.isWebsocketOpen();
        Ma && 0 == h.length && (pb = Date.now(), Pa = false, ba || S || (qb ? (gb(window.ab), Sb(), S = true, $("#overlays").fadeIn(3E3), $("#stats").show()) : la(3E3)))
    }

    function Pb() {
        $("#connecting").hide();
        sendNickname();
        N && (N(), N = null);
        null != Sa && clearTimeout(Sa);
        Sa = setTimeout(function() {
            window.ga && (++sb, window.ga("set", "dimension2", sb))
        }, 1E4)
    }

    function vectorThing() {
        if (isWebsocketOpen()) {
            var xMouseVector = mouseX - windowWidth / 2,
                yMouseVector = mouseY - windowHeight / 2;

            64 > xMouseVector * xMouseVector + yMouseVector * yMouseVector ||
            .01 > Math.abs(tb - na) &&
            .01 > Math.abs(ub - oa) ||
            (tb = na, ub = oa, xMouseVector = dataViewFactory(21), xMouseVector.setUint8(0, 16),
                xMouseVector.setFloat64(1, na, true), xMouseVector.setFloat64(9, oa, true),
                xMouseVector.setUint32(17, 0, true), dataViewSender(xMouseVector))
        }
    }

    function sendNickname() {
        if (isWebsocketOpen() && ea && null != nickname) {
            var dataView = dataViewFactory(1 + 2 * nickname.length);
            dataView.setUint8(0, 0);
            for (var b = 0; b < nickname.length; ++b) {
                dataView.setUint16(1 + 2 * b, nickname.charCodeAt(b), true);
            }
            dataViewSender(dataView);
            nickname = null
        }
    }

    function isWebsocketOpen() {
        return null != ws && ws.readyState == ws.OPEN
    }

    function setFirstByte(byte) {
        if (isWebsocketOpen()) {
            var dataView = dataViewFactory(1);
            dataView.setUint8(0, byte);
            dataViewSender(dataView)
        }
    }

    function sendLoginToken() {
        if (isWebsocketOpen() && null != loginToken) {
            var dataView = dataViewFactory(1 + loginToken.length);
            dataView.setUint8(0, 81);
            for (var b = 0; b < loginToken.length; ++b) {
                dataView.setUint8(b + 1, loginToken.charCodeAt(b));
            }
            dataViewSender(dataView)
        }
    }

    function bb() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        canvas1.width = canvas2.width = windowWidth;
        canvas1.height = canvas2.height = windowHeight;

        var $helloContainter = $("#helloContainer");
        $helloContainter.css("transform", "none");

        var helloContantierHeight = $helloContainter.height(),
            windowHeight2 = window.innerHeight;
        helloContantierHeight > windowHeight2 / 1.1 ? $helloContainter.css("transform", "translate(-50%, -50%) scale(" + windowHeight2 / helloContantierHeight / 1.1 + ")") : $helloContainter.css("transform", "translate(-50%, -50%)");
        vb()
    }

    function wb() {
        var a;
        a = 1 * Math.max(windowHeight / 1080, windowWidth / 1920);
        return a *= M
    }

    function Tb() {
        if (0 != h.length) {
            for (var a = 0, b = 0; b < h.length; b++) a += h[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * wb();
            g = (9 * g + a) / 10
        }
    }

    function vb() {
        var currentUnixMs1, currentUnixMs2 = Date.now();

        ++Ub;

        unixMS2 = currentUnixMs2;

        if (0 < h.length) {
            Tb();
            for (var c = currentUnixMs1 = 0, d = 0; d < h.length; d++) h[d].dataViewFactory(), currentUnixMs1 += h[d].x /
                h.length, c += h[d].y / h.length;
            fa = currentUnixMs1;
            ga = c;
            ha = g;
            v = (v + currentUnixMs1) / 2;
            w = (w + c) / 2
        } else {
            v = (29 * v + fa) / 30, w = (29 * w + ga) / 30, g = (9 * g + ha * wb()) / 10;
        }

        Ib();
        Ea();
        Ta || canvas2Context.clearRect(0, 0, windowWidth, windowHeight);
        Ta ? (canvas2Context.fillStyle = xa ? "#111111" : "#F2FBFF", canvas2Context.globalAlpha = .05, canvas2Context.fillRect(0, 0, windowWidth, windowHeight), canvas2Context.globalAlpha = 1) : Vb();
        x.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size
        });
        canvas2Context.save();
        canvas2Context.translate(windowWidth / 2, windowHeight / 2);
        canvas2Context.scale(g, g);
        canvas2Context.translate(-v, -w);
        for (d = 0; d < U.length; d++) U[d].w(canvas2Context);
        for (d = 0; d < x.length; d++) x[d].w(canvas2Context);
        if (La) {
            ra = (3 * ra + Ja) / 4;
            sa = (3 * sa + Ka) / 4;
            canvas2Context.save();
            canvas2Context.strokeStyle =
                "#FFAAAA";
            canvas2Context.lineWidth = 10;
            canvas2Context.lineCap = "round";
            canvas2Context.lineJoin = "round";
            canvas2Context.globalAlpha = .5;
            canvas2Context.beginPath();
            for (d = 0; d < h.length; d++) canvas2Context.moveTo(h[d].x, h[d].y), canvas2Context.lineTo(ra, sa);
            canvas2Context.stroke();
            canvas2Context.restore()
        }
        canvas2Context.restore();
        C && C.width && canvas2Context.drawImage(C, windowWidth - C.width - 10, 10);
        O = Math.max(O, xb());
        0 != O && (null == ya && (ya = new za(24, "#FFFFFF")), ya.C(da("score") + ": " + ~~(O / 100)), c = ya.L(), currentUnixMs1 = c.width, canvas2Context.globalAlpha = .2, canvas2Context.fillStyle = "#000000", canvas2Context.fillRect(10, windowHeight - 10 - 24 - 10, currentUnixMs1 + 10, 34), canvas2Context.globalAlpha = 1, canvas2Context.drawImage(c, 15, windowHeight - 10 - 24 - 5));
        Wb();
        currentUnixMs2 = Date.now() - currentUnixMs2;
        currentUnixMs2 > 1E3 / 60 ? G -= .01 :
        currentUnixMs2 < 1E3 / 65 && (G += .01);.4 > G && (G = .4);
        1 < G && (G = 1);
        currentUnixMs2 = unixMS2 - yb;
        !isWebsocketOpen() || ba || S ? (u += currentUnixMs2 / 2E3, 1 < u && (u = 1)) : (u -= currentUnixMs2 / 300, 0 > u && (u = 0));
        0 < u && (canvas2Context.fillStyle = "#000000", canvas2Context.globalAlpha = .5 * u, canvas2Context.fillRect(0, 0, windowWidth, windowHeight), canvas2Context.globalAlpha = 1);
        yb = unixMS2
    }

    function Vb() {
        canvas2Context.fillStyle = xa ? "#111111" : "#F2FBFF";
        canvas2Context.fillRect(0, 0, windowWidth, windowHeight);
        canvas2Context.save();
        canvas2Context.strokeStyle = xa ? "#AAAAAA" : "#000000";
        canvas2Context.globalAlpha = .2 * g;
        for (var a = windowWidth / g, b = windowHeight / g, c = (-v + a / 2) % 50; c < a; c += 50) canvas2Context.beginPath(), canvas2Context.moveTo(c * g - .5, 0), canvas2Context.lineTo(c * g - .5, b * g), canvas2Context.stroke();
        for (c = (-w + b / 2) % 50; c < b; c += 50) canvas2Context.beginPath(), canvas2Context.moveTo(0, c * g - .5), canvas2Context.lineTo(a *
            g, c * g - .5), canvas2Context.stroke();
        canvas2Context.restore()
    }

    function Wb() {
        if (isMobile && image.width) {
            var a = windowWidth / 5;
            canvas2Context.drawImage(image, 5, 5, a, a)
        }
    }

    function xb() {
        for (var a = 0, b = 0; b < h.length; b++) a += h[b].q * h[b].q;
        return a
    }

    function kb() {
        C = null;
        if (null != D || 0 != y.length)
            if (null != D || Aa) {
                C = document.createElement("canvas");
                var a = C.getContext("2d"),
                    b = 60,
                    b = null == D ? b + 24 * y.length : b + 180,
                    c = Math.min(200, .3 * windowWidth) / 200;
                C.width = 200 * c;
                C.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha = 1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = da("leaderboard");
                a.font = "30px Ubuntu";
                a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                if (null == D)
                    for (a.font = "20px Ubuntu", b = 0; b < y.length; ++b) c = y[b].name || da("unnamed_cell"), Aa || (c = da("unnamed_cell")), -1 != B.indexOf(y[b].id) ? (h[0].name && (c = h[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
                else
                    for (b = c = 0; b < D.length; ++b) {
                        var d = c + D[b] * Math.PI * 2;
                        a.fillStyle = Xb[b + 1];
                        a.beginPath();
                        a.moveTo(100, 140);
                        a.arc(100, 140, 80, c, d, false);
                        a.fill();
                        c = d
                    }
            }
    }

    function Va(a, b,
                c, d, e) {
        this.V = a;
        this.x = b;
        this.y = c;
        this.i = d;
        this.b = e
    }

    function W(a, b, c, d, e, n) {
        this.id = a;
        this.s = this.x = b;
        this.t = this.y = c;
        this.r = this.size = d;
        this.color = e;
        this.a = [];
        this.W();
        this.B(n)
    }

    function Rb(a) {
        for (a = a.toString(16); 6 > a.length;) a = "0" + a;
        return "#" + a
    }

    function za(a, b, c, d) {
        a && (this.u = a);
        b && (this.S = b);
        this.U = !!c;
        d && (this.v = d)
    }

    function Yb(a) {
        for (var b = a.length, c, d; 0 < b;) d = Math.floor(Math.random() * b), b--, c = a[b], a[b] = a[d], a[d] = c
    }

    function V(a, b) {
        var c = "1" == $("#helloContainer").attr("data-has-account-data");
        $("#helloContainer").attr("data-has-account-data",
            "1");
        if (null == b && window.localStorage.loginCache) {
            var q = JSON.parse(window.localStorage.loginCache);
            q.experience = a.experience;
            q.nextExperience = a.nextExperience;
            q.level = a.level;
            window.localStorage.loginCache = JSON.stringify(q)
        }
        if (c) {
            var r = +$(".agario-exp-bar .progress-bar-text").first().text().split("/")[0],
                c = +$(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0],
                q = $(".agario-profile-panel .progress-bar-star").first().text();
            if (q != a.level) V({
                experience: c,
                d: c,
                e: q
            }, function() {
                $(".agario-profile-panel .progress-bar-star").text(a.level);
                $(".agario-exp-bar .progress-bar").css("width",
                    "100%");
                $(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    $(".progress-bar-star").removeClass("animated tada")
                });
                setTimeout(function() {
                    $(".agario-exp-bar .progress-bar-text").text(a.nextExperience + "/" + a.nextExperience + " XP");
                    V({
                        experience: 0,
                        d: a.nextExperience,
                        e: a.level
                    }, function() {
                        V(a, b)
                    })
                }, 1E3)
            });
            else {
                var n = Date.now(),
                    p = function() {
                        var c;
                        c = (Date.now() - n) / 1E3;
                        c = 0 > c ? 0 : 1 < c ? 1 : c;
                        c = c * c * (3 - 2 * c);
                        $(".agario-exp-bar .progress-bar-text").text(~~(r + (a.experience - r) * c) + "/" + a.nextExperience +
                            " XP");
                        $(".agario-exp-bar .progress-bar").css("width", (88 * (r + (a.experience - r) * c) / a.nextExperience).toFixed(2) + "%");
                        1 > c ? window.requestAnimationFrame(p) : b && b()
                    };
                window.requestAnimationFrame(p)
            }
        } else $(".agario-profile-panel .progress-bar-star").text(a.level), $(".agario-exp-bar .progress-bar-text").text(a.experience + "/" + a.nextExperience + " XP"), $(".agario-exp-bar .progress-bar").css("width", (88 * a.experience / a.nextExperience).toFixed(2) + "%"), b && b()
    }

    function handleLoginData(loginData) {
        "string" == typeof loginData && (loginData = JSON.parse(loginData));
        Date.now() + 18E5 > loginData.expiresIn ? $("#helloContainer").attr("data-logged-in", "0") : (window.localStorage.loginCache =
            JSON.stringify(loginData), loginToken = loginData.loginToken, $(".agario-profile-name").text(loginData.name), sendLoginToken(), V({
            experience: loginData.experience,
            d: loginData.nextExperience,
            e: loginData.level
        }), $("#helloContainer").attr("data-logged-in", "1"))
    }

    function parseLoginData(loginDataResponseText) {
        loginDataResponseText = loginDataResponseText.split("\n");
        handleLoginData({
            name: loginDataResponseText[0],
            sa: loginDataResponseText[1],
            loginToken: loginDataResponseText[2],
            expiresIn: 1E3 * +loginDataResponseText[3],
            e: +loginDataResponseText[4],
            experience: +loginDataResponseText[5],
            d: +loginDataResponseText[6]
        })
    }

    function handleFBAuth(fbResponse) {
        if ("connected" == fbResponse.status) {
            var fbAccessToken = fbResponse.authResponse.accessToken;
            window.FB.api("/me/picture?width=180&height=180", function(fbPictureResponse) {
                window.localStorage.fbPictureCache = fbPictureResponse.data.url;
                $(".agario-profile-picture").attr("src", fbPictureResponse.data.url)
            });
            $("#helloContainer").attr("data-logged-in",
                "1");
            null != loginToken ? $.ajax("https://m.agar.io/checkToken", {
                error: function() {
                    loginToken = null;
                    handleFBAuth(fbResponse)
                },
                success: function(a) {
                    a = a.split("\n");
                    V({
                        level: +a[0],
                        experience: +a[1],
                        nextExperience: +a[2]
                    })
                },
                dataType: "text",
                method: "POST",
                cache: false,
                crossDomain: true,
                data: loginToken
            }) : $.ajax("https://m.agar.io/facebookLogin", {
                error: function() {
                    loginToken = null;
                    $("#helloContainer").attr("data-logged-in", "0")
                },
                success: parseLoginData,
                dataType: "text",
                method: "POST",
                cache: false,
                crossDomain: true,
                data: fbAccessToken
            })
        }
    }

    function connectToParty(partyID) {
        setGameMode(":party");
        $("#helloContainer").attr("data-party-state", "4");
        partyID = decodeURIComponent(partyID).replace(/.*#/gim,
            "");
        Xa("#" + window.encodeURIComponent(partyID));
        $.ajax("https://m.agar.io/getToken", {
            error: function() {
                $("#helloContainer").attr("data-party-state", "6")
            },
            success: function(response) {
                response = response.split("\n");
                $(".partyToken").val("agar.io/#" + window.encodeURIComponent(partyID));
                $("#helloContainer").attr("data-party-state", "5");
                setGameMode(":party");
                connectToServer("ws://" + response[0], partyID)
            },
            dataType: "text",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: partyID
        })
    }

    function Xa(a) {
        window.history && window.history.replaceState && window.history.replaceState({}, window.document.title, a)
    }

    function Qb(a, b) {
        var c = -1 !=
                B.indexOf(a.id),
            d = -1 != B.indexOf(b.id),
            e = 30 > b.size;
        c && e && ++Na;
        e || !c || d || ++Qa
    }

    function Ab(a) {
        a = ~~a;
        var b = (a % 60).toString();
        a = (~~(a / 60)).toString();
        2 > b.length && (b = "0" + b);
        return a + ":" + b
    }

    function $b() {
        if (null == y) return 0;
        for (var a = 0; a < y.length; ++a)
            if (-1 != B.indexOf(y[a].id)) return a + 1;
        return 0
    }

    function Sb() {
        $(".stats-food-eaten").text(Na);
        $(".stats-time-alive").text(Ab((pb - ob) / 1E3));
        $(".stats-leaderboard-time").text(Ab(Ra));
        $(".stats-highest-mass").text(~~(O / 100));
        $(".stats-cells-eaten").text(Qa);
        $(".stats-top-position").text(0 ==
        R ? ":(" : R);
        var a = document.getElementById("statsGraph");
        if (a) {
            var b = a.getContext("2d"),
                c = a.width,
                a = a.height;
            b.clearRect(0, 0, c, a);
            if (2 < z.length) {
                for (var d = 200, r = 0; r < z.length; r++) d = Math.max(z[r], d);
                b.lineWidth = 3;
                b.lineCap = "round";
                b.lineJoin = "round";
                b.strokeStyle = Oa;
                b.fillStyle = Oa;
                b.beginPath();
                b.moveTo(0, a - z[0] / d * (a - 10) + 10);
                for (r = 1; r < z.length; r += Math.max(~~(z.length / c), 1)) {
                    for (var n = r / (z.length - 1) * c, p = [], k = -20; 20 >= k; ++k) 0 > r + k || r + k >= z.length || p.push(z[r + k]);
                    p = p.reduce(function(a, b) {
                            return a + b
                        }) / p.length /
                        d;
                    b.lineTo(n, a - p * (a - 10) + 10)
                }
                b.stroke();
                b.globalAlpha = .5;
                b.lineTo(c, a);
                b.lineTo(0, a);
                b.fill();
                b.globalAlpha = 1
            }
        }
    }
    
    if (!window.agarioNoInit) {
        var windowProtocol = window.location.protocol,
            windowIsHTTPS = "https:" == windowProtocol;
        if (windowIsHTTPS && -1 == window.location.search.indexOf("fb")) {
            window.location.href = "http://agar.io/";
        } else {
            var windowUserAgent = window.navigator.userAgent;

            if (-1 != windowUserAgent.indexOf("Android")) {
                window.ga && window.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function() {
                    window.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io"
                }, 1E3);
            } else if (-1 != windowUserAgent.indexOf("iPhone") ||
                -1 != windowUserAgent.indexOf("iPad") || -1 != windowUserAgent.indexOf("iPod")) {
                window.ga && window.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {
                    window.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp"
                }, 1E3);
            } else {
                var canvas1, canvas2Context, canvas2, windowWidth, windowHeight, aa = null,
                    ws = null,
                    v = 0,
                    w = 0,
                    B = [],
                    h = [],
                    I = {},
                    x = [],
                    U = [],
                    y = [],
                    mouseX = 0,
                    mouseY = 0,
                    na = -1,
                    oa = -1,
                    Ub = 0,
                    unixMS2 = 0,
                    yb = 0,
                    nickname = null,
                    ta = 0,
                    ua = 0,
                    va = 1E4,
                    wa = 1E4,
                    g = 1,
                    A = null,
                    Cb = true,
                    Aa = true,
                    Ya = false,
                    Ma = false,
                    O = 0,
                    xa = false,
                    Db = false,
                    fa = v = ~~((ta + va) / 2),
                    ga = w = ~~((ua + wa) / 2),
                    ha = 1,
                    gameMode = "",
                    D = null,
                    attemptWebsocket = false,
                    La = false,
                    Ja = 0,
                    Ka = 0,
                    ra = 0,
                    sa = 0,
                    Eb = 0,
                    Xb = ["#333333",
                        "#FF3333", "#33FF33", "#3333FF"
                    ],
                    Ta = false,
                    ea = false,
                    unixMS1 = 0,
                    loginToken = null,
                    M = 1,
                    u = 1,
                    ba = false,
                    Fa = 0,
                    queryParams = {};
                
                (function() {
                    var windowSearch = window.location.search;

                    "?" == windowSearch.charAt(0) && (windowSearch = windowSearch.slice(1));

                    for (var queryArray = windowSearch.split("&"), b = 0; b < queryArray.length; b++) {
                        var keyValArr = queryArray[b].split("=");
                        queryParams[keyValArr[0]] = keyValArr[1]
                    }
                })();
                
                var isMobile = "ontouchstart" in window && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent),
                    image = new Image;

                image.src = "img/split.png";

                var createdCanvas = document.createElement("canvas");

                if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket ||
                    null == createdCanvas || null == createdCanvas.getContext || null == window.localStorage) {
                    alert("You browser does not support this game, we recommend you to use Firefox to play this");
                } else {
                    var pa = null;

                    window.setNick = function(nick) {
                        hideTopLayers();
                        nickname = nick;
                        sendNickname();
                        O = 0
                    };

                    window.setRegion = ma;

                    window.setSkins = function(a) {
                        Cb = a
                    };

                    window.setNames = function(a) {
                        Aa = a
                    };

                    window.setDarkTheme = function(a) {
                        xa = a
                    };

                    window.setColors = function(a) {
                        Ya = a
                    };

                    window.setShowMass = function(a) {
                        Db = a
                    };

                    window.spectate = function() {
                        nickname = null;
                        setFirstByte(1);
                        hideTopLayers()
                    };
                    window.setGameMode = function(a) {
                        a != gameMode && (":party" == gameMode && $("#helloContainer").attr("data-party-state",
                            "0"), setGameMode(a), ":party" != a && L())
                    };
                    window.setAcid = function(a) {
                        Ta = a
                    };
                    null != window.localStorage && (null == window.localStorage.AB9 && (window.localStorage.AB9 = 0 + ~~(100 * Math.random())), Eb = +window.localStorage.AB9, window.ABGroup = Eb);
                    $.get(windowProtocol + "//gc.agar.io", function(a) {
                        var b = a.split(" ");
                        a = b[0];
                        b = b[1] || ""; - 1 == ["UA"].indexOf(a) && Gb.push("ussr");
                        regionMap.hasOwnProperty(a) && ("string" == typeof regionMap[a] ? A || ma(regionMap[a]) : regionMap[a].hasOwnProperty(b) && (A || ma(regionMap[a][b])))
                    }, "text");
                    window.ga && window.ga("send", "event", "User-Agent", window.navigator.userAgent, {
                        nonInteraction: 1
                    });
                    var Ga = true,
                        Kb = 0,
                        regionMap = {AF: "JP-Tokyo", AX: "EU-London", AL: "EU-London", DZ: "EU-London", AS: "SG-Singapore", AD: "EU-London", AO: "EU-London", AI: "US-Atlanta", AG: "US-Atlanta", AR: "BR-Brazil", AM: "JP-Tokyo", AW: "US-Atlanta", AU: "SG-Singapore", AT: "EU-London", AZ: "JP-Tokyo", BS: "US-Atlanta", BH: "JP-Tokyo", BD: "JP-Tokyo", BB: "US-Atlanta", BY: "EU-London", BE: "EU-London", BZ: "US-Atlanta", BJ: "EU-London", BM: "US-Atlanta", BT: "JP-Tokyo", BO: "BR-Brazil", BQ: "US-Atlanta", BA: "EU-London", BW: "EU-London", BR: "BR-Brazil", IO: "JP-Tokyo", VG: "US-Atlanta", BN: "JP-Tokyo", BG: "EU-London", BF: "EU-London", BI: "EU-London", KH: "JP-Tokyo", CM: "EU-London", CA: "US-Atlanta", CV: "EU-London", KY: "US-Atlanta", CF: "EU-London", TD: "EU-London", CL: "BR-Brazil", CN: "CN-China", CX: "JP-Tokyo", CC: "JP-Tokyo", CO: "BR-Brazil", KM: "EU-London", CD: "EU-London", CG: "EU-London", CK: "SG-Singapore", CR: "US-Atlanta", CI: "EU-London", HR: "EU-London", CU: "US-Atlanta", CW: "US-Atlanta", CY: "JP-Tokyo", CZ: "EU-London", DK: "EU-London", DJ: "EU-London", DM: "US-Atlanta", DO: "US-Atlanta", EC: "BR-Brazil", EG: "EU-London", SV: "US-Atlanta", GQ: "EU-London", ER: "EU-London", EE: "EU-London", ET: "EU-London"FO: "EU-London", FK: "BR-Brazil", FJ: "SG-Singapore", FI: "EU-London", FR: "EU-London", GF: "BR-Brazil", PF: "SG-Singapore", GA: "EU-London", GM: "EU-London", GE: "JP-Tokyo", DE: "EU-London", GH: "EU-London", GI: "EU-London", GR: "EU-London", GL: "US-Atlanta", GD: "US-Atlanta", GP: "US-Atlanta", GU: "SG-Singapore", GT: "US-Atlanta", GG: "EU-London", GN: "EU-London", GW: "EU-London", GY: "BR-Brazil", HT: "US-Atlanta", VA: "EU-London", HN: "US-Atlanta", HK: "JP-Tokyo", HU: "EU-London", IS: "EU-London", IN: "JP-Tokyo", ID: "JP-Tokyo", IR: "JP-Tokyo", IQ: "JP-Tokyo", IE: "EU-London", IM: "EU-London", IL: "JP-Tokyo", IT: "EU-London", JM: "US-Atlanta", JP: "JP-Tokyo", JE: "EU-London", JO: "JP-Tokyo", KZ: "JP-Tokyo", KE: "EU-London", KI: "SG-Singapore", KP: "JP-Tokyo", KR: "JP-Tokyo", KW: "JP-Tokyo", KG: "JP-Tokyo", LA: "JP-Tokyo", LV: "EU-London", LB: "JP-Tokyo", LS: "EU-London", LR: "EU-London", LY: "EU-London", LI: "EU-London", LT: "EU-London", LU: "EU-London", MO: "JP-Tokyo", MK: "EU-London", MG: "EU-London", MW: "EU-London", MY: "JP-Tokyo", MV: "JP-Tokyo", ML: "EU-London", MT: "EU-London", MH: "SG-Singapore", MQ: "US-Atlanta", MR: "EU-London", MU: "EU-London", YT: "EU-London", MX: "US-Atlanta", FM: "SG-Singapore", MD: "EU-London", MC: "EU-London", MN: "JP-Tokyo", ME: "EU-London", MS: "US-Atlanta", MA: "EU-London", MZ: "EU-London", MM: "JP-Tokyo", NA: "EU-London", NR: "SG-Singapore", NP: "JP-Tokyo", NL: "EU-London", NC: "SG-Singapore", NZ: "SG-Singapore", NI: "US-Atlanta", NE: "EU-London", NG: "EU-London", NU: "SG-Singapore", NF: "SG-Singapore", MP: "SG-Singapore", NO: "EU-London", OM: "JP-Tokyo", PK: "JP-Tokyo", PW: "SG-Singapore", PS: "JP-Tokyo", PA: "US-Atlanta", PG: "SG-Singapore", PY: "BR-Brazil", PE: "BR-Brazil", PH: "JP-Tokyo", PN: "SG-Singapore", PL: "EU-London", PT: "EU-London", PR: "US-Atlanta", QA: "JP-Tokyo", RE: "EU-London", RO: "EU-London", RU: "RU-Russia", RW: "EU-London", BL: "US-Atlanta", SH: "EU-London", KN: "US-Atlanta", LC: "US-Atlanta", MF: "US-Atlanta", PM: "US-Atlanta", VC: "US-Atlanta", WS: "SG-Singapore", SM: "EU-London", ST: "EU-London", SA: "EU-London", SN: "EU-London", RS: "EU-London", SC: "EU-London", SL: "EU-London", SG: "JP-Tokyo", SX: "US-Atlanta", SK: "EU-London", SI: "EU-London", SB: "SG-Singapore", SO: "EU-London", ZA: "EU-London", SS: "EU-London", ES: "EU-London", LK: "JP-Tokyo", SD: "EU-London", SR: "BR-Brazil", SJ: "EU-London", SZ: "EU-London", SE: "EU-London", CH: "EU-London", SY: "EU-London", TW: "JP-Tokyo", TJ: "JP-Tokyo", TZ: "EU-London", TH: "JP-Tokyo", TL: "JP-Tokyo", TG: "EU-London", TK: "SG-Singapore", TO: "SG-Singapore", TT: "US-Atlanta", TN: "EU-London", TR: "TK-Turkey", TM: "JP-Tokyo", TC: "US-Atlanta", TV: "SG-Singapore", UG: "EU-London", UA: "EU-London", AE: "EU-London", GB: "EU-London", US: "US-Atlanta", UM: "SG-Singapore", VI: "US-Atlanta", UY: "BR-Brazil", UZ: "JP-Tokyo", VU: "SG-Singapore", VE: "BR-Brazil", VN: "JP-Tokyo", WF: "SG-Singapore", YE: "JP-Tokyo", ZM: "EU-London", ZW: "EU-London"},
                        N = null;

                    window.connect = connectToServer;

                    var qa = 500,
                        Sa = null,
                        sb = 0,
                        tb = -1,
                        ub = -1,
                        C = null,
                        G = 1,
                        ya = null,
                        cb = function() {
                            var a = Date.now(),
                                b = 1E3 / 60;
                            return function() {
                                window.requestAnimationFrame(cb);
                                var c = Date.now(),
                                    e = c - a;
                                e > b && (a = c - e % b, !isWebsocketOpen() || 240 > Date.now() - unixMS1 ? vb() : console.warn("Skipping draw"), ac())
                            }
                        }(),
                        Y = {},
                        Gb = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande".split(";"),
                        bc = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande".split(";"),
                        Z = {};
                    Va.prototype = {
                        V: null,
                        x: 0,
                        y: 0,
                        i: 0,
                        b: 0
                    };
                    W.prototype = {
                        id: 0,
                        a: null,
                        name: null,
                        o: null,
                        O: null,
                        x: 0,
                        y: 0,
                        size: 0,
                        s: 0,
                        t: 0,
                        r: 0,
                        J: 0,
                        K: 0,
                        q: 0,
                        ba: 0,
                        Q: 0,
                        ja: 0,
                        G: false,
                        h: false,
                        n: false,
                        R: true,
                        Y: 0,
                        fa: null,
                        X: function() {
                            var a;
                            for (a = 0; a < x.length; a++)
                                if (x[a] == this) {
                                    x.splice(a, 1);
                                    break
                                }
                            delete I[this.id];
                            a = h.indexOf(this); - 1 != a && (Ma = true, h.splice(a, 1));
                            a = B.indexOf(this.id); - 1 != a && B.splice(a, 1);
                            this.G = true;
                            0 < this.Y && U.push(this)
                        },
                        l: function() {
                            return Math.max(~~(.3 *
                            this.size), 24)
                        },
                        B: function(a) {
                            if (this.name = a) null == this.o ? this.o = new za(this.l(), "#FFFFFF", true, "#000000") : this.o.M(this.l()), this.o.C(this.name)
                        },
                        W: function() {
                            for (var a = this.I(); this.a.length > a;) {
                                var b = ~~(Math.random() * this.a.length);
                                this.a.splice(b, 1)
                            }
                            for (0 == this.a.length && 0 < a && this.a.push(new Va(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;) b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new Va(this, b.x, b.y, b.i, b.b))
                        },
                        I: function() {
                            var a = 10;
                            20 > this.size && (a = 0);
                            this.h &&
                            (a = 30);
                            var b = this.size;
                            this.h || (b *= g);
                            b *= G;
                            this.ba & 32 && (b *= .25);
                            return ~~Math.max(b, a)
                        },
                        qa: function() {
                            this.W();
                            for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
                                var d = a[(c - 1 + b) % b].b,
                                    e = a[(c + 1) % b].b;
                                a[c].b += (Math.random() - .5) * (this.n ? 3 : 1);
                                a[c].b *= .7;
                                10 < a[c].b && (a[c].b = 10); - 10 > a[c].b && (a[c].b = -10);
                                a[c].b = (d + e + 8 * a[c].b) / 10
                            }
                            for (var n = this, p = this.h ? 0 : (this.id / 1E3 + unixMS2 / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
                                var k = a[c].i,
                                    d = a[(c - 1 + b) % b].i,
                                    e = a[(c + 1) % b].i;
                                if (15 < this.size && null != aa && 20 < this.size * g && 0 < this.id) {
                                    var f = false,
                                        l = a[c].x,
                                        h =
                                            a[c].y;
                                    aa.ra(l - 5, h - 5, 10, 10, function(a) {
                                        a.V != n && 25 > (l - a.x) * (l - a.x) + (h - a.y) * (h - a.y) && (experience = true)
                                    });
                                    !experience && (a[c].x < ta || a[c].y < ua || a[c].x > va || a[c].y > wa) && (experience = true);
                                    experience && (0 < a[c].b && (a[c].b = 0), a[c].b -= 1)
                                }
                                k += a[c].b;
                                0 > k && (k = 0);
                                k = this.n ? (19 * k + this.size) / 20 : (12 * k + this.size) / 13;
                                a[c].i = (d + e + 8 * k) / 10;
                                d = 2 * Math.PI / b;
                                e = this.a[c].i;
                                this.h && 0 == c % 2 && (e += 5);
                                a[c].x = this.x + Math.cos(d * c + p) * e;
                                a[c].y = this.y + Math.sin(d * c + p) * e
                            }
                        },
                        P: function() {
                            if (0 >= this.id) return 1;
                            var a;
                            a = (unixMS2 - this.Q) / 120;
                            a = 0 > a ? 0 : 1 < a ? 1 : a;
                            var b = 0 > a ? 0 : 1 < a ? 1 : a;
                            this.l();
                            if (this.G &&
                                1 <= b) {
                                var c = U.indexOf(this); - 1 != c && U.splice(c, 1)
                            }
                            this.x = a * (this.J - this.s) + this.s;
                            this.y = a * (this.K - this.t) + this.t;
                            this.size = b * (this.q - this.r) + this.r;
                            return b
                        },
                        N: function() {
                            return 0 >= this.id ? true : this.x + this.size + 40 < v - windowWidth / 2 / g || this.y + this.size + 40 < w - windowHeight / 2 / g || this.x - this.size - 40 > v + windowWidth / 2 / g || this.y - this.size - 40 > w + windowHeight / 2 / g ? false : true
                        },
                        w: function(a) {
                            if (this.N()) {
                                ++this.Y;
                                var b = 0 < this.id && !this.h && !this.n && .4 > g;
                                5 > this.I() && 0 < this.id && (b = true);
                                if (this.R && !b)
                                    for (var c = 0; c < this.a.length; c++) this.a[c].i = this.size;
                                this.R = b;
                                a.save();
                                this.ja = unixMS2;
                                c = this.P();
                                this.G && (a.globalAlpha *= 1 - c);
                                a.lineWidth = 10;
                                a.lineCap = "round";
                                a.lineJoin = this.h ? "miter" : "round";
                                Ya ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = this.color, a.strokeStyle = this.color);
                                if (b) a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                                else {
                                    this.qa();
                                    a.beginPath();
                                    var d = this.I();
                                    a.moveTo(this.a[0].x, this.a[0].y);
                                    for (c = 1; c <= d; ++c) {
                                        var e = c % d;
                                        a.lineTo(this.a[e].x, this.a[e].y)
                                    }
                                }
                                a.closePath();
                                c = this.name.toLowerCase();
                                !this.n && Cb && ":teams" != gameMode ? (d = this.fa,
                                    null == d ? d = null : ":" == d[0] ? (Z.hasOwnProperty(d) || (Z[d] = new Image, Z[d].src = d.slice(1)), d = 0 != Z[d].width && Z[d].complete ? Z[d] : null) : d = null, d || (-1 != Gb.indexOf(c) ? (Y.hasOwnProperty(c) || (Y[c] = new Image, Y[c].src = "skins/" + c + ".png"), d = 0 != Y[c].width && Y[c].complete ? Y[c] : null) : d = null)) : d = null;
                                e = d;
                                b || a.stroke();
                                a.fill();
                                null != e && (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
                                (Ya || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                                a.globalAlpha =
                                    1;
                                d = -1 != h.indexOf(this);
                                b = ~~this.y;
                                if (0 != this.id && (Aa || d) && this.name && this.o && (null == e || -1 == bc.indexOf(c))) {
                                    e = this.o;
                                    e.C(this.name);
                                    e.M(this.l());
                                    c = 0 >= this.id ? 1 : Math.ceil(10 * g) / 10;
                                    e.ea(c);
                                    var e = e.L(),
                                        n = ~~(e.width / c),
                                        p = ~~(e.height / c);
                                    a.drawImage(e, ~~this.x - ~~(n / 2), b - ~~(p / 2), n, p);
                                    b += e.height / 2 / c + 4
                                }
                                0 < this.id && Db && (d || 0 == h.length && (!this.h || this.n) && 20 < this.size) && (null == this.O && (this.O = new za(this.l() / 2, "#FFFFFF", true, "#000000")), d = this.O, d.M(this.l() / 2), d.C(~~(this.size * this.size / 100)), c = Math.ceil(10 *
                                        g) / 10, d.ea(c), e = d.L(), n = ~~(e.width / c), p = ~~(e.height / c), a.drawImage(e, ~~this.x - ~~(n / 2), b - ~~(p / 2), n, p));
                                a.restore()
                            }
                        }
                    };
                    za.prototype = {
                        F: "",
                        S: "#000000",
                        U: false,
                        v: "#000000",
                        u: 16,
                        p: null,
                        T: null,
                        k: false,
                        D: 1,
                        M: function(a) {
                            this.u != a && (this.u = a, this.k = true)
                        },
                        ea: function(a) {
                            this.D != a && (this.D = a, this.k = true)
                        },
                        setStrokeColor: function(a) {
                            this.v != a && (this.v = a, this.k = true)
                        },
                        C: function(a) {
                            a != this.F && (this.F = a, this.k = true)
                        },
                        L: function() {
                            null == this.p && (this.p = document.createElement("canvas"), this.T = this.p.getContext("2d"));
                            if (this.k) {
                                this.k = false;
                                var a = this.p,
                                    b = this.T,
                                    c = this.F,
                                    d = this.D,
                                    e = this.u,
                                    n = e + "px Ubuntu";
                                b.font = n;
                                var p = ~~(.2 * e);
                                a.width = (b.measureText(c).width + 6) * d;
                                a.height = (e + p) * d;
                                b.font = n;
                                b.scale(d, d);
                                b.globalAlpha = 1;
                                b.lineWidth = 3;
                                b.strokeStyle = this.v;
                                b.fillStyle = this.S;
                                this.U && b.strokeText(c, 3, e - p / 2);
                                b.fillText(c, 3, e - p / 2)
                            }
                            return this.p
                        }
                    };
                    Date.now || (Date.now = function() {
                        return (new Date).getTime()
                    });
                    (function() {
                        for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !window.requestAnimationFrame; ++b) window.requestAnimationFrame = window[a[b] + "RequestAnimationFrame"],
                            window.cancelAnimationFrame = window[a[b] + "CancelAnimationFrame"] || window[a[b] + "CancelRequestAnimationFrame"];
                        window.requestAnimationFrame || (window.requestAnimationFrame = function(a) {
                            return setTimeout(a, 1E3 / 60)
                        }, window.cancelAnimationFrame = function(a) {
                            clearTimeout(a)
                        })
                    })();
                    var Jb = {
                            la: function(a) {
                                function b(a, b, c, d, e) {
                                    this.x = a;
                                    this.y = b;
                                    this.j = c;
                                    this.g = d;
                                    this.depth = e;
                                    this.items = [];
                                    this.c = []
                                }
                                var c = a.ma || 2,
                                    d = a.na || 4;
                                b.prototype = {
                                    x: 0,
                                    y: 0,
                                    j: 0,
                                    g: 0,
                                    depth: 0,
                                    items: null,
                                    c: null,
                                    H: function(a) {
                                        for (var b = 0; b < this.items.length; ++b) {
                                            var c = this.items[b];
                                            if (c.x >= a.x && c.y >= a.y && c.x < a.x + a.j && c.y < a.y + a.g) return true
                                        }
                                        if (0 != this.c.length) {
                                            var d = this;
                                            return this.$(a, function(b) {
                                                return d.c[b].H(a)
                                            })
                                        }
                                        return false
                                    },
                                    A: function(a, b) {
                                        for (var c = 0; c < this.items.length; ++c) b(this.items[c]);
                                        if (0 != this.c.length) {
                                            var d = this;
                                            this.$(a, function(c) {
                                                d.c[c].A(a, b)
                                            })
                                        }
                                    },
                                    m: function(a) {
                                        0 != this.c.length ? this.c[this.Z(a)].m(a) : this.items.length >= c && this.depth < d ? (this.ia(), this.c[this.Z(a)].m(a)) : this.items.push(a)
                                    },
                                    Z: function(a) {
                                        return a.x < this.x + this.j / 2 ? a.y < this.y + this.g / 2 ? 0 : 2 : a.y <
                                        this.y + this.g / 2 ? 1 : 3
                                    },
                                    $: function(a, b) {
                                        return a.x < this.x + this.j / 2 && (a.y < this.y + this.g / 2 && b(0) || a.y >= this.y + this.g / 2 && b(2)) || a.x >= this.x + this.j / 2 && (a.y < this.y + this.g / 2 && b(1) || a.y >= this.y + this.g / 2 && b(3)) ? true : false
                                    },
                                    ia: function() {
                                        var a = this.depth + 1,
                                            c = this.j / 2,
                                            d = this.g / 2;
                                        this.c.push(new b(this.x, this.y, c, d, a));
                                        this.c.push(new b(this.x + c, this.y, c, d, a));
                                        this.c.push(new b(this.x, this.y + d, c, d, a));
                                        this.c.push(new b(this.x + c, this.y + d, c, d, a));
                                        a = this.items;
                                        this.items = [];
                                        for (c = 0; c < a.length; c++) this.m(a[c])
                                    },
                                    clear: function() {
                                        for (var a =
                                            0; a < this.c.length; a++) this.c[a].clear();
                                        this.items.length = 0;
                                        this.c.length = 0
                                    }
                                };
                                var e = {
                                    x: 0,
                                    y: 0,
                                    j: 0,
                                    g: 0
                                };
                                return {
                                    root: new b(a.setGameMode, a.da, a.oa - a.setGameMode, a.pa - a.da, 0),
                                    m: function(a) {
                                        this.root.m(a)
                                    },
                                    A: function(a, b) {
                                        this.root.A(a, b)
                                    },
                                    ra: function(a, b, c, d, f) {
                                        e.x = a;
                                        e.y = b;
                                        e.j = c;
                                        e.g = d;
                                        this.root.A(e, experience)
                                    },
                                    H: function(a) {
                                        return this.root.H(a)
                                    },
                                    clear: function() {
                                        this.root.clear()
                                    }
                                }
                            }
                        },
                        nb = function() {
                            var a = new W(0, 0, 0, 32, "#ED1C24", ""),
                                b = document.createElement("canvas");
                            b.width = 32;
                            b.height = 32;
                            var c = b.getContext("2d");
                            return function() {
                                0 <
                                h.length && (a.color = h[0].color, a.B(h[0].name));
                                c.clearRect(0, 0, 32, 32);
                                c.save();
                                c.translate(16, 16);
                                c.scale(.4, .4);
                                a.w(c);
                                c.restore();
                                var d = document.getElementById("favicon"),
                                    e = d.cloneNode(true);
                                e.setAttribute("href", b.toDataURL("image/png"));
                                d.parentNode.replaceChild(e, d)
                            }
                        }();
                    $(function() {
                        nb()
                    });
                    $(function() {
                        +window.localStorage.wannaLogin && (window.localStorage.loginCache && handleLoginData(window.localStorage.loginCache), window.localStorage.fbPictureCache && $(".agario-profile-picture").attr("src", window.localStorage.fbPictureCache))
                    });
                    window.facebookLogin =
                        function() {
                            window.localStorage.wannaLogin = 1
                        };
                    window.fbAsyncInit = function() {
                        function a() {
                            window.localStorage.wannaLogin = 1;
                            null == window.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : window.FB.login(function(fbResponse) {
                                handleFBAuth(fbResponse)
                            }, {
                                scope: "public_profile, email"
                            })
                        }
                        window.FB.init({
                            appId: "677505792353827",
                            cookie: true,
                            xfbml: true,
                            status: true,
                            version: "v2.2"
                        });
                        window.FB.Event.subscribe("auth.statusChange", function(b) {
                            +window.localStorage.wannaLogin && ("connected" == b.status ? handleFBAuth(b) : a())
                        });
                        window.facebookLogin = a
                    };
                    window.logout =
                        function() {
                            loginToken = null;
                            $("#helloContainer").attr("data-logged-in", "0");
                            $("#helloContainer").attr("data-has-account-data", "0");
                            delete window.localStorage.wannaLogin;
                            delete window.localStorage.loginCache;
                            delete window.localStorage.fbPictureCache;
                            L()
                        };
                    var ac = function() {
                        function a(a, b, c, d, e) {
                            var f = b.getContext("2d"),
                                g = b.width;
                            b = b.height;
                            a.color = e;
                            a.B(c);
                            a.size = d;
                            experience.save();
                            experience.translate(g / 2, b / 2);
                            a.w(experience);
                            experience.restore()
                        }
                        for (var b = new W(-1, 0, 0, 32, "#5bc0de", ""), c = new W(-1, 0, 0, 32, "#5bc0de", ""), d = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "),
                                 f = [], g = 0; g < d.length; ++g) {
                            var h = g / d.length * 12,
                                k = 30 * Math.sqrt(g / d.length);
                            experience.push(new W(-1, Math.cos(h) * k, Math.sin(h) * k, 10, d[g], ""))
                        }
                        Yb(experience);
                        var m = document.createElement("canvas");
                        m.getContext("2d");
                        m.width = m.height = 70;
                        a(c, m, "", 26, "#ebc0de");
                        return function() {
                            $(".cell-spinner").filter(":visible").each(function() {
                                var c = $(this),
                                    d = Date.now(),
                                    f = this.width,
                                    g = this.height,
                                    h = this.getContext("2d");
                                h.clearRect(0, 0, experience, g);
                                h.save();
                                h.translate(experience / 2, g / 2);
                                for (var k = 0; 10 > k; ++k) h.drawImage(m, (.1 * d + 80 * k) % (experience + 140) - experience / 2 - 70 - 35,
                                    g / 2 * Math.sin((.001 * d + k) % Math.PI * 2) - 35, 70, 70);
                                h.restore();
                                (c = c.attr("data-itr")) && (c = da(c));
                                a(b, this, c || "", +$(this).attr("data-size"), "#5bc0de")
                            });
                            $("#statsPellets").filter(":visible").each(function() {
                                $(this);
                                var b = this.width,
                                    c = this.height;
                                this.getContext("2d").clearRect(0, 0, b, c);
                                for (b = 0; b < experience.length; b++) a(experience[b], this, "", experience[b].size, experience[b].color)
                            })
                        }
                    }();

                    window.createParty = function() {
                        setGameMode(":party");
                        N = function(a) {
                            Xa("/#" + window.encodeURIComponent(a));
                            $(".partyToken").val("agar.io/#" + window.encodeURIComponent(a));
                            $("#helloContainer").attr("data-party-state",
                                "1")
                        };
                        L()
                    };

                    window.joinParty = connectToParty;
                    window.cancelParty = function() {
                        Xa("/");
                        $("#helloContainer").attr("data-party-state", "0");
                        setGameMode("");
                        L()
                    };
                    var z = [],
                        Na = 0,
                        Oa = "#000000",
                        S = false,
                        Pa = false,
                        ob = 0,
                        pb = 0,
                        Ra = 0,
                        Qa = 0,
                        R = 0,
                        qb = true;
                    setInterval(function() {
                        Pa && z.push(xb() / 100)
                    }, 1E3 / 60);
                    setInterval(function() {
                        var a = $b();
                        0 != a && (++Ra, 0 == R && (R = a), R = Math.min(R, a))
                    }, 1E3);
                    window.closeStats = function() {
                        S = false;
                        $("#stats").hide();
                        la(0)
                    };
                    window.setSkipStats = function(a) {
                        qb = !a
                    };
                    $(function() {
                        $(setup)
                    })
                }
            }
        }
    }
})(window, window.jQuery);