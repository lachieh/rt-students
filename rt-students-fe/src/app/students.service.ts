import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';
import { PaginationResponse } from './pagination-response';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  public endpoint = 'http://localhost:3000/api';

  private user = 'admin';
  private pass = 'supersecret';

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(`${this.user}:${this.pass}`),
    }),
  };

  constructor(private http: HttpClient) {}

  public getStudents(
    page: number = 1,
    order: 'ASC' | 'DESC' = 'DESC',
    count: number = 10
  ): Observable<PaginationResponse> {
    const params = new HttpParams()
      .append('page', page.toString())
      .append('count', count.toString())
      .append('order', order);
    const httpOptions = { ...this.httpOptions, params };

    return this.http.get<PaginationResponse>(
      `${this.endpoint}/students`,
      httpOptions
    );
  }

  public createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(
      `${this.endpoint}/students`,
      student,
      this.httpOptions
    );
  }

  public getStudent(id: string | number): Observable<Student> {
    return this.http.get<Student>(
      `${this.endpoint}/students/${id}`,
      this.httpOptions
    );
  }

  public updateStudent(student: Student): Observable<Student> {
    return this.http.patch<Student>(
      `${this.endpoint}/students/${student._id}`,
      student,
      this.httpOptions
    );
  }

  public deleteStudent(student: Student): Observable<Student> {
    return this.http.delete<Student>(
      `${this.endpoint}/students/${student._id}`,
      this.httpOptions
    );
  }
}
