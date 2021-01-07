import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DizgimizanpajComponent } from './dizgimizanpaj.component';

describe('DizgimizanpajComponent', () => {
  let component: DizgimizanpajComponent;
  let fixture: ComponentFixture<DizgimizanpajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DizgimizanpajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DizgimizanpajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
