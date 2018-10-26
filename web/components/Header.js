import React, { Component } from 'react'
// import Link from 'next/link'
import { Router, Link } from '../routes'
// import slug from '../helpers/slug'
import Hamburger from './Hamburger'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      movil: false
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log(this.state.value)
    if (this.state.value === '') {
      Router.pushRoute('/search')
    } else {
      Router.pushRoute('search', { slug: this.state.value })
      this.setState({
        value: ''
      })
    }
  }

  componentDidMount () {
    const width = screen.width
    // console.log(width)
    if (width <= 1024 || window.innerWidth <= 1024) {
      this.setState(prevState => ({
        movil: !prevState.movil
      }))
    }
  }

  render () {
    const { searching } = this.props

    return (
      <header>
        {this.state.movil && <Hamburger searching={searching} />}
        <div className='container'>
          <figure className='logo'>
            <Link route='/'>
              <a className='linkLogo'>
                <img src='/static/logo.png' alt='asesorvncucuta' />
              </a>
            </Link>
          </figure>

          <div className='search'>
            <form
              className='formHeader'
              action='/search/'
              method='GET'
              onSubmit={this.handleSubmit}
            >
              <input
                type='text'
                name='as_word'
                value={this.state.value}
                onChange={this.handleChange}
                placeholder='Kia picanto'
              />
              <button className='btnSearch'>
                <i className='icon' />
              </button>
            </form>
          </div>

          <div className='menu'>
            <ul>
              <li>
                {/* <a href='entradas?condicion=54&name=nuevos'>Nuevos</a> */}
                <Link
                  route='entradasCondicion'
                  params={{
                    slugCondicion: 'nuevos'
                  }}
                >
                  <a className='link'>Nuevos</a>
                </Link>
                <span className='bar' />
              </li>
              <li>
                {/* <a href='entradas?condicion=55&name=usados'>Usados</a> */}
                <Link
                  route='entradasCondicion'
                  params={{
                    slugCondicion: 'usados'
                  }}
                >
                  <a className='link'>Usados</a>
                </Link>
                <span className='bar' />
              </li>
              <li>
                <Link route='articulos'>
                  <a className='link'>Artículos</a>
                </Link>
                <span className='bar' />
              </li>
            </ul>
          </div>

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

        <style jsx>{`
          header {
            color: #ffffff;
            background: #3399cc;
            height: 50px;
            position: relative;
          }
          header a {
            color: #ffffff;
            text-decoration: none;
          }

          .menu a:hover ~ .bar:before,
          .menu a:hover ~ .bar:after {
            width: 50%;
          }

          .menu .bar {
            position: relative;
            display: block;
          }
          .menu .bar:after,
          .menu .bar:before {
            content: '';
            height: 1px;
            width: 0;
            bottom: 0;
            position: absolute;
            background: #ffffff;
            transition: 0.5s ease all;
            -moz-transition: 0.5s ease all;
            -webkit-transition: 0.5s ease all;
          }
          .menu .bar:after {
            left: 50%;
          }
          .menu .bar:before {
            right: 50%;
          }

          .container {
            display: grid;
            margin: 0 auto;
            grid-template-columns: 290px 500px 218px 190px;
            grid-template-rows: 50px;
            max-width: 1200px;
          }

          .logo {
            margin: 0;
            grid-column: 1 / 2;
            justify-self: center;
            align-self: center;
            height: 38px;
            width: 130px;
          }

          .logo .linkLogo {
            display: block;
          }

          .logo img {
            width: 100%;
          }

          .search {
            grid-column: 2/3;
            align-self: center;
            height: 35px;
            width: 400px;
          }

          .search .formHeader {
            height: 100%;
            display: flex;
            position: relative;
          }

          .search .formHeader input {
            padding: 0;
            border: none;
            padding-left: 5px;
            box-sizing: border-box;
            border-radius: 2px;
            width: 100%;
          }

          .search .formHeader button {
            border: none;
            padding: 0;
            border-radius: 2px;
            border-left: 1px solid #4c4c4c;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            background-color: #dadbdb;
            position: absolute;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            height: 35px;
            width: 38px;
          }

          .search .formHeader button .icon {
            background: url('/static/search.svg');
            background-size: 100%;
            display: block;
            height: 23px;
            width: 23px;
          }

          .menu {
            grid-column: 3/4;
            align-self: center;
          }

          .menu ul {
            padding: 0;
            list-style: none;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 25px;
            margin: 0;
            align-items: center;
            justify-items: center;
          }

          .menu ul li {
            border-left: 1px solid #4c4c4c;
            padding: 4px 5px;
          }

          .menu ul li:first-child {
            padding-left: 7px;
          }

          .menu ul li:last-child {
            border-right: 1px solid #4c4c4c;
          }

          .redes {
            justify-self: flex-end;
            align-self: center;
            padding-right: 10px;
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

          @media screen and (max-width: 1024px) {
            header {
              height: auto;
              padding: 20px 0;
            }

            .container {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 1fr;
              grid-gap: 20px 0px;
            }

            .menu,
            .logo,
            .search,
            .redes {
              grid-column: 1 / 2;
              justify-self: center;
            }

            .logo {
              grid-row: 1;
              grid-column: 1 /2;
            }

            .redes {
              display: none;
            }

            .search {
              max-width: 320px;
              grid-column: 1 / 3;
            }

            .menu {
              grid-row: 1;
              grid-column: 2 / 3;
            }
          }

          @media screen and (max-width: 480px) {
            .logo {
              grid-column: 1 / 3;
            }

            .menu {
              grid-row: 2;
              grid-column: 1 / 3;
            }
          }
        `}</style>
      </header>
    )
  }
}

export default Header
