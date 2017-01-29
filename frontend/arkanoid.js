'use strict';
import {Scene as Scene} from 'three/src/scenes/Scene'
import {WebGLRenderer as Renderer} from 'three/src/renderers/WebGLRenderer'
import {PerspectiveCamera as Camera} from 'three/src/cameras/PerspectiveCamera'
import {Vector3} from 'three/src/math/Vector3'
import {AmbientLight} from 'three/src/lights/AmbientLight'
import {AxisHelper as Axis} from 'three/src/extras/helpers/AxisHelper'
import {onMouseMove, onMouseDown} from './src/events'
import {getRandomColor, getBoxMinMax, checkIntersections, plankCrossedBorder, bounceFromPlank} from './src/tools'
import {blocks, ball, plane, plank} from './src/meshes'
import {verBorderLeft, verBorderRight, horBorderTop} from './src/meshes'
import {stats} from './src/stats'

const game = {
    renderer: new Renderer(),
    scene: new Scene(),
    camera: new Camera(25, window.innerWidth / window.innerHeight, 0.1, 1000),
    ambientLight: new AmbientLight(0xffffff, 2),
    axis: new Axis(20),
    addEventListeners: function() {
        document.addEventListener('mousemove', onMouseMove.bind(this), false);
        document.addEventListener('mousedown', onMouseDown.bind(this), false);
    },
    showStats: function() {
        document.body.innerHTML = '<div id="stats"></div>';
        document.getElementById('stats').append(stats.domElement);
    },
    initGame: function() {
        this.showStats();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(getRandomColor());
        this.renderer.setPixelRatio(window.resize);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.set(0, -40, 70);
        this.camera.lookAt(new Vector3(0, 3, -17));
        this.scene.add(this.ambientLight);
        // this.scene.add(this.axis);
        this.scene.add(verBorderLeft);
        verBorderLeft.castShadow = true;
        this.scene.add(verBorderRight);
        this.scene.add(horBorderTop);
        this.scene.add(plane);
        this.scene.add(ball);
        this.scene.add(plank);
        blocks.map((block) => this.scene.add(block));
        this.ballIsMoving = false;
        ball.normalSpeed = 0.4;
        ball.directionY = 1;
        ball.directionX = 1;
        ball.moodX = 0;
        ball.moodY = ball.normalSpeed;
        this.addEventListeners();
    },
    render: function () {
        stats.update();
        if (this.ballIsMoving) {
            ball.position.y += ball.moodY * ball.directionY;
            ball.position.x += ball.moodX * ball.directionX;
        }
        for (let b of blocks) {
            if(checkIntersections(ball, b)){
                b.position.set(30, 0, -17);
                getBoxMinMax(b);
            }
        }
        getBoxMinMax(plank);
        if (checkIntersections(ball, plank)) bounceFromPlank(plank, window.hitX, ball);
        checkIntersections(ball, verBorderLeft);
        checkIntersections(ball, verBorderRight);
        checkIntersections(ball, horBorderTop);
        plankCrossedBorder(plank, verBorderLeft, verBorderRight, ball, this.ballIsMoving);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        requestAnimationFrame(this.render.bind(this));
        this.renderer.autoClear = false;
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }
};

game.initGame();
game.render();

let camera = game.camera;
export {camera}
