import React from 'react'
import Article from './Article'
import TrackVisibility from 'react-on-screen'

const ArticlesColumn = props => {
  const { news } = props

  return (
    <div className='Articles'>
      {news.length === 0 && (
        <TrackVisibility once partialVisibility>
          {({ isVisible }) => (
            <div className='pautas'>
              <div className='pauta'>
                <a href='tel:+3138704245' target='_blank'>
                  <img src='/static/asesoria.gif' alt='asesoria' />
                </a>
              </div>
              <div className='pauta'>
                <a href='tel:+3003482805' target='_blank'>
                  <img src='/static/seguro.gif' alt='seguro' />
                </a>
              </div>
            </div>
          )}
        </TrackVisibility>
      )}

      {news.length === 1 && (
        <TrackVisibility once>
          {({ isVisible }) => (
            <div className='pauta'>
              <a href='tel:+3138704245' target='_blank'>
                <img src='/static/asesoria.gif' alt='asesoria' />
              </a>
            </div>
          )}
        </TrackVisibility>
      )}

      <TrackVisibility once>
        {({ isVisible }) =>
          isVisible &&
          news.map((article, index) => {
            if (index === 1) {
              return (
                <div className='pauta' key={index}>
                  <a href='tel:+3138704245' target='_blank'>
                    <img src='/static/asesoria.gif' alt='asesoria' />
                  </a>
                  <Article article={article} key={article.id} type='column' />
                </div>
              )
            }

            if (index === 2) {
              return (
                <div className='pauta' key={index}>
                  <a href='tel:+3003482805' target='_blank'>
                    <img src='/static/seguro.gif' alt='seguro' />
                  </a>
                  <Article article={article} key={article.id} type='column' />
                </div>
              )
            }

            return <Article article={article} key={article.id} type='column' />
          })
        }
      </TrackVisibility>
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
