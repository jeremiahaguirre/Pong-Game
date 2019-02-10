import "./styles/game.css";
import Game from "./partials/Game";

// create a game instance
let game = new Game("game", 512, 256);

(function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop);
  if (game.stopGame() === true) {
    game = new Game("game", 512, 256);
  }
})();
