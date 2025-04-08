export class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: "GameOver" });
    }
  
    create() {
      console.log("Entered GameOver scene");
      // Add semi-transparent background
      let graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 0.8);
      graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);
  
      // Game Over text
      this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 300, "Game Over", {
        fontSize: "64px",
        fill: "#fff",
        fontFamily: "Jua",
      }).setOrigin(0.5);
  
      // Score display
      const finalScore = this.registry.get("score") || 0;
      this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 200, `Your Score: ${finalScore}`, {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Jua",
      }).setOrigin(0.5);
  
      const buttonWidth = 220;
      const buttonHeight = 60;
      const buttonX = this.game.config.width / 2 - buttonWidth / 2;
      const buttonY = this.game.config.height / 2 - 130 - buttonHeight / 2;
  
      // Rounded rectangle background
      const buttonBg = this.add.graphics();
      buttonBg.fillStyle(0xE74011, 1);
      buttonBg.fillRoundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 20);
  
      // Text on top
      const playAgainText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 130, "Play Again", {
        fontSize: "32px",
        fill: "#fff",
        fontFamily: "Jua",
      }).setOrigin(0.5);
  
      // Set interactive area
      buttonBg.setInteractive(
        new Phaser.Geom.Rectangle(buttonX, buttonY, buttonWidth, buttonHeight),
        Phaser.Geom.Rectangle.Contains
      );
  
      // Handle click
      buttonBg.on("pointerdown", () => {
        this.registry.set("score", 0);
        this.registry.set("remainingTime", 60);
        this.scene.start("default");
      });
    }
  }
  