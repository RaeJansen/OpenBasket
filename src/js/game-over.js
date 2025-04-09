import { addToLeaderboard } from "./api.js";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  create() {
    console.log("Entered GameOver scene");

    // Add auto-return timer
    this.autoReturnTimer = this.time.delayedCall(15000, () => {
      this.returnToIndex();
    });

    // Reset timer on any input
    this.input.on("pointerdown", () => {
      if (this.autoReturnTimer) {
        this.autoReturnTimer.remove();
        this.autoReturnTimer = this.time.delayedCall(15000, () => {
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

    // Username input modal
    // const modal = document.createElement("div");
    // modal.style.position = "absolute";
    // modal.style.top = "0";
    // modal.style.left = "0";
    // modal.style.width = "100%";
    // modal.style.height = "100%";
    // modal.style.display = "flex";
    // modal.style.alignItems = "center";
    // modal.style.justifyContent = "center";
    // modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    // modal.style.zIndex = 1000;

    // modal.innerHTML = `
    //   <div style="
    //     background: white;
    //     padding: 30px;
    //     border-radius: 12px;
    //     text-align: center;
    //     font-family: sans-serif;
    //     box-shadow: 0 0 10px rgba(0,0,0,0.3);
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     gap: 20px;
    //   ">
    //     <h2>Enter Your Name</h2>
    //     <input id="usernameInput" type="text" placeholder="Your name" style="
    //       font-size: 18px;
    //       padding: 10px;
    //       width: 80%;
    //       border: 2px solid #E74011;
    //       border-radius: 8px;
    //       text-align: center;
    //     ">
    //     <button id="submitScoreBtn" style="
    //       font-size: 18px;
    //       padding: 10px 20px;
    //       background-color: #E74011;
    //       color: white;
    //       border: none;
    //       border-radius: 8px;
    //       cursor: pointer;
    //     ">Submit</button>
    //   </div>
    // `;
    // document.body.appendChild(modal);

    // document.getElementById("submitScoreBtn").addEventListener("click", () => {
    //   const usernameInput = document.getElementById("usernameInput");
    //   const username = usernameInput.value.trim() || "Anonymous";

    //   // Save score
    //   console.log("Submitting score:", username, finalScore);
    //   addToLeaderboard(username, finalScore);

    //   // Remove modal
    //   if (modal && modal.parentNode) {
    //     modal.parentNode.removeChild(modal);
    //   }
    // });

    // Reusable button creator
    const createButton = (text, yOffset, onClick) => {
      const width = 220;
      const height = 60;
      const x = this.game.config.width / 2 - width / 2;
      const y = this.game.config.height / 2 + yOffset - height / 2;

      const bg = this.add.graphics();
      bg.fillStyle(0xe74011, 1);
      bg.fillRoundedRect(x, y, width, height, 20);

      const label = this.add
        .text(
          this.game.config.width / 2,
          this.game.config.height / 2 + yOffset,
          text,
          {
            fontSize: "32px",
            fill: "#fff",
            fontFamily: "Jua",
          }
        )
        .setOrigin(0.5);

      bg.setInteractive(
        new Phaser.Geom.Rectangle(x, y, width, height),
        Phaser.Geom.Rectangle.Contains
      );
      bg.on("pointerdown", onClick);
    };

    // Buttons
    createButton("Play Again", -130, () => {
      this.registry.set("score", 0);
      this.registry.set("remainingTime", 30);
      this.scene.start("default");
    });

    createButton("Back to Form", 10, () => {
      window.location.href = "index.html";
    });
  }

  returnToIndex() {
    window.location.href = "index.html";
  }
}
