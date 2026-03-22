import { Cameras, GameObjects, Scene } from "phaser";
import { Manager } from "./Manager";

export class Background extends Scene {
    static BACKGROUND_KEY = 'background';

    camera: Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    
    constructor() {
        super({ key: Manager.scenes.background });
    }

    create() {
        this.setupBackground();
    }

    setupBackground(): void {
        this.camera = this.cameras.main;

        const screenCenterX = this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.height / 2;

        this.background = this.add.image(screenCenterX, screenCenterY, Background.BACKGROUND_KEY);
        this.background.setScale(4);
    }
}