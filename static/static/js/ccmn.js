var ccmn = {

    apis : ['locate_pass', 'presence_pass'],

    setSiteId : function (data) {
        console.log('Data: ', data);
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
        console.log('Dwell');
        console.log(data);
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