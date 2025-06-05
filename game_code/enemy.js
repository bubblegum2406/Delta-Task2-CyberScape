let enemies = []

enemy_count = 0
for(let i = 0; i < 760; i = i + 190) {
    for(let j = 0; j < 1520; j = j + 190) {
        if(enemy_count != baseStationPos) {
            let xPos = Math.random() * ((j + 155) - (j + 35)) + (j + 35)
            let yPos = Math.random() * ((i + 155) - (i + 35)) + (i + 35)
            enemies.push({
                x: xPos,
                y: yPos,
                angle: Math.random() * (enemy.maxAngle - enemy.minAngle) + enemy.minAngle,
                direction: Math.random() > 0.5 ? 1 : -1,
                lastHitTime: 0 // Track when we last hit the player
            })
        }
        enemy_count++
    }
}

const isPlayerUnderRadar = (enemyPos) => {
    // Calculate distance between player and enemy
    const dx = player.xPos - enemyPos.x;
    const dy = player.yPos - enemyPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Check if player is within enemy's radar radius
    if (distance > enemy.radius) {
        return false;
    }
    
    // Calculate angle to player
    const angleToPlayer = Math.atan2(dy, dx);
    
    // Normalize angles to be between 0 and 2π
    const normalizedPlayerAngle = (angleToPlayer + 2 * Math.PI) % (2 * Math.PI);
    const normalizedRadarStart = (enemyPos.angle + 2 * Math.PI) % (2 * Math.PI);
    const normalizedRadarEnd = (enemyPos.angle + enemy.sweep + 2 * Math.PI) % (2 * Math.PI);
    
    // Check if player is within the radar sweep angle
    if (normalizedRadarStart < normalizedRadarEnd) {
        return normalizedPlayerAngle >= normalizedRadarStart && 
               normalizedPlayerAngle <= normalizedRadarEnd;
    } else {
        // Handle wrap-around case (when radar crosses 0/2π boundary)
        return normalizedPlayerAngle >= normalizedRadarStart || 
               normalizedPlayerAngle <= normalizedRadarEnd;
    }
}

const drawEnemy = () => {
    if(state) {
        c_enemy.clearRect(0, 0, enemy_canvas.width, enemy_canvas.height)
        const currentTime = Date.now();

        // Update angle and check for player collision
        enemies.forEach(pos => {
            pos.angle += pos.direction * enemy.speed;
            if (pos.angle > enemy.maxAngle || pos.angle < enemy.minAngle) {
                pos.direction *= -1;
            }
            
            // Check if player is under this enemy's radar
            if (isPlayerUnderRadar(pos)) {
                // Only reduce health once per second per enemy
                if (currentTime - pos.lastHitTime > 1000) {
                    player.health -= 5;
                    pos.lastHitTime = currentTime;
                    refreshScores();
                    
                    // Visual feedback when player is hit
                    
                }
            }

            c_enemy.save();
            c_enemy.translate(pos.x, pos.y);
            c_enemy.beginPath();
            c_enemy.moveTo(0, 0);
            c_enemy.arc(0, 0, enemy.radius, pos.angle, pos.angle + enemy.sweep);
            c_enemy.closePath();

            c_enemy.fillStyle = 'rgba(255, 0, 0, 0.4)';
            c_enemy.fill();
            c_enemy.strokeStyle = 'rgba(189, 4, 4, 0.7)';
            c_enemy.lineWidth = 3;
            c_enemy.stroke();

            c_enemy.restore();
        })

        requestAnimationFrame(drawEnemy);
    }
}

drawEnemy();