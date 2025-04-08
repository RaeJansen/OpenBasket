import { Scene } from "phaser";

// Constants
const VEGGIE_CONFIG = [
  { texture: "veggie1", points: 10, weight: 21 },
  { texture: "veggie2", points: 10, weight: 21 },
  { texture: "veggie3", points: 10, weight: 21 },
  { texture: "veggie4", points: 15, weight: 13 },
  { texture: "veggie5", points: 30, weight: 6 },
  { texture: "veggie6", points: -20, weight: 18 },
];

export class Game extends Scene {
  constructor() {
    super("Game");
    this.score = 0;
    this.scoreText = null;
    this.timerDisplay = null;
    this.veggies = null;
  }

  preload() {
    this.load.image("store", "./assets/img/store.png");
    this.load.image("veggie1", "./assets/img/veggie-1.webp");
    this.load.image("veggie2", "./assets/img/veggie-2.webp");
    this.load.image("veggie3", "./assets/img/veggie-3.webp");
    this.load.image("veggie4", "./assets/img/veggie-4.webp");
    this.load.image("veggie5", "./assets/img/veggie-5.webp");
    this.load.image("veggie6", "./assets/img/veggie-6.webp");
  }

  create() {
    this.setupBackground();
    this.setupUI();
    this.setupVeggies();
    this.setupTimers();
  }

  setupBackground() {
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "store")
      .setDisplaySize(this.game.config.width, this.game.config.height);
  }

  setupUI() {
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#e73f12",
      fontFamily: "Arial",
    });

    this.timerDisplay = this.add.text(16, 300, "Time: 2:00", {
      fontSize: "32px",
      fill: "#e73f12",
      fontFamily: "Arial",
    });
  }

  setupVeggies() {
    this.veggies = this.physics.add.group();
    for (let i = 0; i < Phaser.Math.Between(1, 4); i++) {
      this.createRandomVeggie();
    }
  }

  setupTimers() {
    this.veggieSpawnTimer();
    this.time.addEvent({
      delay: 1000,
      callback: () =>
        this.scene.start("GameOver", { score: this.currentScore }),
    });
  }

  pickWeightedVeggie() {
    let random = Phaser.Math.Between(0, 100);
    for (const veggie of VEGGIE_CONFIG) {
      if (random <= veggie.weight) return veggie;
      random -= veggie.weight;
    }
    return VEGGIE_CONFIG[0];
  }

  createRandomVeggie() {
    const MAX_ATTEMPTS = 50;
    const PADDING = 30;
    let attempts = 0;
    let veggie;
    let validPosition = false;
    const selectedVeggie = this.pickWeightedVeggie();

    while (!validPosition && attempts < MAX_ATTEMPTS) {
      attempts++;
      const x = Phaser.Math.Between(50, this.game.config.width - 50);
      const y = Phaser.Math.Between(50, this.game.config.height - 50);

      validPosition = true;
      this.veggies.getChildren().forEach((existingVeggie) => {
        const distance = Phaser.Math.Distance.Between(
          x,
          y,
          existingVeggie.x,
          existingVeggie.y
        );
        if (distance < PADDING) validPosition = false;
      });

      if (validPosition) {
        veggie = this.createVeggie(x, y, selectedVeggie);
      }
    }

    if (!validPosition) {
      console.warn(`Failed to find position after ${MAX_ATTEMPTS} attempts`);
      return null;
    }
    return veggie;
  }

  createVeggie(x, y, veggieData) {
    const veggie = this.veggies.create(x, y, veggieData.texture);
    veggie.setInteractive();
    veggie.setData("points", veggieData.points);

    veggie.on("pointerdown", () => {
      this.score += veggie.getData("points");
      this.scoreText.setText(`Score: ${this.score}`);
      this.animateVeggieClick(veggie);
    });

    this.time.delayedCall(Phaser.Math.Between(1000, 1500), () => {
      if (veggie?.active) {
        this.animateVeggieClick(veggie);
      }
    });

    return veggie;
  }

  animateVeggieClick(veggie) {
    this.tweens.add({
      targets: veggie,
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0,
      duration: 100,
      onComplete: () => veggie.destroy(),
    });
  }

  veggieSpawnTimer() {
    const spawnNext = () => {
      const veggieCount = Phaser.Math.Between(1, 2);
      for (let i = 0; i < veggieCount; i++) {
        this.createRandomVeggie();
      }
      this.time.delayedCall(Phaser.Math.Between(500, 700), spawnNext);
    };
    spawnNext();
  }

  update() {}
}
