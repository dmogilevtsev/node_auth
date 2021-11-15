require('dotenv').config()

module.exports = {
	'development': {
		'username': process.env.DB_USERNAME,
		'password': process.env.DB_PASSWORD,
		'database': process.env.DB_DATABASENAME_AUTH,
		'host': process.env.DB_HOST,
		'dialect': process.env.DB_TYPE,
	},
	'test': {
		'username': process.env.DB_USERNAME,
		'password': process.env.DB_PASSWORD,
		'database': process.env.DB_DATABASENAME_AUTH,
		'host': process.env.DB_HOST,
		'dialect': process.env.DB_TYPE,
	},
	'production': {
		'username': process.env.DB_USERNAME,
		'password': process.env.DB_PASSWORD,
		'database': process.env.DB_DATABASENAME_AUTH,
		'host': process.env.DB_HOST,
		'dialect': process.env.DB_TYPE,
	},
}