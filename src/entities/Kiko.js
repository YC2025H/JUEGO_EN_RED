export class Kiko {

    constructor(scene, id, x, y) {
        this.id = id;
        this.scene = scene;
        this.score = 0;
        this.speed = 300;

        scene.anims.create({
            key: 'idleKiko',
            frames: [
                { key: 'idleKiko1' },
                { key: 'idleKiko2' },
                { key: 'idleKiko3' },
                { key: 'idleKiko4' },
                { key: 'idleKiko5' },
                { key: 'idleKiko6' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.sprite = scene.physics.add.sprite(x, y, 'idleKiko1');

        this.sprite.setImmovable(true);
        this.sprite.body.allowGravity = false;
        this.sprite.setVelocity(0, 0);


        //this.sprite.setDisplaySize(5, 5);
        this.sprite.setScale(0.5);
        //this.sprite.setImmovable(true);
        this.sprite.setCollideWorldBounds(true);

        this.sprite.play('idleKiko');
    }
}