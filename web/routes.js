const routes = require('next-routes')

// .add(nombre, url, archivo.js)
module.exports = routes()
  .add('index')
  .add('entrada', '/:name', 'entrada')
  .add('podcast', '/:slugChannel.:idChannel/:slung.:id', 'podcast')
