import React, { Component } from 'react'
import Layout from '../components/Layout'
import SlideShow from '../components/SlideShow'
import MorePosts from '../components/MorePosts'
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'
import entradaStyle from './entradaStyle'
import Error from './_error'

export default class Entrada extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name
    // console.log(name)
    try {
      // let req = await fetch('https://api.audioboom.com/channels/recommended')
      // http://api.docker.test/wp-json/acf/v3/pages/POST_ID/galeria?type=photo_gallery
      let req = await fetch(
        `http://api.docker.test/wp-json/wp/v2/posts?slug=${name}&_embed`
      )
      let [entrada] = await req.json()

      if (entrada === undefined) {
        return { entrada: null, galeria: [], posts: [], statusCode: 404 }
      }

      let [reqGaleria, reqMorePosts] = await Promise.all([
        fetch(
          `http://api.docker.test/wp-json/acf/v3/pages/${
            entrada.id
          }/galeria?type=photo_gallery`
        ),
        fetch(
          `http://api.docker.test/wp-json/wp/v2/posts?author=${
            entrada.author
          }&per_page=5&exclude=${entrada.id}&sticky=false&_embed`
        )
      ])

      let galeria = await reqGaleria.json()
      let posts = await reqMorePosts.json()

      return { entrada, galeria, posts, statusCode: 200 }
    } catch (err) {
      // console.log(err)
      res.statusCode = 503
      return { entrada: null, galeria: [], posts: [], statusCode: 503 }
    }
  }
  render () {
    const { entrada, galeria, posts, statusCode } = this.props
    // console.log(entrada)
    if (statusCode !== 200) {
      // console.log('error...')
      return <Error statusCode={statusCode} />
    }

    const formatNumber = {
      separador: '.', // separador para los miles
      sepDecimal: ',', // separador para los decimales
      formatear: function (num) {
        num += ''
        let splitStr = num.split('.')
        let splitLeft = splitStr[0]
        let splitRight =
          splitStr.length > 1 ? this.sepDecimal + splitStr[1] : ''
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

    let marcaSlug
    let marcaName
    let modeloSlug
    let modeloName

    if (
      entrada._embedded['wp:term'][2][0] &&
      entrada._embedded['wp:term'][2][1]
    ) {
      if (entrada._embedded['wp:term'][2][1].acf.padre) {
        marcaSlug = entrada._embedded['wp:term'][2][1].slug
        modeloSlug = entrada._embedded['wp:term'][2][0].slug
        marcaName = entrada._embedded['wp:term'][2][1].name
        modeloName = entrada._embedded['wp:term'][2][0].name
      } else {
        marcaSlug = entrada._embedded['wp:term'][2][0].slug
        modeloSlug = entrada._embedded['wp:term'][2][1].slug
        marcaName = entrada._embedded['wp:term'][2][0].name
        modeloName = entrada._embedded['wp:term'][2][1].name
      }
    }

    return (
      <Layout title={`${entrada.title.rendered} - Asesorvncucuta`}>
        <div className='dondeEstoy container'>
          <Link route='/'>
            <a className='listado'>
              <span>Volver al listado: </span>
            </a>
          </Link>
          {entrada._embedded['wp:term'][0][0] && (
            <Link
              route='entradasCondicion'
              params={{
                slugCondicion: slug(entrada._embedded['wp:term'][0][0].slug)
              }}
            >
              <a className='link'>{entrada._embedded['wp:term'][0][0].name}</a>
            </Link>
          )}
          {marcaSlug.length > 0 && (
            <div className='item'>
              <aside className='space'>&#10095;</aside>
              <Link
                route='entradas'
                params={{
                  slugCondicion: slug(entrada._embedded['wp:term'][0][0].slug),
                  slug: slug(marcaSlug)
                }}
              >
                <a className='link'>{marcaName}</a>
              </Link>
            </div>
          )}
          {modeloSlug.length > 0 && (
            <div className='item'>
              <aside className='space'>&#10095;</aside>
              <Link
                route='entradasMarcas'
                params={{
                  slugCondicion: slug(entrada._embedded['wp:term'][0][0].slug),
                  slugMarca: slug(marcaSlug),
                  slugModelo: slug(modeloSlug)
                }}
              >
                <a className='link'>{modeloName}</a>
              </Link>
            </div>
          )}
        </div>
        <article id='Entrada' className='container'>
          <div className='content'>
            <SlideShow entradas={galeria} type='galeria' />
            <div className='info'>
              <h2 className='price'>${formatNumber.new(entrada.precio)}</h2>
              <h1 className='title'>{entrada.title.rendered}</h1>

              <p className='kilo'>
                {entrada._embedded['wp:term'][3][0]
                  ? entrada._embedded['wp:term'][3][0].name
                  : '0'}{' '}
                - {formatNumber.new(entrada.recorrido)} km
              </p>
              <aside className='location'>
                <i className='icon' />
                El carro esta en{' '}
                {entrada._embedded['wp:term'][6][0]
                  ? entrada._embedded['wp:term'][6][0].name
                  : null}
              </aside>
              <hr />
              <h3>Información del {entrada.tipo}</h3>
              {entrada.tipo === 'vendedor' ? (
                <div className='seller'>
                  <span>Nombre:</span>
                  <p className='name'>{entrada.nombre}</p>
                  <span>Teléfono: </span>
                  <p className='phone'>{entrada.telefono}</p>
                </div>
              ) : (
                <div className='concesionario'>
                  <span>Nombre del concesionario: </span>
                  <p className='name'>{entrada.nombre_concesionario}</p>
                  <span>Teléfono: </span>
                  <p className='phone'>{entrada.telefono}</p>
                </div>
              )}
              <hr />
              {entrada.doy_financiamiento === 'Si' ? (
                <div className='financing'>
                  <figure className='logo'>
                    <img src='/static/colpatria.png' alt='logo' />
                  </figure>
                  <p>
                    Compra ahora tu Kia con tu crédito Colpatria. Tasa desde
                    0.79% M.V. equivalente a 9.9% E.A.
                  </p>
                </div>
              ) : null}

              <div className='pauta300x118'>
                <p>Pauta</p>
              </div>
            </div>
          </div>

          <div className='pauta'>
            <p>Pauta</p>
          </div>

          <section className='ficha'>
            {entrada._embedded['wp:term'][2][0] && (
              <div className='item marca'>
                <h6>Marca</h6>
                <span>{entrada._embedded['wp:term'][2][0].name}</span>
              </div>
            )}

            {entrada._embedded['wp:term'][2][1] && (
              <div className='item modelo'>
                <h6>Modelo</h6>
                <span>{entrada._embedded['wp:term'][2][1].name}</span>
              </div>
            )}

            {entrada._embedded['wp:term'][5][0] && (
              <div className='item color'>
                <h6>Color</h6>
                <span>{entrada._embedded['wp:term'][5][0].name}</span>
              </div>
            )}

            {entrada.combustible.length > 0 && (
              <div className='item combustible'>
                <h6>Combustible</h6>
                <span>{entrada.combustible}</span>
              </div>
            )}

            {entrada.recorrido.length > 1 && (
              <div className='item recorrido'>
                <h6>Recorrido</h6>
                <span>{formatNumber.new(entrada.recorrido)} Km</span>
              </div>
            )}

            {entrada.unico_dueno.length > 1 && (
              <div className='item unico'>
                <h6>Único dueño</h6>
                <span>{entrada.unico_dueno}</span>
              </div>
            )}

            {entrada.placa.length > 0 && (
              <div className='item placa'>
                <h6>Placa</h6>
                <span>{entrada.placa}</span>
              </div>
            )}

            {entrada._embedded['wp:term'][3][0] && (
              <div className='item ano'>
                <h6>Año</h6>
                <span>{entrada._embedded['wp:term'][3][0].name}</span>
              </div>
            )}

            {entrada.direccion.length > 0 && (
              <div className='item direccion'>
                <h6>Dirección</h6>
                <span>{entrada.direccion}</span>
              </div>
            )}

            {entrada.doy_financiamiento.length > 0 && (
              <div className='item doy_financiamiento'>
                <h6>Doy financiamiento</h6>
                <span>{entrada.doy_financiamiento}</span>
              </div>
            )}

            {entrada.motor.length > 0 && (
              <div className='item motor'>
                <h6>Motor</h6>
                <span>{entrada.motor}</span>
              </div>
            )}

            {entrada.negosiable.length > 0 && (
              <div className='item negosiable'>
                <h6>Negosiable</h6>
                <span>{entrada.negosiable}</span>
              </div>
            )}

            {entrada.transmision.length > 0 && (
              <div className='item transmision'>
                <h6>Transmisión</h6>
                <span>{entrada.transmision}</span>
              </div>
            )}
          </section>
          {entrada.exterior.length > 0 && <hr />}
          {entrada.exterior.length > 0 && (
            <section className='ficha exterior'>
              {entrada.exterior.map((item, index) => {
                switch (item) {
                  case 'estribos': {
                    return (
                      <div className='item estribos' key={index}>
                        <h6>Estribos</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'luces-antinieblas': {
                    return (
                      <div className='item luces' key={index}>
                        <h6>Luces anti nieblas</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'Llantas-nuevas': {
                    return (
                      <div className='item llantas' key={index}>
                        <h6>Llantas nuevas</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'rines de lujo': {
                    return (
                      <div className='item rines' key={index}>
                        <h6>Rines de lujo</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'Pelicula de seguridad': {
                    return (
                      <div className='item seguridad' key={index}>
                        <h6>Pelicula de seguridad</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'Retrovisores electricos': {
                    return (
                      <div className='item retrovisores' key={index}>
                        <h6>Retrovisores electricos</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'Revision tecnomecanica': {
                    return (
                      <div className='item revision' key={index}>
                        <h6>Revision tecnomecanica</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'Sun roof (quemacoco)': {
                    return (
                      <div className='item sun' key={index}>
                        <h6>Sun roof (quemacoco)</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'spoiler': {
                    return (
                      <div className='item spoiler' key={index}>
                        <h6>Spoiler</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  default:
                    break
                }
              })}
            </section>
          )}

          {entrada.seguridad.length > 0 && <hr />}
          {entrada.seguridad.length > 0 && (
            <section className='ficha seguridad'>
              {entrada.seguridad.map((item, index) => {
                switch (item) {
                  case 'frenos abs': {
                    return (
                      <div className='item frenos' key={index}>
                        <h6>Frenos ABS</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'airbag': {
                    return (
                      <div className='item airbag' key={index}>
                        <h6>Airbag</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'alarma con control': {
                    return (
                      <div className='item alarma' key={index}>
                        <h6>Alarma con control</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'asegurado': {
                    return (
                      <div className='item asegurado' key={index}>
                        <h6>Asegurado</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  default:
                    break
                }
              })}
            </section>
          )}

          {entrada.equipamiento.length > 0 && <hr />}
          {entrada.equipamiento.length > 0 && (
            <section className='ficha equipamiento'>
              {entrada.equipamiento.map((item, index) => {
                switch (item) {
                  case 'aire acondicionado': {
                    return (
                      <div className='item aire' key={index}>
                        <h6>Aire acondicionado</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'asientos cuero': {
                    return (
                      <div className='item asientos' key={index}>
                        <h6>Asientos cuero</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'bloqueo central': {
                    return (
                      <div className='item bloqueo' key={index}>
                        <h6>Bloqueo central</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  case 'Vidrios electricos': {
                    return (
                      <div className='item vidrios' key={index}>
                        <h6>Vidrios electricos</h6>
                        <span>Sí</span>
                      </div>
                    )
                  }

                  default:
                    break
                }
              })}
            </section>
          )}
          {entrada.content.rendered.length > 0 && (
            <article>
              <h4>Descripción</h4>
              <div
                className='text'
                dangerouslySetInnerHTML={{ __html: entrada.content.rendered }}
              />
            </article>
          )}
          {posts.length > 0 && (
            <div className='posts'>
              <h4 className='morePosts'>Más publicaciones</h4>
              <MorePosts posts={posts} />
            </div>
          )}
        </article>
        <style jsx>{entradaStyle}</style>
      </Layout>
    )
  }
}
