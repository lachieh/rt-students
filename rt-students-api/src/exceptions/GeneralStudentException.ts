import HttpException from './HttpException';

export default class GeneralStudentException extends HttpException {
    constructor() {
        super(400, 'could not complete request');
    }
}
