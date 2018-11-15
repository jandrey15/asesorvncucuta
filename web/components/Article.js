/* eslint-disable standard/computed-property-even-spacing */
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'

const Article = props => {
  const { article, type } = props
  // console.log(article._embedded['wp:featuredmedia'])
  return (
    <div className={`Article ${type || ''}`}>
      <Link
        route='articulo'
        params={{
          name: slug(article.slug)
        }}
        prefetch
      >
        <a className='picture'>
          <img
            className={type}
            src={
              article._embedded['wp:featuredmedia']
                ? article._embedded['wp:featuredmedia'][0].media_details.sizes[
                  'thumbnail'
                ].source_url.replace('admin', 'static')
                : '/static/default.jpg'
            }
            alt={
              article._embedded['wp:featuredmedia']
                ? article._embedded['wp:featuredmedia'][0].alt_text
                : article.title.rendered
            }
          />
        </a>
      </Link>
      <div className='info'>
        <Link
          route='articulo'
          params={{
            name: slug(article.slug)
          }}
          prefetch
        >
          <a className='title'>
            <h2>{article.title.rendered}</h2>
          </a>
        </Link>
        <div
          className='summary'
          dangerouslySetInnerHTML={{
            __html:
              article.excerpt.rendered.substring(0, 160) ||
              article.content.rendered.substring(0, 160)
          }}
        />
      </div>

      <style jsx>{`
        .Article.column {
          margin-bottom: 25px;
          background-color: #f7f7f7;
        }

        img {
          min-width: 260px;
          width: 100%;
          object-fit: cover;
          min-height: 136px;
          transition: 0.3s;
        }

        .Article .column:hover {
          transform: scale(1.3);
        }

        h2 {
          margin: 0;
          font-size: 21px;
          font-weight: 600;
          color: #2d2d2a;
          line-height: 22px;
        }

        h2:hover {
          opacity: 0.9;
        }

        .info {
          padding: 10px;
        }

        a {
          text-decoration: none;
          overflow: hidden;
          display: block;
        }

        .summary {
          margin: 0;
          color: #3a3a38;
        }
      `}</style>
    </div>
  )
}

export default Article
