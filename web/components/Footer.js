import React, { Component } from 'react'
// import Recaptcha from 'react-google-invisible-recaptcha'
// import { ReCaptcha } from 'react-recaptcha-v3'
// https://github.com/appleboy/react-recaptcha
import 'isomorphic-fetch'
// import Link from 'next/link'
import { Link } from '../routes'
// import slug from '../helpers/slug'

export default class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 0,
      message: '',
      token: null
    }
  }

  handleSubscription = event => {
    event.preventDefault()

    fetch(`/api/contact`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email.value,
        firstName: this.name.value,
        token: this.state.token
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.info(data)
        this.setState({
          status: data.status,
          message: data.message
        })
        // document.getElementById('formContactenos').reset()
      })
      .catch(err => {
        if (err) console.log(`Error ${err}`)
      })

    // this.recaptcha.execute()
  }

  setInputName = element => {
    this.name = element
  }

  setRefEmail = element => {
    this.email = element
  }

  // SetRefRecaptcha = element => {
  //   this.recaptcha = element
  // }

  // onResolved = () => {
  //   // alert('Recaptcha resolved with response: ' + this.recaptcha.getResponse())
  //   this.setState({
  //     token: this.recaptcha.getResponse()
  //   })
  //   // console.log(this.recaptcha.getResponse())
  //   // console.log(this.state.token)
  //   fetch(`/api/contact`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: this.email.value,
  //       firstName: this.name.value,
  //       token: this.state.token
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       // console.info(data)
  //       this.setState({
  //         status: data.status,
  //         message: data.message
  //       })
  //       // document.getElementById('formContactenos').reset()
  //     })
  //     .catch(err => {
  //       if (err) console.log(`Error ${err}`)
  //     })
  // }

  verifyCallback = recaptchaToken => {
    // Here you will get the final recaptchaToken!!!
    // console.log(recaptchaToken, '<= your recaptcha token')
    this.setState({
      token: recaptchaToken
    })
  }

  render () {
    return (
      <footer>
        <div className='container'>
          <div className='left'>
            <div className='info'>
              <Link href='/'>
                <a className='picture'>
                  <img src='/static/logo.png' alt='logo' />
                </a>
              </Link>
              <div className='copy'>
                <p>Copyright © 2018 asesorvncucuta</p>
                <p>Colombia </p>
                <p>Nit: 8769348-123</p>
              </div>
            </div>
            <div className='redes'>
              <div className='menu'>
                <ul className='ulMenu'>
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
                <ul className='ulRedes'>
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
              <div className='contact'>
                <p className='cont'>Contactenos</p>
                <p>311 6589584</p>
                <p>alvaro@asesorvncucuta.com</p>
              </div>
            </div>
          </div>
          <div className='right'>
            <h3>Suscríbete y recibe las últimas noticias</h3>
            <p>
              Al suscribirse recibirá las últimas noticias y publicaciones de
              carros nuevos y usados.
            </p>
            {this.state.status === 200 || this.state.status === 500 ? (
              <p className='message'>{this.state.message}</p>
            ) : (
              <form id='newsletter' onSubmit={this.handleSubscription}>
                {/* <input type='email' placeholder='Email' required />
              <button>Suscribirme</button> */}
                <input
                  type='text'
                  name='firstName'
                  placeholder='Nombre'
                  required
                  ref={this.setInputName}
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  required
                  ref={this.setRefEmail}
                />

                <button id='enviar' className='enviar' type='submit'>
                  Enviar
                </button>

                {/* <Recaptcha
                  ref={ref => (this.recaptcha = ref)}
                  sitekey='6Lf6t3cUAAAAAIx6u2V8HcTrtP_WTXtWb5K58lcd'
                  onResolved={this.onResolved}
                  locale='es'
                /> */}

                {/* <ReCaptcha
                  sitekey='6Lf-yncUAAAAAHD_rf6AKVpyNYVgxyXNSL9Kq8IG'
                  action='subscribed'
                  verifyCallback={this.verifyCallback}
                /> */}

                <aside className='messageRequest'>{this.state.message}</aside>
              </form>
            )}
          </div>
        </div>
        <style jsx>{`
          footer {
            background-color: #3a3a38;
            height: 235px;
            margin-top: 150px;
            position: relative;
          }

          .container {
            display: grid;
            grid-template-columns: 755px 1fr;
            grid-template-rows: 1fr;
            height: 100%;
          }

          h3 {
            max-width: 375px;
            font-size: 36px;
            line-height: 38px;
            font-weight: 600;
            margin: 0;
            color: #ffffff;
          }

          .messageRequest {
            position: absolute;
            bottom: -16px;
            left: 0;
            right: 0;
            font-size: 13px;
            text-align: center;
            color: #ffffff;
          }

          form {
            display: flex;
            justify-content: space-between;
            position: relative;
          }

          form input {
            max-width: 360px;
            height: 40px;
            border: none;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            padding: 0 0 0 10px;
            font-size: 18px;
            font-weight: 600;
            color: #3a3a38;
            outline: none;
            line-height: 0;
            width: 65%;
          }

          form input:first-child {
            margin-right: 2px;
            width: 30%;
          }

          form button {
            border: none;
            height: 40px;
            padding: 0;
            margin: 0;
            background-color: #3a3a38;
            width: 30%;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            cursor: pointer;
            color: #ffffff;
            transition: 0.3s;
            font-size: 18px;
            font-weight: 600;
          }

          form button:hover {
            color: #4987b6;
          }

          form button:active {
            transform: scale(1.1);
          }

          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .left {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            padding: 20px 0 20px 65px;
          }

          .right {
            background-color: #4987b6;
            padding: 10px 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }

          .right p {
            width: 346px;
            font-size: 18px;
          }

          .redes {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }

          .picture img {
            width: 138px;
          }

          p {
            margin: 5px 0;
            color: #ffffff;
            font-size: 14px;
          }

          .cont {
            text-align: center;
          }

          .redes .ulRedes {
            padding: 0;
            list-style: none;
            margin: 0;
            display: flex;
          }

          .redes .ulRedes li {
            height: 25px;
            margin: 0 3px;
            transition: transform 0.2s;
            width: 30px;
          }

          .redes .ulRedes li:hover {
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

          .redes .ulRedes li a {
            display: block;
            height: 100%;
            text-indent: -9999px;
          }

          .menu .ulMenu {
            padding: 0;
            list-style: none;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 25px;
            margin: 0;
            align-items: center;
            justify-items: center;
          }

          .menu .ulMenu li {
            border-left: 1px solid #4987b6;
            padding: 4px 5px;
          }

          .menu .ulMenu li:first-child {
            padding-left: 8px;
          }

          .menu .ulMenu li:last-child {
            border-right: 1px solid #4987b6;
          }

          .menu .ulMenu li a:hover {
            text-decoration: underline;
          }

          a {
            text-decoration: none;
            color: #ffffff;
          }

          @media screen and (max-width: 1024px) {
            footer {
              height: auto;
            }
            .container {
              grid-template-columns: 1fr;
            }

            .left {
              grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
              grid-template-rows: 1fr;
              padding: 20px;
              grid-gap: 20px 0;
            }

            .info {
              align-items: center;
            }

            .copy {
              margin-top: 20px;
            }

            .menu,
            .redes {
              margin-bottom: 30px;
            }

            .right {
              grid-row: 1 /2;
              padding: 40px 20px;
            }

            .right p {
              margin: 10px 0;
            }

            #newsletter {
              justify-content: flex-start;
              max-width: 500px;
            }
          }

          @media screen and (max-width: 400px) {
            .left,
            .right {
              grid-template-columns: 1fr;
              padding: 40px 5px;
              width: 100%;
              box-sizing: border-box;
            }

            h3 {
              width: 100%;
            }

            .right p {
              width: 100%;
            }

            .contact {
              display: flex;
              flex-wrap: wrap;
              max-width: 320px;
              justify-content: space-evenly;
            }

            .copy {
              display: flex;
              flex-wrap: wrap;
              max-width: 272px;
              justify-content: space-evenly;
            }
          }
        `}</style>
      </footer>
    )
  }
}
