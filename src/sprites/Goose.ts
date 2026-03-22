import { Input, Physics } from "phaser";
import { KeyboardManager } from "../KeyboardManager";
import { Attack } from "./Attack";

export class Goose extends Physics.Arcade.Sprite {

    static SPRITE_KEY = 'goose';
    static ATTACK_SPRITE_KEY = 'goose-attack';

    static ROTATION_SPEED = 5;
    static MOVEMENT_SPEED = 250;
    static SLOWED_SPEED = 150;
    static SCALE = 0.5; // TODO Perhaps the exporting can be different now with pixel art rendering

    keyboardManager: KeyboardManager;
    pointer: Input.Pointer;

    attackSprite: Attack;
    canAttack: boolean;

    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Goose.SPRITE_KEY);

        this.keyboardManager = new KeyboardManager(scene);
        this.pointer = scene.input.activePointer;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(Goose.SCALE);
        this.setCollideWorldBounds(true);

        this.attackSprite = new Attack(this.scene)
        this.canAttack = true;
        this.speed = Goose.MOVEMENT_SPEED;
    }

    override update(time: number, delta: number): void {
        this.attackSprite.update(time, delta);

        const direction = this.keyboardManager.direction;

        if (!this.keyboardManager.isIdle()) {
            const angle = Phaser.Math.Angle.Between(direction.x, direction.y, 0, 0) - Math.PI / 2
            this.moveInDirection(angle)
        } else {
            this.stopMovement();
        }

        this.faceInDirectionOfPointer();
    }

    faceInDirectionOfPointer(): void {
        if (this.pointer.x > this.x) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }

    }

    moveInDirection(angle: number): void {
        const newXVelocity = this.speed * Math.cos(angle - Math.PI/ 2);
        const newYVelocity = this.speed * Math.sin(angle - Math.PI/ 2);

        this.setVelocity(newXVelocity, newYVelocity);
    }

    stopMovement() {
        this.setVelocity(0, 0);
    }

    attack() {
        if (!this.canAttack) return;
        this.canAttack = false;

        this.scene.time.addEvent({
            delay: 500,
            callback: () => { 
                this.canAttack = true;
                this.setTexture(Goose.SPRITE_KEY);
                this.speed = Goose.MOVEMENT_SPEED;
            },
            callbackScope: this,
            loop: false,
        })

        this.setTexture(Goose.ATTACK_SPRITE_KEY);

        const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            this.pointer.x,
            this.pointer.y
        );
        this.attackSprite.attack(angle);
        this.speed = Goose.SLOWED_SPEED;
    }
}