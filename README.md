# Scrollum v1.0.0
jQuery Parallax Scrolling Plugin
#License
Released under the General Public License version 2 or later license.
# Usage

 **Link required files**
 

    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.js"></script>
    /* iScroll only for mobile support */
    <script type="text/javascript" src="iscroll-probe.js"></script>
    <script type="text/javascript" src="dist/jquery.priparallax.min.js"></script>
 
**Mobile Support**
- Load iscroll-probe.js before PRI Parallax.
- Wrap body content inside a container with id: pri-parallax-inner

**Call the Scrollum plugin**

    $("your-selector").scrollum({
        trigger       : "",
        top           : "0",
        bottom        : "0",
        elementBottom : "0",
        elementTop    : "0",
        precision     : "0",
        mobile        : false,
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

#Options

 - **trigger**: element used to determine position for parallax effect.
 - **top**: top offset based on window height (% / px).
 - **bottom**: bottom offset based on window height (% / px).
 - **elementTop**: top offset based on element / trigger height (% / px).
 - **elementBottom**: bottom offset based on element / trigger height (% / px).
 - **precision**: set animation numbers precision.
 - **mobile**: enable / disable plugin on mobile devices.
 - **wait**: time between animations. 
 - **duration**: animations duration.
 - **animation**: an object with animation.

  

