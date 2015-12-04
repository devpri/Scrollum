/*
 * PRI Parallax - jQuery parallax plugin
 * Version 1.0.0 Beta 2
 * Copyright 2015 Devpri
 * License     GNU General Public License version 2 or later.
 */

;(function($) {
   "use strict";
    // Check if namespace has already been initialized
     if (!$.pri) {
        $.pri = {};
     }
    $.pri.parallax = function(el, options) {
        var base = el;

        // Access to jQuery and DOM versions of element
        base.$e = $(el);
        
        // Add a reverse reference to the DOM object
        base.$e.data("priparallax", base);
        
        var area, offset;
        
        // Initialize
        base.init = function(){
            area = base.area();
            offset = base.offset();
            if ((base.mobileDetect() === false) || (options.mobile === true && base.mobileDetect() === "mobile-native-scroll")){ 
                window.requestAnimationFrame(function() {
                    $(base).css("transition",  options.duration +"ms");
                    base.animation(base.position(), options.animation);
                });
                
                $(window).resize(function(){
                    area = base.area();
                    offset = base.offset();
                    window.requestAnimationFrame(function() {
                       base.animation(base.position(), options.animation);
                    });
                });

                $(window).scroll(base.wait(options.wait, function() {
                    window.requestAnimationFrame(function() {
                        base.animation(base.position(), options.animation);
                    });
                }));
            }  else if (base.mobileDetect() === "mobile-no-native-scroll" &&
                // Mobile don"t support native scroll -> iScroll is loaded
                typeof IScroll == "function" && $("#pri-parallax-inner").length) {
                if (!$("#pri-parallax-wrapper").length ) {
                    $("#pri-parallax-inner").wrap("<div id='pri-parallax-wrapper'/>");
                    $("#pri-parallax-wrapper")
                        .css({"position" : "absolute","width" : "100%","height" : "100%","overflow" : "hidden"})
                        .wrapInner("<div id='pri-parallax-scroller'/>");
                }
               
                var iScroll;
                iScroll =  new IScroll("#pri-parallax-wrapper",
                    {
                        scrollX: false, 
                        scrollY: true,
                        click:true,
                        probeType:3,
                        bounce: false
                });

                base.updateMobilePosition = function(){
                    var scrolled = Math.abs(this.y);
                    window.requestAnimationFrame(function() {
                        base.animation(base.position(scrolled), options.animation);
                    });
                };

                iScroll.on("scroll", base.updateMobilePosition);
                iScroll.on("scrolltop", base.updateMobilePosition);

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
        
        base.mobileDetect = function() {
            var isMobile = false;
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
            var mobileNativeScroll = false; //initiate as false
            if(/(Android)\s((?:[4-9]|[12]\d)\d*)|(iPhone|iPad|iPod|iPad; CPU)\sOS\s((?:[8-9]|[12]\d)\d*)/.test(navigator.userAgent)) mobileNativeScroll = true;
            
            if (isMobile === true) {
                if (mobileNativeScroll === true){
                    return "mobile-native-scroll";
                } else {
                    return "mobile-no-native-scroll";
                }
            } else {
                return isMobile;
            }
        };

        // percent to pixels
        base.valuePixels = function(value, total){
            var valuePixels;
            if (value.indexOf("%") >= 0) {
                valuePixels = parseInt(value) / 100 * parseInt(total);
            } else if ((value.indexOf("px") >= 0) || (!isNaN(parseFloat(value)))) {
                valuePixels = parseInt(value);
            }
            return valuePixels;
        };

        // Check if value is numeric
        base.isNumeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        base.animation = function (percent, animation){
            var i, k, j, l, m, css, cssValue, currentValue, nextValue, multiplicator, unit;
            //Brekpoints keys
            var animationKeys = [];
            for(k in animation) {
                if(animation.hasOwnProperty(k)) {
                    animationKeys.push(k);
                }
            }
            //console.log(obj[objKeys[1]]);
            var cssAnimation = animation[animationKeys[0]];
            var cssAnimationKeys = [];
            for(k in cssAnimation) {
                if(cssAnimation.hasOwnProperty(k)) {
                   cssAnimationKeys.push(k);
                }
            }
            for (i = 0; i < animationKeys.length; i++) {
                //Current BreakPouint
                var currentBreakpoint = Number(animationKeys[i]);
                //Next BrekPoint
                var nextBreakpoint = (animationKeys[i+1] === undefined) ? 100 : Number(animationKeys[i+1]);
                if (Number(percent) <=  Number(nextBreakpoint) && Number(percent) >=  Number(currentBreakpoint)){
                    var newAnimation = {};
                    for (j = 0; j < cssAnimationKeys.length; j++) {
                        var propertyVal = animation[animationKeys[i]][cssAnimationKeys[j]];
                        if ($.isPlainObject(propertyVal)) {
                            var propertyKeys = [];
                            for(k in propertyVal) {
                                if(propertyVal.hasOwnProperty(k)) {
                                    propertyKeys.push(k);
                                }
                            }
                            cssValue = [];
                            for (l = 0; l < propertyKeys.length; l++) {
                                var cssPropertyValue = [];
                                for (m = 0; m < propertyVal[propertyKeys[l]].length; m++){
                                    nextValue = (animation[animationKeys[i+1]] === undefined) ? 0 : parseInt(animation[animationKeys[i+1]][cssAnimationKeys[j]][propertyKeys[l]][m]);
                                    currentValue =  parseInt(animation[animationKeys[i]][cssAnimationKeys[j]][propertyKeys[l]][m]);
                                    unit = animation[animationKeys[i]][cssAnimationKeys[j]][propertyKeys[l]][m].match(/px|em|%/);
                                    multiplicator =  (nextValue - currentValue) / (nextBreakpoint - currentBreakpoint);
                                    css = currentValue + ((percent - currentBreakpoint ) * multiplicator);
                                    css = css.toFixed(options.precision) + ((unit === null) ? "" : unit);
                                    cssPropertyValue.push(css);
                                }
                                cssValue.push(propertyKeys[l] + "(" + cssPropertyValue  + ")");
                            }
                            cssValue = cssValue.join(" ");
                            //console.log(cssValue);
                        // Check if value is an array
                        } else if ($.isArray(propertyVal)){
                            cssValue = [];
                            for (l = 0; l < propertyVal.length; l++) {
                                nextValue = (animation[animationKeys[i+1]] === undefined) ? 0 : parseInt(animation[animationKeys[i+1]][cssAnimationKeys[j]][l]);
                                currentValue =  parseInt(animation[animationKeys[i]][cssAnimationKeys[j]][l].replace( /^\D+/g, ""));
                                unit = animation[animationKeys[i]][cssAnimationKeys[j]][l].match(/px|em|%/);
                                multiplicator =  (nextValue - currentValue) / (nextBreakpoint - currentBreakpoint);
                                css = currentValue + ((percent - currentBreakpoint ) * multiplicator);
                                css = css.toFixed(options.precision) + ((unit === null) ? "" : unit);
                                cssValue.push(css);
                            }
                            cssValue = cssValue.join(" ");
                        } else if (base.isNumeric(parseInt(animation[animationKeys[0]][cssAnimationKeys[j]]))) {
                            currentValue =  parseInt(animation[animationKeys[i]][cssAnimationKeys[j]]);
                            nextValue = (animation[animationKeys[i+1]] === undefined) ? 0 : parseInt(animation[animationKeys[i+1]][cssAnimationKeys[j]]);
                            unit = animation[animationKeys[i]][cssAnimationKeys[j]].match(/px|em|%/);
                            multiplicator =  (nextValue - currentValue) / (nextBreakpoint - currentBreakpoint);
                            cssValue = currentValue + ((percent - currentBreakpoint ) * multiplicator);
                            cssValue = cssValue.toFixed(options.precision) + ((unit === null) ? "" : unit);
                        } else {
                            cssValue = animation[animationKeys[i]][cssAnimationKeys[j]];
                        }
                        newAnimation[cssAnimationKeys[j]] = cssValue;
                    }
                    $(this).css(newAnimation);
                    // Velocity test
                    //$(this).velocity(newAnimation ,{duration: 350, queue: false,easing: "easeInQuad"});
                }
            }
        };

        // Element Position
        base.position = function(scrolled) {
            if (scrolled === undefined) {scrolled = $(window).scrollTop();}
            var percent = 100 / (area / (scrolled + area - offset ));
            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;
            percent = percent.toFixed(options.precision);
            return percent;
        };

        base.wait = function(limit, callback) {
            var wait = false;
            return function () {
                if (!wait) {
                    var position = base.position();
                    if(position > 0 && position < 100){
                        callback.call();
                    }
                    wait = true;
                    setTimeout(function () {  
                       wait = false;
                    }, limit);
                }
            };
        };
        base.trigger = function (){
            // trigger Parallax
            var trigger;
            if (options.trigger === ""){
               trigger = base;
            } else {
               trigger = options.trigger;
            }
            return trigger;
        };
        base.area = function (){
            var trigger = base.trigger();
            var windowHeight = $(window).height();
            var elementHeight = $(trigger).outerHeight();
            var top = base.valuePixels(options.top , windowHeight);
            var bottom = base.valuePixels(options.bottom , windowHeight);
            var elementTop = base.valuePixels(options.elementTop , elementHeight);
            var elementBottom = base.valuePixels(options.elementBottom , elementHeight);  
            var area = windowHeight + elementHeight - bottom - elementBottom - top - elementTop;
            return area;
        };

        base.offset = function (){
            var trigger = base.trigger();
            var windowHeight = $(window).height();
            var elementHeight = $(trigger).outerHeight();
            var elementOffset = $(trigger).offset().top;
            var top = base.valuePixels(options.top , windowHeight);
            var elementTop = base.valuePixels(options.elementTop , elementHeight);
            var offset = elementOffset + elementHeight - top - elementTop;
            return offset;
        };
        // Init
        base.init();
    };

    // Plugin defaults – added as a property on our plugin function.
    $.pri.parallax.defaults = {
        trigger         : "",
        top            : "0",
        bottom         : "0",
        elementTop     : "100%",
        elementBottom  : "0",
        precision      : "0",
        mobile         : false,
        wait           : "100",
        duration       : "300",
        animation      : {}
    };
    
    $.fn.priparallax = function(options) {
        // options
        options = $.extend( {}, $.pri.parallax.defaults, options );

        return this.each( function() {
            var newParallax = new $.pri.parallax(this, options);
        });
    };
}(jQuery));