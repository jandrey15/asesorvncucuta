import React, { Component } from 'react'
import Layout from '../components/Layout'
import SlideShow from '../components/SlideShow'
import MorePosts from '../components/MorePosts'
import Link from 'next/link'

export default class Entrada extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name

    try {
      // let req = await fetch('https://api.audioboom.com/channels/recommended')
      // http://api.docker.test/wp-json/acf/v3/pages/POST_ID/galeria?type=photo_gallery
      let req = await fetch(
        `http://api.docker.test/wp-json/wp/v2/posts?slug=${name}&_embed`
      )
      let [entrada] = await req.json()

      // let reqGaleria = await fetch(
      //   `http://api.docker.test/wp-json/acf/v3/pages/${
      //     entrada.id
      //   }/galeria?type=photo_gallery`
      // )
      let [reqGaleria, reqMorePosts] = await Promise.all([
        fetch(
          `http://api.docker.test/wp-json/acf/v3/pages/${
            entrada.id
          }/galeria?type=photo_gallery`
        ),
        fetch(
          `http://api.docker.test/wp-json/wp/v2/posts?author=${
            entrada.author
          }&per_page=5&exclude=${entrada.id}&_embed`
        )
      ])

      let galeria = await reqGaleria.json()
      let posts = await reqMorePosts.json()

      return { entrada, galeria, posts, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { entrada: null, galeria: [], posts: [], statusCode: 503 }
    }
  }
  render () {
    const { entrada, galeria, posts, statusCode } = this.props
    // console.log(entrada)
    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
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

    return (
      <Layout title={entrada.title.rendered}>
        <div className='dondeEstoy container'>
          <Link href='/'>
            <a className='listado'>
              <span>Volver al listado: </span>
            </a>
          </Link>
          <p>carros nuevos</p>
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
            </div>
          </div>

          <div className='pauta'>
            <p>Pauta</p>
          </div>

          <section className='ficha'>
            {entrada._embedded['wp:term'][2][0] ? (
              <div className='item marca'>
                <h6>Marca</h6>
                <span>{entrada._embedded['wp:term'][2][0].name}</span>
              </div>
            ) : null}

            {entrada._embedded['wp:term'][2][1] ? (
              <div className='item modelo'>
                <h6>Modelo</h6>
                <span>{entrada._embedded['wp:term'][2][1].name}</span>
              </div>
            ) : null}

            {entrada._embedded['wp:term'][5][0] ? (
              <div className='item color'>
                <h6>Color</h6>
                <span>{entrada._embedded['wp:term'][5][0].name}</span>
              </div>
            ) : null}

            {entrada.combustible.length > 0 ? (
              <div className='item combustible'>
                <h6>Combustible</h6>
                <span>{entrada.combustible}</span>
              </div>
            ) : null}

            {entrada.recorrido.length > 1 ? (
              <div className='item recorrido'>
                <h6>Recorrido</h6>
                <span>{entrada.recorrido} Km</span>
              </div>
            ) : null}

            {entrada.placa.length > 0 ? (
              <div className='item placa'>
                <h6>Placa</h6>
                <span>{entrada.placa}</span>
              </div>
            ) : null}

            {entrada._embedded['wp:term'][3][0] ? (
              <div className='item ano'>
                <h6>Año</h6>
                <span>{entrada._embedded['wp:term'][3][0].name}</span>
              </div>
            ) : null}

            {entrada.direccion.length > 0 ? (
              <div className='item direccion'>
                <h6>Dirección</h6>
                <span>{entrada.direccion}</span>
              </div>
            ) : null}

            {entrada.doy_financiamiento.length > 0 ? (
              <div className='item doy_financiamiento'>
                <h6>Doy financiamiento</h6>
                <span>{entrada.doy_financiamiento}</span>
              </div>
            ) : null}

            {entrada.motor.length > 0 ? (
              <div className='item motor'>
                <h6>Motor</h6>
                <span>{entrada.motor}</span>
              </div>
            ) : null}

            {entrada.negosiable.length > 0 ? (
              <div className='item negosiable'>
                <h6>Negosiable</h6>
                <span>{entrada.negosiable}</span>
              </div>
            ) : null}

            {entrada.transmision.length > 0 ? (
              <div className='item transmision'>
                <h6>Transmisión</h6>
                <span>{entrada.transmision}</span>
              </div>
            ) : null}
          </section>
          {entrada.exterior.length > 0 && <hr />}
          <section className='ficha exterior'>
            {entrada.exterior.length > 0
              ? entrada.exterior.map((item, index) => {
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
              })
              : null}
          </section>
          {entrada.seguridad.length > 0 && <hr />}
          <section className='ficha seguridad'>
            {entrada.seguridad.length > 0
              ? entrada.seguridad.map((item, index) => {
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
              })
              : null}
          </section>
          {entrada.equipamiento.length > 0 && <hr />}
          <section className='ficha equipamiento'>
            {entrada.equipamiento.length > 0
              ? entrada.equipamiento.map((item, index) => {
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
              })
              : null}
          </section>

          <h4>Descripción</h4>
          <div
            className='text'
            dangerouslySetInnerHTML={{ __html: entrada.content.rendered }}
          />
          {posts.length > 0 ? (
            <div className='posts'>
              <h4 className='morePosts'>Más publicaciones</h4>
              <MorePosts posts={posts} />
            </div>
          ) : null}
        </article>
        <style jsx>{`
          .pauta {
            max-width: 800px;
            height: 150px;
            background-color: #505050;
            margin: 20px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            text-transform: uppercase;
            font-size: 25px;
          }

          .text {
            color: #4c4c4c;
          }

          .dondeEstoy {
            display: flex;
            align-items: center;
            padding-left: 20px;
            height: 40px;
            font-size: 13px;
            box-sizing: border-box;
            color: #4c4c4c;
          }

          .dondeEstoy p {
            margin: 0 5px;
          }

          .listado {
            color: #4c4c4c;
            text-decoration: none;
          }

          .listado:hover {
            text-decoration: underline;
          }

          .content {
            display: grid;
            grid-template-columns: 885px 300px;
            grid-gap: 0 15px;
          }

          .info {
            background-color: #f7f7f7;
            padding: 25px 15px;
          }

          h4 {
            font-size: 28px;
            font-weight: 600;
            margin: 60px 0 0;
            color: #2d2d2a;
          }

          .morePosts {
            font-size: 28px;
            font-weight: 600;
            margin: 60px 0 20px;
          }

          .ficha {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            grid-gap: 20px 10px;
            max-width: 1128px;
            margin: 50px auto;
          }

          .ficha.exterior,
          .ficha.seguridad,
          .ficha.equipamiento {
            margin: 20px auto;
          }

          .ficha span {
            font-size: 21px;
            font-weght: 600;
            color: #2d2d2a;
          }

          .item {
            background-color: #f7f7f7;
            height: 70px;
            padding: 10px 15px;
          }

          h6 {
            margin: 0 0 5px;
            font-size: 18px;
            font-weight: 400;
            color: #4c4c4c;
          }

          h2 {
            font-size: 36px;
            font-weight: 600;
            margin: 0 0 20px;
            text-align: center;
            color: #2d2d2a;
          }

          h1 {
            font-size: 24px;
            line-height: 26px;
            font-weight: 400;
            margin: 0 0 15px;
            color: #4c4c4c;
          }

          .kilo {
            font-size: 14px;
            font-weight: 400;
            color: #4c4c4c;
            margin: 0 0 15px;
          }

          .financing .logo {
            margin: 0;
            max-width: 60px;
          }

          .financing .logo img {
            width: 100%;
          }

          .financing p {
            font-size: 14px;
            line-height: 16px;
            margin: 10px 0;
            color: #4c4c4c;
            width: 85%;
          }

          .financing {
            display: flex;
            align-items: center;
            margin: 20px 0;
            flex-direction: column;
          }

          .location {
            display: flex;
            align-items: flex-end;
            font-size: 14px;
            margin: 0 0 15px;
          }

          .location .icon {
            background: url('/static/locationGPS.svg') no-repeat;
            height: 25px;
            display: block;
            width: 20px;
          }

          h3 {
            margin: 15px 0 20px;
            font-size: 18px;
            font-weight: 600;
            color: #2d2d2a;
          }

          .seller span, .seller p {
            color: #4c4c4c;
          }

          span {
            font-size: 14px;
            font-weight: 600;
          }

          .seller .name,
          .seller .phone {
            font-size: 14px;
            font-weight: 400;
            margin: 10px 0 20px;
          }

          .info hr {
            border: none;
            height: 1px;
            background: #4887b5;
            margin: 0;
            width: 100%;
          }

          hr {
            border: none;
            height: 1px;
            background: #4887b5;
            margin: 0 auto;
            max-width: 1128px;
          }
        `}</style>
      </Layout>
    )
  }
}
