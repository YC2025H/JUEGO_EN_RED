import Phaser from 'phaser';

import { Kika } from '../entities/Kika.js';
import { Kiko } from '../entities/Kiko.js';
import { AssetsPreloader } from '../preloader/AssetsPreloader.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        this.players = new Map();
        this.inputMappings = [];
    }

    preload() {
        AssetsPreloader.preload(this);
    }

    create() {
        
        const centroX = this.scale.width / 2;
        const centroY = this.scale.height / 2;

        this.background = this.add.image(centroX, centroY, 'background_Game').setOrigin(0.5);

        this.setUpPlayers();

        //
        //Sofi
        const menuSettingsBtn = this.add.image(1500, 60, 'menu_settings_Btn').setOrigin(0.5).setScale(0.1).setInteractive({ useHandCursor: true });
        menuSettingsBtn.on('pointerdown', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
            this.scene.bringToTop('PauseScene');
        });
    }

    setUpPlayers() {
        
        //camera
        var camera = this.cameras.main;

        var x = camera.centerX;
        var y = camera.centerY;

        const centroX = this.scale.width / 2;
        const centroY = this.scale.height / 2;
        this.kika = new Kika(this, 'kika', centroX - 500, centroY);

        this.kiko = new Kiko(this, 'kiko', centroX - 200, centroY);

        this.ground = this.physics.add.staticImage(
            this.scale.width / 2,
            this.scale.height - 50,
            'ground'
        );

        const Keys = Phaser.Input.Keyboard.KeyCodes;
        this.inputMappings = [
            { players: this.kiko, up: Keys.W, left: Keys.A, right: Keys.D },
            { players: this.kika, up: Keys.UP, left: Keys.LEFT, right: Keys.RIGHT }
        ].map(mapping => ({
            players: mapping.players,
            upKey: this.input.keyboard.addKey(mapping.up),
            leftKey: this.input.keyboard.addKey(mapping.left),
            rightKey: this.input.keyboard.addKey(mapping.right),
        }));
    }

    update(time, delta) {

        this.inputMappings.forEach(mapping => {
            const players = mapping.players;

            if (mapping.leftKey.isDown) {
                players.sprite.setVelocityX(-players.speed);
            } else if (mapping.rightKey.isDown) {
                players.sprite.setVelocityX(players.speed);
            } else {
                players.sprite.setVelocityX(0);
            }
            if (mapping.upKey.isDown && players.sprite.body.onFloor()) {
                players.sprite.setVelocityY(-players.speedY);
            }
        });

        //coger los personajes
        const kika = this.kika.sprite;
        const kiko = this.kiko.sprite; 

        //camera
        const camera = this.cameras.main;

        const maxDisX = 1920;

        //dis max entre los jugadores 
        const disPlayers = Math.abs(kiko.x - kika.x);

        if(disPlayers > maxDisX)
        {
            //se frena al jugador que se este adelantando demasiado
            if(kiko.x > kika.x)
            {
                kiko.setVelocityX(0);
            }
            else
            {
                kika.setVelocityX(0);
            }
        }

        //camara en el medio de ambos
        const middleX = (kika.x + kiko.x) /2;
        camera.centerOn(middleX, this.scale.height/2);


    }


    /*
        setUpPlayers() {
            const kika = new Kika(this, 'kika', 50, 300);
            //const kiko = new Paddle(this, 'kiko', 750, 300);
    
            this.players.set(player1.id, player1);
            this.players.set(player2.id, player2);
    
            const Keys = Phaser.Input.Keyboard.KeyCodes;
            this.inputMappings = [
                {paddle: player1, up: Keys.W, down: Keys.S},
                //{paddle: player2, up: Keys.UP, down: Keys.DOWN}
            ].map(mapping => ({
                paddle: mapping.paddle,
                upKey: this.input.keyboard.addKey(mapping.up),
                downKey: this.input.keyboard.addKey(mapping.down)
            }));
        }*/

}