import { randomFloat, randomInt } from "../util/RandomUtil";

export abstract class Vegetable extends Phaser.Physics.Arcade.Sprite {

    static SPRITE_KEY = 'tomato';
    static MOVEMENT_SPEED = 250;

    bounds: Phaser.Geom.Rectangle;

    spriteKey: string;
    speed: number;

    constructor(
        scene: Phaser.Scene,
        spriteKey: string,
        speed: number,
        x?: number,
        y?: number,
    ) {
        super(scene, x ?? 0, y ?? 0, spriteKey);
        this.setScale(0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body!.setCircle(55, this.body!.halfWidth - 15, this.body!.halfHeight - 15);
        this.speed = speed;

        this.bounds = this.scene.physics.world.bounds;
    }

    override update(): void {
        const bounds = this.scene.physics.world.bounds

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

    // spawn(): void {
    //     const side = randomInt(0, 3);

    //     switch (side) {
    //         case 0: {
    //             this.spawnLeftS ide();
    //             break;
    //         }

    //         case 1: {
    //             this.spawnTopSide();
    //             break;
    //         }

    //         case 2: {
    //             this.spawnRightSide();
    //             break;
    //         }

    //         case 3: {
    //             this.spawnBottomSide();
    //             break;
    //         }
    //     }

    //     if(this.body) this.body.enable = true;
    //     this.setActive(true);
    //     this.setVisible(true);
    // }

    spawnTowardsPoint(point: Phaser.Math.Vector2): void {
        const sideToSpawnFrom = randomInt(0, 3);
        let spawnPoint = new Phaser.Math.Vector2(0, 0);

        switch (sideToSpawnFrom) {
            case 0: {
                spawnPoint = this.getRandomLeftSideSpawnPoint();
                break;
            }

            case 1: {
                spawnPoint = this.getRandomTopSideSpawnPoint();
                break;
            }

            case 2: {
                spawnPoint = this.getRandomRightSideSpawnPoint();
                break;
            }

            case 3: {
                spawnPoint = this.getRandomBottomSideSpawnPoint();
                break;
            }
        }

        const angle = -Phaser.Math.Angle.Between(
            point.x,
            point.y,
            spawnPoint.x,
            spawnPoint.y
        ) - Math.PI;

        this.setPosition(spawnPoint.x, spawnPoint.y);
        this.setVelocity(
            this.speed * Math.cos(angle),
            this.speed * -Math.sin(angle)
        );

        if(this.body) this.body.enable = true;
        this.setActive(true);
        this.setVisible(true);
    }

    despawn(): void {
        this.setActive(false);
        this.setVisible(false);
        this.setVelocity(0, 0);

        this.body!.enable = false;
    }

    protected getRandomLeftSideSpawnPoint(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(0, randomFloat(0, this.bounds.bottom));
    }

    protected getRandomTopSideSpawnPoint(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(randomFloat(0, this.bounds.right), 0);
    }

    protected getRandomRightSideSpawnPoint(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.bounds.right, randomFloat(0, this.bounds.bottom));
    }

    protected getRandomBottomSideSpawnPoint(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(randomFloat(0, this.bounds.right), this.bounds.bottom);
    }

    // private spawnLeftSide(): void {
    //     const spawnPositionY = randomFloat(0, this.bounds.bottom);        

    //     this.setPosition(0, spawnPositionY);
    //     this.setVelocity(Tomato.MOVEMENT_SPEED, 0);
    // }

    // private spawnRightSide(): void {
    //     const spawnPositionY = randomFloat(0, this.bounds.bottom);        

    //     this.setPosition(this.bounds.right, spawnPositionY);
    //     this.setVelocity(-Tomato.MOVEMENT_SPEED, 0);
    // }

    // private spawnTopSide(): void {
    //     const spawnPositionX = randomFloat(0, this.bounds.right);    

    //     this.setPosition(spawnPositionX, 0);
    //     this.setVelocity(0, Tomato.MOVEMENT_SPEED);
    // }

    // private spawnBottomSide(): void {
    //     const spawnPositionX = randomFloat(0, this.bounds.right);    
            
    //     this.setPosition(spawnPositionX, this.bounds.bottom);
    //     this.setVelocity(0, -Tomato.MOVEMENT_SPEED);
    // }
}