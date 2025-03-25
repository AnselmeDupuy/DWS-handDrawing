import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BottomBtnComponent } from '../bottom-btn/bottom-btn.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopBarComponent, SideBarComponent, BottomBtnComponent],
  template: `
  <app-top-bar></app-top-bar>
  <app-side-bar></app-side-bar>
  <app-bottom-btn></app-bottom-btn>
    <div class="drawing-container">
      <canvas #canvas></canvas>
      <button (click)="clearCanvas()">Effacer</button>
      <button (click)="exportToSVG()">Exporter en SVG</button>
    </div>
  `,
  styles: [
    `.drawing-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    canvas {
      border: 1px solid black;
      cursor: crosshair;
    }
    button {
      margin-top: 10px;
    }`
  ]
})
export class FreehandDrawingComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  private paths: { x: number; y: number }[][] = [];
  private currentPath: { x: number; y: number }[] = [];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = 1600;
    canvas.height = 700;
    this.initDrawing();
  }

  private initDrawing(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.addEventListener('mousedown', (event) => this.startDrawing(event));
    canvas.addEventListener('mousemove', (event) => this.draw(event));
    canvas.addEventListener('mouseup', () => this.stopDrawing());
    canvas.addEventListener('mouseleave', () => this.stopDrawing());
  }

  private startDrawing(event: MouseEvent): void {
    this.drawing = true;
    this.currentPath = [];
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
    this.currentPath.push({ x: event.offsetX, y: event.offsetY });
  }

  private draw(event: MouseEvent): void {
    if (!this.drawing) return;
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
    this.currentPath.push({ x: event.offsetX, y: event.offsetY });
  }

  private stopDrawing(): void {
    if (this.currentPath.length > 0) {
      this.paths.push([...this.currentPath]);
    }
    this.drawing = false;
  }

  clearCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.paths = [];
  }

  exportToSVG(): void {
    let svgPaths = this.paths.map(path => `<path d="M${path.map(p => `${p.x},${p.y}`).join(' L ')}" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
    const svg = `<svg width="500" height="400" xmlns="http://www.w3.org/2000/svg">${svgPaths}</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    a.click();
    URL.revokeObjectURL(url);
  }
}
