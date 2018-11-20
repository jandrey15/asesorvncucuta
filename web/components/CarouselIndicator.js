import React from 'react'

const CarouselIndicator = props => {
  const { slide, index, activeIndex, onClick, style } = props

  return (
    <li style={style}>
      <a onClick={onClick}>
        <img
          srcSet={slide.medium_srcset.replace(/admin/g, 'static')}
          sizes='125px'
          src={slide.thumbnail_image_url.replace('admin', 'static')}
          alt={slide.title}
        />
        <aside
          className={index === activeIndex ? 'indicator active' : 'indicator'}
        />
      </a>

      <style jsx>{`
        img {
          max-height: 85px;
          min-height: 85px;
          object-fit: cover;
          min-width: 125px;
          max-width: 125px;
        }

        li {
          list-style: none;
          margin: 0;
          padding: 0;
          cursor: pointer;
          position: relative;
          margin-right: 2px;
          transform: translateX(0);
          transition: 0.2s;
        }

        .indicator {
          position: absolute;
          background-color: rgba(51, 51, 51, 0.6);
          top: 0;
          left: 0;
          height: 85px;
          width: 125px;
        }

        a {
          display: block;
          height: 85px;
          width: 125px;
        }

        .indicator.active {
          background: transparent;
        }

        @media screen and (max-width: 768px) {
          li {
            margin: 0px 2px 2px 0;
          }
        }
      `}</style>
    </li>
  )
}

export default CarouselIndicator
