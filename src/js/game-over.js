export class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: "GameOver" });
    }
  
    create() {
      // Add semi-transparent background
      let graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 0.8); // Black, 80% transparent
      graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);
  
      // Game Over text
      this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 50, "Game Over", {
        fontSize: "64px",
        fill: "#fff",
      }).setOrigin(0.5);
  
      // Score display
      this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 20, `Your Score: ${score}`, {
        fontSize: "32px",
        fill: "#fff",
      }).setOrigin(0.5);
  
      // Play Again button
      const playAgainButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, "Play Again", {
        fontSize: "32px",
        fill: "#fff",
        backgroundColor: "#4285f4", // Google blue
        padding: { x: 20, y: 10 },
      }).setOrigin(0.5).setInteractive();
  
      playAgainButton.on("pointerdown", () => {
        score = 0; // Reset the score
        this.scene.start("default"); // Restart the main game scene
      });
    }
  }
  