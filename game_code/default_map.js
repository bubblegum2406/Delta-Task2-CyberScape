const buildings=[]

let baseStationPos=Math.floor(Math.random()*32)

const MapInitialization=()=>{
    //outer lines
    for(let i=0;i<maxHeight;i=i+190){
    c.lineWidth=3
    c.beginPath()
    c.moveTo(0,i)
    c.lineTo(maxWidth,i)
    c.strokeStyle="lime"
    c.stroke()
    }

    for(let i=0;i<maxWidth;i=i+190){
    c.lineWidth=3
    c.beginPath()
    c.moveTo(i,0)
    c.lineTo(i,maxHeight)
    c.strokeStyle="lime"
    c.stroke()
   }

   //rects



   


   count=0
for(let i=0;i<760;i=i+190){
    for(let j=0;j<1520;j=j+190){
    if(baseStationPos==count){
        c.fillStyle="cyan" 
    }
    else{
        c.fillStyle="lime"
    }
    c.fillRect(j+25,i+25,140,140)
    count++
}
}





//buildings
const buildingPlacer=(maxX,maxY,minX,minY)=>{
    let count=Math.random()*5+1
    let buildingWidth=Math.random()*(70-40)+40
    let buildingHeight=Math.random()*(70-40)+40

    maxX=maxX-buildingWidth
    maxY=maxY-buildingHeight

    const drawBuilding=(x,y,width,height)=>{
        
        c_building.fillStyle="black"
        c_building.fillRect(x,y,width,height)
    }

    

    for(let i=0;i<count;i++){
        const width=buildingWidth
        const height=buildingHeight
        const x=Math.random()*(maxX-minX)+minX
        const y=Math.random()*(maxY-minY)+minY
        drawBuilding(x,y,width,height)
        buildings.push({x:x,y:y,width:width,height:height})
    }
}


for(let i=0;i<maxHeight;i=i+190){
    for(let j=0;j<maxWidth;j=j+190){
    buildingPlacer(j+155,i+155,j+35,i+35)
}
}


//basestation_blob
count=0
for(let i=0;i<760;i=i+190){
    for(let j=0;j<1520;j=j+190){
    if(baseStationPos==count){
         BaseStationCircle(j+95,i+95)
    }
    
    count++
}
}



}

window.addEventListener("load",()=>{
    MapInitialization()
    drawPlayer()
})



