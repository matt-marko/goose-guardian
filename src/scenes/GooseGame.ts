import { Cameras, GameObjects, Input, Physics, Scene } from 'phaser';
import { Goose } from '../sprites/Goose';
import { Tomato } from '../sprites/Tomato';
import { Bullet } from '../sprites/Bullet';
import { Attack } from '../sprites/Attack';
import { LifeContainer } from '../LifeContainer';
import { KeyboardManager } from '../KeyboardManager';
import { Manager } from './Manager';
import { Background } from './Background';
import { PIXEL_FONT, PIXEL_FONT_SIZE } from '../Fonts';
import { Carrot } from '../sprites/Carrot';
import { Vegetable } from '../sprites/Vegetable';

export class GooseGame extends Scene {
    camera: Cameras.Scene2D.Camera;
    background: GameObjects.Image;

    score: number;
    scoreText: GameObjects.BitmapText;

    lives: number;
    lifeContainer: LifeContainer;

    goose: Goose;

    tomatoGroup: Physics.Arcade.Group;
    carrotGroup: Physics.Arcade.Group;

    pointer: Input.Pointer;

    keyboardManager: KeyboardManager;

    constructor() {
        super({ key: Manager.scenes.gooseGame });
    }

    create() {
        this.setupBackground();

        this.score = 0;
        this.lives = 3;

        this.goose = new Goose(
            this,
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2
        )

        this.tomatoGroup = this.physics.add.group({
            classType: Tomato,
            maxSize: 5,
            runChildUpdate: true,
        });

        this.carrotGroup = this.physics.add.group({
            classType: Carrot,
            maxSize: 5,
            runChildUpdate: true,
        });

        this.lifeContainer = new LifeContainer(this,
            Goose.SPRITE_KEY, 
            this.lives,
            this.physics.world.bounds.width - 40,
            40
        );
        this.lifeContainer.setScale(0.5);
        
        this.setupColliders();
        
        this.keyboardManager = new KeyboardManager(this);

        this.input.on('pointerdown', () => this.handleClick());

        this.pointer = this.input.activePointer;
        
        this.scoreText = this.add.bitmapText(
            15,
            10,
            PIXEL_FONT,
            String(this.score),
            PIXEL_FONT_SIZE
        );
    
        this.time.addEvent({
            delay: 1000,
            callback: () => this.spawnVegetable(),
            callbackScope: this,
            loop: true,
        });
    }

    override update(time: number, delta: number) {
        this.goose.update(time, delta);
    }

    setupBackground(): void {
        this.camera = this.cameras.main;

        const screenCenterX = this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.height / 2;

        this.background = this.add.image(screenCenterX, screenCenterY, Background.BACKGROUND_KEY);
        this.background.setScale(4);
    }

    setupColliders(): void {
        const collideVegetableWithGoose = (vegetable: Vegetable) => {
            vegetable.despawn();

            this.lives--;
            this.lifeContainer.decrementLives();

            if (this.lives === 0) {
                Manager.gameOver();
            }
        }

        const collideVegetableWithAttack = (attack: Attack, vegetable: Vegetable) => {
            if (attack.active && vegetable.active) {
                vegetable.despawn();
                this.incrementScore();
            }
        }

        this.physics.add.overlap(this.goose.attackSprite, this.tomatoGroup, (attack: unknown, tomato: unknown) => {
            collideVegetableWithAttack(attack as Attack, tomato as Tomato)
        });

        this.physics.add.overlap(this.goose.attackSprite, this.carrotGroup, (attack: unknown, carrot: unknown) => {
            collideVegetableWithAttack(attack as Attack, carrot as Carrot)
        });

        this.physics.add.overlap(this.goose, this.tomatoGroup, (_: unknown, tomato: unknown) => {
            collideVegetableWithGoose(tomato as Tomato);
        });
    
        this.physics.add.overlap(this.goose, this.carrotGroup, (_: unknown, carrot: unknown) => {
            collideVegetableWithGoose(carrot as Carrot);
        });
    }

    spawnVegetable(): void {
        const shouldSpawnTomato = Math.random() > 0.5;

        if (shouldSpawnTomato) {
            this.spawnTomato();
        } else {
            this.spawnCarrot();
        }
    }

    spawnTomato(): void {
        const tomato: Tomato = this.tomatoGroup.get();

        if (tomato) {
            tomato.spawnTowardsPoint(new Phaser.Math.Vector2(this.goose.x, this.goose.y));
        }
    }

    spawnCarrot(): void {
        const carrot: Carrot = this.carrotGroup.get();

        if (carrot) {
            carrot.spawnTowardsPoint(new Phaser.Math.Vector2(this.goose.x, this.goose.y));
        }
    }

    handleClick(): void {
        this.goose.attack();
    }

    // shootBullet(): void {
    //     const bullet: Bullet = this.bulletGroup.get();

    //     if (bullet) {
    //         bullet.shoot(this.goose.x, this.goose.y, this.goose.rotation);
    //     }
    // }

    incrementScore(): void {
        this.score++;
        this.scoreText.setText(String(this.score));
    }
}
