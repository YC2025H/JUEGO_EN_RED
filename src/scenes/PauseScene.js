import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene
{
	constructor()
	{
		super('PauseScene');
	}

	preload()
	{
		this.load.image('pauseNote', 'assets/img/pause_note.png');
		this.load.image('pauseBtn', 'assets/img/pause_btn.png');
	}
	create()
	{
		const centroX = this.scale.width / 2;
		const centroY = this.scale.height / 2;

		//fondo nota
		this.add.image(centroX, centroY - 50, 'pauseNote').setOrigin(0.5).setScale(0.7);

		this.add.text(centroX + 50, centroY - 260, 'PAUSA', { fontSize: '90px', color: '#070707'  }).setOrigin(0.5);
		
		const pauseBtn = this.add.image(centroX, centroY - 80, 'pauseBtn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });

		const pauseBtn2 = this.add.image(centroX, centroY + 20, 'pauseBtn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });

		const pauseBtn3 = this.add.image(centroX, centroY + 120, 'pauseBtn')
		.setOrigin(0.5).setScale(0.7)
		.setInteractive({ useHandCursor: true });
		
		
		pauseBtn.on('pointerover', () => {pauseBtn.setScale(0.8)});
		pauseBtn.on('pointerout', () => {pauseBtn.setScale(0.7)});
		pauseBtn.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('MenuScene');
        });
		
		
		//const reanudarBtn = this.add.rectangle(100, 100, 800, 600, 0x31dbd5);
	}

}

