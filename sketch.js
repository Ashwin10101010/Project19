var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghoststand, ghostjump;
var invisibleBlockGroup, invisibleBlock;
var spookySound;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghoststand = loadImage("ghost-standing.png");
  ghostjump =  loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,600);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghoststand);
  ghost.scale = 0.6;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);

  if(gameState === "play")
  {
  
    spookySound.loop();

  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space"))
    {
      ghost.addImage("ghost", ghostjump);
      ghost.velocityY = -4;
    } 
    else 
    {
      ghost.addImage("ghost", ghoststand);
      ghost.velocityY = 4;  
    }

    if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x -4;
    }

    if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x +4;
    }

    if(tower.y > 400)
    {
      tower.y = 300;
    }
    spawnDoor();

    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();
    
    
  }

  if(gameState === "end")
{
   stroke("red");
   fill("red");
   textSize(30);
   text("Game Over", 230, 250);


}

    

        
}



function spawnDoor(){
if(frameCount % 240 === 0)
{
  var door = createSprite(200, -50);
  var climber = createSprite(200, 10);
  var invisibleBlock = createSprite(200, 15);
  invisibleBlock.width  = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.visible = false;

  door.x = Math.round(random(120, 400));
  climber.x = door.x;
  invisibleBlock.x = door.x;

  door.addImage(doorImg);
  climber.addImage(climberImg);

  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleBlock.velocityY = 1;

  ghost.depth = door.depth;
  ghost.depth +=1;

  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;

  doorsGroup.add(door);
  invisibleBlock.debug = true;
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
}
}
