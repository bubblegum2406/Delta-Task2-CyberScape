const background_canvas=document.getElementById("baseLayer")
background_canvas.width=window.innerWidth
background_canvas.height=window.innerHeight
const c=background_canvas.getContext('2d')

const maxWidth=window.innerWidth
const maxHeight=window.innerHeight

const player_canvas=document.getElementById("playerLayer")
player_canvas.width=window.innerWidth
player_canvas.height=window.innerHeight
const c_player=player_canvas.getContext('2d')


const building_canvas=document.getElementById("buildingLayer")
building_canvas.width=window.innerWidth
building_canvas.height=window.innerHeight
const c_building=building_canvas.getContext('2d')

const enemy_canvas=document.getElementById("enemyLayer")
enemy_canvas.width=window.innerWidth
enemy_canvas.height=window.innerHeight
const c_enemy=enemy_canvas.getContext('2d') 

const text_canvas=document.getElementById("textLayer")
text_canvas.width=0.2*window.innerWidth
text_canvas.height=0.25*window.innerHeight
const c_text=text_canvas.getContext('2d')

const button_canvas=document.getElementById("buttonLayer")

let state=true

const pauseBtn=document.getElementById('pause-btn')
const resumeBtn=document.getElementById('resume-btn')
const resetBtn=document.getElementById('reset-btn')


const bullet_canvas=document.getElementById("bulletLayer")
bullet_canvas.width=window.innerWidth
bullet_canvas.height=window.innerHeight
const c_bullet=bullet_canvas.getContext('2d')

const key_canvas=document.getElementById("keyLayer")
key_canvas.width=window.innerWidth
key_canvas.height=window.innerHeight
const c_key=key_canvas.getContext('2d')

const end_canvas=document.getElementById("endLayer")
end_canvas.width=window.innerWidth
end_canvas.height=window.innerHeight
const c_end=end_canvas.getContext('2d')

let highscore=localStorage.getItem("HighScore")

if(highscore==null){
    highscore=0
}
