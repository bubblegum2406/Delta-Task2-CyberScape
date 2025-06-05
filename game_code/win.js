const checkWin=()=>{
if(player.health==0 || system.health==20 ){
    state=false
    resumeBtn.style.display="none"
    pauseBtn.style.display="none"
    c_end.clearRect(0,0,maxWidth,maxHeight)

    c_end.font="50px Helvetica"
    c_end.fillStyle = "rgb(0, 181, 187)"
    c_end.fillText("You Lose",maxWidth/2,maxHeight/2)
}

if(system.health==100){
    state=false
    resumeBtn.style.display="none"
    pauseBtn.style.display="none"
    c_end.clearRect(0,0,maxWidth,maxHeight)
    c_end.font="50px Helvetica"
    c_end.fillStyle = "rgb(0, 181, 187)"
    c_end.fillText("You Win",0,0)
    if(system.shards>=highscore){
        localStorage.setItem("Highscore",system.shards)
    }
}
}

setInterval(checkWin,1000)