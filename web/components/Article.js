import Link from 'next/link'

const Article = props => {
  const { article, type } = props
  // console.log(article._embedded['wp:featuredmedia'])
  return (
    <div className={`Article ${type || ''}`}>
      <Link href={`/articulo?name=${article.slug}`} prefetch>
        <a className='picture'>
          <img
            className={type}
            src={
              article._embedded['wp:featuredmedia']
                ? article._embedded['wp:featuredmedia'][0].source_url
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
        <Link href={`/articulo?name=${article.slug}`} prefetch>
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
          max-width: 260px;
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
          color: #282826;
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
          color: #3b3b3b;
        }
      `}</style>
    </div>
  )
}

export default Article