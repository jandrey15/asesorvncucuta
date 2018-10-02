import React, { Component } from 'react'
import Layout from '../components/Layout'
import SlideShow from '../components/SlideShow'
import Link from 'next/link'

export default class Entrada extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name

    try {
      // let req = await fetch('https://api.audioboom.com/channels/recommended')
      // http://api.docker.test/wp-json/acf/v3/pages/POST_ID/galeria?type=photo_gallery
      let req = await fetch(
        `http://api.docker.test/wp-json/wp/v2/posts?slug=${name}&_embed`
      )
      let [entrada] = await req.json()

      let reqGaleria = await fetch(
        `http://api.docker.test/wp-json/acf/v3/pages/${
          entrada.id
        }/galeria?type=photo_gallery`
      )

      let galeria = await reqGaleria.json()

      return { entrada, galeria, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { entrada: null, galeria: [], statusCode: 503 }
    }
  }

  render () {
    const { entrada, galeria, statusCode } = this.props
    // console.log(entrada)
    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }

    const formatNumber = {
      separador: '.', // separador para los miles
      sepDecimal: ',', // separador para los decimales
      formatear: function (num) {
        num += ''
        let splitStr = num.split('.')
        let splitLeft = splitStr[0]
        let splitRight =
          splitStr.length > 1 ? this.sepDecimal + splitStr[1] : ''
        let regx = /(\d+)(\d{3})/
        while (regx.test(splitLeft)) {
          splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2')
        }
        return this.simbol + splitLeft + splitRight
      },
      new: function (num, simbol) {
        this.simbol = simbol || ''
        return this.formatear(num)
      }
    }

    return (
      <Layout title={entrada.title.rendered}>
        <div className='dondeEstoy container'>
          <Link href='/'>
            <a className='listado'>
              <span>Volver al listado: </span>
            </a>
          </Link>
          <p>carros nuevos</p>
        </div>
        <article id='Entrada' className='container'>
          <div className='content'>
            <SlideShow entradas={galeria} type='galeria' />
            <div className='info'>
              <h2 className='price'>${formatNumber.new(entrada.precio)}</h2>
              <h1 className='title'>{entrada.title.rendered}</h1>

              <p className='kilo'>
                {entrada._embedded['wp:term'][3][0]
                  ? entrada._embedded['wp:term'][3][0].name
                  : '0'}{' '}
                - {formatNumber.new(entrada.recorrido)} km
              </p>
              <aside className='location'>
                <i className='icon' />
                El carro esta en{' '}
                {entrada._embedded['wp:term'][6][0]
                  ? entrada._embedded['wp:term'][6][0].name
                  : null}
              </aside>
              <hr />
              <h3>Información del {entrada.tipo}</h3>
            </div>
          </div>
          <div
            className='text'
            dangerouslySetInnerHTML={{ __html: entrada.content.rendered }}
          />
        </article>
        <style jsx>{`
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

          .listado {
            color: #4c4c4c;
            text-decoration: none;
          }

          .listado:hover {
            text-decoration: underline;
          }

          .content {
            display: grid;
            grid-template-columns: 885px 300px;
            grid-gap: 0 15px;
          }

          .info {
            background-color: #f7f7f7;
            padding: 25px 15px;
          }

          h2 {
            font-size: 36px;
            font-weight: 600;
            margin: 0 0 20px;
            text-align: center;
          }

          h1 {
            font-size: 24px;
            font-weight: 400;
            margin: 0;
          }
        `}</style>
      </Layout>
    )
  }
}
