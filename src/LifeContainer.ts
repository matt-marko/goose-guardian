import { GameObjects } from "phaser";

export class LifeContainer extends GameObjects.Container {
    lifeImages: GameObjects.Image[];

    constructor(
        scene: Phaser.Scene,
        imageKey: string,
        lives: number,
        x?: number,
        y?: number,
    ) {
        x = x ?? 0;
        y = y ?? 0;

        super(scene, x, y);

        this.lifeImages = [];

        scene.add.existing(this);

        const imageFrame = scene.textures.getFrame(imageKey)
        const imageWidth = imageFrame.width;
  
        for (let i = 0; i < lives; i++) {
            // TODO the y might be able to be turned into 0
            const image = scene.add.image(-(i * imageWidth * 1.25), y, imageKey);
            this.lifeImages.push(image);
            this.add(image);
        }
    }

    decrementLives(): void {
        const lifeToRemove = this.lifeImages.pop();

        if (!lifeToRemove) return;

        this.remove(lifeToRemove);
        lifeToRemove.destroy();
    }
}