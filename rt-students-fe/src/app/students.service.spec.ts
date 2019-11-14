import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StudentsService } from './students.service';
import { HttpClient } from '@angular/common/http';
import { PaginationResponse } from './pagination-response';
import { Student } from './student';

describe('StudentsService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: StudentsService;
  let studentData: Student;
  let user: string;
  let pass: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(StudentsService);

    // hardcoded login details
    user = 'admin';
    pass = 'supersecret';

    // dummy student data
    studentData = {
      _id: '1234567890',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      startDate: new Date(Date.now()),
      coursesTaken: [],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET page 1 of students', () => {
    const testData: PaginationResponse = {
      docs: [],
      pages: 1,
      total: 0,
    };

    // make sure the method exists
    expect(service.getStudents).toBeDefined();

    // Expect the service to get some data
    service.getStudents().subscribe(data => expect(data).toEqual(testData));

    //  expect the service to hit the students API endpoint
    const req = httpMock.expectOne(
      currReq => currReq.url === `${service.endpoint}/students`
    );

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Assert that authorization headers are set
    expect(req.request.headers.get('Authorization')).toEqual(
      'Basic ' + btoa(`${user}:${pass}`)
    );

    // assert that request has all appropriate params
    expect(req.request.params.get('page')).toEqual('1');
    expect(req.request.params.get('order')).toEqual('DESC');
    expect(req.request.params.get('count')).toEqual('10');

    // Respond with mock data, causing Observable to resolve.
    req.flush(testData);
  });

  it('should GET page 2 of students', () => {
    const testData: PaginationResponse = {
      docs: [],
      pages: 2,
      total: 0,
    };

    // make sure the method exists
    expect(service.getStudents).toBeDefined();

    // Expect the service to get some data
    service
      .getStudents(1, 'ASC', 15)
      .subscribe(data => expect(data).toEqual(testData));

    //  expect the service to hit the students API endpoint
    const req = httpMock.expectOne(
      currReq => currReq.url === `${service.endpoint}/students`
    );

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // assert that request has all appropriate params
    expect(req.request.params.get('page')).toEqual('1');
    expect(req.request.params.get('order')).toEqual('ASC');
    expect(req.request.params.get('count')).toEqual('15');

    // Respond with mock data, causing Observable to resolve.
    req.flush(testData);
  });

  // createNewStudent
  it('should POST new students', () => {
    expect(service.createStudent).toBeDefined();
    service
      .createStudent(studentData)
      .subscribe(data => expect(data).toEqual(studentData));

    const req = httpMock.expectOne(
      curr => curr.url === `${service.endpoint}/students`
    );

    expect(req.request.method).toEqual('POST');

    req.flush(studentData);
  });

  // getStudent
  it('should GET student by ID', () => {
    expect(service.getStudent).toBeDefined();
    service
      .getStudent(studentData._id)
      .subscribe(data => expect(data).toEqual(studentData));

    const req = httpMock.expectOne(
      curr => curr.url === `${service.endpoint}/students/${studentData._id}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(studentData);
  });

  // updateStudent
  it('should PATCH student by ID', () => {
    expect(service.updateStudent).toBeDefined();
    service
      .updateStudent(studentData)
      .subscribe(data => expect(data).toEqual(studentData));

    const req = httpMock.expectOne(
      curr => curr.url === `${service.endpoint}/students/${studentData._id}`
    );

    expect(req.request.method).toEqual('PATCH');

    req.flush(studentData);
  });

  // deleteStudent
  it('should DELETE student by ID', () => {
    expect(service.deleteStudent).toBeDefined();
    service
      .deleteStudent(studentData)
      .subscribe(data => expect(data).toEqual(studentData));

    const req = httpMock.expectOne(
      curr => curr.url === `${service.endpoint}/students/${studentData._id}`
    );

    expect(req.request.method).toEqual('DELETE');

    req.flush(studentData);
  });

  afterEach(() => {
    // Finally, assert that there are no outstanding requests.
    httpMock.verify();
  });
});
