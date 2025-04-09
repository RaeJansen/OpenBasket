import { addToLeaderboard } from "./api.js";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  create() {
    console.log("Entered GameOver scene");

    // Add Time's up overlay
    const timesUpOverlay = this.add.graphics();
    timesUpOverlay.fillStyle(0xe74011, 0.7);
    timesUpOverlay.fillRect(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );

    const timesUpText = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "Time's up!",
        {
          fontSize: "64px",
          fill: "#ffffff",
          fontFamily: "Jua",
          stroke: "#000000",
          strokeThickness: 8,
        }
      )
      .setOrigin(0.5);

    // Remove overlay after 1 second
    this.time.delayedCall(1000, () => {
      timesUpOverlay.destroy();
      timesUpText.destroy();
      this.showGameOverScreen();
    });
  }

  showGameOverScreen() {
    // Add auto-return timer
<<<<<<< HEAD
    this.autoReturnTimer = this.time.delayedCall(20000, () => {
=======
    this.autoReturnTimer = this.time.delayedCall(15000, () => {
>>>>>>> parent of d3d7992 (Game over updates)
      this.returnToIndex();
    });

    // Reset timer on any input
    this.input.on("pointerdown", () => {
      if (this.autoReturnTimer) {
        this.autoReturnTimer.remove();
<<<<<<< HEAD
        this.autoReturnTimer = this.time.delayedCall(20000, () => {
=======
        this.autoReturnTimer = this.time.delayedCall(15000, () => {
>>>>>>> parent of d3d7992 (Game over updates)
          this.returnToIndex();
        });
      }
    });

    // Add semi-transparent background
    this.add
      .image(window.innerWidth / 2, window.innerHeight / 2, "store")
      .setDisplaySize(window.innerWidth, window.innerHeight);

    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.8);
    graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

    // Calculate responsive sizes
    const baseFontSize = Math.min(this.game.config.width * 0.08, 64); // 8% of screen width, max 64px
    const titleFontSize = Math.min(this.game.config.width * 0.12, 96); // 12% of screen width, max 96px
    const buttonWidth = Math.min(this.game.config.width * 0.6, 300); // 60% of screen width, max 300px
    const buttonHeight = Math.min(this.game.config.height * 0.08, 60); // 8% of screen height, max 60px

    // Game Over text
    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height * 0.3,
        "Game Over",
        {
          fontSize: `${titleFontSize}px`,
          fill: "#fff",
          fontFamily: "Jua",
        }
      )
      .setOrigin(0.5);

<<<<<<< HEAD
    // Thanks for playing text
    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height * 0.45,
        "Thanks for playing! We hope you enjoy \n the business innovation showcase!",
        {
          fontSize: `${baseFontSize * 0.7}px`,
          fill: "#ffffff",
          fontFamily: "Jua",
          align: "center",
        }
      )
      .setOrigin(0.5);

=======
>>>>>>> parent of d3d7992 (Game over updates)
    // Score display
    const finalScore = this.registry.get("score") || 0;
    this.add
      .text(
        this.game.config.width / 2,
<<<<<<< HEAD
        this.game.config.height * 0.55,
        `Your Score: ${finalScore}`,
        {
          fontSize: `${baseFontSize * 0.9}px`,
=======
        this.game.config.height / 2 - 200,
        `Your Score: ${finalScore}`,
        {
          fontSize: "32px",
>>>>>>> parent of d3d7992 (Game over updates)
          fill: "#fff",
          fontFamily: "Jua",
        }
      )
      .setOrigin(0.5);

    // Reusable button creator
    const createButton = (text, yOffset, onClick) => {
      const x = this.game.config.width / 2 - buttonWidth / 2;
      const y = this.game.config.height * 0.65 + yOffset;

      const bg = this.add.graphics();
      bg.fillStyle(0xe74011, 1);
      bg.fillRoundedRect(x, y, buttonWidth, buttonHeight, 20);

      const label = this.add
        .text(this.game.config.width / 2, y + buttonHeight / 2, text, {
          fontSize: `${baseFontSize * 0.8}px`,
          fill: "#fff",
          fontFamily: "Jua",
        })
        .setOrigin(0.5);

      bg.setInteractive(
        new Phaser.Geom.Rectangle(x, y, buttonWidth, buttonHeight),
        Phaser.Geom.Rectangle.Contains
      );
      bg.on("pointerdown", onClick);
    };

    // Buttons
<<<<<<< HEAD
    createButton("Play Again", 0, () => {
=======
    createButton("Play Again", -130, () => {
>>>>>>> parent of d3d7992 (Game over updates)
      this.registry.set("score", 0);
      this.registry.set("remainingTime", 30);
      this.scene.start("default");
    });

<<<<<<< HEAD
    createButton("Back to Form", buttonHeight * 1.5, () => {
=======
    createButton("Back to Form", 10, () => {
>>>>>>> parent of d3d7992 (Game over updates)
      window.location.href = "index.html";
    });
  }

  returnToIndex() {
    window.location.href = "index.html";
  }
}
