const NodeCache = require('node-cache');
const colors = require('colors');

// Criar instância de cache com TTL padrão de 30 segundos
const cache = new NodeCache({
  stdTTL: process.env.CACHE_TTL || 30,
  checkperiod: 5, // Verificar expiração a cada 5 segundos
});


// Adicionar método para log colorido de cache
const logCache = (key, hit) => {
  if (hit) {
    console.log(colors.bgGreen.black(' CACHE HIT '), colors.green(`Dados recuperados do cache para a chave: ${key}`));
  } else {
    console.log(colors.bgYellow.black(' CACHE MISS '), colors.yellow(`Dados recuperados do banco para a chave: ${key}`));
  }
};

module.exports = {
  cache,
  logCache
};