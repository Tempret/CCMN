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
        else                                            /* V */
            $('#custom-date').addClass('hide');         /*---*/

        if (value != 'custom') {
            ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
            ccmn.getDwellAndRepeatData(ccmn.setDvellChart);
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
        ccmn.getDwellAndRepeatData(ccmn.setDvellChart);
    });
    /* Hide/show custom date END*/


    /* DATA RELOAD LOOP */
    var timerWrap = setInterval(function() {
        ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);         // Init table in Total visitors dashboard
        ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);       // Init chart in Total visitors dashboard

        ccmn.getDwellAndRepeatData(ccmn.setDvellChart);
        ccmn.getManufacturers(ccmn.setManufacturers);

        var timerId = setInterval(function() {
//            ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);
//            ccmn.getHourlyTotalVisitors(ccmn.setChartHourlyVisitors);

        }, 15000);
        clearInterval(timerWrap);
    }, 500);
    /* data reload loop END */


});