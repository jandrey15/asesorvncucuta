import React, { Component } from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ListEntradas from '../components/ListEntradas'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import MenuLocation from '../components/MenuLocation'

export default class Home extends Component {
  static async getInitialProps ({ res, query }) {
    const word = query.as_word
    let search
    // console.log(word)
    if (word !== '') {
      search = `search=${word}&orderby=relevance`
    }
    try {
      // http://api.docker.test/wp-json/wp/v2/posts?search=prueba&orderby=relevance
      // http://api.docker.test/wp-json/wp/v2/posts?search=prueba&orderby=relevance&color=59
      let [reqEntradas, reqNews] = await Promise.all([
        fetch(
          `http://api.docker.test/wp-json/wp/v2/posts?${search}&sticky=false&per_page=15&status=publish&_embed`
        ),
        fetch(
          'http://api.docker.test/wp-json/wp/v2/articulo?sticky=false&per_page=3&status=publish&_embed'
        )
      ])

      if (reqEntradas.status >= 400) {
        res.statusCode = reqEntradas.status
        return {
          entradas: [],
          news: [],
          statusCode: reqEntradas.status
        }
      }

      let entradas = await reqEntradas.json()
      let news = await reqNews.json()

      return {
        entradas,
        news,
        statusCode: 200
      }
    } catch (err) {
      res.statusCode = 503
      return {
        entradas: [],
        news: [],
        statusCode: 503
      }
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
      <Layout title='Asesorvncucuta'>
        <section id='Home'>
          <div className='dondeEstoy container'>
            <span>Estoy en:</span>
            <MenuLocation entradas={entradas} />
          </div>
          <div id='Entradas' className='container'>
            <div className='column'>
              <Filter />
              <ArticlesColumn news={news} />
            </div>
            {entradas.length > 0 ? (
              <ListEntradas entradas={entradas} auto='auto-fill' />
            ) : (
              <div className='message'>
                <h3>No se encontraron vehículos</h3>
              </div>
            )}
          </div>
        </section>
        <style jsx>{`
          #Entradas {
            display: grid;
            grid-template-columns: 308px 1fr;
          }

          .item {
            display: flex;
          }

          .message {
            color: #2e2e2e;
            font-size: 1.2rem;
            font-weight: 600;
            display: flex;
            justify-content: center;
          }

          .message h3 {
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
