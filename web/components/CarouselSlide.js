/* eslint-disable standard/computed-property-even-spacing */
import React from 'react'
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'

const CarouselSlide = props => {
  const { slide, index, activeIndex, animation } = props
  const formatNumber = {
    separador: '.', // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear: function (num) {
      num += ''
      let splitStr = num.split('.')
      let splitLeft = splitStr[0]
      let splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : ''
      let regx = /(\d+)(\d{3})/
      while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2')
      }
      return this.simbol + splitLeft + splitRight
    },
    new: function (num, simbol) {
      this.simbol = simbol || ''
      return this.formatear(num)
    }
  }
  return (
    <li
      className={index === activeIndex ? `slide active ${animation}` : `slide`}
    >
      <img
        src={
          slide._embedded['wp:featuredmedia']
            ? slide._embedded['wp:featuredmedia'][0].media_details.sizes[
              'full'
            ].source_url.replace('admin', 'static')
            : '/static/default.jpg'
        }
        alt={slide.title.rendered}
      />

      <div className='info'>
        <Link
          route='entrada'
          params={{
            name: slug(slide.slug)
          }}
          prefetch
        >
          <a className='car'>
            <h1>{slide.title.rendered}</h1>
          </a>
        </Link>
        <p>
          <span>${formatNumber.new(slide.precio)}</span>
          <span className='kilo'>
            {slide._embedded['wp:term'][3][0]
              ? slide._embedded['wp:term'][3][0].name
              : null}{' '}
            - {slide.recorrido} Km
          </span>
        </p>
      </div>

      <style jsx>{`
        .slide {
          display: none;
          width: 100%;
        }
        .slide.active {
          display: block;
        }
        .slide.fade img {
          animation: opacity 0.8s ease-out;
        }
        .slide img {
          object-fit: cover;
          max-height: 360px;
          min-height: 360px;
          width: 100%;
        }

        .info {
          position: absolute;
          width: 270px;
          height: 95px;
          bottom: 12px;
          padding: 10px;
          left: 12px;
          box-sizing: border-box;
          background: rgba(76, 76, 76, 0.48);
        }

        a {
          text-decoration: none;
          color: #ffffff;
        }

        h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          line-height: 25px;
        }
        .kilo {
          font-size: 18px;
        }
        p {
          margin: 5px 0 0;
          color: #ffffff;
          font-size: 21px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @keyframes opacity {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </li>
  )
}

export default CarouselSlide
