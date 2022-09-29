const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var canh;
var canw;
var ground;
var fruit,rope;
var fruit_con;
var backgroundimg;
var melonimg;
var muteimg;
var rabbitimg;
var rabbit;
var button;
var comendo;
var chorando;
var piscando;
var sombalao;
var somcomendo;
var somcorda;
var somtriste;
var somdefundo;
var balao
var botaodemudo;
var button2;
var button3;
var rope2;
var rope3;

function mute () {
  if(somdefundo.isPlaying()) {
    somdefundo.stop ();
  }
  else {
    somdefundo.play();
  }
}
function drop () {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  somcorda.play();
}

function drop2 () {
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  somcorda.play();
}

function drop3 () {
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
  somcorda.play();
}

function soprar () {
  Body.applyForce(fruit, {x:0, y:0}, {x: 0.02, y:0});
  sombalao.play ();
}

function preload () {
backgroundimg = loadImage("background.png");
melonimg= loadImage("melon.png");
muteimg = loadImage("mute.png");
rabbitimg = loadImage("Rabbit-01.png");
comendo = loadAnimation("eat_0.png", "eat_1.png","eat_2.png", "eat_3.png","eat_4.png");
chorando = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
sombalao = loadSound("air.wav");
somcomendo = loadSound("eating_sound.mp3");
somcorda = loadSound("rope_cut.mp3");
somtriste = loadSound("sad.wav");
somdefundo = loadSound("sound1.mp3");

comendo.looping = false;
chorando.looping = false;
} 

function collide (corpo1, corpo2) {
  if(corpo1 !== null) {
    var d = dist(corpo1.position.x, corpo1.position.y,corpo2.position.x, corpo2.position.y );
    if(d <= 80) {
      return true;
    }
    else{
      return false 
    }
  }
}



function setup() 
{
  var isMobile = /iPhone | iPad | iPod | Android/i.test(navigator.userAgent);
  if(isMobile) {
    canw = displayWidth;
    canh = displayHeight;
    createCanvas(canw +80,canh);
  }
  else{
    canw = windowWidth;
    canh = windowHeight;
    createCanvas(canw, canh);
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canh,600,20);

  rope3 = new Rope(4,{x:400,y:225});
  rope2 = new Rope(7,{x:370,y:40});
  rope = new Rope(8,{x:40,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  piscando.frameDelay = 13;
  chorando.frameDelay = 13;
  comendo.frameDelay = 13;

  rabbit = createSprite(150, canh - 150, 80, 80);
  rabbit.addImage(rabbitimg)
  rabbit.scale = 0.35; 
  rabbit.addAnimation("comendo",comendo);
  rabbit.addAnimation("chorando",chorando);
  rabbit.addAnimation("piscando",piscando);
  rabbit.changeAnimation("piscando");

  button = createImg("cut_button.png");
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  button2 = createImg("cut_button.png");
  button2.position(330, 35);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_button.png");
  button3.position( 360, 200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);

  balao = createImg("balloon.png");
  balao.position(10, 250);
  balao.size(150, 100);
  balao.mouseClicked(soprar);

  botaodemudo = createImg("mute.png");
  botaodemudo.position(420, 30);
  botaodemudo.size(50, 50);
  botaodemudo.mouseClicked(mute);

  somdefundo.play ();
  somdefundo.setVolume(0.15)

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() 
{
  image(backgroundimg, width / 2, height / 2, canw, canh);
  rope.show();
  rope2.show();
  rope3.show();

  if(fruit !== null) {
    image(melonimg,fruit.position.x, fruit.position.y, 60,60);
  }
 
  if(collide(fruit, rabbit)) {
    World.remove(world, fruit);
    fruit = null;
    rabbit.changeAnimation("comendo");
    somcomendo.play();
  }

  else if(fruit !== null && fruit.position.y > height - 60) {
    World.remove(world, fruit);
    fruit = null;
    rabbit.changeAnimation("chorando");
    somtriste.play();
  }



  Engine.update(engine);
  //ground.show();
  drawSprites();
 
   
}
