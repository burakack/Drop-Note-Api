var assert = require('assert');
var expect = require('chai').expect
var request=require(('supertest'))
app=require('../../app')

const user = {
    nickname: `TESTUSER${Date.now()}`,
    email: `abdaajı${Date.now()}@hotmail.com`,
    password: '123',
    cpassword:'123'
    
  };

describe('POST /profile/register', function() {
    it('201-Successful registration scenario', function(done) {
        request(app)
        .post('/profile/register')
        .send(
            {
                nickname:user.nickname,
                email:user.email,
                password:user.password,
                cpassword:user.cpassword,
            }
        )
        .expect(201, done);
        });

    it('400-Passwords need match', function(done) {
        request(app)
        .post('/profile/register')
        .send(
            {
                nickname:`test ${Date.now()} user`,
                email:`testuser${Date.now()}@hotmail.com`,
                password:"123",
                cpassword:"1234"
            }
        )
        .expect(400, done);
        });

    it('400-E-mail need to be unique', function(done) {
        var email =`testuser${Date.now()}@hotmail.com`
        request(app)
        .post('/profile/register')
        .send(
            {
                nickname:`test ${Date.now()} user`,
                email:user.email,
                password:"123",
                cpassword:"123"
            }
        )
        .expect(400, done);
        });

    it('400-Nickname need to be unique', function(done) {
        var nickname =`test ${Date.now()} user `
        request(app)
        .post('/profile/register')
        .send(
            {
                nickname:user.nickname,
                email:`testuser${Date.now()}@hotmail.com`,
                password:"123",
                cpassword:"123"
            }
        )
        .expect(400, done);
        });
    });

describe('POST /profile/login', function() {
    it('200-Succesful login scenario', function(done) {
        request(app)
        .post('/profile/login')
        .send({
            email:user.email,
            password:user.password})
        .expect(200, done);
        });
    it('400-Wrong password', function(done) {
        request(app)
        .post('/profile/login')
        .send({
            email:user.email,
            password:"nanelimon"})
        .expect(400, done);
        });
    it('400-No users registered with this email', function(done) {
        request(app)
        .post('/profile/login')
        .send({
            email:`abdaajı${Date.now()}@hotmail.com`,
            password:"123"})
        .expect(400, done);
        });
});