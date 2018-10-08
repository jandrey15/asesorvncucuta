import React, { Component } from 'react'
import Article from '../components/Article'
import Link from 'next/link'
import Layout from '../components/Layout'

export default class Tag extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name
    const id = query.id

    try {
      let req = await fetch(
        `http://api.docker.test/wp-json/wp/v2/articulo?tags=${id}&per_page=20&_embed`
      )

      let tags = await req.json()

      return { tags, name, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { tags: [], name: null, statusCode: 503 }
    }
  }

  render () {
    const { tags, name, statusCode } = this.props
    // console.log(tags)

    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }

    let nameTag
    tags[0]._embedded['wp:term'][1].filter(tag => {
      // console.log(tag.name)
      if (tag.slug === name) {
        nameTag = tag.name
      }
    })

    return (
      <Layout title={nameTag}>
        <div className='dondeEstoy container'>
          <span>Estoy en:</span>
          <Link href='/noticias'>
            <a className='link'>noticias</a>
          </Link>
          <aside className='space'>&#10095;</aside>
          <p>{nameTag}</p>
        </div>
        <section id='Tags' className='container'>
          {tags.map(tag => (
            <div className='tag' key={tag.id}>
              <Article article={tag} />
            </div>
          ))}
        </section>
        <style jsx>{`
          .link {
            margin: 0 5px;
            text-decoration: none;
            color: #4c4c4c;
          }

          .link:hover {
            text-decoration: underline;
          }

          #Tags {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            grid-gap: 30px 53px;
          }

          .tag {
            background-color: #f7f7f7;
            transition: 0.3s;
            max-width: 260px;
          }

          .tag:hover {
            box-shadow: 0px 18px 18px 0px rgba(48, 48, 48, 0.3686274509803922);
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
            font-size: 14px;
            font-weight: 600;
          }
        `}</style>
      </Layout>
    )
  }
}
