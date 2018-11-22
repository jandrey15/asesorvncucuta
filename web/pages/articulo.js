/* eslint-disable standard/computed-property-even-spacing */
import React, { Component } from 'react'
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'
import Layout from '../components/Layout'
import ReactDisqusComments from 'react-disqus-comments'
import Article from '../components/Article'
import Error from './_error'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const { API_URL } = publicRuntimeConfig

export default class Articulo extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name
    // https://rafarjonilla.com/tutorial/cambiar-foto-de-perfil-en-wordpress-gravatar/
    try {
      let req = await fetch(
        `${API_URL}/wp-json/wp/v2/articulo?slug=${name}&_embed`
      )

      let [article] = await req.json()

      let reqMorePosts = await fetch(
        `${API_URL}/wp-json/wp/v2/articulo?author=${
          article.author
        }&per_page=3&exclude=${article.id}&_embed`
      )

      let posts = await reqMorePosts.json()

      return { article, posts, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { article: null, posts: [], statusCode: 503 }
    }
  }

  render () {
    const { article, posts, statusCode } = this.props
    // console.log(article)
    if (statusCode !== 200) {
      // console.log('error...')
      return <Error statusCode={statusCode} />
    }

    let d = new Date(article.date)

    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const dateArticle = d.toLocaleString('es-CO', options)

    let titleSEO
    let descriptionSEO
    const imagenDefaultSEO = article._embedded['wp:featuredmedia']
      ? article._embedded['wp:featuredmedia'][0].source_url.replace(
        'admin',
        'static'
      )
      : 'https://johnserrano.xyz/static/default.jpg'
    let imagenSEO
    let imagenFacebookSEO
    let imagenTwitterSEO

    // console.log(typeof article.acf === 'object')
    // console.log(article.acf)

    if (!Array.isArray(article.acf)) {
      // TitleSeo
      if (article.acf.titulo !== '' && article.acf.titulo !== null) {
        titleSEO = `${article.acf.titulo} - Asesorvncucuta`
      } else {
        titleSEO = `${article.title.rendered} - Asesorvncucuta`
      }
      // DescriptionSeo
      if (article.acf.descripcion !== '' && article.acf.descripcion !== null) {
        descriptionSEO = article.acf.descripcion
      } else {
        descriptionSEO =
          article.excerpt.rendered.substring(0, 160).replace(/<[^>]+>/g, '') ||
          article.content.rendered.substring(0, 160).replace(/<[^>]+>/g, '')
      }
      // ImagenFacebookSeo
      if (
        article.acf.imagen_facebook !== '' &&
        article.acf.imagen_facebook !== null
      ) {
        imagenFacebookSEO = article.acf.imagen_facebook.replace(
          'admin',
          'static'
        )
      } else {
        imagenFacebookSEO = imagenDefaultSEO
      }
      // ImagenTwitterSeo
      if (
        article.acf.imagen_twitter !== '' &&
        article.acf.imagen_twitter !== null
      ) {
        imagenTwitterSEO = article.acf.imagen_twitter.replace('admin', 'static')
      } else {
        imagenTwitterSEO = imagenDefaultSEO
      }
    } else {
      titleSEO = `${article.title.rendered} - Asesorvncucuta`
      descriptionSEO =
        article.excerpt.rendered.substring(0, 160).replace(/<[^>]+>/g, '') ||
        article.content.rendered.substring(0, 160).replace(/<[^>]+>/g, '')
      imagenSEO = imagenDefaultSEO
      imagenFacebookSEO = imagenDefaultSEO
      imagenTwitterSEO = imagenDefaultSEO
    }

    const SEO = {
      title: titleSEO,
      description: descriptionSEO,
      image: imagenSEO,
      url: `${article.link.replace('admin.', '')}`,
      titleOpenGraph: article.title.rendered,
      date: article.date,
      modified: article.modified,
      imagenFacebookSEO,
      imagenTwitterSEO,
      type: 'article'
    }

    return (
      <Layout SEO={SEO}>
        <article id='Article'>
          <figure>
            <img
              src={
                article._embedded['wp:featuredmedia']
                  ? article._embedded['wp:featuredmedia'][0].source_url.replace(
                    'admin',
                    'static'
                  )
                  : '/static/default.jpg'
              }
              alt={
                article._embedded['wp:featuredmedia']
                  ? article._embedded['wp:featuredmedia'][0].alt_text
                  : article.title.rendered
              }
            />
          </figure>
          <div className='container'>
            <h1 className='title'>{article.title.rendered}</h1>
            <div className='dateTags'>
              <time className='date' dateTime={article.date}>
                {dateArticle}
              </time>
              {article._embedded['wp:term'] && (
                <aside className='space'>-</aside>
              )}
              <div className='tags'>
                {article._embedded['wp:term']
                  ? article._embedded['wp:term'][1].map((item, index) => (
                    <div className='tag' key={item.id}>
                      <Link
                        route='tag'
                        params={{
                          slug: slug(item.slug)
                        }}
                      >
                        <a className='link'>{item.name}</a>
                      </Link>
                      {index < article._embedded['wp:term'][1].length - 1
                        ? ', '
                        : null}
                    </div>
                  ))
                  : null}
              </div>
            </div>
            <div
              className='text'
              dangerouslySetInnerHTML={{ __html: article.content.rendered }}
            />

            <div className='author'>
              <img
                src={article._embedded.author[0].avatar_urls['48']}
                alt={article._embedded.author[0].name}
              />
              <div className='userName'>
                <span className='name'>{article._embedded.author[0].name}</span>
                {article._embedded.author[0].acf.instagram ? (
                  <a
                    className='profileWeb'
                    href={`https://instagram.com/${
                      article._embedded.author[0].acf.instagram
                    }`}
                    target='_blank'
                  >
                    @{article._embedded.author[0].acf.instagram}
                  </a>
                ) : null}
              </div>
            </div>

            <section className='disqus'>
              <h4 className='titleDisqus'>Comparte tu Opinión</h4>
              {/* <ReactDisqusComments
                shortname='asesorvncucuta'
                identifier={article.slug}
                title={article.title.rendered}
                url={`http://localhost:8080/articulos/${article.slug}`}
              /> */}

              <ReactDisqusComments
                shortname='asesorvncucuta'
                identifier={article.slug}
                title={article.title.rendered}
                url={`http://asesorvncucuta.com/articulos/${article.slug}`}
              />
            </section>
            {posts.length > 0 && (
              <h4 className='morePosts'>Más publicaciones</h4>
            )}
            {posts.length > 0 ? (
              <div className='articles'>
                {posts.map(article => (
                  <div className='article' key={article.id}>
                    <Article article={article} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </article>
        <style jsx>{`
          .container {
            max-width: 900px;
          }

          .disqus {
            margin-top 50px;
          }

          .titleDisqus {
            margin: 0 0 20px;
            font-size: 28px;
            font-weight: 600;
            color: #2e2e2e;
          }

          .article {
            background-color: #f7f7f7;
            transition: 0.3s;
            max-width: 260px;
          }

          .article:hover {
            box-shadow: 0px 18px 18px 0px rgba(48, 48, 48, 0.3686274509803922);
          }

          .articles {
            display: grid;
            grid-template-columns: repeat(3, minmax(260px, 1fr));
            grid-gap: 0 60px;
          }

          h4 {
            font-size: 28px;
            font-weight: 600;
            margin: 60px 0 20px;
            color: #2d2d2a;
          }

          figure {
            margin: 0 0 50px;
            height: 600px;
          }

          figure img {
            height: 600px;
            object-fit: cover;
            width: 100%;
          }

          .author img {
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            width: 50px;
          }

          .author {
            width: 190px;
            height: 68px;
            background-color: #f7f7f7;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
          }

          .author .userName {
            display: flex;
            flex-direction: column;
          }

          .author .name {
            font-size: 18px;
            font-weight: 600;
            color: #2d2d2a;
            margin-bottom: 3px;
          }

          .author .profileWeb {
            font-size: 14px;
            color: #337ab7;
            font-weight: 600;
          }

          .title {
            font-size: 2em;
            font-weight: 600;
            margin: 0;
            line-height: 30px;
            color: #2d2d2a;
          }

          .text {
            margin: 30px 0;
            color: #4c4c4c;
          }

          .dateTags {
            display: flex;
            margin-top: 5px;
            color: #4c4c4c;
          }

          .date {
            margin-right: 5px;
          }

          .tags {
            margin-left: 5px;
            display: flex;
          }

          .tag {
            display: flex;
            margin-right: 5px;
          }

          .tag a {
            text-decoration: none;
            color: #2e2e2e;
          }

          .tag a:hover {
            text-decoration: underline;
            color: #3399cc;
          }

          @media screen and (max-width: 768px) {
            .container {
              margin: 0 2%;
              width: 96%;
            }

            figure {
              height: auto;
              margin-bottom: 30px;
            }

            figure img {
              height: auto;
            }

            .articles {
              grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
              grid-gap: 30px 0;
              justify-items: center;
            }

            .dateTags {
              flex-direction: column;
            }

            .date {
              margin: 0 0 5px;
            }
            .space {
              display: none;
            }

            .tags {
              margin: 0;
              flex-wrap: wrap;
            }

            .tag {
              margin-bottom: 5px;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
