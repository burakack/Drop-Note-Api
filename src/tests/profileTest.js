var assert = require('assert');
var expect = require('chai').expect
var request=require(('supertest'))
app=require('../../app')

const user = {
    id:3,
    nickname: `TESTUSER${Date.now()}`,
    email: `abdaajı${Date.now()}@hotmail.com`,
    password: '123',
    cpassword:'123'
    
  };

describe('POST /profile/register', ()=>{
    it('201-Successful registration scenario', (done)=> {
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

    it('400-Passwords need match', (done)=> {
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

    it('400-E-mail need to be unique', (done)=> {
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

    it('400-Nickname need to be unique',  (done)=> {
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

describe('POST /profile/login', ()=> {
    it('200-Succesful login scenario', (done)=> {
        request(app)
        .post('/profile/login')
        .send({
            email:user.email,
            password:user.password})
        .expect(200, done);
        });
    it('401-Wrong password', (done)=> {
        request(app)
        .post('/profile/login')
        .send({
            email:user.email,
            password:"nanelimon"})
        .expect(401,done);
        });
    it('401-No users registered with this email', (done)=> {
        request(app)
        .post('/profile/login')
        .send({
            email:`abdaajı${Date.now()}@hotmail.com`,
            password:"123"})
        .expect(401, done);
        });
});

describe(`GET /profile/:id`, ()=> {
    it('200-Successfull getting user info', (done)=> {
        request(app)
        .get(`/profile/${user.id}`)
        .send()
        .expect(200, done);
    });
    it('404-User not found', (done)=> {
        request(app)
        .get('/profile/1000000000')
        .send()
        .expect(404, done);
        });
})


describe(`GET /profile/:slug/notes`, function() {
    it('200-Successfull getting user notes', function(done) {
        request(app)
        .get(`/profile/${user.nickname}/notes`)
        .send()
        .expect(200, done);
    });
    it('404-No user with this nickname', function(done) {
        request(app)
        .get('/profile/dpopghdfo/notes')
        .send()
        .expect(404, done);
        });
})