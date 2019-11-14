import express from 'express';
import Student from '../models/Student';
import StudentModelInterface from '../interfaces/StudentModelInterface';
import ControllerInterface from '../interfaces/ControllerInterface';
import StudentNotFoundException from '../exceptions/StudentNotFoundException';
import StudentInterface from '../interfaces/StudentInterface';
import GeneralStudentException from '../exceptions/GeneralStudentException';
import mongoose from 'mongoose';
import PaginationInterface from '../interfaces/PaginationInterface';

export default class StudentController implements ControllerInterface {
    public path = '/api/students';
    public router = express.Router();

    constructor() {
        this.attachRoutes();
    }

    attachRoutes(): void {
        this.router.get(this.path, this.getStudents);
        this.router.get(`${this.path}/:id`, this.getStudentById);
        this.router.post(`${this.path}`, this.createNewStudent);
        this.router.patch(`${this.path}/:id`, this.updateStudentById);
        this.router.delete(`${this.path}/:id`, this.deleteStudentById);
    }

    private getStudents = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const countQuery = await Student.find();
            const total: number = countQuery.length;
            const count: number = Number.parseInt(req.query.count) || 10;
            const page: number = Number.parseInt(req.query.page) || 1;
            const pages: number = Math.ceil(total / count);
            const index: number = page - 1 || 0;
            const order: 'ASC' | 'DESC' = req.query.order || 'ASC';
            const orderBy: string = req.query.orderBy || 'lastName';
            const skip: number = index * count;
            const sortString: string = `${order == 'ASC' ? '' : '-'}${orderBy}`;

            const docs: StudentModelInterface[] = await Student.find()
                .skip(skip)
                .sort(sortString)
                .limit(count)
                .then(data => {
                    return data || [];
                });

            const data: PaginationInterface = {
                docs,
                pages,
                total,
            };

            res.header('X-Total-Count', total.toString()).send(data);
        } catch (e) {
            console.error(e);
            next(new GeneralStudentException());
        }
    };

    private getStudentById = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const { id } = req.params;
        try {
            const data = await Student.findById(id);
            if (data) {
                res.send(data);
            } else {
                next(new StudentNotFoundException(id));
            }
        } catch (error) {
            console.error(error);
            if (error instanceof mongoose.Error.CastError) {
                next(new StudentNotFoundException(id));
            }
            next(new GeneralStudentException());
        }
    };

    private createNewStudent = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const data: StudentInterface = req.body;
            const newStudent: StudentModelInterface = await Student.create(
                data
            );
            const savedStudent: StudentModelInterface = await newStudent.save();
            res.send(savedStudent);
        } catch (error) {
            console.error(error);
            if (error instanceof mongoose.Error.ValidationError) {
                next(error);
            } else {
                next(new GeneralStudentException());
            }
        }
    };

    private updateStudentById = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const { id } = req.params;
            const data: StudentInterface = req.body;
            const updatedStudent: StudentModelInterface = await Student.findByIdAndUpdate(
                id,
                data,
                { new: true }
            );
            if (updatedStudent) {
                res.send(updatedStudent);
            } else {
                next(new StudentNotFoundException(id));
            }
        } catch (error) {
            console.error(error);
            if (error instanceof mongoose.Error.ValidationError) {
                next(error);
            } else {
                next(new GeneralStudentException());
            }
        }
    };

    private deleteStudentById = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const { id } = req.params;
        try {
            const data = await Student.findByIdAndDelete(id);
            if (data) {
                res.send(data);
            } else {
                next(new StudentNotFoundException(id));
            }
        } catch (error) {
            console.error(error);
            if (error instanceof mongoose.Error.ValidationError) {
                next(error);
            } else {
                next(new GeneralStudentException());
            }
        }
    };
}
