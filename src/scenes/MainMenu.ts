import { GameObjects, Scene } from "phaser";
import { Manager } from "./Manager";
import { PIXEL_FONT, PIXEL_FONT_SIZE } from "../Fonts";

export class MainMenu extends Scene {
    titleText: GameObjects.BitmapText;
    subtitleText: GameObjects.BitmapText;

    constructor() {
        super({ key: Manager.scenes.mainMenu });
    }

    create() {
        this.titleText = this.add.bitmapText(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2 - 100,
            PIXEL_FONT,
            "Goose Guardian",
            PIXEL_FONT_SIZE
        );
        this.titleText.setOrigin(0.5);

        this.subtitleText = this.add.bitmapText(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            PIXEL_FONT,
            "Press space to start!",
            PIXEL_FONT_SIZE
        );
        this.subtitleText.setOrigin(0.5);

        this.input.keyboard!.on('keydown-SPACE', () => {
            Manager.startGame();
        });
    }
}