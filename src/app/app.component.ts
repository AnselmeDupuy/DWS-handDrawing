import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BottomBtnComponent } from '../bottom-btn/bottom-btn.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { DrawingService } from '../services/drawing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopBarComponent, SideBarComponent, BottomBtnComponent],
  template: `
    <app-top-bar [paths]="paths"></app-top-bar>
    <app-side-bar></app-side-bar>
    <app-bottom-btn (undoEvent)="undoLastStroke()"></app-bottom-btn>
    <div class="drawing-container">
      <canvas #canvas></canvas>
    </div>
  `,
  styles: [`
    .drawing-container {
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
    }
  `]
})
export class FreehandDrawingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  public paths: { x: number; y: number }[][] = [];
  public currentPath: { x: number; y: number }[] = [];

  private toolSub!: Subscription;
  private currentTool: string = 'pencil';

  constructor(private drawingService: DrawingService) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = 1600;
    canvas.height = 700;
    this.initDrawing();

    this.toolSub = this.drawingService.getTool().subscribe(tool => {
      this.currentTool = tool;
      console.log('Tool changed to:', tool);

      if (tool === 'clear') {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.paths = [];
        this.currentPath = [];
      }
    });
  }

  private initDrawing(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.addEventListener('mousedown', (event) => this.startDrawing(event));
    canvas.addEventListener('mousemove', (event) => this.draw(event));
    canvas.addEventListener('mouseup', () => this.stopDrawing());
    canvas.addEventListener('mouseleave', () => this.stopDrawing());
  }

  undoLastStroke(): void {
    if (this.paths.length > 0) {
      this.paths.pop();
      this.redrawCanvas();
    }
  }

  redoLastStroke(): void {
    if (this.paths.length > 0) {
      this.paths.pop();
      this.redrawCanvas();
    }
  }

  private redrawCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.paths.forEach(path => {
      this.ctx.beginPath();
      path.forEach((point, index) => {
        if (index === 0) {
          this.ctx.moveTo(point.x, point.y);
        } else {
          this.ctx.lineTo(point.x, point.y);
        }
      });
      this.ctx.stroke();
    });
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

    if (this.currentTool === 'eraser') {
      this.ctx.strokeStyle = '#f0f0f0';
      this.ctx.lineWidth = 20;
      this.canvasRef.nativeElement.style.cursor = 'cell'; 
    } else {
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      this.canvasRef.nativeElement.style.cursor = 'crosshair';
    }

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

  ngOnDestroy(): void {
    this.toolSub.unsubscribe();
  }
}
