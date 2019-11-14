import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss'],
})
export class StudentIndexComponent implements OnInit {
  students: Student[];
  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentsService
      .getStudents()
      .subscribe(data => (this.students = data.docs));
  }

  showStudentDetail(student: Student): void {
    this.router.navigate(['../students/edit/', student._id]);
  }

  deleteStudent(student: Student): void {
    this.studentsService.deleteStudent(student).subscribe(() => {
      this.getStudents();
    });
  }
}
