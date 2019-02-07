window.loopInProgress = false;
function init() {
  console.log("init();");
  window.loopNo = 0;
  window.readyForReset = false;
  window.lastWebsiteResetInLoop = 1;
  window.pos = {};
  window.pos.contentTop;
  window.outroStatus = 0;
  window.isScrollIndicatorHidden = false;
  window.isTimerStarted = false;
  window.introShown = false;
  window.isBOYcheckedForVisiblity = false;
  window.isWhiteChecked = false;
  $("#darkness").removeClass("fadeOut");
  $("#intro #intro_text").removeClass("hidden");
}
init();

window.onbeforeunload = function() {
  window.scrollTo(0, 0);
  history.pushState("", document.title, window.location.pathname + window.location.search);
};
history.pushState("", document.title, window.location.pathname + window.location.search);
window.scrollTo(0, 0);

// .............................................................................. ZOOMING BOY
function enable() {
  window.sceneBoyIntro.enabled(true);
  console.log("window.sceneBoyIntro.enabled(true);");
}
function disableTween() {
  window.sceneBoyIntro.enabled(false);
  console.log("window.sceneBoyIntro.enabled(false);");
}

function showScrollIndicator() {
  console.log("showScrollIndicator()");
  if (window.isScrollIndicatorHidden) {
    $("#scrollIndicator.fadeOut, footer.fadeOut")
      .removeClass("fadeOut")
      .addClass("fadeIn");
    window.isScrollIndicatorHidden = false;
  }
}
function hideScrollIndicator() {
  console.log("hideScrollIndicator()");
  if (!window.isScrollIndicatorHidden) {
    $("#scrollIndicator, footer")
      .removeClass("fadeIn")
      .addClass("fadeOut");
    window.isScrollIndicatorHidden = true;
  }
}

function test() {
  console.log("test() called");
  // window.currentView = "outro";
  console.error("setCurrentView to 'outro': 1");
  window.setCurrentView("outro");
  $("#dev").text("window.currentView = " + window.currentView);

  resetBoyTween(1, "out", outroCallbackTop, outroCallbackBottom);

  window.sceneBoyIntro.refresh();
  // window.sceneBoyIntro.reverse(false);
  window.sceneBoyIntro.enabled(true); // re-enable control
  window.sceneDarknessBottom.enabled(false); // disable control
  window.sceneDarknessTop.enabled(false);
  window.sceneBoyFalling.enabled(false);

  $(".u25_logo--intro").css("opacity", 0);
  $(".u25_logo--intro").css("position", "fixed");
  $("#intro__content").css("position", "relative");
  // $("#intro_text").addClass("hidden");
  $("#intro__content .row").addClass("block");
  // $(".svg-content").css("left", "-9.5vw");
  // $(".svg-content").css("left", "-150px");
  $("#outro_text").removeClass("hidden");
  $(".introoutro").removeClass("hidden");
  // $("#darkness.bottom").addClass("hidden");
  $(".site-content-contain").addClass("hidden");
  // $("body").addClass("stop-scrolling");
  $(document).scrollTop(0);
  // $("body").removeClass("stop-scrolling");
}

function outroCallbackTop() {
  // Transition back to #content from #outro
  console.log("outroCallbackTop: Transition back #outro to #content.");

  // window.sceneBoyIntro.enabled(false); // disable control
  // // Reset & enable darkness tween
  // $("#darkness.bottom").removeClass("hidden");
  // $(".introoutro").addClass("hidden");
  // $(".site-content-contain").removeClass("hidden");
  // setTimeout(function() {
  //   // var scrollTarget = $(document).height() - 50;
  //   // var scrollTarget = $("#HilfeFuerDich").offset().top - 50;
  //   // console.log("scrollTarget=", scrollTarget);
  //   // $(document).scrollTop(scrollTarget);
  //   var target = $("#HilfeFuerDich");
  //   $("html, body").animate(
  //     {
  //       scrollTop: target.offset().top
  //     },
  //     50,
  //     function() {
  //       window.sceneDarknessBottom.enabled(true); // re-enable control
  //     }
  //   );
  // }, 50);
}
window.outroTransitionDone = false;
function outroCallbackBottom() {
  // Transition from #outro to #intro
  console.log("outroCallbackBottom: Transition from #outro to #intro.");
  // .attr("transform", "matrix(1,0,0,1,0,0)");

  if (!window.outroTransitionDone) {
    console.log("window.outroTransitionDone (false) = " + window.outroTransitionDone);
    // window.lastWebsiteResetInLoop = window.loopNo - 1;

    if ($("#BOY").attr("transform") !== "matrix(1,0,0,1,0,0)") {
      // $("#intro__content .row, .u25_logo--intro").addClass("fadeIn");
      $({ val: 150 }).animate(
        { val: 0 },
        {
          duration: 1000,
          step: function(now) {
            // console.log("matrix(1,0,0,1," + now + ",0)");
            $("#BOY").css("-webkit-transform", "matrix(1,0,0,1," + now + ",0)");
          },
          complete: function() {
            window.readyForReset = true;
            window.outroTransitionDone = true;
          }
        }
      );
    }
    // Disable control
    window.sceneBoyIntro.enabled(false);
    // $("body").addClass("stop-scrolling");
    $(document).scrollTop(0);
    // $("body").removeClass("stop-scrolling");
    // Enable scrolling of outro_text, so that intro_text can come in.
    // ...
  } else {
    console.log("window.outroTransitionDone (true) = " + window.outroTransitionDone);
    console.log("ready for intro zooming");
  }
}

// function resetBoyTween(scaleVal, easeVal, callbackTop, callbackBottom) {
//   window.sceneBoyIntro.removeTween(); // remove old tween
//   console.error(
//     "resetBoyTween(" + scaleVal + "," + easeVal
//     //  +
//     // "," +
//     // callbackTop +
//     // "," +
//     // callbackBottom
//   );
//   if (easeVal == "in") {
//     var easing = Power2.easeIn;
//   } else if (easeVal == "out") {
//     var easing = Power2.easeOut;
//   }

//   // prepare callbacks
//   // var wasCallbackTopCalled = false;
//   // var wasCallbackBottomCalled = false;

//   // Set new tween
//   // var oX = window.originX - 0.4;
//   // console.log("resetBoyTween() OriginX=" + oX);
//   window.sceneBoyIntro
//     .setTween("#BOY", {
//       visibility: "visible",
//       // transformOrigin: "3.2% .65%",
//       // transformOrigin: "-40% 12.5%",
//       // transformOrigin: oX + "% 12.5% 0",
//       // transformOrigin: "0 0 0",
//       scale: scaleVal,
//       ease: easing,
//       xPercent: 100
//     })
//     .on("progress", function(e) {
//       console.log(e);
//       // Toggle background / foreground for .svg-content to not cover footer links.
//       if (e.progress == 0 && e.scrollDirection == "REVERSE") {
//         // !wasCallbackTopCalled &&
//         console.log("calling callbackTop()");
//         callbackTop();
//         // wasCallbackTopCalled = true;
//       } else if (e.progress == 1 && e.scrollDirection == "FORWARD") {
//         // !wasCallbackBottomCalled &&
//         console.log("calling callbackBottom()");
//         callbackBottom();
//         // wasCallbackBottomCalled = true;
//       }
//     })
//     .on("end", function(e) {
//       if (!window.fadeInProgress && window.currentView == "intro") {
//         console.error("$A");
//         fadeIntroToContent();
//       }
//     })
//     .addTo(window.controller);
//   window.sceneBoyIntro.enabled(true);
// }

// .............................................................................. STOPWATCH

var Stopwatch = function(elem, options) {
  var timer = createTimer(),
    offset,
    clock,
    interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements
  elem.appendChild(timer);

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  // function stop() {
  //   if (interval) {
  //     clearInterval(interval);
  //     interval = null;
  //   }
  // }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    timer.innerHTML = clock / 1000;
  }

  function delta() {
    var now = Date.now(),
      d = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start = start;
  this.stop = stop;
  this.reset = reset;
};

// .............................................................................. FALLING BOY
window.activeFallingTween = "";
function resetFallingTween(topOrBottom, callbackBottom) {
  window.activeFallingTween = topOrBottom;
  // if (typeof window.sceneBoyFalling !== "undefined")
  //   window.sceneBoyFalling.removeTween(); // remove old tween

  if (topOrBottom == "top") {
    var finalTop = "28vh";
    var triggerNo = "2";
    // var hook = "onLeave";
    var hook = "";
    var duration = 250;
    // } else if (topOrBottom == "topreverse") {
    //   var finalTop = "-10vh";
    //   var triggerNo = "2";
    //   var hook = "onLeave";
    //   var duration = 250;
  } else if (topOrBottom == "bottom") {
    var finalTop = "105vh";
    var triggerNo = "3";
    var hook = "onEnter";
    var duration = $("#HilfeFuerDich").height() * 1.5;
    // console.log("bottom duration = " + duration);
    // var duration = $("#HilfeFuerDich").height() * 0.75;
  }

  // Set new tween
  var overlayopacity = 0;
  window.sceneBoyFalling = new ScrollMagic.Scene({
    triggerElement: "#trigger" + triggerNo,
    triggerHook: hook,
    duration: duration
  })
    .on("progress", function(e) {
      // console.log("sceneBoyFalling:" + topOrBottom, e);

      if (topOrBottom == "bottom") {
        overlayopacity = e.progress * 2;
        $("#darkness").css("opacity", overlayopacity > 1 ? 1 : overlayopacity);
        if (e.progress == 1 && e.scrollDirection == "FORWARD") {
          // !wasCallbackBottomCalled &&
          // console.log("calling callbackBottom()");
          // callbackBottom();
          // --------- SHOW OUTRO
          // console.error('$("#outro .svg-container").addClass("fadeIn");');

          // bgtrack: fade out & pause
          console.log("bgtrack: fade out & pause");
          if (!window.isMute) {
            window.sound.fade(1, 0, 1000);
            setTimeout(function() {
              window.sound.pause();
            }, 1000);
          }

          $("#outro .svg-container").addClass("fadeIn");
          // window.currentView = "outro";
          console.error("setCurrentView to 'outro': 2");
          window.setCurrentView("outro");
          $("#dev").text("window.currentView = " + window.currentView);
        }
        if (e.progress == 0 && e.scrollDirection == "REVERSE" && window.currentView == "outro") {
          // Go from outro back to content
          $("#outro .svg-container")
            .removeClass("fadeIn")
            .addClass("fadeOut");
          // $("#outro").addClass("dark");
          console.log("[1] window.currentView = 'content'");
          // window.currentView = "content";
          window.setCurrentView("content");
          $("#dev").text("window.currentView = " + window.currentView);
          // bgtrack: fade in & resume
          window.sound.play();
          window.sound.fade(0, 1, 1000);
        }
      } else {
        // top
        if (e.progress == 0 && e.scrollDirection == "REVERSE") {
          // content to intro.
          $("#boy--animated").css("top", "initial");

          showScrollIndicator();
        } else if (e.progress == 1 && e.scrollDirection == "FORWARD") {
          hideScrollIndicator();
          // $("#darkness").removeClass('hidden')
        }
      }
    })

    .on("start", function(e) {
      if (topOrBottom == "bottom" && window.currentView == "content" && window.scrollDirection == "down") {
        console.error("setCurrentView to 'outro': 3");
        window.setCurrentView("outro");
      }
    })
    .on("end", function(e) {
      console.log("sceneBoyFalling end", e);
      if (window.currentView == "content" || window.currentView == "outro") {
        if (topOrBottom == "bottom" || window.scrollPercentage > 70) {
          console.log("sceneBoyFalling end: bottom || % > 70. (%=" + window.scrollPercentage + ")");
          // prepare fade to intro
          $("#darkness").addClass("hidden");
          if (e.scrollDirection == "FORWARD") {
            console.error("bottom, FORWARD");
            $("#intro").removeClass("yellow");
            if (window.scrollPercentage >= 97.5) {
              console.log("sceneBoyFalling end: LOOPING!");
              if (!window.loopInProgress) window.loopWebsite();
            } else {
              console.log("=== not looping. %=" + window.scrollPercentage + ", view=" + window.currentView);
            }
          } else {
            console.error("bottom, REVERSE");
            if (!window.loopInProgress) $("#intro").addClass("yellow y2");
          }
          // console.error("END of #boy--animated bottom");
          // fadeContentToOutroNEW();
          // FADE TO OUTRO
          // $(window).scrollTop(0);
          // $("#outro").removeClass("hidden");
        } else {
          // top
          console.log("sceneBoyFalling end: top. %=" + window.scrollPercentage);
          hideScrollIndicator();
        }
      } else {
        console.error("sceneBoyFalling: do nothing, because currentView=" + window.currentView);
      }
    })
    .setTween("#boy--animated", {
      top: finalTop
    }) // the tween duration can be omitted and defaults to 1
    // .setTween("#darkness", {
    //   opacity: 1
    // }) // the tween duration can be omitted and defaults to 1
    .addTo(window.controller);
}
function initFallingFromTop() {
  console.log("initFallingFromTop()");
  resetFallingTween("top", fallingFromTopEndCallback);
  window.sceneBoyFalling.refresh();
  window.sceneBoyFalling.enabled(true); // re-enable control
}
function initFallingFromTopReverse() {
  console.log("initFallingFromTopReverse()");
  resetFallingTween("topreverse", fallingFromTopReverseEndCallback);
  window.sceneBoyFalling.refresh();
  window.sceneBoyFalling.enabled(true); // re-enable control
}
function initFallingToBottom() {
  console.log("initFallingToBottom()");
  resetFallingTween("bottom", fallingToBottomEndCallback);
  window.sceneBoyFalling.refresh();
  window.sceneBoyFalling.enabled(true); // re-enable control

  // // prepare boy outro
  // $("#BOY2").attr("transform", window.boyFinalZoom);
}
function fallingFromTopEndCallback() {
  console.log("fallingFromTopEndCallback()");
}
function fallingFromTopReverseEndCallback() {
  console.log("fallingFromTopReverseEndCallback()");
}
function fallingToBottomEndCallback() {
  console.log("fallingToBottomEndCallback()");
}

window.timerInterval;
function initTimer() {
  var date = new Date();
  date.setMinutes(1);
  date.setSeconds(31);
  date.setMilliseconds(0);
  var msec = date.getMilliseconds();
  var sec = date.getSeconds();
  var min = date.getMinutes();
  // var handler = function() {
  // };
  // delete window.timerInterval;
  // console.error("initTimer()" );
  window.timerInterval = setInterval(function() {
    // console.log("msec=" + msec);
    msec += 9;
    if (msec >= 99) {
      msec = 0;
      if (++sec === 60) {
        sec = 0;
        if (++min === 60) min = 0;
      } else {
        console.log("sec = " + sec);
      }
    }
    $("#minutes").text(min < 10 ? "0" + min : min);
    $("#seconds").text(sec < 10 ? "0" + sec : sec);
    $("#milliseconds").text(msec < 10 ? "0" + msec : msec);
    // document.getElementById("timerspan").innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec) + ":" + (msec < 10 ? "0" + msec : msec);
  }, 90);
  // handler();
}

function stopTimer() {
  // console.error("stopTimer()");
  clearInterval(window.timerInterval);
  delete window.timerInterval;
}

// ============================================================================== SET CURRENT VIEW
window.setCurrentView = function(newView) {
  window.currentView = newView;
  $("body")
    .removeClass("intro content outro")
    .addClass(newView);
};

// .............................................................................. DOCUMENT.READY
$(document).ready(function() {
  var isContentShown = false;
  // window.currentView = "intro";
  window.setCurrentView("intro");
  $("#dev").text("window.currentView = " + window.currentView);

  // ============================================================================== LOOP WEBSITE
  window.loopWebsite = function() {
    console.info("loopWebsite()");
    // Lock this down so it does only get triggered once
    window.fadeInProgress = true;
    window.loopInProgress = true;

    // reset logo visibility
    $("#intro .u25_logo").addClass("fadeOut");

    // STEP 1/2: OUTRO
    if (window.introShown) {
      console.log("removing .show");
      $("#intro_text").removeClass("show invisible");
      $("#foreground, #front").addClass("white");
      window.introShown = false;
    }
    // STEP 2/2: INTRO
    setTimeout(function() {
      // Re-Init Website
      init();

      // bgtrack: reset playback position via stop()
      window.sound.stop();

      // prepare intro
      $("#intro .svg-container.fadeOut").removeClass("fadeOut");
      $("#intro .svg-content.inFront").removeClass("inFront");
      $("#pagewalls").addClass("hidden");
      // $("#BOY").removeAttr("transform style");
      // $("#BOY").attr("transform", "matrix (1,0,0,1,0,0)");
      // $("#intro #intro_text").removeClass("invisible");
      // isTweenInit = false;

      // Set progress
      window.sceneBoyIntro.progress(0);

      // Freeze tween
      console.error("DISable scenes");
      window.sceneBoyIntro.enabled(false);
      window.sceneBoyOutro.enabled(false);
      window.sceneBoyFalling.enabled(false);
      console.log("window.sceneBoyIntro is reset.");
      // $("body").addClass("stop-scrolling");

      // jump to top
      $(window).scrollTop(1);
      // window.currentView = "intro";
      window.setCurrentView("intro");
      $("#dev").text("window.currentView = " + window.currentView);

      // TODO: TRIGGER THIS WITH SCROLLPOSITION == 0?
      setTimeout(function() {
        positionLogo();
        if (!window.introShown) {
          console.log("adding .show");
          $("#intro_text").addClass("show");
          window.introShown = true;
        }
        $("#outro .svg-container")
          .removeClass("fadeIn")
          .addClass("hidden");
        $("#outro").addClass("dark");

        $("#foreground, #front").addClass("white");

        // $(window).scrollTop(1);
      }, 150);

      setTimeout(function() {
        console.error("ENable scenes");
        window.sceneBoyIntro.enabled(true);
        window.sceneBoyOutro.enabled(true);
        window.sceneBoyFalling.enabled(true);
        window.sceneBoyIntro.progress(0);

        console.log("Looping complete.");

        if ($(".u25_logo--intro").hasClass("fadeOut")) {
          $(".u25_logo--intro")
            .removeClass("fadeOut")
            .addClass("fadeIn");
        }

        // window.currentView = "intro";
        window.setCurrentView("intro");
        $("#dev").text("window.currentView = " + window.currentView);
        stopTimer();
        window.fadeInProgress = false;

        $(window).scrollTop(1);
        // window.sceneBoyIntro.progress(0);
        // window.sceneBoyIntro.enabled(true);

        // $("body").removeClass("stop-scrolling");
      }, 250);
      setTimeout(function() {
        window.loopInProgress = false;
        // $(window).scrollTop(0);
      }, 500);
      // }, 2000);
    }, 500);
  };

  // ============================================================================== ELEMENTS ON PAGE LOAD
  // $("#intro_section").addClass("in");
  function positionLogo() {
    console.log("positionLogo()");
    if ($(window).width() >= 768) $(".u25_logo--intro a").css("left", Math.floor($("#intro_text").offset().left) + $(window).width() / 40);
  }
  positionLogo();

  function positionPhoneGame() {
    var phoneWidth = $("#phone img").width();
    var phoneContainerWidth = $("#phoneContainer").width();
    // console.log("phoneWidth" + phoneWidth);
    // $("#phone #wallContainer").width(phoneWidth);
    $("#phoneBackground")
      .css("width", phoneWidth * 0.95)
      .css("left", (100 - ((phoneWidth * 0.95) / phoneContainerWidth) * 100) / 2 + "%");
    // 28,7927107062
    // (100-((392*,95/878)*100))/2
  }
  positionPhoneGame();

  $(window).resize(function() {
    positionLogo();
    positionPhoneGame();
    if (window.currentView == "content") updateSectionSizesForActivityIndicator();
  });

  // ============================================================================== AUDIO
  // Init variable
  window.isMute = false;
  var soundSVGpath = $("#soundIcon").data("src");
  // $("audio")[0].volume = 0.5;

  Howler.volume(0.15);
  window.soundVol = 1;
  window.sound = new Howl({
    src: [soundSource], // soundSource is declared in header.php
    autoplay: false,
    onplayerror: function(e) {
      console.error("playerError", e);
      /*
window.sound.once("unlock", function() {
        window.sound.play();
      });
*/
    },
    loop: true,
    volume: window.soundVol
  });

  var autoplayDone = false;
  function tryToAutoplaySound() {
  	console.log("tryToAutoplaySound()");
    if (!window.isMute) {
      if (!autoplayDone) {
        window.sound.play();
        console.error("tryToAutoplaySound()");
        autoplayDone = true;
      } else if (!window.sound.playing()) {
        console.error("playing sound.");
        window.sound.volume(window.soundVol);
        window.sound.play();
      }
    }
    setTimeout(function(){
    	if(window.currentView == "intro") window.sound.stop()
    }, 500)
    setTimeout(function(){
    	if(window.currentView == "intro") window.sound.stop()
    }, 1000)
  }

  // === HANDLE VISIBILITY CHANGE
  // Set the name of the hidden property and the change event for visibility
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  // If the page is hidden, pause the video;
  // if the page is shown, play the video
  function handleVisibilityChange() {
    if (document[hidden]) {
      window.sound.pause();
    } else {
      if (!window.isMute) {
        window.sound.play();
      }
    }
  }

  if (typeof document.addEventListener !== "undefined" && hidden !== undefined) {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }

  // === HANDLE CLICKS ON YOUTUBE IFRAMES
  $("iframe").iframeTracker({
    blurCallback: function(event) {
      // Do something when the iframe is clicked (like firing an XHR request)
      if (!window.isMute) {
        window.sound.pause();
        $("#soundIcon img").attr("src", soundSVGpath + "off.svg");
        window.isMute = true;
      }
    }
  });

  // === Let users use icon to toggle mute
  $("#soundIcon").on("click", function() {
    if (!window.isMute) {
      // $("audio").trigger("pause");
      console.log("SOUND ICON: sound.pause();");
      window.sound.pause();
      $("#soundIcon img").attr("src", soundSVGpath + "off.svg");
      window.isMute = true;
    } else {
      // $("audio").trigger("play");
      console.log("SOUND ICON: sound.play();");
      window.sound.play();
      $("#soundIcon img").attr("src", soundSVGpath + "on.svg");
      window.isMute = false;
    }
    $("#soundIcon").toggleClass("mute");
  });

  // // *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** INTRO & OUTRO

  window.fadeInProgress = false;

  function fadeOutroToIntro() {
    console.log("----- fadeOutroToIntro()");
    window.fadeInProgress = true;
    // window.currentView = "intro";
    window.setCurrentView("intro");
    $("#dev").text("window.currentView = " + window.currentView);

    console.log("window.loopNo=" + window.loopNo);
    // window.sceneDarknessBottom.enabled(false); // disable control
    // window.sceneDarknessTop.enabled(false);
  }

  window.boyFinalZoom;
  function fadeIntroToContentNEW() {
    // update status
    console.error("---------------------------------------- fadeIntroToContentNEW()");
    window.fadeInProgress = true;
    console.log("[2] window.currentView = 'content'");
    // window.currentView = "content";
    window.setCurrentView("content");

    tryToAutoplaySound();

    $("#dev").text("window.currentView = " + window.currentView);
    // disable zoom scrolling of BOY
    // window.sceneBoyIntro.enabled(false); // disable control

    // remove .white from #foreground
    $("#foreground, #front").removeClass("white");
    if (!window.loopInProgress) $("#intro").addClass("yellow y3");
    // $("#intro #intro_text").addClass("invisible");
    // $("#intro #intro_text").addClass("hidden");
    $("#intro .u25_logo")
      .removeClass("fadeIn")
      .addClass("fadeOut");

    // show walls
    $("#pagewalls").removeClass("hidden");

    // Hide BOY
    // $("#BOY").css("opacity", 0);
    // $(".svg-container").addClass("hidden");
    // console.error("fadeIntroToContentNEW: fade out intro");
    $("#intro .svg-container").removeClass("fadeIn");
    $("#intro .svg-container").addClass("fadeOut");

    setTimeout(function() {
      window.fadeInProgress = false;
      $("#intro .svg-container").addClass("fadeOut");
    }, 500);

    // END OF FUNCTION
    isContentShown = true;
    // window.fadeInProgress = false;

    window.boyFinalZoom = $("#BOY").attr("transform");
    window.boyFinalZoomAttr = "transform";
    if (typeof window.boyFinalZoom == "undefined") {
      window.boyFinalZoom = $("#BOY").attr("style");
      window.boyFinalZoomAttr = "style";
    }
    // console.error("1! window.boyFinalZoomAttr=" + window.boyFinalZoomAttr + ", window.boyFinalZoom=" + window.boyFinalZoom);

    return;
  }

  function fadeContentToIntro() {
    console.log("fadeContentToIntro()");
    // bgtrack: fade out & reset
    if (!window.isMute) {
      window.sound.fade(1, 0, 1000);
    }
    setTimeout(function() {
      if (window.currentView == "intro") {
        window.sound.stop();
        window.sound.volume(window.soundVol);
      }
    }, 1000);

    // window.currentView = "intro";
    window.setCurrentView("intro");
    $("#dev").text("window.currentView = " + window.currentView);

    $("#intro .svg-container").removeClass("fadeOut");
    $("#intro .svg-container").addClass("fadeIn");
    console.log("scroll to " + $("#intro").height() / 2);
    // $(window).scrollTop($("#intro").height() / 2);
    setTimeout(function() {
      $("#intro").removeClass("yellow");
      $("#foreground, #front").addClass("white");
      $("#pagewalls").addClass("hidden");
    }, 50);
  }

  /*
                      ...........................                    ...........................                    ...........................
  ...........................                    ...........................                    ...........................                    ...........................
                      ...........................                    ...........................                    ...........................
  ...........................                    ...........................                    ...........................                    ...........................
                      ...........................                    ...........................                    ...........................
  ...........................                    ...........................                    ...........................                    ...........................
                      ...........................                    ...........................                    ...........................
  ...........................                    ...........................                    ...........................                    ...........................
                      ...........................                    ...........................                    ...........................
  ...........................                    ...........................                    ...........................                    ...........................
  */

  // *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** SCROLLING
  var windowHeight = $(window).height();
  // Prepare: throttled scrolling for performance reasons
  var scrollTimeout;
  var throttle = 50;
  // Variables for: General Scrolling
  window.scrollPercentage;
  var scrollCenter;
  var scrollBottom;
  // Variables for: Init On Scroll Position
  var scrollOffset = 100; // start init 100px before it comes into view

  var isBoyIn = false;
  // var boyPos = $("#DasProblem").offset().top;
  // var isMonsterInit = false;
  // var monsterPosition = $("#monster--animated").offset().top;
  // var isBalloonInit = false;
  // var balloonPosition = $("#HilfeFuerAndere").offset().top;
  var isNewOutroInit = false;
  var newOutroPosition = 100000;
  // sections
  // var isIntroInit = false;
  // var introPos = $("#intro_section").offset().top;
  // var isDasProblemInit = false;
  // var dasProblemPos = $("#DasProblem").offset().top;
  var isHilfeAndereInit = false;
  var hilfeAnderePos = $("#HilfeFuerAndere").offset().top - windowHeight / 8;
  $("#HilfeFuerAndere h1").addClass("fadeInPrep");
  $("#HilfeFuerAndere .col-md:first-of-type").addClass("moveInLeftPrep");
  $("#HilfeFuerAndere .col-md:last-of-type").addClass("moveInRightPrep");
  // var isDBMWInit = false;
  // var DBMWPos = $("#DuBistMirWichtig").offset().top - windowHeight / 4;
  // $("#DuBistMirWichtig h1, #DuBistMirWichtig>p").addClass("fadeInPrep");
  // $("#DuBistMirWichtig .col-md:first-of-type").addClass("moveInLeftPrep");
  // $("#DuBistMirWichtig .col-md:last-of-type").addClass("moveInRightPrep");
  var isHilfeDichInit = false;
  var hilfeDichPos = $("#HilfeFuerDich").offset().top - windowHeight / 8;
  $("#HilfeFuerDich h1").addClass("fadeInPrep");
  $("#HilfeFuerDich .col-md:first-of-type").addClass("moveInLeftPrep");
  $("#HilfeFuerDich .col-md:last-of-type").addClass("moveInRightPrep");
  // var isOutroInit = false;
  // var outroPos = $("#outro_section").offset().top - windowHeight / 8;
  // $("#outro_section").addClass("fadeInPrep");
  // video
  var isVideoPlayed = false;
  var phonePos = $("#phoneContainer").offset().top;

  // nav activity indicator
  var activatableSections = [];
  var section_i = 0;
  var activeSection;
  function updateSectionSizesForActivityIndicator() {
    activeSection = $("section").each(function() {
      var section = {};
      section.id = "#" + $(this).attr("id");
      // section.top = Math.round($(section.id).offset().top - windowHeight / 2);
      section.top = Math.round($(section.id).offset().top);
      // section.bottom = Math.round($(section.id).offset().top + $(section.id).height() + windowHeight / 2);
      section.bottom = Math.round($(section.id).offset().top + $(section.id).height());
      // if "Das Problem" section extend the detecable height
      console.log("section.id=" + section.id);
      if (section.id == "#DasProblem") section.bottom += $(section.id).height();
      // $("body").append(
      //   '<div class="test test' + section_i + '" style="height:' + (section.bottom - section.top) + "px; top:" + section.top + 'px">' + section.id + "</div>"
      // );
      activatableSections.push(section);
      section_i++;
    });
  }
  updateSectionSizesForActivityIndicator();

  // Variables for: Particles
  // var opacity;
  // Variables for: Menu Text Color & Boy Brightness
  var rgb_value;
  var brightness;
  $("window").height();
  var iconbrightness;
  var invert;
  // Variables for: Intro Animation
  var hijackScrolling = true;
  var lastScrollTop = 0;
  var scrollDistance = 10;
  var scrollMax = 5000;
  var st;
  var zoomFactor;
  // Intro Animation: Init
  function initController() {
    window.controller = new ScrollMagic.Controller();
  }
  initController();

  // Function for: Collision Detection
  var colliders_selector = "#boy--animated";
  var obstacles_selectorPhone = "#phoneContainer";
  var obstacles_selectorMonster = "#monster--animated";
  var hitsArray = [];
  var bool_detectCollisionWithVideo = true;
  var bool_detectCollisionWithMonster = true;

  var wasChangedToIntro = false;
  var isScrollIndicatorShown = false;

  // console.log("monsterPosition = " + monsterPosition);
  var cableTop, cablePos, bridgeTop, bridgePos;
  window.pos.contentTop = $("#content").offset().top;
  // ============================================================================== initial POSITION for FRONT ELEMENTS
  function positionFrontElements() {
    // console.error("positionFrontElements()");
    // cableTop =
    //   $("#HilfeFuerAndere").offset().top - $("#HilfeFuerAndere").height();
    // cableTop = $("#HilfeFuerAndere").offset().top + parseInt($("#HilfeFuerAndere").css("marginTop")) * 0.25 - window.pos.contentTop;
    cableTop = $("#HilfeFuerAndere").offset().top - parseInt($("#HilfeFuerAndere").css("marginTop")) * 0.75;
    // var cablePos = cableTop - $(window).height() / 2;
    // cablePos = cableTop - $("#HilfeFuerAndere").width() / 10;
    cablePos = cableTop;
    // console.log("cableTop=" + cableTop);
    $(".cable").css("top", cablePos);

    // bridgeTop = $("#HilfeFuerDich").offset().top;
    // bridgePos = bridgeTop;
    // bridgeTop = $("#HilfeFuerDich").offset().top + parseInt($("#HilfeFuerDich").css("marginTop")) / 2;
    // bridgeTop = $("#HilfeFuerDich").offset().top + parseInt($("#HilfeFuerDich").css("marginTop")) * 1.5 - window.pos.contentTop;
    // bridgeTop = $("#HilfeFuerDich").offset().top - parseInt($("#HilfeFuerDich").css("marginTop")) * 1.5;

    // === bridgefacetor
    // mobile: * 2.5
    // desktop: 0
    var vw = $(window).width();
    var bridgeFactor = 0.75;
    if (vw > 400 && vw <= 768) {
      bridgeFactor = 1.25;
    } else if (vw <= 400) {
      // bridgeFactor = 2.5;
      // bridgeFactor = 3.5;
      bridgeFactor = 12.25;
    }
    bridgeTop = $("#HilfeFuerDich").offset().top - window.pos.contentTop + parseInt($("#HilfeFuerDich").css("marginTop")) * bridgeFactor;
    bridgePos = bridgeTop;
    // console.log(
    //   "A=" +
    //     $("#HilfeFuerDich").offset().top +
    //     " - B=" +
    //     parseInt($("#HilfeFuerDich").css("marginTop")) / 2 +
    //     " == " +
    //     bridgePos
    // );
    console.log("bridgePos = " + bridgePos);
    $(".bridge").css("top", bridgePos);
  }
  positionFrontElements();

  // ============================================================================== DYNAMIC PARTICLE SPEED
  var checkScrollSpeed = (function(settings) {
    settings = settings || {};

    var lastPos,
      newPos,
      timer,
      delta,
      delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return function() {
      newPos = window.scrollY;
      if (lastPos != null) {
        // && newPos < maxScroll
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();

  // INIT BOY TWEEN FOR INTRO AND OUTRO

  // ********************************************************************************************************* BBB: GSAP + ScrollMagic
  var isTweenInit = false;
  window.sceneBoyIntro;

  window.initalBoyScaleTarget = $(window).width() * 0.25;
  var duration = window.initalBoyScaleTarget * 2;
  // window.initalBoyScaleTarget = $(window).width() * 0.5;
  // var duration = window.initalBoyScaleTarget * 2;
  // var baseOriginX = 60.5;
  var widthFactor = $(window).width() * 0.001;
  var widthFactor = $(window).width() * 0.0011;
  // var widthFactor = $(window).width() * 0.00125;
  var baseOriginX = 58.5 + widthFactor;
  // console.log("baseOriginX=" + baseOriginX + " --> 58.5 + " + widthFactor);
  if ($(window).width())
    if (navigator.appVersion.indexOf("Chrome/") != -1) {
      // baseOriginX = 62.25;
    }
  window.originX = baseOriginX - $(window).width() / 2000; // optimize the transformOrigin's X to keep boy horizontally centered

  // isNoZoomBoyHidden = false;
  initialBoyWidth = document.getElementById("boy").getBBox().width * 2; // *2 to account for initial scaling

  var boyTweenLastEvent;
  var isBoyInFront = false;
  function initBoyTween(isReverse) {
    isReverse = typeof isReverse !== "undefined" ? isReverse : false; // per Default, isOutro is false.
    // console.log("initBoyTween(). isReverse=" + isReverse);

    if (!isReverse) {
      scaleValue = window.initalBoyScaleTarget;
      var easing = Power2.easeIn;
    } else {
      scaleValue = 1;
      var easing = Power2.easeOut;
    }
    // $("#dev").text("window.boyFinalZoom=" + window.boyFinalZoom);

    if (!isTweenInit) {
      window.sceneBoyIntro = new ScrollMagic.Scene({ triggerElement: "#trigger1", duration: duration })
        .on("progress", function(e) {
          console.log("sceneBoyIntro", e.progress);
          if (e.progress == 1 && window.scrollPercentage < 1) window.sceneBoyIntro.progress(0);
          // console.log("sceneBoyIntro scaleValue = " + scaleValue);
          // Toggle background / foreground for .svg-content to not cover footer links.
          if (isBoyInFront && e.progress < 0.1) {
            // console.log("IN FRONT: false");
            $(".eyes").addClass("blink");
            $(".svg-content").removeClass("inFront");
            if (window.currentView == "intro") {
              $(".u25_logo")
                .removeClass("fadeOut")
                .addClass("fadeIn");
            }
            isBoyInFront = false;
          } else if (!isBoyInFront && e.progress > 0.1 && !window.fadeInProgress) {
            // console.log("IN FRONT: true");
            // console.error("fadeOut A!");
            $(".eyes.blink").removeClass("blink");
            $(".svg-content").addClass("inFront");
            $(".u25_logo")
              .removeClass("fadeIn")
              .addClass("fadeOut");
            isBoyInFront = true;
          }
          if (e.progress >= 0.66 && e.scrollDirection == "FORWARD") {
            // hide content
            // if (!window.loopInProgress) $("#intro").addClass("yellow y1");
            // $("#intro #intro_text").addClass("invisible");
          } else if (e.progress <= 0.5 && e.scrollDirection == "REVERSE") {
            // show content
            $("#intro").removeClass("yellow");
            // $("#intro #intro_text").removeClass("invisible");
          }
          if (!window.isWhiteChecked) {
            window.isWhiteChecked = true;
            $("#foreground, #front").addClass("white");
          }
        })
        .on("start", function(e) {
          console.error("sceneBoyIntro start", e);
          $("#foreground, #front").addClass("white");
        })
        .on("end", function(e) {
          console.error("sceneBoyIntro end. window.fadeInProgress=" + window.fadeInProgress);
          // console.log($("#BOY").attr("style"));
          // 1st zoom
          // transform: matrix(290.75, 0, 0, 290.75, -31597.8, -16946.2);
          // transform: matrix(290.75, 0, 0, 290.75, -31597.8, -16946.2);

          // fade INTRO to CONTENT
          // if (!window.fadeInProgress && window.scrollDirection == "down") {
          if (window.currentView == "intro" && e.scrollDirection == "FORWARD" && !window.fadeInProgress) {
            // && window.currentView == "intro"
            console.error("$B ---");
            // fadeIntroToContent();
            fadeIntroToContentNEW();

            // // fade INTRO to CONTENT
            // console.error("$A ---");
            // console.error("LOOP EVENT B");
            // // fadeIntroToContent();
            // fadeIntroToContentNEW();
          } else if (window.currentView == "content" && e.scrollDirection == "REVERSE" && !window.fadeInProgress) {
            fadeContentToIntro();
          }

          if (window.fadeInProgress && window.scrollTop <= 300) {
            console.error("resetting sceneBoyIntro progress");
            // $('#intro.yellow').removeClass('yellow')
            window.sceneBoyIntro.progress(0);
          }
        })
        // .on("destroy", function (e) {
        //   initBoyTween();
        // })
        .setTween("#BOY", {
          visibility: "visible",
          transformOrigin: window.originX + "% 12.5% 0",
          scale: scaleValue,
          ease: easing
          // xPercent: 100
        }) // the tween durtion can be omitted and defaults to 1
        .addTo(window.controller);

      isTweenInit = true;
    } else {
      console.log("Tween was already init.");
    }
  }
  initBoyTween();

  var isTweenInitOutro = false;
  function initBoyTweenOutro() {
    // isReverse = typeof isReverse !== "undefined" ? isReverse : true; // per Default, isOutro is false.
    // console.log("initBoyTween(). isReverse=" + isReverse);

    // if (!isReverse) {
    //   scaleValue = scale;
    //   var easing = Power2.easeIn;
    // } else {

    // }
    var scaleValue = 1;
    var easing = Power2.easeOut;
    // window.originX = baseOriginX - $(window).width() / 1290; // optimize the transformOrigin's X to keep boy horizontally centered
    window.originX = baseOriginX - $(window).width() / 2000; // optimize the transformOrigin's X to keep boy horizontally centered
    // var outroOriginX = window.originX - 0.845;
    var outroOriginX = window.originX;
    var outroDuration = $("#outro").height();
    if (outroDuration <= 100) {
      outroDuration = windowHeight;
    }
    console.log("outroDuration", outroDuration);
    // console.log("outroOriginX=" + outroOriginX);
    // $("#dev").text("boyFinalZoom=" + boyFinalZoom);
    $("#BOY2").attr(window.boyFinalZoomAttr, window.boyFinalZoom);

    if (!isTweenInitOutro) {
      window.sceneBoyOutro = new ScrollMagic.Scene({
        triggerElement: "#trigger4",
        triggerHook: "onEnter",
        // triggerElement: "#trigger3",
        // duration: duration
        // duration: duration * 1.5
        duration: outroDuration
      })
        .on("progress", function(e) {
          // console.log("sceneBoyOutro", e);

          // === GO BACK TO CONTENT
          if (e.progress == 0 && window.currentView == "outro" && e.scrollDirection == "REVERSE" && !window.fadeInProgress) {
            // bgtrack: resume
            console.log("bgtrack: resume");
            if (!window.isMute) {
              window.sound.play();
              window.sound.fade(0, 1, 1000);
            }

            hideScrollIndicator();
            $("#darkness").removeClass("hidden fadeOut");
            console.log("[4] window.currentView = 'content'");
            // window.currentView = "content";
            window.setCurrentView("content");
            $("#dev").text("window.currentView = " + window.currentView);
            // hide outro
            $("#outro .svg-container")
              .removeClass("fadeIn")
              .addClass("fadeOut");
            setTimeout(function() {
              $("#outro .svg-container")
                .addClass("hidden")
                .removeClass("fadeOut");
            }, 300);
            $("#foreground.white, #front.white").removeClass("white");
            $("#pagewalls").removeClass("hidden");
            $("#outro").addClass("dark");
            console.log("outro hidden.");
            console.error("fadeOut B!");
            $(".u25_logo")
              .removeClass("fadeIn")
              .addClass("fadeOut");

            // reset outro
            $("#outro #outro_text").removeClass("hidden");
            $("#outro #outro_text").css("opacity", "initial");
            $("#outro #outro_text").css("marginTop", "initial");
            window.outroStatus = 0;

            console.log("outro reset.");
          }
        })
        .on("update", function(e) {
          // console.warn(e);
          boyTweenLastEvent = e;

          if (e.scrollPos / e.endPos >= 1) {
            // console.error("%1");
            // if (!window.fadeInProgress && window.currentView == "intro") fadeIntroToContent();
          }
        })
        .on("start", function(e) {
          if (window.currentView == "content" || window.currentView == "outro") {
            // console.error("[2] window.boyFinalZoom=" + window.boyFinalZoom);
            console.log("BoyTweenOutro start", e);
            // console.error('BoyTweenOutro: start. $("#outro .svg-container").addClass("fadeIn");');
            $(".eyes.blink").removeClass("blink");
            if (e.scrollDirection == "FORWARD") {
              $("#BOY2")
                .attr(window.boyFinalZoomAttr, window.boyFinalZoom)
                .removeClass("hidden");
              $("#outro .svg-container").removeClass("fadeOut hidden");
              $("#outro .svg-container").addClass("fadeIn");
              console.log("#outro .svg-container   +   .fadeIn");
              setTimeout(function() {
                $("#foreground, #front").addClass("white");
                $("#pagewalls").addClass("hidden");
                console.log("darkness: adding fadeOut");
                $("#darkness")
                  .removeClass("fadeIn")
                  .addClass("fadeOut");
                $("#outro.dark").removeClass("dark");
              }, 150);
              showScrollIndicator();
            } else if (e.scrollDirection == "REVERSE") {
              // $("#darkness")
              //   .removeClass("fadeOut")
              //   .addClass("fadeIn");
            }
          }
        })
        .on("end", function(e) {
          console.log("BoyTweenOutro end", e);
          $(".eyes").addClass("blink");
        })
        // .on("end", function(e) {
        //   if (!window.fadeInProgress && window.currentView == "intro") {
        //     console.error("%2");
        //     fadeIntroToContent();
        //   }
        //   window.currentView = "outro";
        // })
        .setTween("#BOY2", {
          visibility: "visible",
          transformOrigin: outroOriginX + "% 12.5% 0",
          // transformOrigin: 0 + "% 12.5% 0",
          scale: scaleValue,
          // scale: 1,
          ease: easing
          // xPercent: 100
        })
        .addTo(window.controller);

      isTweenInitOutro = true;
    } else {
      console.log("TweenOutro was already init.");
    }
  }
  initBoyTweenOutro();

  // ============================================================================== OUTRO
  function showOutro() {
    $("#outro").removeClass("hidden");
    // window.currentView = "outro";
    console.error("setCurrentView to 'outro': 4");
    window.setCurrentView("outro");
    $("#dev").text("window.currentView = " + window.currentView);
  }

  var lastScrollTop = 0;
  var directionChangeAtPos = 0;
  window.sceneBoyIntroTriggerPos = window.sceneBoyIntro.triggerPosition();
  $(window).scroll(function() {
    if (window.currentView == "content") {
      // ============================================================================== PARALLAX: dynamic positions for bridge & cable
      if (scrollBottom > cablePos) {
        // cable is in view
        // cablePos;
        $(".cable").css("top", cablePos + 50 - scrollCenter / 2);
        // console.log("cable");
      } else {
        // console.log("vor cable");
      }

      if (scrollBottom > bridgePos - windowHeight) {
        // cable is in view
        // cablePos;
        $(".bridge").css("top", bridgePos + windowHeight * 0.5 - scrollCenter / 5);
        // console.log("bridge");
      } else {
        // console.log("vor cable");
      }
      // $(".walls").css("top", -scrollPercentage * 25);
      // $(".walls").css("top", 100 - scrollPercentage * 10);
      $("#pagewalls .walls").css("top", 100 - window.scrollPercentage * 10);
    }

    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        // ################################################################################################### THROTTLED SCROLLING CODE

        // ============================================================================== SCROLL DIRECTION
        var st = $(this).scrollTop();

        // var difference = parseInt(st - directionChangeAtPos);
        // console.log("difference=" + difference + " --> " + st + "(st) - " + directionChangeAtPos + "(directionChangeAtPos)");
        // if (difference >= 50) {
        if (st > lastScrollTop && window.scrollDirection !== "down") {
          // change scrollDirection to down
          window.scrollDirection = "down";
          // directionChangeAtPos = st;
          // console.log("down at " + directionChangeAtPos);
          // window.scrollDirectionDistance = 0;
          // $("#dev2").text("scrollDirection=" + window.scrollDirection);
        } else if (st < lastScrollTop && window.scrollDirection !== "up") {
          // change scrollDirection to up
          window.scrollDirection = "up";
          // directionChangeAtPos = st;
          // console.log("up at " + directionChangeAtPos);
          // window.scrollDirectionDistance = 0;
          // $("#dev2").text("scrollDirection=" + window.scrollDirection);
        }
        // } else {
        //   console.error("difference not 50+");
        // }

        // console.log(window.scrollDirection + "   st=" + st + " <> lastScrollTop=" + lastScrollTop);
        if (st >= 0) lastScrollTop = st;
        // $("#dev2").text("window.scrollDirection=" + window.scrollDirection);

        if (isContentShown) {
          // ============================================================================== POPULATE SCROLL VARIABLES FOR LATER USE
          window.scrollPercentage = (100 * $(window).scrollTop()) / ($(document).height() - $(window).height());

          // console.log("scrollTop=" + $(window).scrollTop());

          scrollTop = $(window).scrollTop();

          scrollCenter = $(window).scrollTop() + $(window).height() / 2;

          scrollBottom = $(window).scrollTop() + $(window).height();

          $("#dev2").text("window.scrollPercentage=" + window.scrollPercentage);

          // ============================================================================== NAV ACTIVITY INDICATORS
          for (var i = 0; i < activatableSections.length; i++) {
            // if in between top and bottom of a section and not active, set it active
            if (scrollCenter >= activatableSections[i].top && scrollCenter <= activatableSections[i].bottom && activeSection !== activatableSections[i].id) {
              // console.log("ACTIVE:" + activatableSections[i].id);
              $("nav a.active").removeClass("active"); // unset current active section
              $("nav a[href='" + activatableSections[i].id + "']").addClass("active"); // set new active section
              activeSection = activatableSections[i].id; // update variable
            } else if (
              activeSection == activatableSections[i].id &&
              scrollCenter < activatableSections[i].top &&
              scrollCenter > activatableSections[i].bottom
            ) {
              $("nav a[href='" + activatableSections[i].id + "']").addClass("active"); // set new active section
              activeSection = ""; // update variable
            }
          }

          // ============================================================================== EVENTS ON SCROLL POSITION

          if (scrollTop == 0) {
            if (window.currentView == "intro") {
              console.error("resetting sceneBoyIntro");
              window.sceneBoyIntro.progress(0);
            } else if (window.currentView == "content") {
              window.loopWebsite();
            }
          }
          if (window.scrollPercentage >= 99 && !window.loopInProgress) {
            console.log("Loop website: event A");
            window.loopWebsite();
          }

          // 30% – 40% scroll progress
          if (window.currentView == "content" && window.scrollPercentage >= 0 && window.scrollPercentage <= 50) {
            if (window.activeFallingTween == "bottom" || window.activeFallingTween == "") initFallingFromTop();
            if (!window.introShown) {
              $("#intro_text").addClass("show");
              window.introShown = true;
            }
          }

          // Check once per loop of BOY is hidden
          if (window.currentView == "content" && !window.isBOYcheckedForVisiblity) {
            window.isBOYcheckedForVisiblity = true;
            $("#intro .svg-container").addClass("fadeOut");
          }

          // 60% – 100% scroll progress
          if (window.currentView == "content" && window.scrollPercentage >= 50 && window.scrollPercentage <= 100) {
            if (window.activeFallingTween !== "bottom") initFallingToBottom();
            if (window.introShown) {
              $("#intro_text").removeClass("show");
              window.introShown = false;
            }
          }

          // Fade CONTENT back to INTRO (initial: scrollTop <= window.pos.contentTop +50)
          // if (window.currentView == "content" && window.scrollDirection == "up" && !fadeInProgress && scrollTop <= window.sceneBoyIntroTriggerPos) {

          // fadeContentToIntroNEW();
          // update status
          // console.log("----- fadeContentToIntroNEW()");
          // // window.fadeInProgress = true;
          // // window.currentView = "intro";
          // // Hide BOY
          // $("#BOY").removeClass("hidden");
          // // $("#BOY").animate(
          // //   {
          // //     opacity: 1
          // //   },
          // //   200
          // // );
          // isContentShown = false;
          // } else if (
          //   window.currentView == "intro" &&
          //   !window.fadeInProgress &&
          //   window.scrollDirection == "down" &&
          //   scrollTop >= window.sceneBoyIntroTriggerPos
          // ) {

          // }

          // OUTRO: scrollPercentage
          // if (window.currentView == "outro" && scrollPercentage >= 45) {
          //   // if(!wasChangedToIntro)
          //   // console.log("CHANGE TO INTRO");
          //   if (!wasChangedToIntro) {
          //     // fadeOutroToIntro();
          //     window.sceneBoyIntro.enabled(true);
          //     fadeInProgress = true;
          //     window.currentView = "intro";
          //     wasChangedToIntro = true;
          //   }
          // }

          // §1 INFINITE LOOP: end of website reached, jump to intro.
          if (window.currentView == "outro" && window.scrollPercentage >= 100 && !window.fadeInProgress) {
            window.loopWebsite();
          }

          // OUTRO INIT
          if (!isNewOutroInit && !window.fadeInProgress) {
            if (scrollBottom >= newOutroPosition) {
              //- scrollOffset

              console.log("OUTRO init!");
              // console.log(
              //   "newOutroPosition = " +
              //     newOutroPosition +
              //     ", scrollBottom = " +
              //     scrollBottom
              // );
              // fadeContentToIntroOutro("outro");
              test();
              isNewOutroInit = true;
            }
          }

          // HilfeFürAndere
          if (!isHilfeAndereInit) {
            if (scrollBottom >= hilfeAnderePos) {
              $("#HilfeFuerAndere h1").addClass("fadeIn");
              $("#HilfeFuerAndere .col-md:first-of-type").addClass("moveInLeft");
              $("#HilfeFuerAndere .col-md:last-of-type").addClass("moveInRight");
              isHilfeAndereInit = true;
            }
          }
          // DuBistMirWichtig
          // if (!isDBMWInit) {
          //   if (scrollBottom >= DBMWPos) {
          //     $("#DuBistMirWichtig h1, #DuBistMirWichtig>p").addClass("fadeIn");
          //     $("#DuBistMirWichtig .col-md:first-of-type").addClass("moveInLeft");
          //     $("#DuBistMirWichtig .col-md:last-of-type").addClass("moveInRight");
          //     isDBMWInit = true;
          //   }
          // }

          // HilfeFuerDich
          if (!isHilfeDichInit) {
            if (scrollBottom >= hilfeDichPos) {
              $("#HilfeFuerDich h1").addClass("fadeIn");
              $("#HilfeFuerDich .col-md:first-of-type").addClass("moveInLeft");
              $("#HilfeFuerDich .col-md:last-of-type").addClass("moveInRight");
              isHilfeDichInit = true;
            }
          }

          // ============================================================================== MENU TEXT COLOR & BOY BRIGHTNESS
          // Brighten text color dynamically, when user scrolls past 50% of the site
          if (window.scrollPercentage > 50) {
            // rgb_value = Math.floor(scrollPercentage * 2.5);
            rgb_value = 255;
            brightness = ((100 - window.scrollPercentage) / 40) * 100;
            iconbrightness = 0;
            invert = 1;
            $("nav ul li a.active").addClass("light");
          } else {
            rgb_value = 80;
            brightness = 100;
            iconbrightness = 33;
            invert = 0;
            $("nav ul li a.active").removeClass("light");
          }

          if (brightness < 20) brightness = 20;

          // menu text color
          $("nav ul li.text a").css("color", "rgb(" + rgb_value + "," + rgb_value + "," + rgb_value + ")");
          // $("nav ul li a.active:after").css(
          //   "background",
          //   "rgb(" + rgb_value + "," + rgb_value + "," + rgb_value + ")"
          // );

          // boy brightness
          $("#boy--animated").css(
            "-webkit-filter",
            "brightness(" + brightness + "%)",
            "-moz-filter",
            "brightness(" + brightness + "%)",
            "-o-filter",
            "brightness(" + brightness + "%)",
            "-ms-filter",
            "brightness(" + brightness + "%)",
            "filter"
          );
          $("#soundIcon img").css(
            "-webkit-filter",
            "brightness(" + iconbrightness + "%) invert(" + invert + ")",
            "-moz-filter",
            "brightness(" + iconbrightness + "%) invert(" + invert + ")",
            "-o-filter",
            "brightness(" + iconbrightness + "%) invert(" + invert + ")",
            "-ms-filter",
            "brightness(" + iconbrightness + "%) invert(" + invert + ")",
            "filter"
          );
        } //--- / END OF IF CONTENT IS SHOWN
        // --- / END OF THROTTLED SCROLLING CODE
        scrollTimeout = null;
      }, throttle);
    }
  });

  // *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ANIMATIONS
  // === CONSTRUCTOR FUNCTION
  function SpriteAnim(options) {
    var timerId,
      i = 0,
      element = document.getElementById(options.elementId);

    element.style.width = options.width + "px";
    element.style.height = options.height + "px";
    element.style.backgroundRepeat = "no-repeat";
    // element.style.backgroundImage = "url(" + options.sprite + ")";

    this.startAnimation = function() {
      timerId = setInterval(function() {
        if (i >= options.frames) {
          i = 0;
        }
        element.style.backgroundPosition = "-" + i * options.width - options.offset + "px 0px";
        i++;
        // if (options.elementId == "balloon--animated")
      }, options.rate);
    };

    this.stopAnimation = function() {
      clearInterval(timerId);
    };

    this.startAnimation();
  }

  // === BOY: INIT FALLING
  var boyAnimated = new SpriteAnim({
    // ----- BOY:
    elementId: "boy--animated",
    width: 110,
    height: 80,
    frames: 8,
    rate: 100,
    offset: 0
  });
  var monsterAnimated;
  // === MONSTER: INIT
  function initMonster() {
    var Mwidth = 7080 / 62.1;
    monsterAnimated = new SpriteAnim({
      // ----- MONSTER:
      elementId: "monster--animated",
      width: Mwidth,
      height: 88,
      frames: 62,
      rate: 30,
      offset: 5
    });
  }
  initMonster();
  function initBalloon() {
    var Bwidth = 1088 / 10;
    var balloonAnimated = new SpriteAnim({
      // ----- BALLOON:
      elementId: "balloon--animated",
      width: Bwidth,
      height: 140,
      frames: 10,
      rate: 100,
      offset: -4
    });

    // SCROLL CONTROLLED MOVEMENT
    var finalBottom = "100%";
    var duration = $("#phone img").height();
    // console.error("BALLOON: duration=" + duration);
    if (duration <= 200) {
      duration = windowHeight;
      // console.error("BALLOON updated: duration=" + duration);
    }
    window.sceneBalloon = new ScrollMagic.Scene({
      triggerElement: "#phone",
      // triggerHook: hook,
      offset: duration / 4,
      duration: duration
    })
      .on("progress", function(e) {
        // console.log("sceneBalloon", e);
        // console.log(e.progress * -50);
        $("#phone #wallContainer").css("top", e.progress * -100 + "px");
      })

      .on("start", function(e) {
        // window.timer.start();
        // window.isTimerStarted = true;
        if (typeof window.timerInterval == "undefined") initTimer();
      })
      .on("end", function(e) {
        console.log("----------------------- END");
        stopTimer();
      })
      .setTween("#balloon--animated", {
        bottom: finalBottom
      }) // the tween duration can be omitted and defaults to 1
      .addTo(window.controller);

    // trigger css animation
    // $("#balloon--animated").addClass("move");

    // stop png animation shortly after
    // setTimeout(function() {
    //   balloonAnimated.stopAnimation();
    // }, 11000);
  }
  initBalloon();

  // *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** SMOOTH SCROLLING
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          var targetOffset = $(window).height() * 0.25;
          $("html, body").animate(
            {
              scrollTop: target.offset().top - targetOffset
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  // *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** SHOW INTRO TEXT
  $("#intro_text").addClass("show");
});
