// Game Over Page
class GameOver extends Phaser.Scene {
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
      fontFamily: "Helvetica",
    }).setOrigin(0.5);

    // Score display
    this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 20, `Your Score: ${score}`, {
      fontSize: "32px",
      fill: "#fff",
      fontFamily: "Helvetica",
    }).setOrigin(0.5);

    // Play Again button
    const playAgainButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, "Play Again", {
      fontSize: "32px",
      fill: "#fff",
      fontFamily: "Helvetica",
      backgroundColor: "#4285f4", // Google blue
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive();

    playAgainButton.on("pointerdown", () => {
      score = 0;
      remainingTime = 120; // Reset timer for new game
      this.scene.start("default");
    });
  }
}


// Game config (global)
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [
    {
      preload: preload,
      create: create,
      update: update,
    },
    GameOver,
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
  },
};

const game = new Phaser.Game(config);

// Global variables
let score = 0;
let scoreText;
let timerDisplay;
let remainingTime = 120; // 2 minutes in seconds
let veggieConfig = [
  { texture: "veggie1", points: 10, weight: 21 },
  { texture: "veggie2", points: 10, weight: 21 },
  { texture: "veggie3", points: 10, weight: 21 },
  { texture: "veggie4", points: 15, weight: 13 },
  { texture: "veggie5", points: 30, weight: 6 },
  { texture: "veggie6", points: -20, weight: 18 },
];

// Preload assets
function preload() {
  // loads assets we will be using in game
  this.load.image("store", "./assets/img/store.png");
  this.load.image("veggie1", "./assets/img/veggie-1.webp");
  this.load.image("veggie2", "./assets/img/veggie-2.webp");
  this.load.image("veggie3", "./assets/img/veggie-3.webp");
  this.load.image("veggie4", "./assets/img/veggie-4.webp");
  this.load.image("veggie5", "./assets/img/veggie-5.webp");
  this.load.image("veggie6", "./assets/img/veggie-6.webp");
}

// Helper functions
function pickWeightedVeggie() {
  let random = Phaser.Math.Between(0, 100);
  for (const veggie of veggieConfig) {
    if (random <= veggie.weight) return veggie;
    random -= veggie.weight;
  }
  return veggieConfig[0];
}

function createRandomVeggie(scene) {
  const MAX_ATTEMPTS = 50;
  const PADDING = 30; // Minimum space between veggies
  let attempts = 0;
  let veggie;
  let validPosition = false;
  const selectedVeggie = pickWeightedVeggie();

  // Prevent infinite loops
  while (!validPosition && attempts < MAX_ATTEMPTS) {
    attempts++;

    // Generate random position
    const x = Phaser.Math.Between(50, scene.game.config.width - 50);
    const y = Phaser.Math.Between(50, scene.game.config.height - 50);

    // Check if position is valid (no overlaps)
    validPosition = true;
    scene.veggies.getChildren().forEach((existingVeggie) => {
      const distance = Phaser.Math.Distance.Between(
        x,
        y,
        existingVeggie.x,
        existingVeggie.y
      );
      if (distance < PADDING) {
        validPosition = false;
      }
    });

    // If position is good, create the veggie
    if (validPosition) {
      veggie = scene.veggies.create(x, y, selectedVeggie.texture);
      veggie.setInteractive();
      veggie.setData("points", selectedVeggie.points);

      // Click handler
      veggie.on("pointerdown", () => {
        score += veggie.getData("points");
        scoreText.setText(`Score: ${score}`);
        // tweens used to animate veggie
        scene.tweens.add({
          targets: veggie,
          scaleX: 1.5,
          scaleY: 1.5,
          alpha: 0,
          //duration = time to complete animation
          duration: 100,
          onComplete: () => veggie.destroy(),
        });
      });

      // Auto-disappear
      scene.time.delayedCall(Phaser.Math.Between(1000, 1500), () => {
        if (veggie?.active) {
          scene.tweens.add({
            targets: veggie,
            alpha: 0,
            duration: 100,
            onComplete: () => veggie.destroy(),
          });
        }
      });
    }
  }

  if (!validPosition) {
    console.warn(
      "Failed to find non-overlapping position after",
      MAX_ATTEMPTS,
      "attempts"
    );
    return null;
  }

  return veggie;
}

// Spawn veggies at random intervals
function veggieSpawnTimer(scene) {
  const spawnNext = () => {
    // Spawn 1 or 2 veggies at once
    const veggieCount = Phaser.Math.Between(1, 2);
    for (let i = 0; i < veggieCount; i++) {
      createRandomVeggie(scene);
    }

    // Schedule next batch after .5 to .7 seconds
    scene.time.delayedCall(Phaser.Math.Between(250, 350), spawnNext);
  };

   scene.time.delayedCall(500, spawnNext);
}

// Main scene functions
function create() {
  // Background
  this.add
    .image(window.innerWidth / 2, window.innerHeight / 2, "store")
    .setDisplaySize(window.innerWidth, window.innerHeight);

  // Initial Score text
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#e73f12",
    fontFamily: "Helvetica",
  });

  timerDisplay = this.add.text(16, 300, "Time: 2:00", {
    fontSize: "32px",
    fill: "#e73f12",
    fontFamily: "Helvetica",
  });

  // Veggie group
  this.veggies = this.physics.add.group();

  // Initial veggies on screen
  for (let i = 0; i < Phaser.Math.Between(1, 4); i++) {
    createRandomVeggie(this);
  }

  // Start random spawn timer
  veggieSpawnTimer(this);

// Countdown timer event
this.time.addEvent({
  delay: 1000, // Every second
  loop: true,
  callback: () => {
    remainingTime--;

    // Format time as MM:SS
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.setText(`Time: ${minutes}:${seconds.toString().padStart(2, "0")}`);

    if (remainingTime <= 0) {
      this.scene.start("GameOver");
    }
  },
});
  
}

function update() {}
