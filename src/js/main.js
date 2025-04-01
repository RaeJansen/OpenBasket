import { ClickerGame } from "./ClickerGame.js";

// renders the game canvas
const config = {
  type: Phaser.AUTO, // Use WebGL if available, otherwise Canvas
  width: window.innerWidth, // Set width to screen width
  height: window.innerHeight, // Set height to screen height
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  scale: {
    mode: Phaser.Scale.FIT, // Scale the game to fit the screen
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game on the screen
    parent: "game-container", // Optional: Attach the game to a specific HTML element
  },
};

export default new Phaser.Game(config);
