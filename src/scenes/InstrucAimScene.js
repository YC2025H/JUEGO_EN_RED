import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class InstrucAimScene extends Phaser.Scene
{
	constructor()
	{
		super('InstrucAimScene');
	}

	preload()
	{
		AssetsPreloader.preload(this);
	}
	create()
	{
		const audio = this.sound.add('buttonEffect', { loop: false, volume: 1 });
		audio.play();

		const centroX = this.scale.width / 2;
		const centroY = this.scale.height / 2;

		//fondo nota
		this.add.image(centroX, centroY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7); 
		this.add.image(centroX, centroY - 50, 'food').setOrigin(0.5).setScale(0.7); 

		//texto
		this.add.text(centroX + 50, centroY - 260, 'OBJETIVO', { fontFamily: 'Font',  fontSize: '90px', color: '#070707'  }).setOrigin(0.5);
		this.add.text(centroX + 245, centroY - 100, '¡PREPARA LA LASAÑA!', { fontFamily: 'Font',  fontSize: '45px', color: '#070707'  }).setOrigin(0.5);
		this.add.text(centroX + 160, centroY + 90 , 'INGREDIENTES:', { fontFamily: 'Font',  fontSize: '30px', color: '#070707'  }).setOrigin(0.5);

		this.add.text(centroX + 245, centroY - 10, 'Recoge todos los ingredientes y llevalos a la olla antes de que se termine el tiempo', {
		fontFamily: 'Font',
		fontSize: '27px',
		color: '#070707',
		wordWrap: { width: 320, useAdvancedWrap: true },
		align: 'center',
		lineSpacing: 4
		}).setOrigin(0.5);

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
			this.scene.launch('InstrucMoveScene');
			this.scene.bringToTop('InstrucMoveScene');
            this.scene.stop();
			const audio = this.sound.add('pageEffect', { loop: false, volume: 1 });
		    audio.play();
		});
	}
}   