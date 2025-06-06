const player={
    radius:15,
    color:"white",
    xPos:maxWidth/2,
    yPos:maxHeight/2,
    speed:5,
    health:100
}



const system={
    health:50,
    shards:0,
    highscore:localStorage.getItem("Highscore") || 0
}

const BaseStationCircle=(x,y)=>{
    c_building.beginPath()
    c_building.arc(x,y,20,0,2*Math.PI)
    c_building.closePath()
    c_building.fillStyle="blue"
    c_building.fill()
}

const drawPlayer=()=>{
    c_player.clearRect(0, 0, maxWidth, maxHeight);
    c_player.beginPath()
    c_player.arc(player.xPos,player.yPos,player.radius,0,2*Math.PI)
    c_player.closePath()
    c_player.fillStyle=player.color
    c_player.fill()
}

const enemy={
    radius:110,
    minAngle:Math.PI/4,
    maxAngle:Math.PI,
    speed:0.005,
    sweep:Math.PI/3
}

const key={
    count:4,
    radius:4
}




