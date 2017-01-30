'use strict';
import {SphereGeometry} from 'three/src/geometries/SphereGeometry'
import {BoxGeometry} from 'three/src/geometries/BoxGeometry'
import {PlaneGeometry} from 'three/src/geometries/PlaneGeometry'
import {Mesh} from 'three/src/objects/Mesh'
import {MeshStandardMaterial} from 'three/src/materials/MeshStandardMaterial'
import {MeshLambertMaterial} from 'three/src/materials/MeshLambertMaterial'
import {getBoxMinMax} from './tools'
import {getRandomColor} from './tools'

let ballRad = 0.4;
let ballGeometry = new SphereGeometry( ballRad, 20, 10 );
let ballMaterial = new MeshLambertMaterial( { color: getRandomColor() } );
let ball = new Mesh( ballGeometry, ballMaterial );
ball.radius = ballRad;
ball.position.set(0, -9.75 + ballRad, -17 + ballRad);

let blocks = [];
let blockWidth = 3.5, blockHeight = 1, blockLength = 2.5;
const startX = blockWidth / 2 - blockWidth * 5;
const startY = 3;
const startZ = -17;
let blocksNumber = 99;
for (let i = 0; i <= blocksNumber; i++) {
    let blockGeometry = new BoxGeometry( blockWidth, blockHeight, blockLength, 1 );
    let blockMaterial = new MeshStandardMaterial( { color: getRandomColor()} );
    let block = new Mesh( blockGeometry, blockMaterial );
    block.w = blockWidth;
    block.h = blockHeight;
    const y = startY + (i - (i % 10)) / 10;
    if (i % 10 === 0) {
        block.position.set(startX, y, startZ + blockLength);
    } else {
        block.position.set(startX + blockWidth * (i % 10), y, startZ + blockLength);
    }
    getBoxMinMax(block);
    blocks.push(block);
}

let plane = new Mesh( new PlaneGeometry( 200, 200, 18, 18 ),
    new MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
    })
);
plane.position.set(0, 0, startZ);

let plankWidth = 4, plankHeight = 0.75, plankLength = 0.8;
let plankGeometry = new BoxGeometry( plankWidth, plankHeight, plankLength, 1 );
let plankMaterial = new MeshLambertMaterial( { color: getRandomColor() } );
let plank = new Mesh( plankGeometry, plankMaterial );
plank.w = plankWidth;
plank.h = plankHeight;
plank.position.set(0, -10, -17 + plankLength / 2);
plank.getMinMax = function() {
    plank.minX = plank.position.x - plankWidth/2;
    plank.minY = plank.position.y - plankHeight/2;
    plank.minZ = plank.position.z - plankLength/2;
    plank.maxX = plank.position.x + plankWidth/2;
    plank.maxY = plank.position.y + plankHeight/2;
    plank.maxZ = plank.position.z + plankLength/2;
};

let borderLength = 3, borderWidth = 2;
let horBorderHeight = 49, verBorderHeight = 32;
let borderMaterial = new MeshStandardMaterial( { color: getRandomColor() } );
let verBorderGeometry = new BoxGeometry( borderWidth, verBorderHeight, borderLength, 1 );
let horBorderGeometry = new BoxGeometry( borderWidth, horBorderHeight, borderLength, 1 );
let verBorderLeft = new Mesh( verBorderGeometry, borderMaterial );
verBorderLeft.w = borderWidth;
verBorderLeft.h = verBorderHeight;
verBorderLeft.position.set(-24, 6, -17);
getBoxMinMax(verBorderLeft);
let verBorderRight = new Mesh( verBorderGeometry, borderMaterial );
verBorderRight.w = borderWidth;
verBorderRight.h = verBorderHeight;
verBorderRight.position.set(24, 6, -17);
getBoxMinMax(verBorderRight);
let horBorderTop = new Mesh( horBorderGeometry, borderMaterial );
horBorderTop.w = horBorderHeight;
horBorderTop.h = borderWidth;
horBorderTop.position.set(0, 21, -17);
getBoxMinMax(horBorderTop);
horBorderTop.rotateZ(Math.PI/2);

export {ball, blocks, plank, plane}
export {verBorderLeft, verBorderRight, horBorderTop}
