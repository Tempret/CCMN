var ccmn = {

    apis : ['locate', 'presence'],

    table_data_total : {
        'connected': null,
        'passerby': null,
        'visitors': null,
        'peak': null
    },

    siteId : NaN,

    setSiteId : function (data) {
        ccmn.siteId = data[0].aesUId;
        console.log("Site id:", data[0].aesUId);
    },

    setTotalVisitors : function (data) {
        // console.log(data);
        $('.total-visitors').next().text(data);
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

        console.log(data_send);

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
        console.log(data);

        $('#connected').text(data.connected);
        $('#passerby').text(data.passerby);
        $('#visitors').text(data.visitor);
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

    chart: NaN,
};

ccmn.makeApiRequest('cisco-presence.unit.ua/api/config/v1/sites', ccmn.apis[1], 'GET', ccmn.setSiteId, NaN);

$(document).ready(function() {
    inAnimation = 'fadeInRightBig';

    ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);


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

        if (value == 'custom')                          /*  Hide custom datepicher if custom select is active */
            $('#custom-date').removeClass('hide');      /* | */
        else                                            /* | */
            $('#custom-date').addClass('hide');         /*---*/
    });
    /* date select change event END */


    /* DATA RELOAD LOOP */
     var timerId = setInterval(function() {
        ccmn.getTableTotalVisitors(ccmn.setTableTotalVisitors);


     }, 8000);
    /* data reload loop END */

    /* charts END*/
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ccmn.getTimeArray(),
            datasets: [
                {
                    label: 'Hourly count of connected visitors',
                    data: ccmn.getRandomValues(1, 100, 24),
                    backgroundColor: ccmn.getColorArray('rgba(255, 99, 132, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(255,99,132,1)', 24),
                    borderWidth: 1
                },
                {
                    label: '# of Votes',
                    data: ccmn.getRandomValues(1, 100, 24),
                    backgroundColor: ccmn.getColorArray('rgba(54, 162, 235, 0.2)', 24),
                    borderColor: ccmn.getColorArray('rgba(54, 162, 235, 1)', 24),
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
    ccmn.chart = myChart;
});


// backgroundColor: [
//     'rgba(255, 99, 132, 0.2)',
//     'rgba(54, 162, 235, 0.2)',
//     'rgba(255, 206, 86, 0.2)',
//     'rgba(75, 192, 192, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(255, 159, 64, 0.2)'
// ],
//     borderColor: [
//     'rgba(255,99,132,1)',
//     'rgba(54, 162, 235, 1)',
//     'rgba(255, 206, 86, 1)',
//     'rgba(75, 192, 192, 1)',
//     'rgba(153, 102, 255, 1)',
//     'rgba(255, 159, 64, 1)'
// ],


