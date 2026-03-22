import { Vegetable } from "./Vegetable";

export class Tomato extends Vegetable {

    static SPRITE_KEY = 'tomato';
    static MOVEMENT_SPEED = 250;

    constructor(
        scene: Phaser.Scene, 
        x?: number,
        y?: number,
    ) {
        super(scene, Tomato.SPRITE_KEY, Tomato.MOVEMENT_SPEED, x ?? 0, y ?? 0);
        this.setScale(0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body!.setCircle(55, this.body!.halfWidth - 15, this.body!.halfHeight - 15);

        this.bounds = this.scene.physics.world.bounds;
    }
}