import React, { Component } from 'react'
import SlideLayout from './SlideLayout'
import CarouselSlide from './CarouselSlide'
// import CarouselIndicator from './CarouselIndicator'

class Slides extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slides: this.props.entradas || [],
      activeIndex: 0,
      type: 'fade',
      auto: false
    }
  }

  componentDidMount () {
    this.state.auto
      ? (this.auto = setInterval(() => this.carouselAuto(), 3000))
      : setInterval(() => null, 0)
  }

  componentWillUnmount () {
    this.state.auto ? clearTimeout(this.auto) : clearTimeout(null)
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

  render () {
    return (
      <SlideLayout>
        <ul className='carouselSlides'>
          {this.state.slides.map((slide, index) => (
            <CarouselSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
              animation={this.state.type}
            />
          ))}
        </ul>

        <button className='arrow left' onClick={this.handleClickLeft}>
          &#10094;
        </button>
        <button className='arrow right' onClick={this.handleClickRight}>
          &#10095;
        </button>

        {/* <ul className='indicators'>
          {Object.keys(this.state.slides).map(index => (
            <CarouselIndicator
              key={index}
              index={parseInt(index)}
              activeIndex={this.state.activeIndex}
              onClick={this.goToSlide(parseInt(index))}
            />
          ))}
        </ul> */}
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
            height: 50px;
            width: 50px;
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
            left: 32px;
            background: url('/static/cheveron-left.svg') no-repeat;
            background-size: 100%;
          }
          .arrow.right {
            right: 32px;
            background: url('/static/cheveron-right.svg') no-repeat;
            background-size: 100%;
          }
          .indicators {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
          }
          .indicators li:nth-of-type(n + 2) {
            margin-left: 9px;
          }
          .indicator {
            display: block;
            width: 24px;
            height: 3px;
            background-color: #111;
            cursor: pointer;
            opacity: 0.15;
            transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1);
          }
          .indicator:hover {
            opacity: 0.5;
          }
          .indicator.active,
          .indicator.active:hover {
            opacity: 0.75;
          }
        `}</style>
      </SlideLayout>
    )
  }
}

export default Slides
