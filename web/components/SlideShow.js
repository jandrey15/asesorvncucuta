import Link from 'next/link'

export default props => {
  const { entradas } = props
  return (
    <section className='SlideShow'>
      <h3>Slide show entradas</h3>
      {entradas.map(entrada => (
        <div
          className='entrada'
          key={entrada.id}
          style={{
            backgroundImage: `url(${
              entrada._embedded['wp:featuredmedia']
                ? entrada._embedded['wp:featuredmedia'][0].source_url
                : ''
            })`
          }}
        >
          <Link href={`/entrada?name=${entrada.slug}`} prefetch>
            <a className='channel'>
              <h3>{entrada.title.rendered}</h3>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .entrada {
          min-height: 500px;
          background-position: 50% 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
      `}</style>
    </section>
  )
}
