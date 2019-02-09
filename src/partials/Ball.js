import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio("public/sounds/pong-01.wav");
    //set X and Y coordinates at the center
    this.reset();
  }
  // Ball.js
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    //generating a random number between -5 and 5
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    // setting a number between -5 and 5, based on the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      //detect player 2 collision
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );
      let { leftX, rightX, topY, bottomY } = paddle;
      if (
        this.x + this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY
        //is the right edge of the ball >= left of the paddle
        //AND is the ball Y >= top of the paddle AND <= the bottom of the paddle?
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
      //top detection
      if (this.y + this.radius >= topY && this.x <= rightX && this.x >= leftX) {
        this.vy = -this.vy;
      }
      //bottom detection
      if (
        this.y + this.radius <= bottomY &&
        this.x <= rightX &&
        this.x >= leftX
      ) {
        this.vy = -this.vy;
      }
    } else {
      //detect player 1 collision
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
      let { leftX, rightX, topY, bottomY } = paddle;
      if (
        this.x - this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
      //top detection
      if (this.y + this.radius >= topY && this.x <= rightX && this.x >= leftX) {
        this.vy = -this.vy;
      }
      //bottom detection
      if (
        this.y + this.radius <= bottomY &&
        this.x <= rightX &&
        this.x >= leftX
      ) {
        this.vy = -this.vy;
      }
    }
  }

  goal(player) {
    // increment the player score by one
    //reset ball in the middle
    player.score++;
    this.reset();
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);
    let circle = document.createElementNS(SVG_NS, "circle");

    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    circle.setAttributeNS(null, "fill", "#FFFFFF");

    svg.appendChild(circle);

    //detect a goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
  }
}
