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
			'pickEffect'
		];

		const centerX = this.scale.width / 2;
		const centerY = this.scale.height / 2;

		//Audio
		const MAX_MUSIC_VALUE = 10;
		const MIN_MUSIC_VALUE = 0;

		let MusicVolume = this.registry.get('musicVolume');
			if (MusicVolume === undefined) {
				MusicVolume = 5;
				this.registry.set('musicVolume', MusicVolume);
			} //variable del volumen
			
		let SoundVolume = this.registry.get('soundVolume');
			if (SoundVolume === undefined) {
				SoundVolume = 5;
				this.registry.set('soundVolume', SoundVolume);
			}

		this.add.image(centerX, centerY, 'credits_background').setOrigin(0.5);
		//background
		this.add.image(centerX, centerY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);
		const btn_sound = this.add.image(centerX + 480, centerY + 20, 'btn_sound').setOrigin(0.5).setScale(0.7).setInteractive({ useHandCursor: true });
		const btn_move = this.add.image(centerX + 480, centerY - 100, 'btn_move').setOrigin(0.5).setScale(0.7).setInteractive({ useHandCursor: true });

		//title
		const SettingsText = this.add.text(centerX + 50, centerY - 260, 'SONIDO', { fontFamily: 'Font', fontSize: '80px', color: '#070707'  }).setOrigin(0.5);

		// Music Text
		this.add.text(centerX + 50, centerY - 80, 'Música', { fontFamily: 'Font', fontSize: '70px', color: '#070707'  }).setOrigin(0.5);

		const MusicText = this.add.text(centerX + 50, centerY + 20, `${MusicVolume}`, { fontFamily: 'Font', fontSize: '65px', color: '#070707'  }).setOrigin(0.5);

		//Back Button
		const MenuBtn = this.add.image(centerX + 350, centerY + 180, 'pauseBtn').setOrigin(0.5).setScale(0.3).setInteractive({ useHandCursor: true });
		const MenuBtnText =  this.add.text(centerX + 350, centerY + 180, 'ATRÁS', 
			{fontFamily: 'Font', fontSize: '30px', color: '#070707'  }).setOrigin(0.5);
		MenuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
		
		//Buttons Up and Down
		const MusicBtnUp = this.add.image(centerX + 120, centerY + 20, '+')
		.setOrigin(0.5).setScale(0.05)
		.setInteractive({ useHandCursor: true });

		const MusicBtnDown = this.add.image(centerX - 20, centerY + 20, '-')
		.setOrigin(0.5).setScale(0.05)
		.setInteractive({ useHandCursor: true });

		//Music Control 
		MusicBtnDown.on('pointerdown', () => {
			MusicVolume = MusicVolume - 1;
			if (MusicVolume < MIN_MUSIC_VALUE)
				MusicVolume = MIN_MUSIC_VALUE;
			this.registry.set('musicVolume', MusicVolume);
			MusicText.setText(`${MusicVolume}`);
			if (this.audio) {
				this.audio.setVolume(MusicVolume / 10);
			}
		});

		MusicBtnUp.on('pointerdown', () => {
			MusicVolume = MusicVolume + 1;
			if (MusicVolume > MAX_MUSIC_VALUE)
				MusicVolume = MAX_MUSIC_VALUE;
			this.registry.set('musicVolume', MusicVolume);
			MusicText.setText(`${MusicVolume}`);
			if (this.audio) {
				this.audio.setVolume(MusicVolume / 10);
			}
		});
		btn_move.on('pointerdown', () => this.scene.start('SettingsMoveScene'));
	}
}
	