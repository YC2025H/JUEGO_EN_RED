import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class MenuScene extends Phaser.Scene 
{
    constructor() {
        super('MenuScene');
    }

    preload()
	{
		this.load.image('menu_background', 'assets/img/MENU_ASSETS/Menu_Background.png');
        this.load.image('localBtn', 'assets/img/BUTTONS/bottom.png');
        this.load.font('Font', 'assets/fonts/kindergarten.ttf', 'truetype');
	}
    create() {

        const centroX = this.scale.width / 2;
		const centroY = this.scale.height / 2;

        this.add.image(centroX, centroY, 'menu_background').setOrigin(0.5);

        this.add.text(centroX + 400, 270, 'Menú', {
            fontFamily:'Font',
            fontSize: '100px',
            color: '#000000'
        }).setOrigin(0.5);

        const localBtn = this.add.image(centroX + 400,  510, 'localBtn')
		.setOrigin(0.5)
		.setInteractive({ useHandCursor: true });

        const LocalBotton = this.add.text(centroX + 400, 500, 'Local Play', {
            fontFamily:'Font',
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


            //Sofi
            //const settingsBtn = this.add.image(960, 540, 'settingsBtn').setOrigin(0.5).setInteractive({ useHandCursor: true });
            //settingsBtn.on('pointerdown', () => {
            //    this.scene.pause();
            //    this.scene.launch('SettingsScene');
            //});
    }
    
}
