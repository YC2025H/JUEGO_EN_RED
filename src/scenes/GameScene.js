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

        const controls = this.registry.get('moveControls');

        const audio = this.sound.add('pageEffect', { loop: false, volume: 1 });
        audio.play();

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.background = this.add.image(centerX, centerY, 'background_Game').setOrigin(0.5);

        this.setUpPlayers();
        this.timerOn();

        //obejtos movibles 
        this.teacupMovable = this.physics.add.image(850, 910, 'teacup').setScale(1.5);
        this.teacupMovable.body.setSize(170, 100);

        this.teacupPositioned = false;

        this.carrot = this.physics.add.image(1350, 190, 'carrot').setScale(0.15).refreshBody();
        this.pasta = this.physics.add.image(400, 200, 'pasta').setScale(0.2).refreshBody();
        this.pasta.body.setSize(880, 700);
        this.tomato = this.physics.add.image(2200, 50, 'tomato').setScale(0.15).refreshBody();
        this.meat = this.physics.add.image(1100, 920, 'tomato').setScale(0.15).refreshBody();
        this.cheese = this.physics.add.image(1800, 920, 'tomato').setScale(0.15).refreshBody();

        //cambiar tamaño colliders
        this.tomato.body.setSize(720, 800);
        this.tomato.body.setOffset(200, 170);

        //recoger comida
        this.sumaComida = 0;

        this.setUpPlatforms();

        this.pot_final = this.physics.add.staticImage(2130, 870, 'pot_final').setScale(0.8);
        this.pot_final.body.setSize(400, 265);
        this.pot_final.body.setOffset(120, 60);

        //Condición de victoria
        this.kikaInFinal = false;
        this.kikoInFinal = false;

        //
        //Sofi
        const menuSettingsBtn = this.add.image(1800, 80, 'menu_settings_Btn').setScale(0.1).setInteractive({ useHandCursor: true });
        menuSettingsBtn.on('pointerdown', () => {
            this.scene.pause();
            this.timerPause();
            this.scene.launch('PauseScene');
            this.scene.bringToTop('PauseScene');
        }).setScrollFactor(0);

    }

    /////////////////////////////////////////////////////////
    ////// PRUEBA TEMPORIZADOR /////////////////////////////
    /////////////////////////////////////////////////////////

    timerOn() {
        this.time = 50;
        const camera = this.cameras.main;

        this.timer = this.add.text(
            50,
            40,
            this.time, {
            fontFamily: 'Font',
            fontSize: '100px',
            color: '#000000'
        }).setScale(1).setScrollFactor(0);


        this.interval = setInterval(() => {

            this.time--;

            this.timer.setText(this.time);

            if (this.time <= 0) {
                clearInterval(this.interval);
                this.timer.setText("0");
                this.scene.start('FailScene');
            }

        }, 1000);
    }

    timerPause() {
        clearInterval(this.interval);
        this.interval = null
    }

    timerResume() {
        if (this.interval == null) {
            this.interval = setInterval(() => {

                this.time--;

                this.timer.setText(this.time);

                if (this.time <= 0) {
                    clearInterval(this.interval);
                    this.timer = null;
                    this.scene.start('MenuScene');
                }
            }, 1000);
        }
    }

    setUpPlayers() {
        //camera
        var camera = this.cameras.main;

        var x = camera.centerX;
        var y = camera.centerY;
        camera.setSize(1920, 1080);


        //límites de la cámara para que no se salga de la imágen de fondo
        const bounds = this.background.getBounds();

        camera.setBounds(
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height
        );

        //límites del canvas
        this.physics.world.setBounds(
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height
        );


        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        //los jugadores
        this.kika = new Kika(this, 'kika', -300, 200);
        //this.kika = new Kika(this, 'kika', 1000, 200);
        this.kiko = new Kiko(this, 'kiko', centerX - 600, centerY);
        //this.kiko = new Kiko(this, 'kiko', centerX + 500, centerY);

        /*
                this.ground = this.physics.add.staticImage(
                    this.scale.width / 2,
                    this.scale.height - 50,
                    'ground'
                );
        */

        //las teclas de movimiento
        
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
/*
        const controls = this.registry.get('moveControls');

        this.inputMappings = [
            { players: this.kiko, controls: controls.kiko },
            { players: this.kika, controls: controls.kika }
        ].map(mapping => ({
            players: mapping.players,
            upKey: this.input.keyboard.addKey(mapping.controls.up),
            leftKey: this.input.keyboard.addKey(mapping.controls.left),
            rightKey: this.input.keyboard.addKey(mapping.controls.right)
        }));*/
    }

    setUpPlatforms() {
        let platforms = this.physics.add.staticGroup();
        // Añadir plataformas
        const centerX = this.scale.width / 2;

        const floor = platforms.create(centerX, 540, 'floor');
        floor.body.setSize(0, 100);
        floor.body.setOffset(0, 1000);

        const floor1 = platforms.create(centerX, 540, 'floor');
        floor1.body.setSize(500, 500);
        floor1.body.setOffset(456, 930);
        //plataforma con los utensilios
        const platform1 = platforms.create(1250, 520, 'platform1').setScale(0.9);
        platform1.body.setSize(383, 63);
        platform1.body.setOffset(41, 48);
        //plataforma con los platos
        const platform2 = platforms.create(500, 320, 'platform2');
        platform2.body.setSize(400, 110);
        platform2.body.setOffset(10, 23);
        //plataforma inicial
        const platform3 = platforms.create(-190, 500, 'platform3');
        platform3.body.setSize(395, 110);
        platform3.body.setOffset(5, 45);
        const cupboard = platforms.create(2025, 300, 'cupboard').setScale(0.9);
        cupboard.body.setSize(560, 258);
        cupboard.body.setOffset(40, 27);
        //plataformaX
        const platform4 = platforms.create(1850, 600, 'platform3');
        platform4.body.setSize(395, 110);
        platform4.body.setOffset(5, 45);
        //const platform5 = platforms.create(720, 720, 'platform2');
        //platform5.body.setSize(400, 110);
        //platform5.body.setOffset(10, 20);
        //const platform6 = platforms.create(200, 550, 'platform3');
        //platform6.body.setSize(395, 110);
        //platform6.body.setOffset(5, 45);

        const pot = platforms.create(1150, 310, 'pot').setScale(0.7);
        pot.body.setSize(200, 125);
        pot.body.setOffset(80, 50);

        const cookies = platforms.create(1400, 875, 'cookies');
        cookies.body.setSize(210, 265);
        cookies.body.setOffset(30, 20);

        const can = platforms.create(1555, 945, 'can').setRotation(Math.PI / 2);
        can.body.setSize(250, 120);
        can.body.setOffset(-40, 93);
        //const vase = platforms.create(650, 165, 'vase');
        //vase.body.setSize(225, 195);
        //vase.body.setOffset(25, 20);


        //colisiones entre objetosplataformas
        this.physics.add.collider(platforms, this.teacupMovable);
        this.physics.add.collider(platforms, this.pasta);
        this.physics.add.collider(platforms, this.carrot);
        this.physics.add.collider(platforms, this.tomato);
        this.physics.add.collider(platforms, this.meat);
        this.physics.add.collider(platforms, this.cheese);
        this.physics.add.collider(this.kika.sprite, platforms);
        this.physics.add.collider(this.kiko.sprite, platforms);
        this.physics.add.collider(this.kiko.sprite, this.teacupMovable);


    }
    pickUpFood() {
        //colision comida    
        //pasta
        this.physics.add.overlap(this.kiko.sprite, this.pasta, (j, p) => {
            p.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        this.physics.add.overlap(this.kika.sprite, this.pasta, (j, p) => {
            p.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        //tomate
        this.physics.add.overlap(this.kiko.sprite, this.tomato, (j, t) => {
            t.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        this.physics.add.overlap(this.kika.sprite, this.tomato, (j, t) => {
            t.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        //zanahoria
        this.physics.add.overlap(this.kiko.sprite, this.carrot, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        this.physics.add.overlap(this.kika.sprite, this.carrot, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        //carne
        this.physics.add.overlap(this.kiko.sprite, this.meat, (j, m) => {
            m.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        this.physics.add.overlap(this.kika.sprite, this.meat, (j, m) => {
            m.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        //queso
        this.physics.add.overlap(this.kiko.sprite, this.cheese, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });
        this.physics.add.overlap(this.kika.sprite, this.carrot, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
            const audio = this.sound.add('pickEffect', { loop: false, volume: 1 });
            audio.play();
        });

        /*
        if (this.sumaComida == 5) {
            this.scene.start('CreditScene');
        }*/

    }
    teacup()//método que añade la colisión de kika con la taza
    {
        if (this.teacupPositioned) {
            this.physics.add.collider(this.kika.sprite, this.teacupMovable);
        }
    }
    update(time, delta) {

        this.inputMappings.forEach(mapping => {
            const players = mapping.players;

            if (mapping.leftKey.isDown) {
                players.sprite.setVelocityX(-players.speed);
                players.sprite.setFlipX(false);

                if (!players.jumping && !players.landing && !players.noGround) {
                    players.run();
                }
            } else if (mapping.rightKey.isDown) {
                players.sprite.setVelocityX(players.speed);
                players.sprite.setFlipX(true);

                if (!players.jumping && !players.landing && !players.noGround) {
                    players.run();
                }

            } else {
                players.sprite.setVelocityX(0);

                if (!players.jumping && !players.landing && !players.noGround) {
                    players.idle();
                }
            }

            if (Phaser.Input.Keyboard.JustDown(mapping.upKey) && players.sprite.body.onFloor()) {
                //if (players.jump) {
                const audio = this.sound.add('jumpEffect', { loop: false, volume: 0.3 });
                audio.play();

                players.jump();
                /*} else {
                    players.sprite.setVelocityY(-players.speedY);
                }*/
            }

            //kika solo podrá colisionar con la taza cuando esté colocada por Kiko
            if (this.teacupMovable.body.right >= 1165) {
                this.teacupPositioned = true;
                this.teacup();
            }

            this.pickUpFood();
            players.updateJump();

            //Condición de victoria

            if (this.sumaComida >= 5) {
                this.physics.add.overlap(this.pot_final, this.kika.sprite, () => {
                    this.kikaInFinal = true;
                });
                this.physics.add.overlap(this.pot_final, this.kiko.sprite, () => {
                    this.kikoInFinal = true;
                });
            } else {
                this.kikaInFinal = false;
                this.kikoInFinal = false;
            }
            if (this.kikaInFinal == true && this.kikoInFinal == true) {
                this.registry.set('Score', this.time);
                this.scene.start('FinalScene');

                clearInterval(this.interval);
                this.timer = null;
            }
        });

        //coger los personajes
        const kika = this.kika.sprite;
        const kiko = this.kiko.sprite;

        //camera
        const camera = this.cameras.main;

        const maxDisX = this.background.width;

        //dis max entre los jugadores 
        const disPlayers = Math.abs(kiko.x - kika.x);

        if (disPlayers > maxDisX) {
            //se frena al jugador que se este adelantando demasiado
            if (kiko.x > kika.x) {
                kiko.setVelocityX(0);
            }
            else {
                kika.setVelocityX(0);
            }
        }

        //camara en el medio de ambos
        const middleX = (kika.x + kiko.x) / 2;

        camera.centerOn(middleX, this.background.y);
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