var ccmn = {

    apis : ['locate', 'presence'],

    setSiteId : function (data) {
        ccmn.siteId = data[0].aesUId;
        console.log("Site id:", data[0].aesUId);
    },

    makeApiRequest : function (url, api, type, callback, args) {
        var username = $('#login').val();
        var password = $('#' + api).val();

        $.ajax({
            url: 'https://' + url,
            type: type,
            jsonp: 'jsonp_callback',
            data: args,
            dataType: "json",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: function (data) {
                callback(data);
            }
        });
    },

    getTableTotalVisitors: function (callback) {

        var data_send = {
            'csrfmiddlewaretoken': $('#csrf_getting_form [name="csrfmiddlewaretoken"]').val(),
            'login': $('#login').val(),
            'pass': $('#presence').val(),
            'when': $('#date-selection').val(),
            'site_id': ccmn.siteId
        };

        if ($('#date-selection').val() == 'custom') {
            data_send.date = $('#custom-date').val();
        }

//        console.log(data_send);

        $.ajax({
            url: 'get_table_total_visitors/',
            type: 'POST',
            data: data_send,
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
    },

    setTableTotalVisitors: function (data) {

//        console.log(data);

        $('#connected').text(data.connected);
        $('#passerby').text(data.passerby);
        $('#visitors').text(data.visitor);
    },

    getHourlyTotalVisitors: function (callback) {
         var data_send = {
            'csrfmiddlewaretoken': $('#csrf_getting_form [name="csrfmiddlewaretoken"]').val(),
            'login': $('#login').val(),
            'pass': $('#presence').val(),
            'when': $('#date-selection').val(),
            'site_id': ccmn.siteId
        };

        if ($('#date-selection').val() == 'custom') {
            data_send.date = $('#custom-date').val();
        }

//        console.log(data_send);

        $.ajax({
            url: 'get_hourly_total_visitors/',
            type: 'POST',
            data: data_send,
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
    },

    setChartHourlyVisitors: function (data) {
//        console.log(data);

        if (!data.connected || !data.passerby || !data.visitor) {
            ccmn.totalChart.data.datasets[0].data = [0];
            ccmn.totalChart.data.datasets[1].data = [0];
            ccmn.totalChart.data.datasets[2].data = [0];
        } else {
            data.connected = JSON.parse(data.connected);
            data.passerby = JSON.parse(data.passerby);
            data.visitor = JSON.parse(data.visitor);

            var connected = Object.values(data.connected);
            var passerby = Object.values(data.passerby);
            var visitor = Object.values(data.visitor);

            ccmn.totalChart.data.datasets[0].data = connected;
            ccmn.totalChart.data.datasets[1].data = passerby;
            ccmn.totalChart.data.datasets[2].data = visitor;
        }
        ccmn.totalChart.update();
    },

    getTimeArray : function() {
        var arr = [];
        var item;

        for(var i = 0; i < 24; i++) {
            if (i < 10)
                item = '0' + i + '.00';
            else
                item = i + '.00';
            arr.push(item);
        };
        return arr;
    },

    getRandomValues: function(min, max, howMany) {
        arr = [];
        var value;

        for (var i = 0; i < howMany; i++) {
            value = Math.random() * (max - min) + min;
            arr.push(Math.floor(value));
        };
        return arr;
    },

    getColorArray: function(color, length) {
        arr = [];

        for (var i = 0; i < length; i++)
            arr.push(color);

        return arr;
    },

};

ccmn.makeApiRequest('cisco-presence.unit.ua/api/config/v1/sites', ccmn.apis[1], 'GET', ccmn.setSiteId, NaN);

$(document).ready(function() {
    inAnimation = 'fadeInRightBig';

    console.log(ccmn.siteId);

    /* DASHBOARDS ANIMATION */
    $('.panel-item').on("click", function (event) {
        var cur = event.target;
        var targets = $('.panel-item');
        var cur_index = 0;

        if (!$(cur).hasClass('panel-item'))
            cur = cur.parentElement;

        for (; cur_index < targets.length; cur_index++)
            if (cur === targets[cur_index])
                break;

        $.each($('.dashboard-item'), function (index) {
            $(this).addClass('hide');
            $(this).removeClass('animated visible ' + inAnimation);
        });
        $($('.dashboard-item')[cur_index]).removeClass('hide');
        $($('.dashboard-item')[cur_index]).addClass('animated visible ' + inAnimation);
    });
    /* dashboards animation END*/

    /* DATE SELECT CHANGE EVENT */
    $('#date-selection').change(function () {
        var value = $(this).val();

        if (value == 'custom')                          /*  Hide custom datepicker if custom select is active */
            $('#custom-date').removeClass('hide');      /* | */
        else                                            /* | */
            $('#custom-date').addClass('hide');         /*---*/

        if (value != 'custom') {
            ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
            if (value == '3days' || value == 'lastweek' || value == 'lastmonth') {
                $('.total-chart-container').addClass('hide');
//                console.log(value);
            } else {
                $('.total-chart-container').removeClass('hide');
                ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);
            }
        };
    });
    /* date select change event END */

    $('#custom-date').change(function () {
        ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
        $('.total-chart-container').removeClass('hide');
        ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);
    });


    /* DATA RELOAD LOOP */
    var timerWrap = setInterval(function() {
        ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
        ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);


        var timerId = setInterval(function() {
            ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
            ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);

        }, 15000);
        clearInterval(timerWrap);
    }, 500);

    /* data reload loop END */

    /* charts END*/
    var ctx = document.getElementById("totalChart").getContext('2d');
    ccmn.totalChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ccmn.getTimeArray(),
            datasets: [
                {
                    label: 'Hourly count of connected visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(255, 99, 132, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(255,99,132,1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'Hourly count of passerby visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(54, 162, 235, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(54, 162, 235, 1)', 24),
                    borderWidth: 1
                },
                {
                    label: 'Hourly count visitors',
                    data: ccmn.getRandomValues(0, 0, 24),
                    backgroundColor: ccmn.getColorArray('rgba(255, 206, 86, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(255, 206, 86, 1)', 24),
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
});