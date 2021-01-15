import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesImagesconsoleComponent } from './galleries-imagesconsole.component';

describe('GalleriesImagesconsoleComponent', () => {
  let component: GalleriesImagesconsoleComponent;
  let fixture: ComponentFixture<GalleriesImagesconsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriesImagesconsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesImagesconsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
