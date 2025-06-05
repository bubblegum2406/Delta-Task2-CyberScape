let collisionDetected=false
let collisionKeyDetected=false

let dataShardMined=false
let carryDataShard=false

const updateKeys=()=>{
    c_key.clearRect(0,0,maxWidth,maxHeight)
    for(let i=0;i<keys.length;i++){
        let each_key=keys[i]
        c_key.beginPath()
        c_key.arc(each_key.x, each_key.y,key.radius, 0, Math.PI * 2)
        c_key.fillStyle = "pink";
        c_key.fill()
    }
    if(key.count==0){
        dataShardMined=true
    }
}

const checkDataShard=()=>{
    if(!dataShardMined){
        c_key.beginPath()
        c_key.arc(maxWidth/2,maxHeight/2,20,0,Math.PI*2)
        c_key.fillStyle="red"
        c_key.fill()
    }
    else if(!carryDataShard && key.count==0){
        c_key.beginPath()
        c_key.arc(maxWidth/2,maxHeight/2,20,0,Math.PI*2)
        c_key.fillStyle="blue"
        c_key.fill()
    }

    if(dataShardMined && (player.xPos==maxWidth/2 && player.yPos==maxHeight/2)){
        c_key.clearRect(0,0,maxWidth,maxHeight)
        player.color="blue"
        carryDataShard=true
        dataShardMined=false
    }
    console.log(key.count)
}

const checkDataShardLocation=()=>{
    if(carryDataShard){
        let counta=0
        for(let i=0;i<760;i=i+190){
           for(let j=0;j<1520;j=j+190){
               if(baseStationPos==counta){
                    if((player.xPos>j+30 && player.xPos<j+160) && (player.yPos>i+30 && player.yPos<i+160)){
                        player.color="white"
                        system.shards+=1
                        system.health+=10
                        key.count+=4
                        placeKeys()
                        carryDataShard=false
                        refreshScores()
                    }
                }
                counta++}}
    }
}

checkDataShard()


const checkCollision=(xPos,yPos)=>{
    buildings.forEach(building => {
        if((xPos>building.x && xPos<(building.x+building.width))&&(yPos>building.y && yPos<(building.y+building.height))){
            collisionDetected=true
         }

         if((xPos<0 || xPos>maxWidth) || (yPos<0 || yPos>maxHeight)){
            collisionDetected=true
         }
    });
}

const checkKeyCollsion=()=>{
    for(let i=0;i<keys.length;i++){
        let key_each=keys[i]
        const dx = player.xPos - key_each.x
        const dy = player.yPos - key_each.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if(distance < player.radius + 4){
            keys.splice(i,1)
            collisionKeyDetected=true
            
            key.count-=1
            refreshScores()
            break
        }
        
        
    }
    updateKeys()
        
}



window.addEventListener("keydown",(e)=>{
    if(state){
    const key=e.key
    let tempX=player.xPos
    let tempY=player.yPos

    if (key === "ArrowUp") {
    tempY = tempY - player.speed;
    player.angle = -Math.PI/2
}
else if (key === "ArrowDown") { 
    tempY = tempY + player.speed;
    player.angle = Math.PI/2
}
else if (key === "ArrowLeft") { 
    tempX = tempX - player.speed;
    player.angle = Math.PI
}
else if (key === "ArrowRight") {  
    tempX = tempX + player.speed;
    player.angle = 0;
}
    
    checkCollision(tempX,tempY)
    if(!collisionDetected){
        player.xPos=tempX
        player.yPos=tempY
    }
    collisionDetected=false

    checkKeyCollsion()
    checkDataShard()
    checkDataShardLocation()

    drawPlayer()
}
})

