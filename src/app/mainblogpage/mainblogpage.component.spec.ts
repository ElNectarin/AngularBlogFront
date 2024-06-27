import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainblogpageComponent } from './mainblogpage.component';

describe('MainblogpageComponent', () => {
  let component: MainblogpageComponent;
  let fixture: ComponentFixture<MainblogpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainblogpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainblogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
