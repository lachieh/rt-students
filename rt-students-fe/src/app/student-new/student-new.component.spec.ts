import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewComponent } from './student-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentNewComponent', () => {
  let component: StudentNewComponent;
  let fixture: ComponentFixture<StudentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentNewComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: it should show the form and have all fields
  // TODO: it should validate the form
  // - it should show errors on invalid data
  // - it should remove errors on valid data
  // - button should be disabled until form is valid
  // TODO: it should submit the form and hit the service
  // TODO: it should show an error if anything went wrong
  // TODO: it should return to the new list once created
});
