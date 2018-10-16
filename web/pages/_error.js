import React, { Component } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default class Error extends Component {
  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render () {
    const { statusCode } = this.props
    let title
    statusCode === 404
      ? (title = '404 - Asesorvncucuta')
      : (title = '500 - Asesorvncucuta')

    return (
      <Layout title={title}>
        {statusCode === 404 ? (
          <div className='message'>
            <h2>{statusCode}</h2>
            <h1>La página que intentas acceder no puede encontrarse</h1>
            <p>
              <Link href='/'>
                <a>Volver al inicio</a>
              </Link>
            </p>
          </div>
        ) : (
          <div className='message'>
            <h1>Hubo un problema</h1>
            <p>Intenta nuevamente en unos segundos</p>
          </div>
        )}
        <style jsx>{`
          .message {
            padding: 100px 30px;
            text-align: center;
          }
          h1 {
            margin-bottom: 3rem;
            color: #2d2d2a;
          }

          h2 {
            font-size: 10rem;
            margin: 0;
            color: #e74c3c;
          }

          a {
            color: #ffffff;
            text-transform: uppercase;
            background-color: #3399cc;
            padding: 15px;
            text-decoration: none;
            border-radius: 2px;
            font-weight: 600;
          }
        `}</style>
      </Layout>
    )
  }
}
