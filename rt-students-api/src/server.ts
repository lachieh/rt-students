import App from './app';
import StudentController from './controllers/StudentController';

const app = new App([new StudentController()]);

app.listen();
