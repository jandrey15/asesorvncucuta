const routes = require('next-routes')

// .add(nombre, url, archivo.js)
// .add('channel', '/:slug.:id', 'channel')
module.exports = routes()
  .add('index')
  // .add('podcast', '/:slugChannel.:idChannel/:slung.:id', 'podcast')
  .add('searchIndex', '/search', 'search')
  .add(
    'searchFilter',
    '/search/:slugCondicion/:slugMarca/:slugModelo/:slugCiudad-:slugColor',
    'search'
  )
  .add(
    'searchFilterColorCiudad',
    '/search/:slugCondicion/:slugMarca/:slugModelo/:slugColorCiudad',
    'search'
  )
  .add(
    'searchFilterModelo',
    '/search/:slugCondicion/:slugMarca/:slugModelo',
    'search'
  )
  .add(
    'searchFilterMcolorCiudad',
    '/search/:slugCondicion/:slugMarca-:slugColorCiudad',
    'search'
  )
  .add('searchFilterMarca', '/search/:slugCondicion/:slugMarca', 'search')
  .add('searchFilterAnything', '/search/:slugCondicion-:slugAnything', 'search')
  .add('search', '/search/:slug', 'search')
  .add('articulos', '/articulos', 'articulos')
  .add('articulo', '/articulos/:name', 'articulo')
  .add('tags', '/tags', 'tags')
  .add('tag', '/tags/:slug', 'tag')
  .add('entradaIndex', '/vehiculos', 'entradas')
  .add(
    'entradasMarcas',
    '/vehiculos/:slugCondicion/:slugMarca/:slugModelo',
    'entradas'
  )
  .add('entradas', '/vehiculos/:slugCondicion/:slug', 'entradas')
  .add('entradasCondicion', '/vehiculos/:slugCondicion', 'entradas')
  .add('entrada', '/:name', 'entrada')
