import { Scene } from "phaser";

export class KeyboardManager {
    private scene: Scene;

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    constructor(scene: Scene) {
        this.scene = scene;

        this.keyW = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    get direction(): Phaser.Math.Vector2 {
        const dir = new Phaser.Math.Vector2(0, 0);

        if (this.keyW.isDown) dir.y--;
        if (this.keyS.isDown) dir.y++;
        if (this.keyA.isDown) dir.x--;
        if (this.keyD.isDown) dir.x++;

        return dir;
    }

    public isIdle(): boolean {
        return [this.keyW, this.keyA, this.keyS, this.keyD].every(key => !key.isDown);
    }
}