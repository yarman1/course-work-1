const gamezone = document.querySelector(".gamezone");
const hangar = document.querySelector(".hangar");
const hp = document.querySelector(".hpnumber");
const points = document.querySelector(".pointsnumber");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const leftpanel = document.querySelector(".leftPanel");

let k = 0;
let fps = 1000 / 60;
let direction;

let ints = {
  run: false,
  bullet: false,
};

function init() {
  let div = document.createElement("div");
  div.className = "gamer";
  div.style.display = "block";
  div.style.left = `${player.x}px`;
  div.style.top = `${player.y}px`;
  div.style.backgroundImage = player.top;
  div.style.height = `${player.height}px`;
  div.style.width = `${player.width}px`;
  gamezone.append(div);
  player.el = document.querySelector(".gamer");
  points.textContent = `${player.points}`;
  hp.textContent = `${player.hp}`;
}
function controllers() {
  let width = player.width;
  let height = player.height;
  document.addEventListener("keydown", (e) => {
    console.log(e.code);
    switch (e.code) {
      case "KeyW": //top
        player.run = true;
        player.el.style.backgroundImage = player.top;
        player.side = 1;
        direction = "top";
        player.height = height;
        player.width = width;
        player.el.style.height = `${player.height}px`;
        player.el.style.width = `${player.width}px`;
        break;
      case "KeyD": //right
        player.run = true;
        player.el.style.backgroundImage = player.rigth;
        player.side = 2;
        direction = "right";
        player.height = width;
        player.width = height;
        player.el.style.width = `${player.width}px`;
        player.el.style.height = `${player.height}px`;
        break;
      case "KeyS": //bottom
        player.run = true;
        player.el.style.backgroundImage = player.bottom;
        player.side = 3;
        direction = "bottom";
        player.height = height;
        player.width = width;
        player.el.style.height = `${player.height}px`;
        player.el.style.width = `${player.width}px`;
        break;
      case "KeyA": //left
        player.run = true;
        player.el.style.backgroundImage = player.left;
        player.side = 4;
        direction = "left";
        player.height = width;
        player.width = height;
        player.el.style.width = `${player.width}px`;
        player.el.style.height = `${player.height}px`;
        break;
      case "ShiftLeft":
        if (player.side === 1) {
          addbullet(
            player.width / 2 - player.bulletsize / 2,
            -player.bulletsize
          );
        } else if (player.side === 2) {
          addbullet(player.width, player.height / 2 - player.bulletsize / 2);
        } else if (player.side === 3) {
          addbullet(
            player.width / 2 - player.bulletsize / 2,
            player.height + player.bulletsize / 2
          );
        } else if (player.side === 4) {
          addbullet(
            -player.bulletsize,
            player.height / 2 - player.bulletsize / 2
          );
        }
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyW": //top
        player.run = false;
        break;
      case "KeyD": //right
        player.run = false;
        break;
      case "KeyS": //bottom
        player.run = false;
        break;
      case "KeyA": //left
        player.run = false;
        break;
    }
  });
}

function intervalls() {
  ints.run = setInterval(() => {
    if (player.run) {
      switch (player.side) {
        case 1: //top
          if (player.y > 0) {
            player.y -= player.speed;
            player.el.style.top = `${player.y}px`;
          }

          break;
        case 2: //right
          if (
            player.x <
            hangar.getBoundingClientRect().left -
              player.width -
              leftpanel.getBoundingClientRect().width
          ) {
            player.x += player.speed;
            player.el.style.left = `${player.x}px`;
          }

          break;
        case 3: //bottom
          if (
            player.y <
            footer.getBoundingClientRect().top -
              player.height -
              header.getBoundingClientRect().height
          ) {
            player.y += player.speed;
            player.el.style.top = `${player.y}px`;
          }

          break;
        case 4: //left
          if (player.x > 0) {
            player.x -= player.speed;
            player.el.style.left = `${player.x}px`;
          }
          break;
      }
    }
  }, fps);
  ints.bullet = setInterval(() => {
    let bullets = document.querySelectorAll(".bullet");
    bullets.forEach((bullet) => {
      let direction = bullet.getAttribute("direction");
      if (direction === "top") {
        if (
          bullet.getBoundingClientRect().top >
          gamezone.getBoundingClientRect().top + player.bulletsize
        ) {
          bullet.style.top = `${
            parseInt(bullet.style.top.replace("px", ""), 10) -
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      } else if (direction === "bottom") {
        if (
          bullet.getBoundingClientRect().bottom <=
          footer.getBoundingClientRect().top + player.bulletsize
        ) {
          bullet.style.top = `${
            parseInt(bullet.style.top.replace("px", ""), 10) +
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      } else if (direction === "left") {
        if (
          bullet.getBoundingClientRect().left >
          gamezone.getBoundingClientRect().left + player.bulletsize
        ) {
          bullet.style.left = `${
            parseInt(bullet.style.left.replace("px", ""), 10) -
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      } else if (direction === "right") {
        if (
          bullet.getBoundingClientRect().left <=
          hangar.getBoundingClientRect().left - player.bulletsize
        ) {
          bullet.style.left = `${
            parseInt(bullet.style.left.replace("px", ""), 10) +
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      }
    });
  }, fps);

  ints.enemmove = setInterval(() => {
    moveenemies();
}, fps);


}

function addbullet(x, y) {
  if (player.fire === true) {
    const BULLET_EL = `<div class="bullet" direction = ${direction} style = "left: ${
      player.x + x
    }px; top: ${player.y + y}px; width:${player.bulletsize}px; height:${
      player.bulletsize
    }px"></div>`;
    gamezone.insertAdjacentHTML("beforeend", BULLET_EL);
    player.fire = false;
    setTimeout(() => (player.fire = true), player.bullettime);
  }
}

function game() {
  init();
  controllers();
  intervalls();
  spawnenemies();
  k++;
}

let player = {
  el: null,
  x: gamezone.getBoundingClientRect().width/2,
  y: gamezone.getBoundingClientRect().height/2,
  run: false,
  side: 0, //1-top, 2-right, 3- bottom, 4-left  0 это положение в котором игра стоит
  fire: true,
  points: 0,
};

class BigTank{
  constructor(collection = new Map()){
    this.speed = collection.get('speed');
    this.hp = collection.get('hp');
    this.damage = collection.get('damage');
    this.top = `url(sprites/${collection.get('image')}-top.png)`;
    this.left = `url(sprites/${collection.get('image')}-left.png)`;
    this.rigth = `url(sprites/${collection.get('image')}-right.png)`;
    this.bottom = `url(sprites/${collection.get('image')}-bottom.png)`;
    this.width = collection.get('width');
    this.height = collection.get('height');
    this.bulletspeed = collection.get('bulletspeed');
    this.bullettime = collection.get('bullettime');
    this.bulletsize = collection.get('bulletsize');
    this.bulletsize = collection.get('bulletsize');
  }
  active() {
    if (k === 0) {
      player = Object.assign(player, this);
      game();
      console.log(player);
    }
  }
}

class SmallTank extends BigTank {
  constructor(collection = new Map()) {
    super(collection);
    this.width = collection.get('size');
    this.height = collection.get('size');
  }
}

class enemy extends SmallTank {
  constructor(collection = new Map()) {
    super(collection);
    this.name = collection.get('name');
    this.points = collection.get('points');
    this.x = collection.get('x');
    this.y = collection.get('y');
    this.side = collection.get('side');
  }

  find(){
    this.el = document.querySelector(`.${this.name}`);
  }

  back(){
   if(this.side === 1){
     this.el.style.backgroundImage = this.top;
   }else if(this.side === 2){
    this.el.style.backgroundImage = this.rigth;
   }else if(this.side === 3){
    this.el.style.backgroundImage = this.bottom;
   }else if(this.side === 4){
    this.el.style.backgroundImage = this.left;
   }  
  }

  spawn(){
    let div = document.createElement("div");
    div.className = `${this.name}`;
    div.style.display = "block";
    if(this.name ==='enemy2'){
    this.x -= this.width;
    }else if(this.name === 'enemy3'){
      this.x -= this.width;
      this.y -= this.height;
    }else if(this.name === 'enemy4'){
      this.y -= this.height;
    }
    div.style.left = `${this.x}px`;
    div.style.top = `${this.y}px`;
    div.style.height = `${this.height}px`;
    div.style.width = `${this.width}px`;
    div.classList.add('enemy');
    gamezone.append(div);
    this.find();
    this.back();

  }

  move(){
    if(this.side === 1){
      if(this.y>0){
        if(Math.abs(this.y+this.height/2-player.y - player.height/2)<this.height/4){
          if(this.x+ this.width< player.x){
            this.side = 2;
            this.el.style.backgroundImage = this.rigth;
          }else if(this.x >player.x+player.width){
            this.side = 4;
            this.el.style.backgroundImage = this.left;
          }
        }else{
          this.y -= this.speed;
          this.el.style.top = `${this.y}px`;
        }
      }else{
        this.side = 2;
        this.el.style.backgroundImage = this.rigth;
        return 0;
      }

    }else if(this.side === 2){
      if(this.x < gamezone.getBoundingClientRect().width - this.width){
        if(Math.abs(this.x+this.width/2-player.x-player.width/2)<this.height/4){
          if(this.y>player.y+player.height){
            this.side = 1;
            this.el.style.backgroundImage = this.top;
          }else if(this.y+this.height<player.y){
            this.side = 3;
            this.el.style.backgroundImage = this.bottom;
          }
        }else{
          this.x += this.speed;
          this.el.style.left = `${this.x}px`;
        }
      }else{
        this.side = 3;
        this.el.style.backgroundImage = this.bottom;
        return 0;
      }

    }else if(this.side === 3){
      if(this.y < gamezone.getBoundingClientRect().height- this.height){
        if(Math.abs(this.y+this.height/2-player.y - player.height/2)<this.height/4){
          if(this.x+ this.width< player.x){
            this.side = 2;
            this.el.style.backgroundImage = this.rigth;
          }else if(this.x >player.x+player.width){
            this.side = 4;
            this.el.style.backgroundImage = this.left;
          }
        }
       else{
        this.y += this.speed;
        this.el.style.top = `${this.y}px`;
       }
      }else{
        this.side = 4;
        this.el.style.backgroundImage = this.left;
        return 0;
      }


    }else if(this.side === 4){
      if(this.x > 0){
        if(Math.abs(this.x+this.width/2-player.x-player.width/2)<this.height/4){
          if(this.y>player.y+player.height){
            this.side = 1;
            this.el.style.backgroundImage = this.top;
          }else if(this.y+this.height<player.y){
            this.side = 3;
            this.el.style.backgroundImage = this.bottom;
          }
        }
        else{
          this.x -= this.speed;
          this.el.style.left = `${this.x}px`;
        }

      }else{
        this.side = 1;
        this.el.style.backgroundImage = this.top;
        return 0;
      }

    }
  }
}


const M4_INFO_ARRAY = [
  ['speed', 10],
  ['hp', 1000],
  ['damage', 400],
  ['image', 'm4'],
  ['size', 77],
  ['bulletspeed', 5],
  ['bullettime', 2000],
  ['bulletsize', 16],
];
const M4_INFO = new Map(M4_INFO_ARRAY);

const KV2_INFO_ARRAY = [
  ['speed', 5],
  ['hp', 1300],
  ['damage', 800],
  ['image', 'kv2'],
  ['size', 150],
  ['bulletspeed', 10],
  ['bullettime', 1600],
  ['bulletsize', 20],
];
const KV2_INFO = new Map(KV2_INFO_ARRAY);

const AMX_INFO_ARRAY = [
  ['speed', 15],
  ['hp', 700],
  ['damage', 300],
  ['image', 'amx'],
  ['size', 77],
  ['bulletspeed', 30],
  ['bullettime', 800],
  ['bulletsize', 12],
];
const AMX_INFO = new Map(AMX_INFO_ARRAY);

const BTR_INFO_ARRAY = [
  ['speed', 20],
  ['hp', 500],
  ['damage', 100],
  ['image', 'btr'],
  ['size', 77],
  ['bulletspeed', 20],
  ['bullettime', 100],
  ['bulletsize', 8],
];
const BTR_INFO = new Map(BTR_INFO_ARRAY);

const WAFEN_INFO_ARRAY = [
  ['speed', 20],
  ['hp', 2000],
  ['damage', 1000],
  ['image', 'wafen'],
  ['height', 100],
  ['width', 75],
  ['bulletspeed', 30],
  ['bullettime', 500],
  ['bulletsize', 15],
];
const WAFEN_INFO = new Map(WAFEN_INFO_ARRAY);

let m4 = new SmallTank(M4_INFO);
let amx = new SmallTank(AMX_INFO);
let kv2 = new SmallTank(KV2_INFO);     //player tanks
let btr = new SmallTank(BTR_INFO);
let wafen = new BigTank(WAFEN_INFO)

const ENEMY1_INFO_ARRAY = [
  ['speed', 10],
  ['hp', 1000],
  ['damage', 400],
  ['image', 'enemy'],
  ['size', 77],
  ['bulletspeed', 5],
  ['bullettime', 2000],
  ['bulletsize', 16],
  ['points',100],
  ['name','enemy1'],
  ['x',0],
  ['y',0],
  ['side',2]
];

let ENEMY1_INFO = new Map(ENEMY1_INFO_ARRAY);

const ENEMY2_INFO_ARRAY = [
  ['speed', 10],
  ['hp', 1000],
  ['damage', 400],
  ['image', 'enemy'],
  ['size', 77],
  ['bulletspeed', 5],
  ['bullettime', 2000],
  ['bulletsize', 16],
  ['points',100],
  ['name','enemy2'],
  ['x',hangar.getBoundingClientRect().left-leftpanel.getBoundingClientRect().width],
  ['y',0],
  ['side',3]
];
let ENEMY2_INFO = new Map(ENEMY2_INFO_ARRAY);

const ENEMY3_INFO_ARRAY = [
  ['speed', 10],
  ['hp', 1000],
  ['damage', 400],
  ['image', 'enemy'],
  ['size', 77],
  ['bulletspeed', 5],
  ['bullettime', 2000],
  ['bulletsize', 16],
  ['points',100],
  ['name','enemy3'],
  ['x',hangar.getBoundingClientRect().left-leftpanel.getBoundingClientRect().width],
  ['y',gamezone.getBoundingClientRect().height],
  ['side',4]
];
let ENEMY3_INFO = new Map(ENEMY3_INFO_ARRAY);


const ENEMY4_INFO_ARRAY = [
  ['speed', 10],
  ['hp', 1000],
  ['damage', 400],
  ['image', 'enemy'],
  ['size', 77],
  ['bulletspeed', 5],
  ['bullettime', 2000],
  ['bulletsize', 16],
  ['points',100],
  ['name','enemy4'],
  ['x',0],
  ['y',gamezone.getBoundingClientRect().height],
  ['side',1]
];
let ENEMY4_INFO = new Map(ENEMY4_INFO_ARRAY);



let enemy1 = new enemy(ENEMY1_INFO);
let enemy2 = new enemy(ENEMY2_INFO);
let enemy3 = new enemy(ENEMY3_INFO);
let enemy4 = new enemy(ENEMY4_INFO);


function spawnenemies(){
enemy1.spawn();
enemy2.spawn();
enemy3.spawn();
enemy4.spawn();
}

function moveenemies(){
  enemy1.move();
  enemy2.move();
  enemy3.move();
  enemy4.move();
}