import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesinfoconsoleComponent } from './galleriesinfoconsole.component';

describe('GalleriesinfoconsoleComponent', () => {
  let component: GalleriesinfoconsoleComponent;
  let fixture: ComponentFixture<GalleriesinfoconsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriesinfoconsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesinfoconsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
