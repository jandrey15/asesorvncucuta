import Link from 'next/link'

export default props => {
  const { entradas } = props
  // console.log(props)
  return (
    <section className='ListEntradas'>
      <h5>Entradas</h5>
      {entradas.map(entrada => (
        <div className='entrada' key={entrada.id}>
          <img
            src={
              entrada._embedded['wp:featuredmedia']
                ? entrada._embedded['wp:featuredmedia'][0].source_url
                : ''
            }
            alt={
              entrada._embedded['wp:featuredmedia']
                ? entrada._embedded['wp:featuredmedia'][0].alt_text
                : entrada.title.rendered
            }
          />
          <p>
            {entrada._embedded['wp:term'][3][0]
              ? entrada._embedded['wp:term'][3][0].name
              : null}
            -{entrada.recorrido}
          </p>
          <Link href={`/entrada?name=${entrada.slug}`} prefetch>
            <a className='channel'>
              <h3>{entrada.title.rendered}</h3>
            </a>
          </Link>
          <p>Precio: {entrada.precio}</p>
          <aside>
            {entrada._embedded['wp:term'][6][0]
              ? entrada._embedded['wp:term'][6][0].name
              : null}
          </aside>
        </div>
      ))}
      <style jsx>{`
        .entrada img {
          max-width: 500px;
        }

        .ListEntradas {
          grid-column: 2/3;
        }
      `}</style>
    </section>
  )
}
