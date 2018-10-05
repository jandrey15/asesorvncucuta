import React from 'react'
import Article from './Article'

const ArticlesColumn = props => {
  const { news } = props

  return (
    <div className='Articles'>
      {news.map((article, index) => {
        if (index === 1) {
          return (
            <div className='pauta' key={index}>
              <img src='/static/repuestos.jpg' alt='repuestos' />
              <Article article={article} key={article.id} type='column' />
            </div>
          )
        }

        if (index === 2) {
          return (
            <div className='pauta' key={index}>
              <p className='text'>Ayuda con sus tramites</p>
              <Article article={article} key={article.id} type='column' />
            </div>
          )
        }

        return <Article article={article} key={article.id} type='column' />
      })}
      <style jsx>{`
        .Articles {
          max-width: 260px;
          margin: 50px auto 0 20px;
        }
        .pauta,
        img {
          max-width: 260px;
          margin-bottom: 25px;
        }

        .text {
          max-width: 260px;
          background-color: #f7f7f7;
          color: #3499cd;
          min-height: 240px;
          margin-bottom: 25px;
          margin-top: 0;
          display: flex;
          align-items: center;
          font-size: 21px;
          font-weight: 600;
          padding: 0 50px;
          text-align: center;
          line-height: 22px;
        }
      `}</style>
    </div>
  )
}

export default ArticlesColumn
