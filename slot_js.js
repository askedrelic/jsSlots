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

    //this was left in from working with lines. not sure how it works, but
    //it adds a nice outline effect
    ctx.beginPath();
    ctx.moveTo(d1.left, d1.top);

    var bottom = d1.top+10-d2.top;
    ctx.rect(d2.left+10, d2.top, 10, bottom);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
};

function spin(div) {
    var spinLoc = $(div).offset();
    var newDiv = $("<div style='position:absolute; float:left; z-index: 100;'> lololol </div>");
    newDiv
        .hide()
        .css('top', spinLoc.top+10)
        .css('left', spinLoc.left+10);
    $("#spin1").before(newDiv);
    newDiv.slideToggle(300).animate({top:spinLoc.top+75}, 600).slideUp(300);
    setTimeout(function () {newDiv.remove() }, 2500);
};

$(function() {
    //manually set contain because Safari wasn't listening
    var l = $("#lever").offset();
    var contain = [l.left, l.top, l.left+30, l.top+270];
    $("#ball").draggable({ axis: 'y' , cursor: 'move', containment: contain});
    $("#sweetspot").droppable({
        drop: function(event, ui) {
            spin("#spin1");
            spin("#spin2");
            spin("#spin3");
            //for(i = 0; i<4000; i+1100) {
                //setTimeout(function () {spin("#spin1") }, i);
            //};
        }
    });


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

    updateLever();
});
