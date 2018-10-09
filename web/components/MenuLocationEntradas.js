import React from 'react'
import Link from 'next/link'

const MenuLocationEntradas = props => {
  const { entradas, name } = props

  return (
    <div id='MenuLocationEntradas'>
      {entradas[0]._embedded['wp:term'][0][0] && (
        <Link
          href={`/entradas?categoria=${
            entradas[0]._embedded['wp:term'][0][0].id
          }&name=${entradas[0]._embedded['wp:term'][0][0].slug}`}
        >
          <a className='link'>{entradas[0]._embedded['wp:term'][0][0].name}</a>
        </Link>
      )}

      {name === 'nuevos' ? (
        <div className='item'>
          <aside className='space'>&#10095;</aside>
          <Link href={'entradas?condicion=54&name=nuevos'}>
            <a className='link'>nuevos</a>
          </Link>
        </div>
      ) : null}

      {name === 'usados' ? (
        <div className='item'>
          <aside className='space'>&#10095;</aside>
          <Link href={'entradas?condicion=55&name=usados'}>
            <a className='link'>usados</a>
          </Link>
        </div>
      ) : null}

      {entradas[0]._embedded['wp:term'][2][0] &&
        (name === entradas[0]._embedded['wp:term'][2][0].slug ? (
          <div className='item'>
            <aside className='space'>&#10095;</aside>
            <Link
              href={`/entradas?marca=${
                entradas[0]._embedded['wp:term'][2][0].id
              }&name=${entradas[0]._embedded['wp:term'][2][0].slug}`}
            >
              <a className='link'>
                {entradas[0]._embedded['wp:term'][2][0].name}
              </a>
            </Link>
          </div>
        ) : null)}

      {entradas[0]._embedded['wp:term'][2][1] &&
        (name === entradas[0]._embedded['wp:term'][2][1].slug ? (
          <div className='item'>
            <aside className='space'>&#10095;</aside>
            <Link
              href={`/entradas?modelo=${
                entradas[0]._embedded['wp:term'][2][1].id
              }&name=${entradas[0]._embedded['wp:term'][2][1].slug}`}
            >
              <a className='link'>
                {entradas[0]._embedded['wp:term'][2][1].name}
              </a>
            </Link>
          </div>
        ) : null)}
      <style jsx>{`
        #MenuLocationEntradas {
          display: flex;
          align-items: center;
        }

        .item {
          display: flex;
        }

        .link {
          margin: 0 5px;
          text-decoration: none;
          color: #4c4c4c;
        }

        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default MenuLocationEntradas
