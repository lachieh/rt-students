import request from 'supertest';
import App from '../src/app';

const app = new App([]);

describe('Authentication', () => {
    it('should return 401 when not logged in', () => {
        return request(app.getApp())
            .get('/random-url')
            .expect(401);
    });

    it('should return 401 when logging in with incorrect user', () => {
        return request(app.getApp())
            .get('/random-url')
            .auth('not-a-user', 'not-a-password')
            .expect(401);
    });

    it('should return 404', () => {
        return request(app.getApp())
            .get('/random-url')
            .auth('admin', 'supersecret')
            .expect(404);
    });

    it('should only allow Cross Origin Requests from authorized domains', () => {
        return request(app.getApp())
            .get('/random-url')
            .auth('admin', 'supersecret')
            .expect('Access-Control-Allow-Origin', process.env['FRONT_HOST']);
    });
});
