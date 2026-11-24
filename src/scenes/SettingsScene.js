import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class SettingsScene extends Phaser.Scene
{
	constructor()
	{
		super('SettingsScene');
	}

	preload()
	{
		AssetsPreloader.preload(this);
	}

	create()
	{
		this.audio = this.sound.get('music');
		this.soundEffects = [
			'buttonEffect',
			'pageEffect',
			'jumpEffect',
			'coinEffect'
		];

		const centerX = this.scale.width / 2;
		const centerY = this.scale.height / 2;

		//Audio
		const MAX_MUSIC_VALUE = 10;
		const MIN_MUSIC_VALUE = 0;
		let MusicVolume = 10; //variable del volumen
		let SoundVolume = 10; //variable de efectos

		this.add.image(centerX, centerY, 'credits_background').setOrigin(0.5);
		//fondo nota
		this.add.image(centerX, centerY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);
		const btn_sound = this.add.image(centerX + 480, centerY + 20, 'btn_move').setOrigin(0.5).setScale(0.7).setInteractive({ useHandCursor: true });
		const btn_move = this.add.image(centerX + 480, centerY - 100, 'btn_sound').setOrigin(0.5).setScale(0.7).setInteractive({ useHandCursor: true });

		//titulo
		const SettingsText = this.add.text(centerX + 50, centerY - 260, 'AJUSTES', { fontFamily: 'Font', fontSize: '90px', color: '#070707'  }).setOrigin(0.5);

		// Texto Musica
		this.add.text(centerX + 50, centerY - 100, 'Música', { fontFamily: 'Font', fontSize: '40px', color: '#070707'  }).setOrigin(0.5);
		this.add.text(centerX + 50, centerY + 50, 'Efectos de sonido', { fontFamily: 'Font', fontSize: '40px', color: '#070707'  }).setOrigin(0.5);

		const MusicText = this.add.text(centerX + 50, centerY - 25, `${MusicVolume}`, { fontFamily: 'Font', fontSize: '50px', color: '#070707'  }).setOrigin(0.5);
		const SoundText = this.add.text(centerX + 50, centerY + 150, `${SoundVolume}`, { fontFamily: 'Font', fontSize: '50px', color: '#070707'  }).setOrigin(0.5);

		//Boton atras
		const MenuBtn = this.add.image(centerX + 350, centerY + 180, 'pauseBtn').setOrigin(0.5).setScale(0.3).setInteractive({ useHandCursor: true });
		const MenuBtnText =  this.add.text(centerX + 350, centerY + 180, 'ATRÁS', 
			{fontFamily: 'Font', fontSize: '30px', color: '#070707'  }).setOrigin(0.5);
		MenuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
		
		//Botones de audio
		const MusicBtnUp = this.add.image(centerX + 120, centerY - 25, '+')
		.setOrigin(0.5).setScale(0.05)
		.setInteractive({ useHandCursor: true });

		const MusicBtnDown = this.add.image(centerX - 20, centerY - 25, '-')
		.setOrigin(0.5).setScale(0.05)
		.setInteractive({ useHandCursor: true });

		//Control de Subir y bajar el volumen Musica
	
		MusicBtnDown.on('pointerdown', () => {
			MusicVolume = MusicVolume - 1;
			if(MusicVolume < MIN_MUSIC_VALUE)
				MusicVolume = MIN_MUSIC_VALUE;
			MusicText.setText(`${MusicVolume}`);
			this.audio.setVolume(MusicVolume / 10);
		});

		MusicBtnUp.on('pointerdown', () => {
			MusicVolume = MusicVolume + 1;
			if(MusicVolume > MAX_MUSIC_VALUE)
				MusicVolume = MAX_MUSIC_VALUE;
			MusicText.setText(`${MusicVolume}`);
			this.audio.setVolume(MusicVolume / 10);
		});

		//Control de Subir y bajar el volumen Efectos

		//Botones de audio
		const MusicBtnUpSound = this.add.image(centerX + 120, centerY + 150, '+')
		.setOrigin(0.5).setScale(0.05)
		.setInteractive({ useHandCursor: true });

		const MusicBtnDownSound = this.add.image(centerX - 20, centerY + 150, '-')
		.setOrigin(0.5).setScale(0.05)
		.setInteractive({ useHandCursor: true });
			
		MusicBtnDownSound.on('pointerdown', () => {
			SoundVolume = SoundVolume -1 ;
			if (SoundVolume < MIN_MUSIC_VALUE)
				SoundVolume = MIN_MUSIC_VALUE;
			SoundText.setText(`${SoundVolume}`);
			for (let i = 0; i < this.soundEffects.length; i++) {
				let sounds = this.sound.getAll(this.soundEffects[i]);
				for (let j = 0; j < sounds.length; j++) {
					sounds[j].setVolume(SoundVolume / 10);
				}
			}
		});

		MusicBtnUpSound.on('pointerdown', () => {
			SoundVolume = SoundVolume + 1;
			if (SoundVolume > MAX_MUSIC_VALUE)
				SoundVolume = MAX_MUSIC_VALUE;
			SoundText.setText(`${SoundVolume}`);
			for (let i = 0; i < this.soundEffects.length; i++) {
				let sounds = this.sound.getAll(this.soundEffects[i]);
				for (let j = 0; j < sounds.length; j++) {
					sounds[j].setVolume(SoundVolume / 10);
				}
			}
		});
				
		// Pause - Settings
		btn_move.on('pointerover', () => {
			btn_move.setScale(0.8);
		});
		btn_move.on('pointerout', () => {
			btn_move.setScale(0.7);
		});
		btn_move.on('pointerdown', () => {
            this.scene.launch('SettingsMoveScene');
			this.scene.bringToTop('SettingsMoveScene');
			const audio = this.sound.add('pageEffect', { loop: false, volume: 1 });
		    audio.play();
            this.scene.stop();
        });

		btn_sound.on('pointerover', () => {
			btn_sound.setScale(0.8);
		});
		btn_sound.on('pointerout', () => {
			btn_sound.setScale(0.7);
		});
	}
}