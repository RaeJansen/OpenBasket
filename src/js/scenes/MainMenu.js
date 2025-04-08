import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    // Get current screen size using Phaser's scale manager
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    // Reference size (the size you designed for)
    const refWidth = 320;
    const refHeight = 700;

    // Calculate scale factors
    const scaleX = screenWidth / refWidth;
    const scaleY = screenHeight / refHeight;

    // Use different scaling for different elements
    const uiScale = Math.min(scaleX, scaleY) * 1; // Slightly larger scaling for better visibility
    const contentScale = Math.min(scaleX, scaleY) * 1; // Even larger for main content

    // Background image (full screen)
    this.add
      .image(screenWidth / 2, screenHeight / 2, "store")
      .setDisplaySize(screenWidth, screenHeight);

    // Logo image - position at top with some margin
    const logo = this.add.image(
      screenWidth / 2,
      60 * uiScale, // Fixed margin from top
      "logo"
    );
    logo.setScale(uiScale);

    // Calculate available height between logo and start button
    const startButtonY = screenHeight - 80 * uiScale; // Position for start button

    // Instructions text - position relative to logo
    this.add
      .text(
        screenWidth / 2,
        logo.y + logo.displayHeight / 2 + 10 * uiScale,
        "Instructions",
        {
          fontFamily: "Arial Black",
          fontSize: 30,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 5 * uiScale,
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.add
      .text(
        screenWidth / 2,
        logo.y + logo.displayHeight / 2 + 80 * uiScale,
        "Click veggies to collect \n points before the timer \n runs out. But watch out for \n the spoiled veggie!",
        {
          fontFamily: "Arial Black",
          fontSize: 20,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 5 * uiScale,
          align: "center",
        }
      )
      .setOrigin(0.5);

    // Veggie points
    const veggies = [
      { image: "veggie1", points: "10 points" },
      { image: "veggie2", points: "10 points" },
      { image: "veggie3", points: "10 points" },
      { image: "veggie4", points: "-25 points" },
      { image: "veggie5", points: "50 points" },
      { image: "veggie6", points: "100 points" },
    ];

    // Calculate positions based on available height
    const firstRowY = logo.y + logo.displayHeight / 2 + 180 * uiScale;
    const spacing = 100 * contentScale; // spacing between veggies

    // First row of veggies (1, 2, 3)
    veggies.slice(0, 3).forEach((veggie, index) => {
      const veggieX = screenWidth / 2 + (index - 1) * spacing;

      // Veggie image
      this.add.image(veggieX, firstRowY, veggie.image).setScale(contentScale);

      // Points text (only create once for the group)
      if (index === 1) {
        // center veggie
        this.add
          .text(veggieX, firstRowY + 60 * contentScale, "10 points", {
            fontFamily: "Arial Black",
            fontSize: 20 * contentScale,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5 * contentScale,
            align: "center",
          })
          .setOrigin(0.5);
      }
    });

    // Second column of veggies (4, 5, 6)
    const secondColX = screenWidth / 3;
    const secondColStartY = firstRowY + 110 * contentScale;
    const rowSpacing = 75 * contentScale;

    veggies.slice(3).forEach((veggie, index) => {
      const veggieY = secondColStartY + index * rowSpacing;

      // Veggie image
      this.add.image(secondColX, veggieY, veggie.image).setScale(contentScale);

      // Points text
      this.add
        .text(secondColX + 55 * contentScale, veggieY, veggie.points, {
          fontFamily: "Arial Black",
          fontSize: 20 * contentScale,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 5 * contentScale,
          align: "left",
        })
        .setOrigin(0, 0.5);
    });

    // Start text - positioned at bottom with margin
    const text = this.add
      .text(screenWidth / 2, startButtonY, "CLICK ANYWHERE TO START!", {
        fontSize: 16 * uiScale,
        fill: "#ffffff",
        fontFamily: "Arial Black",
        stroke: "#000000",
        strokeThickness: 5 * uiScale,
      })
      .setOrigin(0.5);

    // Pulsating tween
    this.tweens.add({
      targets: text,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // Start game on click
    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
