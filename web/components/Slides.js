import React, { Component } from 'react'
import SlideLayout from './SlideLayout'
import CarouselSlide from './CarouselSlide'
import CarouselGaleria from './CarouselGaleria'
import CarouselIndicator from './CarouselIndicator'

class Slides extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slides: this.props.entradas || [],
      activeIndex: 0,
      type: 'fade',
      auto: false,
      move: 0,
      stylesTranslate: {
        transform: 'translateX(0)'
      },
      count: 0,
      modal: false,
      media: 0
    }
  }

  componentDidMount () {
    this.state.auto
      ? (this.auto = setInterval(() => this.carouselAuto(), 3000))
      : setInterval(() => null, 0)
    window.addEventListener('scroll', this.handleScroll)
    this.setState({
      media: window.innerWidth
    })
  }

  componentWillUnmount () {
    this.state.auto ? clearTimeout(this.auto) : clearTimeout(null)
    window.removeEventListener('scroll', this.handleScroll)
  }

  carouselAuto = () => {
    let index = this.state.activeIndex
    let { slides } = this.state
    let slidesLength = slides.length - 1
    if (index === slidesLength) {
      index = -1
    }
    ++index
    this.setState({
      activeIndex: index
    })
  }

  handleClickRight = e => {
    e.preventDefault()
    let index = this.state.activeIndex
    let { slides } = this.state
    let slidesLength = slides.length - 1
    if (index === slidesLength) {
      index = -1
    }
    ++index
    this.setState({
      activeIndex: index
    })
  }

  handleClickLeft = e => {
    e.preventDefault()
    let index = this.state.activeIndex
    let { slides } = this.state
    let slidesLength = slides.length
    if (index < 1) {
      index = slidesLength
    }
    --index
    this.setState({
      activeIndex: index
    })
  }

  goToSlide = index => e => {
    e.preventDefault()
    this.setState({
      activeIndex: index
    })
  }

  handleNext = e => {
    e.preventDefault()
    const length = this.state.slides.length
    // console.info(length)
    // console.info(this.state.count)
    if (this.state.count < length - 7) {
      const newMove = -888 + this.state.move
      this.setState({
        move: newMove,
        stylesTranslate: {
          transform: `translateX(${newMove}px)`
        },
        count: this.state.count + 1
      })
    }
  }

  handlePrev = e => {
    e.preventDefault()
    // const length = this.state.slides.length
    // console.info(this.state.count)
    if (this.state.count !== 0) {
      const newMove = 888 + this.state.move
      // console.info(this.state.move);
      // console.info(newMove);
      this.setState({
        move: newMove,
        stylesTranslate: {
          transform: `translateX(${newMove}px)`
        },
        count: this.state.count - 1
      })
    }
  }

  handleModal = e => {
    e.preventDefault()

    this.setState({
      modal: true
    })
  }

  handleClose = e => {
    e.preventDefault()

    this.setState({
      modal: false
    })
  }

  handleScroll = e => {
    e.preventDefault()
    // let lastScrollY = 0
    // lastScrollY = window.scrollY
    this.setState(prevState => {
      // console.log(prevState.modal)
      if (prevState.modal) {
        return {
          modal: !prevState.modal
        }
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        slides: nextProps.entradas,
        activeIndex: 0,
        move: 0,
        stylesTranslate: {
          transform: 'translateX(0)'
        },
        count: 0
      })
    }
  }

  render () {
    const { slides } = this.state

    if (this.props.type === 'galeria') {
      const styles = {
        width: `${slides.length * 888}px`
      }

      const styleButton = {
        position: 'absolute',
        border: 'none',
        textIndent: '-99999px',
        height: '30px',
        width: '30px',
        top: '25px',
        cursor: 'pointer',
        outline: 'none'
      }

      const styleButtonRight = {
        right: 0,
        background: 'url(/static/arrow-right.svg) no-repeat'
      }

      const styleButtonLeft = {
        left: 0,
        background: 'url(/static/arrow-left.svg) no-repeat'
      }

      let button
      // Boton de ver mas de 7 miniaturas galeria
      if (this.state.media > 768) {
        if (slides.length > 7 && this.state.count === 0) {
          styleButton.right = styleButtonRight.right
          styleButton.background = styleButtonRight.background
          button = (
            <button
              className='arrow right'
              style={styleButton}
              onClick={this.handleNext}
            >
              &#10095;
            </button>
          )
        } else if (this.state.count > 0) {
          styleButton.right = styleButtonLeft.right
          styleButton.background = styleButtonLeft.background
          button = (
            <button
              className='arrow left'
              style={styleButton}
              onClick={this.handlePrev}
            >
              &#10094;
            </button>
          )
        }
      }

      return (
        <SlideLayout>
          <ul className='carouselGaleria'>
            {slides.map((slide, index) => (
              <CarouselGaleria
                key={slide.id}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
                animation={this.state.type}
                modal={this.handleModal}
              />
            ))}
          </ul>

          <ul className='indicators' style={styles}>
            {slides.map((slide, index) => (
              <CarouselIndicator
                key={slide.id}
                slide={slide}
                index={parseInt(index)}
                activeIndex={this.state.activeIndex}
                onClick={this.goToSlide(parseInt(index))}
                style={this.state.stylesTranslate}
              />
            ))}

            {button}
          </ul>
          {this.state.modal && (
            <div className='background'>
              <aside className='index'>
                {this.state.activeIndex + 1} / {slides.length}
              </aside>
              <ul
                className='carouselGaleriaFull'
                onClick={this.handleClose}
                onScroll={this.handleClose}
              >
                {slides.map((slide, index) => (
                  <CarouselGaleria
                    key={slide.id}
                    index={index}
                    activeIndex={this.state.activeIndex}
                    slide={slide}
                    animation={this.state.type}
                    full
                  />
                ))}
              </ul>
              <aside className='close' onClick={this.handleClose}>
                <i className='icon' />
              </aside>
              <div className='controls'>
                <button className='arrow left' onClick={this.handleClickLeft}>
                  &#10094;
                </button>
                <button className='arrow right' onClick={this.handleClickRight}>
                  &#10095;
                </button>
              </div>
            </div>
          )}
          <style jsx>{`
            .carouselGaleria {
              max-width: 885px;
              padding: 0;
              margin: 0 0 2px;
              list-style: none;
            }

            .close .icon {
              background: url('/static/close.svg') no-repeat;
              height: 25px;
              display: block;
              width: 25px;
            }

            .close {
              position: absolute;
              top: 20px;
              right: 45px;
              cursor: pointer;
            }

            .indicators {
              position: relative;
              display: flex;
              padding: 0;
              margin: 0;
              max-width: 885px;
              overflow: hidden;
            }

            .background .index {
              position: absolute;
              top: 20px;
              left: 45px;
              color: #ffffff;
              font-size: 1.2rem;
              font-weight: 600;
            }

            .background {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background-color: rgba(0, 0, 0, 0.8);
              width: 100vw;
              height: 100vh;
              z-index: 10;
            }

            .carouselGaleriaFull {
              padding: 0;
              margin: 0;
              transition: 0.2s;
              height: 100%;
            }

            .background .controls {
              position: absolute;
              top: 50%;
              width: 100%;
              z-index: 10;
            }

            .background .controls .arrow {
              position: absolute;
              top: 50%;
              display: block;
              font-size: 22px;
              cursor: pointer;
              border: none;
              height: 30px;
              width: 30px;
              transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1);
              text-indent: -9999px;
            }
            .background .controls .arrow:focus {
              outline: 0;
            }
            .background .controls .arrow:hover {
              opacity: 0.5;
            }
            .background .controls .arrow.left {
              left: 40px;
              background: url('/static/arrow-left.svg') no-repeat;
              background-size: 100%;
            }
            .background .controls .arrow.right {
              right: 40px;
              background: url('/static/arrow-right.svg') no-repeat;
              background-size: 100%;
            }

            @media screen and (max-width: 1024px) {
              .background .controls .arrow:hover {
                opacity: 1;
              }

              .background .controls .arrow.left {
                left: 15px;
              }
              .background .controls .arrow.right {
                right: 15px;
              }
            }

            @media screen and (max-width: 768px) {
              .indicators {
                display: flex;
                flex-wrap: wrap;
                max-width: 100%;
                justify-content: center;
              }
            }
          `}</style>
        </SlideLayout>
      )
    } else {
      return (
        <SlideLayout>
          <ul className='carouselSlides'>
            {this.state.slides.map((slide, index) => (
              <CarouselSlide
                key={slide.id}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
                animation={this.state.type}
              />
            ))}
          </ul>
          {this.state.slides.length > 1 && (
            <div>
              <button className='arrow left' onClick={this.handleClickLeft}>
                &#10094;
              </button>
              <button className='arrow right' onClick={this.handleClickRight}>
                &#10095;
              </button>
            </div>
          )}

          <style jsx>{`
            .carouselSlides {
              padding: 0;
              margin: 0;
              list-style: none;
            }
            .arrow {
              position: absolute;
              top: 50%;
              display: block;
              font-size: 22px;
              cursor: pointer;
              border: none;
              height: 30px;
              width: 30px;
              transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1);
              text-indent: -9999px;
            }
            .arrow:focus {
              outline: 0;
            }
            .arrow:hover {
              opacity: 0.5;
            }
            .arrow.left {
              left: 15px;
              background: url('/static/arrow-left.svg') no-repeat;
              background-size: 100%;
            }
            .arrow.right {
              right: 15px;
              background: url('/static/arrow-right.svg') no-repeat;
              background-size: 100%;
            }

            @media screen and (max-width: 1024px) {
              .arrow:hover {
                opacity: 1;
              }
            }
          `}</style>
        </SlideLayout>
      )
    }
  }
}

export default Slides
