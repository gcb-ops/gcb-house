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
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js',
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

        function sheetReader(core) {
            return new Promise((resolve, reject) => {
                fetch('sites.xlsx')
                    .then(response => response.blob())
                    .then(data => {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
                        var sheetName = workbook.SheetNames[0];
                        var sheet = workbook.Sheets[sheetName];
                        var excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                        var nonEmptyRows = excelData.filter(row => row.some(cell => cell !== ''));
                        var transposedData = excelData[0].map((col, i) => excelData.map(row => row[i]));
                        var nonEmptyColumns = transposedData.filter(col => col.some(cell => cell !== ''));
                        var r = nonEmptyRows.length;
                        var c = nonEmptyColumns.length;
                        var arrayOfObjects = [];

                        if(core) {
                            if(core == "sitesModal") {
                                for (let i = 1; i < r; i++) {
                                    var obj = {};
                                    obj["title"] = nonEmptyRows[i][0];
                                    obj["url"] = nonEmptyRows[i][1];
                                    obj["link"] = nonEmptyRows[i][2];
                                    obj["desc"] = nonEmptyRows[i][3];
                                    obj["category"] = nonEmptyRows[i][4];
                                    arrayOfObjects.push(obj);
                                }
                            } else if(core == "sitesSlider") {
                                for (let i = 1; i < r; i++) {
                                    var obj = `<div data-title="${nonEmptyRows[i][0]}"><div class="core" data-link="${nonEmptyRows[i][1]}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${nonEmptyRows[i][2]}');"><span>${nonEmptyRows[i][0]}</span></div></div>`;
                                    arrayOfObjects.push(obj);
                                }
                            } else {
                                for (let i = 1; i < r; i++) {
                                    if(nonEmptyRows[i][0] == core) {
                                        for (let n = 0; n < c - 1; n++) {
                                            arrayOfObjects.push(nonEmptyRows[i][n]);
                                        }
                                        break;
                                    }
                                } 
                            }
                            
                        } 
                        resolve(arrayOfObjects); 
                    };
                    reader.readAsArrayBuffer(data);
                })
                .catch(error => {
                    console.error('Error fetching Excel file:', error);
                    reject(error); 
                });
            });
        }

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

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        var options = {
        infinite: true,
        centerMode: true,
        centerPadding: '140px',
        slidesToShow: 3,
        speed: 600,
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
        })

        sheetReader("sitesSlider")
            .then(data => {
                shuffleArray(data);

                data.forEach(function(slideContent) {
                    $('.slick-gc').slick('slickAdd', slideContent);
                    $('.slick-gc').slick('refresh');
                });
            })
            .catch(error => {
            // Handle errors if needed
            console.error(error);
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

        function debounce(func, delay) {
            let timeoutIds;
            
            return function() {
                const context = this;
                const args = arguments;
                
                clearTimeout(timeoutIds);
                
                timeoutIds = setTimeout(function() {
                    func.apply(context, args);
                }, delay);
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
                if(!$("#sitesmodal").hasClass("show")) {
                    $('.slick-gc').slick('slickPrev');
                    slideTrigger($('.slick-prev'))
                }
            } else {
                if(!$("#sitesmodal").hasClass("show")) {
                    $('.slick-gc').slick('slickNext');
                    slideTrigger($('.slick-next'))
                }
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

        $(document).on("mouseover", ".slick-gc", function() {
            $('#dashboard .fab-container').addClass("fabc-v");
        }).on("mouseout", ".slick-gc", function() {
            $('#dashboard .fab-container').removeClass("fabc-v fabc-vi");
        })

        $(document).on("mouseover", "#dashboard .fab-container", function() {
            $('#dashboard .fab-container').addClass("fabc-vi");
        }).on("click", "#dashboard .fab-container", function() {
            $('#dashboard .fab-container').removeClass("fabc-v fabc-vi");
            sheetReader("sitesModal")
            .then(data => {
                shuffleArray(data);

                let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('sitesmodal')) 

                $(document).on('show.bs.modal', '#sitesmodal', () => {
                    $("#gallerySites").html("")
                    data.forEach(function(slideContent) {
                        var item = `<div class="box" data-category='${slideContent["category"]}'>
                                    <div class="body">
                                        <div class="imgContainer">
                                            <img src="${slideContent["link"]}" alt="">
                                        </div>
                                        <div class="content d-flex flex-column align-items-center justify-content-center">
                                            <div>
                                                <h3 class="text-white fs-5">${slideContent["title"]}</h3>
                                                <p class="fs-6 text-white">${slideContent["desc"].substr(0, 160) + '...'}</p>
                                                <a href="${slideContent["url"]}" target="_blank"><i class="fa-solid fa-paw"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                        $("#gallerySites").append(item)
                    });
                }) 
        
                modal.show();
        
                $(document).on('hidden.bs.modal', '#sitesmodal', () => { 
                    $("#gallerySites").html("")
                });
            })
            .catch(error => {
                console.error(error);
            });
            
        })

        function getFilteredSites(filt) {
            $("#gallerySites .box").removeClass("animatedSiteBox");
            $("#gallerySites .box").addClass("animatedSiteBox");
            $("#gallerySites .box").each(function(){
                var el = $(this)
                if(filt == "All") {
                    if(el.hasClass("fadeoutsitemodalbox")) {
                        el.removeClass("fadeoutsitemodalbox")
                    }
                } else if(filt == "Gen") {
                    if(el.data("category") == "For All") {
                        if(el.hasClass("fadeoutsitemodalbox")) {
                            el.removeClass("fadeoutsitemodalbox")
                        }
                    } else {
                        el.addClass("fadeoutsitemodalbox")
                    }
                } else {
                    if(el.data("category") == filt) {
                        if(el.hasClass("fadeoutsitemodalbox")) {
                            el.removeClass("fadeoutsitemodalbox")
                        }
                    } else {
                        el.addClass("fadeoutsitemodalbox")
                    }
                }
            })
        }

        $(document).on("click", "#sitesmodalnav li a", function() {
            var el = $(this)
            $("#sitesmodalnav li a").removeClass("active").prop("disabled", false)
            el.addClass("active").prop("disabled", true)
            if(el.hasClass("dev")) {
                getFilteredSites("For Developers");
            } else if(el.hasClass("des")) {
                getFilteredSites("For Designers");
            } else if(el.hasClass("gen")) {
                getFilteredSites("Gen");
            } else {
                getFilteredSites("All");
            }
        })

        $('body').on('wheel', throttledWheel);
        $('.slick-gc').on('mousemove', throttledMouseMove);

        var charList = '';
        var timeoutId;
        var targetIndex = -1;

        $(document).on('keydown', function (e) {
            if(!$(".form-control").hasClass("onFocus123")) {
                var keyCode = e.which;
                if (
                    (keyCode >= 48 && keyCode <= 57) ||  // Numbers 0-9
                    (keyCode >= 65 && keyCode <= 90) ||  // Uppercase alphabets A-Z
                    (keyCode >= 97 && keyCode <= 122) || // Lowercase alphabets a-z
                    keyCode === 8 ||                      // Backspace
                    keyCode === 32                        // Spacebar
                ) {
                    
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

                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    $('.slick-gc').slick('slickNext');
                    slideTrigger($('.slick-next'))
                }
                else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    $('.slick-gc').slick('slickPrev');
                    slideTrigger($('.slick-prev'))
                }
            }
        });

        function resetCharList() {
            $('.slick-gc .slick-slide').each(function(index) {
                var slideTitle = $(this).data('title');

                if (slideTitle && slideTitle.toLowerCase().includes(charList.toLowerCase())) {
                    targetIndex = $(this).attr('data-slick-index');
                    if(targetIndex > -1) {
                        return false;
                    } else {
                        targetIndex = -1
                    }
                }
            });
            charList = '';
            if (targetIndex !== -1) {
                $('.slick-gc').slick('slickGoTo', targetIndex);
                targetIndex = -1;
            }
        }

        $(document).on('click', '.slick-slide div', function(){
            var el = $(this);
            var slideTitle = el.find('span').text()
            
            if(el.parent().hasClass("slick-current")) {
                sheetReader(slideTitle)
                .then(data => {
                    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('portalModal')) 
                    let title = data[0],
                        desc = data[3],
                        bg = data[2],
                        link = data[1]

                    $(document).on('show.bs.modal', '#portalModal', () => { 
                        $('.modal h2').text(title)
                        $('.modal p').text(desc)
                        $('.modal .col.mod-img').css('background', `url(${bg}) center/cover no-repeat`);
                        
                        $(document).on('mouseover', '#fprint-btn', function() {
                        setTimeout(function() {
                            $('.modal .btn').attr({href: link, target: '_blank'})
                            window.open($('.slick-center .core').data("link"), '_blank');
                        }, 1500)
                        });
                    }) 
            
                    modal.show();
            
                    $(document).on('hidden.bs.modal', '#portalModal', () => { 
                        $('.modal h2, .modal p').text('')
                        $('.modal .col.mod-img').css('background', `white`);
                        $('.modal .btn').removeAttr('href target')
                    });
                })
                .catch(error => {
                // Handle errors if needed
                console.error(error);
                });
            } else {
                var clickedIndex = el.parent().attr('data-slick-index');
                $('.slick-gc').slick('slickGoTo', clickedIndex);
            }

        });

        $(document).on("focus", "#sitesmodal .modal-header .form-control", function () {
            $(this).addClass("onFocus123");
        });

        $(document).on("blur", "#sitesmodal .modal-header .form-control", function () {
            $(this).removeClass("onFocus123");
        });

        $(document).on("input", "#sitesmodal .modal-header .form-control", debounce(function() {
            var inp = $(this).val().toLowerCase();
            var activeCat = $("#sitesmodalnav .nav-link.active").text()
            
            $("#gallerySites .box").each(function() {
                var myCat = $(this).data("category");
                if(inp == "") {
                    if(myCat == activeCat || activeCat == "All") {
                        $(this).removeClass("fadeoutsitemodalbox")
                    }
                } else {
                    $(this).addClass("fadeoutsitemodalbox")
                    if($(this).find("h3").text().toLowerCase().includes(inp)) {
                        if(myCat == activeCat || activeCat == "All") {
                            
                            $(this).removeClass("fadeoutsitemodalbox")
                        }
                    }
                }
            });
        }, 1000));
      
      });
      

    }
}

// Start loading libraries from index 0
loadLibraries(0);
