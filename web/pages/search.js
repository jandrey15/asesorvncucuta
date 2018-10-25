import React, { Component } from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ListEntradas from '../components/ListEntradas'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import MenuLocation from '../components/MenuLocation'
import Error from './_error'

export default class Search extends Component {
  static async getInitialProps ({ res, query }) {
    let word = query.slug
    let condicion = query.slugCondicion
    const marca = query.slugMarca || 'null'
    const modelo = query.slugModelo || 'null'
    const ciudad = query.slugCiudad || 'null'
    const color = query.slugColor || 'null'
    const colorCiudad = query.slugColorCiudad || 'null'
    const anyThing = query.slugAnything || 'null'

    let minAno = 'null'
    let maxAno = 'null'
    const minPrecio = query.minPrecio || 'null'
    const maxPrecio = query.maxPrecio || 'null'

    let search
    // console.log(word)
    console.log(query)

    if (word) {
      if (word.indexOf('min') !== -1 || word.indexOf('max') !== -1) {
        let arrayWord = word.split('-')
        // console.log(arrayWord)

        if (arrayWord.length > 3) {
          minAno = arrayWord[2] || 'null'
          maxAno = arrayWord[4] || 'null'
        } else if (arrayWord[1] === 'max') {
          maxAno = arrayWord[2] || 'null'
        } else {
          minAno = arrayWord[2] || 'null'
        }

        let [reqCondicion] = await Promise.all([
          fetch(
            `http://api.docker.test/wp-json/wp/v2/condicion?slug=${arrayWord[0]}`
          )
        ])

        let [{ id: idCondicion }] = await reqCondicion.json()
        // console.log(idCondicion)

        search = `condicion=${idCondicion}`
      } else if (word !== 'nuevo' && word !== 'usado') {
        search = `search=${word}&orderby=relevance`
      } else {
        let [reqCondicion] = await Promise.all([
          fetch(`http://api.docker.test/wp-json/wp/v2/condicion?slug=${word}`)
        ])
        let [{ id: idCondicion }] = await reqCondicion.json()
        // console.log(idCondicion)
        search = `condicion=${idCondicion}`
      }
    }

    try {
      if (condicion) {
        if (condicion.indexOf('min') !== -1 || condicion.indexOf('max') !== -1) {
          let arrayCondicion = condicion.split('-')
          if (arrayCondicion.length > 3) {
            minAno = arrayCondicion[2] || 'null'
            maxAno = arrayCondicion[4] || 'null'
          } else if (arrayCondicion[1] === 'max') {
            maxAno = arrayCondicion[2] || 'null'
          } else {
            minAno = arrayCondicion[2] || 'null'
          }
          condicion = arrayCondicion[0]
        }

        if (
          marca !== 'null' &&
          modelo !== 'null' &&
          ciudad !== 'null' &&
          color !== 'null'
        ) {
          let [
            reqCondicion,
            reqMarca,
            reqModelo,
            reqColor,
            reqCiudad
          ] = await Promise.all([
            fetch(
              `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
            ),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${modelo}`),
            fetch(`http://api.docker.test/wp-json/wp/v2/color?slug=${color}`),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/ciudades?slug=${ciudad}`
            )
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idMarca }] = await reqMarca.json()
          let [{ id: idModelo }] = await reqModelo.json()
          let [{ id: idColor }] = await reqColor.json()
          let [{ id: idCiudad }] = await reqCiudad.json()

          search = `condicion=${idCondicion}&marcas=${idMarca}&marcas=${idModelo}&ciudades=${idCiudad}&color=${idColor}`
        } else if (
          marca !== 'null' &&
          modelo !== 'null' &&
          colorCiudad !== 'null'
        ) {
          let [
            reqCondicion,
            reqMarca,
            reqModelo,
            reqColor,
            reqCiudad
          ] = await Promise.all([
            fetch(
              `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
            ),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${modelo}`),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/color?slug=${colorCiudad}`
            ),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/ciudades?slug=${colorCiudad}`
            )
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idMarca }] = await reqMarca.json()
          let [{ id: idModelo }] = await reqModelo.json()
          let ciudad = await reqCiudad.json()
          let color = await reqColor.json()

          if (ciudad.length > 0) {
            search = `condicion=${idCondicion}&marcas=${idMarca}&marcas=${idModelo}&ciudades=${
              ciudad[0].id
            }`
          } else {
            search = `condicion=${idCondicion}&marcas=${idMarca}&marcas=${idModelo}&color=${
              color[0].id
            }`
          }
        } else if (marca !== 'null' && colorCiudad !== 'null') {
          let [reqCondicion, reqMarca, reqColor, reqCiudad] = await Promise.all(
            [
              fetch(
                `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
              ),
              fetch(
                `http://api.docker.test/wp-json/wp/v2/marcas?slug=${marca}`
              ),
              fetch(
                `http://api.docker.test/wp-json/wp/v2/color?slug=${colorCiudad}`
              ),
              fetch(
                `http://api.docker.test/wp-json/wp/v2/ciudades?slug=${colorCiudad}`
              )
            ]
          )

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idMarca }] = await reqMarca.json()
          let ciudad = await reqCiudad.json()
          let color = await reqColor.json()

          if (ciudad.length > 0) {
            search = `condicion=${idCondicion}&marcas=${idMarca}&ciudades=${
              ciudad[0].id
            }`
          } else {
            search = `condicion=${idCondicion}&marcas=${idMarca}&color=${
              color[0].id
            }`
          }
        } else if (marca !== 'null' && modelo !== 'null') {
          let [reqCondicion, reqMarca, reqModelo] = await Promise.all([
            fetch(
              `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
            ),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${modelo}`)
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idMarca }] = await reqMarca.json()
          let [{ id: idModelo }] = await reqModelo.json()

          search = `condicion=${idCondicion}&marcas=${idMarca}&marcas=${idModelo}`
        } else if (marca !== 'null' && color !== 'null') {
          let [reqCondicion, reqMarca, reqColor] = await Promise.all([
            fetch(
              `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
            ),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`http://api.docker.test/wp-json/wp/v2/color?slug=${color}`)
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idMarca }] = await reqMarca.json()
          let [{ id: idColor }] = await reqColor.json()

          search = `condicion=${idCondicion}&marcas=${idMarca}&color=${idColor}`
        } else if (modelo !== 'null' && ciudad !== 'null' && color !== 'null') {
          let [
            reqCondicion,
            reqColor,
            reqCiudad,
            reqModelo
          ] = await Promise.all([
            fetch(
              `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
            ),
            fetch(`http://api.docker.test/wp-json/wp/v2/color?slug=${color}`),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/ciudades?slug=${ciudad}`
            ),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${modelo}`)
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idModelo }] = await reqModelo.json()
          let [{ id: idCiudad }] = await reqCiudad.json()
          let [{ id: idColor }] = await reqColor.json()

          search = `condicion=${idCondicion}&color=${idColor}&ciudades=${idCiudad}&marcas=${idModelo}`
        } else if (modelo !== 'null' && anyThing !== 'null') {
          let [
            reqCondicion,
            reqColor,
            reqCiudad,
            reqModelo
          ] = await Promise.all([
            fetch(
              `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
            ),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/color?slug=${anyThing}`
            ),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/ciudades?slug=${anyThing}`
            ),
            fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${modelo}`)
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idModelo }] = await reqModelo.json()
          let ciudad = await reqCiudad.json()
          let color = await reqColor.json()

          if (ciudad.length > 0) {
            search = `condicion=${idCondicion}&ciudades=${
              ciudad[0].id
            }&marcas=${idModelo}`
          } else {
            search = `condicion=${idCondicion}&color=${
              color[0].id
            }&marcas=${idModelo}`
          }
        } else if (marca !== 'null' || modelo !== 'null') {
          if (marca !== 'null') {
            let [reqCondicion, reqMarca] = await Promise.all([
              fetch(
                `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
              ),
              fetch(`http://api.docker.test/wp-json/wp/v2/marcas?slug=${marca}`)
            ])

            let [{ id: idCondicion }] = await reqCondicion.json()
            let [{ id: idMarca }] = await reqMarca.json()

            search = `condicion=${idCondicion}&marcas=${idMarca}`
          } else {
            let [reqCondicion, reqModelo] = await Promise.all([
              fetch(
                `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
              ),
              fetch(
                `http://api.docker.test/wp-json/wp/v2/marcas?slug=${modelo}`
              )
            ])

            let [{ id: idCondicion }] = await reqCondicion.json()
            let [{ id: idModelo }] = await reqModelo.json()

            search = `condicion=${idCondicion}&marcas=${idModelo}`
          }
        } else if (anyThing !== 'null') {
          const arrayAnyThing = anyThing.split('-')
          // console.log(arrayAnyThing)
          let [
            reqCondicion,
            reqColor,
            reqCiudad,
            reqModelo
          ] = await Promise.all([
            fetch(
              `http://api.docker.test/wp-json/wp/v2/condicion?slug=${condicion}`
            ),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/color?slug=${
                arrayAnyThing.length > 1 ? arrayAnyThing[1] : anyThing
              }`
            ),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/ciudades?slug=${
                arrayAnyThing.length > 1 ? arrayAnyThing[0] : anyThing
              }`
            ),
            fetch(
              `http://api.docker.test/wp-json/wp/v2/marcas?slug=${anyThing}`
            )
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let color = await reqColor.json()
          let ciudad = await reqCiudad.json()
          let modelo = await reqModelo.json()

          if (color.length > 0 && ciudad.length > 0) {
            search = `condicion=${idCondicion}&color=${color[0].id}&ciudades=${
              ciudad[0].id
            }`
          } else if (color.length > 0) {
            search = `condicion=${idCondicion}&color=${color[0].id}`
          } else if (ciudad.length > 0) {
            search = `condicion=${idCondicion}&ciudades=${ciudad[0].id}`
          } else {
            search = `condicion=${idCondicion}&marcas=${modelo[0].id}`
          }
        }
      }

      // console.log(search)
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
      if (err.message === `Cannot read property 'id' of undefined`) {
        return { entradas: null, news: [], name: null, statusCode: 404 }
      }
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
      // console.log('error...')
      return <Error statusCode={statusCode} />
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
