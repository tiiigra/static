// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});

$(function() {
    new WOW().init();
    $('.templatemo-nav').singlePageNav({
    	offset: 70
    });

    $('.templatemo-box').singlePageNav({
        offset: 70
    });

    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    /*Send data
    -----------------------------------------------*/
    $('#user-msg').submit(function(e) {
        e.preventDefault();

        var endPoint = 'https://classroomrobot.herokuapp.com',
            userMsg = {
                name: $('#user-name').val(),
                email: $('#user-email').val(),
                message: $('#user-message').val()
            };

        $.post(endPoint, userMsg);
        clearInput();

        function clearInput() {
            $('#user-name').val('');
            $('#user-email').val('');
            $('#user-message').val('');
        }
    });

});