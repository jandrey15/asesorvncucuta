import React, { Component } from 'react'
import ListEntradas from '../components/ListEntradas'
import Layout from '../components/Layout'
import Link from 'next/link'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'

export default class Tag extends Component {
  static async getInitialProps ({ res }) {
    try {
      let [req, reqNews] = await Promise.all([
        fetch(
          `http://api.docker.test/wp-json/wp/v2/posts?condicion=54&sticky=false&per_page=20&_embed`
        ),
        fetch(
          'http://api.docker.test/wp-json/wp/v2/articulo?sticky=false&per_page=3&status=publish&_embed'
        )
      ])

      let entradas = await req.json()
      let news = await reqNews.json()

      return { entradas, news, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { entradas: [], news: [], statusCode: 503 }
    }
  }

  render () {
    const { entradas, news, statusCode } = this.props
    // console.log(entradas)

    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }

    return (
      <Layout title='Noticias'>
        <div className='dondeEstoy container'>
          <span>Estoy en:</span>
          <Link href='/'>
            <a className='link'>carros y camionetas</a>
          </Link>
          <aside className='space'>&#10095;</aside>
          <p>nuevos</p>
        </div>
        <section id='Entradas' className='container'>
          <div className='column'>
            <Filter />
            <ArticlesColumn news={news} />
          </div>
          <ListEntradas entradas={entradas} auto='auto-fill' />
        </section>
        <style jsx>{`
          #Entradas {
            display: grid;
            grid-template-columns: 308px 1fr;
          }

          .dondeEstoy {
            display: flex;
            align-items: center;
            padding-left: 20px;
            height: 40px;
            font-size: 13px;
            box-sizing: border-box;
            color: #505050;
          }

          .dondeEstoy p {
            margin: 0 5px;
            color: #4c4c4c;
          }

          .dondeEstoy span {
            color: #4c4c4c;
          }

          .link {
            margin: 0 5px;
            text-decoration: none;
            color: #4c4c4c;
          }

          .link:hover {
            text-decoration: underline;
          }
        `}</style>
      </Layout>
    )
  }
}
