import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderconsoleComponent } from './sliderconsole.component';

describe('SliderconsoleComponent', () => {
  let component: SliderconsoleComponent;
  let fixture: ComponentFixture<SliderconsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderconsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderconsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
