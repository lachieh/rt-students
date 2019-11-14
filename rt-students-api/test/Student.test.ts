import StudentInterface from '../src/interfaces/StudentInterface';
import Student from '../src/models/Student';
import App from '../src/app';
import dotenv from 'dotenv';

describe('Student Model', () => {
    beforeAll(async () => {
        dotenv.config({ path: '.env.test' });
        const app = new App([]);
        app.listen();
    });

    it('should create a Student', async () => {
        const newStudent: StudentInterface = {
            firstName: 'P.',
            lastName: 'Sherman',
            address: '42 Wallaby Way',
            city: 'Sydney',
            state: 'NSW',
            zip: '02000',
            startDate: new Date(2001, 2, 18),
            coursesTaken: ['math101'],
        };

        const result = await new Student(newStudent).save();
        expect(result._id).toBeDefined();
        expect(result.firstName).toEqual(newStudent.firstName);
        expect(result.lastName).toEqual(newStudent.lastName);
        expect(result.address).toEqual(newStudent.address);
        expect(result.state).toEqual(newStudent.state);
        expect(result.zip).toEqual(newStudent.zip);
        expect(result.startDate).toEqual(newStudent.startDate);
        expect(result.fullName()).toEqual(
            `${newStudent.firstName} ${newStudent.lastName}`
        );
        expect(result.coursesTaken).toContain(newStudent.coursesTaken[0]);
    });

    it('should find and update a Student', async () => {
        const student = await Student.findOneAndUpdate(
            { lastName: 'Sherman' },
            {
                firstName: 'Kath',
                lastName: 'Day-Knight',
            },
            { new: true }
        );
        expect(student.firstName).toBe('Kath');
        expect(student.lastName).toBe('Day-Knight');
    });
});
