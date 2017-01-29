'use strict';
import Stats from 'stats-js/src/Stats'

let stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

export {stats}
