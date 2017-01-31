'use strict';
import {Vector3} from 'three/src/math/Vector3'

export function getRandomColor() {return Math.random() * 0xffffff}

export function getBoxMinMax(mesh) {
    mesh.minX = mesh.position.x - mesh.w/2;
    mesh.minY = mesh.position.y - mesh.h/2;
    mesh.maxX = mesh.position.x + mesh.w/2;
    mesh.maxY = mesh.position.y + mesh.h/2;
}

export function checkIntersections(ball, block) {
    // get box closest point to sphere center by clamping
    let x = Math.max(block.minX, Math.min(ball.position.x, block.maxX));
    let y = Math.max(block.minY, Math.min(ball.position.y, block.maxY));
    let z = Math.max(block.minZ, Math.min(ball.position.z, block.maxZ));
    window.v = new Vector3(x, y, z);
    // this is the same as isPointInsideSphere
    let distance = Math.sqrt(
        (x - ball.position.x) * (x - ball.position.x) +
        (y - ball.position.y) * (y - ball.position.y)
    );
    if(distance < ball.radius) {
        if      (x === block.maxX)  ball.directionX = 1;    // right
        else if (x === block.minX)  ball.directionX = -1;   // left

        if (y === block.maxY)  ball.directionY = 1;    // top
        else if (y === block.minY)  ball.directionY = -1;   // bottom
        window.hitX = x;
        return true;
    }
}

export function plankCrossedBorder(p, leftBorder, rightBorder, b, ballIsMoving) {
    if(p.minX < leftBorder.maxX) {
        p.position.x = leftBorder.position.x + leftBorder.w / 2 + p.w / 2;
        if (!ballIsMoving) b.position.x = p.position.x;
    }
    else if(p.maxX > rightBorder.minX) {
        p.position.x = rightBorder.position.x - rightBorder.w / 2 - p.w / 2;
        if (!ballIsMoving) b.position.x = p.position.x;
    }
}

export function bounceFromPlank(plank, x, ball) {
    let length = plank.maxX - plank.minX;
    let lengthPercent = length / 100;
    let hitPoint = length - (plank.maxX - x);
    let hitPercent = hitPoint / lengthPercent;

    if(hitPercent < 50) {
        ball.moodX = -(ball.normalSpeed * (hitPercent - 50) / 100 * 2);
        ball.directionX = -1;
    }
    if(hitPercent > 50) {
        ball.moodX = ball.normalSpeed * (hitPercent - 50) / 100 * 2;
        ball.directionX = 1;
    }
    ball.moodY = Math.sqrt(ball.normalSpeed * ball.normalSpeed - ball.moodX * ball.moodX);
}
