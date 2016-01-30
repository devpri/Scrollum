/*
 * Scrollum - jQuery Parallax Scrolling Plugin
 * Version      1.0.0
 * Copyright    2016 Devpri
 * License      GNU General Public License version 2 or later.
 */
 
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function($) {
    "use strict";
    // Check if namespace has already been initialized
    if (!$.pri) {
        $.pri = {};
    }

    $.pri.scrollum = function(el, options) {
        var base = el;

        // Access to jQuery and DOM versions of element
        base.$e = $(el);
        
        // Add a reverse reference to the DOM object
        base.$e.data("priparallax", base);
                
        // Initialize
        base.init = function(){
            var area = base.area();
            var offset = base.offset();
            var scrolled = $(window).scrollTop();
            var animationKeys = base.animationKeys(options.animation);
            var animationCssKeys = base.animationCssKeys(options.animation, animationKeys);
            var mobileDetect = base.mobileDetect();
            var positionCond = false;

            if ((mobileDetect === false) || (options.mobile === true && mobileDetect === "mobile-scroll")){ 
                window.requestAnimationFrame(function() {
                    $(base).css("transition",  options.duration +"ms"); 
                    base.animation(base.position(area, offset, scrolled), options.animation, animationKeys, animationCssKeys);
                });
                
                $(window).resize(base.wait("500", function() {
                    area = base.area();
                    offset = base.offset();
                    scrolled = $(window).scrollTop();
                    var position = base.position(area, offset, scrolled);
                    position = Math.min(Math.max(parseInt(position), 0), 100);
                    window.requestAnimationFrame(function() {
                        base.animation(position, options.animation, animationKeys, animationCssKeys);
                    });
                }));

                $(window).scroll(base.wait(options.wait, function() {
                    scrolled = $(window).scrollTop();
                    var position = base.position(area, offset, scrolled);
                    if (position <= 100 && position >= 0) {
                        positionCond = false;
                    }
                    if (positionCond === false){
                        if (position > 100 || position < 0) {
                            position = Math.min(Math.max(parseInt(position), 0), 100);
                            positionCond = true;
                        }
                        window.requestAnimationFrame(function() {
                            base.animation(position, options.animation, animationKeys, animationCssKeys);
                        });
                    }
                }));
            } else if (options.mobile === true && mobileDetect === "mobile-no-scroll" &&
                typeof IScroll == "function" && $("#pri-parallax-inner").length) {
                
                if (!$("#pri-parallax-wrapper").length ) {
                    $("#pri-parallax-inner").wrap("<div id='pri-parallax-wrapper'/>");
                    $("#pri-parallax-wrapper")
                        .css({"position" : "absolute","width" : "100%","height" : "100%","overflow" : "hidden"})
                        .wrapInner("<div id='pri-parallax-scroller'/>");
                }

                var iScroll;
                iScroll =  new IScroll("#pri-parallax-wrapper", {
                    scrollX: false, 
                    scrollY: true,
                    click: true,
                    probeType: 3,
                    bounce: false
                });

                base.updateMobileAnimation = function(position){
                    if (position <= 100 && position >= 0) {
                        positionCond = false;
                    }
                    if (positionCond === false){
                        if (position > 100 || position < 0) {
                            position = Math.min(Math.max(parseInt(position), 0), 100);
                            positionCond = true;
                        }
                        window.requestAnimationFrame(function() {
                            base.animation(position, options.animation, animationKeys, animationCssKeys);
                        });
                    }
                };

                var position = base.position(area, offset, 0);
                base.updateMobileAnimation(position);

                iScroll.on("refresh", base.wait('500', function() {
                    area = base.area();
                    offset = base.offset() - iScroll.y;
                    scrolled = Math.abs(iScroll.y);
                    position = base.position(area, offset, scrolled);
                    base.updateMobileAnimation(position);
                }));

                iScroll.on("scroll", base.wait(options.wait, function() {
                    scrolled = Math.abs(iScroll.y);
                    position = base.position(area, offset, scrolled);
                    base.updateMobileAnimation(position);
                }));

                document.addEventListener("touchmove", function (e) { e.preventDefault(); }, false);
            }
        };

        // https://github.com/darius/requestAnimationFrame
        if (!Date.now)
            Date.now = function() { return new Date().getTime(); };
        (function() {
            var vtopors = ["webkit", "moz"];
            for (var i = 0; i < vtopors.length && !window.requestAnimationFrame; ++i) {
                var vp = vtopors[i];
                window.requestAnimationFrame = window[vp+"RequestAnimationFrame"];
                window.cancelAnimationFrame = (window[vp+"CancelAnimationFrame"] ||
                                           window[vp+"CancelRequestAnimationFrame"]);
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
                !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var lastTime = 0;
                window.requestAnimationFrame = function(callback) {
                    var now = Date.now();
                    var nextTime = Math.max(lastTime + 16, now);
                    return setTimeout(function() { callback(lastTime = nextTime); },
                                      nextTime - now);
                };
                window.cancelAnimationFrame = clearTimeout;
            }
        }());
        
        // Mobile detect
        base.mobileDetect = function() {
            var isMobile = false;
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
            var mobileNativeScroll = false; //initiate as false
            if(/(Android)\s((?:[5-9]|[12]\d)\d*)|(iPhone|iPad|iPod|iPad; CPU)\sOS\s((?:[8-9]|[12]\d)\d*)/.test(navigator.userAgent)) mobileNativeScroll = true;
            
            if (isMobile === true) {
                if (mobileNativeScroll === true){
                    return "mobile-scroll";
                } else {
                    return "mobile-no-scroll";
                }
            } else {
                return isMobile;
            }
        };

        // percent to pixels
        base.relativeToAbsolute = function(value, total){
            var relativeToAbsolute;
            if (value.indexOf("%") >= 0) {
                relativeToAbsolute = parseFloat(value) / 100 * parseInt(total);
            } else if ((value.indexOf("px") >= 0) || (!isNaN(parseFloat(value)))) {
                relativeToAbsolute = parseFloat(value);
            }
            return relativeToAbsolute;
        };

        // Check if value is numeric
        base.isNumeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
        };

        // Create animation object
        base.animation = function (percent, animation, animationKeys, animationCssKeys){
            var i, j, cssValue;
            for (i = 0; i < animationKeys.length; i++) {
                // Current BreakPouint
                var currentBreakpoint = Number(animationKeys[i]);
                // Next BrekPoint
                var nextBreakpoint = (animationKeys[i+1] === undefined) ? currentBreakpoint : Number(animationKeys[i+1]);
                // Current value based on brekpoint
                var animationCurrentValue = animation[animationKeys[i]];
                // Next value based on brekpoint
                var animationNextValue = animation[animationKeys[i+1]];

                if (Number(percent) <=  Number(nextBreakpoint) && Number(percent) >=  Number(currentBreakpoint)){
                    var newAnimation = {};
                    for (j = 0; j < animationCssKeys.length; j++) {
                        var animationCssKey = animationCssKeys[j]; 
                        var propertyVal = animationCurrentValue[animationCssKey];
                        // Check if value is an object
                        if ($.isPlainObject(propertyVal)) {
                            cssValue = base.animationObject(animationCurrentValue, animationNextValue, animationCssKey, percent, currentBreakpoint, nextBreakpoint);
                        // Check if value is an array
                        } else if ($.isArray(propertyVal)){
                            cssValue = base.animationArray(animationCurrentValue, animationNextValue, animationCssKey, percent, currentBreakpoint, nextBreakpoint);
                        // Check if is numerci value
                        } else if (base.isNumeric(propertyVal)) {
                            cssValue = base.animationNumeric(animationCurrentValue, animationNextValue, animationCssKey, percent, currentBreakpoint, nextBreakpoint);
                        } else {
                            cssValue = animationCurrentValue[animationCssKey];
                        }
                        newAnimation[animationCssKey] = cssValue;
                    }
                    $(this).css(newAnimation);
                    // Velocity test
                    //$(this).velocity(newAnimation ,{duration: 350, queue: false,easing: "easeInQuad"});
                }
            }
        };

        // Animation breakpoints
        base.animationKeys = function(animation){
            var animationKeys = [];
            for(var k in animation) {
                if(animation.hasOwnProperty(k)) {
                    animationKeys.push(k);
                }
            }
            return animationKeys;
        };

        // CSS Keys
        base.animationCssKeys = function(animation, animationKeys){
            var animationCss = animation[animationKeys[0]];
            var animationCssKeys = [];
            for(var k in animationCss) {
                if(animationCss.hasOwnProperty(k)) {
                   animationCssKeys.push(k);
                }
            }
            return animationCssKeys;
        };

        // Numeric
        // "opacity"   : "1.0"
        base.animationNumeric = function(animationCurrentValue, animationNextValue, animationCssKey, percent, currentBreakpoint, nextBreakpoint){
            var currentValue =  parseFloat(animationCurrentValue[animationCssKey]);
            var nextValue = (animationNextValue === undefined) ? 0 : parseFloat(animationNextValue[animationCssKey]);
            var unit = animationCurrentValue[animationCssKey].match(/px|em|%/);
            var multiplicator =  (nextValue - currentValue) / (nextBreakpoint - currentBreakpoint);
            var cssValue = currentValue + ((percent - currentBreakpoint ) * multiplicator);
                cssValue = cssValue.toFixed(options.precision) + ((unit === null) ? "" : unit);
            return cssValue;
        };

        // Array
        // "backgroundPosition": ["0%", "30%"]
        base.animationArray = function(animationCurrentValue, animationNextValue, animationCssKey, percent, currentBreakpoint, nextBreakpoint){
            var propertyVal = animationCurrentValue[animationCssKey];
            var cssValue = [];
            for (var l = 0; l < propertyVal.length; l++) {
               var nextValue = (animationNextValue === undefined) ? 0 : parseFloat(animationNextValue[animationCssKey][l]);
               var currentValue =  parseFloat(animationCurrentValue[animationCssKey][l]);
               var unit = animationCurrentValue[animationCssKey][l].match(/px|em|%/);
               var multiplicator =  (nextValue - currentValue) / (nextBreakpoint - currentBreakpoint);
               var css = currentValue + ((percent - currentBreakpoint ) * multiplicator);
               css = css.toFixed(options.precision) + ((unit === null) ? "" : unit);
               cssValue.push(css);
            }
            cssValue = cssValue.join(" ");
            return cssValue;
        };

        // Object value
        // "transform" : {"rotate" : ["0deg"], "scale" : ["0"]},
        base.animationObject = function(animationCurrentValue, animationNextValue, animationCssKey, percent, currentBreakpoint, nextBreakpoint){
            var k, l, m, precision;
            var propertyVal = animationCurrentValue[animationCssKey];
            var propertyKeys = [];
            for(k in propertyVal) {
                if(propertyVal.hasOwnProperty(k)) {
                    propertyKeys.push(k);
                }
            }
            var cssValue = [];
            for (l = 0; l < propertyKeys.length; l++) {
                var cssPropertyValue = [];
                var propertyKey = propertyKeys[l];
                    for (m = 0; m < propertyVal[propertyKey].length; m++){
                        var nextValue = (animationNextValue === undefined) ? 0 : parseFloat(animationNextValue[animationCssKey][propertyKey][m]);
                        var currentValue =  animationCurrentValue[animationCssKey][propertyKey][m];
                        if ((propertyKey.indexOf("rgb") > -1) && (currentValue.indexOf(".") === -1)) { 
                            precision = "0";
                        } else {
                            precision = options.precision;
                        }
                        currentValue =  parseFloat(currentValue);
                        var unit = animationCurrentValue[animationCssKey][propertyKey][m].match(/px|em|%|deg/);
                        var multiplicator =  (nextValue - currentValue) / (nextBreakpoint - currentBreakpoint);
                        var css = currentValue + ((percent - currentBreakpoint ) * multiplicator);
                        css = css.toFixed(precision) + ((unit === null) ? "" : unit);
                        cssPropertyValue.push(css);
                    }
                    cssValue.push(propertyKey + "(" + cssPropertyValue  + ")");
                }
            cssValue = cssValue.join(" ");
            return cssValue;
        };

        // Element Position
        base.position = function(area, offset, scrolled) {
            var percent = 100 / (area / (scrolled + area - offset ));
            return percent;
        };
        
        // Wait function 
        base.wait = function(limit, callback) {
            var wait = false;
            return function () {
                if (!wait) {
                    wait = true;
                    setTimeout(function () {
                        callback.call();
                        wait = false;
                    }, limit);
                }
            };
        };
        
        // Element trigger
        base.trigger = function (){
            var trigger;
            if (options.trigger === ""){
               trigger = base;
            } else {
               trigger = options.trigger;
            }
            return trigger;
        };

        // Area for effect 
        base.area = function (){
            var trigger = base.trigger();
            var windowHeight = $(window).height();
            var elementHeight = $(trigger).outerHeight();
            var top = base.relativeToAbsolute(options.top , windowHeight);
            var bottom = base.relativeToAbsolute(options.bottom , windowHeight);
            var elementTop = base.relativeToAbsolute(options.elementTop , elementHeight);
            var elementBottom = base.relativeToAbsolute(options.elementBottom , elementHeight);  
            var area = windowHeight + elementHeight - bottom - elementBottom - top - elementTop;
            return area;
        };

        // Element offset
        base.offset = function (){
            var trigger = base.trigger();
            var windowHeight = $(window).height();
            var elementHeight = $(trigger).innerHeight();
            var elementOffset = $(trigger).offset().top;
            var top = base.relativeToAbsolute(options.top , windowHeight);
            var elementTop = base.relativeToAbsolute(options.elementTop , elementHeight);
            var offset = elementOffset + elementHeight - top - elementTop;
            return offset;
        };
        // Init
        base.init();
    };

    // Plugin defaults – added as a property on our plugin function
    $.pri.scrollum.defaults = {
        trigger        : "",
        top            : "0",
        bottom         : "0",
        elementTop     : "0",
        elementBottom  : "0",
        precision      : "0",
        mobile         : false,
        wait           : "100",
        duration       : "300",
        animation      : {},
    };
    
    $.fn.scrollum = function(options) {
        // options
        options = $.extend( {}, $.pri.parallax.defaults, options );

        return this.each( function() {
            var newParallax = new $.pri.parallax(this, options);
        });
    };
}));