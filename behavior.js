
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//class car
class Car{
    constructor(id,positionX,positionY,size,stepLength,color,targetsArray){
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.stepLength = stepLength;
    this.color = color;
    this.score = 0; //how many targets have been hit?
    this.targetsArray = targetsArray;
  }

  destroyCar(){
    ctx.clearRect(this.positionX,this.positionY,this.size,this.size);
  }
  moveUp(){ //UP
    var nextPositionY = this.positionY - this.stepLength;
    if(this.checkNextMoveInBoundary(this.positionX, nextPositionY)){
      this.positionY = nextPositionY; //safe and move
    }else{ //not safe, stay
      console.log(this.id + " - Bounday Colliasion XUP");
    }
  }
  moveDown(){ //DN
    var nextPositionY = this.positionY + this.stepLength;
    if(this.checkNextMoveInBoundary(this.positionX, nextPositionY)){
      this.positionY = nextPositionY; //safe and move
    }else{ //not safe, stay
      console.log(this.id + " - Bounday Colliasion XDN");
    }
  }
  moveLeft(){ //Left
    var nextPositionX = this.positionX - this.stepLength;
    if(this.checkNextMoveInBoundary(nextPositionX, this.positionY)){
      this.positionX = nextPositionX; //safe and move
    }else{ //not safe, stay
      console.log(this.id + " - Bounday Colliasion XUP");
    }
  }
  moveRight(){ //Right
    var nextPositionX = this.positionX + this.stepLength;
    if(this.checkNextMoveInBoundary(nextPositionX, this.positionY)){
      this.positionX = nextPositionX; //safe and move
    }else{ //not safe, stay
      console.log(this.id + " - Bounday Colliasion XUP");
    }
  }
  drawCar(){ //draw the car on the canvas
      ctx.beginPath();
      ctx.rect(this.positionX,this.positionY,this.size,this.size); //draw car
      ctx.fillStyle = this.color;
      ctx.fill();
      if(this.checkHitTarget(this.targetsArray)){ //each draw check hit
        this.score = this.score + 1;
        console.log('id is ' + this.id + ' and the score is ' + this.score);
      }
      // printScore(); cannot work
  }
  checkNextMoveInBoundary(nextPositionX, nextPositionY){
    if(nextPositionX<0 || nextPositionX > (canvas.width-this.size) || nextPositionY<0 || nextPositionY > (canvas.height-this.size)){
      return false;
    }else{
      return true;
    }
  }
  checkHitTarget(array){ //allTargetsArray is an array storing all the targets; true-hit; false-not hit
    for(var i=0; i<array.length; i++){
      var target = array[i];
      if(Math.abs(target.positionX-this.positionX) < 20 && Math.abs(target.positionY-this.positionY) < 20 && target.isHit == false){ //Hit this target
        console.log("Hit");
        target.destory();
        return true; //get one hit
      }
    }
    return false; //check all the item, and no hit
  }
} //end class Car

class Target{
    constructor(id,positionX,positionY){
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.isHit = false; //if hit, this target no longer need check
    }
    draw(){ //draw the car on the canvas
        ctx.beginPath();
        ctx.rect(this.positionX-5,this.positionY,12,2); //length 12
        ctx.rect(this.positionX,this.positionY-5,2,12); //DRAW + Cross
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    }
    destory(){
      ctx.beginPath();
      ctx.rect(this.positionX-5,this.positionY,12,2);
      ctx.rect(this.positionX,this.positionY-5,2,12); //DRAW + Cross
      ctx.fillStyle = "#88be49"; //draw a green cross and the background is also green
      ctx.fill();
      this.isHit = true;
    }
}
//Object myCar01

var car01;//global
var car02;
var target01;
var allTargetsArray = [];
var numOfTargets = 10;
var numOfHits = 0;

function activateGame(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //allTargetsArray = [target01, target02, target03];
  for(var i=0;i<numOfTargets;i++){
    var newPosX = Math.random() * canvas.width;
    var newPosY = Math.random() * canvas.height;
    var newTarget = new Target(i,newPosX,newPosY);
    newTarget.draw();
    allTargetsArray.push(newTarget);
  }

  car01 = new Car(01,100,canvas.height-10,10,10,"orange",allTargetsArray);
  car01.drawCar();
  car02 = new Car(02,canvas.width-100, canvas.height-10,10,10,"blue",allTargetsArray);
  car02.drawCar();
  printScore();
  document.getElementById("gameStart").value = "Restart";
  document.getElementById("title").innerHTML = "GO GO GO";
  document.getElementById("title").style.color = "white";
  console.log("Game Activated");
}

function printScore(){
  document.getElementById("scoreBoard01").innerHTML = "Player1 score: " + car01.score;
  document.getElementById("scoreBoard02").innerHTML = "Player2 score: " + car02.score;
}
function checkWinner(car01,car02,numOfTargets){
  var numTotalHit = car01.score + car02.score;
  var resultMsg = "";
  if(numTotalHit >= numOfTargets){
    //targets all elimate
    if(car01.score == car02.score){
      //draw
      resultMsg = " Game Over - Tie";
      document.getElementById("title").style.color = "green";
    }
    else if (car01.score > car02.score) {
      resultMsg = " Game Over - Player01 Wins !";
      document.getElementById("title").style.color = "orange";
    }else{
      resultMsg = " Game Over - Player02 Wins !";
      document.getElementById("title").style.color = "blue";
    }
    document.getElementById("title").innerHTML = resultMsg;
    console.log("Game Over");
  }


}
// Add event listener on keydown
document.addEventListener('keydown', (event) => {
  console.log("key press");
  printScore();
  checkWinner(car01,car02,numOfTargets);
}, false);

Mousetrap.bind(['w','W'], function() {
      car01.destroyCar();//destory the previous car
      car01.moveUp();
      car01.drawCar(); //update the car
 });
Mousetrap.bind(['s','S'], function() {
     car01.destroyCar();
     car01.moveDown();
     car01.drawCar(); //update the car
});
Mousetrap.bind(['a','A'], function() {
     car01.destroyCar();
     car01.moveLeft();
     car01.drawCar(); //update the car
});
Mousetrap.bind(['d','D'], function() {
     car01.destroyCar();
     car01.moveRight();
     car01.drawCar(); //update the car
});

Mousetrap.bind('down', function() {
     car02.destroyCar();
     car02.moveDown();
     car02.drawCar(); //update the car
});
Mousetrap.bind('up', function() {
       car02.destroyCar();
     car02.moveUp();
     car02.drawCar(); //update the car
});
Mousetrap.bind('left', function() {
       car02.destroyCar();
     car02.moveLeft();
     car02.drawCar(); //update the car
});
Mousetrap.bind('right', function() {
       car02.destroyCar();
     car02.moveRight();
     car02.drawCar(); //update the car
});
