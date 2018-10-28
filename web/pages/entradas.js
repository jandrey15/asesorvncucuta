import React, { Component } from 'react'
import ListEntradas from '../components/ListEntradas'
import Layout from '../components/Layout'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import MenuLocationEntradas from '../components/MenuLocationEntradas'
import Error from './_error'

export default class Entradas extends Component {
  static async getInitialProps ({ res, query }) {
    let taxonomy
    const name = query.slug
    const categoria = query.slugCondicion
    // console.log(query)

    try {
      if (categoria === 'nuevos' || categoria === 'usados') {
        let condicion
        categoria === 'nuevos' ? (condicion = 'nuevo') : (condicion = 'usado')

        let reqSlug = await fetch(
          `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
        )
        let [{ id }] = await reqSlug.json()
        taxonomy = `condicion=${id}`
      } else if (name || query.slugModelo) {
        let marcas
        if (query.slugModelo) {
          marcas = `slug=${query.slugModelo}`
        } else {
          marcas = `slug=${name}`
        }

        let [reqSlug, reqSlugCategoria] = await Promise.all([
          fetch(`http://api.docker.test/wp-json/wp/v2/marcas?${marcas}`),
          fetch(
            `http://api.docker.test/wp-json/wp/v2/categories?slug=${categoria}`
          )
        ])

        let [{ id }] = await reqSlug.json()
        let [{ id: idCategoria }] = await reqSlugCategoria.json()

        taxonomy = `marcas=${id}&categories=${idCategoria}`
      } else if (categoria) {
        let reqSlug = await fetch(
          `http://api.docker.test/wp-json/wp/v2/categories?slug=${categoria}`
        )
        let [{ id }] = await reqSlug.json()
        taxonomy = `categories=${id}`
      }

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

      if (entradas === undefined) {
        return { entrada: null, news: [], name: null, statusCode: 404 }
      }

      return { entradas, news, name, statusCode: 200 }
    } catch (err) {
      // console.log(err.message)
      if (err.message === `Cannot read property 'id' of undefined`) {
        return { entradas: null, news: [], name: null, statusCode: 404 }
      }
      res.statusCode = 503
      return { entradas: [], news: [], name: null, statusCode: 503 }
    }
  }

  render () {
    const { entradas, news, name, statusCode } = this.props
    // console.log(entradas)

    if (statusCode !== 200) {
      // console.log('error...')
      return <Error statusCode={statusCode} />
    }
    let title = 'Vehículos'

    if (name) {
      title = name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
      <Layout
        SEO={{
          title: `${title} - Asesorvncucuta`,
          titleOpenGraph: `${title}`
        }}
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

          @media screen and (max-width: 1024px) {
            #Entradas {
              grid-template-columns: 1fr;
            }

            .column {
              display: none;
            }
          }

          @media screen and (max-width: 380px) {
            .dondeEstoy {
              padding: 20px 0;
              height: auto;
              background-color: #f1f1f1;
              justify-content: center;
            }

            .dondeEstoy span {
              display: none;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
