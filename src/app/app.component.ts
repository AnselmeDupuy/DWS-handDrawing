/*import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DWS-handWriting';
}*/

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="drawing-container">
      <canvas #canvas></canvas>
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
      cursor: none;
    }

    .drawing-container::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: black;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 2;
      left: var(--x);
      top: var(--y);
    }`
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  private erasing = false;
  private paths: { x: number; y: number }[][] = [];
  private currentPath: { x: number; y: number }[] = [];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = 1600;
    canvas.height = 700;
    this.initDrawing();

    // Boutons
    const deleteBtn = document.querySelector('#sidebar .fa-trash')?.parentElement;
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.clearCanvas());
    }

    const eraseBtn = document.querySelector('#sidebar .fa-eraser')?.parentElement;
    if (eraseBtn) {
      eraseBtn.addEventListener('click', () => this.enableEraser());
    }

    const pencilBtn = document.querySelector('#sidebar .fa-pencil')?.parentElement;
    if (pencilBtn) {
      pencilBtn.addEventListener('click', () => this.enablePencil());
    }

    // 🎯 Curseur personnalisé parfaitement aligné
    const container = document.querySelector('.drawing-container') as HTMLElement;

    canvas.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--x', `${x}px`);
      container.style.setProperty('--y', `${y}px`);
    });
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

    this.ctx.lineWidth = this.erasing ? 20 : 2;
    this.ctx.strokeStyle = this.erasing ? 'rgba(0,0,0,1)' : 'black';
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
    this.currentPath.push({ x: event.offsetX, y: event.offsetY });
  }

  private stopDrawing(): void {
    if (this.currentPath.length > 0 && !this.erasing) {
      this.paths.push([...this.currentPath]);
    }
    this.drawing = false;
  }

  clearCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.paths = [];
  }

  enableEraser(): void {
    this.erasing = true;
    this.ctx.globalCompositeOperation = 'destination-out';
  }

  enablePencil(): void {
    this.erasing = false;
    this.ctx.globalCompositeOperation = 'source-over';
  }

  exportToSVG(): void {
    let svgPaths = this.paths.map(path => `<path d="M${path.map(p => `${p.x},${p.y}`).join(' L ')}" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
    const svg = `<svg width="1600" height="700" xmlns="http://www.w3.org/2000/svg">${svgPaths}</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    a.click();
    URL.revokeObjectURL(url);
  }
}

