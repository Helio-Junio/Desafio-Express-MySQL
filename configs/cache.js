const NodeCache = require('node-cache');
const chalk = require('chalk');

// Criar instância de cache com TTL padrão de 30 segundos
const cache = new NodeCache({
  stdTTL: process.env.CACHE_TTL || 30,
  checkperiod: 5, // Verificar expiração a cada 5 segundos
});

// Adicionar método para log colorido de cache
const logCache = (key, hit) => {
  if (hit) {
    console.log(chalk.bgGreen.black(' CACHE HIT '), chalk.green(`Dados recuperados do cache para a chave: ${key}`));
  } else {
    console.log(chalk.bgYellow.black(' CACHE MISS '), chalk.yellow(`Dados recuperados do banco para a chave: ${key}`));
  }
};

module.exports = {
  cache,
  logCache
};