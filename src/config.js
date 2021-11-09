require('dotenv').config()

module.exports = {
  port: process.env.API_PORT,
  host: process.env.API_HOST,
  client_url: process.env.CLIENT_URL,
  db: {
    database: process.env.DB_DATABASENAME_AUTH,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: process.env.DB_TYPE,
      protocol: process.env.DB_TYPE,
      log: true,
    },
  },
  jwt: {
    jwt_secret: process.env.JWT_ACCESS_SECRET,
    jwt_exp: process.env.JWT_ACCESS_EXPIRESIN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_exp: process.env.JWT_REFRESH_EXPIRESIN,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
}
