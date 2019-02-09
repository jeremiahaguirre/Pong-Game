import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, upKey, downKey) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 30;
    this.score = 0;
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case upKey:
          this.up();
          break;
        case downKey:
          this.down();
          break;
      }
    });
    function throttled(delay, fn) {
      let lastCall = 0;
      return function (...args) {
        const now = (new Date).getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      }
    }
    const myHandler = ('mousemove', event => {
      while (event.screenY) {
        console.log(event.screenY);
      }
    });
    const dHandler = throttled(1000, myHandler);
    document.addEventListener("mousemove", dHandler);
  }
  up() {
    this.y = Math.max(0, this.y - this.speed);
  }
  down() {
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return { leftX, rightX, topY, bottomY };
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, "rect");

    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "y", this.y);
    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "fill", "#FFFFFF");

    svg.appendChild(rect);
  }
}

// var computer_speed = 6;

// function Player2() {
//   // Move the player 2 AI paddle up or down
//   // based on the 'y' position of the ball
//   if (paddle2_x + paddle_height/2 < ball_y){
//       paddle2_x += computer_speed;
//   } else {
//       paddle2_y -= computer_speed;
//   }
// }
