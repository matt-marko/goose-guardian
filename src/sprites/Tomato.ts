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
    }
}