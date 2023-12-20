import character1 from '../assets/scribble/png/default/character_squareRed.png';
import character2 from '../assets/scribble/png/default/character_squareGreen.png';
import brick from '../assets/scribble/png/default/tile_brick.png';

export default class HelloScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private keys!: { [key: string]: Phaser.Input.Keyboard.Key };
    private char1!: Phaser.Physics.Arcade.Sprite;
    private char2!: Phaser.Physics.Arcade.Sprite;
    private speed = 400;

    constructor() {
        super('hello');
    }

    preload() {
        this.load.image('vite-phaser-logo', 'assets/images/vite-phaser.png');
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
        this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
        this.load.image('brick', brick)
        this.load.image('char1', character1);
        this.load.image('char2', character2);

    }

    create() {
        const { width, height } = this.scale;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        this.add.image(centerX, centerY, 'sky');
        this.addSprites();
        this.addGround();
        this.addKeys();

    }


    update() {
        if (this.cursors.left.isDown) {
            this.char1.setVelocityX(-this.speed)
        }
        else if (this.cursors.right.isDown) {
            this.char1.setVelocityX(this.speed)
        } else {
            this.char1.setVelocityX(0)
        }

        if (this.cursors.up.isDown && this.char1.body.touching.down) {
            this.char1.setVelocityY(-300);
        }

        if (this.keys.left.isDown) {
            this.char2.setVelocityX(-this.speed)
        }
        else if (this.keys.right.isDown) {
            this.char2.setVelocityX(this.speed)
        } else {
            this.char2.setVelocityX(0)
        }

        if (this.keys.up.isDown && this.char2.body.touching.down) {
            this.char2.setVelocityY(-300);
        }
    }

    private addKeys() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }) as { [key: string]: Phaser.Input.Keyboard.Key; };
    }

    private addSprites() {
        this.char1 = this.physics.add.sprite(600, 250, 'char1');
        this.char1.setCollideWorldBounds(true);
        this.char1.flipX = true;

        this.char2 = this.physics.add.sprite(200, 250, 'char2');
        this.char2.setCollideWorldBounds(true);
    }

    private addGround() {
        const ground = this.physics.add.staticGroup();
        for (let i = 0; i < 14; i++) {
            ground.create(32 + i * 60, 568, 'brick').setScale(1).refreshBody();
        }
        this.physics.add.collider(this.char1, ground);
        this.physics.add.collider(this.char2, ground);
    }
}