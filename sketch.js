var player, plrlife="100", floor, border1, str1, str2, str3, str4, str5, bullet, bulletgroup,enemy1, enemy2, enemy4, floordn, button;
var plranimeid="right", enemy2life=2, lift, enemy4life="5";
var fwdanime, bckanime, stdanime, plrdedanime, wallImg, floorImg, bulletImg, bulletImgrgt, enemy1anime, enemy2anime, laser, enemy4anime, explosion;

function preload()
{
   stdanime=loadAnimation("assets/standing.gif");
   fwdanime=loadAnimation("assets/FwdRun.gif");
   bckanime=loadAnimation("assets/Bck.gif");
   wallImg=loadImage("assets/wall.png");
   bulletImg=loadImage("assets/bullet left.jpg");
   bulletImgrgt=loadImage("assets/bulletrgt.png");
   enemy1anime=loadAnimation("assets/enemy1.gif");
   plrdedanime=loadAnimation("assets/plrded.png");
   enemy2anime=loadAnimation("assets/enemy2.gif");
   floorImg=loadImage("assets/floor1.png");
   laser=loadSound("assets/laser.mp4");
   explosion=loadSound("assets/laser.mp4");
   enemy4anime=loadAnimation("assets/enemy4.gif");
}

function setup()
{
    createCanvas(windowWidth,windowHeight);
    player=createSprite(width/10,height/1.3,20,20);
    player.setCollider("circle",0,0,170);
    // player.debug=true;
    player.scale=0.5;  
    

    border1=createSprite(player.x-800,height/1.2,1,1);
    border1.setCollider("rectangle",0,0,20,100);
    // border1.debug=true;

    str1 =createSprite(500,height/1.1,100,50);
    str2=createSprite(800,height/1.2,100,50);
    str3=createSprite(1100,height/1.3,100,50);
    str4=createSprite(1400,height/1.4,100,50);
    var reload=createButton('refresh');
    reload.position(width/2,height/2-200);
    reload.mousePressed(()=>{
      location.replace("index.html") ;
    });

    floor=createSprite(width/2,height,width*3,50);  
    floor.addImage("floor", floorImg)
    floor.setCollider("rectangle",0,0,2750,100);
    
    floorup=createSprite(3000,height/1.3,20,20);    
    floorup.addImage("floor2",floorImg);
    // floorup.debug=true   
    floorup.setCollider("rectangle",0,0,2860,100);     
    bulletgroup=new Group();

    enemy1=createSprite(2500,height/2,20,20);
    enemy1.addAnimation("eny", enemy1anime);
    enemy1.setCollider("rectangle",0,0,150,150);
    enemy1.velocityY=5
    // enemy1.debug=true;

    enemy2=createSprite(4000,height/2,20,20);
    enemy2.addAnimation("eny2", enemy2anime);
    enemy2.setCollider("rectangle",0,0,150,150);
    enemy2.velocityY=5
    // enemy2.debug=true;

    lift=createSprite(4600,height/1.3,200,100);

    floordn=createSprite(5500,height/0.1);
    floordn.addImage("floor2",floorImg);
    // floordn.debug=true   
    floordn.setCollider("rectangle",0,0,2860,100); 

    enemy4=createSprite(6000,height/0.1-1000);
    enemy4.addAnimation("haah",enemy4anime);
    // enemy4.debug=true;
    enemy4.velocityY=20;
    enemy4.setCollider("rectangle",0,0,100,200);
  }

function draw()
{
  background(wallImg);
  player.depth++
  player.velocityY=player.velocityY+1;
  player.velocityX=0
  // player.velocityY=0
  player.collide(floor);  
  player.collide(str1);
  player.collide(str2);
  player.collide(str3);
  player.collide(str4);
  player.collide(floorup);
  player.collide(border1);
  player.collide(floordn);
  enemy1.collide(floorup);
  enemy2.collide(floorup);  
  enemy4.collide(floordn);
  camera.x=player.x;
  camera.y=player.y;
  
  player.addAnimation("plr", stdanime);
  player.scale=0.5;
  player.setCollider("circle",0,0,170);
  
  if(keyWentDown("up") &&player.velocityY>-0.1&&player.velocityY<1.5){
    player.velocityY=-10;
    //  player.velocityY=-30;
  }
  if(keyDown("left")&&player.velocityY<25){
    player.velocityX=-15;
    // player.velocityX=-30;
    player.addAnimation("plr",bckanime);
    player.scale=0.7;
    player.setCollider("circle",0,0,120);
    plranimeid="left"
  }
  if(keyDown("right")&&player.velocityY<25){
    player.velocityX=15;
    // player.velocityX=30;
    player.addAnimation("plr",fwdanime);
    player.scale=0.5;
    player.setCollider("circle",0,0,170);
    // laser.play();
    // laser.volume(0.1);  
    plranimeid="right"  
  }
  if (keyWentDown("space")&&plranimeid==="right") {
    bullet=createSprite(player.x,player.y+5,20,20);
    bullet.velocityX=50;
    bullet.addImage("bullet",bulletImgrgt);
    bullet.scale=0.1;
    bulletgroup.add(bullet);
    bullet.depth--   
    bullet.lifetime=100;
    laser.play();
    // laser.volume(0.2);
  }
  else if (keyWentDown("space")&&plranimeid==="left") {
    bullet=createSprite(player.x,player.y+5,20,20);
    bullet.velocityX=-50;
    bullet.addImage("rgtbullet",bulletImg);
    bullet.scale=0.1;
    bullet.lifetime=100;
    bulletgroup.add(bullet);
    bullet.depth--
    laser.play();
  } else {
    //
  } 
  if (player.isTouching(enemy1)) {
    plrlife-=2;
    player.velocityX=-30;
  }
  if (bulletgroup.isTouching(enemy1)) {
   enemy1.destroy(); 
   bulletgroup.destroyEach();
   explosion.play();
   //enemy1 kill
  }
  if (bulletgroup.isTouching(enemy2)) {
   enemy2life=enemy2life-1;
   bulletgroup.destroyEach();
   //enemy kill
  }
  if (enemy2life===0){
    enemy2.destroy();
    explosion.play();
    enemy2life=enemy2life-1;
  }

  if (player.isTouching(lift)) {
    lift.y=player.y;
    player.velocityY=30;
  }
  
  if (player.x>4000&&player.y>enemy4.y&&enemy4life>0) {
    plrlife=plrlife-0.5;
  }

  if (bulletgroup.isTouching(enemy4)) {
    enemy4life=enemy4life-1;
    bulletgroup.destroyEach();
  }
  if (enemy4life===0) {
    enemy4.destroy();
    // explosion.play();
    levelup();
  }

  if (plrlife<1) {
    ded();
  }
  if(player.x>2500){
    enemy2.velocityX=-20;
    enemy2.velocityY=20;
  }  
  if (player.isTouching(enemy2)) {
    plrlife-=5;
    player.velocityX=-1000;
  }
  // console.log(mouseX,mouseY);
  drawSprites();
  stroke("white")
  textSize(24);
  fill("white");
  text("Health= "+plrlife,player.x-50,player.y-100);
  text("Lift",lift.x,lift.y+100)
  // text("X="+enemy4.x+" Y="+enemy4.y,player.x-50,player.y-200);
}

function ded(){
  player.addAnimation("plr",plrdedanime);
  player.velocityX =0;
  player.velocityY =0;
  plrlife=0;
  stroke("white")
  textSize(24);
  text("Mission abort",player.x,player.x-250);
  text("You died",player.x,player.y-200);
  enemy1.destroy(); 
  enemy2.destroy();
  enemy4.destroy();
}

function levelup() {  
  button= createButton('Next Level');
  button.position(1000,500);
  button.mousePressed(()=>{
    location.replace("level2.js") ;
  });
}