import React, { Component } from 'react'
import Layout from '../components/Layout'
import SlideShow from '../components/SlideShow'

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

    return (
      <Layout title={entrada.title.rendered}>
        <div className='dondeEstoy container'>
          <span>Estoy en:</span> <p>carros nuevos</p>
        </div>
        <article id='Entrada' className='container'>
          <SlideShow entradas={galeria} type='galeria' />
          <h1 className='title'>{entrada.title.rendered}</h1>
          <div
            className='text'
            dangerouslySetInnerHTML={{ __html: entrada.content.rendered }}
          />
        </article>
        <style jsx>{`
          #Entrada {
            display: grid;
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
        `}</style>
      </Layout>
    )
  }
}
