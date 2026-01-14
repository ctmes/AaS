/**
 * Create Global Alyka object
 */
(function () {
    var root = this;
    var Alyka = function (obj) {
        if (obj instanceof Alyka) {
            return obj;
        }
        if (!(this instanceof Alyka)) {
            return new Alyka(obj);
        }
    };

    root['Alyka'] = Alyka;
}).call(this);

/**
 * This function checks the size of the window to determine mobile view port
 */
Alyka.IsMobile = function () {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width <= 766) {
        return true;
    }
    return false;
};

/**
 * This function checks the size of the window to detect mobile menu
 */
Alyka.IsMobileMenu = function () {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width <= 1024) {
        return true;
    }
    return false;
}

/**
 * This function returns a querystring value by name
 */
Alyka.GetParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var _regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = _regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

/**
 * This function return of browser is IE
 */

Alyka.msieversion = function () {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    ie = false

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        ie = false;
    } else {
        ie = true;
    }

    return ie;
}

/**
 * This function lazy loads images with the lazyload class
 * dependencies: assets/js/vendor/jquery.lazyload.min.js
 */
Alyka.LazyLoad = function () {
    $('.lazyload').lazyload({
        effect: "fadeIn",
        threshold: 400,
        skip_invisible: false
    }).removeClass('lazyload');
};

/**
 * This function handles aria-pressed toggle for clicking on buttons
 */
Alyka.HandleBtnClick = function (e) {
    e = e || window.event;
    var pressed = e.target.getAttribute("aria-pressed") == "true";
    e.target.setAttribute("aria-pressed", pressed ? "false" : "true");
}

/**
 * This function handles aria-pressed toggle for keydown on buttons
 */
Alyka.HandleBtnKeyUp = function (e) {
    e = e || window.event;
    if (e.keyCode === 32) {
        Alyka.HandleBtnClick(event);
    }
}

/**
 * This function detects click or enter key
 */
Alyka.IsClickOrEnter = function (e) {
    return e.which === 1 || e.which === 13;
}

/**
 * This object determines media query
 */
Alyka.isMq = {
    xsm: window.matchMedia('(min-width: 480px)'),
    sm: window.matchMedia('(min-width: 768px)'),
    lg: window.matchMedia('(min-width: 1025px)'),
    xl: window.matchMedia('(min-width: 1400x)')
};

/**
 * IE fallback to includes property
 */
if (!String.prototype.includes) {
    String.prototype.includes = function () {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

/**
 * Load External Script
 */
Alyka.LoadScript = function (url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Single entry point when DOM has finished loading
 */
$(document).ready(function () {
    Alyka.Core._init();
});
$(window).load(function () {
    Alyka.Core._homepagefilter();
});
Alyka.AddThis = {
    _init: function () {
		
		Alyka.AddThis.Cache = {
            $addthis: $('#addthis')
        };
		
        if(Alyka.AddThis.Cache.$addthis.length > 0){
            var _script = document.createElement('script');
            _script.setAttribute('src', 'https://s7.addthis.com/js/300/addthis_widget.js#domready=1');
            
            document.body.appendChild(_script);         
        }
    }
};
Alyka.Core = {
    _init: function () {

        Alyka.Core.Cache = {
            $content: $('#content'),
            $tabs: $('.tabs'),
            $content: $('#content'),
            $scrollContainers: $('html, body'),
            $backToTop: $('#backToTop'),
            $document: $(document),
            $body: $('body'),
            $window: $(window)
        };

        setTimeout(function () {
            Alyka.Core.Cache.$body.addClass('ready');

            setTimeout(function () {
                Alyka.Core.Cache.$body.addClass('complete');


                setTimeout(function () {
                    if ($('#rev_slider_2_1_wrapper').length > 0) {
                        revapi2.revstart()
                    }
                    AOS.init({
                        offset: 0,
                        duration: 600,
                        once: false,
                    });
                }, 1400);

            }, 300);
        }, 300);
        setTimeout(function () {
            $('.remove-anim-trans').addClass('finished');
        }, 2000)
        this._responsiveTables();
        this._backToTop();
        this._tabs();
        this._PhoneNumbers();
        this._imageGallery();
        this._loader();
        this._backTop();
        this._centerSlider();
        this._drawIcons();
        this._applicationTypeDropdown();
        this._logoCenter();
        this._pageTransition();



        Alyka.CustomForm._init();
        Alyka.AddThis._init();
        Alyka.Forms._init();
        Alyka.StandardNavigation._init();
        Alyka.Search._init();
        Alyka.GoogleMap._init();
        Alyka.PageTypeListing._init();
        Alyka.parallaxbackground._init(['parallaxImage']);
        Alyka.GoogleMapMultipleMarkers._init();
        Alyka.LazyLoad();


        this._quotebutton();

        $('img').removeAttr('style');
        $('.wysiwg').find('iframe[src*="youtube"]').wrap("<div class='iframe-wrap'/>");
        if (Alyka.Core.Cache.$content.children().hasClass('hotboxes-landing')) {
            Alyka.Core.Cache.$content.addClass('nopadding')
        }

    },
    _quotebutton: function () {
        $(window).load(function () {
            $('.quote-btn').addClass('animate');
        })
        $(window).scroll(function () {
            if ($('html').scrollTop() > 150) {
                $('.quote-btn').addClass('fixed');
            } else {
                $('.quote-btn').removeClass('fixed');
            }
        })
    },
    _homepagefilter: function () {
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item'
        });

        $('.filters button').on('click keypress', function (e) {
            e.preventDefault();
            $('.grid-item').each(function () {
                $(this).removeClass('girdfirstload');
            })
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });

        // change is-checked class on buttons
        $('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);

            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });
    },
    _backTop: function () {
        $('.back-top').on('click keypress', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: "0"
            }, 1000)
        })
    },
    _imageGallery: function () {
        if ($('#imageGallery').length !== 0) {
            $('#imageGallery').sliderPro({
                width: 300,
                height: 300,
                visibleSize: '100%',
                forceSize: 'fullWidth',
                autoSlideSize: true
            });
        }
    },
    _backToTop: function () {
        Alyka.Core.Cache.$window.scroll(function () {
            var _scroll = Alyka.Core.Cache.$window.scrollTop();

            if (_scroll >= 500) {
                Alyka.Core.Cache.$backToTop.addClass("active");
            } else {
                Alyka.Core.Cache.$backToTop.removeClass("active");
            }
        });
    },
    _PhoneNumbers: function () {
        $('.phonenumber').each(function () {
            var _$this = $(this);
            _$this.wrap('<a href="tel:' + _$this.text().replace(' ', '') + '"></a>');
        });
    },
    _responsiveTables: function () {
        Alyka.Core.Cache.$content.find('table').each(function () {
            $(this).wrap("<div class='responsivetable-wrap'></div>");
            $(this).parent('.responsivetable-wrap').prepend('</span><span class="table-instruction">Scroll sideways</span>')
            $('.responsivetable-wrap').wrap('<div class="responsivetable"></div>');
        });

        $('.responsivetable').on('click keypress', function (e) {
            if (Alyka.IsClickOrEnter(e)) {
                $(this).find('.table-instruction').hide();
            }
        });
    },
    _tabs: function () {
        Alyka.Core.Cache.$tabs.each(function () {
            var _$tabs = $(this);

            _$tabs.find('.uk-tab').children().each(function (i) {
                var _tabName = $(this).children().text();
                _$tabs.find('.uk-switcher').children().eq(i).prepend('<h2 class="tab-toggle" role="button" tabindex="0">' + _tabName + '</h2>');
            });
        });

        $('.tab-toggle').on('click keypress', function (e) {
            if (Alyka.IsClickOrEnter(e)) {
                var _$toggle = $(this);
                _$toggle.parent().toggleClass('uk-active');
            }
        });
    },
    _loader: function () {
        $(window).load(function () {
            if ($('.rev_slider_wrapper').length > 0) {
                setTimeout(function () {
                    $('.loader').addClass('hideloader');
                    $('body').removeAttr('no-scroll');
                    setTimeout(function () {
                        $('body').addClass('hide-loader')
                        $('.header').find('.logo').addClass('showlogo');
                    }, 1500)
                }, 2000)
            } else {
                if ($('.loader').length > 0) {
                    setTimeout(function () {
                        $('.loader').addClass('hideloader');
                        $('.header').find('.logo').removeClass('internal');
                        setTimeout(function () {
                            $('body').addClass('hide-loader')
                            $('.header').find('.logo').addClass('showlogo');
                        }, 1500)
                    }, 2000);
                } else {
                    $('.header').find('.logo').addClass('internal');
                    $('body').removeAttr('no-scroll');
                }
            }


        })
    },
    _centerSlider: function () {
        var element = $('#centerSlider');
        if (element.length > 0) {
            $(window).on('load resize', function () {
                setTimeout(function () {
                    var imgSize = element.find('img').height()
                    $('.nav-wrapper').height(imgSize);
                }, 300)

            })
            if ($(window).width() < 1024) {
                var slider = UIkit.slider(element, {
                    center: false,
                });
            }
        }
    },
    _drawIcons: function () {
        $('.filters-wrapper').find('ul li').on('mouseover', function () {
            if (Alyka.msieversion()) {
                $(this).addClass('active');

            }
        })
        $('.filters-wrapper').find('ul li').on('mouseleave', function () {
            var $this = $(this)
            // setTimeout(function () {
            $this.removeClass('active');
            // }, 1000)
        })
        // case study boxes item
        $('.casestudy-list').on('mouseover', '.casestudies-item', function () {
            if (Alyka.msieversion()) {
                $(this).find('.icon').addClass('active');

            }
        })
        $('.casestudy-list').on('mouseleave', '.casestudies-item', function () {
            var $this = $(this)
            // setTimeout(function () {
            $this.find('.icon').removeClass('active');
            // }, 1000)
        })
    },
    _applicationTypeDropdown: function () {
        $('.filter-mobile').find('h3').on('click', function () {
            $(this).next().slideToggle();
            $(this).toggleClass('active');
        })
    },
    _logoCenter: function () {
        if ($('.loader').find('.tagline').length > 0) {
            var intWidth = $(window).innerWidth();
            var intHeight = $(window).innerHeight();

            var xCenter = intWidth / 2;
            var yCenter = intHeight / 2;

            $('.loader').find('svg').css({
                left: xCenter - 122.5,
                top: yCenter - 90
            })
            if ($(window).scrollTop() > 0) {
                $('.loader').addClass('hideall');
                $('.header').find('.logo').addClass('showlogo');
            } else {
                $('.loader').addClass('animate-hideall');
            }
        }
    },
    _pageTransition: function () {
        $(document).delegate('a', 'click', function (e) {
            e.preventDefault();
            var link = $(this).attr('href'),
                target = $(this).attr('target');
            if (link != "" && target == '_blank') {
                window.open(link);
            } else if (link != "" && link != '#' && link.indexOf("#page") == -1 && !$(this)[0].hasAttribute("data-uk-lightbox")) {
                // $('body').css({'overflow':'hidden'});
                $('.transition').removeClass('remove-anim-trans')
                $('.transition').addClass('anim-trans')
                setTimeout(function () {
                    window.location = link;
                }, 1600)
            }
        })
    },
    _sendFormAnimation: function (url, res) {
        if (res) {
            $('.custom-form').addClass('submit');
            var icon = $('.btn-wrapper');
            icon.find('.hidethisAfterPostback').hide()
            $('html, body').animate({
                scrollTop: Alyka.CustomForm.Cache.$customForm.offset().top
            }, 300);
            setTimeout(function () {
                window.location.href = url;
            }, 2500);
        }
    }
};
Alyka.CustomForm = {
    _init: function () {

        Alyka.CustomForm.Cache = {
            $customForm: $('#customform'),
            $formItem: $('.form-item'),
            $initialItem: $('.form-item.initial-item'),
            $btnwrapper: $('.btn-wrapper')
        }

        Alyka.CustomForm.isValid = false;
        if (Alyka.CustomForm.Cache.$customForm.length > 0) {
            Alyka.CustomForm._showFields(Alyka.CustomForm.Cache.$initialItem);
            // this._findField();
            this._showForms();
            this._animateicon();
            this._showSelectedOptions();
            this._noUislider();
            Alyka.CustomForm.isValid = $('.error').is(':visible');
            //this._submit();
        }
         if ($('.captcha').length) {
            const captcha = new Captcha($('#canvas'),{
                length: 5,
                width: 150,
                height: 60,
                caseSensitive:true,
                font:'bold 23px Arial',
                resourceType:'aA0',
              });
    
            $('.captcha-val').on('click keypress', function(e){
                var captchaVal = false;
                const ans = captcha.valid($('input[name="captcha"]').val());
    
                console.log(ans)
                
                if (ans == false) {
                    e.preventDefault();
                    $('.captcha-error').show();
                } else {
                    $('.captcha-error').hide();
                }
    
            })
    
            $('.captcha-refresh').on('click keypress', function(e){
                e.preventDefault();
                captcha.refresh();
            })   
         }

    },
    _submit: function () {
        var _animationDone = false;
        
        Alyka.CustomForm.Cache.$btnwrapper.find('.btn-border').on('click keypress', function (e) {
            if (_animationDone) {
                _animationDone = false;
                return;
            }

            e.preventDefault();

            if (!$('.error').is(':visible')) {
                Alyka.CustomForm.isValid = true;
                setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: Alyka.CustomForm.Cache.$customForm.offset().top
                    }, 300)
                    $('.custom-form').addClass('submit');
                    _animationDone = true;
                    $(this).trigger('click');
                }, 50);
            }

            
        });
    },
    _findField: function () {
        // Alyka.CustomForm.Cache.$initialItem.focus();
        Alyka.CustomForm.Cache.$formItem.find('input').on("keypress", function (e) {
            if (e.keyCode == 13) {
                var field = $(this).parents('.form-item').next();

                if (Alyka.CustomForm._validation()) {
                    Alyka.CustomForm._showFields(field);
                }

            }
        });

    },
    _showFields: function (el) {
        el.show();
        setTimeout(function () {
            el.find('input').focus();
        }, 20);

    },
    _validation: function () {
        var validation = false;
        Alyka.CustomForm.Cache.$formItem.each(function () {
            if ($(this).is(':visible')) {

                if (!$(this).find('input').val()) {
                    $(this).find('.error').addClass('show');
                    validation = false;
                } else if ($(this).find('input[type=email]').length > 0) {
                    var email = $(this).find('input').val();
                    var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!emailReg.test(email)) {
                        $(this).find('.error').addClass('show');
                        validation = false;
                    } else {
                        $(this).find('.error').removeClass('show');
                        validation = true;
                    }
                } else {
                    $(this).find('.error').removeClass('show');
                    validation = true;
                }
            }

        })
        return validation;
    },
    _showForms: function () {
        var formOption = $('#formOtions');
        formOption.find('a').on('click', function (e) {
            e.preventDefault();
            var form = $(this).attr('id');
            formOption.find('a').removeClass('active');
            $('.form2 , .form3').removeClass('active');
            $('.btn-wrapper').removeClass('form2askbutton');
            $('.form2, .form3, .arrow').hide();

            $('.' + form + ', .options').show();
            $('.' + form).addClass('active');
            $(this).addClass('active');
            $('.btn-wrapper').addClass(form + 'askbutton');
            $('.options').addClass('selection');
        })
    },
    _animateicon: function () {
        $('.quote-item').find('ul li').on('mouseover', function () {
            if (Alyka.msieversion()) {
                if (!$(this).hasClass('radio-wrapper')) {
                    $(this).addClass('active');
                }
            }
        })
        $('.quote-item').find('ul li').on('mouseleave', function () {
            var $this = $(this)
            // setTimeout(function(){
            if (!$(this).hasClass('radio-wrapper')) {
                $this.removeClass('active');
            }
            // },500)
        })
    },
    _showSelectedOptions: function () {
        var apptype = $('.app-type');
        apptype.find('input[type=checkbox]').click(function () {
            apptype.find('.label-wrapper span').remove();
            apptype.find('input[type=checkbox]:checked').each(function () {
                var checkedVal = $(this).parent().find('h4').text();
                console.log(checkedVal);
                apptype.find('.label-wrapper').append('<span>' + checkedVal + '</span>');
            })
        });

        var industrytype = $('.industry-type');
        industrytype.find('input[type=checkbox]').click(function () {
            industrytype.find('.label-wrapper span').remove();
            industrytype.find('input[type=checkbox]:checked').each(function () {
                var checkedVal = $(this).parent().find('h4').text();
                industrytype.find('.label-wrapper').append('<span>' + checkedVal + '</span>');
            })
        });

        var maxload = $('.max-load');
        maxload.find('input[type=radio]').click(function () {
            maxload.find('.label-wrapper span').remove();
            maxload.find('input[type=radio]:checked').each(function () {
                var checkedVal = $(this).parent().find('span').text();
                maxload.find('.label-wrapper').append('<span>AROUND ' + checkedVal + '</span>');
            })
        });

        var areaRequired = $('.area-required');
        areaRequired.find('input[type=number]').on('keyup', function () {
            areaRequired.find('.label-wrapper span').remove();
            var area1 = $('.area1').val();
            var area2 = $('.area2').val();
            areaRequired.find('.label-wrapper').append('<span>' + area1 + 'M x ' + area2 + 'm</span>');
            if (area1 == '' && area2 == '') {
                areaRequired.find('.label-wrapper span').remove();
            }
        });


    },

    _noUislider: function () {
        if ($('#durationSlider').length > 0) {
            var keypressSlider = document.getElementById('durationSlider');
            var durationFrom = $('#durationForm');
            var durationTo = $('#durationTo');
            noUiSlider.create(keypressSlider, {
                start: 5,
                connect: true,
                tooltips: true,
                range: {
                    'min': [1, 1],
                    '6.25%': [2, 1],
                    'max': 12
                },
                format: {
                    to: function (value) {
                        if ($(window).width() > 1024) {
                            if (value == 1) {
                                return value + ' MONTH';
                            } else if (value == 12) {
                                return 'OVER 12 MONTHS';
                            } else {
                                return value + ' MONTHS';
                            }
                        } else {
                            if (value == 12) {
                                return value;
                            } else {
                                return value
                            }

                        }
                    },
                    from: function (value) {
                        return value;
                    }
                }
            });
            keypressSlider.noUiSlider.on('update', function (values, handle) {
                durationFrom.val(values[0])
                durationTo.val(values[1])
            });

            // To disable one handle
            // var origins = keypressSlider.getElementsByClassName('noUi-origin');
            // origins[1].setAttribute('disabled', true);
        }

        if ($('#maxLoadSlider').length > 0) {
            var maxLoadSlider = document.getElementById('maxLoadSlider');
            var maxloadFrom = $('#maxloadFrom');
            noUiSlider.create(maxLoadSlider, {
                start: 0.9,
                // padding: [0.9, 750],
                // connect: true,
                tooltips: true,
                // range: {
                //     'min': 1,
                //     '3%': [10, 10],
                //     '80%': [80, 10],
                //     'max': 3200
                // },
                range: {
                    'min': 0,
                    '6%': [0.9, 1],
                    '18.5%': [10, 10],
                    '31%': [50, 10],
                    '43.5%': [150, 10],
                    '56%': [250, 10],
                    '69%': [450, 10],
                    '82%': [700, 10],
                    '90%': [750, 10],
                    'max': 3200
                },

                format: {
                    to: function (value) {
                        if (value < 1) {
                            return '<1T';
                        }
                        if (value > 750) {
                            return '>750T';
                        } else {
                            value = parseInt(value)
                            var load = value + 'T';
                            return load;
                        }
                    },
                    from: function (value) {
                        return value;
                    }
                }
            });
            maxLoadSlider.noUiSlider.on('update', function (values, handle) {

                var value = parseInt(values[0]);
                $('.max-load-wrapper').find('.radio-wrapper').removeClass('active');
                $('.max-load-wrapper').find('.max-load' + value).addClass('active');
                var load = value + 'T';
                if (values[0] == '<1T') {
                    $('.tons').text('LESS THAN 1 TONNE');
                    $('.max-load-wrapper').find('.max-loadkg').addClass('active');
                    load = 'LESS THAN 1 TONNE';
                } else if (values[0] == '>750T') {
                    $('.max-load-wrapper').find('.max-load3200').addClass('active');
                    $('.tons').text('over 750 tonnes');
                    load = 'over 750 tonnes';
                } else {
                    $('.tons').text('around ' + value + 'T');

                }
                maxloadFrom.val(load);
            });
        }
    },
};
Alyka.Forms = {
    _init: function () {
		
        this._styledSelectBoxes();
        this._styledfileUploader();
        this._datePicker();

        $('.form-row').each(function () {
            var _$this = $(this);
            if (_$this.find('.form-control').length === 0 && _$this.find('input').length === 0 && _$this.find('select').length === 0) {
                _$this.css('margin', 0);
            }
        });
    },
    _styledfileUploader: function () {
        $('input[type=file]').each(function () {
            var $btnid = $(this).attr('id');
            console.log($btnid);
            $(this).after('<label class="test" for="'+$btnid+'"><span class="upload-label"></span> <strong>Upload</strong></label>');
            var $input = $(this),
                $label = $input.next(),
                labelVal = $label.html();

            $input.on('change', function (e) {
                var fileName = '';

                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else if (e.target.value)
                    fileName = e.target.value.split('\\').pop();
                if (fileName)
                    $label.find('span').html(fileName);
                else
                    $label.html(labelVal);
            });

            // Firefox bug fix
            $input
                .on('focus', function () {
                    $input.addClass('has-focus');
                })
                .on('blur', function () {
                    $input.removeClass('has-focus');
                });
        });
    },
    _datePicker: function () {
        $('.datepickercontrol').each(function () {
            var _$this = $(this);
            $A.setCalendar('UniqueCalendarId', _$this.find('a')[0], _$this.find('input')[0], false, function (ev, dc, targ) {

                var _day = dc.range.current.mDay;
                if (_day < 10) {
                    _day = '0' + _day;
                }
                var _month = dc.range.current.month + 1;
                if (_month < 10) {
                    _month = '0' + _month;
                }

                targ.value = _day + '/' + _month + '/' + dc.range.current.year;
                dc.close();
            });
        });
    },
    _styledSelectBoxes: function () {
        $('select').selectBoxIt({
            autoWidth: false
        });        
    }
};
Alyka.GoogleMap = {
    _init: function () {
		
		Alyka.GoogleMap.Cache = {
		    $mapContainer: $('.googlemapcontainer')
        }

        if (Alyka.GoogleMap.Cache.$mapContainer.length > 0) {
            this._loadScript();
        }
    },
    _loadScript: function () {
        var _script = document.createElement('script');
        _script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + Alyka.GoogleMap.Cache.$mapContainer.eq(0).data().key +  '&callback=Alyka.GoogleMap._create');
        
        document.body.appendChild(_script);
    },
    _create: function () {
        Alyka.GoogleMap.Cache.$mapContainer.each(function() {
            var _$map = $(this),
                _data = _$map.data(),
                _mapType;

            switch(_data.maptype) {
                case 'satellite':
                    _mapType = google.maps.MapTypeId.SATELLITE
                    break;
                case 'hybrid':
                    _mapType = google.maps.MapTypeId.HYBRID
                    break;
                case 'terrain':
                    _mapType = google.maps.MapTypeId.TERRAIN
                    break;
                default:
                    _mapType = google.maps.MapTypeId.ROADMAP
            }        

            _$map.css({
                width: _data.width,
                height: _data.height
            });

            var _latlng = new google.maps.LatLng(_data.latitude, _data.longitude);

            if(_$map.hasClass('styled')){
            var _mapOptions = {
                zoom: _data.zoomlevel,
                center: _latlng,
                mapTypeId: _mapType,
                styles:[
                    {
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#f5f5f5"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.icon",
                      "stylers": [
                        {
                          "visibility": "off"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#616161"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.stroke",
                      "stylers": [
                        {
                          "color": "#f5f5f5"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.land_parcel",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#bdbdbd"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#eeeeee"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#757575"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#e5e5e5"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#9e9e9e"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#ffffff"
                        }
                      ]
                    },
                    {
                      "featureType": "road.arterial",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#757575"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#dadada"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#616161"
                        }
                      ]
                    },
                    {
                      "featureType": "road.local",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#9e9e9e"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.line",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#e5e5e5"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.station",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#eeeeee"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#c9c9c9"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#9e9e9e"
                        }
                      ]
                    }
                  ]
            }; 
            }
            else{
                var _mapOptions = {
                    zoom: _data.zoomlevel,
                    center: _latlng,
                    mapTypeId: _mapType,
                    scrollwheel: false
                }; 
            }

            var _map = new google.maps.Map(_$map[0], _mapOptions);

            var _marker = new google.maps.Marker({
                position: _latlng,
                map: _map,
                icon: _data.pin
            });

            google.maps.event.addListener(_marker, 'click', (function (marker) {
              window.open('https://www.google.com/maps/?q=' + _data.latitude + ',' + _data.longitude);
           }));
        });
    }
};
Alyka.GoogleMapMultipleMarkers = {
  _init: function () {

    Alyka.GoogleMapMultipleMarkers.Cache = {
      $mapContainer: $('#googleMapMultiContainer'),
      $animationContainer: $('body, html'),
      $mapCanvas: $('#mapCanvas'),
      $infoWindowTemplate: $('#tplWindow'),
      $mapLocationList: $('#mapLocationsList'),
      $mapLocationListTemplate: $('#tplmapLocationsList')
    }

    if (Alyka.GoogleMapMultipleMarkers.Cache.$mapContainer.length > 0) {
      Alyka.GoogleMapMultipleMarkers._createMap(window.JsonData.Results);
      // the smooth zoom function

    }
  },
  _smoothZoom: function (map, max, cnt) {

    if (cnt >= max) {
      return;
    } else {
      z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
        google.maps.event.removeListener(z);
        smoothZoom(map, max, cnt + 1);
      });
      setTimeout(function () {
        map.setZoom(cnt)
      }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems

    }
  },
  _createMap: function (jsonData) {
    var mapdata = Alyka.GoogleMapMultipleMarkers.Cache.$mapContainer.data();
    var _lngLat = new google.maps.LatLng(mapdata.latitude, mapdata.longitude);
    var _zoomLevel = mapdata.zoomlevel;
    if (Alyka.IsMobile()) {
      _zoomLevel = 2;
    }
    var map = new google.maps.Map(Alyka.GoogleMapMultipleMarkers.Cache.$mapCanvas[0], {
      center: _lngLat,
      zoom: _zoomLevel,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: 'greedy',
      scrollwheel: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      styles: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        },
        {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        },
        {
          "featureType": "administrative.locality",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.province",
          "stylers": [{
            "visibility": "on"
          }]
        },
        {
          "featureType": "poi",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        },
        {
          "featureType": "road",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dadada"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        },
        {
          "featureType": "transit",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#c9c9c9"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }
      ]
    });
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 3,
      strokeColor: '#f7941d',
    };
    var flightPlanCoordinates = [{
        lat: -31.95431,
        lng: 115.85726
      },
      {
        lat: -27.308314,
        lng: 152.975757
      },
      {
        lat: 1.328317,
        lng: 103.753616
      },
      
      {
        lat: 1.328317,
        lng: 103.753616
      },
      {
        lat: -31.95431,
        lng: 115.85726
      },
      {
        lat: -37.817067,
        lng: 144.959725
      },
      {
        lat: -27.308314,
        lng: 152.975757
      }
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '20px'
      }],
      geodesic: true,
      map: map
    });
    animateCircle(flightPath);

    function animateCircle(line) {
      var count = 0;
      window.setInterval(function () {
        count = (count + 1) % 600;

        var icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
      }, 600);
    }
    flightPath.setMap(map);
    var markers = [];

    var infobox = new InfoBox({
      disableAutoPan: false,
      alignBottom: true,
      pixelOffset: new google.maps.Size(0, -35),
      zIndex: null,
      closeBoxURL: mapdata.closeicon,
      infoBoxClearance: new google.maps.Size(1, 1)
    });

    $(document).on("click", '.viewLocation', function (e) {
      e.preventDefault();

      if (Alyka.IsMobile()) {
        Alyka.GoogleMapMultipleMarkers.Cache.$animationContainer.animate({
          scrollTop: Alyka.GoogleMapMultipleMarkers.Cache.$mapCanvas.offset().top - 100
        }, 800);
      }

      google.maps.event.trigger(markers[$(this).data('id')], 'click');
    });

    this._setMarkers(jsonData, map, mapdata, markers, infobox, _zoomLevel);

  

    var _homeListTemplate = Handlebars.compile(Alyka.GoogleMapMultipleMarkers.Cache.$mapLocationListTemplate.html());
    Alyka.GoogleMapMultipleMarkers.Cache.$mapLocationList.html(_homeListTemplate(markers));
  },
  _setMarkers: function (jsonData, map, mapdata, markers, infobox, _zoomLevel) {
    var bounds = new google.maps.LatLngBounds();
    if (jsonData) {
      for (var i = 0; i < jsonData.length; i++) {
        var _location = jsonData[i];
        var _pin  = mapdata.pin;
        if (Alyka.IsMobile()) {
          _pin = '/assets/images/googlemapmarkermobile.png';
        }
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(_location.Latitude, _location.Longitude),
          map: map,
          animation: google.maps.Animation.DROP,
          icon: _pin,
          LocationTitle: _location.Title,
          Address: _location.Address,
          Phone1: _location.Phone1,
          Phone2: _location.Phone2,
          Email: _location.Email,
          Url: _location.Url,
          Latitude: _location.Latitude,
          Longitude: _location.Longitude,
          Image: _location.Image,
          Index: i
        });
        bounds.extend(marker.getPosition());
        var _setzoom = 5;
        if (Alyka.IsMobile()) {
          _setzoom = 3;
        }
        var template = Handlebars.compile(Alyka.GoogleMapMultipleMarkers.Cache.$infoWindowTemplate.html());
        google.maps.event.addListener(marker, 'click', (function (marker) {
          return function () {
            infobox.setContent(template(marker));
            infobox.setPosition(marker.position);
            infobox.open(map);
            map.setZoom(_setzoom);
            map.setCenter(marker.getPosition());
          // Alyka.GoogleMapMultipleMarkers._smoothZoom(map, 12, map.getZoom());
          };
        })(marker));

        markers.push(marker);
        google.maps.event.addListener(map, 'zoom_changed', function () {
          zoomChangeBoundsListener =
            google.maps.event.addListener(map, 'bounds_changed', function (event) {
              if (this.getZoom() > _zoomLevel && this.initialZoom == true) {
                // Change max/min zoom here
                this.setZoom(_zoomLevel);
                this.initialZoom = false;
              }
              google.maps.event.removeListener(zoomChangeBoundsListener);
            });
        });
        map.initialZoom = true;
        map.fitBounds(bounds);
        if (window.innerWidth > 800) {
          map.panBy(0, 0)
        }
      }
    }
    google.maps.event.addListener(infobox, 'closeclick', function () {

      $('.infoWindow').hide();
      map.fitBounds(bounds);
     // Alyka.GoogleMapMultipleMarkers._smoothZoom(map, 12, map.getZoom());
    });
  
  }
};
Alyka.PageTypeListing = {
    _init: function () {
        
		Alyka.PageTypeListing.Cache = {
            $pageTypeListing: $('#pageTypeListing'),
		    $pageTypeListingResults: $('#pageTypeListing-results'),
            $pageTypeListingTemplate: $('#pageTypeListing-template'),
            $sortBy: $('#sortBy'),
            $clearFilter: $('#clearFilter'),
            $btnToggleFilter: $('.filter-toggle'),
            $btnCloseFilter: $('.filter-close'),
            $checkboxFilterToggles: $('#checkboxFilterToggles'),
            $textFilter: $('#textfilter'),
            $recordcount: $('#recordcount'),
            $applyFilterBtn: $('#applyFilterBtn'),
            $scrollContainers: $('html, body'),
            searchType: { 
                filter: 0, 
                paging: 1,
                sorting: 2,
                clearing: 3
            },
            pagingType: { 
                none: '',
                pagenmubers: 'pagenumbers', 
                loadmore: 'loadmore',
                loadmorelazy: 'loadmorelazy',
                nextprevious: 'nextprevious'
            },
            FilteringType: { 
                manual: 'manual',
                automatic: 'automatic'
            }
        };
        
        if(Alyka.PageTypeListing.Cache.$pageTypeListing.length > 0){
            var _data = Alyka.PageTypeListing.Cache.$pageTypeListing.data();
            
            Alyka.PageTypeListing.PagingType = _data.pagingtype;
            Alyka.PageTypeListing.HasSorting = _data.sorting;
            Alyka.PageTypeListing.Filtering = _data.filtering;
            Alyka.PageTypeListing.ClearFilter = _data.clearfilter;
            
            if(Alyka.PageTypeListing.HasSorting){
                this._sorting();
            }            
            
            if(Alyka.PageTypeListing.Filtering){
                Alyka.PageTypeListing.FilteringType = _data.filteringtype;
                this._filters();
            }
            
            if(Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.none){
                this._bindToTemplate(window.JsonData.Results);
            }
            else{
                Alyka.PageTypeListing.PageNumber = 1;
                Alyka.PageTypeListing.PageSize = _data.pagesize;  
                Alyka.PageTypeListing.Data = window.JsonData.Results;
                Alyka.PageTypeListing.RecordCount = Alyka.PageTypeListing.Data.length;
                Alyka.PageTypeListing.ManualStateChange = true;
                
                if (window.location.search !== '') {
                    this._setValues(); 
                }
                
                if(Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.loadmore || Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.loadmorelazy){
                    this._loadMore();
                    
                    if(Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.loadmorelazy){
                        this._loadMoreLazy();
                    }
                }
                
                this._search(Alyka.PageTypeListing.FilterData);
            }
        }
        
        History.Adapter.bind(window, 'statechange', function (e) {
            var _state = History.getState();
            Alyka.PageTypeListing._search(_state.data);
        });
    },
    _clearFilters: function () {
        Alyka.PageTypeListing.Cache.$pageTypeListingResults.html("");
        Alyka.PageTypeListing.IsClearing = true;
        Alyka.PageTypeListing.SearchType = Alyka.PageTypeListing.Cache.searchType.clearing;
        // Alyka.PageTypeListing.Cache.$clearFilter.hide();
        for (var i = 0; i < Alyka.PageTypeListing.Filters.length; i++) {
            var _$filter = $(Alyka.PageTypeListing.Filters[i]);
            var _filterType = _$filter.data().filtertype;
            var _filterName = _$filter.data().filtername;
            
            switch(_filterType) {
                case 'checkbox':
                    _$filter.find('input[type=checkbox]').prop('checked', false);
                    window[_filterName] = [];
                    break;
                case 'radiobutton':
                    _$filter.find('input[type=radio]').prop('checked', false);
                    window[_filterName] = [];
                    break;
                case 'dropdown':
                    if(_$filter.find('select').data("selectBoxSelectBoxIt") !== undefined){
                        _$filter.find('select').data("selectBoxSelectBoxIt").selectOption('');
                    }
                    else{
                        _$filter.find('select').val('');
                    }
                    
                    window[_filterName] = '';
                    break;
                case 'text':
                    _$filter.find('input[type=text]').val('');
                    break;
            }
        }
        
        Alyka.PageTypeListing.IsClearing = false;
        Alyka.PageTypeListing.FilterData = {};
        Alyka.PageTypeListing._updateUrlWithFacets();
        Alyka.PageTypeListing.Cache.$clearFilter.hide();
    },
    _sorting: function () {
        Alyka.PageTypeListing.SortBy = Alyka.PageTypeListing.Cache.$sortBy.val(); 
        Alyka.PageTypeListing.Cache.$sortBy.change(function() {
            if(!Alyka.PageTypeListing.SettingValues){
                Alyka.PageTypeListing.PageNumber = 1;
                Alyka.PageTypeListing.SortBy = this.value;
                Alyka.PageTypeListing.SearchType = Alyka.PageTypeListing.Cache.searchType.sorting;
                Alyka.PageTypeListing._setFilterData();
                Alyka.PageTypeListing._updateUrlWithFacets();
            }
        });
    },
    _filters: function () {
        Alyka.PageTypeListing.Filters = $('[data-filter-item]');
        
        for (var i = 0; i < Alyka.PageTypeListing.Filters.length; i++) {
            var _$filter = $(Alyka.PageTypeListing.Filters[i]);
            var _filterType = _$filter.data().filtertype;
            var _filterName = _$filter.data().filtername;
            
            switch(_filterType) {
                case 'checkbox':
                    
                    window[_filterName] = [];
                    
                    _$filter.find('input').on('click', function (e) {
                        if(!Alyka.PageTypeListing.IsClearing){
                            var _checkbox = e.target;
                            var _action = (_checkbox.checked ? 'add' : 'remove');
                            var _id = _checkbox.value;
                            var _filterName = $(e.target).parents('[data-filter-item]').data('filtername');

                            if (_action === 'add') {
                                window[_filterName].push(_id);
                            }
                            if (_action === 'remove') {
                                window[_filterName].splice(window[_filterName].indexOf(_id), 1);
                            }    

                            Alyka.PageTypeListing._setNewDataAndUpdate(); 
                        }
                    });  
                    
                    break;
                case 'radiobutton':

                    window[_filterName] = [];

                    _$filter.find('input').on('click', function (e) {
                        if (!Alyka.PageTypeListing.IsClearing) {
                            var _radiobutton = e.target;
                            var _id = _radiobutton.value;
                            var _filterName = $(e.target).parents('[data-filter-item]').data('filtername');
                            window[_filterName] = _id;

                            Alyka.PageTypeListing._setNewDataAndUpdate();
                        }
                    });

                    break;   
                case 'dropdown':
                    
                    window[_filterName] = '';
                    
                    _$filter.find('select').on('change', function (e) {
                        if(!Alyka.PageTypeListing.IsClearing){
                            var _dropdown = e.target;
                            var _id = _dropdown.value;
                            var _filterName = $(e.target).parents('[data-filter-item]').data('filtername');

                            window[_filterName] = _id;

                            Alyka.PageTypeListing._setNewDataAndUpdate(); 
                        }
                    });  
                    break;
            }
        }
        
        if(Alyka.PageTypeListing.FilteringType === Alyka.PageTypeListing.Cache.FilteringType.manual){
            Alyka.PageTypeListing.Cache.$applyFilterBtn.on('click', function (e) {
                e.preventDefault();
                if(Alyka.IsClickOrEnter(e)){
                    Alyka.PageTypeListing._updateUrlWithFacets();
                }
            });
        }
        else{
            Alyka.PageTypeListing.Cache.$textFilter.keyup(function () {
                Alyka.PageTypeListing._setNewDataAndUpdate();
            });  
        }
        
        if(Alyka.PageTypeListing.ClearFilter){
            Alyka.PageTypeListing.Cache.$clearFilter.on('click', function (e) {
                Alyka.PageTypeListing._clearFilters();
                Alyka.PageTypeListing.Cache.$clearFilter.removeClass('active');
            }); 
        }
        
        if(Alyka.PageTypeListing.Cache.$checkboxFilterToggles.length > 0){
            Alyka.PageTypeListing.Cache.$btnToggleFilter.on('click keypress', function (e) {
                if(Alyka.IsClickOrEnter(e)){
                    var _$this = $(this);
                    _$this.parents('.filter-option').siblings().find('.filter-dropdown').hide();
                    _$this.siblings('div').toggle();
                    return false;
                }
            });   

            Alyka.PageTypeListing.Cache.$btnCloseFilter.on('click keypress', function (e) {
                if(Alyka.IsClickOrEnter(e)){
                    $(this).parent().hide();
                }
            });   
            
            $(document).on('click', function (e) {
                var _$target = $(e.target).parents('.filter-option');
                if (_$target.length  === 0){
                    $('.filter-dropdown').hide();
                } 
            }); 
            
        }
    },
    _paging: function () {
        $('#pagenumbers').remove();
        
        if(Alyka.PageTypeListing.PageSize < Alyka.PageTypeListing.FilteredRecordCount){
            $('.casestudy-list').append('<div id="pagenumbers" class="pagenumbers"><ul id="uk-pagination" class="uk-pagination"></ul></div>');
            Alyka.PageTypeListing.Pagination = UIkit.pagination('#uk-pagination', {
                items: Alyka.PageTypeListing.FilteredRecordCount,
                itemsOnPage: Alyka.PageTypeListing.PageSize,
                displayedPages: 3,
                edges: 1,
                currentPage: Alyka.PageTypeListing.PageNumber - 1
            });

            var _$pagenumbers = $('#pagenumbers');

            _$pagenumbers.prepend('<span id="previousPage" class="prev" role="button" tabindex="0">Previous</span>').append('<span id="nextPage" class="next" role="button" tabindex="0">Next</span>');

            if(Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.nextprevious){
                $('#uk-pagination').hide();
                $('#previousPage').before('<span id="backToStart" class="backtostart disabled" role="button" tabindex="0">Back To Start</span>');
                $('#nextPage').after('<span id="pagecount">' + Alyka.PageTypeListing.PageNumber + ' of ' + Math.ceil(Alyka.PageTypeListing.FilteredRecordCount / Alyka.PageTypeListing.PageSize) + '</span>');
                _$pagenumbers.addClass('nextprevious');
                if(Alyka.PageTypeListing.PageNumber > 1){
                    $('#backToStart').removeClass('disabled');
                }
            }    
            else{
                _$pagenumbers.addClass('pagination');
            }

            $('#nextPage').on('click keypress', function (e) {
                if(Alyka.IsClickOrEnter){
                    var _next = _$pagenumbers.find('.uk-active').next();
                    _next.find('a').click();  
                }
            });

            $('#previousPage').on('click keypress', function (e) {
                if(Alyka.IsClickOrEnter){
                    var _prev = _$pagenumbers.find('.uk-active').prev();
                    _prev.find('a').click();     
                }
            });

            $('#backToStart').on('click keypress', function (e) {
                if(Alyka.IsClickOrEnter){
                    var _first = _$pagenumbers.find('a').first();
                    _first.click();
                    $(this).addClass('disabled');
                }
            });

            Alyka.PageTypeListing.Cache.$pageTypeListing.find('ul').on('select.uk.pagination', function(e, pageIndex){
                Alyka.PageTypeListing.SearchType = Alyka.PageTypeListing.Cache.searchType.paging;
                Alyka.PageTypeListing.PageNumber = pageIndex + 1;
                Alyka.PageTypeListing._updateUrlWithFacets();

                setTimeout(function(){
                    Alyka.PageTypeListing.Cache.$scrollContainers.animate({
                        scrollTop: Alyka.PageTypeListing.Cache.$pageTypeListingResults.offset().top - 120
                    }, 1000); 
                }, 200)

                // var _$parentDoc = $(parent.document);
                // if(_$parentDoc.length > 0){
                //     _$parentDoc.find('html, body').animate({
                //         scrollTop: Alyka.PageTypeListing.Cache.$pageTypeListingResults.offset().top - 40
                //     }, 200); 
                // }
            });      
        }
    },
    _loadMore: function () {
        if(Alyka.PageTypeListing.PageSize < Alyka.PageTypeListing.RecordCount){
            Alyka.PageTypeListing.Cache.$pageTypeListing.append('<button id="btnLoadMore" class="btn btnLoadmore">view more articles</button>');
            
            Alyka.PageTypeListing.Cache.$btnLoadMore = $('#btnLoadMore');
            
            Alyka.PageTypeListing.Cache.$btnLoadMore.on('click keypress', function (e) {
                Alyka.PageTypeListing.LazyTriggered = true; 
                Alyka.PageTypeListing.SearchType = Alyka.PageTypeListing.Cache.searchType.paging;
                if(Alyka.IsClickOrEnter(e)){
                    e.preventDefault();
                    Alyka.PageTypeListing.PageNumber +=1;
                    Alyka.PageTypeListing._search(Alyka.PageTypeListing.FilterData);
                }
            });
        }
    },
    _loadMoreLazy: function () {
        Alyka.PageTypeListing.LazyTriggered = false;
        Alyka.PageTypeListing.IsLoading  = false;
        
        $(window).scroll(function () {
            var _$window = $(this);

            if (_$window.scrollTop() + _$window.height() >= $('footer').offset().top && !Alyka.PageTypeListing.IsLoading && Alyka.PageTypeListing.LazyTriggered) {
                if (Alyka.PageTypeListing.Cache.$pageTypeListingResults.children().length !== Alyka.PageTypeListing.RecordCount) {
                    Alyka.PageTypeListing.PageNumber +=1;
                    Alyka.PageTypeListing._search(Alyka.PageTypeListing.FilterData);
                }
            }
        });       
    },
    _setValues: function () {
        Alyka.PageTypeListing.SettingValues = true;

        for (var i = 0; i < Alyka.PageTypeListing.Filters.length; i++) {
            var _$filter = $(Alyka.PageTypeListing.Filters[i]);
            var _filterType = _$filter.data().filtertype;
            var _filterName = _$filter.data().filtername;
            var _val = Alyka.GetParameterByName(_filterName);
            
            if(_val !== ''){
                switch(_filterType) {
                    case 'checkbox':
                        _val = _val.split(',');

                        for (var x = 0; x < _val.length; x++) {
                            for (var y = 0; y < _$filter.find('input').length; y++) {
                                var _checkbox = _$filter.find('input')[y];

                                if(_checkbox.value == _val[x]){
                                    _checkbox.checked = true;
                                }
                            }
                            window[_filterName].push(_val[x]);
                        }

                        break;
                    case 'dropdown':
                        if(_$filter.find('select').data("selectBoxSelectBoxIt") !== undefined){
                            _$filter.find('select').data("selectBoxSelectBoxIt").selectOption(_val)
                        }
                        else{
                            _$filter.find('select').val(_val)
                        }

                        window[_filterName] = _val;
                        break;
                    case 'radiobutton':
                        _$filter.find('input[value="'+_val+'"]').prop('checked', true)

                        window[_filterName] = _val;
                        break;
                    case 'text':
                        _$filter.find('input[type=text]').val(_val); 
                        break;
                } 
            }
        }
        
        if(Alyka.PageTypeListing.HasSorting){
            var _sort = Alyka.GetParameterByName('sort');
            if(_sort !== ''){
                Alyka.PageTypeListing.Cache.$sortBy.data("selectBoxSelectBoxIt").selectOption(_sort);
                Alyka.PageTypeListing.SortBy = _sort;
            } 
        }
        
        var _page = Alyka.GetParameterByName('page');
        if(_page !== ''){
            Alyka.PageTypeListing.PageNumber = parseInt(_page, 10);
        }
        
        Alyka.PageTypeListing._setFilterData();
        Alyka.PageTypeListing.SettingValues = false;
    },
    _setNewDataAndUpdate: function () {
        if(!Alyka.PageTypeListing.SettingValues){
            Alyka.PageTypeListing.PageNumber = 1;
            Alyka.PageTypeListing.SearchType = Alyka.PageTypeListing.Cache.searchType.filter;

            this._setFilterData();
            if(Alyka.PageTypeListing.FilteringType === Alyka.PageTypeListing.Cache.FilteringType.automatic){
                this._updateUrlWithFacets();
            }
        }
    },
    _setFilterData: function () {
        Alyka.PageTypeListing.LazyTriggered = false; 
        Alyka.PageTypeListing.FilterData = {};
        
        for (var i = 0; i < Alyka.PageTypeListing.Filters.length; i++) {
            var _$filter = $(Alyka.PageTypeListing.Filters[i]);
            var _filterType = _$filter.data().filtertype;
            var _filterName = _$filter.data().filtername;
            
            switch(_filterType) {
                case 'checkbox':
                    Alyka.PageTypeListing.FilterData[_filterName] = window[_filterName];
                    break;
                case 'dropdown':
                    Alyka.PageTypeListing.FilterData[_filterName] = window[_filterName];
                    break;
                case 'radiobutton':
                    Alyka.PageTypeListing.FilterData[_filterName] = window[_filterName];
                    break;
                case 'text':
                    Alyka.PageTypeListing.FilterData[_filterName] = _$filter.find('input[type=text]').val();
            }
        }
    },
    _updateUrlWithFacets: function (data) {
        var _url = '',
            _anyFilters = false;
        
        function urlString(anyFilters, url){
            if(anyFilters){
                url += '&';
            }
            else{
                url += '?';
            }

            return url; 
        }
        
        if(Alyka.PageTypeListing.Filtering){
            for (var i = 0; i < Alyka.PageTypeListing.Filters.length; i++) {
                var _$filter = $(Alyka.PageTypeListing.Filters[i]);
                var _filterType = _$filter.data().filtertype;
                var _filterName = _$filter.data().filtername;

                switch(_filterType) {
                    case 'checkbox':
                        if (window[_filterName].length > 0) {
                            _url = urlString(_anyFilters, _url) + _filterName + '=' + window[_filterName].join(",");
                            _anyFilters = true;
                        }

                        break;
                    case 'dropdown':
                        if (window[_filterName] !== '') {
                            _url = urlString(_anyFilters, _url) + _filterName + '=' + window[_filterName];
                            _anyFilters = true;  
                        }
                        break;
                    case 'radiobutton':
                        if (window[_filterName] !== '') {
                            _url = urlString(_anyFilters, _url) + _filterName + '=' + window[_filterName];
                            _anyFilters = true;
                        }
                        break;
                    case 'text':
                        var _val = _$filter.find('input[type=text]').val();
                        if(Alyka.PageTypeListing.FilterData === undefined){
                            Alyka.PageTypeListing.FilterData = {};
                        }
                        Alyka.PageTypeListing.FilterData[_filterName] = _val;
                        _url = urlString(_anyFilters, _url) + _filterName + '=' + _val;
                        _anyFilters = true;  
                        break;
                }
            }
        }
        
        if(_anyFilters){
            Alyka.PageTypeListing.Cache.$clearFilter.css({'display':'block'});
        }
        else{
            Alyka.PageTypeListing.Cache.$clearFilter.hide();
        }
        
        if(Alyka.PageTypeListing.HasSorting){
            _url = urlString(_anyFilters, _url) + 'sort=' + Alyka.PageTypeListing.SortBy;
            _anyFilters = true;  
        }
        
        if(Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.pagenmubers || Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.nextprevious){
            _url = urlString(_anyFilters, _url) + 'page=' + Alyka.PageTypeListing.PageNumber;     
        }
        
        if(_url === ''){
            _url = '?';
        }
        Alyka.PageTypeListing.ManualStateChange = false;
        History.pushState(Alyka.PageTypeListing.FilterData, $(document).find("title").text(), _url);        
    },
    _search: function (filterData) {
        Alyka.PageTypeListing.IsLoading = true;
        
        if(Alyka.PageTypeListing.SearchType === Alyka.PageTypeListing.Cache.searchType.sorting){
            
            var _sort = Alyka.PageTypeListing.SortBy.split('|');
            
            Alyka.PageTypeListing.Data = _.sortBy(Alyka.PageTypeListing.Data, _sort[0]);
            
            if(_sort[1] === 'desc'){
                Alyka.PageTypeListing.Data = Alyka.PageTypeListing.Data.reverse();
            }
        }
        
        if(Alyka.PageTypeListing.Filtering){
            if (filterData !== undefined && !_.isEmpty(filterData)) {
                Alyka.PageTypeListing.FilteredData = _.filter(Alyka.PageTypeListing.Data, function (item) {
                    var _exists;
                    
                    for (var i = 0; i < Alyka.PageTypeListing.Filters.length; i++) {
                        var _$filter = $(Alyka.PageTypeListing.Filters[i]);
                        var _filterType = _$filter.data().filtertype;
                        var _filterName = _$filter.data().filtername;
                        var _filter = Alyka.PageTypeListing.FilterData[_filterName];

                        switch(_filterType) {
                            case 'checkbox':
                                if (_filter !== undefined && _filter.length > 0) {
                                    _exists = false;
                                    for (x = 0; x < _filter.length; x++) {
                                        if (item[_filterName].toLowerCase().includes(_filter[x].toLowerCase())) {
                                            _exists = true;
                                        }
                                    }

                                    if (!_exists) {
                                        return false;
                                    }
                                }
                                break;
                            case 'dropdown':
                                _exists = false;
                                if (_filter !== undefined) {
                                    if (item[_filterName].toLowerCase().includes(_filter.toLowerCase()) || _filter === '') {
                                        _exists = true;
                                    }
                                    else{
                                        return false;
                                    }
                                }
                                break;
                            case 'radiobutton':
                                _exists = false;
                                if (_filter !== undefined && _filter.length > 0) {
                                    if (item[_filterName].toLowerCase().includes(_filter.toLowerCase()) || _filter === '') {
                                        _exists = true;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                                break;
                        case 'text':
                            if (_filter !== undefined) {
                                _exists = false;
                                for (var property in item) {
                                    if (item.hasOwnProperty(property)) {
                                        if (item[property].toLowerCase().includes(_filter.toLowerCase())) {
                                            _exists = true;
                                        }
                                    }
                                }
                                
                                if (!_exists) {
                                    return false;
                                }
                            }
                            break;
                        }
                    }               
                    
                    return true;
                    
                });    
            }  
            else{
                if(Alyka.PageTypeListing.ManualStateChange || Alyka.PageTypeListing.SearchType === Alyka.PageTypeListing.Cache.searchType.sorting || Alyka.PageTypeListing.SearchType === Alyka.PageTypeListing.Cache.searchType.clearing){
                    Alyka.PageTypeListing.FilteredData = Alyka.PageTypeListing.Data;
                }
            }
        }
        else{
            Alyka.PageTypeListing.FilteredData = Alyka.PageTypeListing.Data;
        }
        
        Alyka.PageTypeListing.FilteredRecordCount = Alyka.PageTypeListing.FilteredData.length;
        
        Alyka.PageTypeListing.Cache.$recordcount.text(Alyka.PageTypeListing.FilteredRecordCount);
            
        var _startIndex = Alyka.PageTypeListing.PageSize * (Alyka.PageTypeListing.PageNumber - 1);
        var _endIndex = _startIndex + Alyka.PageTypeListing.PageSize;

        var _append = false;
        if(Alyka.PageTypeListing.SearchType !== Alyka.PageTypeListing.Cache.searchType.filter && Alyka.PageTypeListing.SearchType !== Alyka.PageTypeListing.Cache.searchType.sorting){
            if(Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.loadmore || Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.loadmorelazy){
                _append = true;
            }
        }
        
        Alyka.PageTypeListing._bindToTemplate(Alyka.PageTypeListing.FilteredData.slice(_startIndex, _endIndex), _append);

        if(Alyka.PageTypeListing.PageSize < Alyka.PageTypeListing.RecordCount){
            if(Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.pagenmubers || Alyka.PageTypeListing.PagingType === Alyka.PageTypeListing.Cache.pagingType.nextprevious){
                this._paging();
            }        

            switch(Alyka.PageTypeListing.PagingType) {
                case Alyka.PageTypeListing.Cache.pagingType.loadmore: 
                    if(_endIndex >= Alyka.PageTypeListing.FilteredRecordCount){
                        Alyka.PageTypeListing.Cache.$btnLoadMore.hide(); 
                        $('.older-articles').css('display', 'block');
                    }
                    else{
                        Alyka.PageTypeListing.Cache.$btnLoadMore.show(); 
                    }
                    break;
                case Alyka.PageTypeListing.Cache.pagingType.nextprevious:
                    $('#pagecount').text(Alyka.PageTypeListing.PageNumber + ' of ' + Math.ceil(Alyka.PageTypeListing.FilteredRecordCount / Alyka.PageTypeListing.PageSize));
                    if(Alyka.PageTypeListing.PageNumber > 1){
                        $('#backToStart').removeClass('disabled');
                    }
                    else{
                        $('#backToStart').addClass('disabled');
                    }
                    break;
                case Alyka.PageTypeListing.Cache.pagingType.loadmorelazy:
                    if(Alyka.PageTypeListing.LazyTriggered || Alyka.PageTypeListing.FilteredRecordCount <= Alyka.PageTypeListing.PageSize){
                        Alyka.PageTypeListing.Cache.$btnLoadMore.hide();
                    }
                    else{
                        Alyka.PageTypeListing.Cache.$btnLoadMore.show();
                    }
                    break;  
            }   
        }

        Alyka.PageTypeListing.ManualStateChange = true;
        Alyka.PageTypeListing.IsLoading = false;

    },
    _bindToTemplate: function (data, append) {
		Handlebars.registerHelper("formatdate", function (data, format) {
			var date = moment(data).format(format);
			return date;
        });

        if(data.length < 1){
            $('.results-found').show();
        }else{
            $('.results-found').hide();
        }
        
        var i = 1;
        Handlebars.registerHelper("layout", function (e) {
            var style;
            if(i > 5){
                i = 1;
            }
            if(i == 1){
                style = 'uk-width-large-2-3'
            }else{
                style = 'uk-width-large-1-3'
            }
            i++
            
			return style;
		});

		Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
			return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
		});

        var _template = Handlebars.compile(Alyka.PageTypeListing.Cache.$pageTypeListingTemplate.html());
        if(append){
            Alyka.PageTypeListing.Cache.$pageTypeListingResults.append(_template(data));
        }
        else{
            Alyka.PageTypeListing.Cache.$pageTypeListingResults.html(_template(data));
        }
        
        Alyka.LazyLoad(); 
    }
};
Alyka.parallaxbackground = {
	_init:function(id){
		$.each(id, function(i){
			if($('#'+id[i]).length){
				Alyka.parallaxbackground._parallaxBackground(id[i]);
			}
    	})
	},
	_parallaxBackground: function(id){
        if($(window).width() > 1024){
            var body, direction, speed, start,parallax, elemPosition;
            $(window).on('scroll', function(){
                body = $(window).scrollTop();
                direction = $('#'+id).attr('parallax-direction');
                speed = $('#'+id).attr('parallax-speed');
                start = $('#'+id).attr('parallax-offset');
                elemPosition = $('#'+id).offset().top;
                speed = speed * 0.08;
                if(direction == 'up'){parallax = ((elemPosition - body) * -speed) - start}
                else{parallax = ((elemPosition - body) * +speed - start)};
                $('#'+id).css({'background-position':'50% '+parallax+'px'});
            })
        }
    }
}
Alyka.Search = {
    _init: function () {
		
		Alyka.Search.Cache = {
            $searchToggle: $('#searchtoggle'),
            $search: $('#search'),
            $searchInput: $('#search .uk-search-field')
        };

        this._search();
        this._searchToggle();
    },
    _search: function () {
        function doSearch(e) {
            e.preventDefault();
            if (Alyka.Search.Cache.$searchInput.val() !== '') {
                var url = '/search?keyword=' + Alyka.Search.Cache.$searchInput.val();
                window.location = url;
            }
        }

        Alyka.Search.Cache.$searchInput.on("keypress", function (e) {
            if (e.keyCode == 13) {
                doSearch(e);
            }
        });

        Alyka.Search.Cache.$search.find('button').on('click keypress', function (e) {
            if (Alyka.IsClickOrEnter(e)) {
                doSearch(e);
            }
        });
    },
    _searchToggle: function () {
        Alyka.Search.Cache.$searchToggle.on('click keypress', function (e) {
            if(Alyka.IsClickOrEnter(e)){
                Alyka.Search.Cache.$search.slideToggle(200);
                Alyka.Search.Cache.$searchToggle.toggleClass('active');
                
                if(Alyka.Search.Cache.$searchToggle.hasClass('active')){
                    setTimeout(function(){ 
                        Alyka.Search.Cache.$searchInput.focus();
                    }, 1);
                }
            }
        });
    },
};
Alyka.StandardNavigation = {
    _init: function () {
		
        Alyka.StandardNavigation.Cache = {
            $mainNavigation: $('#mainnavigation'),
            $mobileNavigationToggle: $('#mobilenavigationtoggle'),
            $mobileNavigation: $('#mobileNavigation'),
            $navigationOverlay: $('#navigationOverlay')
        }

        this._mobileMainNavigation();
        this._accessibleNavigation();
    },
    _mobileMainNavigation: function () {
        Alyka.StandardNavigation.Cache.$mobileNavigationToggle.on('click keypress', function (e) {
            if (Alyka.IsMobile() && Alyka.IsClickOrEnter(e)) {
            } else {
                Alyka.StandardNavigation.Cache.$mobileNavigationToggle.parent().find('.uk-navbar-nav').toggleClass('active');
            }
            Alyka.StandardNavigation.Cache.$mobileNavigation.slideToggle();
            Alyka.StandardNavigation.Cache.$mobileNavigationToggle.find('.hamburger').toggleClass('is-active');
            Alyka.StandardNavigation.Cache.$mobileNavigationToggle.toggleClass('active');
            if (Alyka.IsMobileMenu()) {
                // $('body').addClass('no-scroll');
            }
        });
        Alyka.StandardNavigation.Cache.$mobileNavigation.find('.close').on('click keypress', function (e) {
            if (Alyka.IsMobileMenu() && Alyka.IsClickOrEnter(e)) {
                Alyka.StandardNavigation.Cache.$mobileNavigation.slideToggle();
                Alyka.StandardNavigation.Cache.$mobileNavigationToggle.find('.hamburger').toggleClass('is-active');
                Alyka.StandardNavigation.Cache.$mobileNavigationToggle.toggleClass('active');
                // $('body').removeClass('no-scroll');
            }
        });
        
        var _$navItems = Alyka.StandardNavigation.Cache.$mobileNavigation.find('li');
        _$navItems.children('a').each(function () {
            var _$link = $(this);
            if (_$link.siblings().length > 0) {
                _$link.parent().addClass('haschildren');
                _$link.append('<span class="uk-icon-angle-down" role="button"></span>');
            }
        });

        _$navItems.find('span').on('click keypress', function (e) {
            if (Alyka.IsClickOrEnter(e)) {
                var _$span = $(this);
                var _$parent = _$span.parent();
                var _$siblings = _$parent.siblings();
                _$span.toggleClass('active');
                _$siblings.slideToggle();
                return false;
            }
        });
    },
    _accessibleNavigation: function () {
      var _$navigation = Alyka.StandardNavigation.Cache.$mainNavigation.find('.uk-navbar-nav').children();

      _$navigation.children('a').keydown(function(e) {
          var _$parent = $(this).parent();
          if (e.keyCode === 39) {      
              if(!_$parent.is(':last-child')){
                  _$parent.next().children('a').focus();
              }
              else{
                  _$navigation.first().children('a').focus();
              }
          }
          else if (e.keyCode === 37) {      
              if(!_$parent.is(':first-child')){
                  _$parent.prev().children('a').focus();          
              }
              else{
                  _$navigation.last().children('a').focus();
              }
          }
          
          if(_$parent.hasClass('uk-parent')){
              if (e.keyCode === 40) {  
                  e.preventDefault();
                  _$parent.trigger("mouseenter");
                  
                  setTimeout(function(){ 
                      _$parent.find('.uk-dropdown').find('a').first().focus();
                  }, 300);
                  
              }
          }
      });

      _$navigation.children('a').focus(function(){
          $('.uk-open').trigger("mouseleave");
      }); 

      var _$dropdown = _$navigation.find('.uk-dropdown').children().children();
      _$dropdown.children('a').keydown(function(e) {
          var _$parent = $(this).parent();
          if (e.keyCode === 39 || e.keyCode === 40) { 
              e.preventDefault();
              if(!_$parent.is(':last-child')){
                  _$parent.next().children('a').focus();
              }
              else{
                  var _$newParent = _$parent.parent().parent();
                  
                  if(!_$newParent.is(':last-child')){
                      _$newParent.next().children('a').focus();
                  }
                  else{
                      _$parent.siblings().first().children('a').focus();
                  }
              }
          }
          else if(e.keyCode === 37 || e.keyCode === 38){
              e.preventDefault();
              if(!_$parent.is(':first-child')){
                  _$parent.prev().children('a').focus();          
              }
              else{
                  _$parent.parents('.uk-parent').children('a').focus();  
              }  
          }
          else if(e.keyCode === 27){
              $('.uk-open').children().focus();
              $('.uk-open').trigger("mouseleave");  
          }
      });
      }
};