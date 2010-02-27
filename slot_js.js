//Global lever canvas drawing function
function updateLever() {
    var ball = $("#ball");
    var chain = $("#chain");
    var d1 = ball.offset();
    var d2 = chain.offset();
    var canvasEl = $("#canvas")[0];
    var ctx = canvasEl.getContext("2d");
    ctx.clearRect(0,0,canvasEl.width, canvasEl.height);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';

    //this was left in from working with lines.
    //it adds a nice outline effect
    ctx.beginPath();
    ctx.moveTo(d1.left, d1.top);

    var bottom = d1.top+10-d2.top;
    ctx.rect(d2.left+10, d2.top, 10, bottom);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
};

function handleSpin() {
    for(var i = 0; i < 5; i++) {
        var timeout = i*500;
        setTimeout(function () { spin("#spin1") }, timeout);
        setTimeout(function () { spin("#spin2") }, timeout);
        setTimeout(function () { spin("#spin3") }, timeout);
    };

};

function spin(div) {
    var spinLoc = $(div).offset();
    var newDiv = $("<div style='position:absolute; float:left; z-index: 100;'> lololol </div>");
    newDiv.hide()
        .css('top', spinLoc.top+10)
        .css('left', spinLoc.left+10);
    $("#spin1").before(newDiv);
    //TODO: this needs to be converted into an overlay
    newDiv
        .slideToggle(300)
        .animate({top:spinLoc.top+75}, 600, 'swing')
        .slideUp(300);
    setTimeout(function () {newDiv.remove() }, 2500);
};

//Setup all main events
$(function() {
    //manually set contain because Safari wasn't listening
    var l = $("#lever").offset();
    var contain = [l.left, l.top, l.left+30, l.top+270];
    $("#ball").draggable({ axis: 'y' , cursor: 'move', containment: contain});

    //When you drop the hammer (lever).
    $("#sweetspot").droppable({
        drop: function(event, ui) {
            handleSpin();
        }
    });

    //When you drag the lever, have the canvas update
    $("#ball").bind('drag', function (event,ui) {
        updateLever();
    });

    //Messy section. Makes the line get updated hella faster and in the background,
    //while the "move ball to home" animation is taking place.
    $("#ball").bind('dragstop', function (event,ui) {
        var fasterUpdate = setInterval(updateLever, 50);
        $("#ball").animate({top:0}, 1500, updateLever);
        setTimeout(function () {
            clearInterval(fasterUpdate);
            }, 1500);

    });

    //Initial draw of the lever
    updateLever();
});
