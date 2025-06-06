const checkWin=()=>{
if(player.health<=0 || system.health<=20 ){
    state=false
    resumeBtn.style.display="none"
    pauseBtn.style.display="none"
    document.getElementById("textview").innerHTML="You Lose"
}

if(system.health>=100){
    state=false
    resumeBtn.style.display="none"
    pauseBtn.style.display="none"
    document.getElementById("textview").innerHTML="You Win"
    const currentHighscore = parseInt(localStorage.getItem("Highscore") || 0);
    if(system.shards > currentHighscore){
        localStorage.setItem("Highscore", system.shards.toString());
    }
    system.highscore = Math.max(system.shards, currentHighscore);
    refreshScores();
}
}

setInterval(checkWin,1000)