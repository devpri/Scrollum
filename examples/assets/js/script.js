$(function() {
   function center(element, toElement){
   		elHeight = $(element).outerHeight();
   		toHeight = $(toElement).outerHeight();
   		margin = (toHeight - elHeight) / 2;
   		$(element).css("margin-top", margin);
   }

   $(".full-height").height(window.innerHeight);
   center("#sub-section-1", "#section-1");
   center("#sub-section-2", "#section-2");
   center("#sub-section-3", "#section-3");
   center("#github", "#section-4");

   var resizeTimer;
   $(window).resize(function(){
        $(".full-height").height(window.innerHeight);
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            center("#sub-section-1", "#section-1");
            center("#sub-section-2", "#section-2");
            center("#sub-section-3", "#section-3");
            center("#github", "#section-4");
        }, 400);   		
    });

   $("#section-1").scrollum({
		bottom        : "0",
        top           : "0",
        elementBottom : "100%",
        elementTop    : "0",
        precision     : "0",
        mobile        : true,
        wait          : "300",
        duration      : "300",
        animation     : {
            0 : {
                "backgroundPosition": ["0%", "0%"],
            },
            100 : {
            	"backgroundPosition": ["0%", "30%"],
            }
        }
	});

   $("#sub-section-1").scrollum({
        trigger       : "#section-1",
        bottom        : "0",
        top           : "0",
        elementBottom : "100%",
        elementTop    : "0",
        precision     : "4",
        mobile        : false,
        wait          : "400",
        duration      : "400",
        animation     : {
            0 : {
                "transform": { translateY : ["0px"]},
                "backgroundColor": { rgba : ["90", "90","90","0.8"]}
            },
            100 : {
                "transform": { translateY : ["400px"]},
                "backgroundColor": { rgba : ["41", "157","204","0.1"]}
            }
        }
    });

   $("#section-2").scrollum({
        bottom        : "0",
        top           : "0",
        elementBottom : "0",
        elementTop    : "0",
        precision     : "0",
        mobile        : true,
        wait          : "300",
        animation     : {
            0 : {
                "backgroundPosition": ["0%", "30%"],

            },
            100 : {
                "backgroundPosition": ["30%", "0%"],
            }
        }
    });

   $("#sub-section-2").scrollum({
        trigger       : "#section-2",
        bottom        : "0",
        top           : "0",
        elementBottom : "50%",
        elementTop    : "50%",
        precision     : "4",
        mobile        : false,
        wait          : "300",
        animation     : {
            0 : {
                "transform" : {"scale" : ["1"]},
                "opacity"   : "0.3",
            },
            40 : {
                "transform" : {"scale" : ["2"]},
                "opacity"   : "1.0",
            },
            60 : {
                "transform" : {"scale" : ["2"]},
                "opacity"   : "1.0",
            },
            100 : {
                "transform" : {"scale" : ["1"]},
                "opacity"   : "0.3",
            }
        }
    });
  

    $("#section-3").scrollum({
        bottom        : "0",
        top           : "0",
        elementBottom : "0",
        elementTop    : "0",
        precision     : "0",
        mobile        : true,
        wait          : "400",
        animation     : {
            0 : {
                "backgroundPosition": ["0%", "30%"],
            },
            100 : {
                "backgroundPosition": ["30%", "0%"],
            }
        }
    });

    $("#sub-section-3-content").scrollum({
        trigger       : "#section-3",
        bottom        : "0",
        top           : "50%",
        elementBottom : "0",
        elementTop    : "100px",
        precision     : "4",
        mobile        : false,
        wait          : "300",
        animation     : {
            0 : {
                "transform" : {"rotate" : ["0deg"], "scale" : ["0"]},
            },
            100 : {
                "transform" : {"rotate" : ["360deg"], "scale" : ["1"]},
            },
        }
    });

    $("#section-4-overlay").scrollum({
        trigger       :"#section-4",
        bottom        : "0",
        top           : "0",
        elementBottom : "0",
        elementTop    : "100%",
        precision     : "4",
        mobile        : true,
        wait          : "400",
        duration      : "400",
        animation     : {
            0 : {
                "backgroundColor": { rgba : ["90", "90","90","0.2"]}
            },
            100 : {
                "backgroundColor": { rgba : ["30", "30","30","0.8"]}
            }
        }
    });

    $("#github").scrollum({
        trigger       :"#section-4",
        bottom        : "0",
        top           : "0",
        elementBottom : "0",
        elementTop    : "100%",
        precision     : "4",
        mobile        : false,
        wait          : "400",
        duration      : "400",
        animation     : {
            0 : {
                "transform" : {"translateY" : ["400px"]},
            },
            100 : {
                "transform" : {"translateY" : ["0px"]},
            }
        }
    });

    $("#bar").scrollum({
        trigger       : "#pri-parallax-inner",
        bottom        : "100%",
        top           : "100%",
        elementBottom : "0",
        elementTop    : "0",
        precision     : "0",
        mobile        : true,
        wait          : "200",
        animation     : {
            0  : {
                "width": "0%",
                "backgroundColor" : {"rgb" : ["255","0","0"]},
            },
            50 : {
                "width": "50%",
                "backgroundColor" : {"rgb" : ["255","255","0"]},
            },
            100 : {
                "width": "100%",
                "backgroundColor" : {"rgb" : ["0","255","0"]},
            }
        }
    });
});