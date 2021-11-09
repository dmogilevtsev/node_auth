const nodemailer = require('nodemailer')
const config = require('../config')
const message = require('./message')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      // service: 'gmail',
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.auth.user,
        pass: config.smtp.auth.pass,
      },
    })
  }

  async sendActivationLink(to, link) {
    await this.transporter.sendMail({
      from: config.smtp.user,
      to,
      subject: 'Confirm email',
      text: '',
      html: message(link),
    })
  }
}

module.exports = new MailService()
