const box = document.getElementById("game")
var ctx = box.getContext("2d")

const mario = new Image()
const city = new Image()
const floor = new Image()
const pipeup = new Image()
const pipebottom = new Image()


mario.src="img/mario.png"
city.src="img/city.png"
floor.src="img/floor.png"
pipeup.src="img/pipeup.png"
pipebottom.src="img/pipebottom.png"




let xPos = 10;
let yPos = 354;
let gap = 90;
const gravitation = 1;



addEventListener("keydown", function(event) {
    {
    yPos -= 20
    }
  });
let pipes = [];

pipes[0]  = {
   x : box.width,
   y : 0 
}



function draw() {
    ctx.drawImage(city, 0, 0)
   
    for (i=0; i<pipes.length; i++) {
    ctx.drawImage(pipeup, pipes[i].x , pipes[i].y  )
    ctx.drawImage(pipebottom, pipes[i].x, pipes[i].y + pipeup.height + gap)
    pipes[i].x--

    if(pipes[i].x == 125) {
        pipes.push({
            x : box.width,
            y : Math.floor(Math.random()*pipeup.height) - pipeup.height + 30
        })
        }
    }


    ctx.drawImage(floor, 0, 100 + box.height - floor.height)

    ctx.drawImage(mario, xPos, yPos, 55, 50)

    yPos  += gravitation;
    addEventListener("keyup", function(event) {
        if (event)
       
            yPos <=354;
        
      });
    requestAnimationFrame(draw)
    
}

pipebottom.onload = draw;
