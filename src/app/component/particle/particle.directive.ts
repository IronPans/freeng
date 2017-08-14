import {AfterViewInit, Directive, ElementRef, HostListener,
  Input, NgModule, OnInit, Renderer2} from '@angular/core';
import {Particle} from './partical';
import {DomRenderer} from '../common/dom';

@Directive({
  selector: '[fParticle]',
  providers: [DomRenderer]
})

export class ParticleDirective implements OnInit, AfterViewInit {

  @Input() size = 8;
  @Input() distance = 100;
  @Input() color: string[] | string;
  @Input() total = 100;
  @Input() backgroundColor = 'linear-gradient(to bottom,#115d8e 0, #347eff 100%)';
  container: HTMLCanvasElement;
  particles: Particle[];
  ctx: any;
  width: any;
  height: any;
  defaultColor = 'rgba(255,255,255,.2)';
  isRunning: boolean;
  canvas: HTMLCanvasElement;
  @HostListener('window:resize') onResize() {
    this.reset();
  };
  constructor(public er: ElementRef,
      public domRenderer: DomRenderer,
      public renderer2: Renderer2) {
  }

  ngOnInit() {
    this.container = this.renderer2.createElement('canvas');
    this.ctx = this.container.getContext('2d');
    this.ctx.globalAlpha = .5;
  }

  ngAfterViewInit() {
    this.canvas = this.er.nativeElement;
    this.reset();
    this.renderer2.appendChild(this.canvas, this.container);
    const overlay = this.renderer2.createElement('div');
    this.domRenderer.css(overlay, {
      'position': 'absolute',
      'left': '0',
      'top': 0,
      'width': '100%',
      'height': '100%'
    });
    this.renderer2.appendChild(this.canvas, overlay);
    this.addParticle();
    this.drawParticle();
  }

  drawBackground() {
    this.ctx.save();
    const [width, height] = [this.container.width, this.container.height];
    const linearGradient = this.ctx.createLinearGradient(0, 0, width, height);
    linearGradient.addColorStop(0, '#115d8e');
    linearGradient.addColorStop(1, '#347eff');
    this.ctx.fillStyle = linearGradient;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.restore();
  }

  addParticle() {
    this.particles = [];
    for (let i = 0; i < this.total; i++) {
      const data = this.setParticleData();
      const vx = parseFloat((this.getRandom(-5, 5) / 20).toFixed(2));
      const vy = parseFloat((this.getRandom(-5, 5) / 20).toFixed(2));
      const arr = [data.x, data.y, data.r, vx, vy, this.selectColor()];
      const particle = new Particle(...arr);
      this.particles.push(particle);
    }
  }

  reset() {
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    const {w, h} = {w: this.width, h: this.height};
    this.container.width = w;
    this.container.height = h;
    this.addParticle();
  }

  selectColor() {
    if (Array.isArray(this.color)) {
      return this.color[Math.floor(Math.random() * this.color.length)];
    }
    return this.defaultColor;
  }

  setParticleData(): any {
    return {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height),
      r: Math.floor(this.size / 2)
    };
  }

  getRandom(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  drawParticle() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground();
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.fillStyle = p['color'];
      if (this.isRunning) {
        this.checkInView(p);
        p['x'] += p['vx'];
        p['y'] += p['vy'];
      }
      this.ctx.arc(p['x'], p['y'], p['r'], 0, 2 * Math.PI, true);
      this.ctx.closePath();
      this.ctx.fill();

      for (const p2 of this.particles) {
        const x = p['x'] - p2['x'];
        const y = p['y'] - p2['y'];
        const dist = Math.sqrt(x * x + y * y);
        if (p2 !== p && dist < this.distance) {
          this.drawLine(p, p2);
        }
      }
    }
    this.isRunning = true;
    if (window.requestAnimationFrame) {
      requestAnimationFrame(() => {
        this.drawParticle();
      });
    }
  }

  drawLine(p1: Particle, p2: Particle) {
    this.ctx.strokeStyle = this.lineColor(p1, p2);
    this.ctx.beginPath();
    this.ctx.moveTo(p1['x'], p1['y']);
    this.ctx.lineTo(p2['x'], p2['y']);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  lineColor(p1, p2) {
    const linear = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    linear.addColorStop(0, p1.color);
    linear.addColorStop(1, p2.color);
    return linear;
  }

  checkInView(p: Particle) {
    if (p['x'] <= 0 || p['x'] >= this.width) {
      p['vx'] = -p['vx'];
    }
    if (p['y'] <= 0 || p['y'] >= this.height) {
      p['vy'] = -p['vy'];
    }
  }
}

@NgModule({
  declarations: [ParticleDirective],
  exports: [ParticleDirective]
})

export class ParticleModule {}
