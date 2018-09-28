import Link from 'next/link'

export default props => {
  const { entradas } = props
  // console.log(props)
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
  return (
    <section className='ListEntradas'>
      {entradas.map(entrada => (
        <div className='entrada' key={entrada.id}>
          <Link href={`/entrada?name=${entrada.slug}`} prefetch>
            <a className='picture'>
              <img
                src={
                  entrada._embedded['wp:featuredmedia']
                    ? entrada._embedded['wp:featuredmedia'][0].source_url
                    : '/static/default.jpg'
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
              - {entrada.recorrido} km
            </p>
            <Link href={`/entrada?name=${entrada.slug}`} prefetch>
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
      ))}
      <style jsx>{`
        .ListEntradas {
          margin-top: 25px;
          grid-column: 2/3;
          display: grid;
          grid-gap: 30px 15px;
          grid-template-columns: repeat(3, minmax(287px, 1fr));
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
          color: #7a7a7a;
          margin: 0;
        }

        aside {
          margin-top: 5px;
        }

        .kilo {
          font-size: 14px;
          border-bottom: 1px solid #a5c4d9;
          padding-bottom: 8px;
        }

        a {
          text-decoration: none;
          color: #2e2e2e;
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
      `}</style>
    </section>
  )
}
