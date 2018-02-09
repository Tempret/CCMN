ccmn.makeApiRequest('cisco-presence.unit.ua/api/config/v1/sites', ccmn.apis[1], 'GET', ccmn.setSiteId, NaN);

$(document).ready(function() {
    inAnimation = 'fadeInRightBig';

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


    /* Hide/show custom date */
    $('#custom-date').change(function () {
        ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
        $('.total-chart-container').removeClass('hide');
        ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);
    });
    /* Hide/show custom date END*/


    $('.panel-floor').click(function () {
        ccmn.makeApiRequest('cisco-presence.unit.ua/api/presence/v1/clients', ccmn.apis[1], 'GET', ccmn.setActiveUsersList, NaN);

    });

    $('#search-mac-field').change(function() {
        var value = $(this).val();
        var checker = $('.validation-checker')

        if (!$(this).val()) {
            $('#mac-addr-selection').fadeIn(200);
        } else {
            $('#mac-addr-selection').fadeOut(200);
        }

        if (value) {
            checker.fadeOut(200);
        }

        var mac_template = '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$';

        valid = value.match(mac_template);

        if (valid != null) {
            checker.fadeIn(200);
            checker.removeClass('error');
            checker.addClass('accept');
            $(this).css('color', '#26a69a');
        } else {
            checker.fadeIn(200);
            $(this).css('color', '#EF9A9A');
            checker.removeClass('accept');
            checker.addClass('error');
        }
        console.log(valid);
    });

    $('#search-mac-field').focus(function() {
        $('.validation-checker').fadeOut(200);
        $(this).css('color', 'black');
    });

    /* DATA RELOAD LOOP */
    var timerWrap = setInterval(function() {
        ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);         // Init table in Total visitors dashboard
        ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);       // Init chart in Total visitors dashboard

        var timerId = setInterval(function() {
//            ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
//            ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);

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