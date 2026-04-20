import { randomFloat, randomInt } from "../util/RandomUtil";

export abstract class Vegetable extends Phaser.Physics.Arcade.Sprite {

    static SPRITE_KEY = 'tomato';
    static MOVEMENT_SPEED = 250;

    bounds: Phaser.Geom.Rectangle;
    declare body: Phaser.Physics.Arcade.Body

    // spriteKey: string;
    protected speed: number;
    hasCollided = false; 

    constructor(
        scene: Phaser.Scene,
        spriteKey: string,
        speed: number,
        x?: number,
        y?: number,
    ) {
        super(scene, x ?? 0, y ?? 0, spriteKey);
        
        this.setScale(0.5);
        this.setOrigin(0.5, 0.5);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setCircle(55, this.body.halfWidth - 15, this.body.halfHeight - 15);
 
        this.speed = speed;
        this.bounds = this.scene.physics.world.bounds;
    }

    override update(): void {
        const bounds = this.bounds;

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

        this.hasCollided = false;
    }

    collideWith(other: Vegetable) {
        if (this.hasCollided || other.hasCollided) return;

        this.swapVelocities(other);

        this.handleCollision(other);
        other.handleCollision(this);

        this.hasCollided = true;
        other.hasCollided = true;
    };

    swapVelocities(other: Vegetable) {
        const v1 = this.body.velocity;
        const v2 = other.body.velocity;
        
        const clonedV1 = new Phaser.Math.Vector2(v1.x, v1.y);
        const clonedV2 = new Phaser.Math.Vector2(v2.x, v2.y);

        clonedV1.normalize();
        clonedV2.normalize();

        this.setVelocity(clonedV2.x * this.speed, clonedV2.y * this.speed);
        other.setVelocity(clonedV1.x * other.speed, clonedV1.y * other.speed); 
    }

    handleCollision(_: Vegetable): void {}

    spawnRight() {
        const spawnPoint = new Phaser.Math.Vector2(
            this.bounds.right,
            this.bounds.bottom / 2 - 20
        );
    
        // const angle = -Phaser.Math.Angle.Between(
        //     point.x,
        //     point.y,
        //     spawnPoint.x,
        //     spawnPoint.y
        // ) - Math.PI;

        this.setPosition(spawnPoint.x, spawnPoint.y);
        this.setVelocity(
            - this.speed / 2,
            0
        );

        this.enableVegetableBody();
    }

    spawnLeft() {
        const spawnPoint = new Phaser.Math.Vector2(0, this.bounds.bottom / 2);
    
        // const angle = -Phaser.Math.Angle.Between(
        //     point.x,
        //     point.y,
        //     spawnPoint.x,
        //     spawnPoint.y
        // ) - Math.PI;

        this.setPosition(spawnPoint.x, spawnPoint.y);
        this.setVelocity(
            this.speed,
            0
        );

        this.enableVegetableBody();
    }

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

        this.enableVegetableBody();
    }

    enableVegetableBody(): void {
        this.enableBody();
        this.setActive(true);
        this.setVisible(true);

        // TODO: Bounce needs to be set again
        // this.setBounce(1);
    }

    despawn(): void {
        this.setActive(false);
        this.setVisible(false);
        this.setVelocity(0, 0);
        this.disableBody();
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