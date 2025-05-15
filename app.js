const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Custom logger format para destacar método e URL
logger.token('colored-method', (req) => {
  const method = req.method;
  switch (method) {
    case 'GET':
        return colors.green(method);
    case 'POST':
        return colors.blue(method);
    case 'PUT':
        return colors.yellow(method);
    case 'DELETE':
        return colors.red(method);
    default:
        return method;
  }
});

app.use(logger(':colored-method :url :status :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log(colors.bgBlue.white(' INFO '), colors.blue('Aplicação inicializada com sistema de cache ativo'));
console.log(colors.bgBlue.white(' INFO '), colors.blue(`Cache TTL configurado para ${process.env.CACHE_TTL || 30} segundos`));

module.exports = app;