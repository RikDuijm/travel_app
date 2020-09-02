$(document).ready(function () {

    showCustomerCitys();
    
/* -------------------------------------------------------------------------------------------Reset Page */

    $(".reset").click(function () {
        //Maintain last searched item / map instead of resetting any JS variable values held in memory with window.location.reload();

        $("#lima-intro").hide();
        $("#arequipa-intro").hide();
        $("#puno-intro").hide();
        $("#cusco-intro").hide();
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera */
    });

    $(".whereAmI").click(function (){
        $(".hideLocation").show();
        $(".whereAmI").hide();
    });

    $(".hideLocation").click(function (){
        $(".whereAmI").show();
        $(".hideLocation").hide();
    });

/* -------------------------------------------------------------------------------------------Navigate Lima */

    $("#lima-nav").click(function () {
        $("#lima-intro").show();
        $("#arequipa-intro").hide();
        $("#puno-intro").hide();
        $("#cusco-intro").hide();

    });

    $("#lima-attracties-header").click(function () {
        $(".lima-attracties").toggle();
        $(".lima-hotels").hide();
        $(".lima-restaurants").hide();
        $(".lima-info").hide();
    });

    $("#lima-hotels-header").click(function () {
        $(".lima-attracties").hide();
        $(".lima-hotels").toggle();
        $(".lima-restaurants").hide();
        $(".lima-info").hide();
    });
    $("#lima-restaurants-header").click(function () {
        $(".lima-attracties").hide();
        $(".lima-hotels").hide();
        $(".lima-restaurants").toggle();
        $(".lima-info").hide();
    });
    $("#lima-info-header").click(function () {
        $(".lima-attracties").hide();
        $(".lima-hotels").hide();
        $(".lima-restaurants").hide();
        $(".lima-info").toggle();
    });

/* -------------------------------------------------------------------------------------------Navigate Puno*/
    $("#puno-nav").click(function () {
        $("#puno-intro").show();
        $("#cusco-intro").hide();
        $("#lima-intro").hide();
        $("#arequipa-intro").hide();
    });

    $("#puno-attracties-header").click(function () {
        $(".puno-attracties").toggle();
        $(".puno-hotels").hide();
        $(".puno-restaurants").hide();
        $(".puno-info").hide();
    });

    $("#puno-hotels-header").click(function () {
        $(".puno-attracties").hide();
        $(".puno-hotels").toggle();
        $(".puno-restaurants").hide();
        $(".puno-info").hide();
    });
    $("#puno-restaurants-header").click(function () {
        $(".puno-attracties").hide();
        $(".puno-hotels").hide();
        $(".puno-restaurants").toggle();
        $(".puno-info").hide();
    });
    $("#puno-info-header").click(function () {
        $(".puno-attracties").hide();
        $(".puno-hotels").hide();
        $(".puno-restaurants").hide();
        $(".puno-info").toggle();
    });

/* -------------------------------------------------------------------------------------------Navigate Arequipa*/

    $("#arequipa-nav").click(function () {
        $("#arequipa-intro").show();
        $("#lima-intro").hide();
        $("#puno-intro").hide();
        $("#cusco-intro").hide();
    });

    $("#arequipa-attracties-header").click(function () {
        $(".arequipa-attracties").toggle();
        $(".arequipa-hotels").hide();
        $(".arequipa-restaurants").hide();
        $(".arequipa-info").hide();
    });

    $("#arequipa-hotels-header").click(function () {
        $(".arequipa-attracties").hide();
        $(".arequipa-hotels").toggle();
        $(".arequipa-restaurants").hide();
        $(".arequipa-info").hide();
    });
    $("#arequipa-restaurants-header").click(function () {
        $(".arequipa-attracties").hide();
        $(".arequipa-hotels").hide();
        $(".arequipa-restaurants").toggle();
        $(".arequipa-info").hide();
    });
    $("#arequipa-info-header").click(function () {
        $(".arequipa-attracties").hide();
        $(".arequipa-hotels").hide();
        $(".arequipa-restaurants").hide();
        $(".arequipa-info").toggle();
    });

/* -------------------------------------------------------------------------------------------Navigate Cusco*/

    $("#cusco-nav").click(function () {
        $("#cusco-intro").show();
        $("#lima-intro").hide();
        $("#puno-intro").hide();
        $("#arequipa-intro").hide();
    });

    $("#cusco-attracties-header").click(function () {
        $(".cusco-attracties").toggle();
        $(".cusco-hotels").hide();
        $(".cusco-restaurants").hide();
        $(".cusco-info").hide();
    });

    $("#cusco-hotels-header").click(function () {
        $(".cusco-attracties").hide();
        $(".cusco-hotels").toggle();
        $(".cusco-restaurants").hide();
        $(".cusco-info").hide();
    });
    $("#cusco-restaurants-header").click(function () {
        $(".cusco-attracties").hide();
        $(".cusco-hotels").hide();
        $(".cusco-restaurants").toggle();
        $(".cusco-info").hide();
    });
    $("#cusco-info-header").click(function () {
        $(".cusco-attracties").hide();
        $(".cusco-hotels").hide();
        $(".cusco-restaurants").hide();
        $(".cusco-info").toggle();
    });


/* ------------------------------------------------------------------------------------------- Scroll down from cities*/

    /* code used from https://www.daddydesign.com/wordpress/how-to-smoothly-scroll-to-a-specific-element-using-jquery/ */
    $('.scroll-to').click(function (e) {
        var jump = $(this).attr('href');
        var new_position = $(jump).offset();
        $('html, body').stop().animate({scrollTop: new_position.top}, 500);
        e.preventDefault();
    });


/* Pogingen om zichtbaarheid op traveler-pagina's te beinvloeden. Andere aanpassingen hiervoor zitten alleen in de views: def traveler en def index: {"username": username} */


function showCustomerCitys() {
        var str = $('#destinationsCustomer').text(); 
        console.log(str)
        if (str.includes('Lima')) {
            $('#lima-div').removeClass("hidden");
            $('#lima-intro').removeClass("hidden");
        } if (str.includes('Cusco')) {
            $('#cusco-div').removeClass("hidden");
            $('#cusco-intro').removeClass("hidden");
        } if (str.includes('Arequipa')) {
            $('#arequipa-div').removeClass("hidden");
            $('#arequipa-intro').removeClass("hidden");
        } if (str.includes('Puno')) {
            $('#puno-div').removeClass("hidden");
            $('#puno-intro').removeClass("hidden");
        }
    };
});