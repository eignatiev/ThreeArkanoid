'use strict';
import {Vector3} from 'three/src/math/Vector3'
import {Raycaster} from 'three/src/core/Raycaster'
import {ball, plane, plank} from './meshes'
import {camera} from '../arkanoid'

export function onMouseMove(e) {
    e.preventDefault();
    let mouseX = ( e.clientX / window.innerWidth ) * 2 - 1;
    let mouseY = -( e.clientY / window.innerHeight ) * 2 + 1;
    let vector = new Vector3(mouseX, mouseY, 0.5);
    vector.unproject(camera);
    let raycaster = new Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObject(plane);
    plank.position.x = intersects[0].point.x;
    if(!this.ballIsMoving) ball.position.x = intersects[0].point.x;
}

export function onMouseDown(e) {
    e.preventDefault();
    this.ballIsMoving = true;
}
