import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class FinalScene extends Phaser.Scene {
    constructor() {
        super('FinalScene');
    }

    preload() {
        AssetsPreloader.preload(this);
        this.load.font('Font', 'assets/fonts/kindergarten.ttf', 'truetype');
    }

    create() {
        const centroX = this.scale.width / 2;
        const centroY = this.scale.height / 2;

        this.background = this.add.image(centroX, centroY, 'final_background').setOrigin(0.5);

        this.add.text(centroX + 630, 200, 'Thanks', {
            fontFamily: 'Font',
            fontSize: '200px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(centroX + 630, 350, 'Puntuación:', {
            fontFamily: 'Font',
            fontSize: '100px',
            color: '#000000'
        }).setOrigin(0.5);

        const menuBtn = this.add.image(centroX + 760, 1000, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const MenuButton = this.add.text(centroX + 760, 990, 'Menu', {
            fontFamily: 'Font',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        menuBtn.on('pointerover', () => {
            MenuButton.setScale(1.1);
            menuBtn.setScale(1.1);
        });
        menuBtn.on('pointerout', () => {
            MenuButton.setScale(1);
            menuBtn.setScale(1);
        })
        menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));

    }
}