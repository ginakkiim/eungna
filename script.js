var backgrounds = new Array();
var characters = new Array();
var sounds = new Array();
var indexB = 0;
var indexC = 0;

window.addEventListener("keydown", switchBackground, false);

(function($){

  $.extend({
    playSound: function(){
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
    }
  });

})(jQuery);

$(function () {
    $('body').click(function (e) {
        var x = e.pageX - 170 + 'px';
        var y = e.pageY - 150 + 'px';
        var charIndex = navigateC();
        var img = $(characters[charIndex]);
        var div = $('<div>').css({
            "position": "absolute",
            "left": x,
            "top": y
        });
        animateDiv($(div));
        div.append(img);
        $(document.body).append(div);
        $.playSound(sounds[indexC]);
    });
});

function makeNewPosition() {
    var h = $(window).height() - 200;
    var w = $(window).width() - 200;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh, nw];

}

function animateDiv($target) {
    var newq = makeNewPosition();
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    $target.animate({ top: newq[0], left: newq[1] }, speed, function () {
        animateDiv($target);
    });
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = 0.1;
    var speed = Math.ceil(greatest / speedModifier);
    return speed;
}

function navigateB(){
	indexB += 1;
	if (indexB >= backgrounds.length){
		indexB = indexB - backgrounds.length;
	}
	if (indexB < 0){
		indexB = backgrounds.length + indexB;
	}
	return backgrounds[indexB];
}

function switchBackground(){
	if (document.body){
		document.body.style.backgroundImage = 'url('+ navigateB() +')';
	}
	return !(e.keyCode == 32);
}

function navigateC(){
	indexC = Math.round(Math.random() * (characters.length - 1))
	return indexC;
}

function loadArray(){
    backgrounds[0] = "resources/background1.jpg";
    backgrounds[1] = "resources/background2.jpg";
    backgrounds[2] = "resources/background3.jpg";
    backgrounds[3] = "resources/background4.jpg";
    characters[0] = '<img src="resources/character1.png"/>';
    characters[1] = '<img src="resources/character2.png"/>';
    characters[2] = '<img src="resources/character3.png"/>';
    characters[3] = '<img src="resources/character4.png"/>';
    characters[4] = '<img src="resources/character5.png"/>';
    characters[5] = '<img src="resources/character6.png"/>';
    characters[6] = '<img src="resources/character7.png"/>';
    characters[7] = '<img src="resources/character8.png"/>';
    characters[8] = '<img src="resources/character9.png"/>';
    characters[9] = '<img src="resources/character10.png"/>';
    sounds[0] = "resources/sound1";
    sounds[1] = "resources/sound2";
    sounds[2] = "resources/sound3";
    sounds[3] = "resources/sound4";
    sounds[4] = "resources/sound5";
    sounds[5] = "resources/sound6";
    sounds[6] = "resources/sound7";
    sounds[7] = "resources/sound8";
    sounds[8] = "resources/sound9";
    sounds[9] = "resources/sound10";
}

window.onload = loadArray();