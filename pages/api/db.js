const mysql = require('serverless-mysql')({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  }
})
 
// Main handler function
const handler = async (event, context) => {
  // Run your query
  let results = await mysql.query('SELECT * FROM rooms')
  
  // console.log(results[1])
  // Run clean up function
  await mysql.end()
 
  // Return the results
}

export default handler;