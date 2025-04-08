import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "store");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    // loads assets we will be using in game
    this.load.image("veggie1", "veggie-1.webp");
    this.load.image("veggie2", "veggie-2.webp");
    this.load.image("veggie3", "veggie-3.webp");
    this.load.image("veggie4", "veggie-4.webp");
    this.load.image("veggie5", "veggie-5.webp");
    this.load.image("veggie6", "veggie-6.webp");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    this.registry.set("score", 0);
    let veggieConfig = [
      { texture: "veggie1", points: 10, weight: 21 },
      { texture: "veggie2", points: 10, weight: 21 },
      { texture: "veggie3", points: 10, weight: 21 },
      { texture: "veggie4", points: 15, weight: 13 },
      { texture: "veggie5", points: 30, weight: 6 },
      { texture: "veggie6", points: -20, weight: 18 },
    ];

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
