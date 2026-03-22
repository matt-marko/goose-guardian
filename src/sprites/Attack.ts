import { GooseGame } from "../scenes/GooseGame";

export class Attack extends Phaser.Physics.Arcade.Sprite {

    static SPRITE_KEY = 'attack';
    static SPEED = 100;

    scene: GooseGame;

    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
    ) {
        super(scene, x ?? 0, y ?? 0, Attack.SPRITE_KEY);

        this.scene = scene as GooseGame;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        // this.setOrigin(0.5, 1.5);

        this.setActive(false);
        this.setVisible(false);
    }

    override update(time: number, delta: number): void {
        const goose = this.scene.goose;

        // this.rotation = goose.rotation;

        this.x = goose.x + (70 * Math.cos(this.rotation));
        this.y = goose.y + (70 * Math.sin(this.rotation));


        // Actions.RotateAroundDistance(
        //     [this],
        //     { x: goose.x, y: goose.y },
        //     this.scene.goose.rotation,
        //     20
        // );

        // this.setRotation(goose.rotation)
    }

    attack(angle: number): void {
        this.setActive(true);
        this.setVisible(true);

        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.setActive(false);
                this.setVisible(false);
            },
            callbackScope: this,
            loop: false,
        })

        this.setRotation(angle);
    }
}