import React from 'react'
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'

const MenuLocation = props => {
  const { entradas } = props
  const numRandom = Math.floor(Math.random() * (entradas.length - 0) + 0)

  if (entradas.length > 0) {
    return (
      <div id='MenuLocation'>
        {entradas[numRandom]._embedded['wp:term'][0][0] && (
          <Link
            route='entradas'
            params={{
              slug: slug(entradas[numRandom]._embedded['wp:term'][0][0].slug)
            }}
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
              route='entradas'
              params={{
                slug: slug(entradas[numRandom]._embedded['wp:term'][2][0].slug)
              }}
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
              route='entradasMarcas'
              params={{
                slugMarca: slug(
                  entradas[numRandom]._embedded['wp:term'][2][1].slug
                ),
                slugModelo: slug(
                  entradas[numRandom]._embedded['wp:term'][2][0].slug
                ),
                id: entradas[numRandom]._embedded['wp:term'][2][1].id
              }}
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
  } else {
    return (
      <div id='MenuLocation'>
        <Link href={`/entradas?categoria=73&name=carros-y-camionetas`}>
          <a className='link'>Carros y Camionetas</a>
        </Link>
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
}

export default MenuLocation
