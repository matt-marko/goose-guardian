import { Game, Types } from "phaser";
import { GooseGame } from './scenes/GooseGame';
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Background } from "./scenes/Background";
import { Manager } from "./scenes/Manager";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 1024,
    parent: 'game-container', // id of the element to mount the game onto
    // backgroundColor: '#028af8',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade:  {
            gravity: { x: 0, y: 0 },
            // debug: true,
        }
    },
    scene: [
        Manager,
        Background,
        MainMenu,
        GooseGame,
        GameOver,
    ]
};

export default new Game(config);
