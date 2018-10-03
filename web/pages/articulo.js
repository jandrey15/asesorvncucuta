import React, { Component } from 'react'
import Link from 'next/link'
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

    let d = new Date(article.date)

    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const dateArticle = d.toLocaleString('es-CO', options)

    return (
      <Layout title={article.title.rendered}>
        <article id='Article'>
          <figure>
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
          </figure>
          <div className='container'>
            <h1 className='title'>{article.title.rendered}</h1>
            <div className='dateTags'>
              <time className='date' dateTime={article.date}>
                {dateArticle}
              </time>
              {'-'}
              <div className='tags'>
                {article._embedded['wp:term']
                  ? article._embedded['wp:term'][1].map(item => (
                    <div className='tag' key={item.id}>
                      <Link href={`/tag/${item.slug}`}>
                        <a className='link'>{item.name}</a>
                      </Link>
                      {', '}
                    </div>
                  ))
                  : null}
              </div>
            </div>
            <div
              className='text'
              dangerouslySetInnerHTML={{ __html: article.content.rendered }}
            />

            <div className='author'>
              <img
                src={article._embedded.author[0].avatar_urls['48']}
                alt={article._embedded.author[0].name}
              />
            </div>
          </div>
        </article>
        <style jsx>{`
          figure {
            margin: 0 0 50px;
            height: 600px;
          }

          figure img {
            height: 600px;
            object-fit: cover;
            width: 100%;
          }

          .title {
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            line-height: 30px;
            color: #2e2e2e;
          }

          .text {
            margin-top: 30px;
          }

          .dateTags {
            display: flex;
            margin-top: 5px;
          }

          .date {
            margin-right: 5px;
          }

          .tags {
            margin-left: 5px;
            display: flex;
          }

          .tag {
            display: flex;
            margin-right: 5px;
          }

          a {
            text-decoration: none;
            color: #2e2e2e;
          }

          a:hover {
            text-decoration: underline;
            color: #3399cc;
          }
        `}</style>
      </Layout>
    )
  }
}
