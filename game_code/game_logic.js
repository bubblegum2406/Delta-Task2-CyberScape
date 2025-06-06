systemHealthTicker=()=>{
    if(state){
        system.health=system.health-1
        refreshScores()
    }
    
}


setInterval(systemHealthTicker,5000)



let keys=[]

const placeKeys=()=>{
    let tempKeyCount=key.count
    
    while(tempKeyCount>0){
    let x =Math.random() * maxWidth
    let y = Math.random() *maxHeight
    for(let i=0;i<maxHeight;i=i+190){
        for(let j=0;j<maxWidth;j=j+190){
             if((x>j && x<j+190) && (y>i && y<i+190)){
                if(y<i+35 || y>i+165 || x<j+35 || x>j+165){
                    c_key.beginPath()
                    c_key.arc(x, y, key.radius, 0, Math.PI * 2)
                    c_key.fillStyle = "pink";
                    c_key.fill()
                    tempKeyCount-=1
                    keys.push({x,y})
                }
             }
            }
        }
        
    
        }
}

placeKeys()
    




