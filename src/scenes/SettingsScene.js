import Phaser from 'phaser';

export class SettingsScene extends Phaser.Scene
{
	constructor()
	{
		super('SettingsScene');
	}

	preload()
	{
		this.load.image('pauseNote', 'assets/img/pause_note.png');
		this.load.image('pauseBtn', 'assets/img/pause_btn.png');
		this.load.image('menuBtn', 'assets/img/menu_btn.png');
		this.load.audio('audio', 'assets/audio/audio_prueba.mp3');
	}
	create()
	{
		const centroX = this.scale.width / 2;
		const centroY = this.scale.height / 2;

		//Audio
		const MAX_MUSIC_VALUE = 10;
		const MIN_MUSIC_VALUE = 0;
		let MusicVolume = 3; //variable del volumen

		const audio = this.sound.add('audio', { loop: true, volume: 0.3 });
		//audio.play(); // comentado por el bien de mi salud


		//fondo nota
		this.add.image(centroX, centroY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);
		//titulo
		const SettingsText = this.add.text(centroX + 50, centroY - 260, 'AJUSTES', { fontSize: '90px', color: '#070707'  }).setOrigin(0.5);

		const MenuBtn = this.add.image(centroX, centroY + 120, 'menuBtn').setOrigin(0.5).setScale(0.2).setInteractive({ useHandCursor: true });;
		const MenuBtnText =  this.add.text(centroX + 50, centroY + 120, 'MENÚ', { fontSize: '60px', color: '#070707'  }).setOrigin(0.5);
		const MusicText = this.add.text(centroX + 50, centroY - 10, `${MusicVolume}`, { fontSize: '50px', color: '#070707'  }).setOrigin(0.5);
		
		//Boton de salir al menu
		MenuBtn.on('pointerdown', () =>{
			this.scene.stop();
			this.scene.resume('MenuScene');
		});
		
		//Botones de audio
		const MusicBtnUp = this.add.image(centroX + 260, centroY - 20, 'pauseBtn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });

		const MusicBtnDown = this.add.image(centroX - 200, centroY - 20, 'pauseBtn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });

		//Control de Subir y bajar el volumen
	
		MusicBtnDown.on('pointerdown', () => {
			MusicVolume = MusicVolume - 1;
			if(MusicVolume < MIN_MUSIC_VALUE)
				MusicVolume = MIN_MUSIC_VALUE;
			MusicText.setText(`${MusicVolume}`);
			audio.setVolume(MusicVolume / 10);
		});

		MusicBtnUp.on('pointerdown', () => {
			MusicVolume = MusicVolume + 1;
			if(MusicVolume > MAX_MUSIC_VALUE)
				MusicVolume = MAX_MUSIC_VALUE;
			MusicText.setText(`${MusicVolume}`);
			audio.setVolume(MusicVolume / 10);
		});

		//Boton salir
		MenuBtn.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('MenuScene');
		})
	}
}