import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DrawingService } from '../services/drawing.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent {
  @Output() changeThicknessEvent = new EventEmitter<void>();
  constructor(private drawingService: DrawingService) {}

  activateTool(tool: string) {
    this.drawingService.setTool(tool);
  }

  clearCanvas() {
    this.drawingService.setTool('clear');
  }

  changeThickness() {
    this.changeThicknessEvent.emit();
  }

}
