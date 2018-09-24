/* global describe it */
const expect = require('chai').expect
const request = require('supertest')('http://api.docker.test/wp-json/wp/v2')

describe('List Entradas', () => {
  it('GET entradas slide show sticky', () => {
    request
      .get('/posts?sticky=true&_embed')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err
        expect(res).to.be.a('array')
        expect(res).to.have.lengthOf(2)
        expect(res[0].sticky).to.equal('true')
        expect(res[0].status).to.equal('publish')
      })
  })

  it('GET entradas list', () => {
    request
      .get('/posts?sticky=false&_embed')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err
        expect(res).to.be.a('array')
        expect(res[0].sticky).to.equal('false')
        expect(res[0].status).to.equal('publish')
      })
  })
})
