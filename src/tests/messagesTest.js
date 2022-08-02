var assert = require('assert');
var expect = require('chai').expect
var request=require(('supertest'))
app=require('../../app')
const tokenservice=require('../services/tokens')
const user=require('./profileTest').user

var token=tokenservice.gettokenwithid(1)
token.then(function(result) {
    describe('GET /messages/', ()=>{
        it('200-Successful getting messages', (done)=> {
            request(app)
            .get('/messages/')
            .set('access_token',result[0].token)
            .send(
                {
                    to:2
                }
            )
            .expect(200, done);
            })
        it('400-Trying getting messages from yourself', (done)=> {
            request(app)
            .get('/messages/')
            .set('access_token',result[0].token)
            .send(
                {
                    to:1
                }
            )
            .expect(400, done);
            })
        it('400-Trying getting messages without "to" parameter', (done)=> {
            request(app)
            .get('/messages/')
            .set('access_token',result[0].token)
            .send(
                {
                }
            )
            .expect(400, done);
            })
    });
    describe('POST /messages/', ()=>{
        it('200-Successful sending message', (done)=> {
            request(app)
            .post('/messages/')
            .set('access_token',result[0].token)
            .send(
                {
                    to:2,
                    message:"THIS IS AN TEST MESSAGE"
                }
            )
            .expect(200, done);
            })
        it('400-Trying send message without message text', (done)=> {
            request(app)
            .post('/messages/')
            .set('access_token',result[0].token)
            .send(
                {
                    to:2,
                }
            )
            .expect(400, done);
            })
        it('400-Trying send message without "to" parameter ', (done)=> {
            request(app)
            .post('/messages/')
            .set('access_token',result[0].token)
            .send(
                {
                    message:"THIS IS AN TEST MESSAGE"
                }
            )
            .expect(400, done);
            })
        });
})