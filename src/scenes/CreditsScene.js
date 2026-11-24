import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        AssetsPreloader.preload(this);
    }

    create() {
        const centroX = this.scale.width / 2;
        const centroY = this.scale.height / 2;

        this.background = this.add.image(centroX, centroY, 'credits_background').setOrigin(0.5);

        this.add.text(centroX + 300, 200, 'Créditos', {
            fontFamily: 'Font',
            fontSize: '250px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(centroX , 450, 'Luisa Baeza Rodríguez', {
            fontFamily: 'Font',
            fontSize: '70px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(centroX , 550, 'Yi Chen', {
            fontFamily: 'Font',
            fontSize: '70px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(centroX , 650, 'Sofía García de Vinuesa', {
            fontFamily: 'Font',
            fontSize: '70px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(centroX , 750, 'Mireya Vargas Sánchez', {
            fontFamily: 'Font',
            fontSize: '70px',
            color: '#000000'
        }).setOrigin(0.5);

        const menuBtn = this.add.image(centroX + 760, 1000, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const MenuButton = this.add.text(centroX + 760, 990, 'Menú', {
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
        this.audio = this.sound.add('buttonEffect', { loop: false, volume: 1 });
        this.audio.play();

    }
}