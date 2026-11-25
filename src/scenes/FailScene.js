import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class FailScene extends Phaser.Scene {
    constructor() {
        super('FailScene');
    }

    preload() {
        AssetsPreloader.preload(this);
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.background = this.add.image(centerX, centerY, 'fail_background').setOrigin(0.5);

        this.add.text(1000, 550, '¡Se te ha acabo el tiempo!', {
            fontFamily: 'Font',
            fontSize: '90px',
            color: '#000000'
        }).setOrigin(0.5);

        const menuBtn = this.add.image(centerX + 760, 1000, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const MenuButton = this.add.text(centerX + 760, 990, 'Menú', {
            fontFamily: 'Font',
            fontSize: '50px',
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