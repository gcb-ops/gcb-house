function loadScript(src, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    document.head.appendChild(scriptElement);
    scriptElement.onload = callback;
}

// List of library URLs
var libraryUrls = [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js',
];

// Function to load libraries sequentially
function loadLibraries(index) {
    if (index < libraryUrls.length) {
        loadScript(libraryUrls[index], function() {
            // Continue loading the next library
            loadLibraries(index + 1);
        });
    } else {
    
      $(function() {
      
        setTimeout(function () {
          $(".loader").hide();
          $(".loader-overlay").hide();
        }, 1000);

        
        function changeBG () {
        var bg = $(".slick-list").find(".slick-active.slick-center div").css('background-image').match(/url\(['"]?(.*?)['"]?\)/)[1];
        $('#dashboard').css('background', `url(${bg}) center/cover no-repeat`);
        }
        
        function slideTrigger(el) {
        el.addClass('slick-anmt');
        setTimeout(function() {
            el.removeClass('slick-anmt');
        }, 200);
        }
        
        var options = {
        infinite: true,
        centerMode: true,
        centerPadding: '140px',
        slidesToShow: 3,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 30000,
        
        responsive: [
            {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
            },
            {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
            }
        ]
        };
        
        $('.slick-gc').slick(options).on('swipe', function(event, slick, direction){
        changeBG();
        }).on('afterChange', function(event, slick, currentSlide, nextSlide){
        changeBG();
        slideTrigger($('.slick-next'))
        })
        
        $(document).keydown(function (event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            $('.slick-gc').slick('slickNext');
            slideTrigger($('.slick-next'))
        }
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            $('.slick-gc').slick('slickPrev');
            slideTrigger($('.slick-prev'))
        }
        });
        
        function throttle(func, limit) {
        var inThrottle;
        return function() {
            if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
            }
        };
        }
        
        // Throttled wheel handler
        var throttledWheel = throttle(function (event) {
        var delta;
        
        if (event.originalEvent.wheelDelta !== undefined) {
            // For older browsers (e.g., IE)
            delta = event.originalEvent.wheelDelta;
        } else {
            // For modern browsers
            delta = -event.originalEvent.deltaY;
        }
        
        if (delta > 0) {
            $('.slick-gc').slick('slickPrev');
            slideTrigger($('.slick-prev'))
        } else {
            $('.slick-gc').slick('slickNext');
            slideTrigger($('.slick-next'))
        }
        }, 200);
        
        var throttledMouseMove = throttle(function (event) {
        var sectionWidth = $(this).width();
        var mouseX = event.pageX - $(this).offset().left;
        var distanceFromCenter = Math.abs(mouseX - sectionWidth / 2);
        var slickcenter = +($('.slick-slide.slick-active').width())
        
        // Avoid logging when the mouse is within 400 pixels from the center
        if (distanceFromCenter > slickcenter) {
            if (mouseX < sectionWidth / 2) {
            $('.slick-gc').slick('slickPrev');
            slideTrigger($('.slick-prev'))
            } else {
            $('.slick-gc').slick('slickNext');
            slideTrigger($('.slick-next'))
            }
        }
        }, 1000); 
        
        $('body').on('wheel', throttledWheel);
        $('.slick-gc').on('mousemove', throttledMouseMove);
        
        var charList = '';
        var timeoutId;
        var targetIndex = -1;
        
        $(document).on('keydown', function (e) {
            var keyCode = e.which;
        
            if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode === 32 || keyCode === 8) {
        
                var char = String.fromCharCode(keyCode);
                
                if(keyCode === 8) {
                charList = charList.substring(0, charList.length - 1);
                } else {
                charList = charList + char;
                }
        
                swal({
                    title: charList,
                    timer: 1100,
                    buttons: false
                });
        
                clearTimeout(timeoutId);
                timeoutId = setTimeout(resetCharList, 1000);
            }
        });
        
        function resetCharList() {
            $('.slick-gc .slick-slide').each(function(index) {
                var slideTitle = $(this).data('title');
        
                if (slideTitle && slideTitle.toLowerCase().startsWith(charList.toLowerCase())) {
                    targetIndex = $(this).attr('data-slick-index');
                }
            });
            charList = '';
            if (targetIndex !== -1) {
                $('.slick-gc').slick('slickGoTo', targetIndex);
                targetIndex = -1;
            }
        }
        
        $(document).on('click', '.slick-slide div', function(){
            var slideLink = $(this).data('link');
            
            if(slideLink) {
                window.open(slideLink, '_blank');
            }
        });
      
      });
      

    }
}

// Start loading libraries from index 0
loadLibraries(0);
