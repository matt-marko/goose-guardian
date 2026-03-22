import { GameObjects, Scene } from "phaser";
import { Manager } from "./Manager";
import { PIXEL_FONT, PIXEL_FONT_SIZE } from "../Fonts";

export class GameOver extends Scene {
    gameOverText: GameObjects.BitmapText;
    gameOverSubtitle: GameObjects.BitmapText;

    constructor() {
        super({ key: Manager.scenes.gameOver });
    }

    create() {
        // Create game over text
        this.gameOverText = this.add.bitmapText(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2 - 100,
            PIXEL_FONT,
            'GAME OVER',
            PIXEL_FONT_SIZE
        );
        this.gameOverText.setOrigin(0.5);

        // Create game over subtitle
        this.gameOverSubtitle = this.add.bitmapText(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            PIXEL_FONT,
            "Press space to try again!",
            PIXEL_FONT_SIZE
        );
        this.gameOverSubtitle.setOrigin(0.5);

        this.input.keyboard!.on('keydown-SPACE', () => {
            Manager.restartGame();
        });
    }
}