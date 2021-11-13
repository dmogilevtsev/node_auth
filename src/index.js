const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('./config')
const sequelize = require('./db')
const errorMiddleware = require('./error/ErrorMiddleware')
const authRouter = require('./auth/auth.router')

const app = express()

app.use(
  cors({
    credentials: true,
    origin: config.client_url,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRouter)

app.use(errorMiddleware)

const start = async () => {
  try {
    await connectDb()
    await sequelize.sync()
  } catch (err) {
    console.log(err)
  }
  app.listen(config.port, (err) => {
    if (err) {
      return console.log(`Server down. Error: ${err.message}`)
    }
    console.log(`Server has been started on ${config.host}${config.port}/ port`)
  })
}

start()

async function connectDb(retries = 8) {
  while (retries) {
    try {
      await sequelize.authenticate()
      break
    } catch (err) {
      console.log(err)
      retries -= 1
      console.log(`retries left: ${retries}`)
      await new Promise((res) => setTimeout(res, 5000))
    }
  }
}
