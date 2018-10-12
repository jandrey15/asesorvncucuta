/* global describe it */
const expect = require('chai').expect
const request = require('supertest')('http://api.docker.test/wp-json/wp/v2')

describe('GET api request', () => {
  describe('GET home', () => {
    it('Entradas slide show sticky', done => {
      request
        .get('/posts?sticky=true&status=publish&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          // console.log(res.body)
          const length = res.body.length

          expect(res.body).to.be.a('array')
          expect(res.body).to.have.lengthOf(length)
          expect(res.body[0].sticky).to.equal(true)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('GET entradas list', done => {
      request
        .get('/posts?sticky=false&status=publish&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          // console.log(res.body)
          const length = res.body.length

          expect(res.body).to.be.a('array')
          expect(res.body).to.have.lengthOf(length)
          expect(res.body[0].sticky).to.equal(false)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('GET list articles news column', done => {
      request
        .get('/articulo?sticky=false&status=publish&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          const length = res.body.length

          expect(res.body).to.be.a('array')
          expect(res.body).to.have.lengthOf(length)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('GET entradas news', done => {
      request
        .get('/posts?sticky=false&&condicion=54&status=publish&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          // console.log(res.body)
          const length = res.body.length

          expect(res.body).to.be.a('array')
          expect(res.body[0].condicion[0]).to.be.a('number')
          expect(res.body[0].condicion[0]).to.equal(54)
          expect(res.body).to.have.lengthOf(length)
          expect(res.body[0].sticky).to.equal(false)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('GET entradas used', done => {
      request
        .get('/posts?sticky=false&&condicion=55&status=publish&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          // console.log(res.body)
          const length = res.body.length

          expect(res.body).to.be.a('array')
          expect(res.body[0].condicion[0]).to.be.a('number')
          expect(res.body[0].condicion[0]).to.equal(55)
          expect(res.body).to.have.lengthOf(length)
          expect(res.body[0].sticky).to.equal(false)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })
  })

  describe('GET entrada', () => {
    it('Info entrada', done => {
      request
        .get('/posts?slug=subaru-forester-awd-x-mt-2000cc&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err

          expect(res.body[0].title.rendered).to.be.a('string')
          expect(res.body[0].title.rendered).to.equal(
            'Subaru Forester AWD X MT 2000CC'
          )
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('Entradas relacionadas con el author', done => {
      request
        .get('/posts?author=1&per_page=5&exclude=163&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err

          expect(res.body).to.be.a('array')
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })
  })

  describe('GET tags noticias', () => {
    it('GET lists tags', done => {
      request
        .get('/articulo?sticky=false&tags=82&per_page=20&status=publish&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          const length = res.body.length

          expect(res.body).to.be.a('array')
          expect(res.body).to.have.lengthOf(length)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })

    it('GET lists noticias', done => {
      request
        .get('/articulo?per_page=20&_embed')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          const length = res.body.length

          expect(res.body).to.be.a('array')
          expect(res.body).to.have.lengthOf(length)
          expect(res.body[0].status).to.equal('publish')
          done()
        })
    })
  })
})