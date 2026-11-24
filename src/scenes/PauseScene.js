import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class PauseScene extends Phaser.Scene
{
	constructor()
	{
		super('PauseScene');
	}

	preload()
	{
		AssetsPreloader.preload(this);
	}
	create()
	{
		const centerX = this.scale.width / 2;
		const centerY = this.scale.height / 2;

		//fondo nota
		
		this.add.image(centerX, centerY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);

		this.add.text(centerX + 50, centerY - 260, 'PAUSA', { fontFamily: 'Font',  fontSize: '90px', color: '#070707'  }).setOrigin(0.5);
		
		//Botones
		const pauseBtn = this.add.image(centerX, centerY - 60, 'pauseBtn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });

		const pauseBtn2 = this.add.image(centerX, centerY + 60, 'pauseBtn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });
		
		//HOVER BUTTONS

		// Pause - Continue
		const pause_Game_Btn = this.add.text(centerX, centerY - 60, 'Reanudar', { fontFamily: 'Font', fontSize: '50px', color: '#070707'  }).setScale(0.8).setOrigin(0.5);
		pauseBtn.on('pointerover', () => {
			pauseBtn.setScale(0.8);
			pause_Game_Btn.setScale(0.9);
		});
		pauseBtn.on('pointerout', () => {
			pauseBtn.setScale(0.7);
			pause_Game_Btn.setScale(0.8);
		});
		pauseBtn.on('pointerdown', () => {
			this.scene.stop();
            this.scene.resume('GameScene');
			this.scene.get('GameScene').timerResume();
			const audio = this.sound.add('buttonEffect', { loop: false, volume: 1 });
		    audio.play();
        });

		
		
		// Pause - Settings
		/*
		const pause_Settings_Btn = this.add.text(centerX + 20, centerY + 20, 'Ajustes', { fontFamily: 'Font', fontSize: '50px', color: '#070707'  }).setScale(0.8).setOrigin(0.5);
		pauseBtn2.on('pointerover', () => {
			pauseBtn2.setScale(0.8);
			pause_Settings_Btn.setScale(0.8);
		});
		pauseBtn2.on('pointerout', () => {
			pauseBtn2.setScale(0.7);
			pause_Settings_Btn.setScale(0.7);
		});
		pauseBtn2.on('pointerdown', () => {
            this.scene.launch('SettingsScene');
			this.scene.bringToTop('SettingsScene');
            this.scene.stop();
			const audio = this.sound.add('buttonEffect', { loop: false, volume: 1 });
		    audio.play();
        });
		*/

		// Pause - Menu
		const pause_Menu_Btn = this.add.text(centerX , centerY + 60, 'Menu', { fontFamily: 'Font', fontSize: '50px', color: '#070707'  }).setScale(0.8).setOrigin(0.5);
		pauseBtn2.on('pointerover', () => {
			pauseBtn2.setScale(0.8);
			pause_Menu_Btn.setScale(0.8);
		});
		pauseBtn2.on('pointerout', () => {
			pauseBtn2.setScale(0.7);
			pause_Menu_Btn.setScale(0.7);
		});
		pauseBtn2.on('pointerdown', () => {
            this.scene.stop('PauseScene');
			this.scene.stop('GameScene');
			this.scene.launch('MenuScene');
			const audio = this.sound.add('buttonEffect', { loop: false, volume: 1 });
		    audio.play();
        });
		
		
		
		//const reanudarBtn = this.add.rectangle(100, 100, 800, 600, 0x31dbd5);
	}

}

