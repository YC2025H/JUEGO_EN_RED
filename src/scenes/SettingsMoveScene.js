import Phaser from 'phaser';

export class SettingsMoveScene extends Phaser.Scene
{
	constructor()
	{
		super('SettingsMoveScene');
	}

	preload()
	{
		this.load.image('pauseNote', 'assets/img/pause_note.png');
		this.load.image('pauseBtn', 'assets/img/pause_btn.png');
		this.load.image('menuBtn', 'assets/img/menu_btn.png');
		this.load.audio('audio', 'assets/audio/audio_prueba.mp3');
		this.load.font('Font', 'assets/fonts/CheeseBurger.otf', 'truetype');
		this.load.image('-', 'assets/img/INSTRUCTION_ASSETS/-.png');
		this.load.image('+', 'assets/img/INSTRUCTION_ASSETS/+.png');
		this.load.image('btn_move', 'assets/img/SETTINGS_ASSETS/btn_move.png');
		this.load.image('btn_sound', 'assets/img/SETTINGS_ASSETS/btn_sound.png');
	}

	getKeyName(keyCode)
	{
		const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
		for (const [name, code] of Object.entries(KeyCodes))
		{
			if (code === keyCode) return name;
		}
		return `KEY_${keyCode}`;
	}

	create()
	{
		const audio = this.sound.add('pageEffect', { loop: false, volume: 1 });
		audio.play();

		const centroX = this.scale.width / 2;
		const centroY = this.scale.height / 2;
		this.waitingBinding = null;

		const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
		const defaultControls = {
			kiko: { up: KeyCodes.W, left: KeyCodes.A, right: KeyCodes.D },
			kika: { up: KeyCodes.UP, left: KeyCodes.LEFT, right: KeyCodes.RIGHT }
		};

		const savedControls = this.registry.get('moveControls') || {};
		const controls = {
			kiko: { ...defaultControls.kiko, ...(savedControls.kiko || {}) },
			kika: { ...defaultControls.kika, ...(savedControls.kika || {}) }
		};
		this.registry.set('moveControls', controls);

		// Fondo nota y pestañas
		this.add.image(centroX, centroY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);

		const btnSound = this.add.image(centroX + 480, centroY + 20, 'btn_sound')
			.setOrigin(0.5)
			.setScale(0.7)
			.setInteractive({ useHandCursor: true });

		const btnMove = this.add.image(centroX + 480, centroY - 100, 'btn_move')
			.setOrigin(0.5)
			.setScale(0.7)
			.setInteractive({ useHandCursor: true });

		// Título
		this.add.text(centroX + 50, centroY - 260, 'CONTROLES', {
			fontFamily: 'Font',
			fontSize: '80px',
			color: '#070707'
		}).setOrigin(0.5);

		const statusText = this.add.text(centroX + 50, centroY + 230, 'Haz clic en una tecla para cambiarla', {
			fontFamily: 'Font',
			fontSize: '28px',
			color: '#070707'
		}).setOrigin(0.5);

		const createRebindRow = (player, dir, label, x, y) => {
			this.add.text(x - 110, y, label, {
				fontFamily: 'Font',
				fontSize: '32px',
				color: '#070707'
			}).setOrigin(0, 0.5);

			const keyBtn = this.add.text(x + 90, y, this.getKeyName(controls[player][dir]), {
				fontFamily: 'Font',
				fontSize: '32px',
				color: '#070707',
				backgroundColor: '#e6d5b8',
				padding: { x: 12, y: 6 }
			}).setOrigin(0.5).setInteractive({ useHandCursor: true });

			keyBtn.on('pointerdown', () => {
				if (this.waitingBinding)
				{
					this.waitingBinding.textObj.setText(
						this.getKeyName(controls[this.waitingBinding.player][this.waitingBinding.dir])
					);
				}

				keyBtn.setText('...');
				this.waitingBinding = { player, dir, textObj: keyBtn };
				statusText.setText(`Pulsa la nueva tecla para ${player.toUpperCase()} (${label})...`);
			});
		};

		// Columna Kiko
		this.add.text(centroX - 110, centroY - 150, 'KIKO', {
			fontFamily: 'Font',
			fontSize: '38px',
			color: '#070707'
		}).setOrigin(0.5);

		createRebindRow('kiko', 'up', 'Arriba', centroX - 130, centroY - 85);
		createRebindRow('kiko', 'left', 'Izq.', centroX - 130, centroY - 25);
		createRebindRow('kiko', 'right', 'Der.', centroX - 130, centroY + 35);

		// Columna Kika
		this.add.text(centroX + 230, centroY - 150, 'KIKA', {
			fontFamily: 'Font',
			fontSize: '38px',
			color: '#070707'
		}).setOrigin(0.5);

		createRebindRow('kika', 'up', 'Arriba', centroX + 210, centroY - 85);
		createRebindRow('kika', 'left', 'Izq.', centroX + 210, centroY - 25);
		createRebindRow('kika', 'right', 'Der.', centroX + 210, centroY + 35);

		// Escuchar la siguiente tecla pulsada
		this.input.keyboard.on('keydown', (event) => {
			if (!this.waitingBinding) return;

			const { player, dir, textObj } = this.waitingBinding;
			const newKeyCode = event.keyCode;

			controls[player][dir] = newKeyCode;
			this.registry.set('moveControls', controls);

			textObj.setText(this.getKeyName(newKeyCode));
			statusText.setText(`Guardado: ${player.toUpperCase()} ${dir} -> ${this.getKeyName(newKeyCode)}`);
			this.waitingBinding = null;
		});

		// Volver a SettingsScene
		btnSound.on('pointerdown', () => {
			this.scene.launch('SettingsScene');
			this.scene.bringToTop('SettingsScene');
			this.scene.stop();
		});

		// Botón atrás hacia PauseScene
		const menuBtn = this.add.image(centroX + 350, centroY + 180, 'pauseBtn')
			.setOrigin(0.5)
			.setScale(0.3)
			.setInteractive({ useHandCursor: true });

		this.add.text(centroX + 350, centroY + 180, 'ATRÁS', {
			fontFamily: 'Font',
			fontSize: '30px',
			color: '#070707'
		}).setOrigin(0.5);

		menuBtn.on('pointerdown', () => {
			this.scene.launch('PauseScene');
			this.scene.stop();
		});
	}
}