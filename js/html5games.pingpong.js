(function($){
/*75650854*/
  // data definition
  var pingpong = {
    paddleA: {
              x: 50,
              y: 100,
              width: 30,
              height: 70,
    },
    paddleB: {
              x: 320,
              y: 100,
              width: 30,
              height: 70
    },
    playground: {
                offsetTop: $("#playground").offset().top,
                height: parseInt($("#playground").height()),
                width: parseInt($("#playground").width()),
    },
    ball: {
            speed: 5,
            x: 150,
            y: 100,
            radius: 20,
            directionX: 1,
            directionY: 1
    }
  };
var scoreA=0;
var scoreB=0;
pingpong.pressedKeys = [];
var KEY = {
           UP: 38,
           DOWN: 40,
           W: 87,
           S: 83
}

document.getElementById('upLeft').onclick = function() {
   var top = parseInt($("#paddleA").css("top"));
$("#paddleA").css("top",top-20);   
};
document.getElementById('DownLeft').onclick = function() {
   var top = parseInt($("#paddleA").css("top"));
$("#paddleA").css("top",top+20);   
};



document.getElementById('upRight').onclick = function() {
   var top = parseInt($("#paddleB").css("top"));
$("#paddleB").css("top",top-20);   
};
document.getElementById('DownRight').onclick = function() {
   var top = parseInt($("#paddleB").css("top"));
$("#paddleB").css("top",top+20);   
};



  // ball movement logic
function moveBall() {
  // reference useful variables
  var playgroundHeight = parseInt($("#playground").height());
  var playgroundWidth = parseInt($("#playground").width());
  var ball = pingpong.ball;
  // check playground boundary
  // check bottom edge
  if (ball.y + ball.speed*ball.directionY > playgroundHeight) {
      ball.directionY = -1;
  }
  // check top edge
  if (ball.y + ball.speed*ball.directionY < 0) {
      ball.directionY = 1; // siena virsutine
  }
  // check right edge
  if (ball.x + ball.speed*ball.directionX > playgroundWidth) {
      ball.directionX = -1; // siena desine
  }
  // check left edge
  if (ball.x + ball.speed*ball.directionX < 0) {
    // player A lost.
    playerAWin()
  }
  if (ball.x + ball.speed*ball.directionX < 0) {
      ball.directionX = 1;
  }
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
  // check moving paddle here, later.

  // check left paddle
    var paddleAX = parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));

  if (ball.x + ball.speed*ball.directionX < paddleAX) {
      if (ball.y + ball.speed*ball.directionY <= paddleAYBottom && ball.y + ball.speed*ball.directionY >= paddleAYTop) {
        ball.directionX = 1; // paddleA blokas
      }
  }
  // check right paddle
  if (ball.x +ball.speed*ball.directionX > playgroundWidth) {
  // player B lost.
      playerBWin();
  }
  var paddleBX = parseInt($("#paddleB").css("left"));
  //alert(paddleBX);
  var paddleBYBottom = parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").css("height"));
  var paddleBYTop = parseInt($("#paddleB").css("top"));

  if(ball.x + ball.speed*ball.directionX >= paddleBX) {
      if(ball.y + ball.speed*ball.directionY <= paddleBYBottom && ball.y + ball.speed*ball.directionY >= paddleBYTop) {
          ball.directionX = -1;
          //alert('Kaire');
      }
  }
  // actually move the ball with speed and direction
  $("#ball").css({
      "left" : ball.x,
      "top" : ball.y
  });
}


  // winning logic
  function playerAWin() {
    // reset the ball;
    pingpong.ball.x = 250;
    pingpong.ball.y = 100;

    // update the ball location variables;
    pingpong.ball.directionX = -1;

       scoreA += 1;
       $("#scoreA").html(scoreA);
  }
  function playerBWin() {
    // reset the ball;
    pingpong.ball.x = 150;
    pingpong.ball.y = 100;

    // update the ball location variables;
    pingpong.ball.directionX = 1;
       scoreB += 1;
       $("#scoreB").html(scoreB);
  }

  function renderBall() {
    var ball = pingpong.ball;
    $("#ball").css({
      "left" : ball.x + ball.speed * ball.directionX,
      "top" : ball.y + ball.speed * ball.directionY
    });
  }
  // browser render loop
  function render() {
    renderBall();
    window.requestAnimationFrame(render);
  }

  function gameloop() {
      moveBall();
      movePaddles();
  }

$(function(){
// set interval to call gameloop every 45 milliseconds
//pingpong.timer = setInterval(gameloop,80);
  // mark down what key is down and up into an array called "pressedKeys"
  $(document).keydown(function(e){
      pingpong.pressedKeys[e.which] = true;
  });
  $(document).keyup(function(e){
      pingpong.pressedKeys[e.which] = false;
  });

});

function movePaddles() {
  var playgroundHeight = parseInt($("#playground").height());
  // use our custom timer to continuously check if a key is pressed.

  if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
  // move the paddle B up 5 pixels

      var top = parseInt($("#paddleB").css("top"));
      $("#paddleB").css("top",top-5);
  }
  if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
  // move the paddle B down 5 pixels

      var top = parseInt($("#paddleB").css("top"));
      $("#paddleB").css("top",top+5);
  }
  if (pingpong.pressedKeys[KEY.W]) { // w
  // move the paddle A up 5 pixels

      var top = parseInt($("#paddleA").css("top"));
      $("#paddleA").css("top",top-5);
  }
  if (pingpong.pressedKeys[KEY.S]) { // s
  // move the paddle A down 5 pixels

      var top = parseInt($("#paddleA").css("top"));
      $("#paddleA").css("top",top+5);
  }
}

  // starting point of entire game
  function init() {
    // set interval to call gameloop logic in 30 FPS
    pingpong.timer = setInterval(gameloop, 1000/59);

    // view rendering
    window.requestAnimationFrame(render);

  }
  // Execute the starting point
  init();

})(jQuery);



