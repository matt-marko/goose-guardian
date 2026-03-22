export class Bullet extends Phaser.Physics.Arcade.Sprite {
    
    static SPRITE_KEY = 'bullet';
    static SPEED = 700;

    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
    ) {
        super(scene, x ?? 0, y ?? 0, Bullet.SPRITE_KEY);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.1);
    }

    override update(): void {
        const bounds = this.scene.physics.world.bounds;

        if (
            this.active && (
                this.x < bounds.left ||
                this.x > bounds.right ||
                this.y > bounds.bottom ||
                this.y < bounds.top
            )
        ) {  
            this.despawn();
        }
    }

    despawn(): void {
        this.setActive(false);
        this.setVisible(false);
        this.setVelocity(0, 0);

        this.body!.enable = false;
    }

    shoot(x: number, y: number, rotation: number): void {
        this.setActive(true);
        this.setVisible(true);
        if(this.body) this.body.enable = true;

        this.setPosition(x, y);

        const xVelocity = Bullet.SPEED * Math.cos(rotation - Math.PI/ 2);
        const yVelocity = Bullet.SPEED * Math.sin(rotation - Math.PI/ 2);

        this.setVelocity(xVelocity, yVelocity);
    }
}