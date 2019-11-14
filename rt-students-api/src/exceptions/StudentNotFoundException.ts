import HttpException from './HttpException';

export default class StudentNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Could not find user with id: ${id}`);
    }
}
