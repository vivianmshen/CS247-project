var myVideo;

function playPause() { 
  if (myVideo.paused) {
    myVideo.play();
  } else {
    myVideo.pause(); 
  }
} 

function makeBig() { 
  myVideo.width=560; 
} 

function makeSmall() { 
  myVideo.width=320; 
} 

function makeNormal() { 
  myVideo.width=420; 
} 

Pictures = new Meteor.Collection("leopardPictures");
Animals = new Meteor.Collection("animals");

Handlebars.registerHelper('list', function(context, block) {
  var counter = 0;
  return "<ul class=\"pictures\">" + context.map(function(item) {
    var div = "<div id=\"" + counter + "\">\n";
    div = div + "<li>" + block(item) + "</li>\n";
    div = div + "</div>";
    counter += 1;
    return div;
  }).join("\n") + "</ul>";
});

Handlebars.registerHelper('polaroidList', function(context, block) {
 return "<div class=\"photoObject\">" +
 "<ul class=\"polaroids\">" + context.map(function(item) {
   return "<li>" + block(item) + "</li>";
 }).join("\n") + "</ul>" + "</div>";
});

Template.animalSlides.leopardPictures = function () { 
  return Pictures.find({});
}

Template.animalSlides.animals = function () {
  // console.log(Animals.findOne());
  return [Animals.findOne()];
}

Template.animalSlides.rendered = function () {
  // console.log("rendered");
  myVideo=document.getElementById("video1");
  console.log("VIDEO: " + myVideo);


  $(".quiz").on("click", function (evt) {
    // console.log(evt.target);
    handleQuiz(evt);
  });
  // $(".leopardPic").data({"onLeapPoint": onLeapPoint});
  $(".slide-container").each(function (i, obj) {
    curAnimalMaxIndex = Math.max(curAnimalMaxIndex, $(obj).data("index"));
    slides.push($(obj).detach());
  });
  // console.log("detached");
  slides[0].appendTo("#animalSlides");
  // console.log(slides);
}

function onLeapPoint(obj) {
  console.log("Pointed: " + obj);
  console.log("this: " + this);
}

Template.children.facts = function () {
  var animal = Animals.findOne();
  if (animal != null) {
    // console.log(animal.facts);
    return animal.facts;
  }
  return ["test", "test"];
}

Template.children.children = function () {
  return Meteor.users.find({});
}

Template.children.full_name = function () {
  var name = this.profile.firstName + " " + this.profile.lastName;
  console.log(name);
  return name;
}

function showSlides() {
  animalSlides.style.display = "block";
  calibration.style.display = "none";
}

function showCalibration() {
  children.style.display= "none";
  animalSlides.style.display = "none";
  calibration.style.display = "block";
  console.log("showing calibration page");
  document.body.style.background = 'url(http://i.imgur.com/oblucGK.png)';
}
  
function showLogin() {
  calibration.style.display = "none";
  children.style.display= "block";
  animalSlides.style.display = "none";
}

Template.children.events({
  'click': function (evt) {
    console.log("logging in: " + this.username);
    console.log(evt.target);
    Meteor.loginWithPassword(this.username, this.username, function (err) {
      if (err) {
        console.log("log in failure");
      } else {
        showCalibration();
        console.log("logged in");
        setTimeout(function() {
          Meteor.logout();
          showLogin();
        }, 500000);
      }
    });
  }
});

Template.calibration.events({
  'click': function (evt) {
    console.log("starting slides");
    showSlides();
  }
});

function playSound(id) {
  var audio = document.getElementById(id);
  audio.currentTime = 0;
  audio.play();
}

var leapMinX = -200;
var leapMaxX = 200;
var leapMinY = 100;
var leapMaxY = 600;
var leapMinZ = -180;
var leapMaxZ = 180;
var width = $(window).width();
var height = $(window).height();
var timer;
var prevObj = null;

function endAndStartTimer() {
  clearTimeout(timer);
  setTimeout(function() {console.log("New timer");}, 1500);
  console.log("timer's been reset");
}

function unzoom(currPicture) {
  $(currPicture).click();
  isZoomed = false;
}

var $prevObj = null;
var leapClickTimer = null;

function clickWithLeap($obj) {
  if (!$obj.is($prevObj)) {
    $obj.css("backgroundColor", "red");
    if ($prevObj != null) $prevObj.css("backgroundColor", "white");
    $prevObj = $obj;
    clearTimeout(leapClickTimer);
    leapClickTimer = setTimeout(function () {triggerClick($obj)}, 1500);
  }
}

function zoomWithLeap($obj) {
  // if (!$obj.is($prevObj)) {
  //   $prevObj = $obj;
  //   clearTimeout(leapClickTimer);
  //   leapClickTimer = setTimeout(function () {triggerClick($obj)}, 1500);
  // }
}

function triggerClick($obj) {
  $prevObj = null;
  if ($obj.hasClass(".leap-clickable")) {
    $obj.click();
    return;
  }
  $clickables = $obj.closest(".leap-clickable");
  if ($clickables.length > 0) {
    console.log($clickables);
    $($clickables[0]).click();
  }
}

function bingSelected ($obj) {
  if ($prevObj != null) $prevObj.css("border-color", "white");
  $prevObj = $obj;
  index = $obj.data("index");
  $obj.css('border-color', 'red');
  $(".textBlurb").show();
  $(".textBlurb").html(facts[index].info);
  clearTimeout(timer);
  timer = setTimeout(function () {
    $(".textBlurb").hide();
    $obj.css('border-color', 'white');
  }, 1500);             
}

function handleLeapQuiz($obj) {
  if (!needPause && !$obj.is($prevObj)) {
    $obj.css("border-color", "red");
    if ($prevObj != null) $prevObj.css("border-color", "white");
    $prevObj = $obj;
    clearTimeout(leapClickTimer);
    leapClickTimer = setTimeout(function () {
      var correct = $obj.data("correct");
      var answerid = $obj.data("answerid");
      var soundid = $obj.data("sound");
      playSound(soundid);
      $(".answerBoxContainer").show();
      if (correct) {
        $("#rightAns" + answerid).show();
        $("#wrongAns" + answerid).hide();
      } else {
        $("#rightAns" + answerid).hide();
        $("#wrongAns" + answerid).show();
      }
    }, 2000);
  }
}

var leapActions = {
  testPoint : function($obj) {
    console.log($obj);
  },
  clickWithLeap: function($obj) {
    clickWithLeap($obj);
  },
  zoomWithLeap: function($obj) {
    zoomWithLeap($obj);
  },
  bingSelected: function($obj) {
    bingSelected($obj);
  },
  handleLeapQuiz: function($obj) {
    handleLeapQuiz($obj);
  }
};

var controllerOptions = {enableGestures: true};
var currSwipeId = 0;
var pageCount = 0;
var prevObjPage = 0;
var MAX_PAGES = 6;
var isZoomed = false;
var newPage = true;
var needPause = false;

scale = function(value, oldMin, oldMax, newMin, newMax) {
    return (((newMax - newMin) * (value - oldMin)) / (oldMax - oldMin)) + newMin;
};

Leap.loop(controllerOptions, function (frame) {
  if(frame.id % 2 == 0) {
    if (frame.gestures.length > 0) {
      for (var i = 0; i < frame.gestures.length; i++) {
        var gesture = frame.gestures[i];
        if (gesture.type == "circle") {
          //console.log("CIRCLING!!!");
          // console.log(gesture.id);
          if (gesture.id != currSwipeId) {
            currSwipeId = gesture.id;
            if (gesture.normal[0] < 0) {
              console.log("right circle");
              if (calibration.style.display == "block") {
                showSlides();
              }
              else moveRight();
            }
            if (gesture.normal[0] > 0) {
              console.log("SWIPE LEFT " + gesture.id);
              moveLeft();
            } 
          }  
        }
        if (gesture.type == "screenTap" || gesture.type == "keyTap") {
          if (curAnimalIndex == 3) {
            playPause();
            console.log("CALL VIDEO PLAY FUNCTION");
          }
        }
      }
    }
  }

  if (frame.fingers == undefined) { 
    var fingersLength = 0 
  } else {
    var fingersLength = frame.pointables.length;
  }
  
  for (var fingerId = 0, fingerCount = fingersLength; fingerId != fingerCount; fingerId++) {
    var finger = frame.pointables[fingerId];
    var position = finger.tipPosition;
    var screenPositionX = scale(position[0], leapMinX, leapMaxX, -100, width);
    var screenPositionY = scale(position[1], leapMinY, leapMaxY, height, -100);
    screenPositionY -= 130;
    var $originalObj = $(document.elementFromPoint(screenPositionX, screenPositionY));
    $("#cursor").css("left", screenPositionX + "px").css("top", screenPositionY + "px"); // move the cursor
    var $obj = $originalObj;
    var $leapPointable = $obj.closest(".leap-pointable"); // grabs the closest object up the DOM tree that is pointable
    if ($leapPointable.length > 0) {
      var $target = $($leapPointable[0]); // $leapPointable is an array
      if (!$target.is($prevObj)) leapActions[$target.data("onleappoint")]($target); // call the function saved in data-onleappoint
    }
  }
});

var curAnimalIndex = 0;
var curAnimalMaxIndex = 0;
var curAnimal = "snowLeopard";
var slides = [];
var zoomedObj = null;


var quizTimer;

function moveLeft () {
  $prevObj = null;
  clearTimeout(quizTimer);
  $(".answerBoxContainer").hide();

  if (zoomedObj != null) {
    zoomedObj.click();
  }
  // console.log("PAGE " + curAnimalIndex);
  slides[curAnimalIndex].detach();
  $(document.getElementById("page" + curAnimalIndex)).removeClass('current');
  curAnimalIndex -= 1;
  curAnimalIndex = Math.max(0, curAnimalIndex); // ensures we don't go past the bounds
  if (slides[curAnimalIndex].data("pause") == true) {
    console.log("setting timer");
    needPause = true;
    clearTimeout(quizTimer);
    quizTimer = setTimeout(function () {
      needPause = false;
    }, 1500);    
  }
  slides[curAnimalIndex].appendTo("#animalSlides");
  
  //if(slides[curAnimalIndex].data("pause") == false) console.log(curAnimalIndex + "NO PAUSE");
  $(document.getElementById("page" + curAnimalIndex)).addClass('current');
};

function moveRight () {
  $prevObj = null;
  clearTimeout(quizTimer);
  $(".answerBoxContainer").hide();

  if (zoomedObj != null) {
    zoomedObj.click();
  }
  // console.log("PAGE " + curAnimalIndex);
  slides[curAnimalIndex].detach();
  $(document.getElementById("page" + curAnimalIndex)).removeClass('current');
  curAnimalIndex += 1;
  curAnimalIndex = Math.min(curAnimalMaxIndex, curAnimalIndex); // ensures we don't go past the bounds
  if (slides[curAnimalIndex].data("pause") == true) {
    console.log("setting timer");
    needPause = true;
    clearTimeout(quizTimer);
    quizTimer = setTimeout(function () {
      needPause = false;
    }, 1500);    
  }
  slides[curAnimalIndex].appendTo("#animalSlides");
  $(document.getElementById("page" + curAnimalIndex)).addClass('current');
};

$(document).ready(function () {
  $("<div></div>", {
    "class": "cursor",
    "id": "cursor"
  }).insertBefore($("#children"));
  createFacts();
  $(".arrow.left").on("click", function(event) {
    moveLeft();
  });
  $(".arrow.right").on("click", function(event) {
    moveRight();
  });
  $(".pic-container").zoomTarget();
  $(".pic-container").on("click", function(event) {
    if (zoomedObj != null && zoomedObj.id === $(event.currentTarget).id) {
      zoomedObj = null;
    } else {
      zoomedObj = $(event.currentTarget);
    }
  });

  // event listener for key press
  $(document).keydown(function(e){
      switch(e.which) {
          case 37:
              moveLeft();
          break;
          case 39:
              moveRight();
          break;
          default: return; // allow other keys to be handled
      }
      e.preventDefault();
  });
});

var facts = [
        {
          name: "eye",
          info: "Snow leopards can see 6 times better than humans!",
          dimensions: {
            x: 211,
            y: 510,
            width: 42,
            height: 42
          }
        },
        {
          name: "tail",
          info: "A snow leopard's tail is about as long as its body",
          dimensions: {
            x: 67,
            y: 127,
            width: 150,
            height: 150
          }
        },
        {
          name: "spots",
          info: "Snow leopards have black and brown spots to help camouflage it from prey",
          dimensions: {
            x: 391,
            y: 860,
            width: 60,
            height: 60
          }
        },
        {
          name: "habitat",
          info: "Snow leopards live in cold and dry places such as in the mountains of Asia ",
          dimensions: {
            x: 188,
            y: 1000,
            width: 100,
            height: 100
          }
        }
      ];

function createFacts () {
  for (var i = 0; i < facts.length; i++) {
    var fact = facts[i];
    var div = $( "<div></div>", {
      "class": "bing-choice leap-pointable",
      "width": fact.dimensions.width,
      "height": fact.dimensions.height,
      "data-bing" : "true",
      "data-selectable": "true",
      "data-index": i,
      "data-info": fact.info,
      "data-onleappoint": "bingSelected"
    }).css("position", "absolute")
    .css("top", fact.dimensions.x)
    .css("left", fact.dimensions.y).appendTo($(".bingContainer"));
  };
}
