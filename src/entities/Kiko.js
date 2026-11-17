export class Kiko {

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

        this.sprite = scene.physics.add.sprite(x, y, 'idleKiko1');

        //this.sprite.setImmovable(tsrue);
        this.sprite.body.allowGravity = true;
        //this.sprite.setVelocity(0, this.speedY);
        this.sprite.setVelocity(0, 0);

        //this.sprite.setDisplaySize(5, 5);
        this.sprite.setScale(0.3);
        //this.sprite.setImmovable(true);
        this.sprite.setCollideWorldBounds(true);

        this.sprite.play('idleKiko');

        //cambiar tamaño collider
        this.sprite.body.setSize(450,500);
        this.sprite.body.setOffset(80,20);

        // FLY JUMP after INIT JUMP
        this.sprite.on('animationcomplete-initJumpKiko', () => {
            if (this.jumping && this.noGround) {
                this.sprite.play('flyJumpKiko');
            }
        });
        // GROUND JUMP after FLY JUMP
        this.sprite.on('animationcomplete-groundJumpKiko', () => {
            this.landing = false;
            this.sprite.play('idleKiko');
        });
    }
    animations() {

        this.scene.anims.create({
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

        // RUN
        this.scene.anims.create({
            key: 'runKiko',
            frames: [
                { key: 'runKiko1' },
                { key: 'runKiko2' },
                { key: 'runKiko3' },
                { key: 'runKiko4' },
                { key: 'runKiko5' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // JUMP
        // INIT JUMP
        this.scene.anims.create({
            key: 'initJumpKiko',
            frames: [
                { key: 'initJumpKiko1' },
                { key: 'initJumpKiko2' },
                { key: 'initJumpKiko3' }
            ],
            frameRate: 15,
            repeat: 0
        });

        // JUMP
        // FLY JUMP
        this.scene.anims.create({
            key: 'flyJumpKiko',
            frames: [
                { key: 'flyJumpKiko1' },
                { key: 'flyJumpKiko2' },
                { key: 'flyJumpKiko3' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // JUMP
        // GROUND JUMP
        this.scene.anims.create({
            key: 'groundJumpKiko',
            frames: [
                { key: 'groundJumpKiko1' },
                { key: 'groundJumpKiko2' }
            ],
            frameRate: 10,
            repeat: 0
        });

        // PUSH
        // INIT PUSH
        this.scene.anims.create({
            key: 'initPushKiko',
            frames: [
                { key: 'initPushKiko1' },
                { key: 'initPushKiko2' },
                { key: 'initPushKiko3' }
            ],
            frameRate: 10,
            repeat: 0
        });

        // PUSH
        // WALK PUSH
        this.scene.anims.create({
            key: 'walkPushKiko',
            frames: [
                { key: 'walkPushKiko1' },
                { key: 'walkPushKiko2' },
                { key: 'walkPushKiko3' },
                { key: 'walkPushKiko4' },
                { key: 'walkPushKiko5' },
                { key: 'walkPushKiko6' }
            ],
            frameRate: 10,
            repeat: -1
        });
    }

    run() {
        this.sprite.play('runKiko', true);
    }

    idle() {
        this.sprite.play('idleKiko', true);
    }

    jump() {
        this.jumping = true;
        this.noGround = false;

        this.sprite.setVelocityY(-this.speedY);
        this.sprite.play('initJumpKiko');
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

            this.sprite.play('groundJumpKiko');
        }
    }
}