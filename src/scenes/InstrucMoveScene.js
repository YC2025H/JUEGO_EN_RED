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
		const centroX = this.scale.width / 2;
		const centroY = this.scale.height / 2;

		//fondo nota
		this.add.image(centroX, centroY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);
		this.add.image(centroX, centroY - 50, 'move').setOrigin(0.5).setScale(0.7);

		//this.add.text(centroX + 50, centroY - 260, 'PAUSA', { fontFamily: 'Font',  fontSize: '90px', color: '#070707'  }).setOrigin(0.5);
		this.add.text(centroX + 50, centroY - 260, 'CONTROLES', { fontFamily: 'Font',  fontSize: '62px', color: '#070707'  }).setOrigin(0.5);

		//Boton Aim - Move
		const next_btn = this.add.image(centroX + 390, centroY + 190, 'next_btn')
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