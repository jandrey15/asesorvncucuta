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
  .add('search', '/search/:slug', 'search')
  .add('articulos', '/articulos', 'articulos')
  .add('articulo', '/articulos/:name', 'articulo')
  .add('tags', '/tags', 'tags')
  .add('tag', '/tags/:slug', 'tag')
  .add('entradaIndex', '/vehiculos', 'index')
  .add('entrada', '/vehiculos/:name', 'entrada')
  .add('entradasMarcas', '/:slugCondicion/:slugMarca/:slugModelo', 'entradas')
  .add('entradas', '/:slugCondicion/:slug', 'entradas')
  .add('entradasCondicion', '/:slugCondicion', 'entradas')
