import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        AssetsPreloader.preload(this);
        this.load.font('Font', 'assets/fonts/kindergarten.ttf', 'truetype');
    }
    create() {

        const centroX = this.scale.width / 2;
        const centroY = this.scale.height / 2;

        this.add.image(centroX, centroY, 'menu_background').setOrigin(0.5);

        this.add.text(centroX + 400, 270, 'Menú', {
            fontFamily: 'Font',
            fontSize: '100px',
            color: '#000000'
        }).setOrigin(0.5);

        const localBtn = this.add.image(centroX + 400, 510, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const creditsBtn = this.add.image(centroX + 400, 700, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const LocalBotton = this.add.text(centroX + 400, 500, 'Local Play', {
            fontFamily: 'Font',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        localBtn.on('pointerover', () => {
            LocalBotton.setScale(1.1);
            localBtn.setScale(1.1);
        });
        localBtn.on('pointerout', () => {
            LocalBotton.setScale(1);
            localBtn.setScale(1);
        })
        localBtn.on('pointerdown', () => this.scene.start('GameScene'));


        const CreditsButton = this.add.text(centroX + 400, 690, 'Credits', {
            fontFamily: 'Font',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        creditsBtn.on('pointerover', () => {
            CreditsButton.setScale(1.1);
            creditsBtn.setScale(1.1);
        });
        creditsBtn.on('pointerout', () => {
            CreditsButton.setScale(1);
            creditsBtn.setScale(1);
        })
        creditsBtn.on('pointerdown', () => this.scene.start('CreditsScene'));


        //Sofi
        //const settingsBtn = this.add.image(960, 540, 'settingsBtn').setOrigin(0.5).setInteractive({ useHandCursor: true });
        //settingsBtn.on('pointerdown', () => {
        //    this.scene.pause();
        //    this.scene.launch('SettingsScene');
        //});
    }

}
