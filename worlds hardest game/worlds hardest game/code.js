var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creating the ends/platforms
var platform1 = createSprite(50, 200,100,200);
platform1.shapeColor="lightblue";
var platform2 = createSprite(350, 200,100,200);
platform2.shapeColor="yellow";

//creating the boundaries
var boundary1 = createSprite(200, 100,400,10);
boundary1.shapeColor="black";
var boundary2= createSprite(200, 300,400,10);
boundary2.shapeColor="black";

//creating player
var ron = createSprite(50, 200,20,20);
ron.shapeColor="black";

//creating enemy
var enemy1= createSprite(125,125,20,20);
var enemy2 = createSprite(175, 275,20,20);
var enemy3 = createSprite(225, 125,20,20);
var enemy4 = createSprite(275, 275,20,20);
enemy1.shapeColor="red";
enemy2.shapeColor="red";
enemy3.shapeColor="red";
enemy4.shapeColor="red";

enemy1.velocityY=8;
enemy2.velocityY=-8;
enemy3.velocityY=8;
enemy4.velocityY=-8;

var score=0;


function draw() {
background("white");

createEdgeSprites();
enemy1.bounceOff(boundary1);
enemy1.bounceOff(boundary2);

enemy2.bounceOff(boundary1);
enemy2.bounceOff(boundary2);

enemy3.bounceOff(boundary1);
enemy3.bounceOff(boundary2);

enemy4.bounceOff(boundary1);
enemy4.bounceOff(boundary2);

if (keyDown("left")) {
ron.x=ron.x-3;  
}

if (keyDown("right")) {
ron.x=ron.x+3;  
}

textSize(20);
fill("black");
text("no. of times lost: "+score,190,50 );

if (ron.isTouching(enemy1)||
ron.isTouching(enemy2)||
ron.isTouching(enemy3)||
ron.isTouching(enemy4)) {
 ron.x=50;
 ron.y=200;
 score=score+1;
}


drawSprites();
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
