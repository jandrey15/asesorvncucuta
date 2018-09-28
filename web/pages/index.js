import React, { Component } from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import SlideShow from '../components/SlideShow'
import ListEntradas from '../components/ListEntradas'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import homeStyle from './homeStyle'

export default class Home extends Component {
  static async getInitialProps ({ res }) {
    try {
      let [reqEntradas, reqSlide, reqNews] = await Promise.all([
        fetch('http://api.docker.test/wp-json/wp/v2/posts?sticky=false&_embed'),
        fetch('http://api.docker.test/wp-json/wp/v2/posts?sticky=true&_embed'),
        fetch(
          'http://api.docker.test/wp-json/wp/v2/articulo?sticky=false&_embed'
        )
      ])

      if (reqEntradas.status >= 400) {
        res.statusCode = reqEntradas.status
        return {
          entradas: [],
          entradasSlides: [],
          news: [],
          statusCode: reqEntradas.status
        }
      }

      let entradas = await reqEntradas.json()
      let entradasSlides = await reqSlide.json()
      let news = await reqNews.json()

      return { entradas, entradasSlides, news, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { entradas: [], statusCode: 503 }
    }
  }

  render () {
    const { entradas, entradasSlides, news, statusCode } = this.props
    // console.log(entradas)

    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }

    return (
      <Layout title='Home'>
        <section id='Home'>
          <div className='dondeEstoy container'>
            <span>Estoy en:</span> <p>carros nuevos</p>
          </div>
          <div id='sectionPrincipal' className='container'>
            <div className='column'>
              <Filter />
              <ArticlesColumn news={news} />
            </div>
            <SlideShow entradas={entradasSlides} />
            <ListEntradas entradas={entradas} />
          </div>
          <div id='masPubliciones'>
            <h5>Mas publicaciones</h5>
          </div>
        </section>
        <style jsx>{homeStyle}</style>
      </Layout>
    )
  }
}
