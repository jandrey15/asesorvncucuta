/* global describe it */
const expect = require('chai').expect
const request = require('supertest')('http://api.docker.test/wp-json/wp/v2')

describe('GET api request', () => {
  describe('GET home', () => {
    it('Entradas slide show sticky', done => {
      request
        .get('/posts?sticky=true&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          // console.log(res.body)
          expect(res.body).to.be.a('array')
          expect(res.body).to.have.lengthOf(2)
          expect(res.body[0].sticky).to.equal(true)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('GET entradas list', done => {
      request
        .get('/posts?sticky=false&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          // console.log(res.body)
          expect(res.body).to.be.a('array')
          expect(res.body[0].sticky).to.equal(false)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('GET list articles news column', () => {
      request
        .get('/articulo?sticky=false&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          expect(res).to.be.a('array')
          expect(res).to.have.lengthOf(3)
          expect(res[0].sticky).to.equal('false')
          expect(res[0].status).to.equal('publish')
        })
    })
  })

  it('GET lists tags', () => {
    request
      .get('/articulo?tags=82&per_page=20&_embed')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err
        console.log('Hola mundo')
        expect(res).to.be.a('array')
        expect(res).to.have.lengthOf(0)
        expect(res[0].sticky).to.equal('true')
        expect(res[0].status).to.equal('publish')
      })
  })
})
