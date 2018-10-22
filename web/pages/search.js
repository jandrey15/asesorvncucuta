import React, { Component } from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ListEntradas from '../components/ListEntradas'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import MenuLocation from '../components/MenuLocation'

export default class Search extends Component {
  static async getInitialProps ({ res, query }) {
    const word = query.slug
    const condicion = query.slugCondicion
    const marca = query.slugMarca
    const modelo = query.slugModelo
    const ciudad = query.ciudad || 'null'
    const color = query.color || 'null'
    const minAno = query.minAno || 'null'
    const maxAno = query.maxAno || 'null'
    const minPrecio = query.minPrecio || 'null'
    const maxPrecio = query.maxPrecio || 'null'

    let search
    console.log(word)
    // console.log(query)
    if (word) {
      search = `search=${word}&orderby=relevance`
    }

    if (condicion) {
      if (
        condicion &&
        marca !== '0' &&
        modelo !== 'null' &&
        ciudad !== 'null' &&
        color !== 'null'
      ) {
        search = `condicion=${condicion}&marcas=${marca}&marcas=${modelo}&ciudades=${ciudad}&color=${color}`
      } else if (
        condicion &&
        marca !== '0' &&
        modelo !== 'null' &&
        ciudad !== 'null'
      ) {
        search = `condicion=${condicion}&marcas=${marca}&marcas=${modelo}&ciudades=${ciudad}`
      } else if (condicion && marca !== '0' && modelo !== 'null') {
        search = `condicion=${condicion}&marcas=${marca}&marcas=${modelo}`
      } else if (condicion && marca !== '0' && color !== 'null') {
        search = `condicion=${condicion}&marcas=${marca}&color=${color}`
      } else if (
        (condicion && marca !== '0') ||
        (condicion && modelo !== 'null')
      ) {
        search = `condicion=${condicion}&marcas=${
          marca !== '0' ? marca : modelo
        }`
      } else if (condicion && ciudad !== 'null') {
        search = `condicion=${condicion}&ciudades=${ciudad}`
      } else if (condicion && color !== 'null') {
        search = `condicion=${condicion}&color=${color}`
      } else {
        search = `condicion=${condicion}`
      }
    }
    console.log(search)

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
          numRandom: null,
          statusCode: reqEntradas.status
        }
      }

      let entradas = await reqEntradas.json()
      let news = await reqNews.json()

      if (
        (minAno !== 'null' && maxAno !== 'null') ||
        minAno !== 'null' ||
        maxAno !== 'null'
      ) {
        entradas = entradas.reduce((accumulator, item) => {
          // console.log(item._embedded['wp:term'][3][0])
          if (item._embedded['wp:term'][3][0]) {
            let num = parseInt(item._embedded['wp:term'][3][0].name)
            // console.log(num) // 2016, 2018 - 2017 y 2019
            if (minAno !== 'null' && maxAno !== 'null') {
              if (parseInt(minAno) <= num && num <= parseInt(maxAno)) {
                // console.log(num)
                accumulator.push(item)
              }
            } else if (minAno !== 'null') {
              if (parseInt(minAno) <= num) {
                // console.log(num)
                accumulator.push(item)
              }
            } else {
              if (num <= parseInt(maxAno)) {
                // console.log(num)
                accumulator.push(item)
              }
            }
          }
          // console.log(accumulator)
          return accumulator
        }, [])
      }

      if (
        (minPrecio !== 'null' && maxPrecio !== 'null') ||
        minPrecio !== 'null' ||
        maxPrecio !== 'null'
      ) {
        entradas = entradas.reduce((accumulator, item) => {
          let precio = item.precio
          if (minPrecio !== 'null' && maxPrecio !== 'null') {
            if (
              parseInt(minPrecio) <= precio &&
              precio <= parseInt(maxPrecio)
            ) {
              // console.log(num)
              accumulator.push(item)
            }
          } else if (minPrecio !== 'null') {
            if (parseInt(minPrecio) <= precio) {
              // console.log(num)
              accumulator.push(item)
            }
          } else if (maxPrecio !== 'null') {
            if (precio <= parseInt(maxPrecio)) {
              // console.log(num)
              accumulator.push(item)
            }
          }
          // console.log(accumulator)
          return accumulator
        }, [])
      }

      const numRandom = Math.floor(Math.random() * (entradas.length - 0) + 0)

      return {
        entradas,
        news,
        numRandom,
        statusCode: 200
      }
    } catch (err) {
      res.statusCode = 503
      return {
        entradas: [],
        news: [],
        numRandom: null,
        statusCode: 503
      }
    }
  }

  render () {
    const { entradas, news, numRandom, statusCode } = this.props
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
            <MenuLocation entradas={entradas} numRandom={numRandom} />
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
