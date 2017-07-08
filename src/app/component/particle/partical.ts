export class Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  constructor(...args) {
    [this.x, this.y, this.r, this.vx, this.vy, this.color] = args;
  }
}
