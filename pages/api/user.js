const db = require('../../lib/db')
const SQL = require('sql-template-strings')

module.exports = async (req, res) => {
  try{
    const room = await db.handler(SQL`
      SELECT *
      FROM rooms
      WHERE roomID=${req.body.room}
    `)
    
    const result = await db.handler(SQL`
      SELECT *
      FROM users
      WHERE roomID=${room[0].id}
      ORDER BY points DESC
    `)
    console.log(result)
    res.status(200).json({result})
  
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }

}