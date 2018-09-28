import React, { Component } from 'react'
import Layout from '../components/Layout'

export default class Entrada extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name

    try {
      // let req = await fetch('https://api.audioboom.com/channels/recommended')
      let req = await fetch(
        `http://api.docker.test/wp-json/wp/v2/posts?slug=${name}&_embed`
      )
      let [entrada] = await req.json()

      return { entrada, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { entrada: null, statusCode: 503 }
    }
  }

  render () {
    const { entrada, statusCode } = this.props
    // console.log(entrada)
    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }

    return (
      <Layout title={entrada.title.rendered}>
        <article id='Entrada'>
          <img
            src={
              entrada._embedded['wp:featuredmedia']
                ? entrada._embedded['wp:featuredmedia'][0].source_url
                : '/static/default.jpg'
            }
            alt={
              entrada._embedded['wp:featuredmedia']
                ? entrada._embedded['wp:featuredmedia'][0].alt_text
                : entrada.title.rendered
            }
          />
          <h1 className='title'>{entrada.title.rendered}</h1>
          <div
            className='text'
            dangerouslySetInnerHTML={{ __html: entrada.content.rendered }}
          />
        </article>
      </Layout>
    )
  }
}
