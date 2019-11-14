import { Schema, Model, model } from 'mongoose';
import StudentModelInterface from '../interfaces/StudentModelInterface';

export const StudentSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    startDate: { type: Date, required: true },
    graduationDate: { type: Date },
    coursesTaken: { type: [String], default: [] },
});

StudentSchema.methods.fullName = function studentFullName(): string {
    return `${this.firstName.trim()} ${this.lastName.trim()}`;
};

const Student: Model<StudentModelInterface> = model<StudentModelInterface>(
    'Student',
    StudentSchema
);

export default Student;
