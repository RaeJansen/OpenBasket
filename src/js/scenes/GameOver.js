import { Scene } from "phaser";
export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    this.add
      .image(window.innerWidth / 2, window.innerHeight / 2, "store")
      .setDisplaySize(window.innerWidth, window.innerHeight);
    // Game Over text
    this.add
      .text(this.cameras.main.centerX, 150, "GAME OVER", {
        fontSize: "38px",
        color: "#ff5555",
        fontFamily: "Arial Black",
        stroke: "#000000",
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    // Score display
    this.add
      .text(this.cameras.main.centerX, 250, `Score: ${this.finalScore}`, {
        fontSize: "48px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Create input system
    this.setupMobileInput();
  }

  setupMobileInput() {
    // 1. Create invisible HTML input
    this.nameInput = document.createElement("input");
    this.nameInput.type = "text";
    this.nameInput.maxLength = 12;
    document.getElementById("game-container").appendChild(this.nameInput);

    // 2. Create visible Phaser prompt
    this.inputPrompt = this.add
      .text(this.cameras.main.centerX, 350, "Tap to enter name", {
        fontSize: "32px",
        color: "#ffff00",
        backgroundColor: "#333333",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    // 3. Click handler
    this.inputPrompt.on("pointerdown", () => {
      this.nameInput.focus(); // Triggers mobile keyboard
      this.nameInput.style.height = "40px"; // Make input briefly visible for debugging
      this.nameInput.style.opacity = "0.5";
      setTimeout(() => {
        this.nameInput.style.opacity = "0";
        this.nameInput.style.height = "0";
      }, 1000);
    });

    // 4. Sync input to display
    this.nameInput.addEventListener("input", () => {
      this.inputPrompt.text = this.nameInput.value || "Tap to enter name";
    });

    // 5. Submit button
    const submitButton = this.add
      .text(this.cameras.main.centerX, 450, "SUBMIT SCORE", {
        fontSize: "36px",
        color: "#ffffff",
        backgroundColor: "#4CAF50",
        padding: { x: 30, y: 15 },
      })
      .setOrigin(0.5)
      .setInteractive();

    submitButton.on("pointerdown", () => {
      this.submitScore();
    });
  }

  submitScore() {
    const playerName = this.nameInput.value.trim() || "Anonymous";

    // Remove input from DOM
    document.getElementById("game-container").removeChild(this.nameInput);

    // Save to localStorage (replace with your API call)
    const highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
    highscores.push({
      name: playerName,
      score: this.finalScore,
      date: new Date().toISOString(),
    });
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Show confirmation
    this.add
      .text(this.cameras.main.centerX, 500, "Score submitted!", {
        fontSize: "24px",
        color: "#00ff00",
      })
      .setOrigin(0.5);

    // Return to menu after delay
    this.time.delayedCall(2000, () => {
      this.scene.start("MainMenu");
    });
  }
}
