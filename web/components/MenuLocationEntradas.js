import React from 'react'
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'

const MenuLocationEntradas = props => {
  const { entradas, name } = props

  let marcaSlug
  let marcaName
  let modeloSlug
  let modeloName

  if (
    entradas[0]._embedded['wp:term'][2][0] &&
    entradas[0]._embedded['wp:term'][2][1]
  ) {
    if (entradas[0]._embedded['wp:term'][2][1].acf.padre) {
      marcaSlug = entradas[0]._embedded['wp:term'][2][1].slug
      modeloSlug = entradas[0]._embedded['wp:term'][2][0].slug
      marcaName = entradas[0]._embedded['wp:term'][2][1].name
      modeloName = entradas[0]._embedded['wp:term'][2][0].name
    } else {
      marcaSlug = entradas[0]._embedded['wp:term'][2][0].slug
      modeloSlug = entradas[0]._embedded['wp:term'][2][1].slug
      marcaName = entradas[0]._embedded['wp:term'][2][0].name
      modeloName = entradas[0]._embedded['wp:term'][2][1].name
    }
  }

  return (
    <div id='MenuLocationEntradas'>
      {entradas[0]._embedded['wp:term'][0][0] && (
        <Link
          route='entradas'
          params={{
            slug: slug(entradas[0]._embedded['wp:term'][0][0].slug)
          }}
        >
          <a className='link'>{entradas[0]._embedded['wp:term'][0][0].name}</a>
        </Link>
      )}

      {name === 'nuevos' && (
        <div className='item'>
          <aside className='space'>&#10095;</aside>
          <Link route='entradas' params={{ slug: 'nuevos' }}>
            <a className='link'>nuevos</a>
          </Link>
        </div>
      )}

      {name === 'usados' && (
        <div className='item'>
          <aside className='space'>&#10095;</aside>
          <Link route='entradas' params={{ slug: 'usados' }}>
            <a className='link'>usados</a>
          </Link>
        </div>
      )}

      {name === marcaSlug &&
        marcaSlug.length > 0 && (
        <div className='item'>
          <aside className='space'>&#10095;</aside>
          <Link
            route='entradas'
            params={{
              slug: slug(marcaSlug)
            }}
          >
            <a className='link'>{marcaName}</a>
          </Link>
        </div>
      )}

      {name === undefined &&
        (marcaSlug.length > 0 && (
          <div className='item'>
            <aside className='space'>&#10095;</aside>
            <Link
              route='entradas'
              params={{
                slug: slug(marcaSlug)
              }}
            >
              <a className='link'>{marcaName}</a>
            </Link>
          </div>
        ))}

      {name === undefined &&
        (modeloSlug.length > 0 && (
          <div className='item'>
            <aside className='space'>&#10095;</aside>
            <Link
              route='entradasMarcas'
              params={{
                slugMarca: slug(marcaSlug),
                slugModelo: slug(modeloSlug)
              }}
            >
              <a className='link'>{modeloName}</a>
            </Link>
          </div>
        ))}

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
