var player,plrupanime, plrdownanime, misslegroup, missleanime, missle, edges, enemy1group, enemy2group, enemy3group, enemy4group, eny;
function preload() {
  plrgtanime=loadAnimation("assets/plright.gif");
  missleanime=loadAnimation("assets/missile.gif");
}
function setup() {
    createCanvas(windowWidth,windowHeight);
    player=createSprite(100,height/2,50,50);
    player.addAnimation("plr",plrgtanime);
    player.debug=true;
    player.setCollider("rectangle",0,0,150,200);
    misslegroup=new Group();    
    enemygroup=new Group();

    enemy1group=new Group();
    enemy2group=new Group();
    enemy3group=new Group();
    enemy4group=new Group();
}
function draw() {
    background(0);
    // camera.x=player.x;
    // camera.y=player.y;
    player.velocityX=0;
    player.velocityY=0;
    player.depth++
    edges=createEdgeSprites();

    player.collide(edges);

    if(keyDown("up")){
         player.velocityY=-15;
      }
      if(keyDown("down")){
        player.velocityY=15;       
     }
     if(keyWentDown("space")){
       missle=createSprite(player.x,player.y,50,50);
       missle.velocityX=25;
       misslegroup.add(missle);
       missle.addAnimation("missile",missleanime);
       missle.scale=0.3;
     }
     if (frameCount % 100 === 0){
         eny1=createSprite(5000,100,50,50);
         eny1.velocityX=-20;
         enemy1group.add(eny1);
    }
    if (misslegroup.isTouching(enemy1group)) {
      enemy1group.destroyEach();
      missle.destroy();
    }
    drawSprites();
}