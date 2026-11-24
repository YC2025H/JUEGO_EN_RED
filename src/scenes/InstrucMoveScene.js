import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class InstrucMoveScene extends Phaser.Scene
{
	constructor()
	{
		super('InstrucMoveScene');
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
		this.add.image(centerX, centerY, 'credits_background').setOrigin(0.5);
		
		this.add.image(centerX, centerY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);
		this.add.image(centerX, centerY - 50, 'move').setOrigin(0.5).setScale(0.7);

		//this.add.text(centerX + 50, centerY - 260, 'PAUSA', { fontFamily: 'Font',  fontSize: '90px', color: '#070707'  }).setOrigin(0.5);
		this.add.text(centerX + 50, centerY - 260, 'CONTROLES', { fontFamily: 'Font',  fontSize: '62px', color: '#070707'  }).setOrigin(0.5);

		//Boton Aim - Move
		const next_btn = this.add.image(centerX + 390, centerY + 190, 'next_btn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });

		//HOVER
		next_btn.on('pointerover', () => {
			next_btn.setScale(0.8);
		});

		next_btn.on('pointerout', () => {
			next_btn.setScale(0.7);
		});

		next_btn.on('pointerdown', () => {
			this.scene.start('GameScene');
            this.scene.stop();
			const audio = this.sound.add('buttonEffect', { loop: false, volume: 1 });
		    audio.play();
		});
	}
}