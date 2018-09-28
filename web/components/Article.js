import React from 'react'

const Article = props => {
  const { article } = props

  return (
    <div className='Article'>
      <img
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
      <div className='info'>
        <h2>{article.title.rendered}</h2>
        <p>resumne</p>
      </div>

      <style jsx>{`
        .Article {
          margin-bottom: 25px;
          background-color: #f7f7f7;
        }
        img {
          max-width: 260px;
          object-fit: cover;
          min-height: 136px;
        }

        h2 {
          margin: 0;
          font-size: 21px;
          font-weight: 600;
          color: #282826;
          line-height: 22px;
        }

        .info {
          padding: 10px;
        }
      `}</style>
    </div>
  )
}

export default Article
