import StudentInterface from './StudentInterface';
import { Document } from 'mongoose';

export default interface StudentModelInterface
    extends StudentInterface,
        Document {
    fullName(): string;
}
