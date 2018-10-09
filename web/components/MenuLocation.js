import React from 'react'
import Link from 'next/link'

const MenuLocation = props => {
  const { entradas } = props
  const numRandom = Math.floor(Math.random() * (entradas.length - 0) + 0)

  return (
    <div id='MenuLocation'>
      {entradas[numRandom]._embedded['wp:term'][0][0] && (
        <Link
          href={`/entradas?categoria=${
            entradas[numRandom]._embedded['wp:term'][0][0].id
          }&name=${entradas[numRandom]._embedded['wp:term'][0][0].slug}`}
        >
          <a className='link'>
            {entradas[numRandom]._embedded['wp:term'][0][0].name}
          </a>
        </Link>
      )}
      {entradas[numRandom]._embedded['wp:term'][2][0] && (
        <div className='item'>
          <aside className='space'>&#10095;</aside>
          <Link
            href={`/entradas?marca=${
              entradas[numRandom]._embedded['wp:term'][2][0].id
            }&name=${entradas[numRandom]._embedded['wp:term'][2][0].slug}`}
          >
            <a className='link'>
              {entradas[numRandom]._embedded['wp:term'][2][0].name}
            </a>
          </Link>
        </div>
      )}

      {entradas[numRandom]._embedded['wp:term'][2][1] && (
        <div className='item'>
          <aside className='space'>&#10095;</aside>
          <Link
            href={`/entradas?modelo=${
              entradas[numRandom]._embedded['wp:term'][2][1].id
            }&name=${entradas[numRandom]._embedded['wp:term'][2][1].slug}`}
          >
            <a className='link'>
              {entradas[numRandom]._embedded['wp:term'][2][1].name}
            </a>
          </Link>
        </div>
      )}
      <style jsx>{`
        #MenuLocation {
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

export default MenuLocation
