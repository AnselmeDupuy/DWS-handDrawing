import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  @Input() paths: { x: number; y: number }[][] = [];

    exportToSVG(): void {
    let svgPaths = this.paths.map(path =>
      `<path d="M${path.map(p => `${p.x},${p.y}`).join(' L ')}" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    ).join('');

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
