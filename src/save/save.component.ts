import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'topbar',
  templateUrl: './save.component.html',
  styleUrl: './save.component.css'
})
export class SaveComponent implements AfterViewInit {
  @ViewChild('validateBtn', { static: false }) validateBtn!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    console.log('SaveComponent initialized');
    this.validateBtn.nativeElement.addEventListener('click', () => this.save());
  }

  save(): void {
    console.log('Save');
  }
}
