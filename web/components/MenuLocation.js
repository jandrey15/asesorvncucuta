import React from 'react'
// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'

const MenuLocation = props => {
  const { entradas, numRandom } = props
  // const numRandom = Math.floor(Math.random() * (entradas.length - 0) + 0)
  // const numRandom = 0
  // console.log(numRandom)
  let marcaSlug
  let marcaName
  let modeloSlug
  let modeloName

  if (
    entradas[numRandom]._embedded['wp:term'][2][0] &&
    entradas[numRandom]._embedded['wp:term'][2][1]
  ) {
    if (entradas[numRandom]._embedded['wp:term'][2][1].acf.padre) {
      marcaSlug = entradas[numRandom]._embedded['wp:term'][2][1].slug
      modeloSlug = entradas[numRandom]._embedded['wp:term'][2][0].slug
      marcaName = entradas[numRandom]._embedded['wp:term'][2][1].name
      modeloName = entradas[numRandom]._embedded['wp:term'][2][0].name
    } else {
      marcaSlug = entradas[numRandom]._embedded['wp:term'][2][0].slug
      modeloSlug = entradas[numRandom]._embedded['wp:term'][2][1].slug
      marcaName = entradas[numRandom]._embedded['wp:term'][2][0].name
      modeloName = entradas[numRandom]._embedded['wp:term'][2][1].name
    }
  }

  if (entradas.length > 0) {
    return (
      <div id='MenuLocation'>
        {entradas[numRandom]._embedded['wp:term'][0][0] && (
          <Link
            route='entradasCondicion'
            params={{
              slugCondicion: slug(
                entradas[numRandom]._embedded['wp:term'][0][0].slug
              )
            }}
          >
            <a className='link'>
              {entradas[numRandom]._embedded['wp:term'][0][0].name}
            </a>
          </Link>
        )}

        {marcaSlug.length > 0 && (
          <div className='item'>
            <aside className='space'>&#10095;</aside>
            <Link
              route='entradas'
              params={{
                slugCondicion: slug(
                  entradas[numRandom]._embedded['wp:term'][0][0].slug
                ),
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
                slugCondicion: slug(
                  entradas[numRandom]._embedded['wp:term'][0][0].slug
                ),
                slugMarca: slug(marcaSlug),
                slugModelo: slug(modeloSlug)
              }}
            >
              <a className='link'>{modeloName}</a>
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
