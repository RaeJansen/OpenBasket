import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Boot, Preloader, MainMenu, Game, GameOver],
};

let score = 0;
let scoreText;
let veggieConfig = [
  { texture: "veggie1", points: 10, weight: 21 },
  { texture: "veggie2", points: 10, weight: 21 },
  { texture: "veggie3", points: 10, weight: 21 },
  { texture: "veggie4", points: 15, weight: 13 },
  { texture: "veggie5", points: 30, weight: 6 },
  { texture: "veggie6", points: -20, weight: 18 },
];

export default new Phaser.Game(config);
