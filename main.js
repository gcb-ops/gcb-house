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
        
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            $('.slick-gc').slick('slickNext');
            slideTrigger($('.slick-next'))
            }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            $('.slick-gc').slick('slickPrev');
            slideTrigger($('.slick-prev'))
            }
        });
        
        function resetCharList() {
            $('.slick-gc .slick-slide').each(function(index) {
                var slideTitle = $(this).data('title');
        
                if (slideTitle && slideTitle.toLowerCase().startsWith(charList.toLowerCase())) {
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
            var slideLink = el.data('link');
            var slideTitle = el.find('span').text();
            var slideImg = el.css('background-image');
            var slideDesc = "";
        
            var urlRegex = /url\(['"]?([^'"]+?)['"]?\)/;
            var match = slideImg.match(urlRegex);
        
            var imageUrl = match ? match[1] : null;
        
            switch(slideTitle.toLowerCase()) {
            case 'chat gpt':
                slideDesc = "ChatGPT is a versatile conversational agent designed for diverse user support. Whether retrieving information, solving problems, or engaging in conversation, it offers a valuable experience. With advanced natural language processing, it comprehends user input, generating human-like responses. This makes ChatGPT a helpful companion for information retrieval, brainstorming solutions, and engaging interactions across a wide range of topics. Its adaptability and understanding contribute to a seamless and enriching user experience, showcasing its utility as a multifaceted conversational tool.";
                break;
            case 'lingo blocks':
                slideDesc = "It's an AI-powered knowledge assistant, tailor-made for professionals and educators—be it university professors, team leaders, or experts like you. It's for anyone passionate about disseminating information in an intelligent, impactful way. Lingo Blocks gives you the autonomy you crave to experiment, to mold, and to perfect your AI assistant. Whether you're looking to tackle complex issues, create a unique customer experience, or empower your team, this platform has got you covered. Note: Set to Wordpress Expert.";
                break;
            case 'sucuri':
                slideDesc = "Sucuri serves as a robust website security platform, dedicated to fortifying websites against cyber threats. Offering malware detection and removal, a Web Application Firewall (WAF) for preemptive threat filtration, continuous security monitoring, and DDoS protection, Sucuri aims to maintain a clean and secure online environment. With a focus on security hardening through best practices and incident response capabilities in case of breaches, Sucuri provides a comprehensive solution to enhance the overall security posture of websites, ensuring they remain resilient and protected against a diverse range of online vulnerabilities and attacks.";
                break;
            case 'web archive': 
                slideDesc = "The Web Archive, often referred to simply as the Internet Archive, is a nonprofit digital library that aims to preserve and provide access to historical versions of websites, web pages, multimedia content, and other digital artifacts. The primary purpose of the Internet Archive is to capture and archive the evolving nature of the web, allowing users to explore past iterations of websites and access content that may no longer be available on the live web. It serves as a valuable resource for researchers, historians, and the general public interested in studying the evolution of the internet, digital culture, and the historical context of online content. The Internet Archive's Wayback Machine, one of its prominent tools, enables users to view snapshots of websites at different points in time, contributing to the preservation of the internet's cultural heritage.";
                break;
            case 'grammarly': 
                slideDesc = "Grammarly is an AI-powered writing assistant designed to enhance and improve written communication. Its primary purpose is to help users with grammar, spelling, and punctuation errors, as well as provide suggestions for improving clarity, style, and tone in written content. Grammarly operates as a browser extension, desktop application, and online platform, seamlessly integrating into various writing environments, including emails, documents, and social media. It is widely used by professionals, students, and anyone who wants to ensure the accuracy and effectiveness of their written communication. Grammarly not only corrects mistakes but also offers insights into writing style, vocabulary, and overall writing proficiency, making it a valuable tool for individuals seeking to refine and elevate their writing skills across diverse contexts.";
                break;
            case 'i ask ii': 
                slideDesc = "iAsk.Ai is an advanced, free AI search engine that empowers users to pose questions to AI and receive instant, accurate, and factual answers—all without storing user data. Functioning as a natural language-based search engine, it provides detailed and precise responses, offering a compelling alternative to ChatGPT. Utilizing technologies similar to ChatGPT, iAsk AI goes further with a finely tuned, large-scale Transformer language model optimized for natural language processing (NLP). This model is exclusively trained on reliable literature and authoritative sources, ensuring objective and unbiased answers to questions, distinguishing it from potential biases in ChatGPT.";
                break;
            case 'personal advancement':
                slideDesc = "Embark on a seamless journey through your personal advancement progress! Effortlessly monitor functionality, design, and additional features with user-friendly graphs that provide a vivid visual representation of your advancement. This platform ensures smooth exploration of your development, offering clarity and insights into your path of improvement.";
                break;
            case 'flawless ai':
                slideDesc = "Flawlessly.Ai offers a seamless transformation of your text into professional-grade content within seconds. Simply paste your text into the provided box and hit the button to utilize our Free Ai Writing Checker. This innovative tool refines spelling, grammar, tone, and overall writing, generating a flawless AI-driven copy. Enhance the quality of your content effortlessly, ensuring it meets the highest standards with the efficiency of Flawlessly.Ai's advanced writing enhancement capabilities.";
                break;
            case 'hotpot ai':
                slideDesc = "Hotpot is your creative companion for crafting stunning graphics, images, and written content. With AI tools like the AI Art Generator, it sparks creativity and automates repetitive tasks, while user-friendly templates empower individuals to effortlessly design device mockups, social media posts, marketing visuals, app icons, and various work graphics. Hotpot blends the power of artificial intelligence with intuitive editing, making it a versatile platform for unleashing creativity and streamlining the design process across a range of projects.";
                break;
            case 'craiyon':
                slideDesc = "Craiyon, formerly DALL·E mini, is your artistic genie, bridging skill gaps in the AI art realm. As the community's favored AI art generator, it offers 9 free images per minute. Go pro for unlimited art, reduced ads, and faster generation. Craiyon brings your wildest ideas to life, be it sushi in van Gogh's style or Gandhi reimagined as a Dragon Ball Z card. From abstract creations to breathtaking landscapes, explore boundless possibilities on our evolving AI art journey. Join us as we continuously enhance our cutting-edge technology, ensuring an elevated Craiyon experience. Unleash your creativity – with Craiyon, every wish becomes an artful reality!";
                break;
            default:
                break;
            }
        
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('portalModal')) 
        
            $(document).on('show.bs.modal', '#portalModal', () => { 
            $('.modal h2').text(slideTitle)
            $('.modal p').text(slideDesc)
            $('.modal .col.mod-img').css('background', `url(${imageUrl}) center/cover no-repeat`);
            
            $(document).on('mouseover', '#fprint-btn', function() {
                setTimeout(function() {
                $('.modal .btn').attr({href: slideLink, target: '_blank'})
                window.open(slideLink, '_blank');
                }, 1500)
            });
            }) 
        
            modal.show();
        
            $(document).on('hidden.bs.modal', '#portalModal', () => { 
            $('.modal h2').text('')
            $('.modal p').text('')
            $('.modal .col.mod-img').css('background', `white`);
            $('.modal .btn').attr('href', '#')
            });
        
        });
  
      
      });
      

    }
}

// Start loading libraries from index 0
loadLibraries(0);
