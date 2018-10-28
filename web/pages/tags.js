import React, { Component } from 'react'
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'
import Layout from '../components/Layout'
import Error from './_error'

export default class Tags extends Component {
  static async getInitialProps ({ res }) {
    try {
      let req = await fetch(
        'http://api.docker.test/wp-json/wp/v2/tags?hide_empty=true'
      )

      let tags = await req.json()
      return { tags, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { tags: [], statusCode: 503 }
    }
  }

  render () {
    const { tags, statusCode } = this.props
    // console.log(tags)

    if (statusCode !== 200) {
      // console.log('error...')
      return <Error statusCode={statusCode} />
    }

    return (
      <Layout
        SEO={{
          title: `Tags - Asesorvncucuta`,
          titleOpenGraph: `Tags`
        }}
      >
        <div className='dondeEstoy container'>
          <span>Estoy en:</span>
          <Link route='/tags'>
            <a className='link'>Tags</a>
          </Link>
        </div>
        {tags.length > 0 ? (
          <section id='Tags' className='container'>
            {tags.map(tag => (
              <div className='tag' key={tag.id}>
                <Link
                  route='tag'
                  params={{
                    slug: slug(tag.slug)
                  }}
                >
                  <a className='link'>{tag.name}</a>
                </Link>
              </div>
            ))}
          </section>
        ) : (
          <div className='nothing container'>
            <h4>No hay tags</h4>
          </div>
        )}
        <style jsx>{`
          .nothing {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            color: #2d2d2a;
            font-weight: 600;
          }

          .nothing h4 {
            margin: 0;
          }
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
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-gap: 30px 10px;
            justify-items: center;
          }

          .tag {
            background-color: #f7f7f7;
            transition: 0.3s;
            height: 50px;
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
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
        `}</style>
      </Layout>
    )
  }
}
