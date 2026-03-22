import { GooseGame } from "../scenes/GooseGame";
import { Vegetable } from "./Vegetable";

export class Carrot extends Vegetable {

    static SPRITE_KEY = 'carrot';
    static MOVEMENT_SPEED = 350;

    declare scene: GooseGame;
    rotationSpeed: number = 50;

    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
    ) {
        super(scene, Carrot.SPRITE_KEY, Carrot.MOVEMENT_SPEED, x ?? 0, y ?? 0);

        this.setOrigin(0.5, 0.5);
    }

    override update(): void {
        super.update();

        if (this.active) {
            const goose = this.scene.goose;
            const angle = Phaser.Math.Angle.Between(
                this.x,
                this.y,
                goose.x,
                goose.y
            ) - (Math.PI / 2);

            const angleDelta = Phaser.Math.Angle.Wrap(angle - this.rotation);

            if (angleDelta > 0) {
                this.setAngularVelocity(this.rotationSpeed);
            } else {
                this.setAngularVelocity(-this.rotationSpeed);
            }

            const adjustedAngle = this.rotation - (Math.PI / 2);

            this.setVelocityX(this.speed * -Math.cos(adjustedAngle));
            this.setVelocityY(this.speed * -Math.sin(adjustedAngle));
        }
    }

    override spawnTowardsPoint(point: Phaser.Math.Vector2): void {
        super.spawnTowardsPoint(point);

        const goose = this.scene.goose;
        const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            goose.x,
            goose.y
        ) - (Math.PI / 2);

        this.rotation = angle;
    }
}