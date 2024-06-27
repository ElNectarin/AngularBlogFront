import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainblogComponent } from './mainblog.component';

describe('MainblogComponent', () => {
  let component: MainblogComponent;
  let fixture: ComponentFixture<MainblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainblogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
