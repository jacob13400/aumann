const db = require('../../lib/db')
const SQL = require('sql-template-strings')

module.exports = async (req, res) => {
  try{
    const resultRoom = await db.handler(SQL`
      SELECT *
      FROM rooms
    `)
    const resultUser = await db.handler(SQL`
      SELECT *
      FROM users
    `)
    res.status(200).json({result:{rooms: resultRoom, users: resultUser}})
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}