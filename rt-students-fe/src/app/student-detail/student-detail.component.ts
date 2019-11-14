import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentsService } from '../students.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  providers: [StudentsService],
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student;

  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    address2: [''],
    state: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    startDate: [
      '',
      [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)],
    ],
    graduationDate: ['', Validators.pattern(/\d{4}-\d{2}-\d{2}/)],
  });

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get student when `id` param changes
    this.route.paramMap.subscribe(paramMap =>
      this.getStudent(paramMap.get('id'))
    );
  }

  getStudent(id: string): void {
    if (!id) {
      this.student = {} as Student;
      return;
    }

    this.studentsService.getStudent(id).subscribe(student => {
      if (student) {
        this.student = student;
        this.studentForm.patchValue(student);
      } else {
        this.goToList();
      }
    });
  }

  onSubmit(): void {
    this.student = Object.assign(this.student, this.studentForm.value);
    this.save();
  }

  save(): void {
    this.studentsService
      .updateStudent(this.student)
      .subscribe(() => this.goToList());
  }

  formatDate(event: string): string | null {
    return event ? new Date(event).toString() : null;
  }

  cancel(): void {
    this.goToList();
  }

  goToList(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
