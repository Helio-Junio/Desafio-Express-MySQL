const { cache, logCache } = require('../configs/cache');
const colors = require('colors');

// Middleware para verificar e recuperar dados do cache
const checkCache = (req, res, next) => {
  // Só aplicar cache para GET requests
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl; // Usa a URL como chave do cache
  const cachedData = cache.get(key);
  
  if (cachedData) {
    logCache(key, true); // Log de cache hit
    return res.status(200).json(cachedData);
  }
  
  logCache(key, false); // Log de cache miss
  next();
};

// Middleware para armazenar dados no cache
const setCache = (req, key, data) => {
  if (req.method === 'GET') {
    cache.set(key, data);
  }
};

// Middleware para invalidar o cache de clientes
const invalidateClientesCache = () => {
  console.log(colors.bgRed.white(' CACHE INVALIDATE '), colors.red('Cache de clientes invalidado'));
  const keys = cache.keys();
  
  keys.forEach(key => {
    if (key.includes('/clientes')) {
      cache.del(key);
    }
  });
};

module.exports = {
  checkCache,
  setCache,
  invalidateClientesCache
};