import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



<div>
<mat-form-field>
  <input
    type="file"
    class="file-input"
    (change)="onFileSelected($event)"
    #fileUpload
  />

  <div class="file-upload">
    {{ registerForm.value.fileName || "No file uploaded yet." }}

    <button
      mat-mini-fab
      color="primary"
      class="upload-btn"
      (click)="fileUpload.click()"
    >
      <mat-icon>attach_file</mat-icon>
    </button>
  </div>
</mat-form-field>
</div>