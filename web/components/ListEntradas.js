/* eslint-disable standard/computed-property-even-spacing */
// import Link from 'next/link'
import React, { Component } from 'react'
import { Link } from '../routes'
import slug from '../helpers/slug'
import TrackVisibility from 'react-on-screen'

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

class ListEntradas extends Component {
  render () {
    const { entradas, auto } = this.props

    return (
      <section className='ListEntradas'>
        {entradas.map((entrada, index) =>
          index <= 6 ? (
            <TrackVisibility once partialVisibility key={entrada.id}>
              {({ isVisible }) => (
                <div className='entrada'>
                  {/* <Link href={`/entrada?name=${entrada.slug}`} prefetch>
              <a className='picture'>
                <img
                  src={
                    entrada._embedded['wp:featuredmedia']
                      ? entrada._embedded['wp:featuredmedia'][0].media_details
                        .sizes['thumbnail'].source_url
                      : '/static/default.jpg'
                  }
                  alt={
                    entrada._embedded['wp:featuredmedia']
                      ? entrada._embedded['wp:featuredmedia'][0].alt_text
                      : entrada.title.rendered
                  }
                />
              </a>
            </Link> */}
                  <Link
                    route='entrada'
                    params={{
                      name: slug(entrada.slug)
                    }}
                    prefetch
                  >
                    <a className='picture'>
                      <img
                        className='b-lazy'
                        src={
                          entrada._embedded['wp:featuredmedia']
                            ? entrada._embedded[
                              'wp:featuredmedia'
                            ][0].media_details.sizes[
                              'thumbnail'
                            ].source_url.replace('admin', 'static')
                            : '/static/default_miniatura.jpg'
                        }
                        alt={
                          entrada._embedded['wp:featuredmedia']
                            ? entrada._embedded['wp:featuredmedia'][0].alt_text
                            : entrada.title.rendered
                        }
                      />
                    </a>
                  </Link>

                  <div className='info'>
                    <p className='kilo'>
                      {entrada._embedded['wp:term'][3][0]
                        ? entrada._embedded['wp:term'][3][0].name
                        : '0'}{' '}
                      - {formatNumber.new(entrada.recorrido)} km
                    </p>
                    {/* <Link href={`/entrada?name=${entrada.slug}`} prefetch>
                <a className='title'>
                  <h2>{entrada.title.rendered}</h2>
                </a>
              </Link> */}
                    <Link
                      route='entrada'
                      prefetch
                      params={{
                        name: slug(entrada.slug)
                      }}
                    >
                      <a className='title'>
                        <h2>{entrada.title.rendered}</h2>
                      </a>
                    </Link>
                    <p className='price'>${formatNumber.new(entrada.precio)}</p>
                    <aside>
                      {entrada._embedded['wp:term'][6][0]
                        ? entrada._embedded['wp:term'][6][0].name
                        : null}
                    </aside>
                  </div>
                </div>
              )}
            </TrackVisibility>
          ) : (
            <TrackVisibility once key={entrada.id}>
              {({ isVisible }) =>
                isVisible && (
                  <div className='entrada'>
                    {/* <Link href={`/entrada?name=${entrada.slug}`} prefetch>
              <a className='picture'>
                <img
                  src={
                    entrada._embedded['wp:featuredmedia']
                      ? entrada._embedded['wp:featuredmedia'][0].media_details
                        .sizes['thumbnail'].source_url
                      : '/static/default.jpg'
                  }
                  alt={
                    entrada._embedded['wp:featuredmedia']
                      ? entrada._embedded['wp:featuredmedia'][0].alt_text
                      : entrada.title.rendered
                  }
                />
              </a>
            </Link> */}
                    <Link
                      route='entrada'
                      params={{
                        name: slug(entrada.slug)
                      }}
                      prefetch
                    >
                      <a className='picture'>
                        <img
                          className='b-lazy'
                          src={
                            entrada._embedded['wp:featuredmedia']
                              ? entrada._embedded[
                                'wp:featuredmedia'
                              ][0].media_details.sizes[
                                'thumbnail'
                              ].source_url.replace('admin', 'static')
                              : '/static/default_miniatura.jpg'
                          }
                          alt={
                            entrada._embedded['wp:featuredmedia']
                              ? entrada._embedded['wp:featuredmedia'][0]
                                .alt_text
                              : entrada.title.rendered
                          }
                        />
                      </a>
                    </Link>

                    <div className='info'>
                      <p className='kilo'>
                        {entrada._embedded['wp:term'][3][0]
                          ? entrada._embedded['wp:term'][3][0].name
                          : '0'}{' '}
                        - {formatNumber.new(entrada.recorrido)} km
                      </p>
                      {/* <Link href={`/entrada?name=${entrada.slug}`} prefetch>
                <a className='title'>
                  <h2>{entrada.title.rendered}</h2>
                </a>
              </Link> */}
                      <Link
                        route='entrada'
                        prefetch
                        params={{
                          name: slug(entrada.slug)
                        }}
                      >
                        <a className='title'>
                          <h2>{entrada.title.rendered}</h2>
                        </a>
                      </Link>
                      <p className='price'>
                        ${formatNumber.new(entrada.precio)}
                      </p>
                      <aside>
                        {entrada._embedded['wp:term'][6][0]
                          ? entrada._embedded['wp:term'][6][0].name
                          : null}
                      </aside>
                    </div>
                  </div>
                )
              }
            </TrackVisibility>
          )
        )}
        <style jsx>{`
          .ListEntradas {
            margin-top: ${auto ? 0 : '25px'};
            grid-column: 2/3;
            display: grid;
            grid-gap: 30px 15px;
            grid-template-columns: repeat(${auto || 3}, minmax(287px, 1fr));
            grid-template-rows: repeat(auto-fill, 391px);
          }

          .entrada {
            background-color: #f7f7f7;
            max-width: 287px;
            transition: 0.3s;
          }

          .entrada:hover {
            box-shadow: 0px 18px 18px 0px rgba(48, 48, 48, 0.3686274509803922);
          }

          .info {
            padding: 15px 10px 20px;
          }

          p,
          aside {
            color: #4c4c4c;
            margin: 0;
          }

          aside {
            margin-top: 5px;
          }

          .kilo {
            font-size: 14px;
            border-bottom: 1px solid #5b91b2;
            padding-bottom: 8px;
          }

          a {
            text-decoration: none;
            color: #2d2d2a;
          }

          h2 {
            font-size: 21px;
            line-height: 23px;
            font-weight: 600;
            margin: 15px 0 10px;
          }

          h2:hover {
            opacity: 0.9;
          }

          img {
            max-width: 287px;
            min-height: 215px;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            object-fit: cover;
          }

          @media screen and (max-width: 1024px) {
            .ListEntradas {
              grid-template-columns: repeat(auto-fill, minmax(287px, 1fr));
              justify-items: center;
              grid-column: 1;
            }
          }
        `}</style>
      </section>
    )
  }
}

export default ListEntradas
