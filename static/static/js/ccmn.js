var ccmn = {

    apis : ['locate_pass', 'presence_pass'],

    setSiteId : function (data) {
//        console.log('Data: ', data);
        ccmn.siteId = data[0].aesUId;
//        console.log("Site id:", data[0].aesUId);
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
            'pass': $('#presence_pass').val(),
            'when': $('#date-selection').val(),
            'site_id': ccmn.siteId
        };

        if ($('#date-selection').val() == 'custom') {
            data_send.date = $('#custom-date').val();
        }

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
        $('#connected').text(data.connected);
        $('#passerby').text(data.passerby);
        $('#visitors').text(data.visitor);
    },

    getHourlyTotalVisitors: function (callback) {
         var data_send = {
            'csrfmiddlewaretoken': $('#csrf_getting_form [name="csrfmiddlewaretoken"]').val(),
            'login': $('#login').val(),
            'pass': $('#presence_pass').val(),
            'when': $('#date-selection').val(),
            'site_id': ccmn.siteId
        };

        if ($('#date-selection').val() == 'custom') {
            data_send.date = $('#custom-date').val();
        }

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

    getActiveUsersList: function(callback) {
        var data_send = {
            'csrfmiddlewaretoken': $('#csrf_getting_form [name="csrfmiddlewaretoken"]').val(),
            'login': $('#login').val(),
            'pass': $('#locate_pass').val(),
        };

        $.ajax({
            url: 'get_active_users_list/',
            type: 'POST',
            data: data_send,
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
    },

    setActiveUsersList(data) {
        data = JSON.parse(data);

        $('#mac-addr-selection option').remove();
        target = $('#mac-addr-selection');
        mac_list = [];
        for (var i = 0; i < data.length; i++) {
            $(target).append('<option value="' + data[i] + '">' + data[i] + '</option>');
            mac_list.push(data[i]);
        }
    },

    getImageAndCoords: function(mac, callback) {
        var data_send = {
            'csrfmiddlewaretoken': $('#csrf_getting_form [name="csrfmiddlewaretoken"]').val(),
            'login': $('#login').val(),
            'pass': $('#locate_pass').val(),
            'mac': mac
        };

        $.ajax({
            url: 'get_map_and_coords/',
            type: 'POST',
            data: data_send,
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
    },

    setMapAndCoords(data) {
        if (data.err == 'Unknown mac address') {
            $('#map').css('background-image', 'url(static/media/no_data.png)');
            $('#map-point').hide();
            $('#mac-user-list').hide();

        } else {

            $('#floor-number').text(data.floorNumber);

            $('#map').css('background-image', 'url(' + data.mapSrc + ')');

            var left = data.mapCoordinate.x * $('#map').outerWidth() / data.mapInfo.floorDimension.width;
            var top = data.mapCoordinate.y * $('#map').outerHeight() / data.mapInfo.floorDimension.length;

            $('#map-point').css({
                top: top + 'px',
                left: left + 'px',
            })

            manufacturer = data.manufacturer ? data.manufacturer : '-';

            $('#manufacturer span').text(manufacturer);
            $('#rssi span').text(data.statistics.maxDetectedRssi.rssi);

            $('#time-first span').text(new Date(data.statistics.firstLocatedTime).toLocaleTimeString());
            $('#time-last span').text(new Date(data.statistics.lastLocatedTime).toLocaleTimeString());

            $('#map-point').show();
            $('#mac-user-list').show();
        }
    },

    getDwellAndRepeatData: function(callback) {
        var data_send = {
            'csrfmiddlewaretoken': $('#csrf_getting_form [name="csrfmiddlewaretoken"]').val(),
            'login': $('#login').val(),
            'pass': $('#presence_pass').val(),
            'timerange': $('#date-selection').val(),
            'site_id': ccmn.siteId
        };

        if ($('#date-selection').val() == 'custom') {
            data_send.date = $('#custom-date').val();
        }

        $.ajax({
            url: 'get_dwell_and_repeat_data/',
            type: 'POST',
            data: data_send,
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
    },

    setDvellChart: function(data) {
        var data_keys = Object.keys(data);
        var mode = $('#date-selection').val();
        var options_dwell = {
            'FIVE_TO_THIRTY_MINUTES': {
                label: '5-30 mins',
                color: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)'
            },
            'THIRTY_TO_SIXTY_MINUTES': {
                label: '30-60 mins',
                color: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)'
            },
            'ONE_TO_FIVE_HOURS': {
                label: '1-5 hours',
                color: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)'
            },
            'FIVE_TO_EIGHT_HOURS': {
                label: '5-7 hours',
                color: 'rgba(38, 198, 218, 0.2)',
                borderColor: 'rgba(38, 198, 218, 1)'
            },
            'EIGHT_PLUS_HOURS': {
                label: '8+ hours',
                color: 'rgba(141, 110, 99, 0.2)',
                borderColor: 'rgba(141, 110, 99, 1)'
            }
        }

        var options_repeat = {
            'DAILY': {
                label: 'Daily',
                color: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)'
            },
            'WEEKLY': {
                label: 'Weekly',
                color: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)'
            },
            'OCCASIONAL': {
                label: 'Occasional',
                color: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)'
            },
            'FIRST_TIME': {
                label: 'First time',
                color: 'rgba(38, 198, 218, 0.2)',
                borderColor: 'rgba(38, 198, 218, 1)'
            },
            'YESTERDAY': {
                label: 'Yesterday',
                color: 'rgba(141, 110, 99, 0.2)',
                borderColor: 'rgba(141, 110, 99, 1)'
            }
        }

        if (data_keys.indexOf('err') != -1)
            console.log('Error: ' + data['err']);
        else {
            switch (mode) {
                case 'today':
                case 'yesterday':
                case 'custom':

                    // Dwell data part

                    chart_data_dwell = {
                        labels: ccmn.getTimeArray(Object.keys(data.dwell).length),
                        datasets: make_datasets(options_dwell, data.dwell),
                    }
                    // Repeat data part

                    chart_data_repeat = {
                        labels: ccmn.getTimeArray(Object.keys(data.repeat).length),
                        datasets: make_datasets(options_repeat, data.repeat),
                    }
                    break;

                case '3days':

                    dwell = [];
                    repeat = [];

                    for (day in data.dwell)
                        for (index in data.dwell[day])
                            dwell.push(data.dwell[day][index])

                    for (day in data.repeat)
                        for (index in data.repeat[day])
                            repeat.push(data.repeat[day][index])

                    // Dwell data part

                    chart_data_dwell = {
                        labels: ccmn.getTimeArray(data.dwell),
                        datasets: make_datasets(options_dwell, dwell),
                    }

                    // Repeat data part

                    chart_data_repeat = {
                        labels: ccmn.getTimeArray(data.repeat),
                        datasets: make_datasets(options_repeat, repeat),
                    }
                    break;

                case 'lastweek':
                case 'lastmonth':

                    // Dwell data part

                    chart_data_dwell = {
                        labels: Object.keys(data.dwell),
                        datasets: make_datasets(options_dwell, data.dwell),
                    }

                    // Repeat data part

                    chart_data_repeat = {
                        labels: Object.keys(data.repeat),
                        datasets: make_datasets(options_repeat, data.repeat),
                    }
                    break;
            }

            ccmn.dwellChart.data.datasets = chart_data_dwell.datasets
            ccmn.dwellChart.data.labels = chart_data_dwell.labels
            ccmn.repeatChart.data.datasets = chart_data_repeat.datasets
            ccmn.repeatChart.data.labels = chart_data_repeat.labels
            ccmn.dwellChart.update();
            ccmn.repeatChart.update();

        }
    },

    getManufacturers: function(callback) {
        var data_send = {
            'csrfmiddlewaretoken': $('#csrf_getting_form [name="csrfmiddlewaretoken"]').val(),
            'login': $('#login').val(),
            'pass': $('#locate_pass').val(),
            'site_id': ccmn.siteId
        };

        $.ajax({
            url: 'get_manufacturers/',
            type: 'POST',
            data: data_send,
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
    },

    setManufacturers: function(data) {
        console.log(data);

        chart_data = {
            labels: ['one', 'two'],
            datasets: [[342,34234,344],[23,43,43]],
        }

        ccmn.manufactChart.data.datasets = chart_data.datasets;
        ccmn.manufactChart.data.labels = chart_data.labels;
        ccmn.manufactChart.update();
        console.log(ccmn.manufactChart);
    },

    getTimeArray : function(range) {
        var arr = [];
        var item;

        if (typeof(range) == typeof(42)) {
            for(var i = 0; i < range; i++) {
                if (i < 10)
                    item = '0' + i + '.00';
                else
                    item = i + '.00';
                arr.push(item);
            };
        } else if (typeof(range) == typeof({})) {
            keys = Object.keys(range);

            for (key in keys) {
                console.log();
                for(var i = 0; i < Object.keys(range[keys[key]]).length; i++) {
                    if (i < 10)
                        item = keys[key] + ' 0' + i + '.00';
                    else
                        item = keys[key] + ' ' + i + '.00';
                    arr.push(item);
                };
            }
        }
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

function make_datasets(options, data, dataset_options) {
    datasets = [];

    for (label in options) {

        dataset = {
            data: [],
            label: options[label]['label'],
            backgroundColor: options[label]['color'],
            borderColor: options[label]['borderColor'],
            borderWidth: 1,
        };

        for (index in data)
            dataset.data.push(data[index][label]);
        datasets.push(dataset);
    }
    return datasets;
};