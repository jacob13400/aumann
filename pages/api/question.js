const db = require('../../lib/db')
const SQL = require('sql-template-strings')

module.exports = async (req, res) => {
  console.log(req.body)

  try{
    const result = await db.handler(SQL`
      SELECT *
      FROM questions
      WHERE id=${req.body.questionID}
    `)
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }

  try{
    const room = await db.handler(SQL`
      SELECT *
      FROM answers
      WHERE question=${req.body.questionID}
    `)
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}