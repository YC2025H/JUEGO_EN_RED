import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        AssetsPreloader.preload(this);
    }

    create() {

        const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

        const defaultControls = {
            kiko: { up: KeyCodes.W, left: KeyCodes.A, right: KeyCodes.D },
            kika: { up: KeyCodes.UP, left: KeyCodes.LEFT, right: KeyCodes.RIGHT }
        };

        if(this.registry.get('moveControls'==null)){
            this.registry.set('moveControls', defaultControls);
        }
        

        if (!this.sound.get('music')) {
            this.audio = this.sound.add('music', { loop: true, volume: 0.5 });
            this.audio.play();
        }

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.add.image(centerX, centerY, 'menu_background').setOrigin(0.5);

        this.add.text(centerX + 400, 270, 'Menú', {
            fontFamily: 'Font',
            fontSize: '100px',
            color: '#000000'
        }).setOrigin(0.5);

        const localBtn = this.add.image(centerX + 400, 460, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const creditsBtn = this.add.image(centerX + 400, 760, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const optionsBtn = this.add.image(centerX + 400, 610, 'Button')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const LocalBotton = this.add.text(centerX + 400, 450, 'Juego local', {
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
        localBtn.on('pointerdown', () => this.scene.start('InstrucAimScene'));
        const audiob = this.sound.add('buttonEffect', { loop: false, volume: 1 });
        audiob.play();

        const CreditsButton = this.add.text(centerX + 400, 750, 'Créditos', {
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
        const audioc = this.sound.add('buttonEffect', { loop: false, volume: 1 });
        audioc.play();

        const OpcionesBotton = this.add.text(centerX + 400, 600, 'Opciones', {
            fontFamily: 'Font',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
        optionsBtn.on('pointerover', () => {
            OpcionesBotton.setScale(1.1);
            optionsBtn.setScale(1.1);
        });
        optionsBtn.on('pointerout', () => {
            OpcionesBotton.setScale(1);
            optionsBtn.setScale(1);
        })
        optionsBtn.on('pointerdown', () => this.scene.start('SettingsMoveScene'));
        const audiod = this.sound.add('buttonEffect', { loop: false, volume: 1 });
        audiod.play();

        //Sofi
        //const settingsBtn = this.add.image(960, 540, 'settingsBtn').setOrigin(0.5).setInteractive({ useHandCursor: true });
        //settingsBtn.on('pointerdown', () => {
        //    this.scene.pause();
        //    this.scene.launch('SettingsScene');
        //});
    }

}
