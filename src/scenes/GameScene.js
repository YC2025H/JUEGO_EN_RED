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
        this.load.font('Font', 'assets/fonts/CheeseBurger.otf', 'truetype');
    }

    create() {

        const centroX = this.scale.width / 2;
        const centroY = this.scale.height / 2;

        this.background = this.add.image(centroX, centroY, 'background_Game').setOrigin(0.5);

        this.setUpPlayers();

        //obejtos movibles 
        this.teacupMovable = this.physics.add.image(850, 910, 'teacup').setScale(1.5);
        this.teacupMovable.body.setSize(170, 100);

        this.teacupPositioned = false;

        this.carrot = this.physics.add.image(1200, 190, 'carrot').setScale(0.15).refreshBody();
        this.pasta = this.physics.add.image(400, 200, 'pasta').setScale(0.2).refreshBody();
        this.pasta.body.setSize(880, 550);
        this.tomato = this.physics.add.image(1900, 190, 'tomato').setScale(0.15).refreshBody();
        this.meat = this.physics.add.image(1900, 190, 'tomato').setScale(0.15).refreshBody();
        this.cheese = this.physics.add.image(1900, 190, 'tomato').setScale(0.15).refreshBody();
        
        
        //recoger comida
        this.sumaComida = 0;

        this.setUpPlatforms();

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


        const centroX = this.scale.width / 2;
        const centroY = this.scale.height / 2;

        //los jugadores
        this.kika = new Kika(this, 'kika', -300, 200);

        this.kiko = new Kiko(this, 'kiko', centroX - 600, centroY);

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
    }

    setUpPlatforms() {
        let platforms = this.physics.add.staticGroup();
        // Añadir plataformas
        const centroX = this.scale.width / 2;

        const floor = platforms.create(centroX, 540, 'floor');
        floor.body.setSize(0, 100);
        floor.body.setOffset(0, 1000);

        const floor1 = platforms.create(centroX, 540, 'floor');
        floor1.body.setSize(500, 500);
        floor1.body.setOffset(456, 930);
        //plataforma con los utensilios
        const platform1 = platforms.create(1200, 460, 'platform1');
        platform1.body.setSize(430, 75);
        platform1.body.setOffset(20, 30);
        //plataforma con los platos
        const platform2 = platforms.create(500, 320, 'platform2');
        platform2.body.setSize(400, 110);
        platform2.body.setOffset(10, 23);
        //plataforma inicial
        const platform3 = platforms.create(-190, 500, 'platform3');
        platform3.body.setSize(395, 110);
        platform3.body.setOffset(5, 45);
        const cupboard = platforms.create(1950, 500, 'cupboard');
        cupboard.body.setSize(620, 287);
        cupboard.body.setOffset(10, 14);
        
        const pot = platforms.create(600, 175, 'pot');
        pot.body.setSize(295, 180);
        pot.body.setOffset(30, 20);

        const cookies = platforms.create(1400, 875, 'cookies');
        cookies.body.setSize(210, 265);
        cookies.body.setOffset(30, 20);
        const can = platforms.create(1555, 850, 'can');
        can.body.setSize(116, 280);
        can.body.setOffset(25, 20);
        const vase = platforms.create(1800, 900, 'vase');
        vase.body.setSize(225, 195);
        vase.body.setOffset(25, 20);

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
    pickUpFood()
    {
        //colision comida    
        //pasta
        this.physics.add.overlap(this.kiko.sprite, this.pasta, (j, p) => {
            p.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        this.physics.add.overlap(this.kika.sprite, this.pasta, (j, p) => {
            p.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        //tomate
        this.physics.add.overlap(this.kiko.sprite, this.tomato, (j, t) => {
            t.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        this.physics.add.overlap(this.kika.sprite, this.tomato, (j, t) => {
            t.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        //zanahoria
        this.physics.add.overlap(this.kiko.sprite, this.carrot, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        this.physics.add.overlap(this.kika.sprite, this.carrot, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        //carne
         this.physics.add.overlap(this.kiko.sprite, this.meat, (j, m) => {
            m.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        this.physics.add.overlap(this.kika.sprite, this.meat, (j, m) => {
            m.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        //queso
         this.physics.add.overlap(this.kiko.sprite, this.cheese, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });
        this.physics.add.overlap(this.kika.sprite, this.carrot, (j, c) => {
            c.destroy();// Lo destruye ya que no se vuelve a usar
            this.sumaComida++;
        });

        if(this.sumaComida == 5)
        {
            this.scene.start('CreditScene');
        }
        
    }
    teacup()//método que añade la colisión de kika con la taza
    {
        if(this.teacupPositioned)
        {
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
                players.jump();
                /*} else {
                    players.sprite.setVelocityY(-players.speedY);
                }*/
            }

        //kika solo podrá colisionar con la taza cuando esté colocada por Kiko
        if(this.teacupMovable.body.right >= 1165)
        {
            this.teacupPositioned = true;
            this.teacup();
        }

            this.pickUpFood();
            players.updateJump();
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