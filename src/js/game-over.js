import { addToLeaderboard } from "./api";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  create() {
    console.log("Entered GameOver scene");

    // Add semi-transparent background
    this.add
      .image(window.innerWidth / 2, window.innerHeight / 2, "store")
      .setDisplaySize(window.innerWidth, window.innerHeight);
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.8);
    graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

    // Game Over text
    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 - 300,
        "Game Over",
        {
          fontSize: "64px",
          fill: "#fff",
          fontFamily: "Jua",
        }
      )
      .setOrigin(0.5);

    // Score display
    const finalScore = this.registry.get("score") || 0;
    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 - 200,
        `Your Score: ${finalScore}`,
        {
          fontSize: "32px",
          fill: "#fff",
          fontFamily: "Jua",
        }
      )
      .setOrigin(0.5);

      // Create username input element
      const modal = document.createElement("div");
        modal.style.position = "absolute";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        modal.style.zIndex = 1000;

        // Inner content box
        modal.innerHTML = `
          <div style="
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            font-family: sans-serif;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          ">
            <h2>Enter Your Name</h2>
            <input id="usernameInput" type="text" placeholder="Your name" style="
              font-size: 18px;
              padding: 10px;
              width: 80%;
              border: 2px solid #E74011;
              border-radius: 8px;
              text-align: center;
            " />
            <button id="submitScoreBtn" style="
              font-size: 18px;
              padding: 10px 20px;
              background-color: #E74011;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
            ">Submit</button>
          </div>
        `;

        document.body.appendChild(modal);

        document.body.appendChild(usernameInput);

        document.getElementById("submitScoreBtn").addEventListener("click", () => {
          const usernameInput = document.getElementById("usernameInput");
          const username = usernameInput.value.trim() || "Anonymous";
        
          // Store or use the username
          addToLeaderboard(username, finalScore);
        
          // Remove modal
          if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        });

    const buttonWidth = 220;
    const buttonHeight = 60;
    const buttonX = this.game.config.width / 2 - buttonWidth / 2;
    const buttonY = this.game.config.height / 2 - 130 - buttonHeight / 2;

    // Rounded rectangle background
    const buttonBg = this.add.graphics();
    buttonBg.fillStyle(0xe74011, 1);
    buttonBg.fillRoundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 20);

    // Text on top
    const playAgainText = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 - 130,
        "Play Again",
        {
          fontSize: "32px",
          fill: "#fff",
          fontFamily: "Jua",
        }
      )
      .setOrigin(0.5);

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
