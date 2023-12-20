import character1 from '../assets/scribble/png/default/character_squareRed.png';
import character2 from '../assets/scribble/png/default/character_squareGreen.png';
import brick from '../assets/scribble/png/default/tile_brick.png';

let cursors: { left: any; right: any; up: any; down: any; space?: Phaser.Input.Keyboard.Key; shift?: Phaser.Input.Keyboard.Key; };
let char1: Phaser.Physics.Arcade.Sprite;
let char2: Phaser.Physics.Arcade.Sprite;
const speed = 400;
export default class HelloScene extends Phaser.Scene {
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

        char1 = this.physics.add.sprite(600, 250, 'char1');
        char1.setCollideWorldBounds(true);
        char1.flipX = true;

        this.add.image(200, 250, 'char2');

        const ground = this.physics.add.staticGroup();
        for (let i = 0; i < 14; i++) {
            ground.create(32 + i * 60, 568, 'brick').setScale(1).refreshBody();
        }
        this.physics.add.collider(char1, ground);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (cursors.left.isDown) {
            char1.setVelocityX(-speed)
        }
        else if (cursors.right.isDown) {
            char1.setVelocityX(speed)
        } else {
            char1.setVelocityX(0)
        }

        if (cursors.up.isDown && char1.body.touching.down) {
            char1.setVelocityY(-300);
        }
    }
}