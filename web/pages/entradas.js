import React, { Component } from 'react'
import ListEntradas from '../components/ListEntradas'
import Layout from '../components/Layout'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import MenuLocationEntradas from '../components/MenuLocationEntradas'

export default class Entradas extends Component {
  static async getInitialProps ({ res, query }) {
    let taxonomy
    const name = query.name
    // console.log(query)

    if (query.condicion) {
      taxonomy = `condicion=${query.condicion}`
    } else if (query.marca) {
      taxonomy = `marcas=${query.marca}`
    } else if (query.categoria) {
      taxonomy = `categories=${query.categoria}`
    } else if (query.modelo) {
      taxonomy = `marcas=${query.modelo}`
    }

    try {
      let [req, reqNews] = await Promise.all([
        fetch(
          `http://api.docker.test/wp-json/wp/v2/posts?${taxonomy}&sticky=false&per_page=20&_embed`
        ),
        fetch(
          'http://api.docker.test/wp-json/wp/v2/articulo?sticky=false&per_page=3&status=publish&_embed'
        )
      ])

      let entradas = await req.json()
      let news = await reqNews.json()

      return { entradas, news, name, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { entradas: [], news: [], name: null, statusCode: 503 }
    }
  }

  render () {
    const { entradas, news, name, statusCode } = this.props
    // console.log(entradas)

    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }

    return (
      <Layout
        title={`${name.charAt(0).toUpperCase()}${name.slice(
          1
        )} - Asesorvncucuta`}
      >
        <div className='dondeEstoy container'>
          <span>Estoy en:</span>
          <MenuLocationEntradas entradas={entradas} name={name} />
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

          .item {
            display: flex;
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