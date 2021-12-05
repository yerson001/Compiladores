
var myGamePiece;
let walls = [];
var elen;


function startGame() {
    myGamePiece = new component(30, 30, "../img/one.png", 30, 30,"image");
    var it = 0;
    for(var i=0; i<15; i++){
        elen = new component(30, 30, "red", 0,0+it);
        walls.push(elen);
        it+=30;
    }
    it = 0;
    for(var i=0; i<15; i++){
        elen = new component(30, 30, "green", 0+it,0);
        walls.push(elen);
        it+=30;
    }



    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1100;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y,type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();    
    myGamePiece.update();

    for(var i=0; i<walls.length; i++){
        walls[i].newPos();    
        walls[i].update();
    }
}

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.image.src = "../img/one.png";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var number = 0;
function action(){
    msg = document.getElementById('msg').value;
    if(msg[number]==1){
        console.log("this-> uno");
        moveright();
    }else if(msg[number]==2){
        console.log("this-> dos");
        moveleft();
    }else if(msg[number]==3){
        console.log("this-> tress");
        movedown();
    }
    number+=1;
    //document.getElementById('output').innerHTML = msg;
}
