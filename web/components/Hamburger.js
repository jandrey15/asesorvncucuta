import React, { Component } from 'react'
import Filter from './Filter'

export default class Hamburger extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      count: 0
    }
  }

  handleActive = e => {
    e.preventDefault()
    this.setState(prevState => ({
      active: !prevState.active
    }))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.searching) {
      this.setState(prevState => ({
        active: !prevState.active
      }))
    }
  }

  render () {
    const { active } = this.state
    return (
      <div>
        <nav
          className={`btnHamburger
              ${active ? 'active' : null}`}
        >
          <button
            className={`hamburger hamburger--elastic
              ${active ? 'is-active' : null}`}
            type='button'
            onClick={this.handleActive}
          >
            <span className='hamburger-box'>
              <span className='hamburger-inner' />
            </span>
          </button>
        </nav>
        <nav id='navigation' className={active ? 'activeNav' : null}>
          <div className={`filter ${active ? 'activeNav' : null}`}>
            <Filter movil='movil' />
            <div className='redes'>
              <ul>
                <li className='instagram'>
                  <a
                    href='https://www.instagram.com/asesorvncucuta'
                    target='_blank'
                  >
                    Instagram
                  </a>
                </li>
                <li className='facebook'>
                  <a
                    href='https://www.facebook.com/asesorvncucuta'
                    target='_blank'
                  >
                    Facebook
                  </a>
                </li>
                <li className='whatsapp'>
                  <a href='tel:+573003482805' target='_blank'>
                    Whatsapp
                  </a>
                </li>
                <li className='youtube'>
                  <a
                    href='https://www.youtube.com/asesorvncucuta'
                    target='_blank'
                  >
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <style jsx global>{`
          @media screen and (max-width: 1024px) {
            body {
              overflow-y: ${active ? 'hidden' : 'scroll'};
            }
          }
        `}</style>
        <style jsx>{`
          #navigation {
            display: none;
          }

          .hamburger {
            display: none;
          }

          @media screen and (max-width: 1024px) {
            .btnHamburger.active {
              height: 50px;
              position: fixed;
              top: 0;
              left: 0;
              width: 300px;
              background: #c73737;
              z-index: 2;
            }
            #navigation {
              display: block;
              position: fixed;
              left: -305px;
              top: 0;
              transition: 0.3s;
              display: grid;
              grid-template-columns: 1fr;
              grid-template-rows: 50px 1fr;
              max-height: 600px;
              height: 95vh;
              overflow-y: scroll;
              bottom: 0;
              background: #c73737;
              width: 300px;
              grid-gap: 5px 0;
              justify-items: center;
              z-index: 1;
            }

            #navigation.activeNav {
              left: 0;
            }

            #navigation .filter.activeNav {
              display: grid;
              grid-template-rows: 1fr 1fr;
              grid-template-columns: 1fr;
              grid-row: 2;
              max-height: 545px;
            }

            .hamburger {
              padding: 15px 15px;
              display: inline-block;
              cursor: pointer;
              transition-property: opacity, filter;
              transition-duration: 0.15s;
              transition-timing-function: linear;
              font: inherit;
              color: inherit;
              text-transform: none;
              background-color: transparent;
              border: 0;
              margin: 0;
              overflow: visible;
              z-index: 3;
              outline: none;
              position: absolute;
              top: 0;
              left: 0;
            }
            .hamburger:hover {
              opacity: 0.7;
            }
            .hamburger.is-active:hover {
              opacity: 0.7;
            }
            .hamburger.is-active {
              position: fixed;
            }
            .hamburger.is-active .hamburger-inner,
            .hamburger.is-active .hamburger-inner::before,
            .hamburger.is-active .hamburger-inner::after {
              background-color: #ffffff;
            }

            .hamburger-box {
              width: 40px;
              height: 24px;
              display: inline-block;
              position: relative;
            }

            .hamburger-inner {
              display: block;
              top: 50%;
              margin-top: -2px;
            }
            .hamburger-inner,
            .hamburger-inner::before,
            .hamburger-inner::after {
              width: 40px;
              height: 4px;
              background-color: #ffffff;
              border-radius: 4px;
              position: absolute;
              transition-property: transform;
              transition-duration: 0.15s;
              transition-timing-function: ease;
            }
            .hamburger-inner::before,
            .hamburger-inner::after {
              content: '';
              display: block;
            }
            .hamburger-inner::before {
              top: -10px;
            }
            .hamburger-inner::after {
              bottom: -10px;
            }

            .hamburger--elastic .hamburger-inner {
              top: 2px;
              transition-duration: 0.275s;
              transition-timing-function: cubic-bezier(
                0.68,
                -0.55,
                0.265,
                1.55
              );
            }
            .hamburger--elastic .hamburger-inner::before {
              top: 10px;
              transition: opacity 0.125s 0.275s ease;
            }
            .hamburger--elastic .hamburger-inner::after {
              top: 20px;
              transition: transform 0.275s
                cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .hamburger--elastic.is-active .hamburger-inner {
              transform: translate3d(0, 10px, 0) rotate(135deg);
              transition-delay: 0.075s;
            }
            .hamburger--elastic.is-active .hamburger-inner::before {
              transition-delay: 0s;
              opacity: 0;
            }
            .hamburger--elastic.is-active .hamburger-inner::after {
              transform: translate3d(0, -20px, 0) rotate(-270deg);
              transition-delay: 0.075s;
            }

            .redes {
              justify-self: flex-end;
              align-self: center;
              margin: 0;
              justify-self: center;
            }

            .redes ul {
              padding: 0;
              list-style: none;
              margin: 0;
              display: flex;
            }

            .redes ul li {
              height: 25px;
              margin: 0 3px;
              transition: transform 0.2s;
              width: 30px;
            }

            .redes ul li:hover {
              transform: scale(0.9);
            }

            .redes ul .instagram {
              background: url('/static/redes.svg') no-repeat;
              background-position-x: -8px;
              background-position-y: -6px;
              background-size: 150px;
            }

            .redes ul .facebook {
              background: url('/static/redes.svg') no-repeat;
              background-position-x: -42px;
              background-position-y: -6px;
              background-size: 150px;
            }
            .redes ul .whatsapp {
              background: url('/static/redes.svg') no-repeat;
              background-position-x: -75px;
              background-position-y: -6px;
              background-size: 150px;
            }
            .redes ul .youtube {
              background: url('/static/redes.svg') no-repeat;
              background-position-x: -110px;
              background-position-y: -6px;
              background-size: 150px;
            }

            .redes ul li a {
              display: block;
              height: 100%;
              text-indent: -9999px;
            }
          }
        `}</style>
      </div>
    )
  }
}
