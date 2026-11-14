export class Kika {

    constructor(scene, id, x, y) {
        this.id = id;
        this.scene = scene;
        this.score = 0;
        this.speed = 300;

        this.sprite = scene.physics.add.sprite(x, y, 'idleKika1');

        this.sprite.setImmovable(true);
        this.sprite.body.allowGravity = false;
        this.sprite.setVelocity(0, 0);


        //this.sprite.setDisplaySize(5, 5);
        this.sprite.setScale(0.5);
        //this.sprite.setImmovable(true);
        this.sprite.setCollideWorldBounds(true);

        this.sprite.play('idleKika');
    }
    animaciones(){

        // IDLE
        this.scene.anims.create({
            key: 'idleKika',
            frames: [
                { key: 'idleKika1' },
                { key: 'idleKika2' },
                { key: 'idleKika3' },
                { key: 'idleKika4' },
                { key: 'idleKika5' },
                { key: 'idleKika6' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // RUN
        this.scene.anims.create({
            key: 'runKika',
            frames: [
                { key: 'runKika1'},
                { key: 'runKika2'},
                { key: 'runKika3'},
                { key: 'runKika4'}
            ],
            frameRate: 10,
            repeat: -1
        });
    }
    
}