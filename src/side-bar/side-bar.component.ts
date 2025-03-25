import { Component } from '@angular/core';
import { DrawingService } from '../services/drawing.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent {
  constructor(private drawingService: DrawingService) {}

  activateTool(tool: string) {
    this.drawingService.setTool(tool);
  }

  clearCanvas() {
    this.drawingService.setTool('clear');
  }
}
