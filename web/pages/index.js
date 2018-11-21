import React, { Component } from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import SlideShow from '../components/SlideShow'
import ListEntradas from '../components/ListEntradas'
import Filter from '../components/Filter'
import ArticlesColumn from '../components/ArticlesColumn'
import homeStyle from './homeStyle'
import MorePosts from '../components/MorePosts'
import MenuLocation from '../components/MenuLocation'
import Error from './_error'
import TrackVisibility from 'react-on-screen'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const { API_URL } = publicRuntimeConfig

export default class Home extends Component {
  static async getInitialProps ({ res }) {
    try {
      // http://api.docker.test/wp-json/wp/v2/posts?search=prueba&orderby=relevance
      // http://api.docker.test/wp-json/wp/v2/posts?search=prueba&orderby=relevance&color=59
      let [
        reqEntradas,
        reqSlide,
        reqNews,
        reqPostsNew,
        reqPostsused
      ] = await Promise.all([
        fetch(
          `${API_URL}/wp-json/wp/v2/posts?sticky=false&per_page=15&status=publish&_embed`
        ),
        fetch(
          `${API_URL}/wp-json/wp/v2/posts?sticky=true&per_page=5&status=publish&_embed`
        ),
        fetch(
          `${API_URL}/wp-json/wp/v2/articulo?sticky=false&per_page=3&status=publish&_embed`
        ),
        fetch(
          `${API_URL}/wp-json/wp/v2/posts?sticky=false&condicion=54&per_page=5&status=publish&_embed`
        ),
        fetch(
          `${API_URL}/wp-json/wp/v2/posts?sticky=false&condicion=55&per_page=5&status=publish&_embed`
        )
      ])

      if (reqEntradas.status >= 400) {
        res.statusCode = reqEntradas.status
        return {
          entradas: [],
          entradasSlides: [],
          news: [],
          postsNew: [],
          postsUsed: [],
          numRandom: null,
          statusCode: reqEntradas.status
        }
      }

      let entradas = await reqEntradas.json()
      let entradasSlides = await reqSlide.json()
      let news = await reqNews.json()
      let postsNew = await reqPostsNew.json()
      let postsUsed = await reqPostsused.json()

      const numRandom = Math.floor(Math.random() * (entradas.length - 0) + 0)

      return {
        entradas,
        entradasSlides,
        news,
        postsNew,
        postsUsed,
        numRandom,
        statusCode: 200
      }
    } catch (err) {
      res.statusCode = 503
      const numRandom = null
      return {
        entradas: [],
        entradasSlides: [],
        news: [],
        postsNew: [],
        postsUsed: [],
        numRandom,
        statusCode: 503
      }
    }
  }

  render () {
    const {
      entradas,
      entradasSlides,
      news,
      postsNew,
      postsUsed,
      numRandom,
      statusCode
    } = this.props
    // console.log(entradas)

    if (statusCode !== 200) {
      // console.log('error...')
      return <Error statusCode={statusCode} />
    }

    return (
      <Layout>
        <section id='Home'>
          <div className='dondeEstoy container'>
            <span>Estoy en:</span>
            <MenuLocation entradas={entradas} numRandom={numRandom} />
          </div>
          <div id='sectionPrincipal' className='container'>
            <div className='column'>
              <TrackVisibility once partialVisibility>
                {({ isVisible }) => <Filter />}
              </TrackVisibility>
              <ArticlesColumn news={news} />
            </div>
            <div className='columnRight'>
              <SlideShow entradas={entradasSlides} />
              <ListEntradas entradas={entradas} />
            </div>
          </div>
          <div id='MorePosts' className='container'>
            {postsNew.length > 0 && (
              <div id='postsNews'>
                <h3>Publicaciones destacadas de carros nuevos</h3>
                <hr />
                <TrackVisibility once throttleInterval={100}>
                  {({ isVisible }) =>
                    isVisible && <MorePosts posts={postsNew} />
                  }
                </TrackVisibility>
              </div>
            )}

            {postsUsed.length > 0 && (
              <div id='postsUsed'>
                <h3>Publicaciones destacadas de carros usados</h3>
                <hr />
                <TrackVisibility once throttleInterval={50}>
                  {({ isVisible }) =>
                    isVisible && <MorePosts posts={postsUsed} />
                  }
                </TrackVisibility>
              </div>
            )}
          </div>
        </section>
        <style jsx>{homeStyle}</style>
      </Layout>
    )
  }
}
