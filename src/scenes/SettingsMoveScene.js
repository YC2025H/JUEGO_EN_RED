import Phaser from 'phaser';

import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class SettingsMoveScene extends Phaser.Scene
{
	constructor()
	{
		super('SettingsMoveScene');
	}

	preload()
	{
		AssetsPreloader.preload(this);
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

		const centerX = this.scale.width / 2;
		const centerY = this.scale.height / 2;
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
		this.add.image(centerX, centerY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);

		const btnSound = this.add.image(centerX + 480, centerY + 20, 'btn_sound')
			.setOrigin(0.5)
			.setScale(0.7)
			.setInteractive({ useHandCursor: true });

		const btnMove = this.add.image(centerX + 480, centerY - 100, 'btn_move')
			.setOrigin(0.5)
			.setScale(0.7)
			.setInteractive({ useHandCursor: true });

		// Título
		this.add.text(centerX + 50, centerY - 260, 'CONTROLES', {
			fontFamily: 'Font',
			fontSize: '80px',
			color: '#070707'
		}).setOrigin(0.5);

		const statusText = this.add.text(centerX + 30, centerY + 150, 'Haz clic en una tecla para cambiarla', {
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
		this.add.text(centerX - 110, centerY - 150, 'KIKO', {
			fontFamily: 'Font',
			fontSize: '38px',
			color: '#070707'
		}).setOrigin(0.5);

		createRebindRow('kiko', 'up', 'Arriba', centerX - 130, centerY - 85);
		createRebindRow('kiko', 'left', 'Izq.', centerX - 130, centerY - 25);
		createRebindRow('kiko', 'right', 'Der.', centerX - 130, centerY + 35);

		// Columna Kika
		this.add.text(centerX + 230, centerY - 150, 'KIKA', {
			fontFamily: 'Font',
			fontSize: '38px',
			color: '#070707'
		}).setOrigin(0.5);

		createRebindRow('kika', 'up', 'Arriba', centerX + 210, centerY - 85);
		createRebindRow('kika', 'left', 'Izq.', centerX + 210, centerY - 25);
		createRebindRow('kika', 'right', 'Der.', centerX + 210, centerY + 35);

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
		const menuBtn = this.add.image(centerX + 350, centerY + 180, 'pauseBtn')
			.setOrigin(0.5)
			.setScale(0.3)
			.setInteractive({ useHandCursor: true });

		this.add.text(centerX + 350, centerY + 180, 'ATRÁS', {
			fontFamily: 'Font',
			fontSize: '30px',
			color: '#070707'
		}).setOrigin(0.5);

		menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
	}
}