import request from 'supertest';
import App from '../src/app';
import StudentController from '../src/controllers/StudentController';
import Student from '../src/models/Student';
import StudentInterface from '../src/interfaces/StudentInterface';

const app = new App([new StudentController()]);

describe('GET /api/students', () => {
    it('should return all students', async () => {
        const allStudents = await Student.find()
            .select(
                'firstName lastName address address2 state city zip startDate graduationDate coursesTaken'
            )
            .lean()
            .then(data => {
                return data.map((student: StudentInterface) => {
                    const newStudent = {
                        lastName: student.lastName,
                        address: student.address,
                        address2: student.address2,
                        state: student.state,
                        city: student.city,
                        zip: student.zip,
                        coursesTaken: student.coursesTaken,
                    };
                    if (student.startDate)
                        newStudent['startDate'] = student.startDate.toString();
                    if (student.graduationDate)
                        newStudent[
                            'graduationDate'
                        ] = student.graduationDate.toString();
                    return newStudent;
                });
            });
        const requestData = await request(app.getApp())
            .get('/api/students')
            .auth('admin', 'supersecret')
            .expect(200);
        expect(allStudents).toBe(requestData.body);
    });
});
