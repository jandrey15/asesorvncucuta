import React, { Component } from 'react'
import Article from '../components/Article'
import Layout from '../components/Layout'
import Error from './_error'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const { API_URL } = publicRuntimeConfig

export default class Articulos extends Component {
  static async getInitialProps ({ res }) {
    try {
      let req = await fetch(
        `${API_URL}/wp-json/wp/v2/articulo?per_page=20&_embed`
      )

      let articles = await req.json()

      return { articles, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { articles: [], statusCode: 503 }
    }
  }

  render () {
    const { articles, statusCode } = this.props
    // console.log(articles)

    if (statusCode !== 200) {
      // console.log('error...')
      return <Error statusCode={statusCode} />
    }

    return (
      <Layout
        SEO={{
          title: 'Artículos - Asesorvncucuta',
          url: 'http://asesorvncucuta.com/articulos',
          titleOpenGraph: 'Artículos'
        }}
      >
        <div className='dondeEstoy container'>
          <span>Estoy en:</span> <p>Artículos</p>
        </div>
        {articles.length > 0 ? (
          <section id='Articles' className='container'>
            {articles.map(tag => (
              <div className='article' key={tag.id}>
                <Article article={tag} />
              </div>
            ))}
          </section>
        ) : (
          <div className='nothing container'>
            <h4>No hay artículos</h4>
          </div>
        )}
        <style jsx>{`
          #Articles {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
            grid-gap: 30px 10px;
            justify-items: center;
          }

          .article {
            background-color: #f7f7f7;
            transition: 0.3s;
            max-width: 300px;
          }

          .article:hover {
            box-shadow: 0px 18px 18px 0px rgba(48, 48, 48, 0.3686274509803922);
          }

          .nothing {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            color: #2d2d2a;
            font-weight: 600;
          }

          .nothing h4 {
            margin: 0;
          }

          .dondeEstoy {
            display: flex;
            align-items: center;
            padding-left: 20px;
            height: 40px;
            font-size: 13px;
            box-sizing: border-box;
            color: #505050;
            flex: 0;
          }

          .dondeEstoy p {
            margin: 0 5px;
            color: #4c4c4c;
          }

          .dondeEstoy span {
            color: #4c4c4c;
            font-size: 14px;
            font-weight: 600;
          }
        `}</style>
      </Layout>
    )
  }
}
