"use strict";
var userAgent = navigator.userAgent.toLowerCase(), initialDate = new Date(), $document = $(document),
    $window = $(window), $html = $("html"), $body = $("body"), isDesktop = $html.hasClass("desktop"),
    isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
    isChrome = /chrome/i.test(userAgent),
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch = "ontouchstart" in window, isNoviBuilder = false, windowReady = false, livedemo = false, plugins = {
        pageLoader: $(".page-loader"),
        pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
        smoothScroll: $html.hasClass("use--smoothscroll") ? "js/smoothscroll.min.js" : false,
        bootstrapTooltip: $("[data-toggle='tooltip']"),
        bootstrapTabs: $(".tabs"),
        rdParallax: $(".rd-parallax"),
        rdAudioPlayer: $(".rd-audio"),
        rdVideoPlayer: $(".rd-video-player"),
        responsiveTabs: $(".responsive-tabs"),
        rdNavbar: $(".rd-navbar"),
        rdVideoBG: $(".rd-video"),
        rdRange: $('.rd-range'),
        textRotator: $(".text-rotator"),
        owl: $(".owl-carousel"),
        swiper: $(".swiper-slider"),
        counter: $(".counter"),
        flickrfeed: $(".flickr"),
        twitterfeed: $(".twitter"),
        progressBar: $(".progress-bar-js"),
        isotope: $(".isotope"),
        countDown: $(".countdown"),
        calendar: $(".rd-calendar"),
        facebookfeed: $(".facebook"),
        instafeed: $(".instafeed"),
        facebookWidget: $('#fb-root'),
        materialTabs: $('.rd-material-tabs'),
        filePicker: $('.rd-file-picker'),
        fileDrop: $('.rd-file-drop'),
        popover: $('[data-toggle="popover"]'),
        dateCountdown: $('.DateCountdown'),
        statefulButton: $('.btn-stateful'),
        slick: $('.slick-slider'),
        scroller: $(".scroll-wrap"),
        socialite: $(".socialite"),
        viewAnimate: $('.view-animate'),
        selectFilter: $("select"),
        rdInputLabel: $(".form-label"),
        stacktable: $("[data-responsive=true]"),
        bootstrapDateTimePicker: $("[data-time-picker]"),
        customWaypoints: $('[data-custom-scroll-to]'),
        circleProgress: $(".progress-bar-circle"),
        stepper: $("input[type='number']"),
        radio: $("input[type='radio']"),
        checkbox: $("input[type='checkbox']"),
        customToggle: $("[data-custom-toggle]"),
        rdMailForm: $(".rd-mailform"),
        regula: $("[data-constraints]"),
        search: $(".rd-search"),
        searchResults: $('.rd-search-results'),
        imgZoom: $('[mag-thumb]'),
        vide: $('.bg-vide'),
        lightGallery: $("[data-lightgallery='group']"),
        lightGalleryItem: $("[data-lightgallery='item']"),
        lightDynamicGalleryItem: $("[data-lightgallery='dynamic']"),
        copyrightYear: $(".copyright-year"),
        maps: $(".google-map-container"),
        materialParallax: $('.parallax-container'),
    };
$document.ready(function () {
    $('.page-loader').css('display', 'none');
    isNoviBuilder = window.xMode;

    function getLatLngObject(str, marker, map, callback) {
        var coordinates = {};
        try {
            coordinates = JSON.parse(str);
            callback(new google.maps.LatLng(coordinates.lat, coordinates.lng), marker, map)
        } catch (e) {
            map.geocoder.geocode({'address': str}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    callback(new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)), marker, map)
                }
            })
        }
    }

    function initMaps() {
        var key;
        for (var i = 0; i < plugins.maps.length; i++) {
            if (plugins.maps[i].hasAttribute("data-key")) {
                key = plugins.maps[i].getAttribute("data-key");
                break;
            }
        }
        $.getScript('//maps.google.com/maps/api/js?' + (key ? 'key=' + key + '&' : '') + 'sensor=false&libraries=geometry,places&v=quarterly', function () {
            var head = document.getElementsByTagName('head')[0], insertBefore = head.insertBefore;
            head.insertBefore = function (newElement, referenceElement) {
                if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
                    return;
                }
                insertBefore.call(head, newElement, referenceElement);
            };
            var geocoder = new google.maps.Geocoder;
            for (var i = 0; i < plugins.maps.length; i++) {
                var zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
                var styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
                var center = plugins.maps[i].getAttribute("data-center") || "New York";
                var map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
                    zoom: zoom,
                    styles: styles,
                    scrollwheel: false,
                    center: {lat: 0, lng: 0}
                });
                plugins.maps[i].map = map;
                plugins.maps[i].geocoder = geocoder;
                plugins.maps[i].google = google;
                getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
                    mapElement.map.setCenter(location);
                });
                var markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");
                if (markerItems.length) {
                    var markers = [];
                    for (var j = 0; j < markerItems.length; j++) {
                        var markerElement = markerItems[j];
                        getLatLngObject(markerElement.getAttribute("data-location"), markerElement, plugins.maps[i], function (location, markerElement, mapElement) {
                            var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                            var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
                            var info = markerElement.getAttribute("data-description") || "";
                            var infoWindow = new google.maps.InfoWindow({content: info});
                            markerElement.infoWindow = infoWindow;
                            var markerData = {position: location, map: mapElement.map}
                            if (icon) {
                                markerData.icon = icon;
                            }
                            var marker = new google.maps.Marker(markerData);
                            markerElement.gmarker = marker;
                            markers.push({markerElement: markerElement, infoWindow: infoWindow});
                            marker.isActive = false;
                            google.maps.event.addListener(infoWindow, 'closeclick', (function (markerElement, mapElement) {
                                var markerIcon = null;
                                markerElement.gmarker.isActive = false;
                                markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                                markerElement.gmarker.setIcon(markerIcon);
                            }).bind(this, markerElement, mapElement));
                            google.maps.event.addListener(marker, 'click', (function (markerElement, mapElement) {
                                if (markerElement.infoWindow.getContent().length === 0) return;
                                var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
                                for (var k = 0; k < markers.length; k++) {
                                    var markerIcon;
                                    if (markers[k].markerElement === markerElement) {
                                        currentInfoWindow = markers[k].infoWindow;
                                    }
                                    gMarker = markers[k].markerElement.gmarker;
                                    if (gMarker.isActive && markers[k].markerElement !== markerElement) {
                                        gMarker.isActive = false;
                                        markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
                                        gMarker.setIcon(markerIcon);
                                        markers[k].infoWindow.close();
                                    }
                                }
                                currentMarker.isActive = !currentMarker.isActive;
                                if (currentMarker.isActive) {
                                    if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")) {
                                        currentMarker.setIcon(markerIcon);
                                    }
                                    currentInfoWindow.open(map, marker);
                                } else {
                                    if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")) {
                                        currentMarker.setIcon(markerIcon);
                                    }
                                    currentInfoWindow.close();
                                }
                            }).bind(this, markerElement, mapElement))
                        })
                    }
                }
            }
        });
    }

    function initLightGallery(itemsToInit, addClass) {
        if (!isNoviBuilder) {
            $(itemsToInit).lightGallery({
                thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
                selector: "[data-lightgallery='item']",
                autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
                pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
                addClass: addClass,
                mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
                loop: $(itemsToInit).attr("data-lg-loop") !== "false"
            });
        }
    }

    function initDynamicLightGallery(itemsToInit, addClass) {
        if (!isNoviBuilder) {
            $(itemsToInit).on("click", function () {
                $(itemsToInit).lightGallery({
                    thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
                    selector: "[data-lightgallery='item']",
                    autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
                    pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
                    addClass: addClass,
                    mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
                    loop: $(itemsToInit).attr("data-lg-loop") !== "false",
                    dynamic: true,
                    dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
                });
            });
        }
    }

    function initLightGalleryItem(itemToInit, addClass) {
        if (!isNoviBuilder) {
            $(itemToInit).lightGallery({
                selector: "this",
                addClass: addClass,
                counter: false,
                youtubePlayerParams: {modestbranding: 1, showinfo: 0, rel: 0, controls: 0},
                vimeoPlayerParams: {byline: 0, portrait: 0}
            });
        }
    }

    function getSwiperHeight(object, attr) {
        var val = object.attr("data-" + attr), dim;
        if (!val) {
            return undefined;
        }
        dim = val.match(/(px)|(%)|(vh)$/i);
        if (dim.length) {
            switch (dim[0]) {
                case "px":
                    return parseFloat(val);
                case "vh":
                    return $(window).height() * (parseFloat(val) / 100);
                case "%":
                    return object.width() * (parseFloat(val) / 100);
            }
        } else {
            return undefined;
        }
    }

    function toggleSwiperInnerVideos(swiper) {
        var prevSlide = $(swiper.slides[swiper.previousIndex]), nextSlide = $(swiper.slides[swiper.activeIndex]),
            videos;
        prevSlide.find("video").each(function () {
            this.pause();
        });
        videos = nextSlide.find("video");
        if (videos.length) {
            videos.get(0).play();
        }
    }

    function toggleSwiperCaptionAnimation(swiper) {
        var prevSlide = $(swiper.container), nextSlide = $(swiper.slides[swiper.activeIndex]);
        prevSlide.find("[data-caption-animate]").each(function () {
            var $this = $(this);
            $this.removeClass("animated").removeClass($this.attr("data-caption-animate")).addClass("not-animated");
        });
        nextSlide.find("[data-caption-animate]").each(function () {
            var $this = $(this), delay = $this.attr("data-caption-delay");
            setTimeout(function () {
                $this.removeClass("not-animated").addClass($this.attr("data-caption-animate")).addClass("animated");
            }, delay ? parseInt(delay) : 0);
        });
    }

    function makeParallax(el, speed, wrapper, prevScroll) {
        var scrollY = window.scrollY || window.pageYOffset;
        if (prevScroll != scrollY) {
            prevScroll = scrollY;
            el.addClass('no-transition');
            el[0].style['transform'] = 'translate3d(0,' + -scrollY * (1 - speed) + 'px,0)';
            el.height();
            el.removeClass('no-transition');
            if (el.attr('data-fade') === 'true') {
                var bound = el[0].getBoundingClientRect(), offsetTop = bound.top * 2 + scrollY,
                    sceneHeight = wrapper.outerHeight(), sceneDevider = wrapper.offset().top + sceneHeight / 2.0,
                    layerDevider = offsetTop + el.outerHeight() / 2.0, pos = sceneHeight / 6.0, opacity;
                if (sceneDevider + pos > layerDevider && sceneDevider - pos < layerDevider) {
                    el[0].style["opacity"] = 1;
                } else {
                    if (sceneDevider - pos < layerDevider) {
                        opacity = 1 + ((sceneDevider + pos - layerDevider) / sceneHeight / 3.0 * 5);
                    } else {
                        opacity = 1 - ((sceneDevider - pos - layerDevider) / sceneHeight / 3.0 * 5);
                    }
                    el[0].style["opacity"] = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity.toFixed(2);
                }
            }
        }
        requestAnimationFrame(function () {
            makeParallax(el, speed, wrapper, prevScroll);
        });
    }

    function isScrolledIntoView(elem) {
        var $window = $(window);
        return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
    }

    function lazyInit(element, func) {
        var $win = jQuery(window);
        $win.on('load scroll', function () {
            if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
                func.call();
                element.addClass('lazy-loaded');
            }
        });
    }

    function liveSearch(options) {
        $('#' + options.live).removeClass('cleared').html();
        options.current++;
        options.spin.addClass('loading');
        $.get(handler, {
            s: decodeURI(options.term),
            liveSearch: options.live,
            dataType: "html",
            liveCount: options.liveCount,
            filter: options.filter,
            template: options.template
        }, function (data) {
            options.processed++;
            var live = $('#' + options.live);
            if (options.processed == options.current && !live.hasClass('cleared')) {
                live.find('> #search-results').removeClass('active');
                live.html(data);
                setTimeout(function () {
                    live.find('> #search-results').addClass('active');
                }, 50);
            }
            options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
        })
    }

    function attachFormValidator(elements) {
        for (var i = 0; i < elements.length; i++) {
            var o = $(elements[i]), v;
            o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
            v = o.parent().find(".form-validation");
            if (v.is(":last-child")) {
                o.addClass("form-control-last-child");
            }
        }
        elements.on('input change propertychange blur', function (e) {
            var $this = $(this), results;
            if (e.type != "blur") {
                if (!$this.parent().hasClass("has-error")) {
                    return;
                }
            }
            if ($this.parents('.rd-mailform').hasClass('success')) {
                return;
            }
            if ((results = $this.regula('validate')).length) {
                for (i = 0; i < results.length; i++) {
                    $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
                }
            } else {
                $this.siblings(".form-validation").text("").parent().removeClass("has-error")
            }
        }).regula('bind');
    }

    function isValidated(elements) {
        var results, errors = 0;
        if (elements.length) {
            for (j = 0; j < elements.length; j++) {
                var $input = $(elements[j]);
                if ((results = $input.regula('validate')).length) {
                    for (k = 0; k < results.length; k++) {
                        errors++;
                        $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                    }
                } else {
                    $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                }
            }
            return errors == 0;
        }
        return true;
    }

    function initBootstrapTooltip(tooltipPlacement) {
        if (window.innerWidth < 599) {
            plugins.bootstrapTooltip.tooltip('destroy');
            plugins.bootstrapTooltip.tooltip({placement: 'bottom'});
        } else {
            plugins.bootstrapTooltip.tooltip('destroy');
            plugins.bootstrapTooltip.tooltipPlacement;
            plugins.bootstrapTooltip.tooltip();
        }
    }

    if (plugins.copyrightYear.length) {
        plugins.copyrightYear.text(initialDate.getFullYear());
    }
    if (isIE) {
        if (isIE < 10) $html.addClass("lt-ie-10");
        if (isIE < 11) $html.addClass("ie-10");
        if (isIE === 11) $("html").addClass("ie-11");
        if (isIE === 12) $("html").addClass("ie-edge");
    }
    if (isChrome) {
        $html.addClass('chrome');
    }
    if (plugins.bootstrapTooltip.length) {
        var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
        initBootstrapTooltip(tooltipPlacement);
        $(window).on('resize orientationchange', function () {
            initBootstrapTooltip(tooltipPlacement);
        })
    }
    if (plugins.smoothScroll) {
        $.getScript(plugins.smoothScroll);
    }
    if (plugins.rdAudioPlayer.length > 0) {
        var i;
        for (i = 0; i < plugins.rdAudioPlayer.length; i++) {
            $(plugins.rdAudioPlayer[i]).RDAudio();
        }
    }
    if (plugins.textRotator.length) {
        var i;
        for (i = 0; i < plugins.textRotator.length; i++) {
            var textRotatorItem = plugins.textRotator[i];
            $(textRotatorItem).rotator();
        }
    }
    if (plugins.bootstrapDateTimePicker.length) {
        var i;
        for (i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
            var $dateTimePicker = $(plugins.bootstrapDateTimePicker[i]);
            var options = {};
            options['format'] = 'dddd DD MMMM YYYY - HH:mm';
            if ($dateTimePicker.attr("data-time-picker") == "date") {
                options['format'] = 'dddd DD MMMM YYYY';
                options['minDate'] = new Date();
            } else if ($dateTimePicker.attr("data-time-picker") == "time") {
                options['format'] = 'HH:mm';
            }
            options["time"] = ($dateTimePicker.attr("data-time-picker") != "date");
            options["date"] = ($dateTimePicker.attr("data-time-picker") != "time");
            options["shortTime"] = true;
            $dateTimePicker.bootstrapMaterialDatePicker(options);
        }
    }
    if (plugins.responsiveTabs.length > 0) {
        var i;
        for (i = 0; i < plugins.responsiveTabs.length; i++) {
            var responsiveTabsItem = $(plugins.responsiveTabs[i]);
            responsiveTabsItem.easyResponsiveTabs({type: responsiveTabsItem.attr("data-type") === "accordion" ? "accordion" : "default"});
        }
    }
    if (plugins.instafeed.length > 0) {
        var i;
        for (i = 0; i < plugins.instafeed.length; i++) {
            var instafeedItem = $(plugins.instafeed[i]);
            instafeedItem.RDInstafeed({});
        }
    }
    if (plugins.twitterfeed.length > 0) {
        var i;
        for (i = 0; i < plugins.twitterfeed.length; i++) {
            var twitterfeedItem = plugins.twitterfeed[i];
            $(twitterfeedItem).RDTwitter({});
        }
    }
    if (plugins.materialTabs.length) {
        var i;
        for (i = 0; i < plugins.materialTabs.length; i++) {
            var materialTabsItem = plugins.materialTabs[i];
            $(materialTabsItem).RDMaterialTabs({});
        }
    }
    if (plugins.facebookfeed.length > 0) {
        var i;
        for (i = 0; i < plugins.facebookfeed.length; i++) {
            var facebookfeedItem = plugins.facebookfeed[i];
            $(facebookfeedItem).RDFacebookFeed({});
        }
    }
    if (plugins.facebookWidget.length) {
        lazyInit(plugins.facebookWidget, function () {
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });
    }
    if (plugins.flickrfeed.length > 0) {
        var i;
        for (i = 0; i < plugins.flickrfeed.length; i++) {
            var flickrfeedItem = $(plugins.flickrfeed[i]);
            flickrfeedItem.RDFlickr({
                callback: function () {
                    var items = flickrfeedItem.find("[data-photo-swipe-item]");
                    if (items.length) {
                        for (var j = 0; j < items.length; j++) {
                            var image = new Image();
                            image.setAttribute('data-index', j);
                            image.onload = function () {
                                items[this.getAttribute('data-index')].setAttribute('data-size', this.naturalWidth + 'x' + this.naturalHeight);
                            };
                            image.src = items[j].getAttribute('href');
                        }
                    }
                }
            });
        }
    }
    if (plugins.selectFilter.length) {
        var i;
        for (i = 0; i < plugins.selectFilter.length; i++) {
            var select = $(plugins.selectFilter[i]);
            select.select2({theme: "bootstrap"}).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
        }
    }
    if (plugins.stepper.length) {
        plugins.stepper.stepper({labels: {up: "", down: ""}});
    }
    if (plugins.radio.length) {
        var i;
        for (i = 0; i < plugins.radio.length; i++) {
            var $this = $(plugins.radio[i]);
            $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
        }
    }
    if (plugins.checkbox.length) {
        var i;
        for (i = 0; i < plugins.checkbox.length; i++) {
            var $this = $(plugins.checkbox[i]);
            $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
        }
    }
    if (plugins.filePicker.length || plugins.fileDrop.length) {
        var i;
        for (i = 0; i < plugins.filePicker.length; i++) {
            var filePickerItem = plugins.filePicker[i];
            $(filePickerItem).RDFilepicker({metaFieldClass: "rd-file-picker-meta"});
        }
        for (i = 0; i < plugins.fileDrop.length; i++) {
            var fileDropItem = plugins.fileDrop[i];
            $(fileDropItem).RDFilepicker({
                metaFieldClass: "rd-file-drop-meta",
                buttonClass: "rd-file-drop-btn",
                dropZoneClass: "rd-file-drop"
            });
        }
    }
    if (plugins.popover.length) {
        if (window.innerWidth < 767) {
            plugins.popover.attr('data-placement', 'bottom');
            plugins.popover.popover();
        }
        else {
            plugins.popover.popover();
        }
    }
    if (plugins.countDown.length) {
        for (var i = 0; i < plugins.countDown.length; i++) {
            var $countDownItem = $(plugins.countDown[i]),
                settings = {format: $countDownItem.attr('data-format'), layout: $countDownItem.attr('data-layout')};
            if (livedemo) {
                var d = new Date();
                d.setDate(d.getDate() + 42);
                settings[$countDownItem.attr('data-type')] = d;
            } else {
                settings[$countDownItem.attr('data-type')] = new Date($countDownItem.attr('data-time'));
            }
            $countDownItem.countdown(settings);
        }
    }
    if (plugins.dateCountdown.length) {
        for (i = 0; i < plugins.dateCountdown.length; i++) {
            var dateCountdownItem = $(plugins.dateCountdown[i]), time = {
                "Days": {"text": "Days", "color": "#0b7750", "show": true},
                "Hours": {"text": "Hours", "color": "#0b7750", "show": true},
                "Minutes": {"text": "Minutes", "color": "#0b7750", "show": true},
                "Seconds": {"text": "Seconds", "color": "#0b7750", "show": true}
            };
            dateCountdownItem.TimeCircles({
                "animation": "smooth",
                "bg_width": .1,
                "fg_width": 0.04,
                "circle_bg_color": dateCountdownItem.attr('data-bg') ? dateCountdownItem.attr('data-bg') : "rgba(11,119,80, 1)",
                "time": time
            });
            $(window).on('load resize orientationchange', (function ($dateCountdownItem, time) {
                return function () {
                    if (window.innerWidth < 479) {
                        $dateCountdownItem.TimeCircles({
                            time: {
                                Minutes: {show: true},
                                Seconds: {show: false}
                            }
                        }).rebuild();
                    } else if (window.innerWidth < 767) {
                        $dateCountdownItem.TimeCircles({time: {Seconds: {show: false}}}).rebuild();
                    } else {
                        $dateCountdownItem.TimeCircles({time: time}).rebuild();
                    }
                }
            })($(dateCountdownItem), time));
        }
    }
    if (plugins.statefulButton.length) {
        $(plugins.statefulButton).on('click', function () {
            var statefulButtonLoading = $(this).button('loading');
            setTimeout(function () {
                statefulButtonLoading.button('reset')
            }, 2000);
        })
    }
    if (plugins.calendar.length) {
        var i;
        for (i = 0; i < plugins.calendar.length; i++) {
            var calendarItem = $(plugins.calendar[i]);
            calendarItem.rdCalendar({
                days: calendarItem.attr("data-days") ? calendarItem.attr("data-days").split(/\s?,\s?/i) : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                month: calendarItem.attr("data-months") ? calendarItem.attr("data-months").split(/\s?,\s?/i) : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            });
        }
    }
    if (plugins.circleProgress.length) {
        var i;
        for (i = 0; i < plugins.circleProgress.length; i++) {
            var circleProgressItem = $(plugins.circleProgress[i]);
            $document.on("scroll", function () {
                if (!circleProgressItem.hasClass('animated')) {
                    var arrayGradients = circleProgressItem.attr('data-gradient').split(",");
                    circleProgressItem.circleProgress({
                        value: circleProgressItem.attr('data-value'),
                        size: circleProgressItem.attr('data-size') ? circleProgressItem.attr('data-size') : 175,
                        fill: {gradient: arrayGradients, gradientAngle: Math.PI / 4},
                        startAngle: -Math.PI / 4 * 2,
                        emptyFill: circleProgressItem.attr('data-empty-fill') ? circleProgressItem.attr('data-empty-fill') : "rgb(245,245,245)",
                        thickness: circleProgressItem.attr('data-thickness') ? parseInt(circleProgressItem.attr('data-thickness')) : 10,
                    }).on('circle-animation-progress', function (event, progress, stepValue) {
                        $(this).find('span').text(String(stepValue.toFixed(3)).replace('0.', '').replace('1.', '1'));
                    });
                    circleProgressItem.addClass('animated');
                }
            }).trigger("scroll");
        }
    }
    if (plugins.progressBar.length) {
        var i, bar, type;
        for (i = 0; i < plugins.progressBar.length; i++) {
            var progressItem = plugins.progressBar[i];
            bar = null;
            if (progressItem.className.indexOf("progress-bar-horizontal") > -1) {
                type = 'Line';
            }
            if (progressItem.className.indexOf("progress-bar-radial") > -1) {
                type = 'Circle';
            }
            if (progressItem.getAttribute("data-stroke") && progressItem.getAttribute("data-value") && type) {
                bar = new ProgressBar[type](progressItem, {
                    strokeWidth: Math.round(parseFloat(progressItem.getAttribute("data-stroke")) / progressItem.offsetWidth * 100),
                    trailWidth: progressItem.getAttribute("data-trail") ? Math.round(parseFloat(progressItem.getAttribute("data-trail")) / progressItem.offsetWidth * 100) : 0,
                    text: {
                        value: progressItem.getAttribute("data-counter") === "true" ? '0' : null,
                        className: 'progress-bar__body',
                        style: null
                    }
                });
                bar.svg.setAttribute('preserveAspectRatio', "none meet");
                if (type === 'Line') {
                    bar.svg.setAttributeNS(null, "height", progressItem.getAttribute("data-stroke"));
                }
                bar.path.removeAttribute("stroke");
                bar.path.className.baseVal = "progress-bar__stroke";
                if (bar.trail) {
                    bar.trail.removeAttribute("stroke");
                    bar.trail.className.baseVal = "progress-bar__trail";
                }
                if (progressItem.getAttribute("data-easing") && !isIE) {
                    $(document).on("scroll", {"barItem": bar}, $.proxy(function (event) {
                        var bar = event.data.barItem;
                        var $this = $(this);
                        if (isScrolledIntoView($this) && this.className.indexOf("progress-bar--animated") === -1) {
                            this.className += " progress-bar--animated";
                            bar.animate(parseInt($this.attr("data-value")) / 100.0, {
                                easing: $this.attr("data-easing"),
                                duration: $this.attr("data-duration") ? parseInt($this.attr("data-duration")) : 800,
                                step: function (state, b) {
                                    if (b._container.className.indexOf("progress-bar-horizontal") > -1 || b._container.className.indexOf("progress-bar-vertical") > -1) {
                                        b.text.style.width = Math.abs(b.value() * 100).toFixed(0) + "%"
                                    }
                                    b.setText(Math.abs(b.value() * 100).toFixed(0));
                                }
                            });
                        }
                    }, progressItem)).trigger("scroll");
                } else {
                    bar.set(parseInt($(progressItem).attr("data-value")) / 100.0);
                    bar.setText($(progressItem).attr("data-value"));
                    if (type === 'Line') {
                        bar.text.style.width = parseInt($(progressItem).attr("data-value")) + "%";
                    }
                }
            } else {
                console.error(progressItem.className + ": progress bar type is not defined");
            }
        }
    }
    if (isDesktop) {
        $().UItoTop({easingType: 'easeOutQuart', containerClass: 'ui-to-top fa fa-angle-up'});
    }
    if (plugins.rdNavbar.length) {
        plugins.rdNavbar.RDNavbar({stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false});
        if (plugins.rdNavbar.attr("data-body-class")) {
            document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
        }
    }
    if (plugins.viewAnimate.length) {
        var i;
        for (i = 0; i < plugins.viewAnimate.length; i++) {
            var $view = $(plugins.viewAnimate[i]).not('.active');
            $document.on("scroll", $.proxy(function () {
                if (isScrolledIntoView(this)) {
                    this.addClass("active");
                }
            }, $view)).trigger("scroll");
        }
    }
    if (plugins.swiper.length) {
        var i;
        for (i = 0; i < plugins.swiper.length; i++) {
            var s = $(plugins.swiper[i]);
            var pag = s.find(".swiper-pagination"), next = s.find(".swiper-button-next"),
                prev = s.find(".swiper-button-prev"), bar = s.find(".swiper-scrollbar"),
                parallax = s.parents('.rd-parallax').length, swiperSlide = s.find(".swiper-slide");
            for (j = 0; j < swiperSlide.length; j++) {
                var $this = $(swiperSlide[j]), url;
                if (url = $this.attr("data-slide-bg")) {
                    $this.css({"background-image": "url(" + url + ")", "background-size": "cover"})
                }
            }
            swiperSlide.end().find("[data-caption-animate]").addClass("not-animated").end().swiper({
                autoplay: s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : 5000,
                direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
                effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
                speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
                keyboardControl: s.attr('data-keyboard') === "true",
                mousewheelControl: s.attr('data-mousewheel') === "true",
                mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
                nextButton: next.length ? next.get(0) : null,
                prevButton: prev.length ? prev.get(0) : null,
                pagination: pag.length ? pag.get(0) : null,
                paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
                paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                } : null : null,
                scrollbar: bar.length ? bar.get(0) : null,
                scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
                scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
                loop: s.attr('data-loop') !== "false",
                simulateTouch: s.attr('data-simulate-touch') ? s.attr('data-simulate-touch') === "true" : false,
                onTransitionStart: function (swiper) {
                    toggleSwiperInnerVideos(swiper);
                },
                onTransitionEnd: function (swiper) {
                    toggleSwiperCaptionAnimation(swiper);
                },
                onInit: function (swiper) {
                    toggleSwiperInnerVideos(swiper);
                    toggleSwiperCaptionAnimation(swiper);
                    var swiperParalax = s.find(".swiper-parallax");
                    for (var k = 0; k < swiperParalax.length; k++) {
                        var $this = $(swiperParalax[k]), speed;
                        if (parallax && !isIEBrows && !isMobile) {
                            if (speed = $this.attr("data-speed")) {
                                makeParallax($this, speed, s, false);
                            }
                        }
                    }
                    $(window).on('resize', function () {
                        swiper.update(true);
                    })
                }
            });
            $(window).on("resize", function () {
                var mh = getSwiperHeight(s, "min-height"), h = getSwiperHeight(s, "height");
                if (h) {
                    s.css("height", mh ? mh > h ? mh : h : h);
                }
            }).trigger("resize");
        }
    }
    if (plugins.rdVideoPlayer.length) {
        var i;
        for (i = 0; i < plugins.rdVideoPlayer.length; i++) {
            var videoItem = plugins.rdVideoPlayer[i], volumeWrap = $(".rd-video-volume-wrap");
            $(videoItem).RDVideoPlayer({});
            volumeWrap.on("mouseenter", function () {
                $(this).addClass("hover")
            });
            volumeWrap.on("mouseleave", function () {
                $(this).removeClass("hover")
            });
            if (isTouch) {
                volumeWrap.find(".rd-video-volume").on("click", function () {
                    $(this).toggleClass("hover")
                });
                $document.on("click", function (e) {
                    if (!$(e.target).is(volumeWrap) && $(e.target).parents(volumeWrap).length == 0) {
                        volumeWrap.find(".rd-video-volume").removeClass("hover")
                    }
                })
            }
        }
    }
    if (plugins.search.length || plugins.searchResults) {
        var handler = "bat/rd-search.php";
        var defaultTemplate = '<h5 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h5>' +
            '<p>...#{token}...</p>' +
            '<p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
        var defaultFilter = '*.html';
        if (plugins.search.length) {
            for (i = 0; i < plugins.search.length; i++) {
                var searchItem = $(plugins.search[i]), options = {
                    element: searchItem,
                    filter: (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
                    template: (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
                    live: (searchItem.attr('data-search-live')) ? searchItem.attr('data-search-live') : false,
                    liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live')) : 4,
                    current: 0,
                    processed: 0,
                    timer: {}
                };
                if ($('.rd-navbar-search-toggle').length) {
                    var toggle = $('.rd-navbar-search-toggle');
                    toggle.on('click', function () {
                        if (!($(this).hasClass('active'))) {
                            searchItem.find('input').val('').trigger('propertychange');
                        }
                    });
                }
                if (options.live) {
                    var clearHandler = false;
                    searchItem.find('input').on("keyup input propertychange", $.proxy(function () {
                        this.term = this.element.find('input').val().trim();
                        this.spin = this.element.find('.input-group-addon');
                        clearTimeout(this.timer);
                        if (this.term.length > 2) {
                            this.timer = setTimeout(liveSearch(this), 200);
                            if (clearHandler == false) {
                                clearHandler = true;
                                $("body").on("click", function (e) {
                                    if ($(e.toElement).parents('.rd-search').length == 0) {
                                        $('#rd-search-results-live').addClass('cleared').html('');
                                    }
                                })
                            }
                        } else if (this.term.length == 0) {
                            $('#' + this.live).addClass('cleared').html('');
                        }
                    }, options, this));
                }
                searchItem.submit($.proxy(function () {
                    $('<input />').attr('type', 'hidden').attr('name', "filter").attr('value', this.filter).appendTo(this.element);
                    return true;
                }, options, this))
            }
        }
        if (plugins.searchResults.length) {
            var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
            var match = regExp.exec(location.search);
            if (match != null) {
                $.get(handler, {
                    s: decodeURI(match[1]),
                    dataType: "html",
                    filter: match[2],
                    template: defaultTemplate,
                    live: ''
                }, function (data) {
                    plugins.searchResults.html(data);
                })
            }
        }
    }
    if (plugins.slick.length) {
        var i;
        for (i = 0; i < plugins.slick.length; i++) {
            var $slickItem = $(plugins.slick[i]);
            $slickItem.slick({
                slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll')) || 1,
                asNavFor: $slickItem.attr('data-for') || false,
                dots: $slickItem.attr("data-dots") == "true",
                infinite: $slickItem.attr("data-loop") == "true",
                focusOnSelect: true,
                arrows: $slickItem.attr("data-arrows") == "true",
                swipe: $slickItem.attr("data-swipe") == "true",
                autoplay: $slickItem.attr("data-autoplay") == "true",
                vertical: $slickItem.attr("data-vertical") == "true",
                centerMode: $slickItem.attr("data-center-mode") == "true",
                centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
                mobileFirst: true,
                responsive: [{
                    breakpoint: 0,
                    settings: {slidesToShow: parseInt($slickItem.attr('data-items')) || 1,}
                }, {
                    breakpoint: 480,
                    settings: {slidesToShow: parseInt($slickItem.attr('data-xs-items')) || 1,}
                }, {
                    breakpoint: 768,
                    settings: {slidesToShow: parseInt($slickItem.attr('data-sm-items')) || 1,}
                }, {
                    breakpoint: 992,
                    settings: {slidesToShow: parseInt($slickItem.attr('data-md-items')) || 1,}
                }, {breakpoint: 1200, settings: {slidesToShow: parseInt($slickItem.attr('data-lg-items')) || 1,}}]
            }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
                var $this = $(this), childCarousel = $this.attr('data-child');
                if (childCarousel) {
                    $(childCarousel + ' .slick-slide').removeClass('slick-current');
                    $(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
                }
            });
        }
    }
    if (plugins.owl.length) {
        var k;
        for (k = 0; k < plugins.owl.length; k++) {
            var c = $(plugins.owl[k]), responsive = {};
            var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-", "-xl-"], values = [0, 480, 768, 992, 1200, 1485], i, j;
            for (i = 0; i < values.length; i++) {
                responsive[values[i]] = {};
                for (j = i; j >= -1; j--) {
                    if (!responsive[values[i]]["items"] && c.attr("data" + aliaces[j] + "items")) {
                        responsive[values[i]]["items"] = j < 0 ? 1 : parseInt(c.attr("data" + aliaces[j] + "items"));
                    }
                    if (!responsive[values[i]]["stagePadding"] && responsive[values[i]]["stagePadding"] !== 0 && c.attr("data" + aliaces[j] + "stage-padding")) {
                        responsive[values[i]]["stagePadding"] = j < 0 ? 0 : parseInt(c.attr("data" + aliaces[j] + "stage-padding"));
                    }
                    if (!responsive[values[i]]["margin"] && responsive[values[i]]["margin"] !== 0 && c.attr("data" + aliaces[j] + "margin")) {
                        responsive[values[i]]["margin"] = j < 0 ? 30 : parseInt(c.attr("data" + aliaces[j] + "margin"));
                    }
                    if (!responsive[values[i]]["dotsEach"] && responsive[values[i]]["dotsEach"] !== 0 && c.attr("data" + aliaces[j] + "dots-each")) {
                        responsive[values[i]]["dotsEach"] = j < 0 ? false : parseInt(c.attr("data" + aliaces[j] + "dots-each"));
                    }
                }
            }
            if (c.attr('data-dots-custom')) {
                c.on("initialized.owl.carousel", function (event) {
                    var carousel = $(event.currentTarget), customPag = $(carousel.attr("data-dots-custom")), active = 0;
                    if (carousel.attr('data-active')) {
                        active = parseInt(carousel.attr('data-active'));
                    }
                    carousel.trigger('to.owl.carousel', [active, 300, true]);
                    customPag.find("[data-owl-item='" + active + "']").addClass("active");
                    customPag.find("[data-owl-item]").on('click', function (e) {
                        e.preventDefault();
                        carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item")), 300, true]);
                    });
                    carousel.on("translate.owl.carousel", function (event) {
                        customPag.find(".active").removeClass("active");
                        customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
                    });
                });
            }
            if (c.attr('data-nav-custom')) {
                c.on("initialized.owl.carousel", function (event) {
                    var carousel = $(event.currentTarget), customNav = $(carousel.attr("data-nav-custom"));
                    customNav.find("[data-owl-prev]").on('click', function (e) {
                        e.preventDefault();
                        carousel.trigger('prev.owl.carousel', [300]);
                    });
                    customNav.find("[data-owl-next]").on('click', function (e) {
                        e.preventDefault();
                        carousel.trigger('next.owl.carousel', [300]);
                    });
                });
            }
            c.owlCarousel({
                autoplay: c.attr("data-autoplay") === "true",
                loop: c.attr("data-loop") === "true",
                items: 1,
                autoplaySpeed: 600,
                autoplayTimeout: 3000,
                dotsContainer: c.attr("data-pagination-class") || false,
                navContainer: c.attr("data-navigation-class") || false,
                mouseDrag: c.attr("data-mouse-drag") === "true",
                nav: c.attr("data-nav") === "true",
                dots: c.attr("data-dots") === "true",
                dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
                responsive: responsive,
                animateOut: c.attr("data-animation-out") || false,
                animateIn: c.attr("data-animation-in") || false,
                navText: $.parseJSON(c.attr("data-nav-text")) || [],
                navClass: $.parseJSON(c.attr("data-nav-class")) || ['owl-prev', 'owl-next']
            });
        }
    }
    if (plugins.counter.length) {
        var i;
        for (i = 0; i < plugins.counter.length; i++) {
            var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
            $document.on("scroll", $.proxy(function () {
                var $this = this;
                if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
                    $this.countTo({refreshInterval: 40, speed: $this.attr("data-speed") || 1000});
                    $this.addClass('animated');
                }
            }, $counterNotAnimated)).trigger("scroll");
        }
    }
    if (plugins.isotope.length) {
        var i, isogroup = [];
        for (i = 0; i < plugins.isotope.length; i++) {
            var isotopeItem = plugins.isotope[i], iso = new Isotope(isotopeItem, {
                itemSelector: '.isotope-item',
                layoutMode: isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry',
                filter: '*',
            });
            isogroup.push(iso);
        }
        $(window).on('load', function () {
            setTimeout(function () {
                var i;
                for (i = 0; i < isogroup.length; i++) {
                    isogroup[i].element.className += " isotope--loaded";
                    isogroup[i].layout();
                }
            }, 600);
        });
        var resizeTimout;
        $("[data-isotope-filter]").on("click", function (e) {
            e.preventDefault();
            var filter = $(this);
            clearTimeout(resizeTimout);
            filter.parents(".isotope-filters").find('.active').removeClass("active");
            filter.addClass("active");
            var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]');
            iso.isotope({
                itemSelector: '.isotope-item',
                layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
                filter: this.getAttribute("data-isotope-filter") == '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]',
            });
        }).eq(0).trigger("click")
    }
    if (isDesktop && $html.hasClass("wow-animation") && $(".wow").length) {
        new WOW().init();
    }
    if (plugins.bootstrapTabs.length) {
        var i;
        for (i = 0; i < plugins.bootstrapTabs.length; i++) {
            var bootstrapTabsItem = $(plugins.bootstrapTabs[i]);
            bootstrapTabsItem.on("click", "a", function (event) {
                event.preventDefault();
                $(this).tab('show');
            });
        }
    }
    if (plugins.scroller.length) {
        var i;
        for (i = 0; i < plugins.scroller.length; i++) {
            var scrollerItem = $(plugins.scroller[i]);
            scrollerItem.mCustomScrollbar({scrollInertia: 200, scrollButtons: {enable: true}});
        }
    }
    if (plugins.socialite.length) {
        Socialite.load();
    }
    if (plugins.rdVideoBG.length) {
        var i;
        for (i = 0; i < plugins.rdVideoBG.length; i++) {
            var videoItem = $(plugins.rdVideoBG[i]);
            videoItem.RDVideo({});
        }
    }
    if (plugins.rdInputLabel.length) {
        plugins.rdInputLabel.RDInputLabel();
    }
    if (plugins.regula.length) {
        attachFormValidator(plugins.regula);
    }
    if (plugins.rdMailForm.length) {
        var i, j, k, msg = {
            'MF000': 'Successfully sent!',
            'MF001': 'Recipients are not set!',
            'MF002': 'Form will not work locally!',
            'MF003': 'Please, define email field in your form!',
            'MF004': 'Please, define type of your form!',
            'MF254': 'Something went wrong with PHPMailer!',
            'MF255': 'Aw, snap! Something went wrong.'
        };
        for (i = 0; i < plugins.rdMailForm.length; i++) {
            var $form = $(plugins.rdMailForm[i]);
            $form.attr('novalidate', 'novalidate').ajaxForm({
                data: {"form-type": $form.attr("data-form-type") || "contact", "counter": i},
                beforeSubmit: function () {
                    var form = $(plugins.rdMailForm[this.extraData.counter]);
                    var inputs = form.find("[data-constraints]");
                    if (isValidated(inputs)) {
                        var output = $("#" + form.attr("data-form-output"));
                        if (output.hasClass("snackbars")) {
                            output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
                            output.addClass("active");
                        }
                    } else {
                        return false;
                    }
                },
                error: function (result) {
                    var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output"));
                    output.text(msg[result]);
                },
                success: function (result) {
                    var form = $(plugins.rdMailForm[this.extraData.counter]),
                        output = $("#" + form.attr("data-form-output")), $select = $form.find('select');
                    if ($select.length) {
                        for (j = 0; j < $select.length; j++) {
                            var $selectitem = $($select[j]);
                            $selectitem.select2('val', null);
                        }
                    }
                    form.addClass('success');
                    result = result.length == 5 ? result : 'MF255';
                    output.text(msg[result]);
                    if (result === "MF000") {
                        if (output.hasClass("snackbars")) {
                            output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
                        }
                        output.addClass("success active");
                    } else {
                        if (output.hasClass("snackbars")) {
                            output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
                        }
                        output.addClass("error active");
                    }
                    form.clearForm();
                    form.find('input, textarea').blur();
                    setTimeout(function () {
                        output.removeClass("active error success");
                        form.removeClass('success');
                    }, 5000);
                }
            });
        }
    }
    if (plugins.rdRange.length) {
        plugins.rdRange.RDRange({});
    }
    if (plugins.stacktable.length) {
        var i;
        for (i = 0; i < plugins.stacktable.length; i++) {
            var stacktableItem = $(plugins.stacktable[i]);
            stacktableItem.stacktable();
        }
    }
    if (plugins.customToggle.length) {
        var i;
        for (i = 0; i < plugins.customToggle.length; i++) {
            var $this = $(plugins.customToggle[i]);
            $this.on('click', $.proxy(function (event) {
                event.preventDefault();
                var $ctx = $(this);
                $($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
            }, $this));
            if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
                $("body").on("click", $this, function (e) {
                    if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
                        $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
                    }
                })
            }
        }
    }
    if (plugins.imgZoom.length) {
        var i;
        for (i = 0; i < plugins.imgZoom.length; i++) {
            var $imgZoomItem = $(plugins.imgZoom[i]);
            $imgZoomItem.mag();
        }
    }
    if (plugins.customWaypoints.length) {
        var i;
        for (i = 0; i < plugins.customWaypoints.length; i++) {
            var $this = $(plugins.customWaypoints[i]);
            $this.on('click', function (e) {
                e.preventDefault();
                $("body, html").stop().animate({scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top - 60}, 1000, function () {
                    $(window).trigger("resize");
                });
            });
        }
    }
    if (plugins.pageLoader.length > 0) {
        $window.on("load", function () {
            var loader = setTimeout(function () {
                plugins.pageLoader.addClass("loaded");
                $window.trigger("resize");
            }, 200);
        });
    }
    if (plugins.rdParallax.length) {
        var i;
        $.RDParallax();
        if (!isIE && !isMobile) {
            $(window).on("scroll", function () {
                for (i = 0; i < plugins.rdParallax.length; i++) {
                    var parallax = $(plugins.rdParallax[i]);
                    if (isScrolledIntoView(parallax)) {
                        parallax.find(".rd-parallax-inner").css("position", "fixed");
                    } else {
                        parallax.find(".rd-parallax-inner").css("position", "absolute");
                    }
                }
            });
        }
        $("a[href='#']").on("click", function (event) {
            setTimeout(function () {
                $(window).trigger("resize");
            }, 300);
        });
    }
    if (plugins.vide.length) {
        for (var i = 0; i < plugins.vide.length; i++) {
            var $element = $(plugins.vide[i]), options = $element.data('vide-options'), path = $element.data('vide-bg');
            $element.vide(path, options);
            var videObj = $element.data('vide').getVideoObject();
            if (isNoviBuilder) {
                videObj.pause();
            } else {
                document.addEventListener('scroll', function ($element, videObj) {
                    return function () {
                        if (isScrolledIntoView($element)) videObj.play(); else videObj.pause();
                    }
                }($element, videObj));
            }
        }
    }
    if (plugins.lightGallery.length) {
        for (var i = 0; i < plugins.lightGallery.length; i++) {
            initLightGallery(plugins.lightGallery[i]);
        }
    }
    if (plugins.lightGalleryItem.length) {
        var notCarouselItems = [];
        for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
            if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length && !$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length && !$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
                notCarouselItems.push(plugins.lightGalleryItem[z]);
            }
        }
        plugins.lightGalleryItem = notCarouselItems;
        for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
            initLightGalleryItem(plugins.lightGalleryItem[i]);
        }
    }
    if (plugins.lightDynamicGalleryItem.length) {
        for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
            initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
        }
    }
    if (plugins.maps.length) {
        initMaps();
    }
    if (plugins.materialParallax.length) {
        if (!isNoviBuilder && !isIE && !isMobile) {
            plugins.materialParallax.parallax();
            $window.on('load', function () {
                setTimeout(function () {
                    $window.scroll();
                }, 500);
            });
        } else {
            for (var i = 0; i < plugins.materialParallax.length; i++) {
                var parallax = $(plugins.materialParallax[i]), imgPath = parallax.data("parallax-img");
                parallax.css({"background-image": 'url(' + imgPath + ')', "background-size": "cover"});
            }
        }
    }
});