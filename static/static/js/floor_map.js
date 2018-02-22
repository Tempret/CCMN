$(document).ready(function (){
    $('#mac-user-list').hide();

    $('.panel-floor').click(function () {
        ccmn.getActiveUsersList(ccmn.setActiveUsersList);

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
            checker.removeClass('accept');
            checker.addClass('error');
            $(this).css('color', '#EF9A9A');
        }
    });

    $('#search-mac-field').focus(function() {
        $('.validation-checker').fadeOut(200);
        $(this).css('color', 'black');
    });

    $('#search-mac-field').focusout(function() {

        if (!$('#search-mac-field').val())
            $('.validation-checker').hide();
    });

    $('#mac-search-button').click(function() {
        var mac_template = '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$';
        var value = $('#search-mac-field').val();

        valid = value.match(mac_template);

        if (valid != null || !value.length) {
            if (!value.length) {
                mac = $('#mac-addr-selection').val();
                $('.validation-checker').fadeOut(200);
            } else {
                mac = value;
            }

            ccmn.getImageAndCoords(mac, ccmn.setMapAndCoords);

        } else {
            console.log('Error');
            console.log(value);
        }
    });

});