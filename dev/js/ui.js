$(function() {

    var is_mobile = false, //모바일 판별 변수
        scrollbar_width = window.outerWidth - $(window).width(); // 스크롤바 너비

    /******************** 하위브라우저 경고 ********************/

    $('.ie9').find('button').on('click', function() {
        $('.ie9').fadeOut();
    });

    /******************** 스크롤 애니메이션 정의 ********************/

    var move_el = $('[data-animation]'),
        move_name,
        move_delay,
        move_duration,
        scroll,
        start_point = $(window).height() * 1,
        top_btn = $('.move_top'),
        top_btn_flag = 0;

    move_el.addClass('wait-animation');
    $(window).on('load scroll', function() {
        scroll = $(this).scrollTop();

        //순차 애니메이션 제어
        move_el.each(function() {
            move_name = $(this).data('animation');
            move_delay = $(this).data('delay') * 100;
            move_duration = $(this).data('duration') * 1000;
            $(this).addClass('animated ' + move_name);
            if (move_delay >= 0) {
                $(this).css({
                    '-webkit-animation-delay': move_delay + 'ms',
                    'animation-delay': move_delay + 'ms'
                });
            }
            if (move_duration >= 0) {
                $(this).css({
                    '-webkit-animation-duration': move_duration + 'ms',
                    'animation-duration': move_duration + 'ms'
                });
            }
            if (scroll > $(this).offset().top - start_point) $(this).removeClass('wait-animation');
        })

        //TOP 버튼 제어
        (scroll === 0) ? top_btn.removeClass('on'): top_btn.addClass('on');

        top_btn.find('button').on('click', function() {
            if (top_btn_flag) return false;
            top_btn_flag = 1;
            $('html, body').animate({
                scrollTop: 0
            }, function() {
                top_btn_flag = 0;
                top_btn.removeClass('on');
            });
            return false;
        });

    });

});