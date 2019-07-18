import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.score = 0;
    this.player = player;
    this.keyState = {};

    document.addEventListener(
      "keydown",
      event => {
        this.keyState[event.key || event.which] = true;
      },
      true
    );
    document.addEventListener(
      "keyup",
      event => {
        this.keyState[event.key || event.which] = false;
      },
      true
    );

    // document.addEventListener("keydown", event => {
    //   switch (event.key) {
    //     case upKey:
    //       this.up();
    //       break;
    //     case downKey:
    //       this.down();
    //       break;
    //   }
    // });
    // if (this.x<this.boardHeight){
    //     document.addEventListener("mousemove", event => {
    //       this.y = event.clientY*.8-50;

    //     });
    //   }
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
    if (this.keyState["a"] && this.player === "player1") {
      this.up();
    }
    if (this.keyState["z"] && this.player === "player1") {
      this.down();
    }
    if (this.keyState["ArrowUp"] && this.player === "player2") {
      this.up();
    }
    if (this.keyState["ArrowDown"] && this.player === "player2") {
      this.down();
    }

    let rect = document.createElementNS(SVG_NS, "rect");

    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "y", this.y);
    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "fill", "#FFFFFF");

    svg.appendChild(rect);
  }
}
