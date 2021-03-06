import React, { Component } from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import ListEntradas from '../components/ListEntradas'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import MenuLocation from '../components/MenuLocation'
import Error from './_error'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const { API_URL } = publicRuntimeConfig

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
    let minPrecio = '0'
    let maxPrecio = '0'

    let search
    // console.log(word)
    // console.log(query)

    try {
      if (word) {
        if (
          word.indexOf('pricerange') !== -1 &&
          word.indexOf('min') !== -1 &&
          word.indexOf('max') !== -1
        ) {
          let arrayWord = word.split('_')
          if (arrayWord.length > 1) {
            minPrecio = arrayWord[6] || '0'
            maxPrecio = arrayWord[7] || '0'
          } else if (arrayWord[7] !== '0') {
            maxPrecio = arrayWord[7] || '0'
          } else {
            minPrecio = arrayWord[6] || '0'
          }
        } else if (
          (word.indexOf('pricerange') !== -1 && word.indexOf('min') !== -1) ||
          word.indexOf('max') !== -1
        ) {
          let arrayWord = word.split('_')
          if (arrayWord.length > 1) {
            minPrecio = arrayWord[4] || '0'
            maxPrecio = arrayWord[5] || '0'
          } else if (arrayWord[5] !== '0') {
            maxPrecio = arrayWord[5] || '0'
          } else {
            minPrecio = arrayWord[4] || '0'
          }
        }

        if (word.indexOf('min') !== -1 || word.indexOf('max') !== -1) {
          let arrayWord = word.split('_')
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
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${arrayWord[0]}`)
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          // console.log(idCondicion)

          search = `condicion=${idCondicion}`
        } else if (word.indexOf('pricerange') !== -1) {
          let arrayWord = word.split('_')
          if (arrayWord.length > 1) {
            minPrecio = arrayWord[2] || '0'
            maxPrecio = arrayWord[3] || '0'
          } else if (arrayWord[3] !== '0') {
            maxPrecio = arrayWord[3] || '0'
          } else {
            minPrecio = arrayWord[2] || '0'
          }
          let [reqCondicion] = await Promise.all([
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${arrayWord[0]}`)
          ])
          let [{ id: idCondicion }] = await reqCondicion.json()
          // console.log(idCondicion)
          search = `condicion=${idCondicion}`
        } else if (word !== 'nuevo' && word !== 'usado') {
          search = `search=${word}&orderby=relevance`
        } else {
          let [reqCondicion] = await Promise.all([
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${word}`)
          ])
          let [{ id: idCondicion }] = await reqCondicion.json()
          // console.log(idCondicion)
          search = `condicion=${idCondicion}`
        }
      }

      if (condicion) {
        if (
          condicion.indexOf('pricerange') !== -1 &&
          condicion.indexOf('min') !== -1 &&
          condicion.indexOf('max') !== -1
        ) {
          let arrayCondicion = condicion.split('_')
          if (arrayCondicion.length > 1) {
            minPrecio = arrayCondicion[6] || '0'
            maxPrecio = arrayCondicion[7] || '0'
          } else if (arrayCondicion[7] !== '0') {
            maxPrecio = arrayCondicion[7] || '0'
          } else {
            minPrecio = arrayCondicion[6] || '0'
          }
        } else if (
          (condicion.indexOf('pricerange') !== -1 &&
            condicion.indexOf('min') !== -1) ||
          condicion.indexOf('max') !== -1
        ) {
          let arrayCondicion = condicion.split('_')
          if (arrayCondicion.length > 1) {
            minPrecio = arrayCondicion[4] || '0'
            maxPrecio = arrayCondicion[5] || '0'
          } else if (arrayCondicion[5] !== '0') {
            maxPrecio = arrayCondicion[5] || '0'
          } else {
            minPrecio = arrayCondicion[4] || '0'
          }
        }

        if (
          condicion.indexOf('min') !== -1 ||
          condicion.indexOf('max') !== -1
        ) {
          let arrayCondicion = condicion.split('_')
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

        if (condicion.indexOf('pricerange') !== -1) {
          let arrayCondicion = condicion.split('_')

          if (arrayCondicion.length > 1) {
            minPrecio = arrayCondicion[2] || '0'
            maxPrecio = arrayCondicion[3] || '0'
          } else if (arrayCondicion[3] !== '0') {
            maxPrecio = arrayCondicion[3] || '0'
          } else {
            minPrecio = arrayCondicion[2] || '0'
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
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${modelo}`),
            fetch(`${API_URL}/wp-json/wp/v2/color?slug=${color}`),
            fetch(`${API_URL}/wp-json/wp/v2/ciudades?slug=${ciudad}`)
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
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${modelo}`),
            fetch(`${API_URL}/wp-json/wp/v2/color?slug=${colorCiudad}`),
            fetch(`${API_URL}/wp-json/wp/v2/ciudades?slug=${colorCiudad}`)
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
              fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
              fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${marca}`),
              fetch(`${API_URL}/wp-json/wp/v2/color?slug=${colorCiudad}`),
              fetch(`${API_URL}/wp-json/wp/v2/ciudades?slug=${colorCiudad}`)
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
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${modelo}`)
          ])

          let [{ id: idCondicion }] = await reqCondicion.json()
          let [{ id: idMarca }] = await reqMarca.json()
          let [{ id: idModelo }] = await reqModelo.json()

          search = `condicion=${idCondicion}&marcas=${idMarca}&marcas=${idModelo}`
        } else if (marca !== 'null' && color !== 'null') {
          let [reqCondicion, reqMarca, reqColor] = await Promise.all([
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${marca}`),
            fetch(`${API_URL}/wp-json/wp/v2/color?slug=${color}`)
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
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
            fetch(`${API_URL}/wp-json/wp/v2/color?slug=${color}`),
            fetch(`${API_URL}/wp-json/wp/v2/ciudades?slug=${ciudad}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${modelo}`)
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
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
            fetch(`${API_URL}/wp-json/wp/v2/color?slug=${anyThing}`),
            fetch(`${API_URL}/wp-json/wp/v2/ciudades?slug=${anyThing}`),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${modelo}`)
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
              fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
              fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${marca}`)
            ])

            let [{ id: idCondicion }] = await reqCondicion.json()
            let [{ id: idMarca }] = await reqMarca.json()

            search = `condicion=${idCondicion}&marcas=${idMarca}`
          } else {
            let [reqCondicion, reqModelo] = await Promise.all([
              fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
              fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${modelo}`)
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
            fetch(`${API_URL}/wp-json/wp/v2/condicion?slug=${condicion}`),
            fetch(
              `${API_URL}/wp-json/wp/v2/color?slug=${
                arrayAnyThing.length > 1 ? arrayAnyThing[1] : anyThing
              }`
            ),
            fetch(
              `${API_URL}/wp-json/wp/v2/ciudades?slug=${
                arrayAnyThing.length > 1 ? arrayAnyThing[0] : anyThing
              }`
            ),
            fetch(`${API_URL}/wp-json/wp/v2/marcas?slug=${anyThing}`)
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
      // ${API_URL}/wp-json/wp/v2/posts?search=prueba&orderby=relevance
      // ${API_URL}/wp-json/wp/v2/posts?search=prueba&orderby=relevance&color=59
      let [reqEntradas, reqNews] = await Promise.all([
        fetch(
          `${API_URL}/wp-json/wp/v2/posts?${search}&sticky=false&per_page=15&status=publish&_embed`
        ),
        fetch(
          `${API_URL}/wp-json/wp/v2/articulo?sticky=false&per_page=3&status=publish&_embed`
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
        (minPrecio !== '0' && maxPrecio !== '0') ||
        minPrecio !== '0' ||
        maxPrecio !== '0'
      ) {
        entradas = entradas.reduce((accumulator, item) => {
          let precio = item.precio
          if (minPrecio !== '0' && maxPrecio !== '0') {
            if (
              parseInt(minPrecio) <= precio &&
              precio <= parseInt(maxPrecio)
            ) {
              // console.log(num)
              accumulator.push(item)
            }
          } else if (minPrecio !== '0') {
            if (parseInt(minPrecio) <= precio) {
              // console.log(num)
              accumulator.push(item)
            }
          } else if (maxPrecio !== '0') {
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

    let searching = true

    return (
      <Layout searching={searching}>
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
