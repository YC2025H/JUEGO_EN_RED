export class Kika {

    constructor(scene, id, x, y) {
        this.id = id;
        this.scene = scene;
        this.score = 0;
        this.speed = 300;
        this.speedY = 300;


        // JUMP
        this.jumping = false;
        this.noGround = false;
        this.landing = false;
        this.animations();


        this.sprite = scene.physics.add.sprite(x, y, 'idleKika1');

        this.sprite.setImmovable(true);
        this.sprite.body.allowGravity = true;
        //this.sprite.setVelocity(0, this.speedY);
        this.sprite.setVelocity(0, 0);

        //this.sprite.setDisplaySize(5, 5);
        this.sprite.setScale(0.3);
        //this.sprite.setImmovable(true);
        this.sprite.setCollideWorldBounds(true);

        this.sprite.play('idleKika');

        // FLY JUMP after INIT JUMP
        this.sprite.on('animationcomplete-initJumpKika', () => {
            if (this.jumping && this.noGround) {
                this.sprite.play('flyJumpKika');
            }
        });
        // GROUND JUMP after FLY JUMP
        this.sprite.on('animationcomplete-groundJumpKika', () => {
            this.landing = false;
            this.sprite.play('idleKika');
        });
    }
    animations() {

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
                { key: 'runKika1' },
                { key: 'runKika2' },
                { key: 'runKika3' },
                { key: 'runKika4' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // JUMP
        // INIT JUMP
        this.scene.anims.create({
            key: 'initJumpKika',
            frames: [
                { key: 'initJumpKika1' },
                { key: 'initJumpKika2' },
                { key: 'initJumpKika3' },
                { key: 'initJumpKika4' }
            ],
            frameRate: 15,
            repeat: 0
        });

        // JUMP
        // FLY JUMP
        this.scene.anims.create({
            key: 'flyJumpKika',
            frames: [
                { key: 'flyJumpKika1' },
                { key: 'flyJumpKika2' },
                { key: 'flyJumpKika3' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // JUMP
        // GROUND JUMP
        this.scene.anims.create({
            key: 'groundJumpKika',
            frames: [
                { key: 'groundJumpKika1' },
                { key: 'groundJumpKika2' },
                { key: 'groundJumpKika3' }
            ],
            frameRate: 15,
            repeat: 0
        });
    }

    run() {
        this.sprite.play('runKika', true);
    }

    idle() {
        this.sprite.play('idleKika', true);
    }

    jump() {
        this.jumping = true;
        this.noGround = false;

        this.sprite.setVelocityY(-this.speedY);
        this.sprite.play('initJumpKika');
    }

    updateJump() {
        if (!this.jumping) {
            return;
        }

        if (!this.sprite.body.onFloor()) {
            this.noGround = true;
        }

        if (this.noGround && this.sprite.body.onFloor()) {

            this.jumping = false;
            this.noGround = false;
            this.landing = true;

            this.sprite.play('groundJumpKika');
        }
    }
}