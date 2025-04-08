import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

class Leaderboard extends Phaser.Scene {
    constructor() {
        super({ key: "Leaderboard" });
    }

    async create() {
     this.add.text(this.game.config.width / 2, 50, "Leaderboard", {
         fontSize: "32px",
         fill: "#fff",
         fontFamily: "Arial"
     }).setOrigin(0.5);

     try {
       const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(10));
       const querySnapshot = await getDocs(q);
       let i = 0;
       querySnapshot.forEach((doc) => {
       this.add.text(this.game.config.width / 2, 100 + i * 30, `${doc.data().name}: ${doc.data().score}`, {
           fontSize: "24px",
           fill: "#fff",
           fontFamily: "Arial"
       }).setOrigin(0.5);
       i++;
     });
     } catch (e) {
       console.error("Error fetching leaderboard: ", e);
       this.add.text(this.game.config.width / 2, 100, "Error loading leaderboard", {
           fontSize: "24px",
           fill: "#f00",
           fontFamily: "Arial"
       }).setOrigin(0.5);
   }

       const restartButton = this.add.text(
           this.game.config.width / 2,
           this.game.config.height - 50,
           "Play Again",
           { fontSize: "24px", fill: "#0f0", fontFamily: "Arial", backgroundColor: "#333" }
       ).setOrigin(0.5).setInteractive();

       restartButton.on("pointerdown", () => {
           // Reset the score and restart the main game scene
           score = 0;
           this.scene.start(
               {
                   preload: preload,
                   create: create,
                   update: update,
                 }
           );
       });
    }

}
