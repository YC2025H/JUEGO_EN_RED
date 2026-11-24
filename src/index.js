import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { GameScene } from './scenes/GameScene.js';
import { SettingsScene } from './scenes/SettingsScene.js';
import { CreditsScene } from './scenes/CreditsScene.js';
import { FinalScene } from './scenes/FinalScene.js';
import { InstrucMoveScene } from './scenes/InstrucMoveScene.js';
import { InstrucAimScene } from './scenes/InstrucAimScene.js';
import { SettingsMoveScene } from './scenes/SettingsMoveScene.js';
import { FailScene} from './scenes/FailScene.js';

const config = {
    type: Phaser.AUTO,      // WebGL if available; otherwise, Canvas
    width: 1920,
    height: 1080,
    scale: {
        //paara centar el juego en el centro
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, debug: true
        }
    },
    scene: [MenuScene, GameScene, SettingsScene,  InstrucAimScene, PauseScene, SettingsMoveScene, InstrucMoveScene,  FinalScene, CreditsScene, FailScene]      // The first scene starts automatically
};

const game = new Phaser.Game(config);
