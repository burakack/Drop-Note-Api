const fs=require('fs')

let routes = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .map(route => {
      const controller = require(`./${route}`);
      return {
        name:controller.name,
        route:controller.router,
      }
    }
  );

module.exports= routes;