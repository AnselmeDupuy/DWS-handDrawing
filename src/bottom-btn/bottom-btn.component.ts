import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bottom-btn',
  standalone: true,
  imports: [],
  templateUrl: './bottom-btn.component.html',
  styleUrl: './bottom-btn.component.css'
})
export class BottomBtnComponent {
  @Output() undoEvent = new EventEmitter<void>();

  undo(): void {
    this.undoEvent.emit();
  } 

  redo(): void {
    this.undoEvent.emit();
  }
}
