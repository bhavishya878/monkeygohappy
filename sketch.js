
var PLAY=1;
var END;
var gameState=1;
var game,gameImage;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var invisibleground;
var restart,restartImage;

var surviavaltime=0;

function preload(){
  
  //score = score + Math.round(getFrameRate()/60);
  monkey_running =loadAnimation("bhaaaa.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameImage=loadImage("game.png")
  restartImage=loadImage("restart.png")
  
}



function setup() {
  createCanvas(600,500);
  monkey=createSprite(98,375);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.2
  
  invisibleground=createSprite(12,455,755,12);
  //invisibleground.visible=false
  invisibleground.velocityX=-5

bananaGroup = new Group();
obstacleGroup = new Group();

  game=createSprite(250,180)
  game.addImage("game",gameImage);
  
    game.scale=0.5
    
    
    restart=createSprite(250,230)
  restart.addImage("restart",restartImage);
    restart.scale=0.4

}


function draw() {
background(" green")
  monkey.collide(invisibleground);
  
  if (invisibleground.x < 0){
      invisibleground.x = invisibleground.width/2;
    }


  
  //making monkey to jump      
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -23;
        
    }
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  
  
  if(gameState === PLAY){
  
  //adding spawns
  
  spawnbanana();
  spawnobstacle();
    
    game.visible=false;
    restart.visible=false;
    
    if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
}
    
    if(obstacleGroup.isTouching(monkey)){
    gameState=END
}
    surviavaltime= surviavaltime + Math.round(getFrameRate()/62);
    
  }
  
  else if(gameState===END){
    obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
    
    game.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
    
    
  }  
  drawSprites();
  
  textSize=100;
  text("surviavaltime:"+surviavaltime,380,40);
  
}
function reset(){
  gameState=PLAY;
  surviavaltime=0
}

function spawnbanana(){
  if (frameCount % 80 === 0){
    //generate random obstacles
    banana=createSprite(490,255);
    banana.addImage("banana",bananaImage)
    banana.y = Math.round(random(20,160));
    banana.lifetime=90
    bananaGroup.add(banana);
    banana.velocityX = -5;
    banana.scale=0.2
  }
}

function spawnobstacle(){
  if (frameCount % 80 === 0){
    //generate random obstacles
    obstacle=createSprite(490,420);
    obstacle.addImage("obstacle",obstacleImage)
    obstacle.lifetime=90
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -8;
    obstacle.scale=0.2
  }
}

