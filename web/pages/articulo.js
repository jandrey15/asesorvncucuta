import React, { Component } from 'react'
import Layout from '../components/Layout'

export default class Articulo extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name

    try {
      let req = await fetch(
        `http://api.docker.test/wp-json/wp/v2/articulo?slug=${name}&_embed`
      )
      let [article] = await req.json()

      return { article, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { article: null, statusCode: 503 }
    }
  }

  render () {
    const { article, statusCode } = this.props
    // console.log(article)
    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }
    return (
      <Layout title={article.title.rendered}>
        <article id='Article'>
          <img
            src={
              article._embedded['wp:featuredmedia']
                ? article._embedded['wp:featuredmedia'][0].source_url
                : '/static/default.jpg'
            }
            alt={
              article._embedded['wp:featuredmedia']
                ? article._embedded['wp:featuredmedia'][0].alt_text
                : article.title.rendered
            }
          />
          <h1 className='title'>{article.title.rendered}</h1>
          <div
            className='text'
            dangerouslySetInnerHTML={{ __html: article.content.rendered }}
          />
        </article>
      </Layout>
    )
  }
}
