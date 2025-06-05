let bullets = [];
let bulletDirection = 0; // 0 = forward, -1 = left, 1 = right (relative to player)

let enemy_respawn=[]

const updateBullets = () => {
    if (!state) return;
    
    c_bullet.clearRect(0, 0, maxWidth, maxHeight);
    
    const currentTime = Date.now();
    
    // Process each bullet
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        
        // Check if bullet has expired (5 seconds)
        if (currentTime - bullet.createdTime > 5000) {
            bullets.splice(i, 1);
            continue;
        }
        
        // Update bullet position based on velocity
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        
        // Check for collisions with buildings
        let collidedWithBuilding = false;
        for (const building of buildings) {
            if (checkBulletBuildingCollision(bullet, building)) {
                // Handle reflection
                handleBulletReflection(bullet, building);
                collidedWithBuilding = true;
                break;
            }
        }
        
        // Check for collisions with enemy radars
        let hitEnemy = false;
        for (let j = 0; j < enemies.length; j++) {
            const enemyPos = enemies[j];
            const dx = bullet.x - enemyPos.x;
            const dy = bullet.y - enemyPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < enemy.radius) {
                // Remove both bullet and enemy
                bullets.splice(i, 1);
                enemy_respawn.push(enemies[j])
                enemies.splice(j, 1);
                hitEnemy = true;
                break;
            }
        }
        
        if (hitEnemy) continue;
        
        // Remove bullets that go out of bounds
        if (bullet.x < 0 || bullet.x > maxWidth || bullet.y < 0 || bullet.y > maxHeight) {
            bullets.splice(i, 1);
            continue;
        }
        
        // Draw the bullet if it's still active
        if (!collidedWithBuilding) {
            c_bullet.beginPath();
            c_bullet.arc(bullet.x, bullet.y, 4, 0, 2 * Math.PI);
            c_bullet.closePath();
            c_bullet.fillStyle = "white";
            c_bullet.fill();
        }
    }
    
    requestAnimationFrame(updateBullets);
};

const checkBulletBuildingCollision = (bullet, building) => {
    // Find the closest point on the building to the bullet
    let closestX = Math.max(building.x, Math.min(bullet.x, building.x + building.width));
    let closestY = Math.max(building.y, Math.min(bullet.y, building.y + building.height));
    
    // Calculate distance between bullet and closest point
    const dx = bullet.x - closestX;
    const dy = bullet.y - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < 4; // Bullet radius is 4
};

const handleBulletReflection = (bullet, building) => {
    // Find which side of the building was hit
    const leftDist = Math.abs(bullet.x - building.x);
    const rightDist = Math.abs(bullet.x - (building.x + building.width));
    const topDist = Math.abs(bullet.y - building.y);
    const bottomDist = Math.abs(bullet.y - (building.y + building.height));
    
    const minDist = Math.min(leftDist, rightDist, topDist, bottomDist);
    
    // Reflect based on which side was hit
    if (minDist === leftDist || minDist === rightDist) {
        bullet.vx=-0.5*bullet.vx // Reverse x velocity (horizontal reflection)
    } else {
        bullet.vy=-0.5*bullet.vy // Reverse y velocity (vertical reflection)
    }
    
    // Move bullet slightly away from the building to prevent sticking
    bullet.x += bullet.vx * 0.5;
    bullet.y += bullet.vy * 0.5;
};




// Shoot bullet with 'a' key
window.addEventListener("keydown", (e) => {
    if (!state) return;
    
    const key = e.key.toLowerCase();
    if (key === "a") {
        // Calculate base angle (forward)
        let angle = player.angle || 0;
        
        // Adjust angle based on direction
        if (bulletDirection === -1) {
            angle -= Math.PI/4; // 45 degrees left
        } 
        else if (bulletDirection === 1) {
            angle += Math.PI/4; // 45 degrees right
        }
        
        // Create bullet with initial position, velocity, and creation time
        bullets.push({
            x: player.xPos,
            y: player.yPos,
            vx: Math.cos(angle) * 5,
            vy: Math.sin(angle) * 5,
            createdTime: Date.now()
        });
    }
});

// Start the bullet update loop
updateBullets();

const respawnEnemies=()=>{
    enemy_respawn.forEach(respawn=>{
        enemies.push(respawn)
    })
    enemy_respawn=[]
}

setInterval(respawnEnemies,10000)