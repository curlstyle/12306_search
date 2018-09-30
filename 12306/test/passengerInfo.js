var closeWin;
var dhxWins;
var isSubmitOrder = true;
var submitOrderClickEvent;
var submitOrderClickEvent_common;
var preStepClickEvent;
var numSet;
var ifAlertCode = false;
var intervalTime;
var qr_submitClickEvent;
var timeInterval = 1000;
var timers = 3;
var intervalProcess; (function(a) {
    a.TouLocalisPassenger = true
})(window); (function() {
    $(document).ready(function() {
        d();
        b();
        a();
        $("#fczk").click(function() {
            if ($(this).is(":checked")) {
                dhtmlx.createWin({
                    winId: "dialog_fczk",
                    closeWinId: ["dialog_fczk_close", "dialog_fczk_cancel"],
                    okId: "dialog_fczk_ok",
                    callback: function() {
                        $("#fczk")[0]["checked"] = false
                    }
                })
            }
        })
    });
    var m;
    function f(x, w) {
        var v = $("#qr_submit_id");
        if (x == 0) {
            clearTimeout(m);
            if (v) {
                v.unbind("click").bind("click", qr_submitClickEvent);
                v.removeClass("btn92").addClass("btn92s")
            }
            return
        } else {
            x--
        }
        m = setTimeout(function() {
            f(x, w)
        },
        w)
    }
    jQuery.extend({
        whatsSelect: function(x) {
            if (x) {
                var v = $('#normal_passenger_id input[type="checkbox"]:checked').length;
                return v > 0 ? true: false
            } else {
                var w = $('#dj_passenger_id input[type="checkbox"]:checked').length;
                return w > 0 ? true: false
            }
        }
    });
    function b() {
        $("#nvbbf").on("click",
        function() {
            if ($(this).is(":checked")) {
                $("#jtbf").attr("checked", false)
            }
        });
        $("#jtbf").on("click",
        function() {
            if ($(this).is(":checked")) {
                $("#nvbbf").attr("checked", false)
            }
        })
    }
    var l;
    function d(U) {
        dhxWins = new dhtmlXWindows();
        dhxWins.enableAutoViewport(true);
        dhxWins.setSkin("dhx_terrace");
        dhxWins.setImagePath(ctx + "resources/js/rich/windows/imgs/");
        closeWin = function(W, V) {
            unLoadGrayBackground();
            ableClickSubmitButtonOrPreStepBUtton();
            if (dhxWins.isWindow(W + "_")) {
                dhxWins.window(W + "_").setModal(false);
                dhxWins.window(W + "_").hide();
                if (V) {
                    refreshImg("passenger", "randp")
                }
            }
        };
        l = function(ac, Z, W, V, Y) {
            var ab = '<div class="tit">' + (Z ? '<span class="colorC">' + ac + "</span>": ac) + "</div>";
            var X = "<P>" + W + "</p>";
            var aa = Z ? '<p>请点击[<a href="' + ctx + 'queryOrder/init"><strong>我的12306</strong></a>]办理其他业务。您也可以点击[<a href="' + ctx + 'leftTicket/init"><strong>预订车票</strong></a>]，重新规划您的旅程。</p>': '<P>查看订单处理情况，请点击“<a href="' + ctx + 'queryOrder/initNoComplete">未完成订单</a>”</P>';
            if (!Z && canInsurance) {
                aa += "<P style='font-size:16px;color:#333;'><strong>欢迎购买铁路乘意险</strong></p>"
            }
            $("#iamge_status_id").removeClass().addClass("icon i-" + Y);
            if (V) {
                $("#up-box-hd_id").html("提示<a id='closeTranforDialog_id' href='#nogo'>关闭</a>");
                aa = "";
                $("#lay-btn_id").html("<a href='#nogo' id='qr_closeTranforDialog_id'  class='btn92s'>确认</a>")
            } else {
                $("#up-box-hd_id").html("提示");
                $("#lay-btn_id").html("")
            }
            $("#orderResultInfo_id").html(ab + (W == "" || W == null || W == "undefined" || W == undefined ? "": X) + aa);
            N("transforNotice_id");
            if (V) {
                $("#closeTranforDialog_id").click(function() {
                    closeWin("transforNotice_id", true)
                });
                $("#qr_closeTranforDialog_id").click(function() {
                    closeWin("transforNotice_id", true);
                    $("#i-ok").css("display", "none")
                })
            }
        };
        function N(aa) {
            closeWin(aa, false);
            if ("checkticketinfo_id" == aa) {
                var Y = ticketInfoForPassengerForm.queryLeftNewDetailDTO;
                if (Y.to_station_telecode == ticket_submit_order.special_areas.lso || Y.to_station_telecode == ticket_submit_order.special_areas.dao || Y.to_station_telecode == ticket_submit_order.special_areas.ado || Y.to_station_telecode == ticket_submit_order.special_areas.nqo || Y.to_station_telecode == ticket_submit_order.special_areas.tho) {
                    if (O()) {
                        if ("Y" == canChooseBeds) {
                            $("#notice_1_id").html("*选铺后如果系统票额不足，系统将随机为您申请铺位。")
                        } else {
                            $("#notice_1_id").html("*系统将随机为您申请席位，暂不支持自选席位。")
                        }
                        $("#notice_2_id").html("*根据现行规定，外国人在购买进西藏火车票时，须出示西藏自治区外事办公室或旅游局、商务厅的批准函（电），或者出示中国内地司局级接待单位出具的、已征得自治区上述部门同意的证明信函。台湾同胞赴藏从事旅游、商务活动，须事先向西藏自治区旅游局或商务厅提出申请，购买进藏火车票时须出示有关批准函。");
                        if (B()) {
                            $("#notice_3_id").html("*按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
                        } else {
                            $("#notice_3_id").html("")
                        }
                    }
                } else {
                    if ("Y" == canChooseBeds) {
                        $("#notice_1_id").html("*选铺后如果系统票额不足，系统将随机为您申请铺位。")
                    } else {
                        $("#notice_1_id").html("*系统将随机为您申请席位，暂不支持自选席位。")
                    }
                    if (B()) {
                        $("#notice_3_id").html("*按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
                    } else {
                        $("#notice_3_id").html("")
                    }
                }
                if (isDw) {
                    $("#jtbf").attr("checked", false);
                    $("#nvbbf").attr("checked", false)
                }
                if ("Y" == checkTrain) {
                    $("#checktrain").html("此类车站在互联网办理退票或改签的时间将由提前检票的时间而定，请旅客注意提前办理退签业务");
                    $("#checktrain").show()
                }
                g();
                c()
            }
            if (M() && canInsurance) {
                $("#notice_4_id").html('<strong><span style="color: #3177BF;font-size:12px;">*购买铁路乘意险的注册用户年龄须在18周岁以上，使用非二代居民身份证注册的用户如购买铁路乘意险，须在<a href="../modifyUser/initQueryUserInfo">“我的12306—个人信息”</a>如实填写“出生日期”。<br />*父母为未成年子女投保，须在<a href="../passengers/init">我的常用联系人</a>登记未成年子女的有效身份证件信息。</span></strong>')
            } else {
                $("#notice_4_id").html("")
            }
            if (transport_in_SF) {
                $("#notice_5_id").html("*改签或变更到站后的车票乘车日期在春运期间的，退票时一律按开车时间前不足24小时标准核收退票费。")
            }
            var X = x(aa);
            var V = $(window).width() / 2 - 300;
            var W = ifAlertCode ? 250 : 200;
            var Z = C() + ($(window).height() / 2 - W);
            X.setDimension($("#content_" + aa).width(), $("#content_" + aa).height() + 10);
            $(".dhtmlx_window_active").height($("#content_" + aa).height());
            $(".dhtmlx_window_active").css({
                left: V + "px",
                top: Z + "px"
            })
        }
        function G() {
            if (limit_tickets.length != 3) {
                return false
            }
            for (var W = 0; W < limit_tickets.length; W++) {
                var V = limit_tickets[W];
                if (! (V.seat_type == "F" || V.seat_type == "A")) {
                    return false
                }
            }
            return true
        }
        function z() {
            for (var W = 0; W < limit_tickets.length; W++) {
                var V = limit_tickets[W];
                if ((V.ticket_type == ticket_submit_order.ticket_type.child || V.ticket_type == ticket_submit_order.ticket_type.adult) && V.id_type == "1" && (V.seat_type == "F" || V.seat_type == "A")) {
                    if (Number(V.id_no.substr(17, 18)) % 2 != 0) {
                        return false
                    }
                } else {
                    return false
                }
            }
            return true
        }
        function M() {
            for (var W = 0; W < limit_tickets.length; W++) {
                var V = limit_tickets[W];
                if (V.ticket_type == ticket_submit_order.ticket_type.child) {
                    return true
                }
            }
            return false
        }
        function B() {
            for (var W = 0; W < limit_tickets.length; W++) {
                var V = limit_tickets[W];
                if (V.ticket_type == ticket_submit_order.ticket_type.student) {
                    return true
                }
            }
            return false
        }
        function O() {
            for (var W = 0; W < limit_tickets.length; W++) {
                var V = limit_tickets[W];
                if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.gc) && V.save_status != "" && (V.id_type == ticket_submit_order.passenger_card_type.passport || V.id_type == ticket_submit_order.passenger_card_type.work || V.id_type == ticket_submit_order.passenger_card_type.taiwan)) {
                    return true
                } else {
                    if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.wc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.dc) && (V.id_type == ticket_submit_order.passenger_card_type.passport || V.id_type == ticket_submit_order.passenger_card_type.work || V.id_type == ticket_submit_order.passenger_card_type.taiwan)) {
                        return true
                    }
                }
            }
            return false
        }
        $("#close_checkticketdialog_id").click(function() {
            closeWin("checkticketinfo_id", true)
        });
        $("#back_edit_id").click(function() {
            $("#qr_submit_id").show();
            closeWin("checkticketinfo_id", true);
            $("#i-okmypasscode1").css("display", "none");
            if (ifAlertCode) {
                try {
                    TouClick.get("touclick-randCode").reload()
                } catch(V) {
                    refreshImg("passenger", "randp")
                }
            }
        });
        function I() {
            if (ticketInfoForPassengerForm.isAsync == ticket_submit_order.request_flag.isAsync) {
                A(ticketInfoForPassengerForm.tour_flag)
            } else {
                K(ticketInfoForPassengerForm.tour_flag)
            }
        }
        function T() {
            var V = $("#qr_submit_id");
            V.unbind("click");
            V.removeClass("btn92s").addClass("btn92")
        }
        function S() {
            if (timers <= 0) {
                if (m) {
                    clearTimeout(m)
                }
                var V = $("#qr_submit_id");
                V.unbind("click").bind("click", qr_submitClickEvent);
                V.removeClass("btn92").addClass("btn92s")
            }
        }
        qr_submitClickEvent = function() {
            if (ifAlertCode && !verifyRandCode($("#randCode")[0], true)) {
                return
            }
            var V = j();
            if (V.length == 0 || limit_tickets.length == V.length / 2) {
                closeWin("checkticketinfo_id", false);
                loadGrayBackground();
                I()
            } else {
                dhtmlx.alert({
                    title: "警告",
                    ok: "确定",
                    text: "您还有未选座的乘客，请选座完成后再提交订单！",
                    type: "alert-error",
                    callback: function() {}
                })
            }
        };
        function D(V) {
            if (y()) {
                J()
            } else {
                unLoadGrayBackground();
                return
            }
        }
        submitOrderClickEvent = function() {
            submitOrderClickEvent_common()
        };
        doByAlert = function(W) {
            var V = $("#qr_submit_id");
            V.unbind("click");
            V.removeClass("btn92s").addClass("btn92");
            timeInterval = parseInt(intervalTime) / 3;
            f(timers, timeInterval);
            if (W) {
                $(".yzm").show();
                $("#randCodeForm_id").find("a").css("margin-top", "30px");
                ifAlertCode = true
            } else {
                $(".yzm").hide();
                ifAlertCode = false
            }
        };
        submitOrderClickEvent_common = function() {
            if (isDw == "Y" && $("#chooseAllDW").is(":checked")) {
                var X = $("#ticketInfo_id").find("select[id^=seatType_]");
                var W = X.eq(0).val();
                if (W != "A" && W != "F") {
                    alertWarningMsgByTit_header("提示", dwLimitErrorStStr);
                    $("#i-okmypasscode1").hide();
                    refreshImg("passenger", "randp");
                    return false
                }
                for (var V = 1,
                Y = X.length; V < Y; V++) {
                    var Z = X.eq(V);
                    if (Z.val() != W) {
                        alertWarningMsgByTit_header("提示", dwLimitErrorStStr);
                        $("#i-okmypasscode1").hide();
                        refreshImg("passenger", "randp");
                        return false
                    }
                    if (W == "A") {
                        if (X.length > 2) {
                            alertWarningMsgByTit_header("提示", dwLimitAStr);
                            $("#i-okmypasscode1").hide();
                            refreshImg("passenger", "randp");
                            $(this).attr("checked", false);
                            return false
                        }
                    }
                    if (W == "F") {
                        if (X.length > 4) {
                            alertWarningMsgByTit_header("提示", dwLimitFStr);
                            $("#i-okmypasscode1").hide();
                            refreshImg("passenger", "randp");
                            $(this).attr("checked", false);
                            return false
                        }
                    }
                }
            }
            loadGrayBackground();
            D()
        };
        function x(W) {
            var V = dhxWins.createWindow(W + "_", 0, 0, 660, 100);
            V.attachObject(W);
            V.clearIcon();
            V.denyResize();
            V.setModal(true);
            V.center();
            V.button("park").hide();
            V.button("minmax1").hide();
            V.hideHeader();
            return V
        }
        function C() {
            if ("pageYOffset" in window) {
                return window.pageYOffset
            } else {
                if (document.compatMode == "BackCompat") {
                    return document.body.scrollTop
                } else {
                    return document.documentElement.scrollTop
                }
            }
        }
        function K(V) {
            l("正在处理，请稍候。", false, "", false, "work");
            var Y = {
                passengerTicketStr: getpassengerTickets(),
                oldPassengerStr: getOldPassengers(),
                tour_flag: ticketInfoForPassengerForm.tour_flag,
                randCode: $("#randCode").val(),
                purpose_codes: ticketInfoForPassengerForm.purpose_codes,
                key_check_isChange: ticketInfoForPassengerForm.key_check_isChange,
                train_location: ticketInfoForPassengerForm.train_location,
                choose_seats: j(),
                seatDetailType: h(),
                whatsSelect: $.whatsSelect(true) ? "1": "0"
            };
            var X;
            if (isDw) {
                var W = "";
                if ($("#nvbbf").is(":checked")) {
                    W = "1"
                } else {
                    W = "0"
                }
                if ($("#jtbf").is(":checked")) {
                    W = W + "1"
                } else {
                    W = W + "0"
                }
                Y.roomType = W
            }
            if (V == ticket_submit_order.tour_flag.dc) {
                X = ctx + "confirmPassenger/confirmSingle";
                Y.dwAll = "N";
                if ($("#chooseAllDW")[0] && $("#chooseAllDW").is(":checked")) {
                    Y.dwAll = "Y"
                }
            } else {
                if (V == ticket_submit_order.tour_flag.wc) {
                    X = ctx + "confirmPassenger/confirmGo"
                } else {
                    if (V == ticket_submit_order.tour_flag.fc) {
                        X = ctx + "confirmPassenger/confirmBack";
                        Y.fczk = $("#fczk").is(":checked") ? "Y": "N"
                    } else {
                        if (V == ticket_submit_order.tour_flag.gc) {
                            X = ctx + "confirmPassenger/confirmResign"
                        } else {
                            l("订票失败!", true, "原因： 旅程形式为<span style='color:red'>" + V + "</sapn>,非法的旅程方式", true, "lose");
                            return
                        }
                    }
                }
            }
            $.ajax({
                url: X,
                type: "post",
                data: Y,
                dataType: "json",
                async: true,
                success: function(Z) {
                    if (Z.status) {
                        if (Z.data.submitStatus) {
                            otsRedirect("post", ctx + "payOrder/init?random=" + new Date().getTime(), {})
                        } else {
                            l("出票失败!", false, "原因： " + Z.data.errMsg + '<a  id="xg_close_win_id">点击修改</a>', false, "lose");
                            $("#xg_close_win_id").click(function() {
                                closeWin("transforNotice_id", true);
                                $("#i-ok").css("display", "none")
                            })
                        }
                    } else {
                        l("订票失败!", true, "很抱歉！请关闭窗口重新预定车票", true, "lose")
                    }
                },
                error: function(Z, ab, aa) {
                    l("订票失败!", true, "很抱歉！网络忙，请关闭窗口稍后再试。", true, "lose");
                    return
                }
            })
        }
        function A(V) {
            l("正在处理，请稍候。", false, "", false, "work");
            var Y = {
                passengerTicketStr: getpassengerTickets(),
                oldPassengerStr: getOldPassengers(),
                randCode: $("#randCode").val(),
                purpose_codes: ticketInfoForPassengerForm.purpose_codes,
                key_check_isChange: ticketInfoForPassengerForm.key_check_isChange,
                leftTicketStr: ticketInfoForPassengerForm.leftTicketStr,
                train_location: ticketInfoForPassengerForm.train_location,
                choose_seats: j(),
                seatDetailType: h(),
                whatsSelect: $.whatsSelect(true) ? "1": "0"
            };
            var X;
            Y.roomType = "00";
            if (isDw) {
                var W = "";
                if ($("#nvbbf").is(":checked")) {
                    W = "1"
                } else {
                    W = "0"
                }
                if ($("#jtbf").is(":checked")) {
                    W = W + "1"
                } else {
                    W = W + "0"
                }
                Y.roomType = W
            }
            if (V == ticket_submit_order.tour_flag.dc) {
                X = ctx + "confirmPassenger/confirmSingleForQueue";
                Y.dwAll = "N";
                if ($("#chooseAllDW")[0] && $("#chooseAllDW").is(":checked")) {
                    Y.dwAll = "Y"
                }
            } else {
                if (V == ticket_submit_order.tour_flag.wc) {
                    X = ctx + "confirmPassenger/confirmGoForQueue"
                } else {
                    if (V == ticket_submit_order.tour_flag.fc) {
                        X = ctx + "confirmPassenger/confirmBackForQueue";
                        Y.fczk = $("#fczk").is(":checked") ? "Y": "N"
                    } else {
                        if (V == ticket_submit_order.tour_flag.gc) {
                            X = ctx + "confirmPassenger/confirmResignForQueue"
                        } else {
                            l("订票失败!", true, "原因： 旅程形式<span style='color:red'>" + V + "</sapn>为非法的旅程方式", true, "lose");
                            return
                        }
                    }
                }
            }
            $.ajax({
                url: X,
                data: Y,
                type: "POST",
                dataType: "json",
                success: function(Z) {
                    if (Z.status) {
                        if (!Z.data.submitStatus) {
                            l("出票失败!", false, "原因： " + Z.data.errMsg + '<a id="xg_close_win_id" >点击修改</a>', false, "lose");
                            $("#xg_close_win_id").click(function() {
                                closeWin("transforNotice_id", true);
                                $("#i-ok").css("display", "none")
                            })
                        } else {
                            var aa = new OrderQueueWaitTime(V, v, Q);
                            aa.start()
                        }
                    } else {
                        l("订票失败!", true, "很抱歉！请关闭窗口重新预定车票", true, "lose")
                    }
                },
                error: function(Z, ab, aa) {
                    l("订票失败!", true, "很抱歉！网络忙，请关闭窗口稍后再试。", true, "lose");
                    return
                }
            })
        }
        function v(V, X, W) {
            if (X <= 5) {
                l("订单已经提交，系统正在处理中，请稍等。", false, "", false, "work")
            } else {
                if (X > 30 * 60) {
                    l("订单已经提交，预计等待时间超过30分钟，请耐心等待。", false, "", false, "queue")
                } else {
                    l("订单已经提交，最新预估等待时间" + W + "，请耐心等待。", false, "", false, "queue")
                }
            }
        }
        function Q(V, Y, W) {
            if (Y == -1 || Y == -100) {
                var X = "";
                if (V == ticket_submit_order.tour_flag.dc) {
                    X = ctx + "confirmPassenger/resultOrderForDcQueue"
                } else {
                    if (V == ticket_submit_order.tour_flag.wc) {
                        X = ctx + "confirmPassenger/resultOrderForWcQueue"
                    } else {
                        if (V == ticket_submit_order.tour_flag.fc) {
                            X = ctx + "confirmPassenger/resultOrderForFcQueue"
                        } else {
                            if (V == ticket_submit_order.tour_flag.gc) {
                                X = ctx + "confirmPassenger/resultOrderForGcQueue"
                            }
                        }
                    }
                }
                $.ajax({
                    url: X,
                    data: {
                        orderSequence_no: W.orderId
                    },
                    type: "POST",
                    dataType: "json",
                    success: function(Z) {
                        if (Z.status) {
                            if (Z.data.submitStatus) {
                                otsRedirect("post", ctx + "/payOrder/init?random=" + new Date().getTime(), {})
                            } else {
                                l("下单成功", false, "", false, "win")
                            }
                        } else {
                            l("下单成功。", false, "", false, "win")
                        }
                    },
                    error: function(Z, ab, aa) {
                        l("下单成功。", false, "", false, "win")
                    }
                })
            } else {
                L(Y, W)
            }
        }
        function L(V, W) {
            if (W.name && W.card && W.tel) {
                closeWin("transforNotice_id", true);
                $("#608_check_msg").html(W.msg);
                dhtmlx.createWin({
                    winId: "608_check",
                    closeWinId: ["608_check_close", "608_check_cancel"],
                    okId: "608_check_ok",
                    okCallBack: function() {
                        $("#608_name").html(W.name);
                        $("#608_card").html(W.card);
                        $("#608_tel").html(W.tel);
                        $("#ticketInfo").html(W.ticketInfo);
                        dhtmlx.createWin({
                            winId: "608_complain",
                            closeWinId: ["608_complain_close", "608_complain_cancel"],
                            okId: "608_complain_ok",
                            okCallBack: function() {
                                var X = dhtmlx.modalbox({
                                    targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                                    callback: function() {}
                                });
                                $.ajax({
                                    url: ctx + "confirmPassenger/report",
                                    type: "post",
                                    async: false,
                                    success: function(Y) {
                                        dhtmlx.modalbox.hide(X);
                                        if (Y.data == "Y") {
                                            dhtmlx.alert({
                                                title: "提示",
                                                ok: messages["button.ok"],
                                                text: "举报成功",
                                                type: "alert-info"
                                            })
                                        } else {
                                            dhtmlx.alert({
                                                title: "提示",
                                                ok: messages["button.ok"],
                                                text: "举报失败",
                                                type: "alert-error"
                                            })
                                        }
                                        $("#i-okmypasscode1").hide();
                                        refreshImg("passenger", "randp")
                                    },
                                    error: function(Y, aa, Z) {
                                        dhtmlx.modalbox.hide(X)
                                    }
                                })
                            },
                            checkConfirm: function() {
                                return true
                            }
                        });
                        $("#608_complain").css("top", "200px")
                    },
                    checkConfirm: function() {
                        return true
                    },
                    callback: function() {
                        $("#i-okmypasscode1").hide();
                        refreshImg("passenger", "randp")
                    }
                });
                $("#608_check").css("top", "200px");
                return
            }
            if (V == -1) {
                return
            } else {
                if (V == -2) {
                    if (W.errorcode == 0) {
                        l("订票失败!", true, "原因： " + W.msg, false, "lose")
                    } else {
                        l("订票失败!", true, "原因： " + W.msg, false, "lose")
                    }
                } else {
                    if (V == -3) {
                        l("哎呀,订票失败!", true, "订单已撤销", false, "lose")
                    } else {
                        window.location.href = ctx + "queryOrder/initNoComplete?random=" + new Date().getTime()
                    }
                }
            }
        }
        function F(V, W) {
            E(V, W)
        }
        function J() {
            T();
            $.ajax({
                url: ctx + "confirmPassenger/checkOrderInfo",
                type: "post",
                data: {
                    cancel_flag: "2",
                    bed_level_order_num: "000000000000000000000000000000",
                    passengerTicketStr: getpassengerTickets(),
                    oldPassengerStr: getOldPassengers(),
                    tour_flag: ticketInfoForPassengerForm.tour_flag,
                    randCode: $("#randCode").val(),
                    whatsSelect: $.whatsSelect(true) ? "1": "0"
                },
                dataType: "json",
                async: true,
                success: function(V) {
                    if (!V.data.submitStatus) {
                        if (V.data.isRelogin) {
                            window.location.href = ctx + "login/init?random=" + new Date().getTime()
                        } else {
                            if (V.data.isNoActive) {
                                l(V.data.errMsg, true, "", true, "warn")
                            } else {
                                if (V.data.checkSeatNum) {
                                    l("很抱歉，无法提交您的订单!", true, "原因： " + V.data.errMsg, true, "warn")
                                } else {
                                    l("出票失败!", true, "原因： " + V.data.errMsg, true, "warn")
                                }
                            }
                        }
                        return
                    }
                    intervalTime = V.data.ifShowPassCodeTime;
                    if (V.data.ifShowPassCode == "Y") {
                        doByAlert(true)
                    } else {
                        doByAlert(false)
                    }
                    canChooseSeats = V.data.canChooseSeats;
                    choose_Seats = V.data.choose_Seats;
                    canChooseBeds = V.data.canChooseBeds;
                    isCanChooseMid = V.data.isCanChooseMid;
                    if (V.data.smokeStr != "" && V.data.smokeStr.length > 0) {
                        $("#dialog_smoker_msg").html(V.data.smokeStr);
                        dhtmlx.createWin({
                            winId: "dialog_smoker",
                            closeWinId: ["dialog_smoker_close", "dialog_smoker_cancel"],
                            okId: "dialog_smoker_ok",
                            okCallBack: function() {
                                P(V)
                            },
                            checkConfirm: function() {
                                return true
                            },
                            callback: function() {
                                $('div[dhxbox="1"]').hide();
                                $("#qr_submit_id").show();
                                closeWin("checkticketinfo_id", true);
                                $("#i-okmypasscode1").css("display", "none");
                                try {
                                    TouClick.get("touclick-randCode").reload()
                                } catch(W) {
                                    refreshImg("passenger", "randp")
                                }
                            }
                        })
                    } else {
                        P(V)
                    }
                },
                error: function(V, X, W) {
                    l("网络忙，请稍后再试。", true, "", true, "warn");
                    return
                }
            })
        }
        function P(V) {
            $('div[dhxbox="1"]').hide();
            var W = V.data.get608Msg;
            if (undefined != W && typeof(W) != "undefined" && "" != W) {
                if (V.data.name && V.data.card && V.data.tel) {
                    $("#608_check_msg").html(W);
                    dhtmlx.createWin({
                        winId: "608_check",
                        closeWinId: ["608_check_close", "608_check_cancel"],
                        okId: "608_check_ok",
                        okCallBack: function() {
                            $("#608_name").html(V.data.name);
                            $("#608_card").html(V.data.card);
                            $("#608_tel").html(V.data.tel);
                            $("#ticketInfo").html(V.data.ticketInfo);
                            dhtmlx.createWin({
                                winId: "608_complain",
                                closeWinId: ["608_complain_close", "608_complain_cancel"],
                                okId: "608_complain_ok",
                                okCallBack: function() {
                                    var X = dhtmlx.modalbox({
                                        targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                                        callback: function() {}
                                    });
                                    $.ajax({
                                        url: ctx + "confirmPassenger/report",
                                        type: "post",
                                        async: false,
                                        success: function(Y) {
                                            dhtmlx.modalbox.hide(X);
                                            if (Y.data == "Y") {
                                                dhtmlx.alert({
                                                    title: "提示",
                                                    ok: messages["button.ok"],
                                                    text: "举报成功",
                                                    type: "alert-info"
                                                })
                                            } else {
                                                dhtmlx.alert({
                                                    title: "提示",
                                                    ok: messages["button.ok"],
                                                    text: "举报失败",
                                                    type: "alert-error"
                                                })
                                            }
                                            $("#i-okmypasscode1").hide();
                                            refreshImg("passenger", "randp")
                                        },
                                        error: function(Y, aa, Z) {
                                            dhtmlx.modalbox.hide(X)
                                        }
                                    })
                                },
                                checkConfirm: function() {
                                    return true
                                }
                            });
                            $("#608_complain").css("top", "200px")
                        },
                        checkConfirm: function() {
                            return true
                        },
                        callback: function() {
                            $("#i-okmypasscode1").hide();
                            refreshImg("passenger", "randp")
                        }
                    });
                    $("#608_check").css("top", "200px");
                    ableClickSubmitButtonOrPreStepBUtton()
                } else {
                    dhtmlx.alert({
                        title: "警告",
                        ok: "确定",
                        text: W,
                        type: "alert-error",
                        callback: function() {
                            renderTickInfo(limit_tickets);
                            F(ticketInfoForPassengerForm.purpose_codes, V.data.isCheckOrderInfo, V.data.doneHMD)
                        }
                    })
                }
            } else {
                renderTickInfo(limit_tickets);
                F(ticketInfoForPassengerForm.purpose_codes, V.data.isCheckOrderInfo, V.data.doneHMD)
            }
        }
        function E(V, W) {
            var X = "";
            if (ticketInfoForPassengerForm.isAsync == ticket_submit_order.request_flag.isAsync && ticketInfoForPassengerForm.queryLeftTicketRequestDTO.ypInfoDetail != "") {
                $.ajax({
                    url: ctx + "confirmPassenger/getQueueCount",
                    type: "post",
                    data: {
                        train_date: new Date(orderRequestDTO.train_date.time).toString(),
                        train_no: orderRequestDTO.train_no,
                        stationTrainCode: orderRequestDTO.station_train_code,
                        seatType: limit_tickets[0].seat_type,
                        fromStationTelecode: orderRequestDTO.from_station_telecode,
                        toStationTelecode: orderRequestDTO.to_station_telecode,
                        leftTicket: ticketInfoForPassengerForm.queryLeftTicketRequestDTO.ypInfoDetail,
                        purpose_codes: V,
                        train_location: ticketInfoForPassengerForm.train_location,
                        isCheckOrderInfo: W
                    },
                    dataType: "json",
                    success: function(Y) {
                        if (Y.status) {
                            if (Y.data.isRelogin == "Y") {
                                window.location.href = ctx + "login/init?random=" + new Date().getTime()
                            }
                            var Z = Y.data.ticket.split(",");
                            X = "本次列车，" + (limit_tickets[0].seat_type_name).split("（")[0] + "余票";
                            if (parseInt(Z[0]) >= 0) {
                                X += "<strong>" + Z[0] + "</strong>张"
                            } else {
                                X += Z[0]
                            }
                            if (Z.length > 1) {
                                X += ",无座余票";
                                if (parseInt(Z[1]) >= 0) {
                                    X += "<strong>" + Z[1] + "</strong>张"
                                } else {
                                    X += Z[1]
                                }
                            }
                            X += "。";
                            if (Y.data.op_2 == "true") {
                                X += '<font color="red">目前排队人数已经超过余票张数，请您选择其他席别或车次。</font>';
                                $("#qr_submit_id").hide()
                            } else {
                                if (Y.data.countT > 0) {
                                    X += '目前排队人数<font color="red">' + Y.data.countT + "</font>人，";
                                    X += "<br/>请确认以上信息是否正确，点击“确认”后，系统将为您随机分配席位。"
                                }
                            }
                            var aa = $("#sy_ticket_num_id");
                            if (aa != null) {
                                aa.html(X)
                            }
                            doTicketTitleShow(true);
                            renderCheckTickInfo(limit_tickets);
                            N("checkticketinfo_id");
                            if (parseInt(Z[0]) > 0 || parseInt(Z[1]) > 0 || "充足" == Z[0] || "充足" == Z[1]) {
                                S()
                            }
                        } else {
                            S()
                        }
                    },
                    error: function(Y, aa, Z) {
                        S();
                        return
                    }
                })
            } else {
                doTicketTitleShow(true);
                renderCheckTickInfo(limit_tickets);
                N("checkticketinfo_id");
                S()
            }
        }
        function R(W, V) {
            rt = "";
            seat_1 = -1;
            seat_2 = -1;
            i = 0;
            while (i < W.length) {
                s = W.substr(i, 10);
                c_seat = s.substr(0, 1);
                if (c_seat == V) {
                    count = s.substr(6, 4);
                    while (count.length > 1 && count.substr(0, 1) == "0") {
                        count = count.substr(1, count.length)
                    }
                    count = parseInt(count);
                    if (count < 3000) {
                        seat_1 = count
                    } else {
                        seat_2 = (count - 3000)
                    }
                }
                i = i + 10
            }
            if (seat_1 > -1) {
                rt += seat_1
            }
            if (seat_2 > -1) {
                rt += "," + seat_2
            }
            return rt
        }
        preStepClickEvent = function() {
            otsRedirect("post", ctx + "leftTicket/init?random=" + new Date().getTime(), {
                pre_step_flag: "preStep"
            });
            return false
        };
        function H(V, W) {
            $("#" + V).removeClass("btn92s");
            $("#" + V).addClass("btn92")
        }
        function w(V, W) {
            $("#" + V).removeClass("btn92");
            $("#" + V).addClass("btn92s")
        }
        function y() {
            upadateSavePassengerInfo();
            stepFirValidatorTicketInfo(false);
            if (t() && p()) {
                return true
            } else {
                return false
            }
        }
    }
    function t() {
        var v = $("span[id$='_check']");
        var x = true;
        for (var w = 0; w < v.length; w++) {
            if ($(v[w]).css("display") != "none") {
                x = false;
                break
            }
        }
        return x
    }
    function p() {
        if (limit_tickets.length > init_limit_ticket_num) {
            l("最多只能购买" + init_limit_ticket_num + "张票", true, "", true, "warn");
            return false
        } else {
            if (limit_tickets.length < 1) {
                l("至少选择一位乘客", true, "", true, "warn");
                return false
            }
        }
        var y = 0;
        var D = new Array();
        var v = new Array();
        var w = "3456ACFGHL";
        var C = new Array();
        var F = new Array();
        for (var z = 0; z < limit_tickets.length; z++) {
            var E = limit_tickets[z];
            F.push(E.ticket_type);
            if ((ticket_submit_order.tour_flag.wc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.dc == ticketInfoForPassengerForm.tour_flag) && ticket_submit_order.ticket_type.child != E.ticket_type) {
                if (jQuery.inArray(E.id_no, C) < 0) {
                    C.push(E.id_no)
                } else {
                    var A = ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(0, 4) + "年" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(4, 2) + "月" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(6, 2) + "日";
                    l("出票失败", true, "互联网售票实行实名制：证件号<span style='color:red'><i><b>" + E.id_no + "</b></i></span>只能购买" + A + "车次" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.station_train_code + "的一张车票！", true, "warn");
                    return false
                }
            } else {
                if ((ticket_submit_order.tour_flag.wc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.dc == ticketInfoForPassengerForm.tour_flag) && E.save_status != "" && ticket_submit_order.ticket_type.child != E.ticket_type) {
                    if (jQuery.inArray(E.id_no, C) < 0) {
                        C.push(E.id_no)
                    } else {
                        var A = ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(0, 4) + "年" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(4, 2) + "月" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.train_date.substr(6, 2) + "日";
                        l("出票失败", true, "互联网售票实行实名制：证件号<span style='color:red'><i><b>" + E.id_no + "</b></i></span>只能购买" + A + "车次" + ticketInfoForPassengerForm.queryLeftTicketRequestDTO.station_train_code + "的一张车票！", true, "warn");
                        return false
                    }
                }
            }
            if (E.save_status != "") {
                y++;
                if (ticket_submit_order.tour_flag.gc == ticketInfoForPassengerForm.tour_flag) {
                    if (v.length > 0) {
                        if (jQuery.inArray(E.seat_type, v) < 0) {
                            l("出票失败", true, (CHANGETSFLAG == "Y" ? "变更到站": "改签") + "时，必须选择相同席别", true, "warn");
                            return false
                        }
                    }
                    v.push(E.seat_type);
                    if (w.indexOf(E.seat_type) > -1) {
                        D.push(E.seat_type)
                    }
                    if (D.length > 1) {
                        l("出票失败", true, "卧铺不支持批量" + (CHANGETSFLAG == "Y" ? "变更到站": "改签") + "，请单张" + (CHANGETSFLAG == "Y" ? "变更到站": "改签") + "！", true, "warn");
                        return false
                    }
                }
            }
            if (E.ticket_type == ticket_submit_order.ticket_type.disability) {
                var x = id_type_code;
                if (x != ticket_submit_order.passenger_card_type.two) {
                    l("出票失败", true, "第 " + (z + 1) + " 张车票： 当前登录用户证件类型不是二代身份证，购买残疾军人（伤残警察）优待票需使用中华人民共和国居民身份证！", true, "warn");
                    return false
                } else {
                    if (E.id_type != ticket_submit_order.passenger_card_type.two) {
                        l("出票失败", true, "第 " + (z + 1) + " 张车票： 乘客证件类型不是二代身份证，购买残疾军人（伤残警察）优待票需使用中华人民共和国居民身份证！", true, "warn");
                        return false
                    }
                }
            }
            if (ticket_submit_order.tour_flag.wc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.dc == ticketInfoForPassengerForm.tour_flag) {
                if (E.ticket_type == ticket_submit_order.ticket_type.student) {
                    if (E.passenger_type != ticket_submit_order.passenger_type.student) {
                        var B = $.whatsSelect(false);
                        if (!B) {
                            l("出票失败", true, "第 " + (z + 1) + " 张车票： 乘客不是学生，请从常用联系人中选择学生购买此车票。", true, "warn");
                            return false
                        }
                    }
                }
            }
        }
        if (ticket_submit_order.tour_flag.fc == ticketInfoForPassengerForm.tour_flag || ticket_submit_order.tour_flag.gc == ticketInfoForPassengerForm.tour_flag) {
            if (y == 0) {
                l(ticket_submit_order.tour_flag.fc == ticketInfoForPassengerForm.tour_flag ? "此次购买返程车票至少选择一位乘客": "此次" + (CHANGETSFLAG == "Y" ? "变更到站": "改签") + "至少选择一位乘客", true, "", true, "warn");
                return false
            }
        }
        return true
    }
    function u() {
        if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.wc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.dc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc) {
            var x = "";
            var w = [];
            for (var y = 0; y < limit_tickets.length; y++) {
                var v = limit_tickets[y].seat_type;
                var z = limit_tickets[y].ticket_type;
                if (z == ticket_submit_order.ticket_type.child) {
                    w.push(v)
                } else {
                    x += v
                }
            }
            for (var y = 0; y < w.length; y++) {
                if (x.indexOf(w[y]) == -1) {
                    l("订票失败!", true, "儿童不能单独购买一种席别，儿童票席别类型需与成人票席别类型一致。", true, "lose");
                    unLoadGrayBackground();
                    return false
                }
            }
        }
        return true
    }
    var n = 0;
    var o = new Array();
    function a() {
        $("div#id-seat-sel div.sel-item a").on("click",
        function() {
            if ($(this).attr("class") == "cur") {
                $(this).removeClass("cur");
                n--;
                var w = $(this).attr("id");
                $.each(o,
                function(x, z) {
                    var y = $(z).attr("id");
                    if (w == y) {
                        o.splice(x, 1)
                    }
                });
                $("#selectNo").html(n + "/" + r())
            } else {
                o.push($(this));
                $(this).addClass("cur");
                if (n == r()) {
                    var v = o[n - 1];
                    $(v).removeClass("cur");
                    o.splice(n - 1, 1);
                    return
                }
                n++;
                $("#selectNo").html(n + "/" + r())
            }
        })
    }
    function g() {
        q();
        if (limit_tickets && limit_tickets.length > 0) {
            var z = "Y";
            var w = limit_tickets[0].seat_type;
            for (var y = 0; y < limit_tickets.length; y++) {
                var v = limit_tickets[y];
                if (v.seat_type != w) {
                    z = "N";
                    break
                }
            }
            if (canChooseSeats && "Y" == canChooseSeats && "Y" == z) {
                if (choose_Seats) {
                    var x = "*如果本次列车剩余席位无法满足您的选座需求，系统将自动为您分配席位。";
                    if ("M" == w && choose_Seats.indexOf("M") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#yideng1").css("display", "block");
                        if (limit_tickets.length > 1 && r() > 1) {
                            $("#yideng2").css("display", "block")
                        }
                        $("#notice_1_id").html(x)
                    }
                    if ("O" == w && choose_Seats.indexOf("O") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#erdeng1").css("display", "block");
                        if (limit_tickets.length > 1 && r() > 1) {
                            $("#erdeng2").css("display", "block")
                        }
                        $("#notice_1_id").html(x)
                    }
                    if ("P" == w && choose_Seats.indexOf("P") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#tedeng1").css("display", "block");
                        if (limit_tickets.length > 1 && r() > 1) {
                            $("#tedeng2").css("display", "block")
                        }
                        $("#notice_1_id").html(x)
                    }
                    if ("9" == w && choose_Seats.indexOf("9") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#tedeng1").css("display", "block");
                        if (limit_tickets.length > 1 && r() > 1) {
                            $("#tedeng2").css("display", "block")
                        }
                        $("#notice_1_id").html(x)
                    }
                }
            }
        }
    }
    function q() {
        $("div#id-seat-sel div.sel-item a").removeClass("cur");
        n = 0;
        o = new Array();
        $("#selectNo").html(n + "/" + r());
        $("#id-seat-sel.sel-item").css("display", "none");
        $("#id-seat-sel").css("display", "none");
        $("#confirmDiv").css("padding", "10px 0");
        $("#checktrain").css("display", "none");
        $("#yideng1").css("display", "none");
        $("#yideng2").css("display", "none");
        $("#erdeng1").css("display", "none");
        $("#erdeng2").css("display", "none");
        $("#tedeng1").css("display", "none");
        $("#tedeng2").css("display", "none")
    }
    function j() {
        var v = "";
        $.each($("div#id-seat-sel div.seat-sel-bd a"),
        function() {
            if ($(this).attr("class") == "cur") {
                var w = $(this).attr("id");
                v += w
            }
        });
        return v
    }
    function k() {
        if (n != 0 && n != r()) {
            $("#confirmDiv").css("padding", "9px 0");
            $("#checktrain").html("请按照乘车人个数选座对应的席位。");
            $("#checktrain").show();
            return false
        } else {
            return true
        }
    }
    function r() {
        var x = limit_tickets.length;
        for (var w = 0; w < limit_tickets.length; w++) {
            var v = limit_tickets[w];
            if (v.tour_flag == "gc" || v.tour_flag == "fc") {
                if (v.save_status == "") {
                    x--
                }
            }
        }
        return x
    }
    function c() {
        e();
        if (limit_tickets && limit_tickets.length > 0) {
            if (canChooseBeds && "Y" == canChooseBeds) {
                $("#id-bed-sel").css("display", "block");
                $("#notice_1_id").html("*选铺后如果系统票额不足，系统将随机为您申请铺位。");
                if (isCanChooseMid && "Y" == isCanChooseMid) {
                    $("#mid_bed").css("display", "block")
                } else {
                    $("#mid_bed").css("display", "none")
                }
            } else {
                $("#id-bed-sel").css("display", "none")
            }
        }
    }
    numSet = function(y, v) {
        var D = parseInt($("#x_no").text());
        var z = parseInt($("#z_no").text());
        var x = parseInt($("#s_no").text());
        var B = r();
        var w = D + z + x;
        if ("add" == y) {
            if (w < B) {
                var C = document.getElementById(v).innerText;
                var A = parseInt(C) + 1;
                document.getElementById(v).innerText = A;
                $("#selectBedNo").html(w + 1 + "/" + B)
            }
        } else {
            var C = document.getElementById(v).innerText;
            if (w > 0 && parseInt(C) > 0) {
                var A = parseInt(C) - 1;
                document.getElementById(v).innerText = A;
                $("#selectBedNo").html(w - 1 + "/" + B)
            }
        }
    };
    function e() {
        $("#x_no").html("0");
        $("#z_no").html("0");
        $("#s_no").html("0");
        $("#selectBedNo").html(0 + "/" + r());
        $("#confirmDiv").css("padding", "10px 0");
        $("#checktrain").css("display", "none")
    }
    function h() {
        var v = $("#x_no").text();
        var w = $("#z_no").text();
        var x = $("#s_no").text();
        return v + w + x
    }
})();
var selectedTicketPassengerAll;
var responseNormalPassengerClick;
var addPassengerInfo;
var responseDjPassengerClick;
var delPassengerInfo;
var upadateSavePassengerInfo;
var getpassengerTickets;
var getOldPassengers;
var renderTickInfo;
var limit_tickets;
var doTicketTitleShow;
var renderCheckTickInfo;
var stepFirValidatorTicketInfo;
var updateAllCheckBox;
var updateSeatTypeByeTickeType;
var getSeatTypePriceForSeatName;
var getI18nResourceValueBykeyForJs;
var getDjPassengerOfPassengerType;
var getSuitNameByFlag;
var getSeatTypePrices;
var ableClickSubmitButtonOrPreStepBUtton;
var disableClickSubmitButtonOrPreStepBUtton;
var dwLimitAStr = "高级动卧整包购买，最多只能购买2张车票";
var dwLimitFStr = "动卧整包购买，最多只能购买4张车票";
var dwLimitXBStr = "请勾选动卧或高级动卧后，选择购买整包";
var dwLimitErrorStStr = "整包购买，所有乘车人请选择相同的席别(动卧或高级动卧)"; (function() {
    var M = new Array();
    var az = new Array();
    var g = new Array();
    var d = new Array();
    var i = 16;
    var D;
    limit_tickets = new Array();
    var ay = null;
    $(document).ready(function() {
        if (isLimitTran == "Y") {
            dhtmlx.alert({
                title: "温馨提示",
                ok: "确定",
                text: "尊敬的旅客，为防止网上囤票倒票，给广大旅客创造一个公平的购票环境，凡通过互联网或手机购买的本次列车车票，如需办理退票、改签和变更到站等变更业务，请持乘车人身份证件原件到就近车站办理，代办时还需持代办人的身份证件原件。请您确认后购票。",
                type: "alert-info"
            })
        }
        j();
        au();
        y();
        D = P(ticket_seat_codeMap, defaultTicketTypes);
        initPageTitle("1");
        doTicketTitleShow(false);
        x();
        ao();
        if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.dc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.wc) {
            v();
            F();
            ax()
        }
        $("#selected_ticket_passenger_all").prop("checked", true);
        h();
        if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc && $("#dw_fczk")[0]) {
            var aC = $("#ticketInfo_id").find("select[id^=seatType_]");
            var aA = false;
            for (var aB = 0,
            aD = aC.length; aB < aD; aB++) {
                var aE = aC.eq(aB);
                var aF = aE.val();
                if (aF == "A" || aF == "F") {
                    aA = true;
                    break
                }
            }
            if (aA) {
                $("#dw_fczk").show()
            }
        }
    });
    function y() {
        $.views.helpers({
            seatTypePriceForSeatName: function(aA) {
                return getSeatTypePriceForSeatName(aA)
            },
            getValueBykeyFromI18N: function(aA) {
                getI18nResourceValueBykeyForJs(aA)
            },
            isChangeStation: function() {
                return CHANGETSFLAG == "Y"
            },
            getTourFlagByKey: function(aA) {
                return ticket_submit_order.tour_flag[aA]
            },
            getTicketType: function(aA) {
                return ticket_submit_order.ticket_type[aA]
            },
            getIdType: function(aA) {
                return ticket_submit_order.passenger_card_type[aA]
            },
            getSuitName: function(aA, aB) {
                return getSuitNameByFlag(aA, aB)
            },
            getCurrentUserIdType: function() {
                return id_type_code
            },
            isExistWZ: function(aD) {
                if (ticket_submit_order.seatType.yz_type == aD) {
                    var aC = getSeatTypePrices();
                    for (var aA = 0; aA < aC.length; aA++) {
                        var aB = aC[aA];
                        if (aB.seat_type_name == "硬座" && aB.wp_statu) {
                            return true
                        }
                    }
                }
                return false
            },
            isCanAdd: function() {
                return can_add
            }
        })
    }
    function P(aA, aD) {
        var aE = new Array();
        for (var aC in aA) {
            for (var aB in aD) {
                if (aD[aB].id == aC) {
                    aE.push(aD[aB]);
                    break
                }
            }
        }
        aE = aE.sort(function(aG, aF) {
            if (aF.id > aG.id) {
                return - 1
            } else {
                if (aF.id == aG.id) {
                    return 0
                } else {
                    return 1
                }
            }
        });
        return aE
    }
    function ad() {
        $("#psInfo").mouseenter(function(aC) {
            var aA = aC.pageY + 10;
            var aB = aC.pageX;
            $(".srr-tips").eq(1).css({
                top: aA,
                left: aB
            });
            $(".srr-tips").eq(1).show()
        });
        $("#psInfo").mouseleave(function() {
            $(".srr-tips").hide()
        })
    }
    function am() {
        $("#psInfo").mouseenter(function(aC) {
            var aA = aC.pageY + 10;
            var aB = aC.pageX;
            $(".srr-tips").eq(0).css({
                top: aA,
                left: aB
            });
            $(".srr-tips").eq(0).show()
        });
        $("#psInfo").mouseleave(function() {
            $(".srr-tips").hide()
        })
    }
    function h() {
        $("#randCodeForm_id").on("submit",
        function(aA) {
            aA.preventDefault()
        })
    }
    function ac() {
        $(".pos-rel input").focus(function() {
            elemOnkeyupNotice(this);
            $(this).next().show();
            $(this).css("border", "1px solid #2D8DCF")
        }).mouseover(function() {
            if (!$(this).prop("disabled")) {
                elemOnkeyupNotice(this);
                $(this).next().show();
                $(this).css("border", "1px solid #2D8DCF")
            }
        });
        $(".pos-rel input").mouseout(function() {
            $(this).next().hide();
            $(this).css("border", "1px solid #CFCDC7")
        });
        $(".pos-rel input").blur(function() {
            $(this).next().hide();
            $(this).css("border", "1px solid #CFCDC7")
        })
    }
    function ao() {
        G("0")
    }
    function G(aF) {
        if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc && goOrderDTO != null) {
            var aC = goOrderDTO.tickets;
            var aE = new Array();
            for (var aD = 0; aD < aC.length; aD++) {
                var aG = aC[aD];
                aE.push(new p(new Date(aG.train_date.time), new Date(aG.stationTrainDTO.start_time.time), aG.stationTrainDTO.station_train_code, aG.stationTrainDTO.from_station_name, aG.stationTrainDTO.to_station_name, aG.seat_type_name, aG.coach_name, aG.seat_name, aG.passengerDTO.passenger_name, aG.passengerDTO.passenger_id_type_name, aG.ticket_type_name, aG.ticket_price));
                limit_tickets.push(new Z("sdAdd_" + Y(), aG.seat_type_code, aG.seat_type_name, aG.ticket_type_code, aG.ticket_type_name, aG.passengerDTO.passenger_name, aG.passengerDTO.passenger_id_type_code, af(aG.passengerDTO.passenger_id_no, aG.passengerDTO.passenger_id_type_code, aG.passengerDTO.passenger_id_type_name), aG.passengerDTO.passenger_id_no, aG.passengerDTO.mobile_no, "checked='checked'", ticketInfoForPassengerForm.tour_flag, true, "", true))
            }
            at(aE);
            ableClickSubmitButtonOrPreStepBUtton()
        } else {
            if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.gc && oldTicketDTOs != null) {
                var aB = new Array();
                for (var aD = 0; aD < oldTicketDTOs.length; aD++) {
                    var aG = oldTicketDTOs[aD];
                    aB.push(new p(new Date(aG.train_date.time), new Date(aG.stationTrainDTO.start_time.time), aG.stationTrainDTO.station_train_code, aG.stationTrainDTO.from_station_name, aG.stationTrainDTO.to_station_name, aG.seat_type_name, aG.coach_name, aG.seat_name, aG.passengerDTO.passenger_name, aG.passengerDTO.passenger_id_type_name, aG.ticket_type_name, aG.ticket_price));
                    limit_tickets.push(new Z("sdAdd_" + Y(), aG.seat_type_code, aG.seat_type_name, aG.ticket_type_code, aG.ticket_type_name, aG.passengerDTO.passenger_name, aG.passengerDTO.passenger_id_type_code, af(aG.passengerDTO.passenger_id_no, aG.passengerDTO.passenger_id_type_code, aG.passengerDTO.passenger_id_type_name), aG.passengerDTO.passenger_id_no, aG.passengerDTO.mobile_no, "checked='checked'", ticketInfoForPassengerForm.tour_flag, true, "", true))
                }
                aj(aB);
                ableClickSubmitButtonOrPreStepBUtton()
            } else {
                var aA = new Z("default_" + (Number(Y()) + Number(aF)), "", "", ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? ticket_submit_order.ticket_type.student: "", "", "", "", "", "", "", ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? "": "checked='checked'", ticketInfoForPassengerForm.tour_flag, ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? true: false, ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? ticket_submit_order.passenger_type.student: "", ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? false: true);
                limit_tickets.push(aA)
            }
        }
        renderTickInfo(limit_tickets, false)
    }
    function Y() {
        if (limit_tickets.length < 1) {
            return limit_tickets.length
        } else {
            var aC = 0;
            for (var aB = 0; aB < limit_tickets.length; aB++) {
                var aA = Number(limit_tickets[aB].only_id.split("_")[1]);
                if (aA > aC) {
                    aC = aA
                }
            }
            return aC + 1
        }
    }
    function F() {
        $("#quickQueryPassenger_id").blur(function() {
            if ($.trim($("#quickQueryPassenger_id").val()) == "") {
                $("#quickQueryPassenger_id").val("输入乘客姓名")
            }
        }).click(function() {
            if ($.trim($("#quickQueryPassenger_id").val()) == "输入乘客姓名") {
                $("#quickQueryPassenger_id").val("")
            }
        }).keyup(function() {
            var aA = $("#quickQueryPassenger_id").val();
            J(aA);
            f()
        });
        $("#submit_quickQueryPassenger").click(function() {
            J($("#quickQueryPassenger_id").val());
            f()
        })
    }
    function I() {
        if ($("#show_more_passenger_id").attr("flaged") == "flaged") {
            return true
        } else {
            return false
        }
    }
    function ax() {
        $("#show_more_passenger_id").click(function() {
            if ($("#show_more_passenger_id").attr("flaged") == "flaged") {
                $("#show_more_passenger_id").removeAttr("flaged");
                $("#show_more_passenger_id").attr("title", "展开");
                $("#gd").html("更多");
                $("#show_more_passenger_id").children().removeClass("open");
                var aA = M.length > i ? M.slice(0, i) : M;
                ap(aA);
                K(g, aA);
                var aB = az.length > i ? az.slice(0, i) : az;
                w(aB);
                X(d, aB);
                renderTickInfo(limit_tickets, false)
            } else {
                $("#show_more_passenger_id").attr("flaged", "flaged");
                $("#show_more_passenger_id").attr("title", "收起");
                $("#gd").html("收起");
                $("#show_more_passenger_id").children().addClass("open");
                ap(M);
                K(g, M);
                w(az);
                X(d, az);
                renderTickInfo(limit_tickets, false)
            }
            f()
        })
    }
    function J(aE) {
        aE = $.trim(aE).toLowerCase();
        if (! (aE == null || $.trim(aE) == "" || aE == "输入乘客姓名")) {
            var aA = new Array();
            for (var aB = 0; aB < M.length; aB++) {
                var aD = M[aB];
                if (aD.passenger_name.toLowerCase().indexOf(aE) > -1 || aD.first_letter.toLowerCase().indexOf(aE) > -1) {
                    aA.push(aD)
                }
            }
            ap(aA);
            K(g, aA);
            var aC = new Array();
            for (var aB = 0; aB < az.length; aB++) {
                var aD = az[aB];
                if (aD.passenger_name.toLowerCase().indexOf(aE) > -1 || aD.first_letter.toLowerCase().indexOf(aE) > -1) {
                    aC.push(aD)
                }
            }
            w(aC);
            X(d, aC)
        } else {
            var aA = M.length > i && !I() ? M.slice(0, i) : M;
            ap(aA);
            K(g, aA);
            var aC = az.length > i && !I() ? az.slice(0, i) : az;
            w(aC);
            X(d, aC)
        }
        renderTickInfo(limit_tickets, false)
    }
    function K(aE, aB) {
        for (var aD = 0; aD < aB.length; aD++) {
            var aA = "djPassenger_" + aB[aD].index_id;
            for (var aC = 0; aC < aE.length; aC++) {
                if (aE[aC] == aA) {
                    $("#" + aA).prop("checked", true);
                    $("#" + aA).next().removeClass().addClass("colorA")
                }
            }
        }
    }
    function X(aE, aB) {
        for (var aD = 0; aD < aB.length; aD++) {
            var aA = "normalPassenger_" + aB[aD].index_id;
            for (var aC = 0; aC < aE.length; aC++) {
                if (aE[aC] == aA) {
                    $("#" + aA).prop("checked", true);
                    $("#" + aA).next().removeClass().addClass("colorA")
                }
            }
        }
    }
    responseDjPassengerClick = function(aD) {
        var aH = "";
        aH = $(aD).attr("id");
        if (aD.checked) {
            var aG = c(limit_tickets);
            if (S(limit_tickets)) {
                return
            }
            if (aG >= init_limit_ticket_num) {
                aD.checked = false;
                k("提示", "最多只能购买" + init_limit_ticket_num + "张车票");
                return
            }
            var aA = M[aH.split("_")[1]];
            var aE = b(aA.passenger_type);
            var aI = new Z(aH, "", "", aE, "", aA.passenger_name, aA.passenger_id_type_code, af(aA.passenger_id_no, aA.passenger_id_type_code, aA.passenger_id_type_name), aA.passenger_id_no, aA.mobile_no, "", ticketInfoForPassengerForm.tour_flag, true, aA.passenger_type, false);
            if (!B(aI)) {
                k("提示", "对不起，现登录用户证件类型不是二代身份证，不能替证件类型为二代身份证的乘车人<span style='color:black;font-size:30px'><i>" + aI.name + "</i></span> 代购车票");
                aD.checked = false;
                return
            }
            var aB = L(aI);
            if (aB == "0") {
                limit_tickets.push(aI)
            } else {
                if (aB == "1") {
                    if (!$.whatsSelect(false)) {
                        return
                    }
                    k("提示", "请从常用联系人中选择学生旅客");
                    aD.checked = false;
                    return
                } else {
                    if (aB == "2") {
                        if (!$.whatsSelect(false)) {
                            return
                        }
                        k("提示", "请从常用联系人中选择学生旅客");
                        aD.checked = false;
                        return
                    }
                }
            }
            if (ticket_seat_codeMap[aI.ticket_type].length < 1) {
                k("提示", "很抱歉，" + ticket_submit_order.ticket_type_name[aI.ticket_type] + "余票不足！")
            }
            g.push($(aD).attr("id"));
            $(aD).next().removeClass().addClass("colorA");
            var aJ = false;
            if (aA.passenger_type == "3") {
                if (!IsStudentDate) {
                    k("提示", "学生票的乘车时间为每年的暑假6月1日至9月30日、寒假12月1日至3月31日，目前不办理学生票业务。");
                    aI.ticket_type = "1";
                    aI.seatTypes = ticket_seat_codeMap["1"]
                }
            }
            if ((aA.passenger_type == "2" || aA.passenger_type == "3" || aA.passenger_type == "4") && aI.ticket_type != "1") {
                aJ = true;
                var aC = "您是要购买";
                if (aA.passenger_type == "2") {
                    aC = aC + "儿童票吗（随同成人旅行身高1.2～1.5米的儿童，应当购买儿童票；超过1.5米时应买全价票。每一成人旅客可免费携带一名身高不足1.2米的儿童，超过一名时，超过的人数应买儿童票，详见购买儿童票有关规定。如不符合相关规定，请点击“取消”。）？<br/>儿童未办理居民身份证的，建议使用同行成年人身份信息购票，否则须凭儿童本人有效身份证件原件及订单号在车站人工窗口换取纸质车票。"
                } else {
                    if (aA.passenger_type == "3") {
                        aC = aC + "学生票吗（凭购票时所使用的有效身份证件原件和附有学生火车票优惠卡的有效学生证原件换票乘车，详见购买学生票有关规定。如不符合相关规定，请点击“取消”。）？"
                    } else {
                        if (aA.passenger_type == "4") {
                            aC = aC + "残军票吗（须凭购票时所使用的有效身份证件原件和有效的“中华人民共和国残疾军人证”、“中华人民共和国伤残人民警察证”原件换票乘车，详见购买残疾军人优待票有关规定。如不符合相关规定，请点击“取消”。）？"
                        }
                    }
                }
                $("#dialog_xsertcj_msg").html(aC);
                dhtmlx.createWin({
                    winId: "dialog_xsertcj",
                    closeWinId: ["dialog_xsertcj_close", "dialog_xsertcj_cancel"],
                    okId: "dialog_xsertcj_ok",
                    callback: function() {
                        aI.ticket_type = "1";
                        aI.seatTypes = ticket_seat_codeMap["1"];
                        renderTickInfo(limit_tickets, false)
                    },
                    okCallBack: function() {
                        renderTickInfo(limit_tickets, false)
                    }
                })
            }
            if (!aJ) {
                renderTickInfo(limit_tickets, false)
            }
        } else {
            $(aD).next().removeClass();
            for (var aF = 0; aF < g.length; aF++) {
                if (g[aF] == $(aD).attr("id")) {
                    g.splice(aF, 1);
                    break
                }
            }
            for (var aF = 0; aF < limit_tickets.length; aF++) {
                var aK = limit_tickets[aF].only_id;
                if (aK == aH) {
                    limit_tickets.splice(aF, 1);
                    if (limit_tickets.length < 1) {
                        G("0")
                    }
                }
            }
            renderTickInfo(limit_tickets, false)
        }
    };
    function b(aA) {
        if (aA == ticket_submit_order.passenger_type.adult) {
            return ticket_submit_order.passenger_type.adult
        } else {
            if (aA == ticket_submit_order.passenger_type.child) {
                return ticket_submit_order.passenger_type.child
            } else {
                if (aA == ticket_submit_order.passenger_type.student) {
                    return ticket_submit_order.passenger_type.student
                } else {
                    if (aA == ticket_submit_order.passenger_type.disability) {
                        return ticket_submit_order.passenger_type.disability
                    } else {
                        return ""
                    }
                }
            }
        }
    }
    function B(aB) {
        var aA = id_type_code;
        if (aA != ticket_submit_order.passenger_card_type.two && aA != ticket_submit_order.passenger_card_type.one && aA != ticket_submit_order.passenger_card_type.work) {
            if (aB.id_type == ticket_submit_order.passenger_card_type.two || aB.id_type == ticket_submit_order.passenger_card_type.one) {
                return false
            }
        }
        return true
    }
    function n(aD, aB, aA) {
        var aC = ab(aD, aB, aA);
        return aC
    }
    function ab(aD, aC, aA) {
        var aB = b(aD);
        if (ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student) {
            return ticket_submit_order.ticket_type.student
        } else {
            if (aD == ticket_submit_order.passenger_type.disability) {
                var aE = id_type_code;
                if (aE != ticket_submit_order.passenger_card_type.two || aC != ticket_submit_order.passenger_card_type.two) {
                    return ticket_submit_order.ticket_type.adult
                } else {
                    return aB
                }
            } else {
                return aB == "" ? (aA == "" ? ticket_submit_order.ticket_type.adult: aA) : aB
            }
        }
    }
    function L(aD) {
        upadateSavePassengerInfo();
        var aB = "0";
        for (var aC = 0; aC < limit_tickets.length; aC++) {
            var aA = limit_tickets[aC];
            if (ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student) {
                if (aD.only_id.indexOf("djPassenger") > -1) {
                    if ((M[aD.only_id.split("_")[1]].passenger_type) != ticket_submit_order.passenger_type.student) {
                        aB = "1";
                        return aB
                    }
                } else {
                    if (aD.only_id.indexOf("normalPassenger") > -1) {
                        if ((az[aD.only_id.split("_")[1]].passenger_type) != ticket_submit_order.passenger_type.student) {
                            aB = "2";
                            return aB
                        }
                    } else {
                        aB = "0"
                    }
                }
            }
            if ($.trim(aA.name) == "" && $.trim(aA.id_no) == "" && $.trim(aA.phone_no) == "") {
                if (aD.only_id.indexOf("djPassenger") > -1 && aA.ticket_type == ticket_submit_order.ticket_type.student) {
                    if ((M[aD.only_id.split("_")[1]].passenger_type) != ticket_submit_order.passenger_type.student) {
                        aB = "1";
                        return aB
                    } else {
                        limit_tickets[aC] = aD;
                        aB = "3"
                    }
                } else {
                    if (aD.only_id.indexOf("normalPassenger") > -1 && aA.ticket_type == ticket_submit_order.ticket_type.student) {
                        if ((az[aD.only_id.split("_")[1]].passenger_type) != ticket_submit_order.passenger_type.student) {
                            aB = "2";
                            return aB
                        } else {
                            limit_tickets[aC] = aD;
                            aB = "3"
                        }
                    } else {
                        limit_tickets[aC] = aD;
                        aB = "3"
                    }
                }
                break
            }
        }
        return aB
    }
    function al(aA) {
        return aA.replace(/(^\s*)|(\s*$)/g, "")
    }
    function c(aD) {
        var aC = limit_tickets.length;
        for (var aB = 0; aB < limit_tickets.length; aB++) {
            var aA = limit_tickets[aB];
            if (al(aA.name) == "" && al(aA.id_no) == "" && al(aA.phone_no) == "") {
                aC -= 1
            }
        }
        return aC
    }
    responseNormalPassengerClick = function(aC) {
        var aG = "";
        aG = $(aC).attr("id");
        if (aC.checked) {
            if (S(limit_tickets)) {
                return
            }
            var aF = c(limit_tickets);
            if (aF >= init_limit_ticket_num) {
                aC.checked = false;
                k("提示", "最多只能购买" + init_limit_ticket_num + "张车票");
                return
            }
            var aK = az[aG.split("_")[1]];
            var aD = b(aK.passenger_type);
            var aH = new Z(aG, "", "", aD, "", aK.passenger_name, aK.passenger_id_type_code, af(aK.passenger_id_no, aK.passenger_id_type_code, aK.passenger_id_type_name), aK.passenger_id_no, aK.mobile_no, "", ticketInfoForPassengerForm.tour_flag, true, aK.passenger_type, false);
            if (!B(aH)) {
                k("提示", "对不起，现登录用户证件类型不是二代身份证，不能为证件类型为二代身份证的乘车人 <span style='color:black;font-size:30px'><i>" + aH.name + "</i></span> 代购车票");
                aC.checked = false;
                return
            }
            var aA = L(aH);
            if (aA == "0") {
                limit_tickets.push(aH)
            } else {
                if (aA == "1") {
                    if (!$.whatsSelect(false)) {
                        return
                    }
                    k("提示", "请从常用联系人中选择学生旅客");
                    aC.checked = false;
                    return
                } else {
                    if (aA == "2") {
                        if (!$.whatsSelect(false)) {
                            return
                        }
                        k("提示", "请从常用联系人中选择学生旅客");
                        aC.checked = false;
                        return
                    }
                }
            }
            if (ticket_seat_codeMap[aH.ticket_type].length < 1) {
                k("提示", "很抱歉，" + ticket_submit_order.ticket_type_name[aH.ticket_type] + "余票不足！")
            }
            d.push($(aC).attr("id"));
            $(aC).next().removeClass().addClass("colorA");
            var aI = false;
            if (aK.passenger_type == "3") {
                if (!IsStudentDate) {
                    k("提示", "学生票的乘车时间为每年的暑假6月1日至9月30日、寒假12月1日至3月31日，目前不办理学生票业务。");
                    aH.ticket_type = "1";
                    aH.seatTypes = ticket_seat_codeMap["1"]
                }
            }
            if ((aK.passenger_type == "2" || aK.passenger_type == "3" || aK.passenger_type == "4") && aH.ticket_type != "1") {
                aI = true;
                var aB = "您是要购买";
                if (aK.passenger_type == "2") {
                    aB = aB + "儿童票吗（随同成人旅行身高1.2～1.5米的儿童，应当购买儿童票；超过1.5米时应买全价票。每一成人旅客可免费携带一名身高不足1.2米的儿童，超过一名时，超过的人数应买儿童票，详见购买儿童票有关规定。如不符合相关规定，请点击“取消”。）？<br/>儿童未办理居民身份证的，建议使用同行成年人身份信息购票，否则须凭儿童本人有效身份证件原件及订单号在车站人工窗口换取纸质车票。"
                } else {
                    if (aK.passenger_type == "3") {
                        aB = aB + "学生票吗（凭购票时所使用的有效身份证件原件和附有学生火车票优惠卡的有效学生证原件换票乘车，详见购买学生票有关规定。如不符合相关规定，请点击“取消”。）？"
                    } else {
                        if (aK.passenger_type == "4") {
                            aB = aB + "残军票吗（须凭购票时所使用的有效身份证件原件和有效的“中华人民共和国残疾军人证”、“中华人民共和国伤残人民警察证”原件换票乘车，详见购买残疾军人优待票有关规定。如不符合相关规定，请点击“取消”。）？"
                        }
                    }
                }
                $("#dialog_xsertcj_msg").html(aB);
                dhtmlx.createWin({
                    winId: "dialog_xsertcj",
                    closeWinId: ["dialog_xsertcj_close", "dialog_xsertcj_cancel"],
                    okId: "dialog_xsertcj_ok",
                    callback: function() {
                        aH.ticket_type = "1";
                        aH.seatTypes = ticket_seat_codeMap["1"];
                        renderTickInfo(limit_tickets, false)
                    },
                    okCallBack: function() {
                        renderTickInfo(limit_tickets, false)
                    }
                })
            }
            if (!aI) {
                renderTickInfo(limit_tickets, false)
            }
        } else {
            $(aC).next().removeClass();
            for (var aE = 0; aE < d.length; aE++) {
                if (d[aE] == $(aC).attr("id")) {
                    d.splice(aE, 1);
                    break
                }
            }
            for (var aE = 0; aE < limit_tickets.length; aE++) {
                var aJ = limit_tickets[aE].only_id;
                if (aJ == aG) {
                    limit_tickets.splice(aE, 1);
                    if (limit_tickets.length < 1) {
                        G("0")
                    }
                }
            }
            renderTickInfo(limit_tickets, false)
        }
        f()
    };
    getpassengerTickets = function() {
        var aA = "";
        for (var aB = 0; aB < limit_tickets.length; aB++) {
            var aC = limit_tickets[aB].seat_type + ",0," + limit_tickets[aB].ticket_type + "," + limit_tickets[aB].name + "," + limit_tickets[aB].id_type + "," + limit_tickets[aB].id_no + "," + (limit_tickets[aB].phone_no == null ? "": limit_tickets[aB].phone_no) + "," + (limit_tickets[aB].save_status == "" ? "N": "Y");
            aA += aC + "_"
        }
        return aA.substring(0, aA.length - 1)
    };
    getOldPassengers = function() {
        var aE = "";
        for (var aD = 0; aD < limit_tickets.length; aD++) {
            var aA = limit_tickets[aD];
            if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.gc) {
                var aB = aA.name + "," + aA.id_type + "," + aA.id_no + "," + aA.passenger_type;
                aE += aB + "_"
            } else {
                if (aA.only_id.indexOf("djPassenger_") > -1) {
                    var aC = aA.only_id.split("_")[1];
                    var aB = M[aC].passenger_name + "," + M[aC].passenger_id_type_code + "," + M[aC].passenger_id_no + "," + M[aC].passenger_type;
                    aE += aB + "_"
                } else {
                    if (aA.only_id.indexOf("normalPassenger_") > -1) {
                        var aC = aA.only_id.split("_")[1];
                        var aB = az[aC].passenger_name + "," + az[aC].passenger_id_type_code + "," + az[aC].passenger_id_no + "," + az[aC].passenger_type;
                        aE += aB + "_"
                    } else {
                        aE += "_ "
                    }
                }
            }
        }
        return aE
    };
    function ap(aB) {
        if (aB && aB.length > 0) {
            aB[0].total_times = "99"
        }
        var aA = "";
        aA = $("#djPassengerTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aA
        });
        $("#dj_passenger_id").html($.render.leftTableTemplate(aB));
        clickCheckBoxName();
        if (aB != "" && aB.length > 0) {
            clickCheckBoxName();
            ad();
            U(true)
        } else {
            am()
        }
        $("#dj_passenger_id li").click(function(aD) {
            if (aD.target.tagName.toUpperCase() == "LABEL") {
                return
            }
            var aC = $.whatsSelect(true);
            if (aC) {
                $(this).find("input").attr("checked", false);
                dhtmlx.alert({
                    title: "温馨提示",
                    ok: "确定",
                    text: "暂不支持混合选择！",
                    type: "alert-error"
                });
                return
            }
            var aE = $(this).find("input")
        })
    }
    function U(aA) {
        if (aA) {
            $("input[id^=djPassenger_]").change(function() {
                responseDjPassengerClick(this)
            })
        } else {
            $("input[id^=normalPassenger_]").change(function() {
                responseNormalPassengerClick(this)
            })
        }
    }
    function w(aB) {
        var aA = "";
        aA = $("#normalPassengerTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aA
        });
        $("#normal_passenger_id").html($.render.leftTableTemplate(aB));
        if (aB != "" && aB.length > 0) {
            clickCheckBoxName();
            U(false)
        }
        am();
        $("#normal_passenger_id li").click(function(aD) {
            if (aD.target.tagName.toUpperCase() == "LABEL") {
                return
            }
            var aC = $.whatsSelect(false);
            if (aC) {
                $(this).find("input").attr("checked", false);
                dhtmlx.alert({
                    title: "温馨提示",
                    ok: "确定",
                    text: "暂不支持混合选择！",
                    type: "alert-error"
                });
                return
            }
        })
    }
    var aw = "";
    excuteClickEditPassenger = function(aA) {
        var aD = "";
        var aH = aA.attr("id");
        if (aA.attr("disabled") == "disabled") {
            aw = aH;
            var aE = null;
            var aF = null;
            if (aH.split("_")[0] == "djPassenger") {
                aD = aH;
                aE = M[aD.split("_")[1]];
                aF = "djPassenger_"
            } else {
                if (aH.split("_")[0] == "normalPassenger") {
                    aD = aH;
                    aE = az[aD.split("_")[1]];
                    aF = "normalPassenger_"
                }
            }
            s = aE;
            if (id_type_code == "B" || id_type_code == "H" || id_type_code == "G" || id_type_code == "C") {
                if (aE.passenger_id_type_code == "1") {
                    dhtmlx.alert({
                        title: "修改常用联系人",
                        ok: "确定",
                        text: "您不能给二代证乘车人购买车票，请删除",
                        type: "alert-error"
                    });
                    return
                }
            }
            if (aE.total_times == "91") {
                dhtmlx.alert({
                    title: "修改常用联系人",
                    ok: "确定",
                    text: "不允许修改" + aE.passenger_name,
                    type: "alert-error"
                });
                return
            }
            if ("3" == s.passenger_type) {
                $("#ptypeselect_update").html('<option value="3">学生票 </option>')
            } else {
                $("#ptypeselect_update").html($("#ticketType_1").html());
                var aG = $("#ptypeselect_update option");
                for (var aC = 0; aC < aG.length; aC++) {
                    if (aE.passenger_type == aG[aC].value) {
                        $(aG[aC]).attr("selected", "selected")
                    } else {
                        $(aG[aC]).removeAttr("selected")
                    }
                    if ("3" == aG[aC].value) {
                        $(aG[aC]).remove()
                    }
                }
            }
            $("#typeselect_update").html($("#passenger_id_type_1").html());
            var aI = $("#typeselect_update option");
            for (var aC = 0; aC < aI.length; aC++) {
                if (aE.passenger_id_type_code == aI[aC].value) {
                    $(aI[aC]).attr("selected", "selected")
                } else {
                    $(aI[aC]).removeAttr("selected")
                }
                if ("1" == aI[aC].value && (id_type_code == "B" || id_type_code == "H" || id_type_code == "G" || id_type_code == "C")) {
                    $(aI[aC]).remove()
                }
                if ("2" == aI[aC].value) {
                    $(aI[aC]).remove()
                }
            }
            $("#pname_update_value").val(aE.passenger_name);
            $("#pidno_update_value").val(aE.passenger_id_no);
            $("#error_update_tr").hide();
            $("#error_for_update_nameandidno").html("").hide();
            var aB = $("#pcountry_udpate_value option");
            for (var aC = 0; aC < aB.length; aC++) {
                if (aE.country_code == aB[aC].value) {
                    $(aB[aC]).attr("selected", "selected")
                } else {
                    $(aB[aC]).removeAttr("selected")
                }
            }
            dhtmlx.createWin({
                winId: "dialog_update",
                closeWinId: ["dialog_update_close", "dialog_update_cancel"],
                okId: "dialog_update_ok",
                okCallBack: function() {
                    var aM = false;
                    if (W == "1") {
                        if (isCanGP("1", R)) {
                            aM = true
                        } else {
                            if (R == "92" || R == "98") {
                                dhtmlx.alert({
                                    title: "修改常用联系人",
                                    ok: "确定",
                                    text: "常用联系人修改成功，身份信息待核验",
                                    type: "alert-error"
                                })
                            } else {
                                if (R == "96" || R == "94") {
                                    dhtmlx.alert({
                                        title: "修改常用联系人",
                                        ok: "确定",
                                        text: "常用联系人修改成功，身份信息核验未通过",
                                        type: "alert-error"
                                    })
                                }
                            }
                        }
                    } else {
                        if (W == "C" || W == "G" || W == "B" || W == "H") {
                            if (isCanGP("B", R) || isCanGP("H", R)) {
                                aM = true
                            } else {
                                dhtmlx.alert({
                                    title: "修改常用联系人",
                                    ok: "确定",
                                    text: "常用联系人修改成功，身份信息核验未通过，请到窗口核验",
                                    type: "alert-error"
                                })
                            }
                        }
                    }
                    var aL = aw;
                    var aJ = $("#" + aw).parent().find("label").attr("for", aL);
                    aJ.html(s.newpassenger_name);
                    if (aM) {
                        $("#" + aw).removeAttr("disabled");
                        aJ.removeAttr("disabled").removeAttr("style").attr("style", "cursor: pointer")
                    }
                    if (aF == "normalPassenger_") {
                        for (var aK = 0; aK < az.length; aK++) {
                            var aN = "normalPassenger_" + aK;
                            if (aN == aw) {
                                az[aK].passenger_name = s.newpassenger_name;
                                az[aK].passenger_id_no = s.newpassenger_id_no;
                                az[aK].passenger_id_type_code = s.newpassenger_id_type_code;
                                az[aK].passenger_type = s.newpassenger_type
                            }
                        }
                    }
                    if (aF == "djPassenger_") {
                        for (var aK = 0; aK < M.length; aK++) {
                            var aN = "djPassenger_" + aK;
                            if (aN == aw) {
                                M[aK].passenger_name = s.newpassenger_name;
                                M[aK].passenger_id_no = s.newpassenger_id_no;
                                M[aK].passenger_id_type_code = s.newpassenger_id_type_code;
                                M[aK].passenger_type = s.newpassenger_type
                            }
                        }
                    }
                    $("#" + aw).attr("id", aL);
                    if (!aM) {
                        return
                    }
                    $("#" + aL).attr("checked", "checked");
                    $("#" + aL).attr("typeFlag", s.newpassenger_id_type_code);
                    $("#" + aL).attr("totalTimes", R);
                    $("#" + aL).unbind("change");
                    if (aF == "normalPassenger_") {
                        $("#" + aL).change(function() {
                            responseNormalPassengerClick(this)
                        });
                        responseNormalPassengerClick($("#" + aL)[0])
                    }
                    if (aF == "djPassenger_") {
                        $("#" + aL).change(function() {
                            responseDjPassengerClick(this)
                        });
                        responseDjPassengerClick($("#" + aL)[0])
                    }
                },
                checkConfirm: function() {
                    return checkWinUpdatePassenger()
                }
            })
        }
    };
    var s = null;
    checkWinUpdatePassenger = function() {
        var aC = $("#typeselect_update").val();
        var aD = $.trim($("#pname_update_value").val());
        if ($.trim(aD) != "") {
            if (aC == ticket_submit_order.passenger_card_type.two || aC == ticket_submit_order.passenger_card_type.one) {
                if (!/^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(aD)) {
                    $("#error_update_tr").show();
                    $("#error_for_update_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                    return false
                }
            } else {
                if (aC == ticket_submit_order.passenger_card_type.passport) {
                    if (!/^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(aD) || /^[-]+$/.test(aD)) {
                        $("#error_tr").show();
                        $("#error_for_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                        return false
                    }
                } else {
                    if (aC == ticket_submit_order.passenger_card_type.work) {
                        if (!/^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(aD) || /^[-]+$/.test(aD)) {
                            $("#error_tr").show();
                            $("#error_for_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                            return false
                        }
                    } else {
                        if (!/^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(aD)) {
                            $("#error_update_tr").show();
                            $("#error_for_update_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                            return false
                        }
                    }
                }
            }
        } else {
            $("#error_update_tr").show();
            $("#error_for_update_nameandidno").html("请输入乘车人姓名").show();
            return false
        }
        $("#error_for_update_nameandidno").hide();
        aD = $("#pidno_update_value").val();
        var aB = $("#typeselect_update").val();
        W = $("#typeselect_update").val();
        if (aB == ticket_submit_order.passenger_card_type.two) {
            if ($.trim(aD) != "") {
                if (!validateSecIdCard(aD)) {
                    $("#error_update_tr").show();
                    $("#error_for_update_nameandidno").html("非法的二代身份证号码").show();
                    return false
                }
            } else {
                $("#error_update_tr").show();
                $("#error_for_update_nameandidno").html("请输入证件号码").show();
                return false
            }
        } else {
            if (aB == ticket_submit_order.passenger_card_type.one) {
                if ($.trim(aD) != "") {
                    if (!validateFirIdCard(aD)) {
                        $("#error_update_tr").show();
                        $("#error_for_update_nameandidno").html("非法的一代身份证号码").show();
                        return false
                    }
                } else {
                    $("#error_update_tr").show();
                    $("#error_for_update_nameandidno").html("请输入证件号码").show();
                    return false
                }
            } else {
                if (aB == ticket_submit_order.passenger_card_type.passport) {
                    if ($.trim(aD) != "") {
                        if (!/^[a-zA-Z0-9]{5,17}$/.test(aD)) {
                            $("#error_update_tr").show();
                            $("#error_for_update_nameandidno").html("非法的护照号码").show();
                            return false
                        }
                    } else {
                        $("#error_update_tr").show();
                        $("#error_for_update_nameandidno").html("请输入证件号码").show();
                        return false
                    }
                } else {
                    if (aB == ticket_submit_order.passenger_card_type.work) {
                        if ($.trim(aD) != "") {
                            if (!/^[a-zA-Z]{3}[0-9]{12}$/.test(aD)) {
                                $("#error_update_tr").show();
                                $("#error_for_update_nameandidno").html("非法的外国人居留证号码").show();
                                return false
                            }
                        } else {
                            $("#error_update_tr").show();
                            $("#error_for_update_nameandidno").html("请输入证件号码").show();
                            return false
                        }
                    } else {
                        if (aB == ticket_submit_order.passenger_card_type.hongkong_macau) {
                            if ($.trim(aD) != "") {
                                if (!/^[HMhm]{1}[0-9]{10}$/.test(aD) && !/^[HMhm]{1}[0-9]{8}$/.test(aD)) {
                                    $("#error_update_tr").show();
                                    $("#error_for_update_nameandidno").html("非法的港澳居民来往内地通行证号码").show();
                                    return false
                                }
                            } else {
                                $("#error_update_tr").show();
                                $("#error_for_update_nameandidno").html("请输入证件号码").show();
                                return false
                            }
                        } else {
                            if (aB == ticket_submit_order.passenger_card_type.taiwan) {
                                if ($.trim(aD) != "") {
                                    if (!/^[0-9]{8}$/.test(aD) && !/^[0-9]{10}$/.test(aD)) {
                                        $("#error_update_tr").show();
                                        $("#error_for_update_nameandidno").html("非法的台湾居民来往大陆通行证号码").show();
                                        return false
                                    }
                                } else {
                                    $("#error_update_tr").show();
                                    $("#error_for_update_nameandidno").html("请输入证件号码").show();
                                    return false
                                }
                            }
                        }
                    }
                }
            }
        }
        aD = $("#pcountry_udpate_value").val();
        if ($.trim(aD) == "") {
            $("#error_update_tr").show();
            $("#error_for_update_nameandidno").html("请输入国家/地区").show();
            return false
        }
        if (aB == ticket_submit_order.passenger_card_type.two && "CN" != aD) {
            $("#error_update_tr").show();
            $("#error_for_update_nameandidno").html("请填写正确的国家/地区").show();
            return false
        }
        var aE = dhtmlx.modalbox({
            targSrc: '<div id="loadingdiv"><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
            callback: function() {}
        });
        $("#loadingdiv")[0].style["z-index"] = "20009";
        $("#dialog_update").hide();
        var aA = false;
        s.born_date = undefined;
        if (aB == ticket_submit_order.passenger_card_type.two) {
            s.newpassenger_name = $("#pname_update_value").val()
        } else {
            s.newpassenger_name = $("#pname_update_value").val().toUpperCase()
        }
        s.newpassenger_id_type_code = W;
        s.newpassenger_id_no = $("#pidno_update_value").val().toUpperCase();
        s.newpassenger_type = $("#ptypeselect_update").val();
        s.newcountry_code = $("#pcountry_udpate_value").val();
        $.ajax({
            url: ctx + "passengers/editReal",
            type: "post",
            data: s,
            error: function(aF, aH, aG) {
                dhtmlx.modalbox.hide(aE);
                $("#dialog_update").show();
                $("#error_update_tr").show();
                $("#error_for_update_nameandidno").html("您的网络可能有问题").show()
            },
            async: false,
            success: function(aF) {
                dhtmlx.modalbox.hide(aE);
                if (aF.data.flag) {
                    $("#error_for_update_nameandidno").hide();
                    R = aF.data.totalTimes;
                    aA = true;
                    two_isOpenClick = aF.data.two_isOpenClick;
                    other_isOpenClick = aF.data.other_isOpenClick
                } else {
                    $("#dialog_update").show();
                    $("#error_update_tr").show();
                    $("#error_for_update_nameandidno").html(aF.data.message).show()
                }
            }
        });
        return aA
    };
    renderTickInfo = function(aI, aD) {
        var aM = $("#ticketInfo_id tr");
        var aL = aM.length;
        var aC = aI.length;
        var aB = null;
        var aA = $("#seatType_1").val();
        var aG = aI[aC - 1].seatTypes;
        var aN = false;
        if (aL >= 2) {
            var aK = aM.eq(aL - 2).attr("id");
            aB = $("#seatType_" + aK.substr(6)).val()
        }
        if (aB) {
            for (var aE = 0; aE < aG.length; aE++) {
                if (aG[aE].id == aB) {
                    aN = true;
                    break
                }
            }
        }
        upadateSavePassengerInfo();
        var aP = $("#ticketInfoTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aP
        });
        aI.IsStudentDate = IsStudentDate;
        $("#ticketInfo_id").html($.render.leftTableTemplate(aI));
        var aH = $('#dj_passenger_id input[type="checkbox"]:checked').length > 0;
        if (aH) {
            $('td[title="添加儿童票"]').find("a").html("")
        }
        var aO = $("#ticketInfo_id tr");
        var aJ = aO.length;
        if (aJ == 2 && aL == 2) {
            if ("2" != $("#ticketType_1").val()) {
                $("#seatType_1 option[value='" + aA + "']").attr("selected", "selected")
            }
        } else {
            if (aJ > aL && aN) {
                var aF = aO.eq(aJ - 2).attr("id");
                if ("2" != $("#ticketType_" + aF.substr(6)).val()) {
                    $("#seatType_" + aF.substr(6) + " option[value='" + aB + "']").attr("selected", "selected")
                }
            }
        }
        H();
        ac();
        updateAllCheckBox()
    };
    function e() {
        var aA = $("select[id^=seatType_]");
        $.each(aA,
        function(aC, aB) {
            $(aB).width(function() {
                var aE = 0;
                var aD = $("#ticket_con_id span");
                $.each(aD,
                function(aF, aG) {
                    if ($(aG).width() > aE) {
                        aE = $(aG).width()
                    }
                });
                return aE - 20
            })
        })
    }
    renderCheckTickInfo = function(aF) {
        var aJ = $("#checkTicketInfoTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aJ
        });
        $("#check_ticketInfo_id").html($.render.leftTableTemplate(aF));
        if (isDw == "Y" && $("#chooseAllDW").is(":checked")) {
            var aG = aF.length;
            var aB = 0;
            var aA = aF[0].seat_type;
            if (aA == "A") {
                aB = 2 - aG
            }
            if (aA == "F") {
                aB = 4 - aG
            }
            if (aB > 0) {
                var aH = 0;
                for (var aC = aF.length - 1; aC >= 0; aC--) {
                    var aE = aF[aC];
                    if (aE.ticket_type != "2") {
                        aH = aC;
                        break
                    }
                }
                for (; aB > 0; aB--) {
                    var aD = $('#check_ticketInfo_id tr:eq("' + aH + '")').html();
                    var aI = $("<tr>" + aD + "</tr>");
                    aI.find("td:eq(0)").html(++aG);
                    $("#check_ticketInfo_id").append(aI)
                }
            }
        }
    };
    function ak(aB) {
        var aA = $("#ticketTitTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aA
        });
        $("#check_ticket_tit_id").html($.render.leftTableTemplate(aB))
    }
    function l(aB) {
        var aA = $("#ticketTitTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aA
        });
        $("#ticket_tit_id").html($.render.leftTableTemplate(aB))
    }
    function T(aB) {
        var aA = $("#ticketConTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aA
        });
        $("#ticket_con_id").html($.render.leftTableTemplate(aB))
    }
    function aj(aB) {
        var aA = $("#oldTicketInfoForGcTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({
            leftTableTemplate: aA
        });
        $("#oldTicketInfoForGc_id").html($.render.leftTableTemplate(aB))
    }
    function at(aA) {
        aj(aA)
    }
    function v() {
        $.ajax({
            type: "post",
            url: ctx + "confirmPassenger/getPassengerDTOs",
            async: true,
            success: function(aA) {
                if (aA.status) {
                    if (aA.data.isExist) {
                        M = aA.data.dj_passengers;
                        if (member_tourFlag == "wc") {
                            M = []
                        }
                        if (M.length > 0) {
                            ap(M.length > i ? M.slice(0, i) : M);
                            z()
                        } else {
                            ai()
                        }
                        az = aA.data.normal_passengers;
                        if (az.length > 0) {
                            w(az.length > i ? az.slice(0, i) : az);
                            O();
                            $("#show_more_passenger_id").show();
                            if (az.length > 16) {
                                $("#btnAll").show()
                            }
                        } else {
                            r();
                            $("#show_more_passenger_id").show()
                        }
                        renderTickInfo(limit_tickets, false)
                    } else {
                        if (aA.data.exNoraml == "sysEx") {
                            $("#show_more_passenger_id").hide();
                            ai();
                            r()
                        } else {
                            $("#show_more_passenger_id").hide();
                            ai();
                            r()
                        }
                    }
                    two_isOpenClick = aA.data.two_isOpenClick;
                    other_isOpenClick = aA.data.other_isOpenClick;
                    H();
                    if (aA.data.exMsg != "" && aA.data.exMsg != null && aA.data.exMsg != "null") {
                        dhtmlx.alert({
                            title: "加载常用联系人",
                            ok: "确定",
                            text: aA.data.exMsg,
                            type: "alert-error"
                        });
                        return
                    }
                }
                ableClickSubmitButtonOrPreStepBUtton();
                f()
            },
            error: function(aA, aC, aB) {
                ableClickSubmitButtonOrPreStepBUtton();
                return
            }
        })
    }
    function H() {
        var aA = $("#normal_passenger_id input");
        for (var aD = 0; aD < aA.length; aD++) {
            var aC = $(aA[aD]);
            if (isCanGP(aC.attr("typeFlag"), aC.attr("totalTimes"))) {
                aC.removeAttr("disabled");
                aC.siblings("label").removeAttr("style").attr("style", "cursor: pointer")
            } else {
                aC.attr("disabled", "disabled");
                aC.attr("title", "请修改身份信息");
                aC.parent().attr("title", "请修改身份信息");
                aC.siblings("label").attr("style", "cursor: pointer;color:#999999")
            }
        }
        var aB = $("#dj_passenger_id input");
        for (var aD = 0; aD < aB.length; aD++) {
            var aC = $(aB[aD]);
            if (aC.attr("totalTimes") == "99") {
                aC.removeAttr("disabled");
                aC.siblings("label").removeAttr("style").attr("style", "cursor: pointer")
            } else {
                aC.attr("disabled", "disabled");
                aC.parent().attr("title", "请修改身份信息");
                aC.attr("title", "请修改身份信息");
                aC.siblings("label").attr("style", "cursor: pointer;color:#999999")
            }
        }
    }
    function f() {
        $("#passenger_name_1").attr("disabled", true);
        $("#passenger_name_1").attr("style", "color:#999999");
        $("#passenger_name_1").attr("title", "不允许修改乘车人信息");
        $("#passenger_id_type_1").attr("disabled", true);
        $("#passenger_id_type_1").attr("style", "color:#999999");
        $("#passenger_id_type_1").attr("title", "不允许修改乘车人信息");
        $("#passenger_id_no_1").attr("disabled", true);
        $("#passenger_id_no_1").attr("style", "color:#999999");
        $("#passenger_id_no_1").attr("title", "不允许修改乘车人信息");
        $("#phone_no_1").attr("disabled", true);
        $("#phone_no_1").attr("style", "color:#999999");
        $("#phone_no_1").attr("title", "不允许修改乘车人信息")
    }
    function au() {
        disableClickSubmitButtonOrPreStepBUtton()
    }
    ableClickSubmitButtonOrPreStepBUtton = function() {
        var aA = $("#preStep_id");
        aA.bind("click", preStepClickEvent);
        if (timers <= 0) {
            if (intervalProcess) {
                window.clearInterval(intervalProcess)
            }
            var aB = $("#submitOrder_id");
            aB.unbind("click").bind("click", submitOrderClickEvent);
            aB.removeClass("btn92").addClass("btn92s")
        }
    };
    disableClickSubmitButtonOrPreStepBUtton = function() {
        var aB = $("#submitOrder_id");
        var aA = $("#preStep_id");
        aA.bind("click", preStepClickEvent);
        aB.unbind("click").bind("click", submitOrderClickEvent);
        aB.removeClass("btn92").addClass("btn92s")
    };
    function ai() {
        $("#dg_passenger_image_id").hide()
    }
    function z() {
        $("#dg_passenger_image_id").show()
    }
    function r() {
        $("#normal_passenger_image_id").hide()
    }
    function O() {
        $("#normal_passenger_image_id").show()
    }
    function p(aC, aE, aJ, aL, aD, aB, aI, aF, aH, aK, aA, aG) {
        this.train_date = C(aC);
        this.start_time = ar(aE);
        this.station_train_code = aJ;
        this.from_station = aL;
        this.to_station = aD;
        this.seat_type_name = aB;
        this.coach_name = aI;
        this.seat_name = aF;
        this.passenger_name = aH;
        this.id_type_name = aK;
        this.ticket_type_name = aA;
        this.ticket_price = Number(aG / 100).toFixed(1)
    }
    var V = {
        O: 100,
        M: 99,
        "3": 98,
        "1": 97,
        "2": 96,
        "4": 95,
        "7": 94,
        "8": 93,
        "9": 92,
        P: 91,
        "6": 90,
        F: 89,
        A: 88,
        H: 87
    };
    function ah(aD, aC) {
        var aB = V[aD.id];
        var aA = V[aC.id];
        if (!aB) {
            aB = 0
        }
        if (!aA) {
            aA = 0
        }
        if (aB < aA) {
            return 1
        } else {
            return - 1
        }
    }
    function Z(aM, aF, aG, aJ, aH, aD, aP, aO, aK, aA, aL, aE, aN, aI, aC, aB) {
        this.only_id = aM;
        this.seat_type = aF;
        this.seat_type_name = aG;
        this.ticket_type = n(aI, aP, aJ);
        this.ticket_type_name = aH;
        this.name = aD;
        this.id_type = aP;
        this.id_type_name = aO;
        this.id_no = aK;
        this.phone_no = aA;
        this.passenger_type = aI;
        this.seatTypes = ticket_seat_codeMap[this.ticket_type == "" ? ticket_submit_order.ticket_type.adult: this.ticket_type];
        this.seatTypes.sort(ah);
        this.ticketTypes = D;
        this.cardTypes = init_cardTypes;
        this.save_status = aL;
        this.tour_flag = aE;
        this.isDisabled = aI == ticket_submit_order.ticket_type.student ? true: aN;
        this.isDefaultUsed = false;
        this.checkboxStatus = aC;
        this.toString = function() {
            return this.name + "_" + this.id_type + "_" + this.id_no + "_" + this.phone_no
        };
        if (aB) {
            this.isAccompanyChild = aB
        } else {
            aB = false
        }
    }
    function ag(aC) {
        for (var aA = 0; aA < M.length; aA++) {
            var aB = "djPassenger_" + M[aA].passenger_name + "_" + M[aA].passenger_id_type_code + "_" + M[aA].passenger_id_no + "_" + (M[aA].mobile_no == "" ? "null": M[aA].mobile_no);
            if (aB == aC) {
                return "djPassenger_" + aA
            }
        }
    }
    function u(aC) {
        for (var aA = 0; aA < az.length; aA++) {
            var aB = "normalPassenger_" + az[aA].passenger_name + "_" + az[aA].passenger_id_type_code + "_" + az[aA].passenger_id_no + "_" + (az[aA].mobile_no == "" ? "null": az[aA].mobile_no);
            if (aB == aC) {
                return "normalPassenger_" + aA
            }
        }
    }
    var W;
    var o = true;
    var R = null;
    showAddPassengerWin = function() {
        if (S(limit_tickets)) {
            return
        }
        if (limit_tickets.length >= init_limit_ticket_num) {
            k("提示", "最多只能购买" + init_limit_ticket_num + "张车票");
            return
        }
        $("#ptypeselect").html($("#ticketType_1").html());
        $("#typeselect").html($("#passenger_id_type_1").html());
        var aB = $("#typeselect option");
        for (var aC = 0; aC < aB.length; aC++) {
            $(aB[aC]).removeAttr("selected");
            if ("2" == aB[aC].value) {
                $(aB[aC]).remove()
            }
            if ("1" == aB[aC].value && (id_type_code == "B" || id_type_code == "H" || id_type_code == "G" || id_type_code == "C")) {
                $(aB[aC]).remove()
            }
        }
        var aD = $("#ptypeselect option");
        for (var aC = 0; aC < aD.length; aC++) {
            $(aD[aC]).removeAttr("selected");
            if ("3" == aD[aC].value) {
                $(aD[aC]).remove()
            }
        }
        var aA = $("#ptypeselect option");
        if (aA.length == 0) {
            k("提示", '请到"我的12306" -> "常用联系人"中添加新的乘客信息。');
            return
        }
        $("#pname_value").val("");
        $("#pidno_value").val("");
        $("#error_tr").hide();
        $("#error_for_nameandidno").html("").hide();
        $("#error_for_nameandidno").html("").hide();
        dhtmlx.createWin({
            winId: "dialog_add",
            closeWinId: ["dialog_add_cancel", "dialog_add_close"],
            okId: "dialog_add_ok",
            okCallBack: function() {
                var aH = false;
                var aI = "";
                var aO = ' disabled="disabled" style="color:#999999" ';
                var aN = ' style="color: rgb(153, 153, 153);cursor: pointer;" ';
                var aK = ' title="请修改身份信息" ';
                if (W == "1") {
                    if (isCanGP("1", R)) {
                        aH = true;
                        aI = ' checked="checked" ';
                        aO = "";
                        aN = ' style="cursor: pointer;" ';
                        aK = ""
                    } else {
                        if ((R == "92" && !isCanGP("1", "92")) || (R == "98" && !isCanGP("1", "98"))) {
                            dhtmlx.alert({
                                title: "添加常用联系人",
                                ok: "确定",
                                text: "常用联系人已保存，身份信息待核验",
                                type: "alert-error"
                            })
                        } else {
                            if ((R == "96" && !isCanGP("1", "96")) || (R == "94" && !isCanGP("1", "94"))) {
                                dhtmlx.alert({
                                    title: "添加常用联系人",
                                    ok: "确定",
                                    text: "常用联系人已保存，身份信息核验未通过",
                                    type: "alert-error"
                                })
                            }
                        }
                    }
                } else {
                    if (W == "C" || W == "G" || W == "B" || W == "H") {
                        if (isCanGP("B", R) || isCanGP("H", R)) {
                            aH = true;
                            aI = ' checked="checked" ';
                            aO = "";
                            aN = ' style="cursor: pointer;" ';
                            aK = ""
                        } else {
                            dhtmlx.alert({
                                title: "添加常用联系人",
                                ok: "确定",
                                text: "常用联系人已保存，身份信息核验未通过，请到窗口核验",
                                type: "alert-error"
                            })
                        }
                    }
                }
                var aF = $("#pname_value").val().toUpperCase();
                var aE = $("#pidno_value").val().toUpperCase();
                var aJ = new Object();
                aJ.passenger_name = aF;
                aJ.passenger_id_type_code = W;
                aJ.passenger_id_no = aE;
                aJ.mobile_no = "null";
                aJ.passenger_type = $("#ptypeselect").val();
                aJ.country_code = $("#pcountry_value").val();
                aJ.total_times = R;
                aJ.index_id = az.length;
                aJ.first_letter = "";
                az.push(aJ);
                if (az.length > 16) {
                    $("#btnAll").show()
                }
                var aL = az.length - 1;
                var aM = "normalPassenger_" + aL;
                var aG = "";
                aG += '<li><input totalTimes="' + R + '" typeFlag="' + $("#typeselect").val() + '" id="' + aM + '" type="checkbox" class="check" ' + aI + " " + aO + " " + aK + " />";
                aG += '<label for="' + aM + '" ' + aN + " " + aK + ">";
                aG += aF;
                aG += "</label>";
                $("#normal_passenger_id").append(aG);
                if (!aH) {
                    return
                }
                $("#" + aM).change(function() {
                    responseNormalPassengerClick(this)
                });
                responseNormalPassengerClick($("#" + aM)[0])
            },
            checkConfirm: function() {
                return checkWinAddPassenger()
            }
        })
    };
    checkWinAddPassenger = function() {
        var aD = $.trim($("#pname_value").val());
        var aC = $("#typeselect").val();
        if ($.trim(aD) != "") {
            if (aC == ticket_submit_order.passenger_card_type.two || aC == ticket_submit_order.passenger_card_type.one) {
                if (!/^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(aD)) {
                    $("#error_tr").show();
                    $("#error_for_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                    return false
                }
            } else {
                if (aC == ticket_submit_order.passenger_card_type.passport) {
                    if (!/^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(aD) || /^[-]+$/.test(aD)) {
                        $("#error_tr").show();
                        $("#error_for_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                        return false
                    }
                } else {
                    if (aC == ticket_submit_order.passenger_card_type.work) {
                        if (!/^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(aD) || /^[-]+$/.test(aD)) {
                            $("#error_tr").show();
                            $("#error_for_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                            return false
                        }
                    } else {
                        if (!/^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(aD)) {
                            $("#error_tr").show();
                            $("#error_for_nameandidno").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                            return false
                        }
                    }
                }
            }
        } else {
            $("#error_tr").show();
            $("#error_for_nameandidno").html("请输入乘车人姓名").show();
            return false
        }
        $("#error_for_nameandidno").hide();
        aD = $("#pidno_value").val();
        var aB = $("#typeselect").val();
        W = $("#typeselect").val();
        if (aB == ticket_submit_order.passenger_card_type.two) {
            if ($.trim(aD) != "") {
                if (!validateSecIdCard(aD)) {
                    $("#error_tr").show();
                    $("#error_for_nameandidno").html("非法的二代身份证号码").show();
                    return false
                }
            } else {
                $("#error_tr").show();
                $("#error_for_nameandidno").html("请输入证件号码").show();
                return false
            }
        } else {
            if (aB == ticket_submit_order.passenger_card_type.one) {
                if ($.trim(aD) != "") {
                    if (!validateFirIdCard(aD)) {
                        $("#error_tr").show();
                        $("#error_for_nameandidno").html("非法的一代身份证号码").show();
                        return false
                    }
                } else {
                    $("#error_tr").show();
                    $("#error_for_nameandidno").html("请输入证件号码").show();
                    return false
                }
            } else {
                if (aB == ticket_submit_order.passenger_card_type.passport) {
                    if ($.trim(aD) != "") {
                        if (!/^[a-zA-Z0-9]{5,17}$/.test(aD)) {
                            $("#error_tr").show();
                            $("#error_for_nameandidno").html("非法的护照号码").show();
                            return false
                        }
                    } else {
                        $("#error_tr").show();
                        $("#error_for_nameandidno").html("请输入证件号码").show();
                        return false
                    }
                } else {
                    if (aB == ticket_submit_order.passenger_card_type.work) {
                        if ($.trim(aD) != "") {
                            if (!/^[a-zA-Z]{3}[0-9]{12}$/.test(aD)) {
                                $("#error_tr").show();
                                $("#error_for_nameandidno").html("非法的外国人居留证号码").show();
                                return false
                            }
                        } else {
                            $("#error_tr").show();
                            $("#error_for_nameandidno").html("请输入证件号码").show();
                            return false
                        }
                    } else {
                        if (aB == ticket_submit_order.passenger_card_type.hongkong_macau) {
                            if ($.trim(aD) != "") {
                                if (!/^[HMhm]{1}[0-9]{10}$/.test(aD) && !/^[HMhm]{1}[0-9]{8}$/.test(aD)) {
                                    $("#error_tr").show();
                                    $("#error_for_nameandidno").html("非法的港澳居民来往内地通行证号码").show();
                                    return false
                                }
                            } else {
                                $("#error_tr").show();
                                $("#error_for_nameandidno").html("请输入证件号码").show();
                                return false
                            }
                        } else {
                            if (aB == ticket_submit_order.passenger_card_type.taiwan) {
                                if ($.trim(aD) != "") {
                                    if (!/^[0-9]{8}$/.test(aD) && !/^[0-9]{10}$/.test(aD)) {
                                        $("#error_tr").show();
                                        $("#error_for_nameandidno").html("非法的台湾居民来往大陆通行证号码").show();
                                        return false
                                    }
                                } else {
                                    $("#error_tr").show();
                                    $("#error_for_nameandidno").html("请输入证件号码").show();
                                    return false
                                }
                            }
                        }
                    }
                }
            }
        }
        aD = $("#pcountry_value").val();
        if ($.trim(aD) == "") {
            $("#error_tr").show();
            $("#error_for_nameandidno").html("请输入国家/地区").show();
            return false
        }
        if (aB == ticket_submit_order.passenger_card_type.two && "CN" != aD) {
            $("#error_tr").show();
            $("#error_for_nameandidno").html("请填写正确的国家/地区").show();
            return false
        }
        if (aB == ticket_submit_order.passenger_card_type.hongkong_macau || aB == ticket_submit_order.passenger_card_type.taiwan || aB == ticket_submit_order.passenger_card_type.two) {
            if (aD != "CN") {
                $("#error_tr").show();
                $("#error_for_nameandidno").html("请填写正确的国家/地区").show();
                return false
            }
        }
        var aE = dhtmlx.modalbox({
            targSrc: '<div id="loadingdiv"><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
            callback: function() {}
        });
        $("#loadingdiv")[0].style["z-index"] = "20009";
        $("#dialog_add").hide();
        var aA = false;
        $.ajax({
            url: ctx + "passengers/realAdd",
            type: "post",
            data: {
                passenger_name: $.trim($("#pname_value").val()),
                passenger_id_type_code: W,
                passenger_id_no: $("#pidno_value").val().toUpperCase(),
                passenger_type: $("#ptypeselect").val(),
                country_code: $("#pcountry_value").val()
            },
            error: function(aF, aH, aG) {
                dhtmlx.modalbox.hide(aE);
                $("#dialog_add").show();
                $("#error_tr").show();
                $("#error_for_nameandidno").html("您的网络可能有问题").show()
            },
            async: false,
            success: function(aF) {
                dhtmlx.modalbox.hide(aE);
                if (aF.data.flag) {
                    $("#error_for_nameandidno").hide();
                    R = aF.data.totalTimes;
                    aA = true;
                    two_isOpenClick = aF.data.two_isOpenClick;
                    other_isOpenClick = aF.data.other_isOpenClick
                } else {
                    $("#dialog_add").show();
                    $("#error_tr").show();
                    $("#error_for_nameandidno").html(aF.data.message).show()
                }
            }
        });
        return aA
    };
    addPassengerInfo = function() {
        if (S(limit_tickets)) {
            return
        }
        if (limit_tickets.length >= init_limit_ticket_num) {
            k("提示", "最多只能购买" + init_limit_ticket_num + "张车票");
            return
        }
        if (limit_tickets.length == 0) {
            limit_tickets.push(new Z("sdAdd_" + Y(), "", "", ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? ticket_submit_order.ticket_type.student: "", "", "", "", "", "", "", "checked='checked'", ticketInfoForPassengerForm.tour_flag, ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? true: false, "", true))
        }
        var aA = new Z("sdAdd_" + Y(), "", "", ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? ticket_submit_order.ticket_type.student: "", "", "", "", "", "", "", ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? "": "checked='checked'", ticketInfoForPassengerForm.tour_flag, ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? true: false, "", ticketInfoForPassengerForm.purpose_codes == ticket_submit_order.ticket_query_flag.query_student ? false: true);
        limit_tickets.push(aA);
        if (ticket_seat_codeMap[aA.ticket_type].length < 1) {
            k("提示", "很抱歉，" + ticket_submit_order.ticket_type_name[aA.ticket_type] + "余票不足！")
        }
        renderTickInfo(limit_tickets, false);
        f()
    };
    delPassengerInfo = function(aE) {
        if ($("span[id^='del_']").length < 2) {
            $("#selected_ticket_passenger_all").prop("checked", false);
            var aG = $(aE).attr("id");
            var aK = aG.split("_")[1];
            $("#passenger_name_" + aK).val("");
            $("#passenger_id_no_" + aK).val("");
            $("#phone_no_" + aK).val("")
        }
        var aB = $(aE).attr("id");
        if (aB.indexOf("djPassenger") > -1) {
            var aF = aB.split("_")[3];
            var aO = "djPassenger_" + aF;
            var aC = $("#" + aO);
            var aN = aB.split("_")[2] + "_" + aB.split("_")[3];
            for (var aD = 0; aD < limit_tickets.length; aD++) {
                var aJ = limit_tickets[aD].only_id;
                if (aJ == aN) {
                    limit_tickets.splice(aD, 1);
                    if (limit_tickets.length < 1) {
                        G("0")
                    }
                    break
                }
            }
            for (var aD = 0; aD < g.length; aD++) {
                if (g[aD] == aO) {
                    g.splice(aD, 1);
                    break
                }
            }
            if (aC.attr("id") != undefined && aC.attr("id") != "undefined" && aC.attr("id") != null && aC.attr("id") != "") {
                aC.prop("checked", false);
                aC.next().removeClass()
            }
            renderTickInfo(limit_tickets, false)
        } else {
            if (aB.indexOf("normalPassenger") > -1) {
                var aH = aB.split("_")[3];
                var aO = "normalPassenger_" + aH;
                var aA = $("#" + aO);
                var aN = aB.split("_")[2] + "_" + aB.split("_")[3];
                for (var aD = 0; aD < limit_tickets.length; aD++) {
                    var aJ = limit_tickets[aD].only_id;
                    if (aJ == aN) {
                        limit_tickets.splice(aD, 1);
                        if (limit_tickets.length < 1) {
                            G("0")
                        }
                        break
                    }
                }
                for (var aD = 0; aD < d.length; aD++) {
                    if (d[aD] == aO) {
                        d.splice(aD, 1);
                        break
                    }
                }
                if (aA.attr("id") != undefined && aA.attr("id") != "undefined" && aA.attr("id") != null && aA.attr("id") != "") {
                    aA.prop("checked", false);
                    aA.next().removeClass()
                }
                renderTickInfo(limit_tickets, false)
            } else {
                if (aB.indexOf("sdAdd") > -1) {
                    var aN = aB.split("_")[2] + "_" + aB.split("_")[3];
                    for (var aD = 0; aD < limit_tickets.length; aD++) {
                        var aJ = limit_tickets[aD].only_id;
                        if (aJ == aN) {
                            limit_tickets.splice(aD, 1);
                            if (limit_tickets.length < 1) {
                                G("0")
                            }
                            break
                        }
                    }
                    renderTickInfo(limit_tickets, false)
                } else {
                    if (aB.indexOf("default") > -1) {
                        var aN = aB.split("_")[2] + "_" + aB.split("_")[3];
                        for (var aD = 0; aD < limit_tickets.length; aD++) {
                            var aJ = limit_tickets[aD].only_id;
                            if (aJ == aN) {
                                limit_tickets.splice(aD, 1);
                                if (limit_tickets.length < 1) {
                                    var aM = $("input[id*=_default_]");
                                    if (aM == undefined || aM == "undefined" || aM == null || aM.length == 0) {
                                        G(0)
                                    } else {
                                        var aI = $(aM[aM.length - 1]).attr("id");
                                        var aL = aI.split("_");
                                        G(Number(aL[aL.length - 1]) + 1)
                                    }
                                }
                                break
                            }
                        }
                        renderTickInfo(limit_tickets, false)
                    }
                }
            }
        }
        f()
    };
    addChildPassengerInfo = function(aC) {
        if (S(limit_tickets)) {
            return
        }
        if (limit_tickets.length >= init_limit_ticket_num) {
            k("提示", "最多只能购买" + init_limit_ticket_num + "张车票");
            return
        }
        var aH = $("#seatType_" + $(aC).parent().parent().attr("id").substr(6)).val();
        var aA = $(aC).attr("name");
        var aE = aA.split("_")[2];
        var aI;
        if (aA.indexOf("normalPassenger") < 0) {
            aI = M[aE]
        } else {
            aI = az[aE]
        }
        var aF = new Z("sdAdd_" + Y(), "", "", 2, "儿童票", aI.passenger_name, aI.passenger_id_type_code, af(aI.passenger_id_no, aI.passenger_id_type_code, aI.passenger_id_type_name), aI.passenger_id_no, aI.mobile_no, "", ticketInfoForPassengerForm.tour_flag, true, 2, false, true);
        limit_tickets.push(aF);
        if (ticket_seat_codeMap[aF.ticket_type].length < 1) {
            k("提示", "很抱歉，" + ticket_submit_order.ticket_type_name[aF.ticket_type] + "余票不足！")
        }
        renderTickInfo(limit_tickets, false);
        f();
        var aG = $("#ticketInfo_id tr");
        var aD = aG.length;
        if (aD > 2) {
            var aB = aG.eq(aD - 2).attr("id");
            $("#seatType_" + aB.substr(6) + " option[value='" + aH + "']").attr("selected", "selected")
        }
    };
    upadateSavePassengerInfo = function() {
        var aC = $("span[id^='del_']");
        for (var aE = 0; aE < aC.length; aE++) {
            var aA = $(aC[aE]).attr("id");
            for (var aB = 0; aB < limit_tickets.length; aB++) {
                var aF = limit_tickets[aB];
                if (aF.only_id == (aA.split("_")[2] + "_" + aA.split("_")[3])) {
                    var aD = aA.split("_")[1];
                    limit_tickets[aB].seat_type = $("#seatType_" + aD).val();
                    limit_tickets[aB].seat_type_name = $("#seatType_" + aD + " option:selected").text();
                    limit_tickets[aB].ticket_type = $("#ticketType_" + aD).val();
                    limit_tickets[aB].seatTypes = ticket_seat_codeMap[limit_tickets[aB].ticket_type == "" ? ticket_submit_order.ticket_type.adult: limit_tickets[aB].ticket_type];
                    limit_tickets[aB].ticket_type_name = $("#ticketType_" + aD + " option:selected").text();
                    limit_tickets[aB].name = $("#passenger_name_" + aD).val();
                    limit_tickets[aB].id_type = $("#passenger_id_type_" + aD).val();
                    limit_tickets[aB].id_type_name = $("#passenger_id_type_" + aD + " option:selected").text();
                    limit_tickets[aB].id_no = $("#passenger_id_no_" + aD).val();
                    limit_tickets[aB].phone_no = $("#phone_no_" + aD).val();
                    limit_tickets[aB].save_status = $("#save_" + aD).prop("checked") ? "checked='checked'": "";
                    if (limit_tickets[aB].tour_flag == ticket_submit_order.tour_flag.dc || limit_tickets[aB].tour_flag == ticket_submit_order.tour_flag.wc) {
                        limit_tickets[aB].isDisabled = ($("#ticketType_" + aD).val() == ticket_submit_order.ticket_type.student) || (!limit_tickets[aB].checkboxStatus) ? true: false
                    }
                    break
                }
            }
        }
        f()
    };
    selectedTicketPassengerAll = function(aC, aA) {
        if (aC.checked) {
            for (var aB = 0; aB < limit_tickets.length; aB++) {
                limit_tickets[aB].save_status = "checked='checked'";
                if (!$("#save_" + (aB + 1)).prop("disabled")) {
                    $("#save_" + (aB + 1)).prop("checked", true)
                }
            }
        } else {
            if (aA) {
                for (var aB = 0; aB < limit_tickets.length; aB++) {
                    limit_tickets[aB].save_status = "";
                    if (!$("#save_" + (aB + 1)).prop("disabled")) {
                        $("#save_" + (aB + 1)).prop("checked", false)
                    }
                }
            }
        }
    };
    doTicketTitleShow = function(aA) {
        var aE = new Array();
        var aH = ticketInfoForPassengerForm.queryLeftNewDetailDTO;
        var aI = ticketInfoForPassengerForm.queryLeftTicketRequestDTO;
        var aD = aI.train_date.substr(0, 4) + "-" + aI.train_date.substr(4, 2) + "-" + aI.train_date.substr(6, 2);
        var aB = t(new Date(Date.parse(aD.replace(/-/g, "/"))));
        var aJ = function(aL, aN, aK, aP, aM, aO, aR, aQ) {
            this.date = aL;
            this.week = aN;
            this.station_train_code = aK;
            this.train_headers = aP;
            this.from_station = aM;
            this.start_time = aO;
            this.to_station = aR;
            this.arrive_time = aQ
        };
        var aC = aH.start_time.substr(0, 2) + ":" + aH.start_time.substr(2, 2);
        var aG = aH.arrive_time.substr(0, 2) + ":" + aH.arrive_time.substr(2, 2);
        var aF = new aJ(aD, aB, aH.station_train_code, aI.train_headers, aH.from_station_name, aC, aH.to_station_name, aG);
        aE.push(aF);
        if (!aA) {
            l(aE)
        } else {
            if (aA) {
                ak(aE)
            }
        }
    };
    function x() {
        T(getSeatTypePrices())
    }
    function t(aB) {
        var aE = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var aD = 0;
        for (var aC = 0; aC < aE.length; aC++) {
            if (aB.toString().indexOf(aE[aC]) > -1) {
                aD = aC + 1;
                break
            }
        }
        var aA = "";
        switch (aD) {
        case 1:
            aA = "周一";
            break;
        case 2:
            aA = "周二";
            break;
        case 3:
            aA = "周三";
            break;
        case 4:
            aA = "周四";
            break;
        case 5:
            aA = "周五";
            break;
        case 6:
            aA = "周六";
            break;
        case 7:
            aA = "周日";
            break
        }
        return aA
    }
    function m(aB) {
        var aA = "";
        for (var aC = 0; aC < init_cardTypes.length; aC++) {
            if (init_cardTypes[aC].value == aB) {
                aA = init_cardTypes[aC].id;
                break
            }
        }
        return aA
    }
    function ar(aB) {
        var aA = aB.getHours() < 10 ? ("0" + aB.getHours()) : aB.getHours();
        var aC = aB.getMinutes() < 10 ? ("0" + aB.getMinutes()) : aB.getMinutes();
        return aA + ":" + aC
    }
    function C(aC) {
        var aB = aC.getFullYear();
        var aD = (aC.getMonth() + 1) < 10 ? ("0" + (aC.getMonth() + 1)) : (aC.getMonth() + 1);
        var aA = aC.getDate() < 10 ? ("0" + aC.getDate()) : aC.getDate();
        return aB + "-" + aD + "-" + aA
    }
    function A(aF) {
        var aB = $(aF).attr("id");
        var aE = $.trim($("#" + aB).val());
        if (aB.indexOf("passenger_name_") > -1) {
            var aD = aB.split("_")[2];
            var aC = $("#passenger_id_type_" + aD).val();
            if ($.trim(aE) != "") {
                if (aC == ticket_submit_order.passenger_card_type.two || aC == ticket_submit_order.passenger_card_type.one) {
                    if (!/^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(aE)) {
                        $("#tr_id_" + aD + "_check").show();
                        $("#" + aB + "_check").show();
                        $("#" + aB + "_check").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！")
                    } else {
                        $("#" + aB + "_check").hide();
                        aa(aD)
                    }
                } else {
                    if (aC == ticket_submit_order.passenger_card_type.passport) {
                        if (!/^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(aE) || /^[-]+$/.test(aE)) {
                            $("#tr_id_" + aD + "_check").show();
                            $("#" + aB + "_check").show();
                            $("#" + aB + "_check").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！").show();
                            return false
                        }
                    } else {
                        if (aC == ticket_submit_order.passenger_card_type.work) {
                            if (!/^[a-zA-Z ]+$/.test(aE) || /^[-]+$/.test(aE)) {
                                $("#tr_id_" + aD + "_check").show();
                                $("#" + aB + "_check").show();
                                $("#" + aB + "_check").html("姓名只能包含英文或者空格，参见姓名填写规则进行填写！").show();
                                return false
                            }
                        } else {
                            if (!/^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(aE)) {
                                $("#tr_id_" + aD + "_check").show();
                                $("#" + aB + "_check").show();
                                $("#" + aB + "_check").html("姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！")
                            } else {
                                $("#" + aB + "_check").hide();
                                aa(aD)
                            }
                        }
                    }
                }
            } else {
                $("#tr_id_" + aD + "_check").show();
                $("#" + aB + "_check").show();
                $("#" + aB + "_check").html("请输入乘车人姓名")
            }
        } else {
            if (aB.indexOf("passenger_id_no_") > -1) {
                var aD = aB.split("_")[3];
                var aA = $("#passenger_id_type_" + aD).val();
                if (aA == ticket_submit_order.passenger_card_type.two) {
                    if ($.trim(aE) != "") {
                        if (!validateSecIdCard(aE)) {
                            $("#tr_id_" + aD + "_check").show();
                            $("#" + aB + "_check").show();
                            $("#" + aB + "_check").html("非法的二代身份证号码")
                        } else {
                            $("#" + aB + "_check").hide();
                            aa(aD)
                        }
                    } else {
                        $("#tr_id_" + aD + "_check").show();
                        $("#" + aB + "_check").show();
                        $("#" + aB + "_check").html("请输入证件号码")
                    }
                } else {
                    if (aA == ticket_submit_order.passenger_card_type.one) {
                        if ($.trim(aE) != "") {
                            if (!validateFirIdCard(aE)) {
                                $("#tr_id_" + aD + "_check").show();
                                $("#" + aB + "_check").show();
                                $("#" + aB + "_check").html("非法的一代身份证号码")
                            } else {
                                $("#" + aB + "_check").hide();
                                aa(aD)
                            }
                        } else {
                            $("#tr_id_" + aD + "_check").show();
                            $("#" + aB + "_check").show();
                            $("#" + aB + "_check").html("请输入证件号码")
                        }
                    } else {
                        if (aA == ticket_submit_order.passenger_card_type.passport) {
                            if ($.trim(aE) != "") {
                                if (!/^[a-zA-Z0-9]{5,17}$/.test(aE)) {
                                    $("#tr_id_" + aD + "_check").show();
                                    $("#" + aB + "_check").show();
                                    $("#" + aB + "_check").html("非法的护照号码")
                                } else {
                                    $("#" + aB + "_check").hide();
                                    aa(aD)
                                }
                            } else {
                                $("#tr_id_" + aD + "_check").show();
                                $("#" + aB + "_check").show();
                                $("#" + aB + "_check").html("请输入证件号码")
                            }
                        } else {
                            if (aA == ticket_submit_order.passenger_card_type.work) {
                                if ($.trim(aE) != "") {
                                    if (!/^[a-zA-Z]{3}[0-9]{12}$/.test(aE)) {
                                        $("#tr_id_" + aD + "_check").show();
                                        $("#" + aB + "_check").show();
                                        $("#" + aB + "_check").html("非法的外国人居留证号码")
                                    } else {
                                        $("#" + aB + "_check").hide();
                                        aa(aD)
                                    }
                                } else {
                                    $("#tr_id_" + aD + "_check").show();
                                    $("#" + aB + "_check").show();
                                    $("#" + aB + "_check").html("请输入证件号码")
                                }
                            } else {
                                if (aA == ticket_submit_order.passenger_card_type.hongkong_macau) {
                                    if ($.trim(aE) != "") {
                                        if (!/^[HMhm]{1}[0-9]{10}$/.test(aE) && !/^[HMhm]{1}[0-9]{8}$/.test(aE)) {
                                            $("#tr_id_" + aD + "_check").show();
                                            $("#" + aB + "_check").show();
                                            $("#" + aB + "_check").html("非法的港澳居民来往内地通行证号码")
                                        } else {
                                            $("#" + aB + "_check").hide();
                                            aa(aD)
                                        }
                                    } else {
                                        $("#tr_id_" + aD + "_check").show();
                                        $("#" + aB + "_check").show();
                                        $("#" + aB + "_check").html("请输入证件号码")
                                    }
                                } else {
                                    if (aA == ticket_submit_order.passenger_card_type.taiwan) {
                                        if ($.trim(aE) != "") {
                                            if (!/^[0-9]{8}$/.test(aE) && !/^[0-9]{10}$/.test(aE)) {
                                                $("#tr_id_" + aD + "_check").show();
                                                $("#" + aB + "_check").show();
                                                $("#" + aB + "_check").html("非法的台湾居民来往大陆通行证号码")
                                            } else {
                                                $("#" + aB + "_check").hide();
                                                aa(aD)
                                            }
                                        } else {
                                            $("#tr_id_" + aD + "_check").show();
                                            $("#" + aB + "_check").show();
                                            $("#" + aB + "_check").html("请输入证件号码")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (aB.indexOf("phone_no_") > -1) {
                    var aD = aB.split("_")[2];
                    if (aE != "") {
                        if (!/^[0-9]{11}$/.test(aE)) {
                            $("#tr_id_" + aD + "_check").show();
                            $("#" + aB + "_check").show();
                            $("#" + aB + "_check").html("非法的手机号码")
                        } else {
                            $("#" + aB + "_check").hide();
                            aa(aD)
                        }
                    }
                } else {
                    if (aB.indexOf("seatType_") > -1) {
                        var aD = aB.split("_")[1];
                        if ($("#" + aB).val() == null || $("#" + aB).val() == "") {
                            $("#tr_id_" + aD + "_check").show();
                            $("#" + aB + "_check").show();
                            $("#" + aB + "_check").html(ticket_submit_order.ticket_type_name[$("#ticketType_" + aD).val()] + "余票不足!")
                        } else {
                            $("#" + aB + "_check").hide();
                            aa(aD)
                        }
                    }
                }
            }
        }
    }
    function aa(aA) {
        if (N(aA)) {
            $("#tr_id_" + aA + "_check").hide()
        }
    }
    function N(aA) {
        if ($("#seatType_" + aA + "_check").css("display") == "block" || $("#seatType_" + aA + "_check").css("display") == "inline" || $("#passenger_name_" + aA + "_check").css("display") == "block" || $("#passenger_name_" + aA + "_check").css("display") == "inline" || $("#passenger_id_no_" + aA + "_check").css("display") == "block" || $("#passenger_id_no_" + aA + "_check").css("display") == "inline" || $("#phone_no_" + aA + "_check").css("display") == "block" || $("#phone_no_" + aA + "_check").css("display") == "inline") {
            return false
        } else {
            return true
        }
    }
    stepFirValidatorTicketInfo = function(aA) {
        var aG = "";
        if (!aA) {
            aG = $("input[id^='passenger_name_']");
            for (var aC = 0; aC < aG.length; aC++) {
                A(aG[aC])
            }
            aG = $("input[id^='passenger_id_no_']");
            for (var aC = 0; aC < aG.length; aC++) {
                A(aG[aC])
            }
            aG = $("input[id^='phone_no_']");
            for (var aC = 0; aC < aG.length; aC++) {
                A(aG[aC])
            }
            aG = $("select[id^='seatType_']");
            for (var aC = 0; aC < aG.length; aC++) {
                A(aG[aC])
            }
        } else {
            aG = $("select[id^='seatType_']");
            for (var aC = 0; aC < aG.length; aC++) {
                A(aG[aC])
            }
        }
        if (ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc && $("#dw_fczk")[0]) {
            var aD = $("#ticketInfo_id").find("select[id^=seatType_]");
            var aH = false;
            for (var aB = 0,
            aI = aD.length; aB < aI; aB++) {
                var aF = aD.eq(aB);
                var aE = aF.val();
                if (aE == "A" || aE == "F") {
                    aH = true;
                    break
                }
            }
            if (aH) {
                $("#dw_fczk").show()
            } else {
                $("#dw_fczk").hide()
            }
        }
    };
    elemOnkeyupNotice = function(aF) {
        var aD = av(aF).split(",");
        var aC = aD[0];
        var aB = aD[1];
        var aA = aD[2];
        var aE = aD[3];
        var aG = (Number($(aF).css("width").replace("px", "")) - 15);
        if (Number(aC) >= Number(aB) && Number(aC) > aG && $.trim(aE) != "") {
            $("#" + aA + "_notice").css("width", aC + "px")
        } else {
            if (Number(aC) < Number(aB) && Number(aB) > aG && Number(aC) > aG && $.trim(aE) != "") {
                $("#" + aA + "_notice").css("width", aC + "px")
            } else {
                $("#" + aA + "_notice").css("width", aG + "px")
            }
        }
        $("#" + aA + "_notice").html(aE)
    };
    function av(aD) {
        var aG = "";
        var aA = $(aD).attr("id");
        var aH = $(aD).val();
        var aI = "";
        var aJ = $("#passenger_id_type_" + aA.substr(Number(aA.lastIndexOf("_")) + 1)).val();
        var aB = $("#" + aA + "_notice").css("width").replace("px", "");
        var aE = 0;
        var aF = 10;
        for (var aC = 0; aC < aH.length; aC++) {
            aI += aH.charAt(aC);
            if (aA.indexOf("passenger_id_no_") > -1 && (aJ == ticket_submit_order.passenger_card_type.two || aJ == ticket_submit_order.passenger_card_type.one)) {
                if (aC == 5 || aC == 13) {
                    aI += " "
                }
            } else {
                if (aA.indexOf("phone_no_") > -1) {
                    if (aC == 2 || aC == 6) {
                        aI += " "
                    }
                }
            }
        }
        for (var aC = 0; aC < aH.length; aC++) {
            if (/^[\u3400-\u9FFF]+/.test(aH.charAt(aC))) {
                aE += 1 * 10;
                aF = 15
            }
            if (/^[0-9]+/.test(aH.charAt(aC))) {
                aE += 1 * 12;
                aF = 20
            } else {
                aE += 1 * 12
            }
        }
        aE += aF;
        aG = aE + "," + aB + "," + aA + "," + aI;
        return aG
    }
    updateAllCheckBox = function() {
        var aB = $("input[id^='save_']");
        for (var aA = 0; aA < aB.length; aA++) {
            if (!$(aB[aA]).prop("checked")) {
                $("#selected_ticket_passenger_all").prop("checked", false);
                return
            }
        }
        $("#selected_ticket_passenger_all").prop("checked", true)
    };
    updateSeatTypeByeTickeType = function(aF) {
        var aI = $(aF).prop("id").split("_")[1];
        var aC = $("#seatType_" + aI).val();
        var aG = ticket_seat_codeMap[$(aF).val()];
        aG.sort(ah);
        var aH = $("span[id^=del_" + aI + "]").attr("id");
        var aL = $("#seatType_" + aI);
        var aA = false;
        var aB = "您是要购买";
        if ($(aF).val() == ticket_submit_order.ticket_type.child) {
            aA = true;
            aB = aB + "儿童票吗（随同成人旅行身高1.2～1.5米的儿童，应当购买儿童票；超过1.5米时应买全价票。每一成人旅客可免费携带一名身高不足1.2米的儿童，超过一名时，超过的人数应买儿童票，详见购买儿童票有关规定。如不符合相关规定，请点击“取消”。）？<br/>儿童未办理居民身份证的，建议使用同行成年人身份信息购票，否则须凭儿童本人有效身份证件原件及订单号在车站人工窗口换取纸质车票。"
        } else {
            if ($(aF).val() == ticket_submit_order.ticket_type.student) {
                aA = true;
                aB = aB + "学生票吗（凭购票时所使用的有效身份证件原件和附有学生火车票优惠卡的有效学生证原件换票乘车，详见购买学生票有关规定。如不符合相关规定，请点击“取消”。）？"
            } else {
                if ($(aF).val() == ticket_submit_order.ticket_type.disability) {
                    aA = true;
                    aB = aB + "残军票吗（须凭购票时所使用的有效身份证件原件和有效的“中华人民共和国残疾军人证”、“中华人民共和国伤残人民警察证”原件换票乘车，详见购买残疾军人优待票有关规定。如不符合相关规定，请点击“取消”。）？"
                }
            }
        }
        if ($(aF).val() == ticket_submit_order.ticket_type.student) {
            E(aI, true);
            aA = true;
            $("#passenger_id_type_" + aI).css("color", "#999999");
            $("#save_" + aI).next().removeClass("i-save").addClass("i-save i-save-dis");
            if (IsStudentDate) {
                var aE = null;
                var aD = 0;
                if (aH.indexOf("djPassenger_") > -1) {
                    aE = M[aH.split("_")[3]]
                } else {
                    aE = az[aH.split("_")[3]]
                }
                if ("3" != aE.passenger_type) {
                    if (!$.whatsSelect(false)) {
                        k("提示", "请从常用联系人中选择学生旅客");
                        Q(aI);
                        if (aH.indexOf("djPassenger_") > -1) {
                            var aJ = $("#djPassenger_" + aH.split("_")[3]);
                            if (aJ[0]) {
                                aJ[0]["checked"] = false;
                                aJ.parent().find("label").removeClass("colorA")
                            }
                        } else {
                            var aJ = $("#normalPassenger_" + aH.split("_")[3]);
                            if (aJ[0]) {
                                aJ[0]["checked"] = false;
                                aJ.parent().find("label").removeClass("colorA");
                                $(aF).find("option").first().attr("selected", "selected")
                            }
                        }
                    }
                } else {
                    aA = true;
                    $("#dialog_xsertcj_msg").html(aB);
                    dhtmlx.createWin({
                        winId: "dialog_xsertcj",
                        closeWinId: ["dialog_xsertcj_close", "dialog_xsertcj_cancel"],
                        okId: "dialog_xsertcj_ok",
                        callback: function() {
                            $(aF).find("option").first().attr("selected", "selected");
                            $("#seatType_" + aI).trigger("change");
                            aG = ticket_seat_codeMap[$(aF).find("option").first().val()];
                            aG.sort(ah);
                            if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                                $("#save_" + aI).next().removeClass("i-save i-save-dis").addClass("i-save");
                                a($(aF).val(), aI);
                                E(aI, true)
                            }
                            if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                                ae(aF)
                            }
                            aL.empty();
                            for (var aN = 0; aN < aG.length; aN++) {
                                aL.append("<option value='" + aG[aN].id + "'>" + aG[aN].value + "（￥" + getSeatTypePriceForSeatName(aG[aN].value) + "）</option>")
                            }
                            var aO = $("#seatType_" + aI + " option[value='" + aC + "']");
                            if (aO[0]) {
                                aO.attr("selected", "selected")
                            }
                        },
                        okCallBack: function() {
                            if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                                $("#save_" + aI).next().removeClass("i-save i-save-dis").addClass("i-save");
                                a($(aF).val(), aI);
                                E(aI, true)
                            }
                            if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                                ae(aF)
                            }
                            aL.empty();
                            for (var aN = 0; aN < aG.length; aN++) {
                                aL.append("<option value='" + aG[aN].id + "'>" + aG[aN].value + "（￥" + getSeatTypePriceForSeatName(aG[aN].value) + "）</option>")
                            }
                            var aO = $("#seatType_" + aI + " option[value='" + aC + "']");
                            if (aO[0]) {
                                aO.attr("selected", "selected")
                            }
                        }
                    })
                }
            } else {
                k("提示", "学生票的乘车时间为每年的暑假6月1日至9月30日、寒假12月1日至3月31日，目前不办理学生票业务。");
                $(aF).find("option").first().attr("selected", "selected");
                $("#seatType_" + aI).trigger("change");
                aG = ticket_seat_codeMap[$(aF).find("option").first().val()];
                aG.sort(ah)
            }
        } else {
            if (aA) {
                $("#dialog_xsertcj_msg").html(aB);
                dhtmlx.createWin({
                    winId: "dialog_xsertcj",
                    closeWinId: ["dialog_xsertcj_close", "dialog_xsertcj_cancel"],
                    okId: "dialog_xsertcj_ok",
                    callback: function() {
                        $(aF).find("option").first().attr("selected", "selected");
                        $("#seatType_" + aI).trigger("change");
                        aG = ticket_seat_codeMap[$(aF).find("option").first().val()];
                        aG.sort(ah);
                        if ($(aF).val() == ticket_submit_order.ticket_type.adult) {
                            $("#addchild_" + aI).attr("onclick", "javascript:addChildPassengerInfo(this);");
                            $("#addchild_" + aI).html("添加儿童票 ")
                        } else {
                            if ($(aF).val() == ticket_submit_order.ticket_type.child) {
                                $("#addchild_" + aI).removeAttr("onclick");
                                $("#addchild_" + aI).html(" ")
                            }
                        }
                        if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                            $("#save_" + aI).next().removeClass("i-save i-save-dis").addClass("i-save");
                            a($(aF).val(), aI);
                            E(aI, true)
                        }
                        if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                            ae(aF)
                        }
                        aL.empty();
                        for (var aN = 0; aN < aG.length; aN++) {
                            aL.append("<option value='" + aG[aN].id + "'>" + aG[aN].value + "（￥" + getSeatTypePriceForSeatName(aG[aN].value) + "）</option>")
                        }
                        var aO = $("#seatType_" + aI + " option[value='" + aC + "']");
                        if (aO[0]) {
                            aO.attr("selected", "selected")
                        }
                    },
                    okCallBack: function() {
                        if ($(aF).val() == ticket_submit_order.ticket_type.adult) {
                            $("#addchild_" + aI).attr("onclick", "javascript:addChildPassengerInfo(this);");
                            $("#addchild_" + aI).html("添加儿童票 ")
                        } else {
                            if ($(aF).val() == ticket_submit_order.ticket_type.child) {
                                $("#addchild_" + aI).removeAttr("onclick");
                                $("#addchild_" + aI).html(" ")
                            }
                        }
                        if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                            $("#save_" + aI).next().removeClass("i-save i-save-dis").addClass("i-save");
                            a($(aF).val(), aI);
                            E(aI, true)
                        }
                        if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                            ae(aF)
                        }
                        aL.empty();
                        for (var aN = 0; aN < aG.length; aN++) {
                            aL.append("<option value='" + aG[aN].id + "'>" + aG[aN].value + "（￥" + getSeatTypePriceForSeatName(aG[aN].value) + "）</option>")
                        }
                        var aO = $("#seatType_" + aI + " option[value='" + aC + "']");
                        if (aO[0]) {
                            aO.attr("selected", "selected")
                        }
                    }
                })
            }
            if (!aA) {
                if ($(aF).val() == ticket_submit_order.ticket_type.adult) {
                    $("#addchild_" + aI).attr("onclick", "javascript:addChildPassengerInfo(this);");
                    $("#addchild_" + aI).html("添加儿童票 ")
                } else {
                    if ($(aF).val() == ticket_submit_order.ticket_type.child) {
                        $("#addchild_" + aI).removeAttr("onclick");
                        $("#addchild_" + aI).html(" ")
                    }
                }
                if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                    $("#save_" + aI).next().removeClass("i-save i-save-dis").addClass("i-save");
                    a($(aF).val(), aI);
                    E(aI, true)
                }
            }
        }
        if (!aA) {
            if (! (aH.indexOf("djPassenger_") > -1 || aH.indexOf("normalPassenger_") > -1)) {
                ae(aF)
            }
            aL.empty();
            for (var aK = 0; aK < aG.length; aK++) {
                aL.append("<option value='" + aG[aK].id + "'>" + aG[aK].value + "（￥" + getSeatTypePriceForSeatName(aG[aK].value) + "）</option>")
            }
            var aM = $("#seatType_" + aI + " option[value='" + aC + "']");
            if (aM[0]) {
                aM.attr("selected", "selected")
            }
        }
    };
    function a(aB, aD) {
        var aF = $("span[id^=del_" + aD + "]").attr("id");
        var aC = aF.split("_")[2] + "_" + aF.split("_")[3];
        for (var aE = 0; aE < limit_tickets.length; aE++) {
            var aA = limit_tickets[aE];
            if (aA.only_id == aC) {
                if (aA.name == "" && aA.phone_no == "" && aA.id_no == "") {
                    limit_tickets[aE].ticket_type = aB;
                    break
                }
            }
        }
    }
    function Q(aE) {
        var aF = $("span[id^=del_" + aE + "]").attr("id");
        if (undefined != aF && "undefined" != aF && "" != aF) {
            var aH = aF.split("_")[2] + "_" + aF.split("_")[3];
            $("#passenger_name_" + aE).val("");
            $("#passenger_id_no_" + aE).val("");
            $("#phone_no_" + aE).val("");
            for (var aC = 0; aC < limit_tickets.length; aC++) {
                var aI = limit_tickets[aC];
                if (aI.only_id == aH) {
                    var aA = Y();
                    var aG = new Z("sdAdd_" + aA, "", "", ticket_submit_order.ticket_type.student, "", "", "", "", "", "", "", ticketInfoForPassengerForm.tour_flag, true, "", true);
                    limit_tickets[aC] = aG;
                    $("span[id^=del_" + aE + "]").attr("id", "del_" + aF.split("_")[1] + "_sdAdd_" + aA);
                    break
                }
            }
            if (aH.indexOf("djPassenger") > -1) {
                var aB = M[aH.split("_")[1]];
                var aL = "djPassenger_" + aB.passenger_name + "_" + aB.passenger_id_type_code + "_" + aB.passenger_id_no + "_" + (aB.mobile_no == "" ? "null": aB.mobile_no);
                $("#" + aL).prop("checked", false);
                $("#" + aL).next().removeClass();
                for (var aC = 0; aC < g.length; aC++) {
                    var aD = g[aC];
                    if (aD == aL) {
                        g.splice(aC, 1);
                        break
                    }
                }
            } else {
                if (aH.indexOf("normalPassenger") > -1) {
                    var aK = az[aH.split("_")[1]];
                    var aL = "normalPassenger_" + aK.passenger_name + "_" + aK.passenger_id_type_code + "_" + aK.passenger_id_no + "_" + (aK.mobile_no == "" ? "null": aK.mobile_no);
                    $("#" + aL).prop("checked", false);
                    $("#" + aL).next().removeClass();
                    for (var aC = 0; aC < d.length; aC++) {
                        var aJ = d[aC];
                        if (aJ == aL) {
                            d.splice(aC, 1);
                            break
                        }
                    }
                }
            }
        }
    }
    function aq(aC) {
        var aA = aC.name + "_" + aC.id_type + "_" + aC.id_no;
        for (var aB = 0; aB < az.length; aB++) {
            var aD = az[aB].passenger_name + "_" + az[aB].passenger_id_type_code + "_" + az[aB].passenger_id_no;
            if (aA == aD) {
                return az[aB]
            }
        }
        return ""
    }
    function E(aA, aB) {
        $("#passenger_name_" + aA).prop("readonly", aB);
        $("#passenger_name_" + aA).prop("disabled", aB);
        $("#passenger_id_type_" + aA).prop("disabled", aB);
        $("#passenger_id_no_" + aA).prop("readonly", aB);
        $("#phone_no_" + aA).prop("readonly", aB);
        $("#passenger_id_no_" + aA).prop("disabled", aB);
        $("#phone_no_" + aA).prop("disabled", aB);
        $("#save_" + aA).prop("disabled", aB);
        $("#save_" + aA).prop("checked", !aB)
    }
    function ae(aF) {
        var aA = $(aF).attr("id").split("_")[1];
        var aC = $("#passenger_id_type_" + aA);
        var aB = aC.val();
        aC.empty();
        if ($(aF).val() == ticket_submit_order.ticket_type.disability) {
            var aE = false;
            for (var aD = 0; aD < init_cardTypes.length; aD++) {
                if (init_cardTypes[aD].id == ticket_submit_order.passenger_card_type.two) {
                    aC.append("<option value='" + init_cardTypes[aD].id + "' " + (init_cardTypes[aD].id == aB ? "selected='selected'": "") + ">" + init_cardTypes[aD].value + "</option>");
                    aE = true
                }
            }
            if (!aE) {
                k("提示", "对不起，您填写的乘车人 <span style='color:black;font-size:30px'><i>" + $("#passenger_name_" + aA).val() + "</i></span> 不能购买残军票！");
                for (var aD = 0; aD < init_cardTypes.length; aD++) {
                    aC.append("<option value='" + init_cardTypes[aD].id + "'" + (init_cardTypes[aD].id == aB ? "selected='selected'": "") + ">" + init_cardTypes[aD].value + "</option>")
                }
            }
        } else {
            for (var aD = 0; aD < init_cardTypes.length; aD++) {
                aC.append("<option value='" + init_cardTypes[aD].id + "'" + (init_cardTypes[aD].id == aB ? "selected='selected'": "") + ">" + init_cardTypes[aD].value + "</option>")
            }
        }
    }
    getSeatTypePriceForSeatName = function(aA) {
        var aD = 0;
        var aC = getSeatTypePrices();
        for (var aB = 0; aB < aC.length; aB++) {
            if (aC[aB].seat_type_name == aA) {
                aD = aC[aB].ticket_price;
                break
            }
        }
        return aD
    };
    getSeatTypePrices = function() {
        var aE = function(aI, aH, aG) {
            this.seat_type_name = aI;
            this.ticket_price = aH == Number(0) ? "": aH;
            this.ticket_statu = aG;
            this.wp_statu = aG == "无票" ? true: false
        };
        var aF = new Array();
        var aC = ticketInfoForPassengerForm.leftDetails;
        for (var aD = 0; aD < aC.length; aD++) {
            var aB = aC[aD].split(/[(,)]/);
            var aA = new aE(aB[0], Number(aB[1].replace("元", "") == "--" ? 0 : aB[1].replace("元", "")).toFixed(1), aB[2]);
            aF.push(aA)
        }
        aF = aF.sort(function(aH, aG) {
            if (Number(aH.ticket_price) < Number(aG.ticket_price)) {
                return 1
            } else {
                if (Number(aH.ticket_price) == Number(aG.ticket_price)) {
                    return 0
                } else {
                    return - 1
                }
            }
        });
        return aF
    };
    getI18nResourceValueBykeyForJs = function(aA) {
        return submitorder_messages[aA]
    };
    getSuitNameByFlag = function(aC, aF) {
        var aB = 0;
        var aE = 0;
        var aA = 0;
        for (var aD = 0; aD < aC.length; aD++) {
            if (/^[\u3400-\u9FFF]+/.test(aC.charAt(aD))) {
                aB += 2;
                if (aD < 3) {
                    aA += 1
                }
            } else {
                aB += 1
            }
            if (aB <= 12) {
                aE += 1
            }
        }
        if (aF) {
            aB += 6;
            if (aB > 12) {
                return aC.substr(0, aA == 3 ? 3 : 4) + "...(学生)"
            } else {
                return aC + "(学生)"
            }
        } else {
            if (aB > 12) {
                return aC.substr(0, 5) + "..."
            } else {
                return aC
            }
        }
        return ""
    };
    function S(aB) {
        if (aB.length <= 1) {
            return false
        }
        if (isDw == "Y" && $("#chooseAllDW").is(":checked")) {
            var aA = aB[0].seat_type;
            if (aA == "A") {
                if (aB.length >= 2) {
                    k("提示", dwLimitAStr);
                    return true
                }
            }
            if (aA == "F") {
                if (aB.length >= 4) {
                    k("提示", dwLimitFStr);
                    return true
                }
            }
        }
        return false
    }
    function j() {
        if (isDw == "Y") {
            $("#chooseAllDW").change(function() {
                if ($(this).is(":checked")) {
                    var aA = true;
                    var aD = $("#ticketInfo_id").find("select[id^=seatType_]");
                    var aC = aD.eq(0).val();
                    if (aC != "A" && aC != "F") {
                        if (aD.length > 1) {
                            k("提示", dwLimitErrorStStr)
                        } else {
                            k("提示", dwLimitXBStr)
                        }
                        $(this).attr("checked", false);
                        return false
                    }
                    for (var aB = 1,
                    aE = aD.length; aB < aE; aB++) {
                        var aF = aD.eq(aB);
                        if (aF.val() != aC) {
                            k("提示", dwLimitErrorStStr);
                            $(this).attr("checked", false);
                            return false
                        }
                    }
                    if (aC == "A") {
                        if (aD.length > 2) {
                            k("提示", dwLimitAStr);
                            $(this).attr("checked", false);
                            return false
                        }
                    }
                    if (aC == "F") {
                        if (aD.length > 4) {
                            k("提示", dwLimitFStr);
                            $(this).attr("checked", false);
                            return false
                        }
                    }
                }
            })
        }
    }
    function an() {
        $("#jfzfNoticeId").hide()
    }
    function q() {
        $("#jfzfNoticeId").show()
    }
    function k(aB, aA) {
        alertWarningMsgByTit_header(aB, aA)
    }
    function af(aB, aD, aA) {
        if ("1" == aD) {
            var aC = aB.substring(0, 2);
            if (aC == "81" || aC == "82" || aC == "83") {
                return "港澳台居民居住证"
            }
        }
        return aA
    }
})();
function OrderQueueWaitTime(a, c, b) {
    this.tourFlag = a;
    this.waitMethod = c;
    this.finishMethod = b;
    this.dispTime = 1;
    this.nextRequestTime = 1;
    this.isFinished = false;
    this.waitObj
}
OrderQueueWaitTime.prototype.start = function(a) {
    if (!a) {
        a = 1000
    }
    var b = this;
    b.timerJob();
    window.setInterval(function() {
        b.timerJob()
    },
    parseInt(a))
};
OrderQueueWaitTime.prototype.timerJob = function() {
    if (this.isFinished) {
        return
    }
    if (this.dispTime <= 0) {
        this.isFinished = true;
        this.finishMethod(this.tourFlag, this.dispTime, this.waitObj);
        return
    }
    if (this.dispTime == this.nextRequestTime) {
        this.getWaitTime()
    }
    var a = this.dispTime;
    var c = "";
    var b = parseInt(a / 60);
    if (b >= 1) {
        c = b + "分";
        a = a % 60
    } else {
        c = "1分"
    }
    this.waitMethod(this.tourFlag, this.dispTime > 1 ? --this.dispTime: 1, c)
};
OrderQueueWaitTime.prototype.getWaitTime = function() {
    var a = this;
    $.ajax({
        url: ctx + "confirmPassenger/queryOrderWaitTime?random=" + new Date().getTime(),
        type: "GET",
        data: {
            tourFlag: a.tourFlag
        },
        dataType: "json",
        success: function(c) {
            var e = c.data;
            if (!e.queryOrderWaitTimeStatus) {
                window.location.href = ctx + "login/init?random=" + new Date().getTime()
            } else {
                if (e != null) {
                    a.waitObj = e;
                    if (e.waitTime != -100) {
                        a.dispTime = e.waitTime;
                        var d = parseInt(e.waitTime / 1.5);
                        d = d > 60 ? 60 : d;
                        var b = e.waitTime - d;
                        a.nextRequestTime = b <= 0 ? 1 : b
                    }
                }
            }
        },
        error: function(b, d, c) {
            return false
        }
    })
};
jQuery.validator.addMethod("checkLoginUserName",
function(f, d) {
    var a = false;
    var c = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/;
    var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
    var e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    if (b.test(f) || e.test(f) || c.test(f)) {
        a = true
    }
    return this.optional(d) || a
},
"wrong username.");
jQuery.validator.addMethod("requiredUserName",
function(b, a) {
    if ("用户名／邮箱／手机号" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("requiredSchoolName",
function(b, a) {
    if ("简码／汉字" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
},
"wrong schoolname.");
jQuery.validator.addMethod("randCodeRequired",
function(b, a) {
    $("#i-ok").css("display", "none");
    return b.length > 0
},
"验证码错误!");
jQuery.validator.addMethod("randCodeFormat",
function(c, b) {
    $("#i-ok").css("display", "none");
    var a = /^[a-zA-Z0-9]+$/;
    return this.optional(b) || a.test(c)
},
"验证码错误!");
jQuery.validator.addMethod("randCodeLength",
function(b, a) {
    $("#i-ok").css("display", "none");
    return b.length == 4
},
"验证码错误!.");
jQuery.validator.addMethod("integrationCheck",
function(b, a) {
    var c = /^\d{6}$/;
    return this.optional(a) || c.test(b)
},
"wrong integrationpassword");
jQuery.validator.addMethod("integrationPwdCheck",
function(b, a, c) {
    if ($("#" + c[0]).val() == $("#" + c[1]).val()) {
        return true
    }
    return false
},
"两次输入密码不一致!.");
jQuery.validator.addMethod("checkRandCode",
function(c, b, d) {
    var a = true;
    if (c && c.length == 4) {
        $.ajax({
            url: ctx + "passcodeNew/checkRandCodeAnsyn",
            type: "post",
            data: {
                randCode: c,
                rand: d
            },
            async: false,
            success: function(e) {
                if (e.data == "N") {
                    a = false;
                    $("#i-ok").css("display", "none")
                } else {
                    a = true;
                    $("#i-ok").css("display", "block")
                }
            }
        })
    } else {
        a = false;
        $("#i-ok").css("display", "none")
    }
    return a
},
"验证码错误!.");
jQuery.validator.addMethod("validateUsersName",
function(b, a) {
    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
},
"用户名只能由字母、数字或_组成");
jQuery.validator.addMethod("checkWriteSpace",
function(c, b) {
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 32) {
            return false
        }
    }
    return true
},
"contain writespace");
jQuery.validator.addMethod("validateRandCode",
function(b, a) {
    return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
},
"验证码错误!.");
jQuery.validator.addMethod("checkPassward",
function(c, b, e) {
    var d = true;
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
},
"Passward wrong");
function validateSecIdCard(g) {
    var f = 0;
    var a = g;
    var e = {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        83 : "台湾",
        91 : "国外"
    };
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function validateFirIdCard(g) {
    var f = 0;
    var a;
    var e = {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        83 : "台湾",
        91 : "国外"
    };
    if (g.length == 15) {
        a = idCardUpdate(g)
    } else {
        a = g
    }
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function idCardUpdate(g) {
    var b;
    var f = /^(\d){15}$/;
    if (f.test(g)) {
        var e = 0;
        var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var d = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
        for (var c = 0; c < g.length; c++) {
            e += parseInt(g.substr(c, 1)) * a[c]
        }
        g += d[e % 11];
        b = g
    } else {
        b = "#"
    }
    return b
}
jQuery.validator.addMethod("checkBorth",
function(e, c) {
    var b = e;
    if (b == "") {
        return true
    } else {
        var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (a == null) {
            return false
        }
        var f = new Date(a[1], a[3] - 1, a[4]);
        return (f.getFullYear() == a[1] && (f.getMonth() + 1) == a[3] && f.getDate() == a[4])
    }
},
"日期格式不合法");
jQuery.validator.addMethod("byteRangeLength",
function(d, b, e) {
    var c = d.length;
    for (var a = 0; a < d.length; a++) {
        if (d.charCodeAt(a) > 127) {
            c++
        }
    }
    return this.optional(b) || (c >= e[0] && c <= e[1])
},
"length wrong");
jQuery.validator.addMethod("checkNameCharBlank",
function(c, b, d) {
    var a = d.split("@");
    if ($("#" + a[1]).val() == "") {
        return true
    } else {
        if ($("#" + a[0]).val() == "1" || $("#" + a[0]).val() == "2") {
            return this.optional(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(c)
        } else {
            if ($("#" + a[0]).val() == "B") {
                if (/^[-]+$/.test(c)) {
                    return false
                }
                return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(c)
            } else {
                if ($("#" + a[0]).val() == "H") {
                    return true
                } else {
                    return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(c)
                }
            }
        }
    }
},
"wrong name.");
jQuery.validator.addMethod("checkNameCharBlankForWork",
function(c, b, d) {
    var a = d.split("@");
    if ($("#" + a[0]).val() == "H") {
        return this.optional(b) || /^[a-zA-Z ]+$/.test(c)
    } else {
        return true
    }
},
"wrong name.");
jQuery.validator.addMethod("checkIdValidStr",
function(c, b) {
    var a = /^[a-zA-Z0-9\_\-\(\)]+$/;
    return this.optional(b) || (a.test(c))
},
"wrong id");
jQuery.validator.addMethod("isSecIDCard",
function(b, a, c) {
    if (!checkIfSecIdCard($(c).val())) {
        return true
    }
    return validateSecIdCard(b)
},
"wrong");
function checkIfSecIdCard(a) {
    if (a == "1") {
        return true
    }
    return false
}
function checkIfFirIdCard(a) {
    if (a == "2") {
        return true
    }
    return false
}
function checkCardForHKorTW(a) {
    if (a == "C" || a == "G") {
        return true
    }
    return false
}
jQuery.validator.addMethod("isFirIDCard",
function(b, a, c) {
    if (!checkIfFirIdCard($(c).val())) {
        return true
    }
    return validateFirIdCard(b)
},
"wrong");
jQuery.validator.addMethod("checkHkongMacao",
function(c, b, d) {
    if ($(d).val() == "C") {
        var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("checkTaiw",
function(c, a, e) {
    if ($(e).val() == "G") {
        var d = /^[0-9]{8}$/;
        var b = /^[0-9]{10}$/;
        return this.optional(a) || (d.test(c)) || (b.test(c))
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("checkPassport",
function(d, b, e) {
    if ($(e).val() == "B") {
        var c = /^[a-zA-Z]{5,17}$/;
        var a = /^[a-zA-Z0-9]{5,17}$/;
        return this.optional(b) || (a.test(d)) || c.test(d)
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("checkWork",
function(c, b, d) {
    if ($(d).val() == "H") {
        var a = /^[a-zA-Z]{3}[0-9]{12}$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("checkGATJmjzz",
function(d, b, e) {
    var a = e.split("@");
    if ($("#" + a[0]).val() == "1") {
        var c = d.substring(0, 2);
        if ($("#" + a[1]).is(":checked")) {
            if (c != "81" && c != "82" && c != "83") {
                return false
            }
        } else {
            if (c == "81" || c == "82" || c == "83") {
                return false
            }
        }
    }
    return true
},
"wrong format.");
jQuery.validator.addMethod("isMobile",
function(d, b) {
    var c = d.length;
    var a = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/;
    return this.optional(b) || (c == 11 && a.test(d))
},
"wrong mobile phone ");
jQuery.validator.addMethod("isTelePhone",
function(b, a) {
    var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
    return this.optional(a) || (c.test(b))
},
"wrong telePhone ");
jQuery.validator.addMethod("illegalChar",
function(c, b, e) {
    var d = true;
    if (c.indexOf("$") >= 0) {
        return false
    }
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62 || c.charCodeAt(a) == 34 || c.charCodeAt(a) == 63) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
},
"Illegal char wrong");
jQuery.validator.addMethod("isZipCode",
function(c, b) {
    var a = /^[0-9]{6}$/;
    return this.optional(b) || (a.test(c))
},
"wrong zipcode");
jQuery.validator.addMethod("isEmail",
function(c, a) {
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.optional(a) || (b.test(trim(c)))
},
"wrong email");
function replaceChar(b) {
    var a = b.value.replace(/['"<> ?]/g, "");
    b.value = a
}
function checkNameChar1(a) {
    return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(a)
}
function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}
function ltrim(a) {
    return a.replace(/(^\s*)/g, "")
}
function rtrim(a) {
    return a.replace(/(\s*$)/g, "")
}
jQuery.validator.addMethod("validateName",
function(b, a) {
    return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
},
"wrong username.");
jQuery.validator.addMethod("studentRequired",
function(b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != ""
    }
    return true
},
"wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired",
function(b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != "简拼/全拼/汉字" && trim(b) != ""
    }
    return true
},
"wrong studentStationRequired.");
jQuery.validator.addMethod("studentValidateName",
function(b, a, c) {
    if ($(c).val() == "3") {
        return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("checkStudentName",
function(b, a, c) {
    if ($(c).val() == "3") {
        if ((!b || trim(b) == "" || trim(b) == "简码/汉字")) {
            return false
        }
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("isQuestionNull",
function(b, a, c) {
    if (jQuery.trim(b) != "") {
        if (jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) == "" || jQuery.trim($(c[0]).val()) == "") {
            return false
        }
    }
    return true
},
"you should input the question");
jQuery.validator.addMethod("isAnswerNull",
function(b, a, c) {
    if ((jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) != "") || (jQuery.trim($(c[0]).val()) != "")) {
        if (jQuery.trim(b) == "") {
            return false
        }
    }
    return true
},
"you should input the answer");
function checkSex(c, b, a) {
    if (!checkSexByCardId(c, b, a)) {
        if (!confirm("性别与身份证中的性别不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkSexByCardId(c, e, a) {
    function b(h, i) {
        var g = null;
        if (i.length == 15) {
            g = i.substring(14, 15)
        } else {
            if (i.length == 18) {
                g = i.substring(16, 17)
            } else {
                return true
            }
        }
        if (g == "x" || g == "X") {
            g = "10"
        }
        var f = parseInt(g);
        var j = f % 2;
        if (j === 0 && h === "F") {
            return true
        } else {
            if (j === 1 && h === "M") {
                return true
            } else {
                return false
            }
        }
    }
    var d = $(a).val();
    if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
        if (d !== "") {
            return b(c, d)
        } else {
            return true
        }
    } else {
        if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
            if (d !== "") {
                return b(c, d)
            } else {
                return true
            }
        } else {
            return true
        }
    }
}
function checkBirdDateByCardId(c, e, b) {
    var a = null;
    var d = $(b).val();
    if (checkIfSecIdCard($(e).val()) && d !== "" && validateSecIdCard(d)) {
        a = d.substring(6, 14)
    } else {
        if (checkIfFirIdCard($(e).val()) && d !== "" && validateFirIdCard(d)) {
            if (d.length == 15) {
                a = "19" + d.substring(6, 12)
            } else {
                if (d.length == 18) {
                    a = d.substring(6, 14)
                }
            }
        } else {
            return true
        }
    }
    if (c !== "") {
        c = c.replace(/-/g, "");
        if (c != a) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkBirdate(c, b, a) {
    if (!checkBirdDateByCardId(c, b, a)) {
        if (!confirm("出生日期与身份证中的出生日期不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
jQuery.validator.addMethod("checkPwdValidate",
function(b, a) {
    return this.optional(a) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
},
"contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard",
function(b, a, c) {
    if ($(c).val() != null) {
        return $(c).val() == b
    }
    return true
},
"contain writespace");
jQuery.validator.addMethod("IVR_passwd_format",
function(b, a) {
    var c = /^[0-9]{6}$/;
    return this.optional(a) || c.test(b)
},
"验证码错误!.");
jQuery.validator.addMethod("checkStation",
function(b, a) {
    if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字" || trim(b) == "简拼/全拼/汉字或↑↓")) {
        return false
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("checkAnsyUserName",
function(e, c, f) {
    var b = f[0];
    var d = $("#" + f[1]).val();
    var a = true;
    $.ajax({
        url: b + "?user_name=" + e,
        type: "get",
        async: false,
        success: function(g, h) {
            if (g.data == true) {
                a = false
            } else {
                a = true
            }
        },
        error: function(g, i, h) {
            a = false
        }
    });
    return a
},
"wrong cardNo");
function checkPwdRank(e, a, d) {
    var b = $(e);
    var c = b.val();
    if (c.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(c) || new RegExp("^[0-9]{6,}$").test(c) || new RegExp("^[_]{6,}$").test(c)) {
        $("#" + a).attr("title", "危险");
        $("#" + d).html("危险");
        $("#" + a).removeClass("rank-a");
        $("#" + a).removeClass("rank-b");
        $("#" + a).removeClass("rank-c");
        $("#" + a).addClass("rank-a")
    } else {
        if (c.length > 6 && new RegExp("[a-zA-Z]").test(c) && new RegExp("[0-9]").test(c) && new RegExp("[_]").test(c)) {
            $("#" + a).attr("title", "安全");
            $("#" + d).html("安全");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-c")
        } else {
            $("#" + a).attr("title", "一般");
            $("#" + d).html("一般");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-b")
        }
    }
}
Array.prototype.unique = function() {
    var b = {},
    a = this.length;
    for (var c = 0; c < a; c++) {
        if (typeof b[this[c]] == "undefined") {
            b[this[c]] = 1
        }
    }
    this.length = 0;
    a = 0;
    for (var c in b) {
        this[a++] = c
    }
    return this
};
function checkSearchPwdRank(h, c, g) {
    var e = $(h);
    var f = e.val();
    if (f.length < 6) {
        $("#" + c).attr("title", "危险");
        $("#" + g).html("危险");
        $("#" + c).removeClass("rank-a");
        $("#" + c).removeClass("rank-b");
        $("#" + c).removeClass("rank-c");
        $("#" + c).addClass("rank-a")
    } else {
        var a = [];
        for (var b = 0; b < 6; b++) {
            a.push(f.charAt(b))
        }
        a = a.unique();
        var d = a.length;
        if (d == 1) {
            $("#" + c).attr("title", "危险");
            $("#" + g).html("危险");
            $("#" + c).removeClass("rank-a");
            $("#" + c).removeClass("rank-b");
            $("#" + c).removeClass("rank-c");
            $("#" + c).addClass("rank-a")
        } else {
            if (d > 1 && d < 5) {
                $("#" + c).attr("title", "一般");
                $("#" + g).html("一般");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-b")
            } else {
                $("#" + c).attr("title", "安全");
                $("#" + g).html("安全");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-c")
            }
        }
    }
}
jQuery.validator.addMethod("checkDetailAddress",
function(b, a) {
    return this.optional(a) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(b)
},
"wrong name.");
jQuery.validator.addMethod("checkAddressName",
function(b, a) {
    if (/^[-]+$/.test(b)) {
        return false
    }
    return this.optional(a) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(b)
},
"wrong name.");
jQuery.validator.addMethod("checkAddressSelect",
function(b, a) {
    if ("" == b) {
        return false
    }
    if (b) {
        return true
    }
    return this.optional(a)
},
"wrong name.");
var defaultLoadGrayBackgroundModalbox = "";
var loadGrayBackground;
var unLoadGrayBackground; (function() {
    loadGrayBackground = function() {
        var a = dhtmlx.modalbox({
            targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
            callback: function() {}
        });
        defaultLoadGrayBackgroundModalbox = a
    };
    unLoadGrayBackground = function() {
        if (defaultLoadGrayBackgroundModalbox != "") {
            dhtmlx.modalbox.hide(defaultLoadGrayBackgroundModalbox);
            defaultLoadGrayBackgroundModalbox = ""
        }
    }
})();
var ticket_submit_order = {
    ticket_type: {
        adult: "1",
        child: "2",
        student: "3",
        disability: "4"
    },
    ticket_type_name: {
        "1": "成人票",
        "2": "孩票",
        "3": "学生票",
        "4": "伤残军人票"
    },
    tour_flag: {
        dc: "dc",
        wc: "wc",
        fc: "fc",
        gc: "gc",
        lc: "lc",
        lc1: "l1",
        lc2: "l2"
    },
    passenger_type: {
        adult: "1",
        child: "2",
        student: "3",
        disability: "4"
    },
    passenger_card_type: {
        two: "1",
        one: "2",
        tmp: "3",
        passport: "B",
        work: "H",
        hongkong_macau: "C",
        taiwan: "G"
    },
    request_flag: {
        isAsync: "1"
    },
    ticket_query_flag: {
        query_commom: "00",
        query_student: "0X00"
    },
    seatType: {
        yz_type: "1"
    },
    ref_res_rules: {
        "4": [{
            refund_rule: "20%",
            res_rule: "免费",
            title: "bt_15d"
        },
        {
            refund_rule: "30%",
            res_rule: "5%",
            title: "48h_15d"
        },
        {
            refund_rule: "50%",
            res_rule: "10%",
            title: "24h_48H"
        },
        {
            refund_rule: "不允许",
            res_rule: "20%",
            title: "lt_24h"
        }],
        "5": [{
            refund_rule: "10%",
            res_rule: "免费",
            title: "bt_15d"
        },
        {
            refund_rule: "15%",
            res_rule: "5%",
            title: "48h_15d"
        },
        {
            refund_rule: "25%",
            res_rule: "10%",
            title: "24h_48H"
        },
        {
            refund_rule: "40%",
            res_rule: "20%",
            title: "lt_24h"
        }],
        "6": [{
            refund_rule: "10%",
            res_rule: "免费",
            title: "bt_15d"
        },
        {
            refund_rule: "15%",
            res_rule: "5%",
            title: "48h_15d"
        },
        {
            refund_rule: "25%",
            res_rule: "10%",
            title: "24h_48H"
        },
        {
            refund_rule: "40%",
            res_rule: "20%",
            title: "lt_24h"
        }],
        "7": [{
            refund_rule: "5%",
            res_rule: "免费",
            title: "bt_15d"
        },
        {
            refund_rule: "10%",
            res_rule: "5%",
            title: "48h_15d"
        },
        {
            refund_rule: "15%",
            res_rule: "10%",
            title: "24h_48H"
        },
        {
            refund_rule: "30%",
            res_rule: "20%",
            title: "lt_24h"
        }],
        "8": [{
            refund_rule: "5%",
            res_rule: "免费",
            title: "bt_15d"
        },
        {
            refund_rule: "10%",
            res_rule: "5%",
            title: "48h_15d"
        },
        {
            refund_rule: "15%",
            res_rule: "10%",
            title: "24h_48H"
        },
        {
            refund_rule: "30%",
            res_rule: "20%",
            title: "lt_24h"
        }],
        "9": [{
            refund_rule: "免费",
            res_rule: "免费",
            title: "bt_15d"
        },
        {
            refund_rule: "5%",
            res_rule: "5%",
            title: "48h_15d"
        },
        {
            refund_rule: "10%",
            res_rule: "10%",
            title: "24h_48H"
        },
        {
            refund_rule: "20%",
            res_rule: "20%",
            title: "lt_24h"
        }]
    },
    special_areas: {
        lso: "LSO",
        dao: "DAO",
        ado: "ADO",
        nqo: "NQO",
        tho: "THO"
    }
};
var submitorder_messages = {
    "message.confirm": "您确认吗？",
    "message.info": "信息提示",
    "button.ok": "确认",
    "message.error": "错误提示"
};
var login_messages = {
    randCodeError: "验证码错误!",
    randCodeExpired: "验证码失效",
    randCodeLentgh: "验证码长度为4位!",
    randCodeFormat: "验证码只能由数字或字母组成!",
    randCodeEmpty: "验证码不能为空!",
    userNameEmpty: "登录名必须填写!",
    userNameFormat: "登录名格式不正确，请重新输入!",
    passwordEmpty: "密码必须填写,且不少于6位!",
    passwordLength: "密码长度不能少于6位!",
    pleaseClickCaptcha: "请点击验证码",
    pleaseClickLeftCaptcha: "请点击左侧验证码",
    pleaseClickCaptchaRight: "请点击正确的验证码",
    pleaseClickBottomCaptcha: "请点击下方验证码",
    loginError: "当前访问用户过多,请稍候重试!",
    submitAfterVerify: "提交",
    pleaseClickSubmitButtonAfterClick: "pleaseClickSubmitButtonAfterClick",
    leftTicketOrderNoteMessage: '点击"提交"按钮获取验证码',
    leftTicketOrderClickCallbackNoteMessage: '完成选择后，继续点击下方橙色"提交"按钮提交订单',
    leftTicketOrderShowCallbackNoteMessage: "按照提示点击选择所有的图片",
    leftTicketOrderHiddenCallbackNoteMessage: '点击"提交"按钮获取验证码',
    getCaptchaByClick: "点击获取验证码"
};