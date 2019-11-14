import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentsService } from '../students.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.scss'],
})
export class StudentNewComponent implements OnInit {
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

  ngOnInit() {}

  onSubmit() {
    this.save();
  }

  save(): void {
    this.studentsService
      .createStudent(this.studentForm.value as Student)
      .subscribe(() => this.gotoList());
  }

  cancel() {
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
