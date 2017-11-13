var canMouseX = false;
var canMouseY = false;
var isDragging = false;
var clicked;
var triangle;
var triangleX = 0;
var triangleY = 613;
var triangleWidth = 155;
var triangleHeight = 113;
var targetX = 0;
var targetY = 20;
var targetDX = 7;
var targetWidth = 155;
var targetHeight = 113;
var targetCollision = false;
var dotsDown = false;
var dottedline;
var dotsX = [225, 275, 325, 375, 425, 475, 525, 575, 625, 675];
var dotsY = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
var dotsTouched = [false, false, false, false, false, false, false, false, false, false];
var dotWidth = 5;
var dotHeight = 420;
var canvas;
var context;
var OffsetX;
var OffsetY;
var dpr = undefined;
var hours = 0;
var minutes = 0;
var seconds = 0;
var hourString = '0' + hours.toString();
var minuteString = '0' + minutes.toString();
var secondString = '0' + seconds.toString();
var allGone = false;
var timerLoop = null;
var score = 0;
var easing = 0.05;
var easing_2 = 0.05;
var flag = 0;
var top_text_span;
var missed = 0;



////////////////////////////////AUDIO/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boing = new Howl({
  src: ['sound/Boing_1.mp3'],
  volume: 0.5

});

var crash = new Howl({
  src: ['sound/Crash_1.mp3'],
  volume: 0.5

});

var swing = new Howl({
  src: ['sound/Swing_1.mp3'],
  volume: 0.5

});

////////////////////////////////End/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


window.onload = function () {
  //initialize canvas and draw loop
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  OffsetX = canvas.offsetLeft;
  OffsetY = canvas.offsetTop;
  top_text_span = canvas.width / 9;
  clicked = false;
  setInterval(draw, 20);
  timerLoop = setInterval(timer, 1000);    
}

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

function draw(){
 
  triangle = document.getElementById('triangle');
  dottedline = document.getElementById('dotted-line');

  //change background color here!!
  context.fillStyle = 'rgb(255,255,255)';
  ////////////////////////////////
  context.fillRect(0, 0, canvas.width, canvas.height);


  tri_dot_Collision();




  if(allGone == true){
    
    clearInterval(timerLoop);
    context.font = "normal normal lighter 25px Merriweather";
    context.fillStyle = "#28ACF4";
    context.fillText("You finished in " + minutes + " minutes and " + seconds + " seconds!", 200, 200);
    context.font = "normal normal lighter 25px Merriweather";
    context.fillStyle = "#28ACF4";
    context.fillText('Score: ' + score, 400, 250);
    context.fillStyle = "#28ACF4";
    context.fillRect(350, 300, 200, 50);
    context.fillStyle = "white";
    context.font = "normal normal lighter 30px Merriweather";
    context.fillText("Restart", 400, 335);

  }else{
    for(var i = 0; i < 10; i++){  
      if(dotsTouched[i] == false){
        context.drawImage(dottedline, dotsX[i], dotsY[i], dotWidth, dotHeight);
      }
    }
    if(triangleX < 0){
      triangleX = 0;
    }else if(triangleX > canvas.width - triangleWidth){
      triangleX = canvas.width - triangleWidth;
    }  

    context.drawImage(triangle, triangleX, triangleY, triangleWidth, triangleHeight);


    context.font = "normal normal lighter 30px Merriweather Sans";
    context.fillStyle = "#28ACF4";
    context.fillText('Timer: ' + hourString + ':' + minuteString + ':' + secondString + '     Score: ' + score + '     Missed: ' + missed, top_text_span, 50);


    context.drawImage(triangle, targetX, targetY, targetWidth, targetHeight); 

    if(targetX < 0 || targetX > canvas.width - targetWidth){
      targetDX = -targetDX;
      swing.play();
    }
    targetX += targetDX;


    //tri_target_Collision();
    checkDotExistence();
  }
}


function checkDotExistence(){

  var counter = 0;

  for(var a = 0; a < dotsTouched.length; a++){
    if(dotsTouched[a] == true){
      counter++;

    }
  }

  if(counter == dotsTouched.length){
    allGone = true;
  }
}




function restart(){
  console.log('doing');
  allGone = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  score = 0;
  missed = 0;
  triangleX = 600;
  for(var u = 0; u < dotsTouched.length; u++){
    dotsTouched[u] = false;
  }
  timerLoop = setInterval(timer, 1000);
}






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






function tri_target_Collision(){

  for(var y = 0; y < dotsX.length; y++){
    if(dotsX[y] < targetX + targetWidth &&
       dotsX[y] + dotWidth > targetX &&
       dotsY[y] < targetY + targetHeight && dotsTouched[y] == false){

      dotsTouched[y] = true;
      
      
      //EQUATION FOR SCORE////////////////////////////
      score += (Math.floor((100/seconds) - missed)) * 100;
      //////////////////////////////////////////////
      
      //TO MAKE SURE WE DON'T GET NEGATIVE VALUES////
      if(score < 0){
        score = 0;
      }
      //////////////////////////////////////////////
      
      return;

    }
  }
  missed++;
}






/*window.addEventListener("click", function(e){

  var rect = canvas.getBoundingClientRect();

  if(e.clientX - rect.left >= 350 && e.clientX - rect.left <= 550 && e.clientY - rect.top  >= 300 && e.clientY - rect.top <= 350 && allGone == true){
   
    restart();
    
  }
});*/
/*window.addEventListener("touchstart", function(e){

  var rect = canvas.getBoundingClientRect();

  if(e.touches[0].clientX - rect.left >= 350 && e.touches[0].clientX - rect.left <= 550 && e.touches[0].clientY - rect.top >= 300 && e.touches[0].clientY - rect.top <= 350 && allGone == true){

    restart();
  }
});
window.addEventListener("touchend", function(e){

  var rect = canvas.getBoundingClientRect();

  if(e.touches[0].clientX - rect.left >= 350 && e.touches[0].clientX - rect.left <= 550 && e.touches[0].clientY - rect.top >= 300 && e.touches[0].clientY - rect.top <= 350 && allGone == true){

    restart();
  }
});*/











window.addEventListener("mousedown", function (e){
  var rect = canvas.getBoundingClientRect();
  
  if(e.clientX - rect.left >= triangleX || e.clientX - rect.left <= triangleX + triangleWidth || e.clientY - rect.top >= triangleY || e.clientY - rect.top <= triangleY + triangleHeight && allGone == false){
    // set the drag flag
    isDragging = true;
    flag = 0;
  }else if(e.clientX - OffsetX  > 350 && e.clientX - OffsetX  < 550 && e.clientY - OffsetY  > 300 && e.clientY - OffsetY  < 350 && allGone == true){

    restart();
  }
});

/*window.addEventListener("touchstart", function (e){

  var rect = canvas.getBoundingClientRect();

  if(e.touches[0].clientX - rect.left >= triangleX || e.touches[0].clientX - rect.left <= triangleX + triangleWidth || e.touches[0].clientY - rect.top >= triangleY || e.touches[0].clientY - rect.top <= triangleY + triangleHeight && allGone == false){
    // set the drag flag
    isDragging = true;
    flag = 0;
    //console.log('touching triangle');  
  }else if(e.touches[0].clientX - rect.left >= 350 && e.touches[0].clientX - rect.left <= 550 && e.touches[0].clientY - rect.top >= 300 && e.touches[0].clientY - rect.top <= 350 && allGone == true){

    restart();
  }
  
});*/





window.addEventListener("mouseup", function (e){
  // clear the drag flag
  var rect = canvas.getBoundingClientRect();
  
  isDragging=false;

  if(flag === 0 && allGone == false){
    clicked = true;
    boing.play();
    window.setTimeout(function(){clicked = false; tri_target_Collision();}, 200);
  }else if(flag === 1 && allGone == false){
    console.log("was drag");
  }else if(e.clientX - OffsetX  > 350 && e.clientX - OffsetX  < 550 && e.clientY - OffsetY  > 300 && e.clientY - OffsetY  < 350 && allGone == true){

    restart();
  }
});

/*window.addEventListener("touchend", function (e){
  // clear the drag flag
  var rect = canvas.getBoundingClientRect();
  
  isDragging = false;

  if(flag === 0 && allGone == false){
    clicked = true;
    boing.play();
    window.setTimeout(function(){clicked = false;tri_target_Collision();}, 200);
    window.setTimeout(function(){tri_target_Collision();},200);
  }else if(flag === 1 && allGone == false){
    console.log("was drag");
  }else if(e.touches[0].clientX - rect.left >= 350 && e.touches[0].clientX - rect.left <= 550 && e.touches[0].clientY - rect.top >= 300 && e.touches[0].clientY - rect.top <= 350 && allGone == true){

    restart();
  }
  //console.log('not touching');     
});*/







window.addEventListener("mousemove", function (e){
  var rect = canvas.getBoundingClientRect();
  // if the drag flag is set, clear the canvas and draw the image
  if(isDragging == true){
    console.log('dragging');
    triangleX = e.clientX - rect.left;
    clicked = false;
    flag = 1;
    //console.log(clicked); 
  }
});
/*window.addEventListener("touchmove", function (e){
  var rect = canvas.getBoundingClientRect();
  // if the drag flag is set, clear the canvas and draw the image
  if(isDragging == true){
    console.log('dragging');   
    triangleX = e.touches[0].clientX - rect.left;
    clicked = false;
    flag = 1;
    //console.log(clicked);  
  }
});*/













