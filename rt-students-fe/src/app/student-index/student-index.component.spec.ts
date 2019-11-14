import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentIndexComponent } from './student-index.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentIndexComponent', () => {
  let component: StudentIndexComponent;
  let fixture: ComponentFixture<StudentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [StudentIndexComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: it should fetch the students
  // TODO: it should show an error if anything went wrong while fetching
  // TODO: it should display the name, email and start date of each student in a table
  // TODO: it should hit the service when delete is clicked
  // TODO: it should show an error if anything went wrong while deleting
  // TODO: it should change the route when edit is clicked
});
