var PLAY=1
var END=0
var monkey , monkey_running, monkey_collided

var obstacle, obstacleImage;
var foodGroup,obstacleGroup;
var score;
var banana , bananaImage;
var gameState= PLAY;
var survivalTime=0;
var score= 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided= loadAnimation("sprite_0.png",);
 
}



function setup() {
createCanvas(windowWidth,windowHeight)
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;
  
ground = createSprite(400,450,10000,10);
ground.velocityX=-4
ground.x=ground.width/2
  
  //create Obstacle and Cloud Groups
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  //collider
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
}


function draw() {
background("yellow");
stroke("black");
textSize(20);
fill("black");
text("survival Time : "+survivalTime,100,50 )
text("Score : "+score,400,50 )
  
  if (gameState === PLAY){
    //counting score
survivalTime = Math.ceil(frameCount/frameRate());

  //jumping monkey
 if(keyDown("space")&& monkey.y >= 200) {
 monkey.velocityY = -12; }   
    
    //add gravity
monkey.velocityY = monkey.velocityY + 1.5 
    
   //moving ground
if (ground.x < 0){
 ground.x = ground.width/2;
}
    
    //calling functions
   obstacles();
   fruit();
    
    if(monkey.isTouching(foodGroup)){
      
      foodGroup[0].destroy();
      score=score+1
      
    }
    
      if(monkey.isTouching(obstacleGroup)){
    
    gameState = end; 
  }
  }
  
else if (gameState === end){
  
        ground.velocityX = 0;
      monkey.velocityY = 0
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);    
     monkey.changeAnimation("collided",monkey_collided)
      
}

  
  

  
  

  


  
  //colliding monkey with ground
  monkey.collide(ground);  
  drawSprites();
}


function fruit(){
    if(frameCount%130===0)
  {
    //To create banana sprite
var banana=createSprite(600,Math.round(random(110,270)),10,10);
    
banana.addImage (bananaImage);
    banana.velocityX=-3;
    banana.scale=0.1;
    banana.lifetime=-1
    foodGroup.add(banana);
  }
}

function obstacles(){
  
  if (frameCount % 125 === 0) {
   var obstacle = createSprite(1000,388,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.30;
    obstacle.velocityX = -6;
    
     //assign lifetime to the variable
    obstacle.lifetime = -1;
    
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
  
  
}

function end(){
  
  
  
}
