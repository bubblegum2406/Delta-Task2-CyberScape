const refreshScores=()=>{
    c_text.clearRect(0,0,maxWidth,maxHeight)

    c_text.font = "30px Helvetica"

  
     c_text.fillStyle = "rgb(0, 181, 187)"
     c_text.fillText("Player Health: "+player.health, 20, 40)
     c_text.fillText("System Health: "+system.health, 20, 70)
     c_text.fillText("Keys: "+key.count, 20, 100)
     c_text.fillText("Shards Delivered: "+system.shards, 20, 130)
     c_text.fillText("Highscore: "+(system.highscore || 0), 20, 160)
}




refreshScores()

pauseBtn.addEventListener("click",()=>{
    if(state){
        state=false
    }
    else{
        alert("Game is already Paused")
    }

})

resumeBtn.addEventListener("click",()=>{
    if(!state){
        state=true
        drawEnemy()
        updateBullets()
    }
})

resetBtn.addEventListener("click",()=>{
    window.location.reload()
})