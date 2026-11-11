import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { GameScene } from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,      // WebGL if available; otherwise, Canvas
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 9.8 }
        }
    },
    scene: [GameScene, PauseScene, MenuScene]      // The first scene starts automatically
};

const game = new Phaser.Game(config);
