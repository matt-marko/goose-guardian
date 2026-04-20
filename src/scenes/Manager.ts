import { Scene } from "phaser";
import { Goose } from "../sprites/Goose";
import { Bullet } from "../sprites/Bullet";
import { Tomato } from "../sprites/Tomato";
import { Attack } from "../sprites/Attack";
import { Background } from "./Background";
import { PIXEL_FONT } from "../Fonts";
import { Carrot } from "../sprites/Carrot";

class Manager extends Scene {
    scenes = {
        background: 'Background',
        mainMenu: 'MainMenu',
        gooseGame: 'GooseGame',
        gameOver: 'GameOver',
    } 

    constructor() {
        super({ key: 'Manager' })
    }

    preload() {
        this.load.image(Background.BACKGROUND_KEY, 'assets/background.png');

        this.load.image(Goose.SPRITE_KEY, 'assets/goose.png');
        this.load.image(Goose.ATTACK_SPRITE_KEY, 'assets/goose-attack.png');
        
        this.load.image(Carrot.SPRITE_KEY, 'assets/carrot.png');
        this.load.image(Tomato.SPRITE_KEY, 'assets/tomato.png');
        this.load.image(Bullet.SPRITE_KEY, 'assets/bullet.png');
        this.load.image(Attack.SPRITE_KEY, 'assets/attack.png');
        
        this.load.bitmapFont(PIXEL_FONT, 'fonts/minogram_6x10.png', 'fonts/minogram_6x10.xml');
    }

    create() {
        this.scene.launch(this.scenes.background);
        this.scene.launch(this.scenes.mainMenu);
    }

    startGame() {
        this.scene.stop(this.scenes.mainMenu);
        this.scene.launch(this.scenes.gooseGame);
    }

    restartGame() {
        this.scene.launch(this.scenes.gooseGame);
        this.scene.stop(this.scenes.gameOver);
    }

    gameOver() {
        this.scene.pause(this.scenes.gooseGame);
        this.scene.launch(this.scenes.gameOver);
    }
}

const manager = new Manager();

export { manager as Manager };