import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  private currentTool$ = new BehaviorSubject<string>('pencil');

  setTool(tool: string) {
    this.currentTool$.next(tool);
  }

  getTool() {
    return this.currentTool$.asObservable();
  }
}
