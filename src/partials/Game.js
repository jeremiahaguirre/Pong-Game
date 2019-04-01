import { SVG_NS, KEYS } from "../settings";
import Board from "./Board";
import Paddles from "./Paddles";
import Ball from "./Ball";
import Score from "./Score";
import Win from "./Win";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);

    this.board = new Board(this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddles(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z
    );
    this.player2 = new Paddles(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - (this.paddleWidth + this.boardGap),
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );

    this.ballRadius = 8;
    this.ball = new Ball(this.ballRadius, this.width, this.height);

    document.addEventListener("keydown", event => {
      if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause;
      }
    });

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);
    this.win = new Win(this.width / 2 - 50, 30, 30);
  }
  stopGame() {
    if (this.player1.score === 10 || this.player2.score === 10) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    //pause game
    if (this.pause) {
      return;
    }

    // empty out game element before re-rendering
    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    svg.setAttributeNS(null, "version", "1.1");

    this.gameElement.appendChild(svg);

    // rendering all game elements inside the SVG
    this.board.render(svg);

    this.player1.render(svg);
    this.player2.render(svg);

    this.ball.render(svg, this.player1, this.player2);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
    this.stopGame(svg, this.player1.score);
  }
}
