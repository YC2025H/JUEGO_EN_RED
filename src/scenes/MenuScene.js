import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class MenuScene extends Phaser.Scene 
{
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.text(960, 270, 'Menú', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const localBtn = this.add.text(400, 320, 'Local Play', {
            fontSize: '32px',
            color: '#00a6ff'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => localBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => localBtn.setStyle({ color: '#00ff00' }))
            //.on('pointerdown', () => this.scene.start('GameScene'));


            //Sofi
            //const settingsBtn = this.add.image(960, 540, 'settingsBtn').setOrigin(0.5).setInteractive({ useHandCursor: true });
            //settingsBtn.on('pointerdown', () => {
            //    this.scene.pause();
            //    this.scene.launch('SettingsScene');
            //});
    }
}
