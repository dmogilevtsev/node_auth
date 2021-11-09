const config = require('../src/config')

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.options.host,
    dialect: config.db.options.dialect,
  },
  test: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.options.host,
    dialect: config.db.options.dialect,
  },
  production: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.options.host,
    dialect: config.db.options.dialect,
  },
}
