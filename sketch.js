var monkey, monkey_running
var banana ,bananaImage,obstacle,obstacleImage,ground,groundImage
var FoodGroup, obstacleGroup
var jumpSound,dieSound
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  groundImage=loadImage("ground2.png")
  foodGroup= new Group()
  obstacleGroup= new Group()
}



function setup() {
 var message = "Monkey Go Happy";
 console.log(message)
  //monkey
  monkey=createSprite(50,350,20,50);
 monkey.addAnimation("running",monkey_running);
 monkey.scale=0.1
  
  //ground
 ground = createSprite(400,350,900,10);
 ground.velocityX=-3;
 ground.x = ground.width /2;
 ground.addImage("ground",groundImage)
  
 monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //invisible ground
 invisibleGround = createSprite(405,351,900,3);
 invisibleGround.visible = false;
 monkey.collide(invisibleGround)
  
score = 0;
}



function draw() {
createCanvas(600,600);
  
   if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);

    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
        jumpSound.play();
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
     
    spawnObstacles();
    spawnBanana();
  }
   else if (gameState === END) {    
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     if(mousePressedOver(restart)) {
      reset();
    }
     
      //set lifetime of the game objects so that they are             never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);    
   } 
    //stop monkey from falling down
      monkey.collide(invisibleGround);
  
    drawSprites()
    fill("black")
    text("Survival Time: "+ score, 500,50);
}
function spawnObstacles(){
 
    //generate random obstacles
   
    //assign scale and lifetime to the obstacle    
    if(frameCount%300===0){
       var obstacle=createSprite(600,319,0,10)
       obstacle.velocityX = -(6 + score/100);
       obstacle.scale = 0.2;
       obstacle.lifetime = 300;
       obstacle.addImage(obstacleImage);
       obstacleGroup.add(obstacle);

    }
}
function spawnBanana(){
   if (frameCount % 80 === 0) {
    var banana = createSprite(600,50,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    foodGroup.add(banana);
}
}