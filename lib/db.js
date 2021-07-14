const mysql = require('serverless-mysql')({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  }
})
require('dotenv').config();

exports.handler = async (event) => {
  try {
    const results = await mysql.query(event)
    console.log(results)
    await mysql.end()
    return results
  } catch (error) {
    console.error(error)
    return { error }
  }
}