// import Link from 'next/link'
import React from 'react'

const CarouselSlide = props => {
  const { slide, index, activeIndex, animation, modal, full } = props
  // console.log(full)
  // console.log(slide.large_srcset)
  let slideImg
  slideImg = slide.large_srcset.split(' ', 5)
  // console.log(slideImg)
  slideImg = slideImg[4]

  if (full) {
    return (
      <li
        className={
          index === activeIndex ? `slide active ${animation}` : `slide`
        }
      >
        <img
          className='full'
          src={slide.full_image_url}
          alt={slide.caption ? slide.caption : slide.title}
        />
        <style jsx>{`
          .slide {
            display: none;
            width: 100%;
          }

          .slide.fade img {
            animation: opacity 0.8s ease-out;
          }
          .slide.active {
            margin: 0 auto;
            cursor: initial;
            max-width: 1200px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: grid;
            align-items: center;
          }

          .slide .full {
            max-width: 1200px;
            margin: 0 auto;
            display: block;
          }

          @keyframes opacity {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @media screen and (max-width: 768px) {
            .slide .full {
              width: 100%;
            }
          }
        `}</style>
      </li>
    )
  } else {
    return (
      <li
        className={
          index === activeIndex ? `slide active ${animation}` : `slide`
        }
        onClick={modal}
      >
        <img
          className='normal'
          src={slideImg}
          alt={slide.caption ? slide.caption : slide.title}
        />

        <style jsx>{`
          .slide {
            display: none;
            cursor: -webkit-zoom-in;
            width: 100%;
          }
          .slide.active {
            display: block;
          }
          .slide.fade img {
            animation: opacity 0.8s ease-out;
          }
          .slide .normal {
            object-fit: cover;
            min-height: 576px;
            max-height: 576px;
            width: 100%;
          }

          @keyframes opacity {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @media screen and (max-width: 768px) {
            .slide {
              max-height: 100%;
              min-height: 100%;
            }
            .slide .normal {
              max-height: 100%;
              min-height: 100%;
            }
          }
        `}</style>
      </li>
    )
  }
}

export default CarouselSlide
