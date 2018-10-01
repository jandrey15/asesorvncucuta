import Link from 'next/link'
import React from 'react'

const CarouselSlide = props => {
  const { slide, index, activeIndex, animation } = props

  return (
    <li
      className={index === activeIndex ? `slide active ${animation}` : `slide`}
    >
      <img src={slide.full_image_url} alt={slide.title} />

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
          background: rgba(51, 51, 51, 0.52);
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
