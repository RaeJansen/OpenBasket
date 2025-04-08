export class PauseScene extends Phaser.Scene {
    constructor() {
      super({ key: "PauseScene" });
    }
  
    create() {
      // Dark overlay
      this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000, 0.8)
        .setOrigin(0).setDepth(10);
  
      // Text
      this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 50, "Game Paused", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Jua"
      }).setOrigin(0.5).setDepth(11);

      // Text
      this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 15, "Click Anywhere to Resume", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Jua"
      }).setOrigin(0.5).setDepth(11);
  
      // Resume on click
      this.input.once("pointerdown", () => {
        this.scene.stop(); // remove PauseScene
        this.scene.resume("default"); // resume the main game scene
      });
    }
  }
  