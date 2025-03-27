import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBtnComponent } from './bottom-btn.component';

describe('BottomBtnComponent', () => {
  let component: BottomBtnComponent;
  let fixture: ComponentFixture<BottomBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
