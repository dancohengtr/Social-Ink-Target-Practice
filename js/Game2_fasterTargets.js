var canMouseX = false;
var canMouseY = false;
var isDragging = false;
var background = 'rgb(255,255,255)';
var clicked;
var triangle;
var hit = false;
var triangleX = 600;
var triangleY = 613;
var triangleWidth = 155;
var triangleHeight = 113;
var targetX = 0;
var targetY = 20;
var targetDX = 7;
var targetWidth;
var targetHeight;
var targetCollision = false;
var dotsDown = false;
var dottedline;
var dotsX = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550];
var dotsY = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
var dotWidth = 5;
var dotHeight = 420;
var canvas = undefined;
var context = undefined;
var hours = 0;
var minutes = 0;
var seconds = 0;
var hourString = '0' + hours.toString();
var minuteString = '0' + minutes.toString();
var secondString = '0' + seconds.toString();
var timerLoop = null;
var score = 0;
var allHit = false;
var targetHit_1 = false;
var targetHit_2 = false;
var targetHit_3 = false;
var easing = 0.05;
var easing_2 = 0.05;
var flag = 0;





function timer(){

  if(seconds < 10){
    secondString = '0' + seconds.toString();
  }else{
    secondString = seconds.toString();
  }

  if(minutes < 10){
    minuteString = '0' + minutes.toString();
  }else{
    minuteString = minutes.toString();
  }

  if(hours < 10){
    hourString = '0' + hours.toString();
  }else{
    hourString = hours.toString();
  }


  if(seconds < 60){
    seconds++;
  }
  if(seconds == 60){
    seconds = 0;
    minutes++;
  }
  if(minutes == 60){
    seconds = 0;
    minutes = 0;
    hours++;
  }
  if(hours == 24){
    seconds = 0;
    minutes = 0;
    hours = 0;
  }

}


window.onload = function () {
  //initialize canvas and draw loop
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  clicked = false;    
  setInterval(draw, 20);
  timerLoop = setInterval(timer, 1000);    
}


function draw(){


  triangle = document.getElementById('triangle');
  dottedline = document.getElementById('dotted-line');

  //change background color here!!
  context.fillStyle = background;
  ////////////////////////////////
  context.fillRect(0, 0, canvas.width, canvas.height);




  tri_dot_Collision();



  if(allHit == true){
    clearInterval(timerLoop);
    context.font = "30px Arial";
    context.fillStyle = "#28ACF4";
    context.fillText("You finished in " + minutes + " minutes and " + seconds + " seconds!", 0, 400);
    context.font = "30px Arial";
    context.fillStyle = "#28ACF4";
    context.fillText('Score: ' + score, 150, 450);
    context.fillStyle = "#28ACF4";
    context.fillRect(200, 500, 200, 50);
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillText("Restart", 250, 535);

  }else{
    for(var i = 0; i < 10; i++){  
      context.drawImage(dottedline, dotsX[i], dotsY[i], dotWidth, dotHeight);
    }
    if(triangleX < 0){
      triangleX = 0;
    }else if(triangleX > canvas.width - triangleWidth){
      triangleX = canvas.width - triangleWidth;
    }
    context.drawImage(triangle, triangleX, triangleY, triangleWidth, triangleHeight);
    context.font = "30px Arial";
    context.fillStyle = "#28ACF4";
    context.fillText(hourString + ':' + minuteString + ':' + secondString, 50, 50);
    context.font = "30px Arial";
    context.fillStyle = "#28ACF4";
    context.fillText('Score: ' + score, 200, 50);
    checkHits();

  }
}



function restart(){
  console.log('restarting');
  allHit = false; 
  hours = 0;
  minutes = 0;
  seconds = 0;
  score = 0;
  triangleX = 600;
  targetHeight = 113;
  targetWidth = 155;
  targetX = 0;
  targetHit_1 = false;
  targetHit_2 = false;
  targetHit_3 = false;
  timerLoop = setInterval(timer, 1000);
}

//draw and change target if hit 
function checkHits(){


  if(targetHit_1 == false && targetHit_2 == false && targetHit_3 == false){

    console.log('none hit');

    targetHeight = 113;
    targetWidth = 155;

    if(targetX < 0 || targetX > canvas.width - targetWidth){
      targetDX = -targetDX;
      swing.play();
    }

    targetX += targetDX;

    context.drawImage(triangle, targetX, targetY, targetWidth, targetHeight);

    hit = tri_target_Collision();
    if(hit == true){
      window.setTimeout(function(){targetHit_1 = true;}, 400);
      window.setTimeout(function(){background = 'rgb(255,255,255)';}, 150);    
    }

  }else if(targetHit_1 == true && targetHit_2 == false && targetHit_3 == false){

    console.log('first hit');

    targetWidth = 83;
    targetHeight = 125;

    if(targetX < 0 || targetX + targetWidth > canvas.width){
      targetDX = -targetDX;
      swing.play();
    }

    targetX += (targetDX * 2);

    context.drawImage(triangle, targetX, targetY, targetWidth, targetHeight);

    hit = tri_target_Collision();
    if(hit == true){
      window.setTimeout(function(){targetHit_2 = true;}, 400);
      window.setTimeout(function(){background = 'rgb(255,255,255)';}, 150);  
    }

  }else if(targetHit_1 == true && targetHit_2 == true && targetHit_3 == false){

    console.log('second hit');

    targetWidth = 53;
    targetHeight = 95;

    if(targetX < 0 || targetX + targetWidth > canvas.width){
      targetDX = -targetDX;
      swing.play();
    }

    targetX += (targetDX * 3);

    context.drawImage(triangle, targetX, targetY, targetWidth, targetHeight);

    hit = tri_target_Collision();
    if(hit == true){
      window.setTimeout(function(){targetHit_3 = true;}, 400);
      window.setTimeout(function(){background = 'rgb(255,255,255)';}, 150);  
    }

  }else if(targetHit_1 == true && targetHit_2 == true && targetHit_3 == true){

    console.log('third hit');
    allHit = true;
    crash.play();
  }
}


//check if dots hit triangle
function tri_target_Collision(){
  //check all dots
  for(var y = 0; y < dotsX.length; y++){
    if(dotsX[y] < targetX + targetWidth &&
       dotsX[y] + dotWidth > targetX &&
       dotsY[y] < targetY + targetHeight){
      //add to score
      score++;
      //red background as response to hit
      background = 'rgb(255, 0, 0)';
      //return true if hit
      return true;

    }
  }

}



//check if triangle and dots have collided
function tri_dot_Collision(){

  for(var x = 0; x < dotsX.length; x++){

    if (dotsX[x] + (dotWidth / 2) > (triangleX + (triangleWidth / 2)) - 40 && dotsX[x] + (dotWidth / 2) < (triangleX + (triangleWidth / 2)) + 40 ){

      dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)+80)-dotsY[x]) * easing;

      if (clicked == true){
        dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)-500)-dotsY[x]) * easing_2;


      }else if(clicked == false){
        dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)+80)-dotsY[x]) * easing_2;

      }

    }else if (dotsX[x] + dotWidth < triangleX + (triangleWidth/2)  && dotsX[x] + dotWidth  > triangleX){

      dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)+140)-dotsY[x]) * easing;

      if (clicked == true){
        dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)-200)-dotsY[x]) * easing_2;


      }else if(clicked == false){
        dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)+140)-dotsY[x]) * easing_2;

      }

    }else if (dotsX[x] + dotWidth > triangleX + (triangleWidth/2)  && dotsX[x] + dotWidth  < triangleX + triangleWidth){

      dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)+140)-dotsY[x]) * easing;

      if (clicked == true){
        dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)-200)-dotsY[x]) * easing_2;


      }else if(clicked == false){
        dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)+140)-dotsY[x]) * easing_2;

      }

    }else{
      dotsY[x] = dotsY[x] + ((((triangleY+triangleHeight) -triangleY)+190)-dotsY[x]) * easing;
    }
  }
}




window.onmousedown = function handleMouseDown(e){
  if(e.clientX >= triangleX || e.clientX <= triangleX + triangleWidth || e.clientY >= triangleY || e.clientY <= triangleY + triangleHeight){
    // set the drag flag
    isDragging = true;
    flag = 0;
  }
}
window.addEventListener("touchstart", function (e){
  
  var rect = canvas.getBoundingClientRect();
  
  if(e.touches[0].clientX >= triangleX || e.touches[0].clientX <= triangleX + triangleWidth || e.touches[0].clientY >= triangleY || e.touches[0].clientY <= triangleY + triangleHeight && allHit == false){
    // set the drag flag
    isDragging = true;
    flag = 0;
    //console.log('touching triangle');  
  }
  
  
  if(e.touches[0].clientX - rect.left >= 200 && e.touches[0].clientX - rect.left <= 400 && e.touches[0].clientY - rect.top >= 500 && e.touches[0].clientY - rect.top <= 550 && allHit == true){

    restart();
  }

});





window.onmouseup = function handleMouseUp(e){
  // clear the drag flag
  var rect = canvas.getBoundingClientRect();
  isDragging=false;

  if(flag === 0 && allHit == false){
    clicked = true;
    boing.play();
    window.setTimeout(function(){clicked = false;}, 200);
  }else if(flag === 1){
    console.log("was drag");
  }else if(e.clientX - rect.left >= 200 && e.clientX - rect.left <= 400 && e.clientY - rect.top >= 500 && e.clientY - rect.top <= 550 && allHit == true){

    restart();
  }
}

window.addEventListener("touchend", function (e){
  // clear the drag flag
  var rect = canvas.getBoundingClientRect();
  isDragging = false;

  if(flag === 0 && allHit == false){
    clicked = true;
    boing.play();
    window.setTimeout(function(){clicked = false;}, 200);
  }else if(flag === 1){
    console.log("was drag");
  }
  //console.log('not touching');     
});







window.addEventListener("mousemove", drag);
function drag(e){
  // if the drag flag is set, clear the canvas and draw the image
  if(isDragging == true){
    console.log('dragging');
    triangleX = e.clientX - (triangleWidth/2);
    clicked = false;
    flag = 1;
    //console.log(clicked); 
  }
}
window.addEventListener("touchmove", function (e){
  // if the drag flag is set, clear the canvas and draw the image
  if(isDragging == true){
    console.log('dragging');   
    triangleX = e.touches[0].clientX - (triangleWidth/2);
    clicked = false;
    flag = 1;
    //console.log(clicked);  
  }
});




////////////////////////////////AUDIO/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boing = new Howl({
  src: ['Sounds/Boing_1.mp3'],
  volume: 0.5

});

var crash = new Howl({
  src: ['Sounds/Crash_1.mp3'],
  volume: 0.5

});

var swing = new Howl({
  src: ['Sounds/Swing_1.mp3'],
  volume: 0.5

});
