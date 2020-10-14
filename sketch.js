var restart, restartimg, gameover, gameoverimg;
var cheksound, diesound, jumpsound;
var obstacle;
var gv = -6
var cloudimage ;
var gamestate = "serve";
var ob1, ob2, ob3, ob4, ob5, ob6
var trex ,trex_running, trexcollided;
var ground , groundimage;
var invisibleground ;
var highscore = 0;
var score = 0;

var gamestate = "play";
function preload(){ 
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadImage("trex_collided.png")
groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png");
  checksound = loadSound("ck.mp3");
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,180,10,10);
  trex.addAnimation( "running",trex_running);
  trex.addAnimation("collided", trexcollided);
  trex.scale = 0.5 ;
  
  ground = createSprite(200,180,400,20);
  ground.addImage(groundimage)
  ground.x = ground.width/2
  invisibleground = createSprite(200,200,400,30)
  invisibleground.visible = false
  
  // create obstacle and cloud group
  obstaclegroup  = createGroup();
  cloudgroup = createGroup();
  restart = createSprite(300, 140);
  restart.addImage(restartimg);
  restart.scale = 0.05
  gameover = createSprite(300, 100)
  gameover.addImage(gameoverimg)      
  restart.visible = false;
  gameover.visible = false;
    
    
}

function draw(){
  
   background("grey");
 
 // background("grey")
  //background("black")
  restart.visible = false;
  gameover.visible = false;
   trex.collide(invisibleground); 
  fill("black ")
  text("SCORE :" + score, 500, 50);
  text("HIGHSCORE: "+ highscore, 470, 30);
 
  
  if(gamestate == "play"){
    if(score> highscore){
      highscore = score
    }
    if(score> 0 && score%100 == 0){
     checksound.play();
    }
    
     score = score + Math.round((getFrameRate()/60))
    trex.velocityY = trex.velocityY + 0.8

    ground.velocityX = -(6 + score/100)
    
  if(ground.x < 0){
    ground.x = ground.width/2
  }
    if(touches.length > 0 && trex.y > 160||keyDown("space")&& trex.y > 160 ){
      jumpsound.play(); 
    trex.velocityY = -11.5   ; 
     }
    
   
    if(obstaclegroup.isTouching(trex)){
      trex.addImage(trexcollided)
      diesound.play();
      gamestate = "end";
    }
     spawncloud();
   spawnobstacle();
  }
  else if(gamestate == "end"){
    trex.changeAnimation("collided", trexcollided)
    trex.velocityY = 0
    restart.visible = true;
    gameover.visible = true;
    ground.velocityX = 0
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
  obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    if(touches.length > 0||mousePressedOver(restart)){
      trex.changeAnimation("running", trex_running)
      frameCount = 0
      jumpsound.play();
      gamestate = "play"
      obstaclegroup.destroyEach();
      cloudgroup.destroyEach();
      score = 0;
      
    }
   
    
  }
 
 

  
  
 

  drawSprites();


}
function spawncloud(){
 if(frameCount%60 == 0){
    
  var cloud = createSprite(450,50, 50, 20);
   cloud.scale = .5
    cloud.addAnimation("ncloud", cloudimage)
  cloud.velocityX = -(6 + score/150);
   cloud.y = Math.round(random(10, 100));
   cloud.lifetime = 120;
   cloudgroup.add(cloud);
  }
}
function spawnobstacle(){
  if(frameCount%100 == 0){
    
  var obstacle = createSprite(600,165, 10, 10);
    obstacle.scale = .6
    
    
      obstacle.velocityX = - (6 + score/100 )
    
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
       case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       break;
       default:break;
   }
    obstacle.lifetime = 120;
    obstaclegroup.add(obstacle);
     
   }  
}
